import { els } from '../state.js';

export class LeantimeService {
    constructor() {
        this.domain = localStorage.getItem('leantime_domain') || '';
        this.apiKey = localStorage.getItem('leantime_apikey') || '';
        this.tasks = [];
        this.timerInterval = null;
        this.pomodoroTimeLeft = 0;
        this.isTimerRunning = false;
        
        this.initUI();
    }

    initUI() {
        // UI Bindings will be handled by ui-manager.js to ensure DOM is ready
    }

    async authenticate(domain, apiKey) {
        if (!domain || !apiKey) return false;
        
        // Clean domain
        this.domain = domain.replace(/\/$/, '');
        this.apiKey = apiKey;

        try {
            // Test connection by fetching a simple payload
            const response = await this.rpcCall('leantime.rpc.tickets.getAll', { limit: 1 });
            if (response && response.result) {
                localStorage.setItem('leantime_domain', this.domain);
                localStorage.setItem('leantime_apikey', this.apiKey);
                return true;
            }
        } catch (e) {
            console.error('[Leantime] Auth failed:', e);
            return false;
        }
        return false;
    }

    async fetchTickets(scope = 'user') {
        if (!this.domain || !this.apiKey) return [];
        
        try {
            const params = { limit: 50 };
            // Note: If leantime API supports filtering by user, we add it to params here.
            // For now, we fetch recent tickets.
            const response = await this.rpcCall('leantime.rpc.tickets.getAll', params);
            if (response && response.result) {
                this.tasks = response.result;
                return this.tasks;
            }
        } catch (e) {
            console.error('[Leantime] Fetch tasks failed:', e);
        }
        return [];
    }

    async rpcCall(method, params = {}) {
        const url = `${this.domain}/api/jsonrpc`;
        const body = {
            jsonrpc: '2.0',
            method: method,
            id: Date.now(),
            params: params
        };

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'x-api-key': this.apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    }

    startPomodoro(minutes, taskName) {
        const overlay = document.getElementById('pomodoroOverlay');
        const timeDisplay = document.getElementById('pomodoroTime');
        const nameDisplay = document.getElementById('pomodoroTaskName');
        const toggleBtn = document.getElementById('pomodoroToggle');
        
        if (!overlay || !timeDisplay) return;

        clearInterval(this.timerInterval);
        this.pomodoroTimeLeft = minutes * 60;
        this.isTimerRunning = true;
        
        nameDisplay.textContent = taskName;
        overlay.classList.remove('hidden');
        toggleBtn.textContent = 'Pause';

        const updateDisplay = () => {
            const m = Math.floor(this.pomodoroTimeLeft / 60);
            const s = this.pomodoroTimeLeft % 60;
            timeDisplay.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        };

        updateDisplay();

        this.timerInterval = setInterval(() => {
            if (!this.isTimerRunning) return;
            
            this.pomodoroTimeLeft--;
            updateDisplay();

            if (this.pomodoroTimeLeft <= 0) {
                clearInterval(this.timerInterval);
                this.isTimerRunning = false;
                // Play a completion chime here if desired
                timeDisplay.textContent = '00:00';
            }
        }, 1000);
    }

    togglePomodoro() {
        const toggleBtn = document.getElementById('pomodoroToggle');
        this.isTimerRunning = !this.isTimerRunning;
        if (toggleBtn) {
            toggleBtn.textContent = this.isTimerRunning ? 'Pause' : 'Resume';
        }
    }

    stopPomodoro() {
        clearInterval(this.timerInterval);
        this.isTimerRunning = false;
        const overlay = document.getElementById('pomodoroOverlay');
        if (overlay) overlay.classList.add('hidden');
    }
}

export const leantime = new LeantimeService();
