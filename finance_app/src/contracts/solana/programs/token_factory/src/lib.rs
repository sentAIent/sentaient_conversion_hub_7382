use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod token_factory {
    use super::*;

    pub fn initialize_factory(ctx: Context<InitializeFactory>) -> Result<()> {
        let factory = &mut ctx.accounts.factory;
        factory.owner = *ctx.accounts.owner.key;
        factory.fee = 10_000_000; // 0.01 SOL (10M lamports)
        Ok(())
    }

    pub fn create_token(
        ctx: Context<CreateToken>,
        _decimals: u8,
        _supply: u64,
    ) -> Result<()> {
        let factory = &ctx.accounts.factory;
        
        // 1. Pay the platform fee
        let fee = factory.fee;
        if fee > 0 {
            let ix = anchor_lang::solana_program::system_instruction::transfer(
                &ctx.accounts.payer.key(),
                &factory.owner,
                fee,
            );
            anchor_lang::solana_program::program::invoke(
                &ix,
                &[
                    ctx.accounts.payer.to_account_info(),
                    ctx.accounts.owner_account.to_account_info(),
                    ctx.accounts.system_program.to_account_info(),
                ],
            )?;
        }

        // Note: Actual SPL token mint creation via CPI goes here.
        // For MVP, we validate the fee transfer.
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeFactory<'info> {
    #[account(init, payer = owner, space = 8 + 32 + 8)]
    pub factory: Account<'info, FactoryState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateToken<'info> {
    pub factory: Account<'info, FactoryState>,
    #[account(mut)]
    pub payer: Signer<'info>,
    /// CHECK: We are just transferring SOL to the factory owner
    #[account(mut, address = factory.owner)]
    pub owner_account: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct FactoryState {
    pub owner: Pubkey,
    pub fee: u64,
}
