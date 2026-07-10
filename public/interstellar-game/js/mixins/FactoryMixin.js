import { ShipFactory } from '../factory/ShipFactory.js';
import { FactoryRenderer } from '../factory/FactoryRenderer.js';

export function applyFactoryMixin(EngineClass) {
    Object.assign(EngineClass.prototype, {
        initFactory() {
            this.factory = new ShipFactory(this);
            this.factoryRenderer = new FactoryRenderer(this.factory, 'factoryPreviewCanvas');
            
            // Wire up UI events
            document.querySelectorAll('.factory-tab').forEach(tab => {
                tab.addEventListener('click', (e) => {
                    const category = e.currentTarget.dataset.category;
                    this.switchFactoryCategory(category);
                });
            });
            
            document.getElementById('factoryApplyBtn').addEventListener('click', () => {
                this.closeFactory();
            });
            
            // Initial render
            this.switchFactoryCategory('chassis');
        },
        
        openFactory() {
            document.getElementById('factoryModal').classList.remove('hidden');
            document.getElementById('factoryModal').classList.add('active');
            this.factoryRenderer.start();
            this.updateFactoryUI();
        },
        
        closeFactory() {
            document.getElementById('factoryModal').classList.remove('active');
            // Allow transition to finish before hiding
            setTimeout(() => {
                document.getElementById('factoryModal').classList.add('hidden');
            }, 300);
            this.factoryRenderer.stop();
        },
        
        switchFactoryCategory(category) {
            document.querySelectorAll('.factory-tab').forEach(t => t.classList.remove('active'));
            document.querySelector(`.factory-tab[data-category="${category}"]`).classList.add('active');
            
            document.getElementById('factoryCategoryLabel').textContent = category.toUpperCase();
            
            const listContainer = document.getElementById('factoryItemList');
            listContainer.innerHTML = '';
            
            const items = this.factory.availableComponents[category];
            if (!items || items.length === 0) {
                listContainer.innerHTML = '<div style="text-align: center; color: #5c7a8a; padding: 40px 0;">NO COMPONENTS AVAILABLE</div>';
                return;
            }
            
            items.forEach(item => {
                const isEquipped = category === 'chassis' ? 
                    (this.factory.currentChassis === item.id) : 
                    (this.factory.equipped[category] === item.id);
                    
                const itemDiv = document.createElement('div');
                itemDiv.className = `factory-item ${isEquipped ? 'equipped' : ''}`;
                
                let statsHtml = '';
                if (item.speed) statsHtml += `<span style="color:#88a0b0;margin-right:10px;">SPD ${item.speed > 0 ? '+'+item.speed : item.speed}</span>`;
                if (item.fire) statsHtml += `<span style="color:#ff0055;margin-right:10px;">DMG ${item.fire > 0 ? '+'+item.fire : item.fire}</span>`;
                if (item.shield) statsHtml += `<span style="color:#00ff66;margin-right:10px;">SHD ${item.shield > 0 ? '+'+item.shield : item.shield}</span>`;
                if (item.energy) statsHtml += `<span style="color:#00f3ff;">ENG ${item.energy > 0 ? '+'+item.energy : item.energy}</span>`;
                
                itemDiv.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                        <span style="font-weight: bold; color: ${item.color || '#fff'};">${item.name.toUpperCase()}</span>
                        ${isEquipped ? '<span style="font-size:10px;color:#00f3ff;border:1px solid #00f3ff;padding:2px 4px;border-radius:4px;">INSTALLED</span>' : ''}
                    </div>
                    <div style="font-size: 11px; color: #88a0b0; margin-bottom: 8px;">${item.desc || 'Standard issue component.'}</div>
                    <div style="font-size: 10px;">${statsHtml}</div>
                `;
                
                itemDiv.addEventListener('click', () => {
                    this.factory.equipComponent(category, item.id);
                    this.switchFactoryCategory(category); // Re-render list to show 'INSTALLED'
                    this.updateFactoryUI();
                });
                
                listContainer.appendChild(itemDiv);
            });
        },
        
        updateFactoryUI() {
            const stats = this.factory.calculateStats();
            document.getElementById('facStatSpeed').textContent = stats.speed;
            document.getElementById('facStatFire').textContent = stats.fire;
            document.getElementById('facStatShield').textContent = stats.shield;
            document.getElementById('facStatEnergy').textContent = stats.energy;
        }
    });
}
