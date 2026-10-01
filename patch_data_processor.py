import re

with open('lim_clone/backend_python/fincept_analytics/Analytics/finanicalanalysis/core/data_processor.py', 'r') as f:
    content = f.read()

replacement = '''    def convert_currency(self, statements: FinancialStatements,
                         target_currency: str,
                         exchange_rates: Dict[str, float]) -> FinancialStatements:
        """Convert financial statements to target currency"""
        if statements.currency == target_currency:
            return statements
            
        rate = exchange_rates.get(target_currency, 1.0) / exchange_rates.get(statements.currency, 1.0)
        
        new_is = {k: v * rate if isinstance(v, (int, float)) else v for k, v in statements.income_statement.items()}
        new_bs = {k: v * rate if isinstance(v, (int, float)) else v for k, v in statements.balance_sheet.items()}
        new_cf = {k: v * rate if isinstance(v, (int, float)) else v for k, v in statements.cash_flow.items()}
        
        return FinancialStatements(
            period_end_date=statements.period_end_date,
            period_length_months=statements.period_length_months,
            currency=target_currency,
            income_statement=new_is,
            balance_sheet=new_bs,
            cash_flow=new_cf
        )

    def adjust_for_inflation(self, statements: FinancialStatements,
                             inflation_rate: float) -> FinancialStatements:
        """Adjust financial statements for inflation (hyperinflationary economies)"""
        if inflation_rate == 0.0:
            return statements
            
        multiplier = 1.0 + inflation_rate
        new_is = {k: v * multiplier if isinstance(v, (int, float)) else v for k, v in statements.income_statement.items()}
        new_bs = {k: v * multiplier if isinstance(v, (int, float)) else v for k, v in statements.balance_sheet.items()}
        new_cf = {k: v * multiplier if isinstance(v, (int, float)) else v for k, v in statements.cash_flow.items()}
        
        return FinancialStatements(
            period_end_date=statements.period_end_date,
            period_length_months=statements.period_length_months,
            currency=statements.currency,
            income_statement=new_is,
            balance_sheet=new_bs,
            cash_flow=new_cf
        )'''

pattern = re.compile(r'    def convert_currency\(self, statements: FinancialStatements,.*?pass\n\n    def adjust_for_inflation\(self, statements: FinancialStatements,\n                             inflation_rate: float\) -> FinancialStatements:\n.*?pass', re.DOTALL)
content = pattern.sub(replacement, content)

with open('lim_clone/backend_python/fincept_analytics/Analytics/finanicalanalysis/core/data_processor.py', 'w') as f:
    f.write(content)
