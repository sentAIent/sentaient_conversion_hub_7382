import re

with open('lim_clone/backend_python/fincept_analytics/Analytics/corporateFinance/valuation/sec_data_adapter.py', 'r') as f:
    content = f.read()

replacement = '''    def _extract_nwc_change(self, balance_sheet) -> float:
        """Calculate change in net working capital"""
        try:
            if YFINANCE_AVAILABLE:
                stock = yf.Ticker(self.ticker)
                bs = stock.balance_sheet
                if not bs.empty and len(bs.columns) >= 2:
                    # columns are dates, index are items
                    if 'Working Capital' in bs.index:
                        current_nwc = float(bs.loc['Working Capital'].iloc[0])
                        prior_nwc = float(bs.loc['Working Capital'].iloc[1])
                        return current_nwc - prior_nwc
                    elif 'Total Current Assets' in bs.index and 'Total Current Liabilities' in bs.index:
                        current_nwc = float(bs.loc['Total Current Assets'].iloc[0]) - float(bs.loc['Total Current Liabilities'].iloc[0])
                        prior_nwc = float(bs.loc['Total Current Assets'].iloc[1]) - float(bs.loc['Total Current Liabilities'].iloc[1])
                        return current_nwc - prior_nwc
            
            # Fallback to SEC statement
            current_ca = self._get_value_from_stmt(balance_sheet, 'AssetsCurrent')
            current_cl = self._get_value_from_stmt(balance_sheet, 'LiabilitiesCurrent')
            if current_ca is not None and current_cl is not None:
                current_nwc = float(current_ca - current_cl)
                return current_nwc * 0.05 # Assume 5% growth if no prior year
            return 0.0
        except:
            return 0.0'''

pattern = re.compile(r'    def _extract_nwc_change\(self, balance_sheet\) -> float:.*?return 0\.0\n        except:\n            return 0\.0', re.DOTALL)
content = pattern.sub(replacement, content)

with open('lim_clone/backend_python/fincept_analytics/Analytics/corporateFinance/valuation/sec_data_adapter.py', 'w') as f:
    f.write(content)
