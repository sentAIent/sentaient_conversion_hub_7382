const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/mindwave-BpXDINIk.js","assets/modulepreload-polyfill-B5Qt9EMX.js","assets/preload-helper-D7HrI6pR.js","assets/mindwave-DYLJGkh5.css"])))=>i.map(i=>d[i]);
import{_ as L}from"./preload-helper-D7HrI6pR.js";const I=[{id:"foundations",name:"Foundations",emoji:"🌱",description:"Learn the basics of binaural beats",duration:"1-2 weeks",lessons:[{id:"lesson-1",day:1,title:"What Are Binaural Beats?",description:"Understanding how binaural beats affect your brain",type:"info",content:`Binaural beats are created when two slightly different frequencies are played in each ear. Your brain perceives the difference as a third tone, which can help guide your brainwaves into specific states.

For example, if 200Hz plays in your left ear and 210Hz in your right ear, you perceive a 10Hz "beat" - an Alpha wave frequency associated with relaxation.`,action:{preset:"alpha",duration:5},completed:!1},{id:"lesson-2",day:2,title:"Your First Session",description:"5-minute Alpha wave relaxation",type:"practice",content:"Put on your headphones (required for binaural beats), get comfortable, and close your eyes. Let the Alpha waves guide you into a relaxed state.",action:{preset:"alpha",duration:5},completed:!1},{id:"lesson-3",day:3,title:"Understanding Brain Waves",description:"Delta, Theta, Alpha, Beta, Gamma explained",type:"info",content:`**Delta (0.5-4 Hz)** - Deep sleep, healing
**Theta (4-8 Hz)** - Meditation, creativity, REM sleep
**Alpha (8-12 Hz)** - Relaxation, calm focus
**Beta (12-30 Hz)** - Active thinking, concentration
**Gamma (30-100 Hz)** - Peak focus, cognitive enhancement`,action:null,completed:!1},{id:"lesson-4",day:4,title:"Theta for Meditation",description:"7-minute Theta wave session",type:"practice",content:"Theta waves are associated with deep meditation and creativity. This session will help you access a meditative state more easily.",action:{preset:"theta",duration:7},completed:!1},{id:"lesson-5",day:5,title:"Creating Your Routine",description:"Tips for building a daily practice",type:"info",content:`**Tips for success:**
• Same time each day (morning or before bed works best)
• Start with just 5-10 minutes
• Find a quiet, comfortable space
• Use quality headphones
• Track your progress (we'll do this for you!)`,action:null,completed:!1},{id:"lesson-6",day:6,title:"Beta for Focus",description:"10-minute concentration session",type:"practice",content:"Beta waves enhance concentration and alertness. Use this before work or study sessions.",action:{preset:"beta",duration:10},completed:!1},{id:"lesson-7",day:7,title:"Week 1 Complete!",description:"Review and reflection",type:"milestone",content:"Congratulations! You've completed your first week. Reflect on how you felt during each session. Which frequencies resonated most with you?",action:null,completed:!1,badge:"week-1"}]},{id:"building-habit",name:"Building Habits",emoji:"🌿",description:"Establish your daily practice",duration:"Week 3-4",lessons:[{id:"lesson-8",day:8,title:"Morning Integration",description:"Start your day with focus",type:"practice",content:"Use the Wake Up journey to transition from sleep to alertness naturally.",action:{journey:"wakeUp"},completed:!1},{id:"lesson-9",day:9,title:"Longer Sessions",description:"15-minute Alpha session",type:"practice",content:"Extending your sessions helps deepen the benefits. Today, try a longer 15-minute relaxation session.",action:{preset:"alpha",duration:15},completed:!1},{id:"lesson-10",day:10,title:"Evening Wind Down",description:"Prepare for restful sleep",type:"practice",content:"Use the Wind Down journey 30-60 minutes before bed to transition into sleep mode.",action:{journey:"windDown"},completed:!1},{id:"lesson-11",day:11,title:"Combining with Soundscapes",description:"Layer nature sounds with frequencies",type:"info",content:"Adding ambient sounds like rain, ocean, or forest can enhance your sessions. The binaural beat remains effective underneath the soundscape.",action:null,completed:!1},{id:"lesson-12",day:12,title:"Meditation Session",description:"Deep Theta meditation",type:"practice",content:"Use the Meditation journey for a guided frequency sweep into deep meditative states.",action:{journey:"meditation"},completed:!1},{id:"lesson-13",day:13,title:"Rest Day",description:"Reflection and integration",type:"info",content:"Taking breaks is important. Use today to reflect on your experiences so far. Notice any changes in your sleep, focus, or stress levels.",action:null,completed:!1},{id:"lesson-14",day:14,title:"Two Weeks Strong!",description:"Habit milestone achieved",type:"milestone",content:"You've meditated for two weeks! Research shows habits form after 14-21 days of consistency. You're on track!",action:null,completed:!1,badge:"two-weeks"}]},{id:"deepening",name:"Deepening Practice",emoji:"🌳",description:"Advanced techniques and personalization",duration:"Week 5-8",lessons:[{id:"lesson-15",day:15,title:"Sleep Stories Introduction",description:"Combine narratives with frequencies",type:"info",content:"Sleep stories add a narrative element to your Delta sessions, guiding your mind while the frequencies work on a deeper level.",action:null,completed:!1},{id:"lesson-16",day:16,title:"Deep Sleep Session",description:"Delta waves for restorative rest",type:"practice",content:"Use the Deep Sleep journey about 30 minutes before bed. Allow the frequencies to carry you into deep, restorative sleep.",action:{journey:"deepSleep"},completed:!1},{id:"lesson-17",day:17,title:"Creative Flow State",description:"Theta for creativity",type:"practice",content:"Artists, writers, and creators often use Theta to access flow states. Try this before any creative work.",action:{journey:"creativity"},completed:!1},{id:"lesson-18",day:18,title:"Mu Waves Exploration",description:"The empathy frequency",type:"info",content:"Mu waves (8-13 Hz, similar to Alpha) are associated with mirror neurons and empathy. Some research suggests they may enhance social connection.",action:{preset:"mu",duration:10},completed:!1},{id:"lesson-19",day:19,title:"Custom Mix Creation",description:"Design your own frequencies",type:"info",content:"Use the sliders to customize your base pitch and beat frequency. Experiment to find combinations that work best for your unique brain.",action:null,completed:!1},{id:"lesson-20",day:20,title:"Healing Frequencies",description:"Solfeggio tones explained",type:"info",content:"The Healing presets use ancient Solfeggio frequencies: 528 Hz (Transformation), 432 Hz (Harmony), 396 Hz (Liberation). Try them during relaxation.",action:null,completed:!1},{id:"lesson-21",day:21,title:"Journey Master!",description:"Program complete",type:"milestone",content:"You've completed the MindWave journey! You now have the knowledge and habits to maintain a lifelong meditation practice with binaural beats.",action:null,completed:!1,badge:"journey-master"}]}],A={"week-1":{name:"First Week",emoji:"🌟",description:"Completed 7 days of practice"},"two-weeks":{name:"Two Weeks Strong",emoji:"💪",description:"Built a consistent habit"},"journey-master":{name:"Journey Master",emoji:"🎓",description:"Completed the full program"},"streak-7":{name:"Week Streak",emoji:"🔥",description:"7 day practice streak"},"streak-30":{name:"Month Streak",emoji:"🏆",description:"30 day practice streak"}},J="mindwave_journey_progress";let i={currentStage:0,currentLesson:0,completedLessons:[],earnedBadges:[],startedAt:null,lastSessionAt:null},c=null;function D(){return c!==null}function P(){return c}function j(){console.log("[Journey] Clearing active session"),c=null}window.isJourneyActive=D;window.getActiveJourneySession=P;function N(){M(),console.log("[Journey] Initialized, completed lessons:",i.completedLessons.length)}function M(){try{const t=localStorage.getItem(J);if(t){const e=JSON.parse(t);i={...i,...e}}}catch(t){console.error("[Journey] Failed to load progress:",t)}}function _(){try{localStorage.setItem(J,JSON.stringify(i))}catch(t){console.error("[Journey] Failed to save progress:",t)}}function T(t){if(!i.completedLessons.includes(t)){i.completedLessons.push(t),i.lastSessionAt=new Date().toISOString();const e=y().find(n=>n.id===t);return e!=null&&e.badge&&!i.earnedBadges.includes(e.badge)&&(i.earnedBadges.push(e.badge),U(e.badge)),_(),console.log("[Journey] Completed lesson:",t),!0}return!1}function y(){return I.flatMap(t=>t.lessons)}function H(){const t=y().length,e=i.completedLessons.length;return{completed:e,total:t,percentage:Math.round(e/t*100),badges:i.earnedBadges}}function q(){return y().find(e=>!i.completedLessons.includes(e.id))||null}function z(t){const e=y(),n=e.findIndex(l=>l.id===t);if(n===0)return!0;const o=e[n-1];return o?i.completedLessons.includes(o.id):!1}function R(t){return i.completedLessons.includes(t)}function U(t){const e=A[t];if(!e)return;const n=document.createElement("div");n.className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm",n.innerHTML=`
        <div class="text-center animate-bounce-in">
            <div class="text-6xl mb-4">${e.emoji}</div>
            <div class="text-xl font-bold text-[var(--accent)] mb-2">Badge Earned!</div>
            <div class="text-lg font-medium text-white mb-1">${e.name}</div>
            <div class="text-sm text-[var(--text-muted)]">${e.description}</div>
        </div>
    `,n.addEventListener("click",()=>n.remove()),document.body.appendChild(n),setTimeout(()=>n.remove(),4e3)}function C(t){if(!t)return;const e=H(),n=q();t.innerHTML=`
        <!-- Progress Header -->
        <div class="mb-6">
            <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-white">Your Progress</span>
                <span class="text-sm font-bold text-purple-400">${e.completed} / ${e.total} lessons</span>
            </div>
            <div class="h-2.5 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500" 
                    style="width: ${e.percentage}%"></div>
            </div>
            <div class="text-xs text-[var(--text-muted)] mt-2">${e.percentage}% complete</div>
        </div>
        
        <!-- Next Lesson Card -->
        ${n?`
        <div class="mb-6 p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/40">
            <div class="text-[10px] uppercase tracking-wider text-purple-400 font-bold mb-1">Up Next</div>
            <div class="text-base font-bold text-white mb-1">Day ${n.day}: ${n.title}</div>
            <div class="text-sm text-[var(--text-muted)] mb-3">${n.description}</div>
            <button onclick="window.openLesson('${n.id}')" 
                class="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold uppercase tracking-wide hover:brightness-110 transition-all shadow-lg">
                Start Lesson →
            </button>
        </div>
        `:`
        <div class="mb-6 p-4 rounded-xl bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-500/40 text-center">
            <div class="text-3xl mb-2">🎉</div>
            <div class="text-base font-bold text-green-400">Journey Complete!</div>
            <div class="text-sm text-[var(--text-muted)]">You've mastered binaural beats meditation</div>
        </div>
        `}
        
        <!-- Stages -->
        ${I.map((o,l)=>{const s=o.lessons.every(a=>i.completedLessons.includes(a.id)),v=o.lessons.filter(a=>i.completedLessons.includes(a.id)).length;return`
            <div class="${l>0?"pt-8 mt-10":""} ${l>0?"border-t border-white/10":""} mb-6 pb-4">
                <div class="flex items-center gap-3 mb-4">
                    <span class="text-2xl">${o.emoji}</span>
                    <div class="flex-1">
                        <span class="text-sm font-bold text-white">${o.name}</span>
                        <div class="flex items-center gap-2 mt-0.5">
                            <span class="text-[10px] text-purple-400 bg-purple-500/20 px-2 py-0.5 rounded-full font-medium">${v}/${o.lessons.length}</span>
                            ${s?'<span class="text-green-400 text-xs font-bold">✓ Complete</span>':""}
                        </div>
                    </div>
                </div>
                <div class="grid gap-2" style="grid-template-columns: repeat(7, minmax(0, 1fr))">
                    ${o.lessons.map(a=>{var h;const $=i.completedLessons.includes(a.id),w=a.type==="milestone",g=z(a.id),x=c&&c.lessonId===a.id;let d="",p="",u=!0;return $?(d="bg-green-500/30 text-green-300 border-green-500/50",u=!0):g?x?(d="bg-purple-500/30 text-purple-300 border-purple-500 ring-2 ring-purple-400 animate-pulse",u=!0):w?(d="bg-amber-500/20 text-amber-300 border-amber-500/40",u=g):(d="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-purple-400/50",u=!0):(d="bg-gray-700/30 text-gray-500/70 border-gray-600/30 cursor-not-allowed opacity-50",p="🔒",u=!1),p||(p=w?a.badge?(h=A[a.badge])==null?void 0:h.emoji:"⭐":a.day),`
                        <button ${u?`onclick="window.openLesson('${a.id}')"`:"disabled"}
                            class="w-full aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all border ${d}"
                            title="Day ${a.day}: ${a.title}${g?"":" (Locked - complete previous lessons)"}">
                            ${p}
                        </button>
                        `}).join("")}
                </div>
            </div>
            `}).join("")}
        
        <!-- Badges Section -->
        <div class="mt-6 pt-4 border-t border-white/10">
            <div class="text-sm font-bold text-white mb-3">Your Badges</div>
            <div class="flex flex-wrap gap-2">
                ${Object.entries(A).map(([o,l])=>{const s=i.earnedBadges.includes(o);return`
                    <div class="flex items-center gap-2 px-3 py-1.5 rounded-full ${s?"bg-purple-500/20 border border-purple-500/40":"bg-white/5 border border-white/10"}" title="${l.description}">
                        <span class="text-base ${s?"":"opacity-70"}">${l.emoji}</span>
                        <span class="text-xs font-medium ${s?"text-purple-300":"text-white/80"}">${l.name}</span>
                    </div>
                    `}).join("")}
            </div>
        </div>
    `}window.openLesson=async t=>{const e=y().find(o=>o.id===t);if(!e)return;const n=e.day;if(window.canAccessFeature){const o=await window.canAccessFeature("journey_lesson",n);if(!o.allowed){window.showUpgradePrompt(o.reason);return}}F(e)};function F(t){const e=document.getElementById("lessonModal");e&&e.remove();const n=document.createElement("div");n.id="lessonModal",n.className="fixed inset-0 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm",n.style.zIndex="1100",n.innerHTML=`
        <div class="glass-card w-full max-w-md rounded-2xl overflow-hidden">
            <div class="p-6 border-b border-white/10">
                <div class="flex justify-between items-start">
                    <div>
                        <div class="text-[10px] uppercase tracking-wider text-[var(--accent)] mb-1">Day ${t.day}</div>
                        <h3 class="text-lg font-bold text-white">${t.title}</h3>
                    </div>
                    <button onclick="document.getElementById('lessonModal').remove()" 
                        class="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="p-6">
                <div class="text-sm text-[var(--text-muted)] whitespace-pre-line mb-6">${t.content}</div>
                ${t.action?`
                <button onclick="window.startLessonAction('${t.id}')" 
                    class="w-full py-3 rounded-xl bg-gradient-to-r from-[var(--accent)] to-purple-500 text-gray-900 text-sm font-bold uppercase tracking-wide hover:opacity-90 transition-all">
                    ${t.action.preset?`Start ${t.action.duration} Min Session`:"Begin Journey"}
                </button>
                `:`
                <button onclick="window.markLessonComplete('${t.id}')" 
                    class="w-full py-3 rounded-xl bg-[var(--accent)] text-gray-900 text-sm font-bold uppercase tracking-wide hover:opacity-90 transition-all">
                    ${R(t.id)?"✓ Completed":"Mark as Complete"}
                </button>
                `}
            </div>
        </div>
    `,n.addEventListener("click",o=>{o.target===n&&n.remove()}),document.body.appendChild(n)}let S=null;window.startLessonAction=async t=>{var o,l;const e=y().find(s=>s.id===t);if(!(e!=null&&e.action))return;if(c&&c.lessonId!==t){const s=y().find(b=>b.id===c.lessonId);if(!confirm(`You have an active journey session: "${(s==null?void 0:s.title)||"Unknown"}".

Do you want to stop it and start this lesson instead?`)){console.log("[Journey] User cancelled - keeping current session");return}console.log("[Journey] Stopping current session to start new one"),j()}(o=document.getElementById("lessonModal"))==null||o.remove(),(l=document.getElementById("journeyModal"))==null||l.classList.add("hidden");const n=e.action.duration||5;if(c={lessonId:t,startedAt:new Date().toISOString(),preset:e.action.preset||e.action.journey,duration:n},console.log("[Journey] Active session set:",c),e.action.preset)if(console.log("[Journey] Attempting to apply preset:",e.action.preset),typeof window.applyPreset=="function")try{window.applyPreset(e.action.preset),console.log("[Journey] Preset applied successfully")}catch(s){console.error("[Journey] Failed to apply preset:",s),alert(`Error starting preset: ${s.message}`);return}else{console.error("[Journey] window.applyPreset is not defined!"),alert("Error: Preset function not available. Please refresh the page.");return}else if(e.action.journey)if(console.log("[Journey] Attempting to start sweep:",e.action.journey),typeof window.startSweepPreset=="function")try{window.startSweepPreset(e.action.journey),console.log("[Journey] Sweep started successfully")}catch(s){console.error("[Journey] Failed to start sweep:",s),alert(`Error starting journey: ${s.message}`);return}else{console.error("[Journey] window.startSweepPreset is not defined!"),alert("Error: Journey function not available. Please refresh the page.");return}S=t;try{const[s,{startAudio:v,fadeIn:b,fadeOut:a,stopAudio:$},{resumeVisuals:w},{syncAllButtons:g}]=await Promise.all([L(()=>import("./mindwave-BpXDINIk.js").then(r=>r.s),__vite__mapDeps([0,1,2,3])),L(()=>import("./mindwave-BpXDINIk.js").then(r=>r.e),__vite__mapDeps([0,1,2,3])),L(()=>import("./mindwave-BpXDINIk.js").then(r=>r.v),__vite__mapDeps([0,1,2,3])),L(()=>import("./mindwave-BpXDINIk.js").then(r=>r.c),__vite__mapDeps([0,1,2,3]))]);await v(),b(1.5),w(),g();const x=document.getElementById("sessionDuration");x&&(x.value=String(n)),s.startSession(n,{onTick:r=>{const m=document.getElementById("timerDisplay"),f=document.getElementById("timerProgress");if(m&&(m.textContent=r.formatted,m.style.opacity="1"),f){const k=339.292-r.progress/100*339.292;f.style.strokeDashoffset=k}},onComplete:async()=>{if(console.log("[Journey] Timer complete, checking pendingLessonId:",S,"expected:",t),S===t){const r=T(t);console.log("[Journey] Lesson completion result:",r),S=null,j(),W(e),a(3,()=>{$();const k=document.getElementById("playIcon"),B=document.getElementById("pauseIcon");k&&k.classList.remove("hidden"),B&&B.classList.add("hidden")});const m=document.getElementById("timerRing"),f=document.getElementById("timerDisplay");m&&(m.style.opacity="0",m.classList.remove("timer-active")),f&&(f.style.opacity="0",f.classList.remove("timer-active"));const E=document.getElementById("journeyContainer");E&&C(E)}else console.warn("[Journey] pendingLessonId mismatch, not completing")}});const d=document.getElementById("timerRing"),p=document.getElementById("timerDisplay");d&&(d.style.opacity="1",d.classList.add("timer-active")),p&&(p.style.opacity="1",p.classList.add("timer-active"));const u=document.getElementById("playIcon"),h=document.getElementById("pauseIcon");u&&u.classList.add("hidden"),h&&h.classList.remove("hidden"),console.log(`[Journey] Started ${n} min session for lesson: ${t}`)}catch(s){console.error("[Journey] Failed to start session:",s),j(),alert("Failed to start lesson session. Please try again.")}};function W(t){const e=document.createElement("div");e.className="fixed top-20 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl bg-green-500/90 text-white font-bold text-sm shadow-lg backdrop-blur-sm",e.style.zIndex="9999",e.innerHTML=`✓ Lesson Complete: ${t.title}`,document.body.appendChild(e),setTimeout(()=>e.remove(),3e3)}window.markLessonComplete=t=>{var n;T(t),(n=document.getElementById("lessonModal"))==null||n.remove();const e=document.getElementById("journeyContainer");e&&C(e)};export{A as BADGES,I as JOURNEY_STAGES,j as clearActiveJourneySession,T as completeLesson,P as getActiveJourneySession,y as getAllLessons,q as getNextLesson,H as getProgress,N as initJourney,D as isJourneyActive,z as isLessonAvailable,R as isLessonCompleted,C as renderJourneyUI};
//# sourceMappingURL=journey-CI-pRjjB.js.map
