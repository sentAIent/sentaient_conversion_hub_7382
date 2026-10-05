export class InputManager {
    constructor(engine) {
        this.engine = engine;
        this.keys = {};
        
        // Ensure state variables exist on engine
        if (!this.engine.pointer) {
            this.engine.pointer = {
                isDown: false,
                startX: 0, startY: 0,
                dragging: false,
                onCanvas: false,
                orbitMode: false,
                panMode: false,
                button: 0,
                camStartX: 0, camStartY: 0,
                rotStartX: 0, rotStartY: 0,
                lastWorldX: 0, lastWorldY: 0
            };
        }

        this.initKeyboardListeners();
        this.initPointerListeners();
    }

    initKeyboardListeners() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            this.keys[e.key] = true; // Support both format
        });
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
            this.keys[e.key] = false;
        });
    }

    isPressed(keyCode) {
        return !!this.keys[keyCode];
    }

    initPointerListeners() {
        const canvas = this.engine.canvas;
        if (!canvas) return;

        canvas.addEventListener('pointerdown', this.onPointerDown.bind(this));
        window.addEventListener('pointermove', this.onPointerMove.bind(this));
        window.addEventListener('pointerup', this.onPointerUp.bind(this));
        canvas.addEventListener('contextmenu', this.onRightClick.bind(this));
        canvas.addEventListener('wheel', this.onWheel.bind(this), { passive: false });
    }

    toggleMobileControls() {
        const joy = document.getElementById('joystick-container');
        if (joy) {
            joy.style.display = joy.style.display === 'none' ? 'block' : 'none';
        }
    }

    initJoystick() {
        const base = document.getElementById('joystick-base');
        const stick = document.getElementById('joystick-stick');
        const container = document.getElementById('joystick-container');

        if (window.innerWidth <= 768 && container) {
            container.style.display = 'block';
            this.engine.joystickActive = true;
        }

        if (!base || !stick) return;

        let startX = 0, startY = 0;
        const maxDist = 35; 

        const handleStart = (e) => {
            e.preventDefault();
            const touch = e.touches ? e.touches[0] : e;
            startX = touch.clientX;
            startY = touch.clientY;
            this.engine.joystickActive = true;
        };

        const handleMove = (e) => {
            if (!this.engine.joystickActive) return;
            e.preventDefault();
            const touch = e.touches ? e.touches[0] : e;

            let dx = touch.clientX - startX;
            let dy = touch.clientY - startY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > maxDist) {
                dx = (dx / Math.max(0.1, dist)) * maxDist;
                dy = (dy / Math.max(0.1, dist)) * maxDist;
            }

            stick.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;

            this.engine.joyInputX = dx / maxDist;
            this.engine.joyInputY = dy / maxDist;
        };

        const handleEnd = (e) => {
            e.preventDefault();
            this.engine.joystickActive = false;
            this.engine.joyInputX = 0;
            this.engine.joyInputY = 0;
            stick.style.transform = `translate(-50%, -50%)`;
        };

        base.addEventListener('touchstart', handleStart, { passive: false });
        base.addEventListener('touchmove', handleMove, { passive: false });
        base.addEventListener('touchend', handleEnd, { passive: false });

        base.addEventListener('mousedown', handleStart);
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleEnd);
    }

    onPointerDown(e) {
        const engine = this.engine;
        engine.pointer.button = e.button;

        if (engine.showWelcomeOverlay) {
            const w = engine.canvas.width;
            const h = engine.canvas.height;
            const cardH = 360;
            const cy = (h - cardH) / 2;
            const btnW = 220;
            const btnH = 42;
            const btnX = w / 2 - btnW / 2;
            const rewardY = cy + 120 + 4 * 26 + 15;
            const btnY = rewardY + 30;

            const rect = engine.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            if (mouseX >= btnX && mouseX <= btnX + btnW &&
                mouseY >= btnY && mouseY <= btnY + btnH) {
                engine.dismissWelcomeOverlay(true);
            }
            return; 
        }

        engine.pointer.onCanvas = (e.target === engine.canvas);

        if (engine.pointer.onCanvas && document.activeElement && document.activeElement.tagName === 'INPUT') {
            document.activeElement.blur();
            engine.pointer.onCanvas = false;
            return;
        }

        engine.pointer.isDown = true;
        engine.pointer.startX = e.clientX;
        engine.pointer.startY = e.clientY;
        engine.pointer.camStartX = engine.camera.x;
        engine.pointer.camStartY = engine.camera.y;
        engine.pointer.rotStartX = engine.rotationX;
        engine.pointer.rotStartY = engine.rotationY;

        engine.pointer.orbitMode = (e.button === 1) || (e.button === 0 && e.altKey);
        engine.pointer.panMode = (e.button === 0 && (e.shiftKey || document.body.classList.contains('splash-active')));

        if (engine.pointer.orbitMode || engine.pointer.panMode) {
            return;
        }

        const world = engine.getWorldPos(e);
        const hitDist = (engine.config.starBaseRad * 4) / engine.camera.zoom;
        const starHit = engine.stars.find(s => Math.hypot(s.x - world.x, s.y - world.y) < hitDist);

        if (starHit) {
            engine.refreshClusterAssignments();

            if (engine.mode === 'select' && starHit.clusterId) {
                engine.draggedClusterId = String(starHit.clusterId);
                engine.pointer.lastWorldX = world.x;
                engine.pointer.lastWorldY = world.y;
                engine.saveState();
                return;
            }

            if (engine.mode === 'draw') {
                engine.draggedStar = starHit;
                engine.saveState();
            }
        }
    }

    onPointerMove(e) {
        const engine = this.engine;
        
        if (engine.showWelcomeOverlay) {
            const w = engine.canvas.width;
            const h = engine.canvas.height;
            const cy = h / 2;
            const btnW = 220;
            const btnH = 42;
            const btnX = w / 2 - btnW / 2;
            const rewardY = cy + 120 + 4 * 26 + 15;
            const btnY = rewardY + 30;

            const rect = engine.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            if (mouseX >= btnX && mouseX <= btnX + btnW &&
                mouseY >= btnY && mouseY <= btnY + btnH) {
                engine.canvas.style.cursor = 'pointer';
            } else {
                engine.canvas.style.cursor = 'default';
            }
            return; 
        }

        const world = engine.getWorldPos(e);

        const hitDist = (engine.config.starBaseRad * 4) / engine.camera.zoom;
        engine.hoveredStar = engine.stars.find(s => Math.hypot(s.x - world.x, s.y - world.y) < hitDist);

        let newCursor = 'default';
        if (engine.pointer.orbitMode && engine.pointer.isDown) {
            newCursor = 'grab';
        } else if (engine.pointer.panMode && engine.pointer.isDown) {
            newCursor = 'move';
        } else if (engine.draggedStar || engine.draggedClusterId || engine.pointer.dragging) {
            newCursor = 'grabbing';
        } else if (engine.hoveredStar) {
            newCursor = 'move';
        } else if (engine.mode === 'draw') {
            newCursor = 'crosshair';
        }
        engine.canvas.style.cursor = newCursor;


        if (!engine.pointer.isDown) return;

        const dx = e.clientX - engine.pointer.startX;
        const dy = e.clientY - engine.pointer.startY;
        const distMoved = Math.hypot(dx, dy);

        if (distMoved > 5) {
            engine.pointer.dragging = true;
        }

        if (engine.pointer.orbitMode) {
            engine.rotationY = engine.pointer.rotStartY + dx * 0.5;
            engine.rotationX = engine.pointer.rotStartX + dy * 0.5;
            engine.draw();
            const rotXSliderEl = document.getElementById('rotXSlider');
            const rotYSliderEl = document.getElementById('rotYSlider');
            if (rotXSliderEl) {
                rotXSliderEl.value = engine.rotationX % 360;
                document.getElementById('rotXValue').textContent = Math.round(engine.rotationX % 360) + '°';
            }
            if (rotYSliderEl) {
                rotYSliderEl.value = engine.rotationY % 360;
                document.getElementById('rotYValue').textContent = Math.round(engine.rotationY % 360) + '°';
            }
            return;
        }

        if (engine.pointer.panMode) {
            engine.camera.x = engine.pointer.camStartX + dx;
            engine.camera.y = engine.pointer.camStartY + dy;
            if (!engine.flightMode) engine.draw();
            return;
        }

        if (engine.draggedClusterId) {
            const deltaWorldX = world.x - engine.pointer.lastWorldX;
            const deltaWorldY = world.y - engine.pointer.lastWorldY;

            const draggedIdString = engine.draggedClusterId;
            engine.stars.forEach(s => {
                if (String(s.clusterId) === draggedIdString) {
                    s.x += deltaWorldX;
                    s.y += deltaWorldY;
                }
            });

            engine.pointer.lastWorldX = world.x;
            engine.pointer.lastWorldY = world.y;
            return;
        }

        if (engine.draggedStar) {
            engine.draggedStar.x = world.x;
            engine.draggedStar.y = world.y;
            return;
        }

        if (engine.pointer.dragging) {
            engine.rotationY = engine.pointer.rotStartY + dx * 0.5;
            engine.rotationX = engine.pointer.rotStartX + dy * 0.5;
            engine.draw();
            const rotXSliderEl = document.getElementById('rotXSlider');
            const rotYSliderEl = document.getElementById('rotYSlider');
            if (rotXSliderEl) {
                rotXSliderEl.value = engine.rotationX % 360;
                document.getElementById('rotXValue').textContent = Math.round(engine.rotationX % 360) + '°';
            }
            if (rotYSliderEl) {
                rotYSliderEl.value = engine.rotationY % 360;
                document.getElementById('rotYValue').textContent = Math.round(engine.rotationY % 360) + '°';
            }
        }
    }

    onPointerUp(e) {
        const engine = this.engine;
        const wasNavigating = engine.pointer.orbitMode || engine.pointer.panMode;

        if (engine.pointer.onCanvas && !wasNavigating) {
            const world = engine.getWorldPos(e);
            const hitDist = (engine.config.starBaseRad * 4) / engine.camera.zoom;
            const clickedStar = engine.stars.find(s => Math.hypot(s.x - world.x, s.y - world.y) < hitDist);

            if (!engine.pointer.dragging && !clickedStar) {
                if (engine.mode === 'draw') {
                    engine.saveState(); 

                    const center = engine.getConstellationCenter();
                    engine._cachedRotationCenter = { x: center.x, y: center.y, z: center.z };
                    const pos3D = engine.inverseRotate3D(world.x, world.y, center.x, center.y);

                    engine.createStar(pos3D.x, pos3D.y, pos3D.z);

                    setTimeout(() => { engine._cachedRotationCenter = null; }, 100);
                }
            }
        }

        engine.pointer.isDown = false;
        engine.pointer.dragging = false;
        engine.pointer.onCanvas = false;
        engine.pointer.orbitMode = false;
        engine.pointer.panMode = false;
        engine.pointer.button = 0;
        engine.draggedStar = null;
        engine.draggedClusterId = null;
    }

    onRightClick(e) {
        const engine = this.engine;
        e.preventDefault(); 
        const world = engine.getWorldPos(e);
        const hitDist = (engine.config.starBaseRad * 4) / engine.camera.zoom;

        const clickedStarIndex = engine.stars.findIndex(s => Math.hypot(s.x - world.x, s.y - world.y) < hitDist);

        if (clickedStarIndex !== -1) {
            engine.saveState(); 
            engine.stars.splice(clickedStarIndex, 1);
            engine.showToast(`Deleted star`);
            engine.draw();
            return;
        }

        const lineHitDist = 5 / engine.camera.zoom; 
        for (let i = 0; i < engine.stars.length; i++) {
            const s1 = engine.stars[i];
            for (let j = i + 1; j < engine.stars.length; j++) {
                const s2 = engine.stars[j];

                if (Math.hypot(s1.x - s2.x, s1.y - s2.y) > engine.config.maxConnectDist) continue;

                const lineLen = Math.hypot(s2.x - s1.x, s2.y - s1.y);
                if (lineLen === 0) continue;

                const t = Math.max(0, Math.min(1, ((world.x - s1.x) * (s2.x - s1.x) + (world.y - s1.y) * (s2.y - s1.y)) / (lineLen * lineLen)));
                const projX = s1.x + t * (s2.x - s1.x);
                const projY = s1.y + t * (s2.y - s1.y);
                const dist = Math.hypot(world.x - projX, world.y - projY);

                if (dist < lineHitDist) {
                    engine.saveState(); 
                    const indices = [i, j].sort((a, b) => b - a); 
                    engine.stars.splice(indices[0], 1);
                    engine.stars.splice(indices[1], 1);
                    engine.showToast(`Deleted connection`);
                    engine.draw();
                    return;
                }
            }
        }
    }

    onWheel(e) {
        const engine = this.engine;
        e.preventDefault();

        const zoomFactor = 1.05;
        if (e.deltaY < 0) {
            engine.camera.zoom *= zoomFactor;
        } else {
            engine.camera.zoom /= zoomFactor;
        }

        engine.camera.zoom = Math.max(0.1, Math.min(6, engine.camera.zoom));
        if (!engine.flightMode) {
            engine.draw();
        }
    }
}
