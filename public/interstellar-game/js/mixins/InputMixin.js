export function applyInputMixin(EngineClass) {
    Object.assign(EngineClass.prototype, {

        toggleMobileControls() {
                const joy = document.getElementById('joystick-container');
                if (joy) {
                    joy.style.display = joy.style.display === 'none' ? 'block' : 'none';
                }
            },

        initJoystick() {
                const base = document.getElementById('joystick-base');
                const stick = document.getElementById('joystick-stick');
                const container = document.getElementById('joystick-container');

                // Show joystick on init if likely mobile
                // We default to hidden in CSS, but check here
                if (window.innerWidth <= 768 && container) {
                    container.style.display = 'block';
                    this.joystickActive = true;
                }

                if (!base || !stick) return;

                let startX = 0, startY = 0;
                let moveX = 0, moveY = 0;
                const maxDist = 35; // Max movement radius

                const handleStart = (e) => {
                    e.preventDefault();
                    const touch = e.touches ? e.touches[0] : e;
                    startX = touch.clientX;
                    startY = touch.clientY;
                    this.joystickActive = true;
                };

                const handleMove = (e) => {
                    if (!this.joystickActive) return;
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

                    // Normalize -1 to 1
                    this.joyInputX = dx / maxDist;
                    this.joyInputY = dy / maxDist;
                };

                const handleEnd = (e) => {
                    e.preventDefault();
                    this.joystickActive = false;
                    this.joyInputX = 0;
                    this.joyInputY = 0;
                    stick.style.transform = `translate(-50%, -50%)`;
                };

                base.addEventListener('touchstart', handleStart, { passive: false });
                base.addEventListener('touchmove', handleMove, { passive: false });
                base.addEventListener('touchend', handleEnd, { passive: false });

                // Also mouse for testing
                base.addEventListener('mousedown', handleStart);
                window.addEventListener('mousemove', handleMove);
                window.addEventListener('mouseup', handleEnd);
            },

        onPointerDown(e) {
                // Track which button was pressed (0=left, 1=middle, 2=right)
                this.pointer.button = e.button;

                if (this.showWelcomeOverlay) {
                    const w = this.canvas.width;
                    const h = this.canvas.height;
                    const cardH = 360;
                    const cy = (h - cardH) / 2;
                    const btnW = 220;
                    const btnH = 42;
                    const btnX = w / 2 - btnW / 2;
                    const rewardY = cy + 120 + 4 * 26 + 15;
                    const btnY = rewardY + 30;

                    const rect = this.canvas.getBoundingClientRect();
                    const mouseX = e.clientX - rect.left;
                    const mouseY = e.clientY - rect.top;

                    if (mouseX >= btnX && mouseX <= btnX + btnW &&
                        mouseY >= btnY && mouseY <= btnY + btnH) {
                        this.dismissWelcomeOverlay(true);
                    }
                    return; // Block background interactions
                }

                // Only track canvas interactions
                this.pointer.onCanvas = (e.target === this.canvas);

                if (this.pointer.onCanvas && document.activeElement && document.activeElement.tagName === 'INPUT') {
                    document.activeElement.blur();
                    this.pointer.onCanvas = false;
                    return;
                }

                this.pointer.isDown = true;
                this.pointer.startX = e.clientX;
                this.pointer.startY = e.clientY;
                this.pointer.camStartX = this.camera.x;
                this.pointer.camStartY = this.camera.y;
                this.pointer.rotStartX = this.rotationX;
                this.pointer.rotStartY = this.rotationY;

                // Middle mouse button OR Alt+Left = Orbit mode (Blender style)
                // Shift+Left = Pan mode. Also allow default panning if the splash screen is active (user expects it)
                this.pointer.orbitMode = (e.button === 1) || (e.button === 0 && e.altKey);
                this.pointer.panMode = (e.button === 0 && (e.shiftKey || document.body.classList.contains('splash-active')));

                // If orbiting or panning, skip star interactions
                if (this.pointer.orbitMode || this.pointer.panMode) {
                    return;
                }

                const world = this.getWorldPos(e);
                const hitDist = (this.config.starBaseRad * 4) / this.camera.zoom;
                const starHit = this.stars.find(s => Math.hypot(s.x - world.x, s.y - world.y) < hitDist);

                // Refresh cluster assignments if we hit a star, in case we drag a group
                if (starHit) {
                    this.refreshClusterAssignments();

                    // In select mode, clicking a star initiates a cluster drag
                    if (this.mode === 'select' && starHit.clusterId) {
                        // Determine the cluster ID to drag (it's either the cluster name string or the star's ID string)
                        this.draggedClusterId = String(starHit.clusterId);
                        this.pointer.lastWorldX = world.x;
                        this.pointer.lastWorldY = world.y;
                        this.saveState();
                        return;
                    }

                    // If not in select mode, allow single star drag
                    if (this.mode === 'draw') {
                        this.draggedStar = starHit;
                        this.saveState();
                    }
                }
            },

        onPointerMove(e) {
                if (this.showWelcomeOverlay) {
                    const w = this.canvas.width;
                    const h = this.canvas.height;
                    const cy = h / 2;
                    const btnW = 220;
                    const btnH = 42;
                    const btnX = w / 2 - btnW / 2;
                    const rewardY = cy + 120 + 4 * 26 + 15;
                    const btnY = rewardY + 30;

                    const rect = this.canvas.getBoundingClientRect();
                    const mouseX = e.clientX - rect.left;
                    const mouseY = e.clientY - rect.top;

                    if (mouseX >= btnX && mouseX <= btnX + btnW &&
                        mouseY >= btnY && mouseY <= btnY + btnH) {
                        this.canvas.style.cursor = 'pointer';
                    } else {
                        this.canvas.style.cursor = 'default';
                    }
                    return; // Block background interactions
                }

                const world = this.getWorldPos(e);

                // Hover Logic
                const hitDist = (this.config.starBaseRad * 4) / this.camera.zoom;
                this.hoveredStar = this.stars.find(s => Math.hypot(s.x - world.x, s.y - world.y) < hitDist);

                // Cursor Feedback based on mode
                let newCursor = 'default';
                if (this.pointer.orbitMode && this.pointer.isDown) {
                    newCursor = 'grab';
                } else if (this.pointer.panMode && this.pointer.isDown) {
                    newCursor = 'move';
                } else if (this.draggedStar || this.draggedClusterId || this.pointer.dragging) {
                    newCursor = 'grabbing';
                } else if (this.hoveredStar) {
                    newCursor = 'move';
                } else if (this.mode === 'draw') {
                    newCursor = 'crosshair';
                }
                this.canvas.style.cursor = newCursor;


                if (!this.pointer.isDown) return;

                const dx = e.clientX - this.pointer.startX;
                const dy = e.clientY - this.pointer.startY;
                const distMoved = Math.hypot(dx, dy);

                if (distMoved > 5) {
                    this.pointer.dragging = true;
                }

                // PRIORITY 1: Orbit mode (Middle mouse or Alt+Left) - ALWAYS rotates in 3D
                if (this.pointer.orbitMode) {
                    this.rotationY = this.pointer.rotStartY + dx * 0.5;
                    this.rotationX = this.pointer.rotStartX + dy * 0.5;
                    this.draw();
                    // Update UI sliders
                    const rotXSliderEl = document.getElementById('rotXSlider');
                    const rotYSliderEl = document.getElementById('rotYSlider');
                    if (rotXSliderEl) {
                        rotXSliderEl.value = this.rotationX % 360;
                        document.getElementById('rotXValue').textContent = Math.round(this.rotationX % 360) + '°';
                    }
                    if (rotYSliderEl) {
                        rotYSliderEl.value = this.rotationY % 360;
                        document.getElementById('rotYValue').textContent = Math.round(this.rotationY % 360) + '°';
                    }
                    return;
                }

                // PRIORITY 2: Pan mode (Shift + Left drag) - ALWAYS pans
                if (this.pointer.panMode) {
                    this.camera.x = this.pointer.camStartX + dx;
                    this.camera.y = this.pointer.camStartY + dy;
                    // When in background mode (not flight mode), we must explicitly trigger a redraw
                    // to ensure smooth dragging if the background animation loop is slow or paused
                    if (!this.flightMode) this.draw();
                    return;
                }

                // PRIORITY 3: Cluster dragging (in select mode)
                if (this.draggedClusterId) {
                    // Calculate world delta since last move
                    const deltaWorldX = world.x - this.pointer.lastWorldX;
                    const deltaWorldY = world.y - this.pointer.lastWorldY;

                    const draggedIdString = this.draggedClusterId;
                    // Move all stars in the cluster
                    this.stars.forEach(s => {
                        // Use strict comparison on the clusterId string
                        if (String(s.clusterId) === draggedIdString) {
                            s.x += deltaWorldX;
                            s.y += deltaWorldY;
                        }
                    });

                    // Update last position
                    this.pointer.lastWorldX = world.x;
                    this.pointer.lastWorldY = world.y;
                    return;
                }

                // PRIORITY 4: Single star dragging
                if (this.draggedStar) {
                    this.draggedStar.x = world.x;
                    this.draggedStar.y = world.y;
                    return;
                }

                // PRIORITY 5: Empty space drag = rotate by default (Blender-style)
                if (this.pointer.dragging) {
                    this.rotationY = this.pointer.rotStartY + dx * 0.5;
                    this.rotationX = this.pointer.rotStartX + dy * 0.5;
                    this.draw();
                    // Update UI sliders if they exist
                    const rotXSliderEl = document.getElementById('rotXSlider');
                    const rotYSliderEl = document.getElementById('rotYSlider');
                    if (rotXSliderEl) {
                        rotXSliderEl.value = this.rotationX % 360;
                        document.getElementById('rotXValue').textContent = Math.round(this.rotationX % 360) + '°';
                    }
                    if (rotYSliderEl) {
                        rotYSliderEl.value = this.rotationY % 360;
                        document.getElementById('rotYValue').textContent = Math.round(this.rotationY % 360) + '°';
                    }
                }
            },

        onPointerUp(e) {
                // Skip star creation if we were orbiting or panning
                const wasNavigating = this.pointer.orbitMode || this.pointer.panMode;

                // Only process star creation if pointer started on canvas and not navigating
                if (this.pointer.onCanvas && !wasNavigating) {
                    const world = this.getWorldPos(e);
                    const hitDist = (this.config.starBaseRad * 4) / this.camera.zoom;
                    const clickedStar = this.stars.find(s => Math.hypot(s.x - world.x, s.y - world.y) < hitDist);

                    if (!this.pointer.dragging && !clickedStar) {
                        // Empty Space Clicked - Create Star (ONLY in draw mode)
                        if (this.mode === 'draw') {
                            this.saveState(); // Save BEFORE action

                            // Get current rotation center BEFORE adding star
                            // This ensures consistency with how rotate3D renders existing stars
                            const center = this.getConstellationCenter();

                            // Cache the center for rendering stability after star is added
                            // This prevents the visual "jump" when constellation center shifts
                            this._cachedRotationCenter = { x: center.x, y: center.y, z: center.z };

                            // Inverse rotate using the same center that rendering uses
                            const pos3D = this.inverseRotate3D(world.x, world.y, center.x, center.y);

                            this.createStar(pos3D.x, pos3D.y, pos3D.z);

                            // Clear cached center after a brief delay to allow smooth transition
                            setTimeout(() => { this._cachedRotationCenter = null; }, 100);
                        }
                    }
                }

                // Reset interaction state
                this.pointer.isDown = false;
                this.pointer.dragging = false;
                this.pointer.onCanvas = false;
                this.pointer.orbitMode = false;
                this.pointer.panMode = false;
                this.pointer.button = 0;
                this.draggedStar = null;
                this.draggedClusterId = null;
            },

        onRightClick(e) {
                e.preventDefault(); // Prevent context menu
                const world = this.getWorldPos(e);
                const hitDist = (this.config.starBaseRad * 4) / this.camera.zoom;

                // Check if clicking on a star
                const clickedStarIndex = this.stars.findIndex(s => Math.hypot(s.x - world.x, s.y - world.y) < hitDist);

                if (clickedStarIndex !== -1) {
                    // Delete the star
                    this.saveState(); // Save for undo
                    this.stars.splice(clickedStarIndex, 1);
                    this.showToast(`Deleted star`);
                    this.draw();
                    return;
                }

                // Check if clicking on a connection line
                const lineHitDist = 5 / this.camera.zoom; // 5 pixel tolerance
                for (let i = 0; i < this.stars.length; i++) {
                    const s1 = this.stars[i];
                    for (let j = i + 1; j < this.stars.length; j++) {
                        const s2 = this.stars[j];

                        // Only check connected stars
                        if (Math.hypot(s1.x - s2.x, s1.y - s2.y) > this.config.maxConnectDist) continue;

                        // Point-to-line distance formula
                        const lineLen = Math.hypot(s2.x - s1.x, s2.y - s1.y);
                        if (lineLen === 0) continue;

                        const t = Math.max(0, Math.min(1, ((world.x - s1.x) * (s2.x - s1.x) + (world.y - s1.y) * (s2.y - s1.y)) / (lineLen * lineLen)));
                        const projX = s1.x + t * (s2.x - s1.x);
                        const projY = s1.y + t * (s2.y - s1.y);
                        const dist = Math.hypot(world.x - projX, world.y - projY);

                        if (dist < lineHitDist) {
                            // Delete both stars that make up this connection
                            this.saveState(); // Save for undo
                            const indices = [i, j].sort((a, b) => b - a); // Remove in reverse order
                            this.stars.splice(indices[0], 1);
                            this.stars.splice(indices[1], 1);
                            this.showToast(`Deleted connection`);
                            this.draw();
                            return;
                        }
                    }
                }
            },

        onWheel(e) {
                e.preventDefault();

                // Multiplicative/Exponential zoom for smoothness
                const zoomFactor = 1.05;
                if (e.deltaY < 0) {
                    // Zoom IN
                    this.camera.zoom *= zoomFactor;
                } else {
                    // Zoom OUT
                    this.camera.zoom /= zoomFactor;
                }

                // Clamp zoom
                this.camera.zoom = Math.max(0.1, Math.min(6, this.camera.zoom));
                if (!this.flightMode) {
                    this.draw();
                }
            }
    });
}
