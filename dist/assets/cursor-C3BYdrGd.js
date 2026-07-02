import{N as g}from"./share-xU1EMj-r.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";import"https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";const c={sun:{name:"Sun",icon:"☀️",create:t=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="32" height="32">
            <g>
                <polygon points="46,35 54,35 50,8"  fill="${t}" transform="rotate(0,50,50)"/>
                <polygon points="46,35 54,35 50,8"  fill="${t}" transform="rotate(45,50,50)"/>
                <polygon points="46,35 54,35 50,8"  fill="${t}" transform="rotate(90,50,50)"/>
                <polygon points="46,35 54,35 50,8"  fill="${t}" transform="rotate(135,50,50)"/>
                <polygon points="46,35 54,35 50,8"  fill="${t}" transform="rotate(180,50,50)"/>
                <polygon points="46,35 54,35 50,8"  fill="${t}" transform="rotate(225,50,50)"/>
                <polygon points="46,35 54,35 50,8"  fill="${t}" transform="rotate(270,50,50)"/>
                <polygon points="46,35 54,35 50,8"  fill="${t}" transform="rotate(315,50,50)"/>
                <polygon points="48,35 52,35 50,18" fill="${t}" transform="rotate(22.5,50,50)"/>
                <polygon points="48,35 52,35 50,18" fill="${t}" transform="rotate(67.5,50,50)"/>
                <polygon points="48,35 52,35 50,18" fill="${t}" transform="rotate(112.5,50,50)"/>
                <polygon points="48,35 52,35 50,18" fill="${t}" transform="rotate(157.5,50,50)"/>
                <polygon points="48,35 52,35 50,18" fill="${t}" transform="rotate(202.5,50,50)"/>
                <polygon points="48,35 52,35 50,18" fill="${t}" transform="rotate(247.5,50,50)"/>
                <polygon points="48,35 52,35 50,18" fill="${t}" transform="rotate(292.5,50,50)"/>
                <polygon points="48,35 52,35 50,18" fill="${t}" transform="rotate(337.5,50,50)"/>
                <circle cx="50" cy="50" r="15" fill="none" stroke="${t}" stroke-width="5"/>
            </g>
        </svg>`},moon:{name:"Moon",icon:"🌙",create:t=>`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <path d="M 26 4 A 14 14 0 1 1 4 26 A 16 16 0 0 0 26 4 Z" fill="${t}"/>
        </svg>`},heart:{name:"Heart",icon:"❤️",create:t=>`<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 24l-1.5-1.3C7.4 18.1 4 15.1 4 11.5 4 8.4 6.4 6 9.5 6c1.7 0 3.4.8 4.5 2.1 1.1-1.3 2.8-2.1 4.5-2.1 3.1 0 5.5 2.4 5.5 5.5 0 3.6-3.4 6.6-8.5 11.2L14 24z" fill="${t}"/>
        </svg>`},lotus:{name:"Lotus",icon:"🪷",create:t=>`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <ellipse cx="16" cy="16" rx="4" ry="8" fill="${t}" opacity="0.8"/>
            <ellipse cx="16" cy="16" rx="4" ry="8" fill="${t}" opacity="0.6" transform="rotate(45 16 16)"/>
            <ellipse cx="16" cy="16" rx="4" ry="8" fill="${t}" opacity="0.6" transform="rotate(-45 16 16)"/>
            <ellipse cx="16" cy="16" rx="4" ry="8" fill="${t}" opacity="0.6" transform="rotate(90 16 16)"/>
            <circle cx="16" cy="16" r="3" fill="${t}"/>
        </svg>`},mindwave:{name:"MindWave",icon:"mw",create:(t,e)=>`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 128 128">
            <!-- Branded M/W MindWave Logo -->
            <g stroke-linecap="round" stroke-linejoin="round" fill="none">
                <!-- Outer Petal Outline (Curated Secondary) -->
                <path d="M64 20 C80 20 108 50 108 80 C108 105 88 115 64 115 C40 115 20 105 20 80 C20 50 48 20 64 20 Z" stroke="${e||t}" stroke-width="6" opacity="0.4"/>
                <!-- Branded M shape (Primary Accent) -->
                <path d="M40 85 L52 55 L64 75 L76 55 L88 85" stroke="${t}" stroke-width="8"/>
                <!-- Underline Wave (Primary Accent) -->
                <path d="M30 95 C45 85 83 85 98 95" stroke="${t}" stroke-width="4" opacity="0.6"/>
            </g>
        </svg>`},sun2:{name:"Sun 2",icon:"🌞",create:()=>null},default:{name:"Default",icon:"↖",create:()=>null}};let n="lotus",s=null,d=1;function k(){g.currentTheme=localStorage.getItem("mindwave_theme")||"default";const t=localStorage.getItem("mindwave_cursor_shape");t&&c[t]?n=t:(n="default",localStorage.setItem("mindwave_cursor_shape","default"));const e=localStorage.getItem("mindwave_cursor_color");e&&(s=e),l(),window.addEventListener("themeChanged",r=>{g.currentTheme=r.detail.name,l()})}function u(){return s||getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#60a9ff"}function w(){return getComputedStyle(document.documentElement).getPropertyValue("--accent-secondary").trim()||"#fb7185"}function l(){let t=document.getElementById("dynamic-cursor-styles");if(t||(t=document.createElement("style"),t.id="dynamic-cursor-styles",document.head.appendChild(t)),n==="default"){t.textContent="";return}const e=u(),r=w();if(n==="sun2"){t.textContent=`body, a, button, [role="button"], input, select, textarea, .cursor-pointer { cursor: url('./tribal-sun-cursor.png') 16 16, auto !important; }`;return}if(n==="mindwave"){t.textContent=`body, a, button, [role="button"], input, select, textarea, .cursor-pointer { cursor: url('./mindwave-cursor.png') 31 31, auto !important; }`;return}const a=c[n].create(e,r);if(!a){t.textContent="";return}let i=a;d!==1&&(i=i.replace("<svg ",`<svg opacity="${d}" `));const o=`url("data:image/svg+xml,${encodeURIComponent(i)}") 16 16, auto`;t.textContent=`body, a, button, [role="button"], input, select, textarea, .cursor-pointer { cursor: ${o} !important; }`}function v(t){c[t]&&(n=t,localStorage.setItem("mindwave_cursor_shape",t),l(),document.querySelectorAll(".cursor-option").forEach(e=>{const r=e.dataset.shape===t;e.classList.toggle("active",r),r?(e.classList.add("bg-[var(--accent)]/20","border-[var(--accent)]"),e.classList.remove("bg-white/5","border-white/10")):(e.classList.remove("bg-[var(--accent)]/20","border-[var(--accent)]"),e.classList.add("bg-white/5","border-white/10"))}))}function y(t){d=t,l()}function m(t){s=t,t?localStorage.setItem("mindwave_cursor_color",t):localStorage.removeItem("mindwave_cursor_color"),l();const e=document.getElementById("cursorColorPicker");e&&t&&(e.value=t);const r=document.getElementById("cursorColorPreview");r&&(r.style.backgroundColor=u())}function f(){m(null)}function C(){const t=document.getElementById("themeGrid");if(!t)return;const e=document.getElementById("cursorSection");e&&e.remove();const r=document.createElement("div");r.id="cursorSection",r.className="mt-6 pt-6 border-t border-white/10",r.innerHTML=`
        <div class="flex items-center gap-3 mb-4">
            <div class="p-2 rounded-lg bg-[var(--accent)]/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="var(--accent)" stroke="var(--accent)" stroke-width="1.5">
                    <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6" fill="none"/>
                </svg>
            </div>
            <div>
                <h3 class="text-sm font-bold tracking-tight" style="color: var(--text-main);">CUSTOM CURSOR</h3>
                <div class="text-xs" style="color: var(--text-main); opacity: 0.7;">Choose shape and color</div>
            </div>
        </div>
        <div class="flex items-center gap-3 mb-4 p-3 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20">
            <span class="text-xs font-medium" style="color: var(--text-main);">Color:</span>
            <div class="relative group">
                <div id="cursorColorPreview" class="w-8 h-8 rounded-full border-2 border-[var(--accent)]/40 cursor-pointer shadow-lg transition-transform hover:scale-110" style="background-color: ${u()};"></div>
                <input type="color" id="cursorColorPicker" value="${s||"#60a9ff"}" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full">
            </div>
            <button id="resetCursorColor" class="px-3 py-1.5 text-[11px] font-semibold rounded-lg bg-[var(--accent)]/20 hover:bg-[var(--accent)]/30 transition-all border border-[var(--accent)]/30" style="color: var(--text-main);">Reset</button>
        </div>
        <div class="grid grid-cols-3 sm:grid-cols-5 gap-2" id="cursorShapeGrid">
            ${Object.entries(c).map(([o,p])=>{const h={sun:"☀️",moon:"🌙",heart:"❤️",mindwave:'<img src="./mindwave-cursor.png" width="24" height="24" style="display:inline-block;">',sun2:"🌞",default:"🖱️"}[o]||"🖱️";return`<button class="cursor-option p-3 rounded-xl text-center transition-all border ${o===n?"active bg-[var(--accent)]/20 border-[var(--accent)]":"bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"}" data-shape="${o}" title="${p.name}"><span class="text-2xl block">${h}</span><div class="text-[10px] mt-1 font-semibold" style="color: var(--text-main);">${p.name}</div></button>`}).join("")}
        </div>`,t.parentElement.appendChild(r),r.querySelectorAll(".cursor-option").forEach(o=>o.addEventListener("click",()=>v(o.dataset.shape)));const a=r.querySelector("#cursorColorPicker");a&&a.addEventListener("input",o=>m(o.target.value));const i=r.querySelector("#resetCursorColor");i&&i.addEventListener("click",()=>{f();const o=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();r.querySelector("#cursorColorPreview")&&(r.querySelector("#cursorColorPreview").style.backgroundColor=o),a&&(a.value=o)})}window.setCursorShape=v;window.setCursorColor=m;window.setCursorOpacity=y;window.resetCursorColor=f;window.createCursorUIInThemeModal=C;export{C as createCursorUIInThemeModal,k as initCursor,f as resetCursorColor,m as setCursorColor,y as setCursorOpacity,v as setCursorShape};
//# sourceMappingURL=cursor-C3BYdrGd.js.map
