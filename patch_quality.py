import re

with open('lim_clone/backend_python/fincept_analytics/Analytics/finanicalanalysis/specialized_analysis/quality_analysis.py', 'r') as f:
    content = f.read()

replacement = '''        # Calculate revenue and expense quality based on comparative data
        revenue_quality = 1.0
        expense_quality = 1.0
        
        if comparative_data and len(comparative_data) >= 1:
            prior_rev = comparative_data[0].income_statement.get('revenue', 0)
            current_rev = statements.income_statement.get('revenue', 0)
            if prior_rev > 0:
                rev_growth = (current_rev - prior_rev) / prior_rev
                revenue_quality = 1.0 - min(0.5, max(0.0, abs(rev_growth) * 0.5))
                
            prior_opex = comparative_data[0].income_statement.get('operating_expenses', 0)
            current_opex = statements.income_statement.get('operating_expenses', 0)
            if prior_opex > 0:
                opex_growth = (current_opex - prior_opex) / prior_opex
                expense_quality = 1.0 - min(0.5, max(0.0, abs(opex_growth) * 0.5))

        return EarningsQualityAssessment(
            quality_level=quality_level,
            overall_score=score,
            accrual_ratio=accrual_ratio,
            cash_to_accrual_ratio=cash_to_accrual,
            accrual_persistence=0.0,  # Would need more data
            earnings_persistence=earnings_persistence,
            revenue_quality=revenue_quality,
            expense_quality=expense_quality,'''

pattern = re.compile(r'        return EarningsQualityAssessment\(\n            quality_level=quality_level,\n            overall_score=score,\n            accrual_ratio=accrual_ratio,\n            cash_to_accrual_ratio=cash_to_accrual,\n            accrual_persistence=0\.0,  # Would need more data\n            earnings_persistence=earnings_persistence,\n            revenue_quality=0\.8,  # Placeholder\n            expense_quality=0\.8,  # Placeholder', re.DOTALL)
content = pattern.sub(replacement, content)

with open('lim_clone/backend_python/fincept_analytics/Analytics/finanicalanalysis/specialized_analysis/quality_analysis.py', 'w') as f:
    f.write(content)
