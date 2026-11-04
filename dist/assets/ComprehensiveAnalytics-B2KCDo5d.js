const o={SESSION_ID:"sentaient_analytics_session_id",VISITOR_ID:"sentaient_analytics_visitor_id",SESSIONS:"sentaient_analytics_sessions",WORLD_DWELL:"sentaient_analytics_world_dwell",APP_DWELL:"sentaient_analytics_app_dwell",FEATURE_USAGE:"sentaient_analytics_feature_usage",ERRORS:"sentaient_analytics_errors",FEEDBACK:"sentaient_analytics_feedback",SETTINGS:"sentaient_analytics_settings"},m="bleonard@sentaient.com";class y{constructor(){this.sessionId=this._getOrCreateSessionId(),this.visitorId=this._getOrCreateVisitorId(),this.sessionStartTime=Date.now(),this.lastActiveTime=Date.now(),this.currentWorld=null,this.worldStartTime=null,this.currentApp=null,this.appStartTime=null,this.breadcrumbs=[],this.clickHistory=[],this._initSessionRecord(),this._setupGlobalListeners(),this._startHeartbeat()}_getOrCreateVisitorId(){try{let t=localStorage.getItem(o.VISITOR_ID);return t||(t="v_"+Math.random().toString(36).substring(2,10)+Date.now().toString(36),localStorage.setItem(o.VISITOR_ID,t)),t}catch{return"v_temp_"+Date.now()}}_getOrCreateSessionId(){try{let t=sessionStorage.getItem(o.SESSION_ID);return t||(t="s_"+Math.random().toString(36).substring(2,10)+Date.now().toString(36),sessionStorage.setItem(o.SESSION_ID,t)),t}catch{return"s_temp_"+Date.now()}}_initSessionRecord(){const t={sessionId:this.sessionId,visitorId:this.visitorId,startTime:this.sessionStartTime,lastSeen:Date.now(),totalDurationSeconds:0,entryPath:typeof window<"u"?window.location.pathname:"/",referrer:typeof document<"u"&&document.referrer||"Direct",userAgent:typeof navigator<"u"?navigator.userAgent:"",deviceType:this._getDeviceType(),screenResolution:typeof window<"u"?`${window.screen.width}x${window.screen.height}`:"unknown",worldsVisited:{},appsVisited:{},featuresUsed:{},rageClicksDetected:0,engagementScore:50};this._updateSessionInStore(t)}_getDeviceType(){if(typeof navigator>"u")return"Desktop";const t=navigator.userAgent;return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)?/iPad|Tablet/i.test(t)?"Tablet":"Mobile":"Desktop"}_setupGlobalListeners(){typeof window>"u"||(document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"?this._flushCurrentDwells():this.lastActiveTime=Date.now()}),window.addEventListener("beforeunload",()=>{this._flushCurrentDwells()}),window.addEventListener("click",t=>{this.lastActiveTime=Date.now();const e=Date.now(),i={x:t.clientX,y:t.clientY,time:e,target:t.target?t.target.tagName+(t.target.className?"."+t.target.className.toString().split(" ")[0]:""):""};if(this._addBreadcrumb("click",{target:i.target,x:i.x,y:i.y}),this.clickHistory.push(i),this.clickHistory=this.clickHistory.filter(s=>e-s.time<1200),this.clickHistory.length>=3){const s=this.clickHistory.slice(-3);Math.max(Math.hypot(s[0].x-s[1].x,s[0].y-s[1].y),Math.hypot(s[1].x-s[2].x,s[1].y-s[2].y))<40&&(this.trackRageClick(i.target),this.clickHistory=[])}}),window.addEventListener("error",t=>{this.trackError({type:"uncaught_exception",message:t.message||"Script error",filename:t.filename,lineno:t.lineno,colno:t.colno,stack:t.error?.stack||null})}),window.addEventListener("unhandledrejection",t=>{const e=t.reason;this.trackError({type:"unhandled_promise_rejection",message:typeof e=="string"?e:e?.message||"Promise rejection",stack:e?.stack||String(e)})}))}_startHeartbeat(){typeof window>"u"||setInterval(()=>{this._heartbeat()},5e3)}_heartbeat(){const t=Date.now();if(t-this.lastActiveTime<12e4){const e=this.getCurrentSession();e&&(e.totalDurationSeconds=Math.round((t-this.sessionStartTime)/1e3),e.lastSeen=t,e.engagementScore=this._computeEngagementScore(e),this._updateSessionInStore(e))}}_addBreadcrumb(t,e={}){this.breadcrumbs.push({time:new Date().toISOString(),action:t,world:this.currentWorld,app:this.currentApp,data:e}),this.breadcrumbs.length>12&&this.breadcrumbs.shift()}startWorldDwell(t){t&&this.currentWorld!==t&&(this.currentWorld&&this.worldStartTime&&this.endWorldDwell(),this.currentWorld=t,this.worldStartTime=Date.now(),this._addBreadcrumb("enter_world",{world:t}))}endWorldDwell(){if(!this.currentWorld||!this.worldStartTime)return;const t=Math.max(1,Math.round((Date.now()-this.worldStartTime)/1e3)),e=this.currentWorld;this._recordWorldDuration(e,t),this._addBreadcrumb("exit_world",{world:e,durationSec:t}),this.currentWorld=null,this.worldStartTime=null}_recordWorldDuration(t,e){try{const i=this.getCurrentSession();i&&(i.worldsVisited[t]=(i.worldsVisited[t]||0)+e,this._updateSessionInStore(i));const s=JSON.parse(localStorage.getItem(o.WORLD_DWELL)||"{}");s[t]||(s[t]={totalSeconds:0,visitCount:0,avgSeconds:0}),s[t].totalSeconds+=e,s[t].visitCount+=1,s[t].avgSeconds=Math.round(s[t].totalSeconds/s[t].visitCount),s[t].lastVisited=Date.now(),localStorage.setItem(o.WORLD_DWELL,JSON.stringify(s))}catch{}}startAppDwell(t){t&&this.currentApp!==t&&(this.currentApp&&this.appStartTime&&this.endAppDwell(),this.currentApp=t,this.appStartTime=Date.now(),this._addBreadcrumb("enter_app",{app:t}))}endAppDwell(){if(!this.currentApp||!this.appStartTime)return;const t=Math.max(1,Math.round((Date.now()-this.appStartTime)/1e3)),e=this.currentApp;this._recordAppDuration(e,t),this._addBreadcrumb("exit_app",{app:e,durationSec:t}),this.currentApp=null,this.appStartTime=null}_recordAppDuration(t,e){try{const i=this.getCurrentSession();i&&(i.appsVisited[t]=(i.appsVisited[t]||0)+e,this._updateSessionInStore(i));const s=JSON.parse(localStorage.getItem(o.APP_DWELL)||"{}");s[t]||(s[t]={totalSeconds:0,visitCount:0,avgSeconds:0}),s[t].totalSeconds+=e,s[t].visitCount+=1,s[t].avgSeconds=Math.round(s[t].totalSeconds/s[t].visitCount),s[t].lastVisited=Date.now(),localStorage.setItem(o.APP_DWELL,JSON.stringify(s))}catch{}}trackFeature(t,e,i={}){try{const s=t||this.currentApp||this.currentWorld||"Global",a=`${s}::${e}`;this._addBreadcrumb("use_feature",{app:s,feature:e,...i});const l=this.getCurrentSession();l&&(l.featuresUsed[a]=(l.featuresUsed[a]||0)+1,this._updateSessionInStore(l));const n=JSON.parse(localStorage.getItem(o.FEATURE_USAGE)||"{}");n[a]||(n[a]={app:s,feature:e,count:0,lastUsed:0}),n[a].count+=1,n[a].lastUsed=Date.now(),localStorage.setItem(o.FEATURE_USAGE,JSON.stringify(n))}catch{}}trackRageClick(t){try{const e=this.getCurrentSession();e&&(e.rageClicksDetected=(e.rageClicksDetected||0)+1,this._updateSessionInStore(e)),this.trackError({type:"user_friction_rage_click",message:`Rapid repeated clicks on ${t}`,filename:window.location.pathname,isWarning:!0})}catch{}}trackError(t){try{const e={id:"err_"+Date.now().toString(36)+Math.random().toString(36).substring(2,6),timestamp:new Date().toISOString(),world:this.currentWorld||"N/A",app:this.currentApp||window?.location?.pathname||"N/A",type:t.type||"error",message:t.message||"Unknown error",filename:t.filename||"unknown",lineno:t.lineno||0,stack:t.stack||null,isWarning:!!t.isWarning,breadcrumbs:[...this.breadcrumbs],sessionId:this.sessionId,device:this._getDeviceType()},i=JSON.parse(localStorage.getItem(o.ERRORS)||"[]");i.unshift(e),i.length>150&&i.pop(),localStorage.setItem(o.ERRORS,JSON.stringify(i)),this._postToEndpoint("/api/analytics",{type:"error_incident",payload:e})}catch{}}submitFeedback({rating:t,liked:e,suggestions:i,appName:s,worldName:a,email:l}){try{const n={id:"fb_"+Date.now().toString(36)+Math.random().toString(36).substring(2,6),timestamp:new Date().toISOString(),rating:Number(t)||5,liked:e||"",suggestions:i||"",app:s||this.currentApp||"General",world:a||this.currentWorld||"General",userEmail:l||null,sessionId:this.sessionId,timeOnSiteSeconds:Math.round((Date.now()-this.sessionStartTime)/1e3)},d=JSON.parse(localStorage.getItem(o.FEEDBACK)||"[]");return d.unshift(n),d.length>200&&d.pop(),localStorage.setItem(o.FEEDBACK,JSON.stringify(d)),this._addBreadcrumb("submitted_feedback",{rating:t,liked:e,suggestions:i}),this._postToEndpoint("/api/analytics",{type:"user_feedback",payload:n}),{success:!0,entry:n}}catch(n){return{success:!1,error:n.message}}}_computeEngagementScore(t){let e=50;const i=t.totalDurationSeconds||0;i>300?e+=30:i>120?e+=20:i>45?e+=10:i<10&&(e-=15);const s=Object.keys(t.worldsVisited||{}).length;e+=Math.min(s*4,15);const a=Object.values(t.featuresUsed||{}).reduce((l,n)=>l+n,0);return e+=Math.min(a*3,15),t.rageClicksDetected>0&&(e-=Math.min(t.rageClicksDetected*8,25)),Math.max(0,Math.min(100,e))}_flushCurrentDwells(){if(this.currentWorld&&this.worldStartTime){const t=Math.max(1,Math.round((Date.now()-this.worldStartTime)/1e3));this._recordWorldDuration(this.currentWorld,t),this.worldStartTime=Date.now()}if(this.currentApp&&this.appStartTime){const t=Math.max(1,Math.round((Date.now()-this.appStartTime)/1e3));this._recordAppDuration(this.currentApp,t),this.appStartTime=Date.now()}}getCurrentSession(){try{return JSON.parse(localStorage.getItem(o.SESSIONS)||"{}")[this.sessionId]||null}catch{return null}}_updateSessionInStore(t){try{const e=JSON.parse(localStorage.getItem(o.SESSIONS)||"{}");e[t.sessionId]=t;const i=Object.keys(e);i.length>50&&delete e[i[0]],localStorage.setItem(o.SESSIONS,JSON.stringify(e))}catch{}}_postToEndpoint(t,e){if(!(typeof fetch>"u"))try{fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e),keepalive:!0}).catch(()=>{})}catch{}}getAllAnalyticsData(){try{const t=Object.values(JSON.parse(localStorage.getItem(o.SESSIONS)||"{}")),e=JSON.parse(localStorage.getItem(o.WORLD_DWELL)||"{}"),i=JSON.parse(localStorage.getItem(o.APP_DWELL)||"{}"),s=JSON.parse(localStorage.getItem(o.FEATURE_USAGE)||"{}"),a=JSON.parse(localStorage.getItem(o.ERRORS)||"[]"),l=JSON.parse(localStorage.getItem(o.FEEDBACK)||"[]"),n=JSON.parse(localStorage.getItem(o.SETTINGS)||JSON.stringify({recipientEmail:m})),d=t.length||1,u=t.reduce((p,r)=>p+(r.totalDurationSeconds||0),0),h=Math.round(u/d),S=Math.round(t.reduce((p,r)=>p+(r.engagementScore||50),0)/d),g=l.length>0?(l.reduce((p,r)=>p+r.rating,0)/l.length).toFixed(1):"5.0";return{kpis:{totalSessions:d,totalSecondsOnSite:u,avgSecondsOnSite:h,avgEngagementScore:S,csatScore:g,totalErrors:a.length,totalFeedback:l.length},sessions:t,worlds:e,apps:i,features:s,errors:a,feedback:l,settings:n}}catch{return{kpis:{},sessions:[],worlds:{},apps:{},features:{},errors:[],feedback:[],settings:{recipientEmail:m}}}}generateDailyEmailHtml(t=m){const e=this.getAllAnalyticsData(),{kpis:i,worlds:s,apps:a,features:l,errors:n,feedback:d}=e,u=Object.entries(s).sort((r,c)=>c[1].totalSeconds-r[1].totalSeconds).slice(0,5);Object.entries(a).sort((r,c)=>c[1].totalSeconds-r[1].totalSeconds).slice(0,5);const h=Object.values(l).sort((r,c)=>c.count-r.count).slice(0,5),S=d.slice(0,5),g=n.slice(0,5),p=r=>{if(!r)return"0s";const c=Math.floor(r/60),f=r%60;return c>0?`${c}m ${f}s`:`${f}s`};return`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>sentAIent Daily Analytics Digest</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #080c16; color: #f1f5f9; margin: 0; padding: 24px; }
    .card { background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; padding: 20px; margin-bottom: 20px; }
    h1 { color: #38bdf8; font-size: 24px; margin-top: 0; }
    h2 { color: #94a3b8; font-size: 16px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #334155; padding-bottom: 8px; margin-top: 0; }
    .kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px; }
    .kpi-box { background: #1e293b; border-radius: 8px; padding: 14px; text-align: center; }
    .kpi-value { font-size: 26px; font-weight: 800; color: #38bdf8; }
    .kpi-label { font-size: 11px; text-transform: uppercase; color: #94a3b8; margin-top: 4px; }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    th { text-align: left; font-size: 11px; color: #64748b; padding: 6px 8px; border-bottom: 1px solid #334155; text-transform: uppercase; }
    td { font-size: 13px; padding: 8px; border-bottom: 1px solid #1e293b; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; background: #0369a1; color: #e0f2fe; }
    .badge-error { background: #991b1b; color: #fee2e2; }
    .badge-success { background: #065f46; color: #d1fae5; }
    .quote-box { background: #1e293b; border-left: 3px solid #38bdf8; padding: 10px 14px; margin-bottom: 10px; border-radius: 0 8px 8px 0; font-size: 13px; }
  </style>
</head>
<body>
  <div style="max-width: 680px; margin: 0 auto;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <h1>sentAIent // Daily Analytics Digest</h1>
      <span style="font-size: 12px; color: #64748b;">${new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</span>
    </div>

    <!-- KPI Cards -->
    <div class="kpi-grid">
      <div class="kpi-box">
        <div class="kpi-value">${i.totalSessions||0}</div>
        <div class="kpi-label">Total Visits</div>
      </div>
      <div class="kpi-box">
        <div class="kpi-value">${p(i.avgSecondsOnSite)}</div>
        <div class="kpi-label">Avg Time on Site</div>
      </div>
      <div class="kpi-box">
        <div class="kpi-value" style="color: #10b981;">${i.csatScore} ★</div>
        <div class="kpi-label">User CSAT Score</div>
      </div>
    </div>

    <!-- 3D World Dwell Time Breakdown -->
    <div class="card">
      <h2>3D Worlds // Dwell Time Leaderboard</h2>
      <table>
        <thead>
          <tr><th>World Name</th><th>Total Time</th><th>Visits</th><th>Avg Time / Visit</th></tr>
        </thead>
        <tbody>
          ${u.length>0?u.map(([r,c])=>`
            <tr>
              <td style="font-weight: 600; color: #f8fafc;">${r}</td>
              <td style="color: #38bdf8;">${p(c.totalSeconds)}</td>
              <td>${c.visitCount}</td>
              <td>${p(c.avgSeconds)}</td>
            </tr>
          `).join(""):'<tr><td colspan="4" style="color: #64748b; text-align: center;">No 3D world dwell recorded yet today</td></tr>'}
        </tbody>
      </table>
    </div>

    <!-- App Dwell & Feature Usage -->
    <div class="card">
      <h2>App Usage & Feature Engagement</h2>
      <table>
        <thead>
          <tr><th>App / Feature</th><th>Category</th><th>Engagement Count</th></tr>
        </thead>
        <tbody>
          ${h.length>0?h.map(r=>`
            <tr>
              <td style="font-weight: 600; color: #f8fafc;">${r.feature}</td>
              <td><span class="badge">${r.app}</span></td>
              <td style="color: #38bdf8; font-weight: 700;">${r.count} actions</td>
            </tr>
          `).join(""):'<tr><td colspan="3" style="color: #64748b; text-align: center;">No in-app feature actions recorded yet today</td></tr>'}
        </tbody>
      </table>
    </div>

    <!-- User Feedback & Suggestions -->
    <div class="card">
      <h2>User Feedback & Improvement Suggestions</h2>
      ${S.length>0?S.map(r=>`
        <div class="quote-box">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="color: #facc15; font-weight: 700;">${"★".repeat(r.rating)}${"☆".repeat(5-r.rating)} (${r.app||"App"})</span>
            <span style="font-size: 11px; color: #64748b;">${new Date(r.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
          </div>
          ${r.liked?`<p style="margin: 4px 0 2px 0;"><strong>What they liked:</strong> ${r.liked}</p>`:""}
          ${r.suggestions?`<p style="margin: 2px 0 0 0; color: #38bdf8;"><strong>Suggestion:</strong> ${r.suggestions}</p>`:""}
        </div>
      `).join(""):'<p style="color: #64748b; font-size: 13px;">No explicit user feedback submitted today.</p>'}
    </div>

    <!-- Broken Features & Error Incident Alert -->
    <div class="card" style="border-color: ${g.length>0?"#7f1d1d":"#1e293b"};">
      <h2 style="color: ${g.length>0?"#f87171":"#94a3b8"};">Incident & Error Log (${g.length} detected)</h2>
      ${g.length>0?g.map(r=>`
        <div style="background: #18121f; border-left: 3px solid #ef4444; padding: 8px 12px; margin-bottom: 8px; border-radius: 0 6px 6px 0; font-size: 12px;">
          <div style="display: flex; justify-content: space-between; font-weight: 700; color: #fca5a5;">
            <span>[${r.world||r.app||"Global"}] ${r.type}</span>
            <span style="font-size: 10px; color: #94a3b8;">${new Date(r.timestamp).toLocaleTimeString()}</span>
          </div>
          <div style="color: #cbd5e1; margin-top: 3px; font-family: monospace;">${r.message}</div>
        </div>
      `).join(""):'<p style="color: #10b981; font-size: 13px;">✓ Zero crash incidents or broken features reported today.</p>'}
    </div>

    <div style="text-align: center; color: #475569; font-size: 11px; margin-top: 24px;">
      sentAIent Autonomous Analytics Platform • Sent to ${t} • Generated Automatically
    </div>
  </div>
</body>
</html>
    `}async sendDailyDigest(t=m){const e=this.generateDailyEmailHtml(t);try{localStorage.setItem(o.SETTINGS,JSON.stringify({recipientEmail:t}))}catch{}try{return{success:!0,...await(await fetch("/.netlify/functions/daily-analytics-digest",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({recipient:t,html:e,subject:`sentAIent Daily Analytics Digest — ${new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}`})})).json()}}catch{return{success:!0,localOnly:!0,message:`Report generated for ${t}. Ready in dashboard preview.`}}}}const w=new y;export{w as a};
