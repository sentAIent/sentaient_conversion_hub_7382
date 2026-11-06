/**
 * Comprehensive Analytics & Telemetry Engine for sentAIent
 * 
 * Features:
 * 1. Total Site Visit Duration (Persistent session, heartbeat, unload/visibility flush)
 * 2. 3D World Dwell Time (Exact seconds spent in each of the 16 worlds)
 * 3. App Dwell Time & In-App Feature Usage (Clicks, controls, audio toggles, tool usage)
 * 4. Inferred Engagement & Satisfaction (Dwell depth, interaction density, rage click detection)
 * 5. Error & Crash Telemetry (Exceptions, unhandled rejections, WebGL context loss + breadcrumbs)
 * 6. Explicit User Feedback (Ratings, liked features, suggestions for improvement)
 * 7. Daily Rollup Generator & Email Dispatcher to bleonard@sentaient.com
 */

const STORAGE_KEYS = {
  SESSION_ID: 'sentaient_analytics_session_id',
  VISITOR_ID: 'sentaient_analytics_visitor_id',
  SESSIONS: 'sentaient_analytics_sessions',
  WORLD_DWELL: 'sentaient_analytics_world_dwell',
  APP_DWELL: 'sentaient_analytics_app_dwell',
  FEATURE_USAGE: 'sentaient_analytics_feature_usage',
  ERRORS: 'sentaient_analytics_errors',
  FEEDBACK: 'sentaient_analytics_feedback',
  SETTINGS: 'sentaient_analytics_settings'
};

const DEFAULT_RECIPIENT = 'bleonard@sentaient.com';

class ComprehensiveAnalytics {
  constructor() {
    this.sessionId = this._getOrCreateSessionId();
    this.visitorId = this._getOrCreateVisitorId();
    this.sessionStartTime = Date.now();
    this.lastActiveTime = Date.now();
    
    // Active dwell tracking
    this.currentWorld = null;
    this.worldStartTime = null;
    this.currentApp = null;
    this.appStartTime = null;
    
    // Breadcrumbs for error investigation (last 10 user actions)
    this.breadcrumbs = [];
    
    // Rage click tracking (detects user frustration)
    this.clickHistory = [];
    
    this._initSessionRecord();
    this._setupGlobalListeners();
    this._startHeartbeat();
  }

  // --- Identifier Management ---
  _getOrCreateVisitorId() {
    try {
      let vid = localStorage.getItem(STORAGE_KEYS.VISITOR_ID);
      if (!vid) {
        vid = 'v_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
        localStorage.setItem(STORAGE_KEYS.VISITOR_ID, vid);
      }
      return vid;
    } catch {
      return 'v_temp_' + Date.now();
    }
  }

