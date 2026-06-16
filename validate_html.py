from html.parser import HTMLParser

class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.div_depth = 0
        self.in_cymatics_tab = False
        self.tab_div_depth = 0
        
    def handle_starttag(self, tag, attrs):
        if tag == 'div':
            self.div_depth += 1
            attr_dict = dict(attrs)
            if attr_dict.get('id') == 'tab-cymatics':
                self.in_cymatics_tab = True
                self.tab_div_depth = self.div_depth
                
    def handle_endtag(self, tag):
        if tag == 'div':
            if self.in_cymatics_tab and self.div_depth == self.tab_div_depth:
                self.in_cymatics_tab = False
            self.div_depth -= 1

parser = MyHTMLParser()
try:
    with open('/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/public/mindwave.html', 'r') as f:
        parser.feed(f.read())
    print("HTML Parse successful. Div depth at end: ", parser.div_depth)
except Exception as e:
    print("HTML Parse Error:", e)

