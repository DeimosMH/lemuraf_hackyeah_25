document.addEventListener('DOMContentLoaded', () => {

    const state = {
        character: {
            level: 12,
            xp: 450,
            xp_needed: 1000,
            base_xp_increment: 500,
            gold: 150,
            evasionPoints: 0,
            stats: {
                vitality: 70,
                cognition: 85,
                resilience: 60,
                prosperity: 50
            }
        },
        quests: [
            { id: 1, text: "Complete morning workout", stat: "vitality", xp: 20, impactWeight: 0.3, done: false },
            { id: 2, text: "30 mins of deep work", stat: "cognition", xp: 30, impactWeight: 0.5, done: true },
            { id: 3, text: "Maintain 7-day savings streak", stat: "prosperity", xp: 50, impactWeight: 0.8, done: false, rewardGold: 25 },
            { id: 4, text: "Meditate for 10 minutes", stat: "resilience", xp: 15, impactWeight: 0.3, done: false },
            { id: 5, text: "Review daily budget", stat: "prosperity", xp: 10, impactWeight: 0.2, done: false },
        ],
        trips: [
            { id: 1, name: "Commute to Work", time: "8:30 AM", drs: 75, risk: "High", isEvasible: true, evaded: false },
            { id: 2, name: "Train to Central Station", time: "2:00 PM", drs: 15, risk: "Low", isEvasible: false, evaded: false },
            { id: 3, name: "Bus to Airport", time: "6:00 PM", drs: 45, risk: "Medium", isEvasible: true, evaded: false },
        ],
        crowdsourceReports: [
            { id: 1, text: "Major overcrowding reported on Line 2", reward: { type: 'resilience', value: 1 }, status: 'pending' }
        ],
        travel_quests: [
            { id: 1, title: "Recharge: Forest Bathing", type: "Calmcation", reward: "+10 Vitality Buff", desc: "Spend a day at the national park, disconnected from devices." },
            { id: 2, title: "Cultural Exchange: Market Day", type: "Cultural", reward: "New Recipe Item", desc: "Gamify meaningful local interaction with cultural experiences." },
        ],
        events: [
            { id: 1, name: "Weekend Mountain Trek", interest: "hiking", location: "Green Valley Park" },
            { id: 2, name: "Intro to Python Workshop", interest: "coding", location: "Tech Hub Downtown" },
            { id: 3, name: "Golden Hour Photo Walk", interest: "photography", location: "City Waterfront" },
            { id: 4, name: "Sci-Fi Book Club Meetup", interest: "reading", location: "The Grand Library" },
            { id: 5, name: "Hackathon Kick-off", interest: "coding", location: "Innovation Center" },
            { id: 6, name: "Advanced Landscape Photography", interest: "photography", location: "Sunset Point" }
        ],
        roadmap: [
            { phase: 'MVP', title: 'Core Gamified Loop (MVP)', complexity: 'Low-to-Moderate', features: 'Character Sheet (4 Stats), Daily/To-Do Quests, Milestone Habits, Basic Life Run (Linear Projection).', color: 'emerald' },
            { phase: 'Phase 1', title: 'Predictive Logistics & Resilience', complexity: 'High', features: 'The Oracle (GTFS-RT data only), Real-time Stress Tracking (Passive Wearable Integration). No rerouting yet.', color: 'sky' },
            { phase: 'Phase 2', title: 'Ecosystem & Commerce', complexity: 'Very High', features: 'Full Oracle (with crowdsourcing & rerouting), Merchant API (tokenized compliance), Calmcations/Cultural Missions, Guild Hall.', color: 'amber' }
        ],
        activeSection: 'dashboard'
    };

    // --- Multi-page Navigation (no SPA behavior needed) ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    let statsChart, futureChart, marketChart;

    // Mobile menu toggle (if elements exist)
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    }

    // --- UI Update Functions ---
    function updateUI() {
        // Only render components that exist on the current page
        renderCharacterSheet();
        renderQuests();
        renderTrips();
        renderCrowdsourcing();
        renderTravelQuests();
        renderEvents();
        updateStatsChart();
    }
    
    function renderCharacterSheet() {
        if (document.getElementById('char-level')) {
            const { level, xp, xp_needed, evasionPoints, gold } = state.character;
            document.getElementById('char-level').innerHTML = `Alex <span class="text-sm font-medium text-slate-500">Lv. ${level}</span>`;
            document.getElementById('evasion-points').textContent = evasionPoints;
            document.getElementById('char-gold').textContent = gold;
            document.getElementById('xp-bar').style.width = `${Math.max(0, (xp / xp_needed) * 100)}%`;
            document.getElementById('xp-text').textContent = `${xp} / ${xp_needed} XP`;
        }
    }

    function renderQuests() {
        const questList = document.getElementById('quest-list');
        if (questList) {
            questList.innerHTML = '';
            state.quests.forEach(quest => {
                const questEl = document.createElement('div');
                questEl.className = 'flex items-center justify-between p-2 bg-slate-50 rounded-md';
                const rewardHtml = quest.rewardGold ? `<span class="text-xs font-bold text-yellow-500 mr-2">+${quest.rewardGold} G</span>` : '';
                questEl.innerHTML = `
                    <div>
                        <div class="flex items-center">
                            <input type="checkbox" id="quest-${quest.id}" data-id="${quest.id}" class="h-5 w-5 rounded border-gray-300 text-sky-600 focus:ring-sky-500 cursor-pointer" ${quest.done ? 'checked' : ''}>
                            <label for="quest-${quest.id}" class="ml-3 text-sm ${quest.done ? 'text-slate-400 line-through' : 'text-slate-700'} cursor-pointer">${quest.text}</label>
                        </div>
                        <p class="text-xs text-slate-400 ml-8 mt-1">Impact Weight: ${quest.impactWeight}</p>
                    </div>
                    <div class="flex items-center">
                        ${rewardHtml}
                        <span class="text-xs font-bold text-emerald-500">+${quest.xp} XP</span>
                    </div>
                `;
                questList.appendChild(questEl);
            });
            questList.querySelectorAll('input[type="checkbox"]').forEach(cb =>
                cb.addEventListener('change', e => handleQuestToggle(parseInt(e.target.dataset.id), e.target.checked))
            );
        }
    }

    function renderTrips() {
        const tripList = document.getElementById('trip-list');
        if (tripList) {
            tripList.innerHTML = '';
            state.trips.forEach(trip => {
                let riskColor = { High: 'red', Medium: 'amber', Low: 'emerald' }[trip.risk];
                const evasionButton = trip.isEvasible
                    ? `<button data-trip-id="${trip.id}" class="evade-btn text-xs bg-sky-600 text-white font-bold py-1 px-3 rounded-md hover:bg-sky-700 disabled:bg-slate-400" ${trip.evaded ? 'disabled' : ''}>${trip.evaded ? 'Evaded' : 'Evade'}</button>`
                    : `<span class="text-xs text-slate-500">Not Evasible</span>`;

                const tripEl = document.createElement('div');
                tripEl.className = 'bg-white p-4 rounded-xl shadow-md';
                tripEl.innerHTML = `
                    <div class="flex justify-between items-start">
                        <div><p class="font-bold">${trip.name}</p><p class="text-sm text-slate-500">${trip.time}</p></div>
                        <span class="text-xs font-bold px-2 py-1 rounded-full bg-${riskColor}-100 text-${riskColor}-800">${trip.risk} Risk</span>
                    </div>
                    <div class="mt-3"><p class="text-sm font-medium mb-1">DRS: ${trip.drs}%</p><div class="w-full bg-slate-200 rounded-full h-2.5"><div class="bg-${riskColor}-500 h-2.5 rounded-full" style="width: ${trip.drs}%"></div></div></div>
                    <div class="mt-3 flex justify-between items-center"><p class="text-xs text-slate-500">25 min advance warning</p>${evasionButton}</div>
                `;
                tripList.appendChild(tripEl);
            });
            tripList.querySelectorAll('.evade-btn').forEach(b =>
                b.addEventListener('click', e => handleEvasion(parseInt(e.target.dataset.tripId)))
            );
        }
    }
    
    function renderCrowdsourcing() {
        const list = document.getElementById('crowdsource-list');
        if (list) {
            list.innerHTML = '';
            state.crowdsourceReports.forEach(report => {
                const el = document.createElement('div');
                el.className = 'bg-slate-100 p-3 rounded-lg';
                let buttonsHtml = '';
                if (report.status === 'pending') {
                     buttonsHtml = `<div class="flex space-x-2"><button data-id="${report.id}" class="verify-btn text-xs bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-1 px-2 rounded">Verify</button><button class="text-xs bg-slate-300 hover:bg-slate-400 text-slate-700 font-bold py-1 px-2 rounded">Dismiss</button></div>`;
                } else {
                     buttonsHtml = `<p class="text-sm font-semibold text-emerald-600">Verified (+${report.reward.value} Resilience)</p>`;
                }
                el.innerHTML = `
                    <p class="text-sm text-slate-700 mb-2">${report.text}</p>
                    <div class="flex justify-end items-center">${buttonsHtml}</div>
                `;
                list.appendChild(el);
            });
            list.querySelectorAll('.verify-btn').forEach(b =>
                b.addEventListener('click', e => handleVerification(parseInt(e.target.dataset.id)))
            );
        }
    }
    
    function renderTravelQuests() {
        const travelList = document.getElementById('travel-quest-list');
        if (travelList) {
            travelList.innerHTML = '';
            state.travel_quests.forEach(q => {
                 const el = document.createElement('div');
                 el.className = 'bg-slate-50 p-4 rounded-xl border';
                 el.innerHTML = `<p class="text-xs font-semibold ${q.type === 'Calmcation' ? 'text-sky-600' : 'text-emerald-600'}">${q.type}</p><p class="font-bold mt-1">${q.title}</p><p class="text-sm text-slate-500 mt-1">${q.desc}</p><p class="text-sm font-medium text-amber-600 mt-3">Reward: ${q.reward}</p>`;
                 travelList.appendChild(el);
            });
        }
    }
    
    function renderEvents() {
        const eventList = document.getElementById('event-list');
        if (eventList) {
            eventList.innerHTML = '';
            state.events.forEach(e => {
                const el = document.createElement('div');
                el.className = 'event-card bg-white p-4 rounded-xl shadow-md';
                el.dataset.interest = e.interest;
                el.innerHTML = `<p class="font-bold">${e.name}</p><p class="text-sm text-slate-500">${e.location}</p><p class="text-xs font-semibold mt-2 capitalize text-sky-600">${e.interest}</p>`;
                eventList.appendChild(el);
            });
        }
    }

    function filterEvents(interest) {
        const eventCards = document.querySelectorAll('.event-card');
        const interestTags = document.querySelectorAll('.interest-tag');

        if (eventCards.length > 0) {
            eventCards.forEach(card => {
                if (interest === 'all' || card.dataset.interest === interest) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        }

        if (interestTags.length > 0) {
            interestTags.forEach(tag => {
                if(tag.dataset.interest === interest) {
                    tag.classList.add('bg-sky-500', 'text-white');
                    tag.classList.remove('bg-white', 'text-slate-600');
                } else {
                    tag.classList.remove('bg-sky-500', 'text-white');
                    tag.classList.add('bg-white', 'text-slate-600');
                }
            });
        }
    }

    const interestTags = document.querySelectorAll('.interest-tag');
    if (interestTags.length > 0) {
        interestTags.forEach(tag => {
            tag.addEventListener('click', (e) => {
                filterEvents(e.target.dataset.interest);
            });
        });
    }

    function renderRoadmap() {
        const timeline = document.getElementById('roadmap-timeline');
        if (timeline) {
            timeline.innerHTML = '';
            state.roadmap.forEach(item => {
                const el = document.createElement('div');
                el.className = 'relative pl-8 border-l-2 border-slate-200';
                el.innerHTML = `
                    <div class="absolute w-4 h-4 rounded-full bg-${item.color}-500 -left-2 top-0 border-4 border-white"></div>
                    <p class="font-bold text-lg mb-1">Phase ${item.phase}: ${item.title}</p>
                    <p class="text-xs font-semibold text-slate-500 mb-2">Complexity: ${item.complexity}</p>
                    <p class="text-sm text-slate-600">${item.features}</p>
                `;
                timeline.appendChild(el);
            });
        }
    }

    // --- Interaction Handlers ---
    function handleQuestToggle(questId, isDone) {
        const quest = state.quests.find(q => q.id === questId);
        if (!quest || quest.done === isDone) return;
        quest.done = isDone;
        const { character } = state;

        if (isDone) {
            character.xp += quest.xp;
            if(quest.rewardGold) character.gold += quest.rewardGold;
            character.stats[quest.stat] = Math.min(100, character.stats[quest.stat] + 5);
            while (character.xp >= character.xp_needed) {
                character.xp -= character.xp_needed;
                character.level++;
                character.xp_needed += character.base_xp_increment;
            }
        } else {
            character.xp -= quest.xp;
            if(quest.rewardGold) character.gold -= quest.rewardGold;
            character.stats[quest.stat] = Math.max(0, character.stats[quest.stat] - 5);
            while (character.xp < 0 && character.level > 1) {
                character.level--;
                character.xp_needed -= character.base_xp_increment;
                character.xp += character.xp_needed;
            }
        }
        updateUI();
    }
    
    function handleEvasion(tripId) {
        const trip = state.trips.find(t => t.id === tripId);
        if (!trip || trip.evaded) return;
        trip.evaded = true;
        state.character.evasionPoints += 10;
        state.character.stats.resilience = Math.min(100, state.character.stats.resilience + 5);
        updateUI();
    }
    
    function handleVerification(reportId) {
        const report = state.crowdsourceReports.find(r => r.id === reportId);
        if (!report || report.status !== 'pending') return;
        report.status = 'verified';
        if (report.reward.type === 'resilience') {
            state.character.stats.resilience = Math.min(100, state.character.stats.resilience + report.reward.value);
        }
        updateUI();
    }

    // --- Charting Functions ---
    function createStatsChart() {
        const canvas = document.getElementById('statsChart');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            statsChart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: Object.keys(state.character.stats).map(s => s.charAt(0).toUpperCase() + s.slice(1)),
                    datasets: [{
                        label: 'Character Stats',
                        data: Object.values(state.character.stats),
                        backgroundColor: 'rgba(56, 189, 248, 0.2)',
                        borderColor: 'rgb(14, 165, 233)',
                        pointBackgroundColor: 'rgb(14, 165, 233)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(14, 165, 233)'
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        r: {
                            suggestedMin: 0,
                            suggestedMax: 100,
                            pointLabels: { font: { size: 14, weight: 'bold' } },
                            angleLines: { display: true, color: 'rgba(0, 0, 0, 0.1)' },
                            grid: { color: 'rgba(0, 0, 0, 0.1)' },
                            ticks: {
                                backdropColor: 'rgba(0,0,0,0)',
                                stepSize: 20
                            }
                        }
                    }
                }
            });
        }
    }

    function updateStatsChart() {
        if (statsChart) {
            statsChart.data.datasets[0].data = Object.values(state.character.stats);
            statsChart.update();
        }
    }

    function createFutureChart() {
        const canvas = document.getElementById('futureChart');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            futureChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Start', '3 Mo', '6 Mo', '9 Mo', '1 Year'],
                    datasets: [
                        {
                            label: 'Projected Prosperity',
                            borderColor: 'rgb(16, 185, 129)',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            fill: true,
                            tension: 0.4
                        },
                        {
                            label: 'Projected Vitality',
                            borderColor: 'rgb(239, 68, 68)',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            fill: true,
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                        legend: { position: 'bottom' },
                        title: { display: true, text: '1-Year Life Run Projection' }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            title: { display: true, text: 'Stat Value' }
                        }
                    }
                }
            });
            updateFutureChart(75);
        }
    }
    
    function updateFutureChart(fidelity) {
        if (!futureChart) return;
        const rate = fidelity / 100;
        const base = 50;
        
        const prosperityData = [base, base + (15*rate), base + (30*rate*1.2), base + (50*rate*1.4), base + (70*rate*1.6)];
        const vitalityData = [base, base + (10*rate), base + (15*rate) - (5*(1-rate)), base + (20*rate) - (15*(1-rate)), base + (25*rate) - (30*(1-rate))];

        futureChart.data.datasets[0].data = prosperityData;
        futureChart.data.datasets[1].data = vitalityData;
        futureChart.update();
        
        const narrativeEl = document.getElementById('simulation-narrative');
        let narrativeText;
        if (rate > 0.8) {
            narrativeText = `<strong>High Fidelity:</strong> Projected future self is Level 45+ with High Prosperity and Vitality. Epic Challenge success is likely.`;
        } else if (rate > 0.4) {
            narrativeText = `<strong>Moderate Fidelity:</strong> Steady progress. Projected future self is Level 25-30. Vitality shows signs of strain.`;
        } else {
            narrativeText = `<strong>Low Fidelity:</strong> Stagnation. Projected future self is Level 12, with Low Prosperity and a high risk of burnout from declining RESILIENCE.`;
        }
        narrativeEl.innerHTML = `<p class="font-semibold">Projected Future Self:</p><p class="text-sm text-slate-600">${narrativeText}</p>`;
    }
    
    function createMarketChart() {
        const canvas = document.getElementById('marketChart');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            marketChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Habit Tracking', 'Wellness Tourism', 'Gamification Apps'],
                    datasets: [{
                        label: 'Projected CAGR (2024-2033)',
                        data: [14.2, 13, 14.5],
                        backgroundColor: ['rgba(14, 165, 233, 0.7)', 'rgba(16, 185, 129, 0.7)', 'rgba(251, 191, 36, 0.7)'],
                        borderColor: ['rgb(14, 165, 233)', 'rgb(16, 185, 129)', 'rgb(251, 191, 36)'],
                        borderWidth: 1
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    responsive: true,
                    scales: {
                        x: {
                            beginAtZero: true,
                            title: { display: true, text: 'CAGR (%)' }
                        }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.x !== null) {
                                        label += context.parsed.x.toFixed(1) + '%';
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    const successSlider = document.getElementById('success-rate');
    if (successSlider) {
        successSlider.addEventListener('input', e => {
            document.getElementById('success-rate-value').textContent = `${e.target.value}%`;
            updateFutureChart(parseInt(e.target.value));
        });
    }

    // --- INITIALIZATION ---
    function init() {
        // Only initialize components that exist on the current page
        createStatsChart();
        createFutureChart();
        createMarketChart();
        renderRoadmap();
        updateUI();
    }

    init();
});
