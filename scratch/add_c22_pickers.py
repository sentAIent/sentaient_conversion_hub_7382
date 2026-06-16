from bs4 import BeautifulSoup

with open('/Users/infinitealpha/Dev/BinauralBeats/v7_restore/mindwave.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

sections = soup.find_all('div', class_='cymatics-class-section')

for section in sections:
    slider = section.find('input', class_='cymatic-intensity-slider')
    if slider and slider.get('data-class') == '22':
        # Find the h4 element inside the section
        h4 = section.find('h4')
        if h4:
            # Check if there is already a flex items-center gap-3 container
            header_div = h4.parent
            if header_div and 'flex justify-between items-center mb-4' in header_div.get('class', []):
                # The pickers should be in a div with gap-3
                gap3_div = header_div.find('div', class_=lambda c: c and 'gap-3' in c)
                
                color_container = header_div.find('div', class_=lambda c: c and 'flex items-center gap-1 bg-black/40' in c)
                
                if not color_container:
                    # Let's create the container
                    new_container = soup.new_tag('div')
                    new_container['class'] = 'flex items-center gap-1 bg-black/40 px-2 py-1 rounded border border-white/5'
                    
                    p1 = soup.new_tag('input', type='color', value='#60a9ff', title='Primary Color')
                    p1['class'] = 'cymatic-color-picker w-4 h-4 rounded cursor-pointer border-none p-0 bg-transparent'
                    p1['data-class'] = '22'
                    p1['data-color'] = '1'
                    new_container.append(p1)
                    
                    new_container.append("\n                ")
                    
                    p2 = soup.new_tag('input', type='color', value='#a855f7', title='Secondary Color')
                    p2['class'] = 'cymatic-color-picker w-4 h-4 rounded cursor-pointer border-none p-0 bg-transparent'
                    p2['data-class'] = '22'
                    p2['data-color'] = '2'
                    new_container.append(p2)
                    
                    if gap3_div:
                        gap3_div.insert(0, new_container)
                        gap3_div.insert(1, "\n            ")
                    else:
                        print("gap-3 div not found, this is unexpected")
            break

with open('/Users/infinitealpha/Dev/BinauralBeats/v7_restore/mindwave.html', 'w', encoding='utf-8') as f:
    f.write(str(soup))
print("Added pickers for class 22")
