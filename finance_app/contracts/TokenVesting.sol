// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

/**
 * @title TokenVesting
 * @notice Enterprise Token Vesting & Cap Table Synchronization Engine.
 * Supports customizable cliff periods, linear second-by-second vesting,
 * and optional revocability for team, advisor, and private investor allocations.
 */
contract TokenVesting {
    struct VestingSchedule {
        bool initialized;
        address beneficiary;
        uint256 cliff;           // Timestamp when cliff ends
        uint256 start;           // Timestamp when vesting begins
        uint256 duration;        // Total duration of vesting schedule (seconds)
        uint256 amountTotal;     // Total tokens granted
        uint256 released;        // Tokens already claimed
        bool revocable;          // Whether the schedule can be revoked by owner
        bool revoked;            // Whether the schedule has been revoked
    }

    IERC20 public immutable token;
    address public owner;

    bytes32[] private vestingScheduleIds;
    mapping(bytes32 => VestingSchedule) private vestingSchedules;
    uint256 public totalVestingTokens;

    event ScheduleCreated(bytes32 indexed scheduleId, address indexed beneficiary, uint256 amount);
    event TokensReleased(bytes32 indexed scheduleId, address indexed beneficiary, uint256 amount);
    event ScheduleRevoked(bytes32 indexed scheduleId, uint256 unreleasedAmount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Vesting: Caller is not owner");
        _;
    }

    constructor(address tokenAddress) {
        require(tokenAddress != address(0), "Vesting: Invalid token address");
        token = IERC20(tokenAddress);
        owner = msg.sender;
    }

    function createVestingSchedule(
        address beneficiary,
        uint256 start,
        uint256 cliffDuration,
        uint256 duration,
        uint256 amount,
        bool revocable
    ) external onlyOwner returns (bytes32) {
        require(beneficiary != address(0), "Vesting: Beneficiary is zero address");
        require(duration > 0, "Vesting: Duration must be > 0");
        require(amount > 0, "Vesting: Amount must be > 0");
        require(duration >= cliffDuration, "Vesting: Duration must be >= cliff");

        bytes32 scheduleId = keccak256(
            abi.encodePacked(beneficiary, start, duration, vestingScheduleIds.length)
        );
        require(!vestingSchedules[scheduleId].initialized, "Vesting: Schedule exists");

        // Transfer tokens into vesting contract
        require(token.transferFrom(msg.sender, address(this), amount), "Vesting: Deposit failed");

        vestingSchedules[scheduleId] = VestingSchedule({
            initialized: true,
            beneficiary: beneficiary,
            cliff: start + cliffDuration,
            start: start,
            duration: duration,
            amountTotal: amount,
            released: 0,
            revocable: revocable,
            revoked: false
        });

        vestingScheduleIds.push(scheduleId);
        totalVestingTokens += amount;

        emit ScheduleCreated(scheduleId, beneficiary, amount);
        return scheduleId;
    }

    function computeReleasableAmount(bytes32 scheduleId) public view returns (uint256) {
        VestingSchedule storage schedule = vestingSchedules[scheduleId];
        if (!schedule.initialized || schedule.revoked) return 0;

        uint256 currentTime = block.timestamp;
        if (currentTime < schedule.cliff) return 0;

        if (currentTime >= schedule.start + schedule.duration) {
            return schedule.amountTotal - schedule.released;
        }

        uint256 timeFromStart = currentTime - schedule.start;
        uint256 vestedAmount = (schedule.amountTotal * timeFromStart) / schedule.duration;
        return vestedAmount - schedule.released;
    }

    function release(bytes32 scheduleId) external returns (uint256) {
        VestingSchedule storage schedule = vestingSchedules[scheduleId];
        require(schedule.initialized, "Vesting: Schedule does not exist");
        require(!schedule.revoked, "Vesting: Schedule revoked");

        uint256 releasable = computeReleasableAmount(scheduleId);
        require(releasable > 0, "Vesting: No tokens releasable");

        schedule.released += releasable;
        totalVestingTokens -= releasable;

        require(token.transfer(schedule.beneficiary, releasable), "Vesting: Transfer failed");
        emit TokensReleased(scheduleId, schedule.beneficiary, releasable);
        return releasable;
    }

    function revoke(bytes32 scheduleId) external onlyOwner {
        VestingSchedule storage schedule = vestingSchedules[scheduleId];
        require(schedule.initialized, "Vesting: Schedule does not exist");
        require(schedule.revocable, "Vesting: Schedule is not revocable");
        require(!schedule.revoked, "Vesting: Already revoked");

        uint256 releasable = computeReleasableAmount(scheduleId);
        if (releasable > 0) {
            schedule.released += releasable;
            require(token.transfer(schedule.beneficiary, releasable), "Vesting: Transfer to beneficiary failed");
            emit TokensReleased(scheduleId, schedule.beneficiary, releasable);
        }

        uint256 unvested = schedule.amountTotal - schedule.released;
        schedule.revoked = true;
        totalVestingTokens -= unvested;

        require(token.transfer(owner, unvested), "Vesting: Refund unvested to owner failed");
        emit ScheduleRevoked(scheduleId, unvested);
    }

    function getSchedule(bytes32 scheduleId) external view returns (VestingSchedule memory) {
        return vestingSchedules[scheduleId];
    }

    function getScheduleCount() external view returns (uint256) {
        return vestingScheduleIds.length;
    }
}
