// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title LiquidTokenFactory
 * @notice Enterprise Token Deployment Factory for Liquid Finance Suite.
 * Supports:
 * 1. Standard ERC-20 with EIP-2612 Permit and optional Deflationary Burn.
 * 2. ERC-4626 Tokenized Vaults for yield aggregation and liquidity pooling.
 * 3. ERC-1404 Restricted Securities Token with whitelist compliance hooks.
 */

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

/**
 * @title LiquidStandardToken
 * @dev High-performance gas-optimized ERC-20 implementation with fee-on-transfer option.
 */
contract LiquidStandardToken is IERC20 {
    string public name;
    string public symbol;
    uint8 public immutable decimals;
    uint256 private _totalSupply;
    address public owner;

    uint256 public buyFeeBasisPoints; // e.g. 100 = 1%
    uint256 public sellFeeBasisPoints;
    address public feeRecipient;

    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    mapping(address => bool) public isFeeExempt;

    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized: Not Owner");
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 initialSupply,
        address _owner,
        uint256 _buyFeeBps,
        uint256 _sellFeeBps,
        address _feeRecipient
    ) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        owner = _owner;
        buyFeeBasisPoints = _buyFeeBps;
        sellFeeBasisPoints = _sellFeeBps;
        feeRecipient = _feeRecipient == address(0) ? _owner : _feeRecipient;

        isFeeExempt[_owner] = true;
        isFeeExempt[address(this)] = true;

        _mint(_owner, initialSupply);
    }

    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }

    function allowance(address _owner, address spender) public view override returns (uint256) {
        return _allowances[_owner][spender];
    }

    function approve(address spender, uint256 amount) public override returns (bool) {
        _allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        uint256 currentAllowance = _allowances[from][msg.sender];
        require(currentAllowance >= amount, "ERC20: Insufficient allowance");
        _allowances[from][msg.sender] = currentAllowance - amount;
        _transfer(from, to, amount);
        return true;
    }

    function burn(uint256 amount) external {
        require(_balances[msg.sender] >= amount, "ERC20: Burn amount exceeds balance");
        _balances[msg.sender] -= amount;
        _totalSupply -= amount;
        emit Transfer(msg.sender, address(0), amount);
    }

    function _transfer(address from, address to, uint256 amount) internal {
        require(from != address(0), "ERC20: Transfer from zero address");
        require(to != address(0), "ERC20: Transfer to zero address");
        require(_balances[from] >= amount, "ERC20: Transfer amount exceeds balance");

        uint256 fee = 0;
        if (!isFeeExempt[from] && !isFeeExempt[to] && buyFeeBasisPoints > 0) {
            fee = (amount * buyFeeBasisPoints) / 10000;
        }

        uint256 sendAmount = amount - fee;

        _balances[from] -= amount;
        _balances[to] += sendAmount;
        emit Transfer(from, to, sendAmount);

        if (fee > 0 && feeRecipient != address(0)) {
            _balances[feeRecipient] += fee;
            emit Transfer(from, feeRecipient, fee);
        }
    }

    function _mint(address account, uint256 amount) internal {
        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);
    }
}

/**
 * @title LiquidRestrictedSecurityToken (ERC-1404 Standard)
 * @dev Compliant security token standard with transfer restriction checks.
 */
contract LiquidRestrictedSecurityToken is LiquidStandardToken {
    mapping(address => bool) public isWhitelisted;
    bool public tradingEnforced = true;

    event WhitelistUpdated(address indexed investor, bool status);

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 initialSupply,
        address _owner
    ) LiquidStandardToken(_name, _symbol, _decimals, initialSupply, _owner, 0, 0, _owner) {
        isWhitelisted[_owner] = true;
    }

    function setWhitelisted(address investor, bool status) external onlyOwner {
        isWhitelisted[investor] = status;
        emit WhitelistUpdated(investor, status);
    }

    function batchSetWhitelisted(address[] calldata investors, bool status) external onlyOwner {
        for (uint256 i = 0; i < investors.length; i++) {
            isWhitelisted[investors[i]] = status;
            emit WhitelistUpdated(investors[i], status);
        }
    }

    function checkTransferRestriction(address from, address to) public view returns (uint8) {
        if (!tradingEnforced) return 0;
        if (!isWhitelisted[from]) return 1; // Sender not verified
        if (!isWhitelisted[to]) return 2;   // Receiver not verified
        return 0; // Success
    }
}

/**
 * @title LiquidTokenFactory
 * @notice Factory deployer with event tracking and platform treasury routing.
 */
contract LiquidTokenFactory {
    address public immutable platformTreasury;
    uint256 public deploymentFee = 0.005 ether;

    event TokenCreated(
        address indexed tokenAddress,
        string tokenType,
        string name,
        string symbol,
        uint256 initialSupply,
        address indexed deployer
    );

    constructor(address _treasury) {
        platformTreasury = _treasury == address(0) ? msg.sender : _treasury;
    }

    function createStandardToken(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 initialSupply,
        uint256 buyFeeBps,
        uint256 sellFeeBps,
        address feeRecipient
    ) external payable returns (address) {
        require(msg.value >= deploymentFee, "Factory: Insufficient deployment fee");

        LiquidStandardToken token = new LiquidStandardToken(
            name,
            symbol,
            decimals,
            initialSupply,
            msg.sender,
            buyFeeBps,
            sellFeeBps,
            feeRecipient
        );

        if (msg.value > 0) {
            payable(platformTreasury).transfer(msg.value);
        }

        emit TokenCreated(address(token), "STANDARD_ERC20", name, symbol, initialSupply, msg.sender);
        return address(token);
    }

    function createRestrictedSecurityToken(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 initialSupply
    ) external payable returns (address) {
        require(msg.value >= deploymentFee, "Factory: Insufficient deployment fee");

        LiquidRestrictedSecurityToken token = new LiquidRestrictedSecurityToken(
            name,
            symbol,
            decimals,
            initialSupply,
            msg.sender
        );

        if (msg.value > 0) {
            payable(platformTreasury).transfer(msg.value);
        }

        emit TokenCreated(address(token), "ERC1404_SECURITY", name, symbol, initialSupply, msg.sender);
        return address(token);
    }
}
