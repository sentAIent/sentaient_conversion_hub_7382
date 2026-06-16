
                    uniform vec3 uColor;
                    uniform vec3 uSecondaryColor;
                    uniform float uMedium;
                    uniform float uEnergy;
                    uniform float uType;
                    varying float vVal;
                    void main() {
                        vec2 coord = gl_PointCoord - vec2(0.5);
                        if(length(coord) > 0.5) discard;
                        
                        // Node particles gracefully inherit primary colors rather than blasting pure white
                        vec3 sandColor = mix(vec3(0.9, 0.7, 0.4), mix(vec3(0.7, 0.8, 1.0), uColor, 0.5), uMedium / 3.0); 
                        vec3 color = mix(sandColor, uColor, vVal * 1.5);
                        
                        if (uType > 5.5 && uType < 6.5) {
                            // TYPE 6: PIXEL STARDUST NEON COLORS
                            vec3 c1 = vec3(0.1, 0.8, 1.0); // Cyan
                            vec3 c2 = vec3(1.0, 0.2, 0.6); // Magenta
                            vec3 c3 = vec3(0.9, 0.8, 0.1); // Gold
                            vec3 c4 = vec3(0.5, 0.1, 0.9); // Purple
                            vec3 c5 = vec3(0.1, 0.9, 0.4); // Neon Green
                            
                            float h = fract(sin(dot(coord, vec2(12.9898, 78.233))) * 43758.5453);
                            float vType = fract(vVal * 10.0);
                            
                            if(vType < 0.2) color = c1;
                            else if(vType < 0.4) color = c2;
                            else if(vType < 0.6) color = c3;
                            else if(vType < 0.8) color = c4;
                            else color = c5;
                            
                            color *= 2.5; // Boost stardust brightness
                        }
                        
                        // Extreme opacity reduction to survive AdditiveBlending of 80,000 tight particles
                        float baseAlpha = mix(0.04, 0.08, uEnergy);
                        float alpha = baseAlpha * (1.0 - clamp(vVal * 1.5, 0.0, 1.0)); 
                        
                        // Dim emission directly
                        color *= 0.4;
                        
                        gl_FragColor = vec4(color, alpha);
                    }
                