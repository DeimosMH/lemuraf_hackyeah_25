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
        activeSection: 'dashboard',
        pendingEvent: null,
        aiPlan: null,
        selectedEvent: null
    };

    // --- Multi-page Navigation (no SPA behavior needed) ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    let statsChart = null, futureChart = null, marketChart = null;

    // Mobile menu toggle (if elements exist)
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    }

    // --- UI Update Functions ---
    function updateUI() {
        // Only render components that exist on the current page
        try {
            renderCharacterSheet();
            renderQuests();
            renderTrips();
            renderCrowdsourcing();
            renderTravelQuests();
            renderEvents();
            updateStatsChart();
            updateBackgroundTree();
        } catch (error) {
            console.warn('Some UI components could not be rendered:', error);
        }
    }
    
    function renderCharacterSheet() {
        try {
            const charLevelEl = document.getElementById('char-level');
            const evasionPointsEl = document.getElementById('evasion-points');
            const charGoldEl = document.getElementById('char-gold');
            const xpBarEl = document.getElementById('xp-bar');
            const xpTextEl = document.getElementById('xp-text');

            if (charLevelEl) {
                const { level, xp, xp_needed, evasionPoints, gold } = state.character;
                charLevelEl.innerHTML = `Alex <span class="text-sm font-medium text-slate-500">Lv. ${level}</span>`;
                if (evasionPointsEl) evasionPointsEl.textContent = evasionPoints;
                if (charGoldEl) charGoldEl.textContent = gold;
                if (xpBarEl) xpBarEl.style.width = `${Math.max(0, (xp / xp_needed) * 100)}%`;
                if (xpTextEl) xpTextEl.textContent = `${xp} / ${xp_needed} XP`;
            }
        } catch (error) {
            console.warn('Error rendering character sheet:', error);
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
                el.className = `event-card bg-white p-4 rounded-xl shadow-md cursor-pointer transition-all hover:shadow-lg hover:bg-slate-50 ${e.planned ? 'ring-2 ring-green-200' : ''}`;
                el.dataset.interest = e.interest;
                el.dataset.eventId = e.id;

                let statusBadge = '';
                if (e.planned) {
                    statusBadge = '<span class="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-800">Planned</span>';
                } else {
                    statusBadge = '<span class="text-xs font-bold px-2 py-1 rounded-full bg-amber-100 text-amber-800">Available</span>';
                }

                let costInfo = '';
                if (e.cost) {
                    costInfo = `<p class="text-xs font-semibold text-amber-600 mt-1">Cost: $${e.cost.toFixed(2)}</p>`;
                }

                el.innerHTML = `
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <p class="font-bold">${e.name}</p>
                            <p class="text-sm text-slate-500">${e.location}</p>
                            <p class="text-xs font-semibold mt-2 capitalize text-sky-600">${e.interest}</p>
                            ${costInfo}
                        </div>
                        ${statusBadge}
                    </div>
                `;

                // Add click handler to trigger AI planning
                el.addEventListener('click', () => handleEventClick(e.id));

                eventList.appendChild(el);
            });
        }
    }

    function filterEvents(interest) {
        try {
            const eventCards = document.querySelectorAll('.event-card');
            const interestTags = document.querySelectorAll('.interest-tag');

            if (eventCards.length > 0) {
                eventCards.forEach(card => {
                    if (card && card.dataset) {
                        if (interest === 'all' || card.dataset.interest === interest) {
                            card.classList.remove('hidden');
                        } else {
                            card.classList.add('hidden');
                        }
                    }
                });
            }

            if (interestTags.length > 0) {
                interestTags.forEach(tag => {
                    if (tag && tag.dataset && tag.dataset.interest) {
                        if (tag.dataset.interest === interest) {
                            tag.classList.add('bg-sky-500', 'text-white');
                            tag.classList.remove('bg-white', 'text-slate-600');
                        } else {
                            tag.classList.remove('bg-sky-500', 'text-white');
                            tag.classList.add('bg-white', 'text-slate-600');
                        }
                    }
                });
            }
        } catch (error) {
            console.warn('Error filtering events:', error);
        }
    }

    // Event listeners for interest tags (only add if elements exist)
    function setupInterestTagListeners() {
        const interestTags = document.querySelectorAll('.interest-tag');
        if (interestTags.length > 0) {
            interestTags.forEach(tag => {
                tag.addEventListener('click', (e) => {
                    filterEvents(e.target.dataset.interest);
                });
            });
        }
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
        saveState();
    }
    
    function handleEvasion(tripId) {
        const trip = state.trips.find(t => t.id === tripId);
        if (!trip || trip.evaded) return;
        trip.evaded = true;
        state.character.evasionPoints += 10;
        state.character.stats.resilience = Math.min(100, state.character.stats.resilience + 5);
        updateUI();
        saveState();
    }
    
    function handleVerification(reportId) {
        const report = state.crowdsourceReports.find(r => r.id === reportId);
        if (!report || report.status !== 'pending') return;
        report.status = 'verified';
        if (report.reward.type === 'resilience') {
            state.character.stats.resilience = Math.min(100, state.character.stats.resilience + report.reward.value);
        }
        updateUI();
        saveState();
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

    function destroyCharts() {
        if (statsChart) {
            statsChart.destroy();
            statsChart = null;
        }
        if (futureChart) {
            futureChart.destroy();
            futureChart = null;
        }
        if (marketChart) {
            marketChart.destroy();
            marketChart = null;
        }
    }

    function updateBackgroundTree() {
        const tree = document.getElementById('background-tree');
        if (tree) {
            const completed = state.quests.filter(q => q.done).length;
            const growth = Math.max(0.3, completed / state.quests.length);
            tree.style.transform = `scale(${growth})`;
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

    // --- State Persistence ---
    function saveState() {
        try {
            localStorage.setItem('odyssey-state', JSON.stringify(state));
        } catch (error) {
            console.warn('Failed to save state:', error);
        }
    }

    function loadState() {
        try {
            const savedState = localStorage.getItem('odyssey-state');
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                // Merge with default state to handle new properties
                Object.keys(parsedState).forEach(key => {
                    if (state.hasOwnProperty(key)) {
                        if (typeof state[key] === 'object' && state[key] !== null) {
                            Object.assign(state[key], parsedState[key]);
                        } else {
                            state[key] = parsedState[key];
                        }
                    }
                });
            }
        } catch (error) {
            console.warn('Failed to load state:', error);
        }
    }

    // --- Event Planning Functions ---
    function generateAIPlan(eventData, originalEvent = null) {
        // Check if this is for an existing event (auto-planning) or new event (form-based)
        const isExistingEvent = originalEvent !== null;

        if (isExistingEvent) {
            // For existing events: generate plan and show payment directly
            generatePlanForExistingEvent(eventData, originalEvent);
        } else {
            // For new events: show the popup form
            openEventPlanningModal();
            showPlanInModal(eventData);
        }
    }

    function generatePlanForExistingEvent(eventData, originalEvent) {
        // Simulate AI processing time
        setTimeout(() => {
            const plan = createDetailedPlan(eventData);
            state.selectedEvent = originalEvent;
            state.aiPlan = plan;

            // Show payment modal directly
            showPaymentModal(plan);
        }, 1500);
    }

    function showPlanInModal(eventData) {
        const planContainer = document.getElementById('ai-plan-container');
        const planContent = document.getElementById('ai-plan-content');

        // Show loading state
        planContainer.classList.remove('hidden');
        planContent.classList.add('hidden');

        // Simulate AI processing time
        setTimeout(() => {
            const plan = createDetailedPlan(eventData);
            displayAIPlan(plan);
            planContent.classList.remove('hidden');
        }, 2000);
    }

    function createDetailedPlan(eventData) {
        // Simulate retrieving various data sources
        const weatherData = getSimulatedWeatherData(eventData);
        const habitData = getSimulatedHabitData();
        const locationData = getSimulatedLocationData(eventData);
        const userPreferences = getSimulatedUserPreferences();

        // Generate comprehensive plan based on all factors
        const plan = {
            event: eventData,
            dataAnalysis: generateDataAnalysis(weatherData, habitData, locationData),
            optimalSchedule: generateOptimalSchedule(eventData, weatherData, habitData),
            smartRecommendations: generateSmartRecommendations(eventData, userPreferences, locationData),
            costBreakdown: generateCostBreakdown(eventData, locationData),
            totalCost: calculateTotalCost(eventData, locationData)
        };

        state.aiPlan = plan;
        return plan;
    }

    function getSimulatedWeatherData(eventData) {
        const eventDate = new Date(eventData.datetime);
        const month = eventDate.getMonth();
        const hour = eventDate.getHours();

        // Simulate weather patterns based on season and time
        const weatherScenarios = {
            spring: ['sunny', 'cloudy', 'light_rain', 'windy'],
            summer: ['sunny', 'hot', 'clear', 'humid'],
            autumn: ['cloudy', 'cool', 'windy', 'rainy'],
            winter: ['cold', 'snow', 'cloudy', 'windy']
        };

        const season = month <= 2 ? 'winter' : month <= 5 ? 'spring' : month <= 8 ? 'summer' : 'autumn';
        const baseWeather = weatherScenarios[season][Math.floor(Math.random() * weatherScenarios[season].length)];

        return {
            condition: baseWeather,
            temperature: season === 'summer' ? 25 + Math.random() * 10 : season === 'winter' ? -5 + Math.random() * 10 : 15 + Math.random() * 10,
            humidity: 40 + Math.random() * 40,
            windSpeed: Math.random() * 20,
            confidence: 85 + Math.random() * 10
        };
    }

    function getSimulatedHabitData() {
        // Analyze user's quest completion patterns
        const completedQuests = state.quests.filter(q => q.done).length;
        const totalQuests = state.quests.length;
        const completionRate = (completedQuests / totalQuests) * 100;

        return {
            energyLevel: Math.max(30, Math.min(90, 50 + (completionRate * 0.4))),
            productivityPeak: completionRate > 70 ? 'morning' : completionRate > 40 ? 'afternoon' : 'evening',
            stressLevel: Math.max(20, Math.min(80, 60 - (completionRate * 0.3))),
            preferredActivities: state.quests.filter(q => q.done).map(q => q.stat)
        };
    }

    function getSimulatedLocationData(eventData) {
        // Simulate location-based data
        const locationInfo = {
            hiking: {
                accessibility: 'moderate',
                crowdLevel: 'low',
                facilities: ['parking', 'trails', 'restrooms'],
                baseCost: 15
            },
            coding: {
                accessibility: 'easy',
                crowdLevel: 'medium',
                facilities: ['wifi', 'power_outlets', 'seating'],
                baseCost: 25
            },
            photography: {
                accessibility: 'easy',
                crowdLevel: 'medium',
                facilities: ['lighting', 'backdrop', 'equipment_rental'],
                baseCost: 30
            },
            reading: {
                accessibility: 'easy',
                crowdLevel: 'low',
                facilities: ['quiet_area', 'comfortable_seating', 'cafe'],
                baseCost: 10
            }
        };

        return locationInfo[eventData.interest] || {
            accessibility: 'moderate',
            crowdLevel: 'medium',
            facilities: ['basic_amenities'],
            baseCost: 20
        };
    }

    function getSimulatedUserPreferences() {
        // Based on character stats and completed quests
        return {
            budgetPreference: state.character.stats.prosperity > 70 ? 'moderate' : 'budget_conscious',
            energyPreference: state.character.stats.vitality > 70 ? 'high_energy' : 'relaxed',
            socialPreference: state.character.stats.resilience > 60 ? 'social' : 'independent',
            learningStyle: state.character.stats.cognition > 75 ? 'structured' : 'flexible'
        };
    }

    function generateDataAnalysis(weatherData, habitData, locationData) {
        return `
            <strong>Weather Analysis:</strong> ${weatherData.condition} conditions with ${Math.round(weatherData.temperature)}°C temperature (${Math.round(weatherData.confidence)}% confidence)<br>
            <strong>Energy Pattern:</strong> Your ${habitData.productivityPeak} productivity peak aligns well with this timing<br>
            <strong>Activity Match:</strong> ${locationData.crowdLevel} crowd levels suit your ${habitData.preferredActivities.join(', ')} preferences<br>
            <strong>Stress Indicator:</strong> Current stress level at ${Math.round(habitData.stressLevel)}% - optimal for ${habitData.stressLevel < 50 ? 'challenging' : 'relaxing'} activities
        `;
    }

    function generateOptimalSchedule(eventData, weatherData, habitData) {
        const startTime = new Date(eventData.datetime);
        const endTime = new Date(startTime.getTime() + (eventData.duration * 60 * 60 * 1000));

        let schedule = '';

        if (habitData.productivityPeak === 'morning' && startTime.getHours() < 12) {
            schedule += `<strong>🌅 Early Start Bonus:</strong> Aligns with your morning energy peak (+15% effectiveness)<br>`;
        }

        schedule += `<strong>⏰ Recommended Schedule:</strong><br>`;
        schedule += `• ${startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}: Main activity<br>`;

        if (weatherData.condition.includes('rain') || weatherData.condition.includes('snow')) {
            schedule += `• ${new Date(startTime.getTime() - 30 * 60 * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}: Check indoor alternatives<br>`;
        }

        if (habitData.stressLevel > 60) {
            schedule += `• ${new Date(endTime.getTime() + 15 * 60 * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}: Buffer time for relaxation<br>`;
        }

        return schedule;
    }

    function generateSmartRecommendations(eventData, userPreferences, locationData) {
        let recommendations = '';

        // Budget-based recommendations
        if (userPreferences.budgetPreference === 'budget_conscious') {
            recommendations += `<strong>💰 Budget Optimization:</strong> Look for early-bird discounts or free alternatives<br>`;
        }

        // Energy-based recommendations
        if (userPreferences.energyPreference === 'relaxed') {
            recommendations += `<strong>🔋 Energy Management:</strong> Include rest breaks every hour<br>`;
        }

        // Social preferences
        if (userPreferences.socialPreference === 'independent') {
            recommendations += `<strong>🤝 Social Setting:</strong> Choose quieter areas or off-peak times<br>`;
        }

        // Activity-specific recommendations
        if (eventData.interest === 'hiking') {
            recommendations += `<strong>🥾 Hiking Specific:</strong> Check trail conditions and bring appropriate footwear<br>`;
        } else if (eventData.interest === 'coding') {
            recommendations += `<strong>💻 Tech Setup:</strong> Verify WiFi availability and power outlet access<br>`;
        } else if (eventData.interest === 'photography') {
            recommendations += `<strong>📸 Photography Tips:</strong> Golden hour at ${eventData.interest === 'photography' ? 'sunset' : 'optimal lighting times'}<br>`;
        }

        return recommendations;
    }

    function generateCostBreakdown(eventData, locationData) {
        const baseCost = locationData.baseCost;
        const durationMultiplier = eventData.duration > 3 ? 1.2 : 1.0;
        const interestMultiplier = {
            hiking: 0.8,
            coding: 1.3,
            photography: 1.4,
            reading: 0.6
        };

        const activityCost = baseCost * (interestMultiplier[eventData.interest] || 1.0) * durationMultiplier;
        const transportCost = Math.random() * 20 + 5; // Simulated transport cost
        const miscCost = Math.random() * 15 + 5; // Equipment, food, etc.

        return `
            <strong>Activity Fee:</strong> $${activityCost.toFixed(2)} (${locationData.baseCost}h base rate)<br>
            <strong>Transportation:</strong> $${transportCost.toFixed(2)} (estimated)<br>
            <strong>Miscellaneous:</strong> $${miscCost.toFixed(2)} (equipment/food)<br>
            <strong>Total Estimated:</strong> $${(activityCost + transportCost + miscCost).toFixed(2)}
        `;
    }

    function calculateTotalCost(eventData, locationData) {
        const baseCost = locationData.baseCost;
        const durationMultiplier = eventData.duration > 3 ? 1.2 : 1.0;
        const interestMultiplier = {
            hiking: 0.8,
            coding: 1.3,
            photography: 1.4,
            reading: 0.6
        };

        const activityCost = baseCost * (interestMultiplier[eventData.interest] || 1.0) * durationMultiplier;
        const transportCost = Math.random() * 20 + 5;
        const miscCost = Math.random() * 15 + 5;

        return activityCost + transportCost + miscCost;
    }

    function displayAIPlan(plan) {
        document.getElementById('data-analysis').innerHTML = plan.dataAnalysis;
        document.getElementById('optimal-schedule').innerHTML = plan.optimalSchedule;
        document.getElementById('smart-recommendations').innerHTML = plan.smartRecommendations;
        document.getElementById('cost-breakdown').innerHTML = plan.costBreakdown;
    }

    function showPaymentModal(plan) {
        const modal = document.getElementById('payment-modal');
        const eventSummary = document.getElementById('payment-event-summary');
        const paymentDetails = document.getElementById('payment-details');

        eventSummary.innerHTML = `
            <strong>${plan.event.name}</strong><br>
            ${plan.event.location}<br>
            ${new Date(plan.event.datetime).toLocaleDateString()} at ${new Date(plan.event.datetime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        `;

        paymentDetails.innerHTML = `
            <strong>Amount Due:</strong> $${plan.totalCost.toFixed(2)}<br>
            <strong>Processing Fee:</strong> $2.50<br>
            <strong>Total:</strong> $${(plan.totalCost + 2.50).toFixed(2)}<br>
            <small class="text-slate-500">Payment secured by Odyssey Wallet</small>
        `;

        modal.classList.remove('hidden');
    }

    function handleEventClick(eventId) {
        const event = state.events.find(e => e.id === eventId);
        if (!event) return;

        // Don't replan if already planned
        if (event.planned) {
            alert('This event is already planned and paid for.');
            return;
        }

        // Auto-generate AI plan and show payment
        autoPlanEvent(event);
    }

    function autoPlanEvent(event) {
        // Generate event data for planning (using current time + 2 hours as default)
        const eventData = {
            name: event.name,
            interest: event.interest,
            location: event.location,
            datetime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().slice(0, 16), // 2 hours from now
            duration: 2 // default 2 hours
        };

        // Generate AI plan
        generateAIPlan(eventData, event);
    }

    function openEventPlanningModal(event = null) {
        const modal = document.getElementById('event-planning-modal');

        // Pre-fill form if event data is provided
        if (event) {
            document.getElementById('event-name').value = event.name;
            document.getElementById('event-interest').value = event.interest;
            document.getElementById('event-location').value = event.location;
            // Set default time to 2 hours from now
            const futureTime = new Date(Date.now() + 2 * 60 * 60 * 1000);
            document.getElementById('event-datetime').value = futureTime.toISOString().slice(0, 16);
            document.getElementById('event-duration').value = 2;
        }

        modal.classList.remove('hidden');
    }

    function closeEventPlanningModal() {
        const modal = document.getElementById('event-planning-modal');
        modal.classList.add('hidden');

        // Reset form and hide AI plan
        document.getElementById('event-form').reset();
        document.getElementById('ai-plan-container').classList.add('hidden');

        // Clear state
        state.aiPlan = null;
        state.selectedEvent = null;
    }

    function showSelectedEventInfo(event) {
        const selectedEventInfo = document.getElementById('selected-event-info');
        const selectedEventDetails = document.getElementById('selected-event-details');

        selectedEventDetails.innerHTML = `
            <strong>${event.name}</strong><br>
            📍 ${event.location}<br>
            🏷️ ${event.interest.charAt(0).toUpperCase() + event.interest.slice(1)} Event
        `;

        selectedEventInfo.classList.remove('hidden');

        // Update planning status
        const planningStatus = document.getElementById('planning-status');
        planningStatus.innerHTML = `
            <div class="flex items-center justify-center space-x-2">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-600"></div>
                <p class="text-sky-600 font-semibold">Generating AI plan for ${event.name}...</p>
            </div>
        `;
    }

    function handleAcceptPlan() {
        if (state.aiPlan) {
            showPaymentModal(state.aiPlan);
        }
    }

    function handleRejectPlan() {
        closeEventPlanningModal();
    }

    function handleConfirmPayment() {
        if (state.aiPlan) {
            // Process payment
            const totalAmount = state.aiPlan.totalCost + 2.50;

            if (state.character.gold >= totalAmount) {
                state.character.gold -= totalAmount;

                // Add event to the events list if it's a new event
                if (state.selectedEvent) {
                    // Mark the selected event as planned
                    state.selectedEvent.planned = true;
                    state.selectedEvent.cost = totalAmount;
                } else {
                    // Create new event for custom planning
                    const newEvent = {
                        id: state.events.length + 1,
                        name: state.aiPlan.event.name,
                        interest: state.aiPlan.event.interest,
                        location: state.aiPlan.event.location,
                        planned: true,
                        cost: totalAmount
                    };
                    state.events.push(newEvent);
                }

                // Update UI
                updateUI();

                // Close modals
                document.getElementById('payment-modal').classList.add('hidden');
                closeEventPlanningModal();

                // Save state
                saveState();

                const eventName = state.selectedEvent ? state.selectedEvent.name : state.aiPlan.event.name;
                alert(`Payment successful! Event "${eventName}" has been added to your schedule.`);
            } else {
                alert('Insufficient funds. Please check your wallet balance.');
            }
        }
    }

    function handleCancelPayment() {
        document.getElementById('payment-modal').classList.add('hidden');
    }

    function handleEventFormSubmit(e) {
        e.preventDefault();

        const eventName = document.getElementById('event-name').value;
        const eventInterest = document.getElementById('event-interest').value;
        const eventLocation = document.getElementById('event-location').value;
        const eventDatetime = document.getElementById('event-datetime').value;
        const eventDuration = parseInt(document.getElementById('event-duration').value);

        if (!eventName || !eventInterest || !eventLocation || !eventDatetime) {
            alert('Please fill in all required fields');
            return;
        }

        const eventData = {
            name: eventName,
            interest: eventInterest,
            location: eventLocation,
            datetime: eventDatetime,
            duration: eventDuration
        };

        // Generate plan for new event (will show in modal)
        showPlanInModal(eventData);
    }

    // --- INITIALIZATION ---
    function init() {
        // Load saved state first
        loadState();

        // Set up interest tag listeners if they exist on this page
        setupInterestTagListeners();

        // Set up event form submission handler
        const eventForm = document.getElementById('event-form');
        if (eventForm) {
            eventForm.addEventListener('submit', handleEventFormSubmit);
        }

        // Event cards are now clickable and handled in renderEvents function

        // Set up plan action handlers
        const acceptPlanBtn = document.getElementById('accept-plan');
        const rejectPlanBtn = document.getElementById('reject-plan');
        if (acceptPlanBtn) {
            acceptPlanBtn.addEventListener('click', handleAcceptPlan);
        }
        if (rejectPlanBtn) {
            rejectPlanBtn.addEventListener('click', handleRejectPlan);
        }

        // Set up payment modal handlers
        const confirmPaymentBtn = document.getElementById('confirm-payment');
        const cancelPaymentBtn = document.getElementById('cancel-payment');
        if (confirmPaymentBtn) {
            confirmPaymentBtn.addEventListener('click', handleConfirmPayment);
        }
        if (cancelPaymentBtn) {
            cancelPaymentBtn.addEventListener('click', handleCancelPayment);
        }

        // Set up event planning modal handlers
        const quickPlanBtn = document.getElementById('quick-plan-event');
        const closeModalBtn = document.getElementById('close-planning-modal');

        if (quickPlanBtn) {
            quickPlanBtn.addEventListener('click', () => openEventPlanningModal());
        }

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeEventPlanningModal);
        }

        // Close modal when clicking outside
        const planningModal = document.getElementById('event-planning-modal');
        if (planningModal) {
            planningModal.addEventListener('click', (e) => {
                if (e.target === planningModal) {
                    closeEventPlanningModal();
                }
            });
        }

        // Only initialize components that exist on the current page
        try {
            createStatsChart();
            createFutureChart();
            createMarketChart();
            renderRoadmap();
            updateUI();
        } catch (error) {
            console.warn('Error during initialization:', error);
        }

        // Save state periodically
        setInterval(saveState, 30000); // Save every 30 seconds
    }

    init();
});
