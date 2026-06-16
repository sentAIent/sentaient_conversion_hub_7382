import re

with open('public/binaural-assets/js/visuals/visualizer_nuclear_vPERFECT.js', 'r') as f:
    content = f.read()

# 1. Add updateLogoTexture, initOverlayLogo, setLogoOpacity
logo_methods = """
    updateLogoTexture() {
        if (!this.originalLogoImg) return;
        const renderSize = 512;
        // Reuse offscreen canvas instead of creating a new one each time
        if (!this._logoRenderCanvas) {
            this._logoRenderCanvas = document.createElement("canvas");
            this._logoRenderCanvas.width = renderSize;
            this._logoRenderCanvas.height = renderSize;
        }
        const canvas = this._logoRenderCanvas;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.clearRect(0, 0, renderSize, renderSize);

        ctx.drawImage(this.originalLogoImg, 0, 0, renderSize, renderSize);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        const themeName = document.body.dataset.theme || 'default';
        const currentTheme = THEMES[themeName] || THEMES.default;
        const secondaryHex = currentTheme.secondary || currentTheme.accent || '#ffffff';

        const manColor = (this.customColors && this.customColors['mandala']) ? this.customColors['mandala'] : this.customColor;
        const accentHex = manColor ? manColor.getHex() : parseInt(currentTheme.accent.replace('#', ''), 16);
        const secondaryInt = parseInt(secondaryHex.replace('#', ''), 16);

        const accentR = (accentHex >> 16) & 255;
        const accentG = (accentHex >> 8) & 255;
        const accentB = accentHex & 255;

        const secondaryR = (secondaryInt >> 16) & 255;
        const secondaryG = (secondaryInt >> 8) & 255;
        const secondaryB = secondaryInt & 255;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
            if (a < 10) continue;

            // Detect M and W (brightest parts of original logo)
            if (r > 200 && g > 200 && b > 200) {
                // PRIMARY ACCENT for M/W
                data[i] = accentR;
                data[i + 1] = accentG;
                data[i + 2] = accentB;
                data[i + 3] = 255;
            } else {
                // CURATED SECONDARY for petals/outlines
                data[i] = secondaryR;
                data[i + 1] = secondaryG;
                data[i + 2] = secondaryB;
                // Maintain internal logo detail via texture alpha
                data[i + 3] = Math.min(255, a * 1.5);
            }
        }
        ctx.putImageData(imageData, 0, 0);

        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = true;
        if (this.renderer) {
            texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
        }

        if (!this.logoMesh) {
            const geometry = new THREE.PlaneGeometry(5.625, 4.78);
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 0.8,
                color: 0xffffff,
                depthTest: false,
                depthWrite: false
            });

            this.logoMesh = new THREE.Mesh(geometry, material);
            this.logoMesh.position.set(0, 0, -10);
            this.logoMesh.renderOrder = -1;
            this.scene.add(this.logoMesh);
        } else {
            const oldMap = this.logoMesh.material.map;
            this.logoMesh.material.map = texture;
            this.logoMesh.material.needsUpdate = true;
            if (oldMap) oldMap.dispose();
        }
    }

    initOverlayLogo() {
        if (this.logoMesh) return;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = 'binaural-assets/images/mindwave-logo.png'; // using correct path relative to HTML
        img.onload = () => {
            this.originalLogoImg = img;
            this.updateLogoTexture();

            // Apply pending opacity if any
            if (this.targetLogoOpacity !== undefined) {
                this.setLogoOpacity(this.targetLogoOpacity);
            } else {
                this.setLogoOpacity(0.8);
            }
        };
        img.onerror = (err) => {
            console.warn('[Visualizer] Failed to load logo:', err);
            // Fallback: Just draw a shape or text if image fails
            const canvas = document.createElement('canvas');
            canvas.width = 512; canvas.height = 512;
            const ctx = canvas.getContext('2d');
            ctx.font = 'bold 300px monospace';
            ctx.fillStyle = '#2dd4bf';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('🪷', 256, 256);
            this.originalLogoImg = canvas;
            this.updateLogoTexture();
        };
    }

    setLogoOpacity(targetOpacity) {
        this.targetLogoOpacity = targetOpacity;

        // Update 3D Logo Mesh
        if (this.logoMesh && this.logoMesh.material) {
            this.logoMesh.material.opacity = targetOpacity * this.brightnessMultiplier;
        } else if (!this.logoMesh && targetOpacity > 0) {
            this.initOverlayLogo();
        }
    }
"""
content = re.sub(r'setVibrationEnabled\(enabled\) \{\s*this\.vibrationEnabled = enabled;\s*\}', 'setVibrationEnabled(enabled) {\n        this.vibrationEnabled = enabled;\n    }\n\n' + logo_methods, content)

# 2. Call initOverlayLogo in init()
content = re.sub(r'(this\.initLights\(\);\s*this\.initMaterials\(\);)', r'\1\n        this.initOverlayLogo();', content)

# 3. Call updateLogoTexture in applyTheme
content = re.sub(r'(if \(this\.cyberRain && this\.cyberRain\.material\)\s*\{\s*if \(this\.cyberRain\.material\.uniforms && this\.cyberRain\.material\.uniforms\.uColor\)\s*\{\s*this\.cyberRain\.material\.uniforms\.uColor\.value\.set\(hex\);\s*\}\s*\})', r'\1\n        if (this.logoMesh && this.originalLogoImg) {\n            this.updateLogoTexture();\n        }', content)

# 4. Handle logoMesh opacity in update(dt)
update_logo_opacity = """
            // ── Lotus / Logo ──────────────────────────────────────────────
            if (this.logoMesh) {
                const lotusMode = state.lotusState || 'auto';
                let lotusAlpha = 0.8;
                if (lotusMode === 'faded') lotusAlpha = 0.15;
                else if (lotusMode === 'full') lotusAlpha = 1.0;
                else if (lotusMode === 'heartbeat') lotusAlpha = 0.2 + 0.8 * beatPulse;
                else lotusAlpha = 0.4 + (vNormBass * 0.6);

                if (this._lotusCurrentOpacity === undefined) this._lotusCurrentOpacity = 0.8;
                this._lotusCurrentOpacity += (lotusAlpha - this._lotusCurrentOpacity) * 0.1;
                this.logoMesh.material.opacity = this._lotusCurrentOpacity;
                this.logoMesh.scale.setScalar(1.0 + vNormBass * (0.05 + this._cymaticV2?.shiver * 0.1) + vBeatPulse * 0.02);
            }
"""
content = re.sub(r'(// ── LAVA BLOBS / THERMAL FLUIDS ──────────────────────────────)', update_logo_opacity + r'\n            \1', content)

# 5. Fix cyber texture text if it still has lotus
content = content.replace('let text = (this.cyberCustomText && (this.cyberLogicMode===\'custom\'||this.cyberLogicMode===\'txt\')) ? "🪷"+this.cyberCustomText : "MINDWAVE";', 'let text = (this.cyberCustomText && (this.cyberLogicMode===\'custom\'||this.cyberLogicMode===\'txt\')) ? this.cyberCustomText : "MINDWAVE";')
content = content.replace('if(seq[i]==="LOGO") ctx.fillText("🪷", 0, 0); else ctx.fillText(seq[i], 0, 0);', 'ctx.fillText(seq[i], 0, 0);')

with open('public/binaural-assets/js/visuals/visualizer_nuclear_vPERFECT.js', 'w') as f:
    f.write(content)
