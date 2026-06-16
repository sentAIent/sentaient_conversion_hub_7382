from bs4 import BeautifulSoup
import re

with open('/Users/infinitealpha/Dev/BinauralBeats/v7_restore/mindwave.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

sections = soup.find_all('div', class_='cymatics-class-section')

for section in sections:
    # Find the h4 title to extract class ID
    h4 = section.find('h4')
    if not h4:
        continue
    
    # We can also get class ID from the existing color pickers or sliders
    slider = section.find('input', class_='cymatic-intensity-slider')
    if not slider:
        continue
        
    class_id_str = slider.get('data-class')
    if not class_id_str:
        continue
        
    class_id = int(class_id_str)
    
    # 1. Update Color Pickers
    color_container = section.find('div', class_=lambda c: c and 'flex items-center gap-1 bg-black/40' in c)
    if color_container:
        color_container.clear() # Clear existing pickers
        
        # Determine number of pickers
        if class_id == 22:
            num_pickers = 0
            color_container.decompose() # Remove the container entirely
        elif class_id in [12, 16, 25]:
            num_pickers = 1
        else:
            num_pickers = 2
            
        if num_pickers > 0:
            p1 = soup.new_tag('input', type='color', value='#60a9ff', title='Primary Color')
            p1['class'] = 'cymatic-color-picker w-4 h-4 rounded cursor-pointer border-none p-0 bg-transparent'
            p1['data-class'] = str(class_id)
            p1['data-color'] = '1'
            color_container.append(p1)
            
            if num_pickers == 2:
                # Add whitespace
                color_container.append("\n                ")
                p2 = soup.new_tag('input', type='color', value='#a855f7', title='Secondary Color')
                p2['class'] = 'cymatic-color-picker w-4 h-4 rounded cursor-pointer border-none p-0 bg-transparent'
                p2['data-class'] = str(class_id)
                p2['data-color'] = '2'
                color_container.append(p2)
                color_container.append("\n            ")
    
    # 2. Update Sliders
    # First, let's find the container that holds the intensity slider
    intensity_div = slider.parent
    slider_container = intensity_div.parent # This is the div holding variations AND the sliders.
    
    # Actually, let's just create a new div for "advanced parameters" and append it after intensity.
    # Check if we already added it (idempotency)
    adv_container = section.find('div', class_='cymatic-advanced-params')
    if adv_container:
        adv_container.decompose()
        
    adv_container = soup.new_tag('div')
    adv_container['class'] = 'cymatic-advanced-params mt-3 flex flex-col gap-3'
    
    def create_slider(param_name, label, min_val, max_val, default_val, step='1'):
        wrapper = soup.new_tag('div')
        header = soup.new_tag('div')
        header['class'] = 'flex justify-between text-xs text-white/50 mb-1 px-1'
        span_label = soup.new_tag('span')
        span_label.string = label
        span_val = soup.new_tag('span')
        span_val['class'] = 'value-display'
        span_val.string = str(default_val)
        header.append(span_label)
        header.append(span_val)
        
        inp = soup.new_tag('input', type='range', min=min_val, max=max_val, value=default_val, step=step)
        inp['class'] = 'cymatic-param-slider w-full accent-cyan-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer'
        inp['data-class'] = str(class_id)
        inp['data-param'] = param_name
        
        wrapper.append(header)
        wrapper.append(inp)
        return wrapper

    def create_toggle(param_name, label, default_checked=False):
        wrapper = soup.new_tag('div')
        wrapper['class'] = 'flex justify-between items-center text-xs text-white/50 px-1 mt-1'
        span_label = soup.new_tag('span')
        span_label.string = label
        
        lbl = soup.new_tag('label')
        lbl['class'] = 'relative inline-flex items-center cursor-pointer'
        inp = soup.new_tag('input', type='checkbox')
        inp['class'] = 'sr-only peer cymatic-param-toggle'
        inp['data-class'] = str(class_id)
        inp['data-param'] = param_name
        if default_checked:
            inp['checked'] = ''
        
        bg = soup.new_tag('div')
        bg['class'] = "w-7 h-4 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-cyan-500"
        
        lbl.append(inp)
        lbl.append(bg)
        
        wrapper.append(span_label)
        wrapper.append(lbl)
        return wrapper

    if class_id in [17, 18]:
        adv_container.append(create_slider('speed', 'Speed', '0.1', '3.0', '1.0', '0.1'))
    elif class_id == 19:
        adv_container.append(create_slider('speed', 'Speed', '0.1', '3.0', '1.0', '0.1'))
        adv_container.append(create_slider('harmonics', 'Harmonics', '1', '10', '3', '1'))
        adv_container.append(create_slider('resonance', 'Resonance', '0.1', '5.0', '1.5', '0.1'))
        adv_container.append(create_slider('entropy', 'Entropy', '0.0', '2.0', '0.5', '0.1'))
        adv_container.append(create_slider('flow', 'Flow Dynamics', '0.1', '2.0', '1.0', '0.1'))
    elif class_id == 24:
        adv_container.append(create_toggle('showLines', 'Show Constellation Lines', True))
    elif class_id == 25:
        adv_container.append(create_slider('observer', 'Observer Effect', '0.0', '1.0', '0.0', '0.01'))
        
    if len(adv_container.contents) > 0:
        intensity_div.insert_after(adv_container)

with open('/Users/infinitealpha/Dev/BinauralBeats/v7_restore/mindwave.html', 'w', encoding='utf-8') as f:
    f.write(str(soup))

print("Updated HTML successfully.")