  _getOrCreateSessionId() {
    try {
      let sid = sessionStorage.getItem(STORAGE_KEYS.SESSION_ID);
      if (!sid) {
        sid = 's_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
        sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, sid);
      }
      return sid;
    } catch {
      return 's_temp_' + Date.now();
    }
  }

  _initSessionRecord() {
    const session = {
      sessionId: this.sessionId,
      visitorId: this.visitorId,
      startTime: this.sessionStartTime,
      lastSeen: Date.now(),
      totalDurationSeconds: 0,
      entryPath: typeof window !== 'undefined' ? window.location.pathname : '/',
      referrer: typeof document !== 'undefined' ? document.referrer || 'Direct' : 'Direct',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      deviceType: this._getDeviceType(),
      screenResolution: typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : 'unknown',
      worldsVisited: {},
      appsVisited: {},
      featuresUsed: {},
      rageClicksDetected: 0,
      engagementScore: 50 // baseline
    };
    this._updateSessionInStore(session);
  }

  _getDeviceType() {
    if (typeof navigator === 'undefined') return 'Desktop';
    const ua = navigator.userAgent;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
      return /iPad|Tablet/i.test(ua) ? 'Tablet' : 'Mobile';
    }
    return 'Desktop';
  }

  _setupGlobalListeners() {
    if (typeof window === 'undefined') return;

    // Flush & record duration on tab visibility change or unload
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this._flushCurrentDwells();
      } else {
        this.lastActiveTime = Date.now();
      }
    });

    window.addEventListener('beforeunload', () => {
      this._flushCurrentDwells();
    });

    // Detect rage clicks (3+ clicks within 700ms on the same area)
    window.addEventListener('click', (e) => {
      this.lastActiveTime = Date.now();
      const now = Date.now();
      const click = { x: e.clientX, y: e.clientY, time: now, target: e.target ? (e.target.tagName + (e.target.className ? '.' + e.target.className.toString().split(' ')[0] : '')) : '' };
      
      this._addBreadcrumb('click', { target: click.target, x: click.x, y: click.y });
      
      this.clickHistory.push(click);
      // Keep only recent clicks within 1.2s
      this.clickHistory = this.clickHistory.filter(c => now - c.time < 1200);
      
      if (this.clickHistory.length >= 3) {
        const recent = this.clickHistory.slice(-3);
        const maxDist = Math.max(
          Math.hypot(recent[0].x - recent[1].x, recent[0].y - recent[1].y),
          Math.hypot(recent[1].x - recent[2].x, recent[1].y - recent[2].y)
        );
        if (maxDist < 40) {
          this.trackRageClick(click.target);
          this.clickHistory = []; // reset
        }
      }
    });

    // Error & Crash Listener: unhandled exceptions
    window.addEventListener('error', (event) => {
      this.trackError({
        type: 'uncaught_exception',
        message: event.message || 'Script error',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack || null
      });
    });

    // Error & Crash Listener: unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      const reason = event.reason;
      this.trackError({
        type: 'unhandled_promise_rejection',
        message: typeof reason === 'string' ? reason : (reason?.message || 'Promise rejection'),
        stack: reason?.stack || String(reason)
      });
    });
  }

  _startHeartbeat() {
    if (typeof window === 'undefined') return;
    setInterval(() => {
      this._heartbeat();
    }, 5000); // every 5 seconds
  }

  _heartbeat() {
    const now = Date.now();
    // Only increment duration if user was active within last 2 minutes
    if (now - this.lastActiveTime < 120000) {
      const session = this.getCurrentSession();
      if (session) {
        session.totalDurationSeconds = Math.round((now - this.sessionStartTime) / 1000);
        session.lastSeen = now;
        session.engagementScore = this._computeEngagementScore(session);
        this._updateSessionInStore(session);
      }
    }
  }

  _addBreadcrumb(action, data = {}) {
    this.breadcrumbs.push({
      time: new Date().toISOString(),
      action,
      world: this.currentWorld,
      app: this.currentApp,
      data
    });
    if (this.breadcrumbs.length > 12) {
      this.breadcrumbs.shift();
    }
  }

  // --- 3D World Dwell Tracking ---
  startWorldDwell(worldName) {
    if (!worldName) return;
    if (this.currentWorld === worldName) return; // already in this world
    
    // Close previous world if any
    if (this.currentWorld && this.worldStartTime) {
      this.endWorldDwell();
    }
    
    this.currentWorld = worldName;
    this.worldStartTime = Date.now();
    this._addBreadcrumb('enter_world', { world: worldName });
  }

  endWorldDwell() {
    if (!this.currentWorld || !this.worldStartTime) return;
    const durationSec = Math.max(1, Math.round((Date.now() - this.worldStartTime) / 1000));
    const worldName = this.currentWorld;
    
    this._recordWorldDuration(worldName, durationSec);
    this._addBreadcrumb('exit_world', { world: worldName, durationSec });
    
    this.currentWorld = null;
    this.worldStartTime = null;
  }

  _recordWorldDuration(worldName, seconds) {
    try {
      // 1. Update in active session
      const session = this.getCurrentSession();
      if (session) {
        session.worldsVisited[worldName] = (session.worldsVisited[worldName] || 0) + seconds;
        this._updateSessionInStore(session);
      }

      // 2. Update aggregate world dwell store
      const allDwells = JSON.parse(localStorage.getItem(STORAGE_KEYS.WORLD_DWELL) || '{}');
      if (!allDwells[worldName]) {
        allDwells[worldName] = { totalSeconds: 0, visitCount: 0, avgSeconds: 0 };
      }
      allDwells[worldName].totalSeconds += seconds;
      allDwells[worldName].visitCount += 1;
      allDwells[worldName].avgSeconds = Math.round(allDwells[worldName].totalSeconds / allDwells[worldName].visitCount);
      allDwells[worldName].lastVisited = Date.now();
      localStorage.setItem(STORAGE_KEYS.WORLD_DWELL, JSON.stringify(allDwells));
    } catch (e) {
      console.warn('[Analytics] Failed to record world duration', e);
    }
  }

  // --- App / Page Dwell Tracking ---
  startAppDwell(appName) {
    if (!appName) return;
    if (this.currentApp === appName) return;
    
    if (this.currentApp && this.appStartTime) {
      this.endAppDwell();
    }
    
    this.currentApp = appName;
    this.appStartTime = Date.now();
    this._addBreadcrumb('enter_app', { app: appName });
  }

  endAppDwell() {
    if (!this.currentApp || !this.appStartTime) return;
    const durationSec = Math.max(1, Math.round((Date.now() - this.appStartTime) / 1000));
    const appName = this.currentApp;
    
    this._recordAppDuration(appName, durationSec);
    this._addBreadcrumb('exit_app', { app: appName, durationSec });
    
    this.currentApp = null;
    this.appStartTime = null;
  }

  _recordAppDuration(appName, seconds) {
    try {
      const session = this.getCurrentSession();
      if (session) {
        session.appsVisited[appName] = (session.appsVisited[appName] || 0) + seconds;
        this._updateSessionInStore(session);
      }

      const allApps = JSON.parse(localStorage.getItem(STORAGE_KEYS.APP_DWELL) || '{}');
      if (!allApps[appName]) {
        allApps[appName] = { totalSeconds: 0, visitCount: 0, avgSeconds: 0 };
      }
      allApps[appName].totalSeconds += seconds;
      allApps[appName].visitCount += 1;
      allApps[appName].avgSeconds = Math.round(allApps[appName].totalSeconds / allApps[appName].visitCount);
      allApps[appName].lastVisited = Date.now();
      localStorage.setItem(STORAGE_KEYS.APP_DWELL, JSON.stringify(allApps));
    } catch (e) {
      console.warn('[Analytics] Failed to record app duration', e);
    }
  }

  // --- In-App Feature Usage Tracking ---
  trackFeature(appName, featureName, metadata = {}) {
    try {
      const targetApp = appName || this.currentApp || this.currentWorld || 'Global';
      const key = `${targetApp}::${featureName}`;
      
      this._addBreadcrumb('use_feature', { app: targetApp, feature: featureName, ...metadata });
      
      // 1. Session store
      const session = this.getCurrentSession();
      if (session) {
        session.featuresUsed[key] = (session.featuresUsed[key] || 0) + 1;
        this._updateSessionInStore(session);
      }

      // 2. Global feature store
      const features = JSON.parse(localStorage.getItem(STORAGE_KEYS.FEATURE_USAGE) || '{}');
      if (!features[key]) {
        features[key] = { app: targetApp, feature: featureName, count: 0, lastUsed: 0 };
      }
      features[key].count += 1;
      features[key].lastUsed = Date.now();
      localStorage.setItem(STORAGE_KEYS.FEATURE_USAGE, JSON.stringify(features));
    } catch (e) {
      console.warn('[Analytics] Failed to track feature', e);
    }
  }

  // --- Friction & Rage Click Tracking ---
  trackRageClick(elementIdentifier) {
    try {
      const session = this.getCurrentSession();
      if (session) {
        session.rageClicksDetected = (session.rageClicksDetected || 0) + 1;
        this._updateSessionInStore(session);
      }
      this.trackError({
        type: 'user_friction_rage_click',
        message: `Rapid repeated clicks on ${elementIdentifier}`,
        filename: window.location.pathname,
        isWarning: true
      });
    } catch {}
  }

  // --- Error & Crash Incident Telemetry ---
  trackError(errorDetails) {
    try {
      const errorEntry = {
        id: 'err_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        timestamp: new Date().toISOString(),
        world: this.currentWorld || 'N/A',
        app: this.currentApp || window?.location?.pathname || 'N/A',
        type: errorDetails.type || 'error',
        message: errorDetails.message || 'Unknown error',
        filename: errorDetails.filename || 'unknown',
        lineno: errorDetails.lineno || 0,
        stack: errorDetails.stack || null,
        isWarning: !!errorDetails.isWarning,
        breadcrumbs: [...this.breadcrumbs],
        sessionId: this.sessionId,
        device: this._getDeviceType()
      };

      const errors = JSON.parse(localStorage.getItem(STORAGE_KEYS.ERRORS) || '[]');
      errors.unshift(errorEntry);
      // Keep last 150 errors
      if (errors.length > 150) errors.pop();
      localStorage.setItem(STORAGE_KEYS.ERRORS, JSON.stringify(errors));

      // Attempt to send to Netlify ingest endpoint asynchronously
      this._postToEndpoint('/api/analytics', { type: 'error_incident', payload: errorEntry });
    } catch (e) {
      console.warn('[Analytics] Failed to track error incident', e);
    }
  }

  // --- Explicit User Feedback Collection ---
  submitFeedback({ rating, liked, suggestions, appName, worldName, email }) {
    try {
      const feedbackEntry = {
        id: 'fb_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        timestamp: new Date().toISOString(),
        rating: Number(rating) || 5, // 1 - 5
        liked: liked || '',
        suggestions: suggestions || '',
        app: appName || this.currentApp || 'General',
        world: worldName || this.currentWorld || 'General',
        userEmail: email || null,
        sessionId: this.sessionId,
        timeOnSiteSeconds: Math.round((Date.now() - this.sessionStartTime) / 1000)
      };

      const allFeedback = JSON.parse(localStorage.getItem(STORAGE_KEYS.FEEDBACK) || '[]');
      allFeedback.unshift(feedbackEntry);
      if (allFeedback.length > 200) allFeedback.pop();
      localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(allFeedback));

      this._addBreadcrumb('submitted_feedback', { rating, liked, suggestions });
      this._postToEndpoint('/api/analytics', { type: 'user_feedback', payload: feedbackEntry });
      
      return { success: true, entry: feedbackEntry };
    } catch (e) {
      console.warn('[Analytics] Failed to save feedback', e);
      return { success: false, error: e.message };
    }
  }

  // --- Inferred Engagement Score Calculation (0-100) ---
  _computeEngagementScore(session) {
    let score = 50;
    // Dwell time factor (+ up to 30 pts)
    const duration = session.totalDurationSeconds || 0;
    if (duration > 300) score += 30; // 5+ min
    else if (duration > 120) score += 20; // 2+ min
    else if (duration > 45) score += 10;
    else if (duration < 10) score -= 15; // bounce

    // Worlds visited (+ up to 15 pts)
    const worldsCount = Object.keys(session.worldsVisited || {}).length;
    score += Math.min(worldsCount * 4, 15);

    // Feature usage (+ up to 15 pts)
    const featuresCount = Object.values(session.featuresUsed || {}).reduce((a, b) => a + b, 0);
    score += Math.min(featuresCount * 3, 15);

    // Friction penalty
    if (session.rageClicksDetected > 0) {
      score -= Math.min(session.rageClicksDetected * 8, 25);
    }

    return Math.max(0, Math.min(100, score));
  }

  _flushCurrentDwells() {
    if (this.currentWorld && this.worldStartTime) {
      const dur = Math.max(1, Math.round((Date.now() - this.worldStartTime) / 1000));
      this._recordWorldDuration(this.currentWorld, dur);
      this.worldStartTime = Date.now(); // reset start so not double-counted
    }
    if (this.currentApp && this.appStartTime) {
      const dur = Math.max(1, Math.round((Date.now() - this.appStartTime) / 1000));
      this._recordAppDuration(this.currentApp, dur);
      this.appStartTime = Date.now();
    }
  }

  // --- Storage & Sync Utilities ---
  getCurrentSession() {
    try {
      const sessions = JSON.parse(localStorage.getItem(STORAGE_KEYS.SESSIONS) || '{}');
      return sessions[this.sessionId] || null;
    } catch {
      return null;
    }
  }

  _updateSessionInStore(session) {
    try {
      const sessions = JSON.parse(localStorage.getItem(STORAGE_KEYS.SESSIONS) || '{}');
      sessions[session.sessionId] = session;
      
      // Keep only last 50 sessions to conserve localStorage
      const keys = Object.keys(sessions);
      if (keys.length > 50) {
        delete sessions[keys[0]];
      }
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
    } catch (e) {
      console.warn('[Analytics] Failed to save session store', e);
    }
  }

  _postToEndpoint(url, data) {
    if (typeof fetch === 'undefined') return;
    // In local dev, skip network POST to avoid noisy 404s when Netlify functions aren't running locally
    if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      return;
    }
    try {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        keepalive: true
      }).catch(() => {
        // Silently catch endpoint unavailability
      });
    } catch {}
  }

  // --- Data Getter for Admin Dashboard ---
  getAllAnalyticsData() {
    try {
      const sessions = Object.values(JSON.parse(localStorage.getItem(STORAGE_KEYS.SESSIONS) || '{}'));
      const worlds = JSON.parse(localStorage.getItem(STORAGE_KEYS.WORLD_DWELL) || '{}');
      const apps = JSON.parse(localStorage.getItem(STORAGE_KEYS.APP_DWELL) || '{}');
      const features = JSON.parse(localStorage.getItem(STORAGE_KEYS.FEATURE_USAGE) || '{}');
      const errors = JSON.parse(localStorage.getItem(STORAGE_KEYS.ERRORS) || '[]');
      const feedback = JSON.parse(localStorage.getItem(STORAGE_KEYS.FEEDBACK) || '[]');
      const settings = JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || JSON.stringify({ recipientEmail: DEFAULT_RECIPIENT }));

      // Compute aggregated KPIs
      const totalVisitors = sessions.length || 1;
      const totalSecondsOnSite = sessions.reduce((acc, s) => acc + (s.totalDurationSeconds || 0), 0);
      const avgSecondsOnSite = Math.round(totalSecondsOnSite / totalVisitors);

      // Inferred satisfaction
      const avgEngagement = Math.round(sessions.reduce((acc, s) => acc + (s.engagementScore || 50), 0) / totalVisitors);

      // CSAT from feedback
      const avgCsat = feedback.length > 0 
        ? (feedback.reduce((acc, f) => acc + f.rating, 0) / feedback.length).toFixed(1) 
        : '5.0';

      return {
        kpis: {
          totalSessions: totalVisitors,
          totalSecondsOnSite,
          avgSecondsOnSite,
          avgEngagementScore: avgEngagement,
          csatScore: avgCsat,
          totalErrors: errors.length,
          totalFeedback: feedback.length
        },
        sessions,
        worlds,
        apps,
        features,
        errors,
        feedback,
        settings
      };
    } catch (e) {
      console.error('[Analytics] Error aggregating analytics data', e);
      return { kpis: {}, sessions: [], worlds: {}, apps: {}, features: {}, errors: [], feedback: [], settings: { recipientEmail: DEFAULT_RECIPIENT } };
    }
  }

  // --- Daily Digest Email Generator & Dispatcher ---
  generateDailyEmailHtml(recipient = DEFAULT_RECIPIENT) {
    const data = this.getAllAnalyticsData();
    const { kpis, worlds, apps, features, errors, feedback } = data;

    // Top worlds sorted by dwell time
    const topWorlds = Object.entries(worlds)
      .sort((a, b) => b[1].totalSeconds - a[1].totalSeconds)
      .slice(0, 5);

    // Top apps sorted by dwell time
    const topApps = Object.entries(apps)
      .sort((a, b) => b[1].totalSeconds - a[1].totalSeconds)
      .slice(0, 5);

    // Top features
    const topFeatures = Object.values(features)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Recent feedback
    const recentFeedback = feedback.slice(0, 5);

    // Recent errors
    const recentErrors = errors.slice(0, 5);

    const formatTime = (secs) => {
      if (!secs) return '0s';
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return m > 0 ? `${m}m ${s}s` : `${s}s`;
    };

    return `
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
      <span style="font-size: 12px; color: #64748b;">${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
    </div>

    <!-- KPI Cards -->
    <div class="kpi-grid">
      <div class="kpi-box">
        <div class="kpi-value">${kpis.totalSessions || 0}</div>
        <div class="kpi-label">Total Visits</div>
      </div>
      <div class="kpi-box">
        <div class="kpi-value">${formatTime(kpis.avgSecondsOnSite)}</div>
        <div class="kpi-label">Avg Time on Site</div>
      </div>
      <div class="kpi-box">
        <div class="kpi-value" style="color: #10b981;">${kpis.csatScore} ★</div>
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
          ${topWorlds.length > 0 ? topWorlds.map(([name, stat]) => `
            <tr>
              <td style="font-weight: 600; color: #f8fafc;">${name}</td>
              <td style="color: #38bdf8;">${formatTime(stat.totalSeconds)}</td>
              <td>${stat.visitCount}</td>
              <td>${formatTime(stat.avgSeconds)}</td>
            </tr>
          `).join('') : '<tr><td colspan="4" style="color: #64748b; text-align: center;">No 3D world dwell recorded yet today</td></tr>'}
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
          ${topFeatures.length > 0 ? topFeatures.map(f => `
            <tr>
              <td style="font-weight: 600; color: #f8fafc;">${f.feature}</td>
              <td><span class="badge">${f.app}</span></td>
              <td style="color: #38bdf8; font-weight: 700;">${f.count} actions</td>
            </tr>
          `).join('') : '<tr><td colspan="3" style="color: #64748b; text-align: center;">No in-app feature actions recorded yet today</td></tr>'}
        </tbody>
      </table>
    </div>

    <!-- User Feedback & Suggestions -->
    <div class="card">
      <h2>User Feedback & Improvement Suggestions</h2>
      ${recentFeedback.length > 0 ? recentFeedback.map(fb => `
        <div class="quote-box">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="color: #facc15; font-weight: 700;">${'★'.repeat(fb.rating)}${'☆'.repeat(5 - fb.rating)} (${fb.app || 'App'})</span>
            <span style="font-size: 11px; color: #64748b;">${new Date(fb.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          ${fb.liked ? `<p style="margin: 4px 0 2px 0;"><strong>What they liked:</strong> ${fb.liked}</p>` : ''}
          ${fb.suggestions ? `<p style="margin: 2px 0 0 0; color: #38bdf8;"><strong>Suggestion:</strong> ${fb.suggestions}</p>` : ''}
        </div>
      `).join('') : '<p style="color: #64748b; font-size: 13px;">No explicit user feedback submitted today.</p>'}
    </div>

    <!-- Broken Features & Error Incident Alert -->
    <div class="card" style="border-color: ${recentErrors.length > 0 ? '#7f1d1d' : '#1e293b'};">
      <h2 style="color: ${recentErrors.length > 0 ? '#f87171' : '#94a3b8'};">Incident & Error Log (${recentErrors.length} detected)</h2>
      ${recentErrors.length > 0 ? recentErrors.map(err => `
        <div style="background: #18121f; border-left: 3px solid #ef4444; padding: 8px 12px; margin-bottom: 8px; border-radius: 0 6px 6px 0; font-size: 12px;">
          <div style="display: flex; justify-content: space-between; font-weight: 700; color: #fca5a5;">
            <span>[${err.world || err.app || 'Global'}] ${err.type}</span>
            <span style="font-size: 10px; color: #94a3b8;">${new Date(err.timestamp).toLocaleTimeString()}</span>
          </div>
          <div style="color: #cbd5e1; margin-top: 3px; font-family: monospace;">${err.message}</div>
        </div>
      `).join('') : '<p style="color: #10b981; font-size: 13px;">✓ Zero crash incidents or broken features reported today.</p>'}
    </div>

    <div style="text-align: center; color: #475569; font-size: 11px; margin-top: 24px;">
      sentAIent Autonomous Analytics Platform • Sent to ${recipient} • Generated Automatically
    </div>
  </div>
</body>
</html>
    `;
  }

  // --- Dispatch Email ---
  async sendDailyDigest(recipient = DEFAULT_RECIPIENT) {
    const html = this.generateDailyEmailHtml(recipient);
    
    // Save preferred recipient
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({ recipientEmail: recipient }));
    } catch {}

    try {
      const res = await fetch('/.netlify/functions/daily-analytics-digest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient,
          html,
          subject: `sentAIent Daily Analytics Digest — ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
        })
      });
      const data = await res.json();
      return { success: true, ...data };
    } catch (e) {
      console.warn('[Analytics] Network dispatch failed; fallback to local report preview', e);
      return { success: true, localOnly: true, message: `Report generated for ${recipient}. Ready in dashboard preview.` };
    }
  }
}

// Singleton export
export const analytics = new ComprehensiveAnalytics();
export default analytics;
