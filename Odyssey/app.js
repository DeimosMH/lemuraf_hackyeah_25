

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
        travelAssistant: {
            chatMessages: [
                { id: 1, sender: 'ai', text: "Hello! I'm your AI travel assistant. Tell me about your dream destination or let me suggest something based on your preferences!", timestamp: new Date() }
            ],
            destinations: [
                { id: 1, name: "Tokyo, Japan", type: "cultural", budget: "luxury", description: "Experience the perfect blend of ancient tradition and cutting-edge modernity", image: "🏯" },
                { id: 2, name: "Bali, Indonesia", type: "relaxation", budget: "mid-range", description: "Tropical paradise with beautiful beaches and spiritual wellness retreats", image: "🏝️" },
                { id: 3, name: "Swiss Alps", type: "adventure", budget: "luxury", description: "Majestic mountains, pristine lakes, and world-class skiing", image: "⛰️" },
                { id: 4, name: "Marrakech, Morocco", type: "cultural", budget: "budget", description: "Vibrant souks, ancient medinas, and exotic culinary adventures", image: "🕌" }
            ],
            accommodations: [
                { id: 1, name: "Luxury Resort & Spa", location: "Bali", price: "€250/night", rating: 4.8, amenities: ["Pool", "Spa", "Beach Access"], image: "🏨" },
                { id: 2, name: "Boutique Hotel", location: "Tokyo", price: "€180/night", rating: 4.6, amenities: ["City View", "Restaurant", "Gym"], image: "🏢" },
                { id: 3, name: "Mountain Chalet", location: "Swiss Alps", price: "€320/night", rating: 4.9, amenities: ["Fireplace", "Balcony", "Ski Storage"], image: "🏔️" }
            ],
            routes: [
                { id: 1, from: "New York", to: "Tokyo", duration: "14h 30m", price: "€850", type: "Flight", stops: 0 },
                { id: 2, from: "London", to: "Bali", duration: "16h 45m", price: "€720", type: "Flight", stops: 1 },
                { id: 3, from: "Paris", to: "Swiss Alps", duration: "2h 15m", price: "€180", type: "Train", stops: 0 }
            ],
            currentTrip: null,
            itinerary: [],
            preferences: {
                budget: 'mid-range',
                style: 'relaxation'
            },
            activeJourneys: [
                { id: 1, route: "New York → Tokyo", status: "On Time", delay: 0, nextUpdate: "14:30", transportType: "Flight AA101" },
                { id: 2, route: "Tokyo → Kyoto", status: "Delayed", delay: 15, nextUpdate: "16:45", transportType: "Bullet Train Hikari 512" }
            ],
            delayAlerts: [
                { id: 1, message: "Your flight AA101 is experiencing a 15-minute delay due to weather conditions.", severity: "medium", timestamp: new Date() },
                { id: 2, message: "Alternative route suggestion: Take the 3:30 PM train instead for minimal delay.", severity: "low", timestamp: new Date() }
            ]
        }
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

        // Open modal and show AI planning for existing event (no form needed)
        openEventPlanningModalForExisting(event);
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

        // Show form section for new events
        document.getElementById('event-form-section').classList.remove('hidden');
        document.getElementById('ai-planning-section').classList.add('hidden');
        document.getElementById('event-info-section').classList.add('hidden');

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

    function openEventPlanningModalForExisting(event) {
        try {
            const modal = document.getElementById('event-planning-modal');
            if (!modal) {
                console.error('Modal not found');
                return;
            }

            // Hide form section, show AI planning section for existing events
            const formSection = document.getElementById('event-form-section');
            const aiSection = document.getElementById('ai-planning-section');
            const eventInfoSection = document.getElementById('event-info-section');

            if (formSection) formSection.classList.add('hidden');
            if (aiSection) aiSection.classList.remove('hidden');
            if (eventInfoSection) eventInfoSection.classList.remove('hidden');

            // Show event info
            const eventInfoDetails = document.getElementById('event-info-details');
            if (eventInfoDetails) {
                eventInfoDetails.innerHTML = `
                    <strong>${event.name}</strong><br>
                    📍 ${event.location}<br>
                    🏷️ ${event.interest.charAt(0).toUpperCase() + event.interest.slice(1)} Event
                `;
            }

            modal.classList.remove('hidden');
            console.log('Modal opened for existing event:', event.name);

            // Auto-generate AI plan for existing event
            setTimeout(() => {
                generatePlanForExistingEvent(event);
            }, 1000);
        } catch (error) {
            console.error('Error opening modal:', error);
            alert('Error opening planning modal. Please try again.');
        }
    }

    function generatePlanForExistingEvent(event) {
        // Generate event data for planning (using current time + 2 hours as default)
        const eventData = {
            name: event.name,
            interest: event.interest,
            location: event.location,
            datetime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().slice(0, 16), // 2 hours from now
            duration: 2 // default 2 hours
        };

        // Simulate AI processing time (1 second)
        console.log('Starting 1-second timeout for plan generation');
        setTimeout(() => {
            try {
                console.log('Timeout executed, generating plan...');
                const plan = createDetailedPlan(eventData);
                state.selectedEvent = event;
                state.aiPlan = plan;

                console.log('Plan generated, displaying...');
                // Display the plan
                displayAIPlanForExisting(plan);

                // Hide loading, show plan content
                const container = document.getElementById('ai-plan-container-existing');
                const content = document.getElementById('ai-plan-content-existing');

                console.log('Before showing - Container hidden?', container?.classList.contains('hidden'));
                console.log('Before showing - Content hidden?', content?.classList.contains('hidden'));

                if (container) {
                    container.classList.remove('hidden');
                    console.log('Container shown, hidden?', container.classList.contains('hidden'));
                }
                if (content) {
                    content.classList.remove('hidden');
                    console.log('Content shown, hidden?', content.classList.contains('hidden'));
                }

                console.log('Plan generated successfully:', plan);
            } catch (error) {
                console.error('Error generating plan:', error);
                alert('Error generating plan. Please try again.');
            }
        }, 1000);
    }

    function displayAIPlanForExisting(plan) {
        try {
            console.log('Starting to display plan:', plan);

            // Safely update DOM elements with null checks
            const dataAnalysisEl = document.getElementById('data-analysis-existing');
            const scheduleEl = document.getElementById('optimal-schedule-existing');
            const recommendationsEl = document.getElementById('smart-recommendations-existing');
            const costBreakdownEl = document.getElementById('cost-breakdown-existing');

            console.log('Found elements:', {
                dataAnalysisEl,
                scheduleEl,
                recommendationsEl,
                costBreakdownEl
            });

            if (dataAnalysisEl) {
                dataAnalysisEl.innerHTML = plan.dataAnalysis;
                console.log('Data analysis set');
            }
            if (scheduleEl) {
                scheduleEl.innerHTML = plan.optimalSchedule;
                console.log('Schedule set');
            }
            if (recommendationsEl) {
                recommendationsEl.innerHTML = plan.smartRecommendations;
                console.log('Recommendations set');
            }
            if (costBreakdownEl) {
                costBreakdownEl.innerHTML = plan.costBreakdown;
                console.log('Cost breakdown set');
            }

            console.log('Plan displayed successfully');
        } catch (error) {
            console.error('Error displaying plan:', error);
        }
    }

    function closeEventPlanningModal() {
        try {
            const modal = document.getElementById('event-planning-modal');
            if (modal) {
                modal.classList.add('hidden');
            }

            // Reset form and hide AI plan sections with null checks
            const eventForm = document.getElementById('event-form');
            const aiContainer = document.getElementById('ai-plan-container');
            const aiContainerExisting = document.getElementById('ai-plan-container-existing');
            const formSection = document.getElementById('event-form-section');
            const aiSection = document.getElementById('ai-planning-section');
            const eventInfoSection = document.getElementById('event-info-section');

            if (eventForm) eventForm.reset();
            if (aiContainer) aiContainer.classList.add('hidden');
            if (aiContainerExisting) aiContainerExisting.classList.add('hidden');
            if (formSection) formSection.classList.add('hidden');
            if (aiSection) aiSection.classList.add('hidden');
            if (eventInfoSection) eventInfoSection.classList.add('hidden');

            // Clear state
            state.aiPlan = null;
            state.selectedEvent = null;

            console.log('Modal closed successfully');
        } catch (error) {
            console.error('Error closing modal:', error);
        }
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

    // --- Travel Assistant Functions ---
    function renderTravelChat() {
        const chatContainer = document.getElementById('chat-messages');
        if (chatContainer) {
            chatContainer.innerHTML = '';
            state.travelAssistant.chatMessages.forEach(msg => {
                const msgEl = document.createElement('div');
                msgEl.className = `chat-message ${msg.sender === 'ai' ? 'bg-sky-100' : 'bg-emerald-100'} p-3 rounded-lg`;
                const ttsButton = msg.sender === 'ai' ? `<button class="tts-button text-xs bg-sky-500 text-white px-2 py-1 rounded mt-2 hover:bg-sky-600" onclick="speakText('${msg.text.replace(/'/g, "\\'")}')">🔊 Speak</button>` : '';
                msgEl.innerHTML = `
                    <p class="text-sm font-semibold ${msg.sender === 'ai' ? 'text-sky-600' : 'text-emerald-600'}">${msg.sender === 'ai' ? 'AI Assistant' : 'You'}</p>
                    <p class="text-sm text-slate-700">${msg.text}</p>
                    ${ttsButton}
                `;
                chatContainer.appendChild(msgEl);
            });
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }

    function addChatMessage(sender, text) {
        const newMessage = {
            id: state.travelAssistant.chatMessages.length + 1,
            sender: sender,
            text: text,
            timestamp: new Date()
        };
        state.travelAssistant.chatMessages.push(newMessage);
        renderTravelChat();
    }

    async function renderDestinations(llmData = null) {
    const container = document.getElementById('destination-cards');
    if (!container) return;

    // 1. Jeśli LLM coś zwrócił – użyj tego
    const data = llmData || state.travelAssistant.destinations;

    container.innerHTML = '';
    data.forEach(dest => {
        const card = document.createElement('div');
        card.className = 'bg-white p-4 rounded-xl shadow-md border-2 border-transparent hover:border-sky-300 cursor-pointer transition-all duration-200';
        card.innerHTML = `
            <div class="text-4xl mb-2">${dest.image || '🌍'}</div>
            <h4 class="font-bold text-lg">${dest.name}</h4>
            <p class="text-sm text-slate-600 mb-2">${dest.description}</p>
            <div class="flex justify-between items-center">
                <span class="text-xs bg-slate-100 px-2 py-1 rounded-full capitalize">${dest.type}</span>
                <span class="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full capitalize">${dest.budget}</span>
            </div>
            <button class="select-destination w-full mt-3 bg-sky-500 text-white py-2 px-4 rounded-lg hover:bg-sky-600 text-sm font-semibold" data-dest-id="${dest.id}">
                Select Destination
            </button>
        `;
        container.appendChild(card);
    });

    container.querySelectorAll('.select-destination').forEach(btn =>
        btn.addEventListener('click', e => selectDestination(parseInt(e.target.dataset.destId)))
    );

    document.getElementById('destination-section').classList.remove('hidden');
    }
    function selectDestination(destId) {
        // Find destination in either static data or LLM response data
        let destination = state.travelAssistant.destinations.find(d => d.id === destId);

        if (destination) {
            state.travelAssistant.currentTrip = {
                destination: destination,
                status: 'planning',
                startDate: null,
                endDate: null
            };
            addChatMessage('ai', `Great choice! I've selected ${destination.name} for your trip. Let me help you find accommodations and plan your transportation.`);
            document.getElementById('destination-section').classList.remove('hidden');
            document.getElementById('accommodation-section').classList.remove('hidden');
            renderAccommodations();
        }
    }

    function renderAccommodations() {
        const container = document.getElementById('accommodation-results');
        if (container) {
            container.innerHTML = '';
            state.travelAssistant.accommodations.forEach(acc => {
                const card = document.createElement('div');
                card.className = 'booking-card bg-white p-4 rounded-xl shadow-md border';
                card.innerHTML = `
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h4 class="font-bold">${acc.name}</h4>
                            <p class="text-sm text-slate-600">${acc.location}</p>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-sky-600">${acc.price}</p>
                            <div class="flex items-center">
                                <span class="text-yellow-500">★</span>
                                <span class="text-sm ml-1">${acc.rating}</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-1 mb-3">
                        ${acc.amenities.map(amenity => `<span class="text-xs bg-slate-100 px-2 py-1 rounded">${amenity}</span>`).join('')}
                    </div>
                    <button class="book-accommodation w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 text-sm font-semibold" data-acc-id="${acc.id}">
                        Book Now
                    </button>
                `;
                container.appendChild(card);
            });

            container.querySelectorAll('.book-accommodation').forEach(btn => {
                btn.addEventListener('click', e => {
                    const accId = parseInt(e.target.dataset.accId);
                    bookAccommodation(accId);
                });
            });
        }
    }

    function bookAccommodation(accId) {
        const accommodation = state.travelAssistant.accommodations.find(a => a.id === accId);
        if (accommodation) {
            // Check if booking URL is available
            if (accommodation.booking_url) {
                addChatMessage('ai', `Excellent choice! I'm redirecting you to book ${accommodation.name} at ${accommodation.price} per night. You can complete the booking securely on their website.`);
                // In a real implementation, this would open the booking URL
                // window.open(accommodation.booking_url, '_blank');
                addChatMessage('ai', `Once your accommodation is booked, I can help you plan transportation to ${accommodation.location}.`);
            } else {
                addChatMessage('ai', `Great! I've noted your interest in ${accommodation.name}. In a real implementation, this would redirect you to a booking site. Let me know when you're ready to proceed with transportation planning.`);
            }

            // Update trip status
            if (state.travelAssistant.currentTrip) {
                state.travelAssistant.currentTrip.accommodation = accommodation;
                state.travelAssistant.currentTrip.status = 'accommodation_selected';
            }

            // Show transportation section
            document.getElementById('transport-section').classList.remove('hidden');
            renderRoutes();
        }
    }

    function renderRoutes() {
        const container = document.getElementById('route-results');
        if (container) {
            container.innerHTML = '';
            state.travelAssistant.routes.forEach(route => {
                const card = document.createElement('div');
                card.className = 'bg-white p-4 rounded-xl shadow-md border';
                card.innerHTML = `
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h4 class="font-bold">${route.from} → ${route.to}</h4>
                            <p class="text-sm text-slate-600">${route.type} • ${route.duration}</p>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-emerald-600">${route.price}</p>
                            <p class="text-sm text-slate-500">${route.stops} stops</p>
                        </div>
                    </div>
                    <button class="book-route w-full bg-sky-500 text-white py-2 px-4 rounded-lg hover:bg-sky-600 text-sm font-semibold" data-route-id="${route.id}">
                        Book Transportation
                    </button>
                `;
                container.appendChild(card);
            });

            container.querySelectorAll('.book-route').forEach(btn => {
                btn.addEventListener('click', e => {
                    const routeId = parseInt(e.target.dataset.routeId);
                    bookRoute(routeId);
                });
            });
        }
    }

    function bookRoute(routeId) {
        const route = state.travelAssistant.routes.find(r => r.id === routeId);
        if (route) {
            // Check if booking URL is available
            if (route.booking_url) {
                addChatMessage('ai', `Perfect! I'm redirecting you to book your ${route.type.toLowerCase()} from ${route.from} to ${route.to} for ${route.price}. You can complete the booking securely on their website.`);
                // In a real implementation, this would open the booking URL
                // window.open(route.booking_url, '_blank');
                addChatMessage('ai', `Once your transportation is booked, I can generate a detailed itinerary and help with activity planning.`);
            } else {
                addChatMessage('ai', `Great choice! I've noted your selection of ${route.type.toLowerCase()} from ${route.from} to ${route.to}. In a real implementation, this would redirect you to a ticketing site.`);
            }

            // Update trip status
            if (state.travelAssistant.currentTrip) {
                state.travelAssistant.currentTrip.transportation = route;
                state.travelAssistant.currentTrip.status = 'transportation_selected';

                // Add to active journeys for tracking
                state.travelAssistant.activeJourneys.push({
                    id: Date.now(),
                    route: `${route.from} → ${route.to}`,
                    status: 'Booked',
                    delay: 0,
                    nextUpdate: new Date(Date.now() + 2 * 60 * 60 * 1000).toLocaleTimeString(),
                    transportType: `${route.type} ${route.from}${route.to}`,
                    departureTime: route.departure_time,
                    arrivalTime: route.arrival_time
                });
            }

            document.getElementById('itinerary-section').classList.remove('hidden');
            generateItinerary();
        }
    }

    // Helper function to merge LLM data with existing static data
    function mergeLLMData(type, llmData) {
        if (!Array.isArray(llmData)) return;

        switch (type) {
            case 'destinations':
                // Merge with existing destinations, avoiding duplicates by name
                llmData.forEach(newDest => {
                    const exists = state.travelAssistant.destinations.some(existing =>
                        existing.name.toLowerCase() === newDest.name.toLowerCase()
                    );
                    if (!exists) {
                        state.travelAssistant.destinations.push(newDest);
                    }
                });
                break;
            case 'accommodations':
                // Merge with existing accommodations
                llmData.forEach(newAcc => {
                    const exists = state.travelAssistant.accommodations.some(existing =>
                        existing.name.toLowerCase() === newAcc.name.toLowerCase()
                    );
                    if (!exists) {
                        state.travelAssistant.accommodations.push(newAcc);
                    }
                });
                break;
            case 'transportation':
                // Merge with existing routes
                llmData.forEach(newRoute => {
                    const exists = state.travelAssistant.routes.some(existing =>
                        existing.from === newRoute.from && existing.to === newRoute.to
                    );
                    if (!exists) {
                        state.travelAssistant.routes.push(newRoute);
                    }
                });
                break;
        }
    }

    function generateItinerary() {
        const duration = parseInt(document.getElementById('itinerary-duration').value);
        const itinerary = [];

        for (let day = 1; day <= duration; day++) {
            const dayPlan = {
                day: day,
                activities: [
                    { time: "09:00", activity: "Breakfast at hotel", type: "meal" },
                    { time: "10:00", activity: "Morning sightseeing", type: "attraction" },
                    { time: "13:00", activity: "Lunch break", type: "meal" },
                    { time: "14:00", activity: "Afternoon exploration", type: "attraction" },
                    { time: "19:00", activity: "Dinner and evening relaxation", type: "meal" }
                ]
            };
            itinerary.push(dayPlan);
        }

        state.travelAssistant.itinerary = itinerary;
        renderItinerary();
    }

    function renderItinerary() {
        const container = document.getElementById('itinerary-content');
        if (container) {
            container.innerHTML = '';
            state.travelAssistant.itinerary.forEach(day => {
                const dayEl = document.createElement('div');
                dayEl.className = 'bg-slate-50 p-4 rounded-lg';
                dayEl.innerHTML = `
                    <h4 class="font-bold text-lg mb-3">Day ${day.day}</h4>
                    <div class="space-y-2">
                        ${day.activities.map(activity => `
                            <div class="flex justify-between items-center py-2 border-b border-slate-200 last:border-b-0">
                                <div>
                                    <p class="font-medium">${activity.activity}</p>
                                    <p class="text-sm text-slate-500 capitalize">${activity.type}</p>
                                </div>
                                <span class="text-sm font-mono text-slate-600">${activity.time}</span>
                            </div>
                        `).join('')}
                    </div>
                `;
                container.appendChild(dayEl);
            });
        }
    }

    function renderJourneyTracking() {
        const statusContainer = document.getElementById('journey-status');
        const alertsContainer = document.getElementById('delay-alerts');

        if (statusContainer) {
            if (state.travelAssistant.activeJourneys.length > 0) {
                const journey = state.travelAssistant.activeJourneys[0]; // Show primary journey
                const statusColor = journey.status === 'On Time' ? 'emerald' : journey.status === 'Delayed' ? 'amber' : 'red';

                // Enhanced journey status display
                statusContainer.innerHTML = `
                    <div class="bg-white p-4 rounded-lg border">
                        <div class="flex justify-between items-center mb-3">
                            <div>
                                <p class="font-bold text-lg">${journey.route}</p>
                                <p class="text-sm text-slate-600">${journey.transportType}</p>
                                ${journey.departureTime ? `<p class="text-xs text-slate-500">Departure: ${journey.departureTime}</p>` : ''}
                                ${journey.arrivalTime ? `<p class="text-xs text-slate-500">Arrival: ${journey.arrivalTime}</p>` : ''}
                            </div>
                            <div class="text-right">
                                <span class="text-sm font-bold px-3 py-1 rounded-full bg-${statusColor}-100 text-${statusColor}-800">${journey.status}</span>
                                ${journey.delay > 0 ? `<p class="text-sm text-amber-600 mt-1">${journey.delay} min delay</p>` : ''}
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4 mb-3">
                            <div class="bg-slate-50 p-3 rounded">
                                <p class="text-xs text-slate-500">Current Status</p>
                                <p class="font-medium">${journey.status === 'On Time' ? '✅ Running on schedule' : journey.status === 'Delayed' ? '⏱️ Experiencing delays' : '❌ Significant disruption'}</p>
                            </div>
                            <div class="bg-slate-50 p-3 rounded">
                                <p class="text-xs text-slate-500">Next Update</p>
                                <p class="font-medium">${journey.nextUpdate}</p>
                            </div>
                        </div>

                        ${journey.status === 'Delayed' ? `
                            <div class="bg-amber-50 p-3 rounded border-l-4 border-amber-500">
                                <p class="text-sm font-medium text-amber-800">Alternative Options Available</p>
                                <p class="text-sm text-amber-700">Check below for alternative routes and delay mitigation suggestions.</p>
                            </div>
                        ` : ''}
                    </div>
                `;
            } else {
                statusContainer.innerHTML = `
                    <div class="bg-slate-50 p-4 rounded-lg text-center">
                        <p class="text-slate-500 mb-2">No active journey tracking</p>
                        <p class="text-sm text-slate-400">Book transportation in the Transportation tab to start tracking your journey</p>
                    </div>
                `;
            }
        }

        if (alertsContainer) {
            alertsContainer.innerHTML = '';

            if (state.travelAssistant.delayAlerts.length === 0) {
                alertsContainer.innerHTML = `
                    <div class="bg-slate-50 p-3 rounded-lg text-center">
                        <p class="text-sm text-slate-500">No current alerts</p>
                        <p class="text-xs text-slate-400">Delay notifications will appear here when issues are detected</p>
                    </div>
                `;
            } else {
                state.travelAssistant.delayAlerts.forEach(alert => {
                    const severityColor = alert.severity === 'low' ? 'sky' : alert.severity === 'medium' ? 'amber' : 'red';
                    const alertEl = document.createElement('div');
                    alertEl.className = `p-3 bg-${severityColor}-50 border-l-4 border-${severityColor}-500 rounded-lg`;
                    alertEl.innerHTML = `
                        <p class="text-sm font-medium text-slate-700">${alert.message}</p>
                        <div class="flex justify-between items-center mt-2">
                            <span class="text-xs text-slate-500">${alert.timestamp.toLocaleTimeString()}</span>
                            <div class="flex space-x-2">
                                <button class="text-xs bg-${severityColor}-500 text-white px-2 py-1 rounded hover:bg-${severityColor}-600" onclick="speakText('${alert.message.replace(/'/g, "\\'")}')">🔊 Speak</button>
                                ${alert.severity !== 'low' ? `<button class="text-xs bg-slate-500 text-white px-2 py-1 rounded hover:bg-slate-600" onclick="showAlternativeRoutes()">Find Alternatives</button>` : ''}
                            </div>
                        </div>
                    `;
                    alertsContainer.appendChild(alertEl);
                });
            }
        }
    }

    function showAlternativeRoutes() {
        const currentTrip = state.travelAssistant.currentTrip;
        if (!currentTrip?.transportation) {
            addChatMessage('ai', 'No transportation booked yet. Please book transportation first to see alternative options.');
            return;
        }

        addChatMessage('ai', 'Looking for alternative routes and transportation options...');

        // Simulate finding alternatives
        setTimeout(() => {
            const alternatives = [
                {
                    type: 'Train',
                    route: 'Alternative Route via Express',
                    duration: '2h 45m',
                    delay: 5,
                    price: '€65',
                    recommendation: 'Recommended - Only 5 min delay'
                },
                {
                    type: 'Bus',
                    route: 'Direct Bus Service',
                    duration: '3h 15m',
                    delay: 0,
                    price: '€45',
                    recommendation: 'Budget option - No delays'
                }
            ];

            let alternativesText = 'Here are some alternative options I found:\n\n';
            alternatives.forEach((alt, index) => {
                alternativesText += `${index + 1}. **${alt.type}**: ${alt.route}\n`;
                alternativesText += `   - Duration: ${alt.duration}\n`;
                alternativesText += `   - Delay: ${alt.delay} minutes\n`;
                alternativesText += `   - Price: ${alt.price}\n`;
                alternativesText += `   - ${alt.recommendation}\n\n`;
            });

            addChatMessage('ai', alternativesText);
        }, 1500);
    }

    function simulateDelayUpdate() {
        // Enhanced delay simulation with more realistic scenarios
        if (state.travelAssistant.activeJourneys.length > 0) {
            const journey = state.travelAssistant.activeJourneys[0];

            // More sophisticated delay probability based on transport type and time
            const baseDelayProbability = 0.15; // 15% base chance
            const delayMultiplier = journey.transportType.includes('Flight') ? 1.5 : 1.0;
            const delayProbability = baseDelayProbability * delayMultiplier;

            if (Math.random() < delayProbability) {
                const delayAmount = Math.floor(Math.random() * 45) + 5; // 5-50 minutes
                const severity = delayAmount < 15 ? 'low' : delayAmount < 30 ? 'medium' : 'high';

                journey.delay = delayAmount;
                journey.status = 'Delayed';

                // Create more detailed delay messages
                let delayMessage = `Your ${journey.transportType} is experiencing a ${delayAmount}-minute delay.`;
                if (delayAmount > 30) {
                    delayMessage += ' This is a significant delay that may affect your connections.';
                } else if (delayAmount < 15) {
                    delayMessage += ' This is a minor delay and shouldn\'t significantly impact your journey.';
                }

                const newAlert = {
                    id: state.travelAssistant.delayAlerts.length + 1,
                    message: delayMessage,
                    severity: severity,
                    timestamp: new Date(),
                    delayAmount: delayAmount,
                    transportType: journey.transportType
                };

                state.travelAssistant.delayAlerts.unshift(newAlert);

                // Keep only last 5 alerts
                if (state.travelAssistant.delayAlerts.length > 5) {
                    state.travelAssistant.delayAlerts = state.travelAssistant.delayAlerts.slice(0, 5);
                }

                renderJourneyTracking();

                // Send notification to chat
                let chatMessage = `I detect a ${delayAmount}-minute delay on your ${journey.transportType}.`;
                if (delayAmount > 20) {
                    chatMessage += ' I\'m looking for alternative routes to minimize the impact on your journey.';
                }

                addChatMessage('ai', chatMessage);

                // Suggest alternatives for significant delays
                if (delayAmount > 20) {
                    setTimeout(() => {
                        showAlternativeRoutes();
                    }, 2000);
                }
            } else {
                // Occasionally send positive updates
                if (Math.random() > 0.8) {
                    journey.status = 'On Time';
                    journey.delay = 0;
                    renderJourneyTracking();
                    // Don't spam the chat with "on time" messages
                }
            }
        }
    }

    // Start delay monitoring when tracking section is visible
    function startDelayMonitoring() {
        if (document.getElementById('tracking-section') && !document.getElementById('tracking-section').classList.contains('hidden')) {
            setInterval(simulateDelayUpdate, 10000); // Check every 10 seconds for demo
        }
    }

    // Speech-to-Text functionality
    let recognition = null;
    let isListening = false;

    function initSpeechRecognition() {
        // Check for speech recognition support in various browsers
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn('Speech recognition not supported in this browser');
            // Show visual indicator that voice input is not available
            const voiceBtn = document.getElementById('voice-input');
            if (voiceBtn) {
                voiceBtn.classList.add('opacity-50', 'cursor-not-allowed');
                voiceBtn.title = 'Speech recognition not supported in this browser';
            }
            return;
        }

        try {
            recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';
            recognition.maxAlternatives = 1;

            recognition.onstart = function() {
                isListening = true;
                updateVoiceButton();
            };

            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                const userInput = document.getElementById('user-input');
                if (userInput) {
                    userInput.value = transcript;
                }
                isListening = false;
                updateVoiceButton();

                // Automatically send the message after voice input
                setTimeout(() => {
                    const sendBtn = document.getElementById('send-message');
                    if (sendBtn) {
                        sendBtn.click();
                    }
                }, 500);
            };

            recognition.onerror = function(event) {
                console.error('Speech recognition error:', event.error);
                isListening = false;
                updateVoiceButton();

                // Show user-friendly error message
                if (event.error === 'not-allowed') {
                    console.warn('Microphone access denied by user');
                } else if (event.error === 'network') {
                    console.warn('Network error during speech recognition');
                }
            };

            recognition.onend = function() {
                isListening = false;
                updateVoiceButton();
            };
        } catch (error) {
            console.error('Failed to initialize speech recognition:', error);
        }
    }

    function startVoiceInput() {
        if (recognition && !isListening) {
            recognition.start();
        }
    }

    function updateVoiceButton() {
        const voiceBtn = document.getElementById('voice-input');
        const voiceIcon = document.getElementById('voice-icon');

        if (voiceBtn && voiceIcon) {
            if (isListening) {
                voiceBtn.classList.remove('bg-emerald-500', 'hover:bg-emerald-600');
                voiceBtn.classList.add('bg-red-500', 'hover:bg-red-600');
                voiceIcon.textContent = '⏹️';
            } else {
                voiceBtn.classList.remove('bg-red-500', 'hover:bg-red-600');
                voiceBtn.classList.add('bg-emerald-500', 'hover:bg-emerald-600');
                voiceIcon.textContent = 'Mic';
            }
        }
    }

    // Keep text-to-speech for AI responses
    function speakText(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.pitch = 1;
            utterance.volume = 0.8;
            speechSynthesis.speak(utterance);
        } else {
            console.warn('Text-to-speech not supported in this browser');
        }
    }

    // ========== LLM VALIDATION SYSTEM ==========
    function validateLLMResponse(response, originalPrompt, contextTab = null) {
        const issues = [];

        // Check if response is valid JSON
        if (typeof response === 'string') {
            try {
                response = JSON.parse(response);
            } catch (e) {
                issues.push('Response is not valid JSON');
                return { isValid: false, issues, repairedResponse: null };
            }
        }

        // Check required fields
        if (!response.type) {
            issues.push('Missing "type" field');
        }

        if (!response.content) {
            issues.push('Missing "content" field');
        }

        // Validate based on response type with enhanced validation
        switch (response.type) {
            case 'destinations':
                if (!response.data || !Array.isArray(response.data)) {
                    issues.push('Destinations type requires "data" array');
                } else {
                    response.data.forEach((dest, index) => {
                        const requiredFields = ['id', 'name', 'type', 'budget', 'description', 'image'];
                        requiredFields.forEach(field => {
                            if (!dest[field]) {
                                issues.push(`Destination ${index + 1} missing "${field}" field`);
                            }
                        });

                        // Enhanced validation for destination fields
                        if (dest.type && !['cultural', 'relaxation', 'adventure', 'food'].includes(dest.type)) {
                            issues.push(`Destination ${index + 1} has invalid type: ${dest.type}. Must be one of: cultural, relaxation, adventure, food`);
                        }

                        if (dest.budget && !['budget', 'mid-range', 'luxury'].includes(dest.budget)) {
                            issues.push(`Destination ${index + 1} has invalid budget: ${dest.budget}. Must be one of: budget, mid-range, luxury`);
                        }

                        if (dest.name && dest.name.length < 3) {
                            issues.push(`Destination ${index + 1} name too short: ${dest.name}`);
                        }

                        if (dest.description && dest.description.length < 10) {
                            issues.push(`Destination ${index + 1} description too short: ${dest.description}`);
                        }

                        if (dest.image && !dest.image.match(/^[\u{1F300}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u)) {
                            issues.push(`Destination ${index + 1} image should be an emoji: ${dest.image}`);
                        }
                    });

                    // Check for diversity in suggestions
                    if (response.data.length > 1) {
                        const types = response.data.map(d => d.type);
                        const uniqueTypes = [...new Set(types)];
                        if (uniqueTypes.length < 2 && response.data.length >= 3) {
                            issues.push('Destination suggestions should include diverse types for better options');
                        }
                    }
                }
                break;

            case 'accommodations':
                if (!response.data || !Array.isArray(response.data)) {
                    issues.push('Accommodations type requires "data" array');
                } else {
                    response.data.forEach((acc, index) => {
                        const requiredFields = ['id', 'name', 'location', 'price', 'rating', 'amenities'];
                        requiredFields.forEach(field => {
                            if (!acc[field]) {
                                issues.push(`Accommodation ${index + 1} missing "${field}" field`);
                            }
                        });

                        // Enhanced validation for accommodation fields
                        if (acc.rating && (typeof acc.rating !== 'number' || acc.rating < 0 || acc.rating > 5)) {
                            issues.push(`Accommodation ${index + 1} has invalid rating: ${acc.rating}. Must be a number between 0-5`);
                        }

                        if (acc.price && !acc.price.match(/^\€?\d+\/?night?$/i)) {
                            issues.push(`Accommodation ${index + 1} price format should include currency and amount: ${acc.price}`);
                        }

                        if (acc.amenities && (!Array.isArray(acc.amenities) || acc.amenities.length === 0)) {
                            issues.push(`Accommodation ${index + 1} must have at least one amenity`);
                        }

                        if (acc.name && acc.name.length < 3) {
                            issues.push(`Accommodation ${index + 1} name too short: ${acc.name}`);
                        }
                    });
                }
                break;

            case 'transportation':
                if (!response.data || !Array.isArray(response.data)) {
                    issues.push('Transportation type requires "data" array');
                } else {
                    response.data.forEach((route, index) => {
                        const requiredFields = ['id', 'from', 'to', 'duration', 'price', 'type', 'stops'];
                        requiredFields.forEach(field => {
                            if (!route[field]) {
                                issues.push(`Route ${index + 1} missing "${field}" field`);
                            }
                        });

                        // Enhanced validation for transportation fields
                        if (route.type && !['Flight', 'Train', 'Bus', 'Car'].includes(route.type)) {
                            issues.push(`Route ${index + 1} has invalid type: ${route.type}. Must be one of: Flight, Train, Bus, Car`);
                        }

                        if (route.duration && !route.duration.match(/^\d+h\s?\d+m?$/)) {
                            issues.push(`Route ${index + 1} duration format invalid: ${route.duration}. Expected format: 14h 30m`);
                        }

                        if (route.price && !route.price.match(/^\€?\d+$/)) {
                            issues.push(`Route ${index + 1} price format should include currency and amount: ${route.price}`);
                        }

                        if (route.stops && (typeof route.stops !== 'number' || route.stops < 0)) {
                            issues.push(`Route ${index + 1} stops must be a non-negative number: ${route.stops}`);
                        }
                    });
                }
                break;

            case 'itinerary':
                if (!response.data || !Array.isArray(response.data)) {
                    issues.push('Itinerary type requires "data" array');
                } else {
                    response.data.forEach((day, index) => {
                        if (!day.day || !day.activities) {
                            issues.push(`Day ${index + 1} missing required fields (day, activities)`);
                        }

                        if (day.day && (typeof day.day !== 'number' || day.day < 1)) {
                            issues.push(`Day ${index + 1} has invalid day number: ${day.day}`);
                        }

                        if (day.activities && !Array.isArray(day.activities)) {
                            issues.push(`Day ${index + 1} activities must be an array`);
                        }

                        if (day.activities && Array.isArray(day.activities)) {
                            day.activities.forEach((activity, actIndex) => {
                                if (!activity.time || !activity.activity || !activity.type) {
                                    issues.push(`Day ${index + 1}, Activity ${actIndex + 1} missing required fields`);
                                }

                                if (activity.type && !['meal', 'attraction', 'transport', 'activity'].includes(activity.type)) {
                                    issues.push(`Day ${index + 1}, Activity ${actIndex + 1} has invalid type: ${activity.type}`);
                                }

                                if (activity.time && !activity.time.match(/^\d{2}:\d{2}$/)) {
                                    issues.push(`Day ${index + 1}, Activity ${actIndex + 1} time format invalid: ${activity.time}`);
                                }
                            });
                        }
                    });

                    // Check for logical itinerary flow
                    if (response.data.length > 1) {
                        const hasMeals = response.data.some(day =>
                            day.activities.some(act => act.type === 'meal')
                        );
                        if (!hasMeals) {
                            issues.push('Itinerary should include meal times for realistic planning');
                        }
                    }
                }
                break;
        }
        // --- extra strictness: must be *only* JSON array ---
        if (typeof response === 'string') {
        response = response.trim();
        if (!response.startsWith('[') || !response.endsWith(']')) {
            issues.push('Response is not a JSON array');
        }
        }
        // Check relevance (enhanced contextual check)
        if (response.content && contextTab) {
            const content = response.content.toLowerCase();
            const prompt = originalPrompt.toLowerCase();

            // Context-specific keyword checks
            const contextKeywords = {
                destinations: ['destination', 'travel', 'location', 'place', 'city', 'country'],
                accommodations: ['hotel', 'accommodation', 'stay', 'room', 'amenities', 'price'],
                transportation: ['flight', 'train', 'bus', 'transport', 'route', 'duration'],
                itinerary: ['itinerary', 'schedule', 'plan', 'day', 'activity', 'time']
            };

            const keywords = contextKeywords[contextTab] || ['travel'];
            const hasContextKeywords = keywords.some(keyword => content.includes(keyword));

            if (!hasContextKeywords) {
                issues.push(`Response may not be relevant to ${contextTab} context`);
            }

            // Check if response matches the expected type for the tab
            if (contextTab === 'destinations' && response.type !== 'destinations' && response.type !== 'conversation') {
                issues.push(`Expected destinations or conversation type for ${contextTab} tab, got ${response.type}`);
            } else if (contextTab === 'accommodations' && response.type !== 'accommodations' && response.type !== 'conversation') {
                issues.push(`Expected accommodations or conversation type for ${contextTab} tab, got ${response.type}`);
            } else if (contextTab === 'transportation' && response.type !== 'transportation' && response.type !== 'conversation') {
                issues.push(`Expected transportation or conversation type for ${contextTab} tab, got ${response.type}`);
            } else if (contextTab === 'itinerary' && response.type !== 'itinerary' && response.type !== 'conversation') {
                issues.push(`Expected itinerary or conversation type for ${contextTab} tab, got ${response.type}`);
            }
        }

        return {
            isValid: issues.length === 0,
            issues,
            repairedResponse: null
        };
    }

    async function repairLLMResponse(invalidResponse, issues, originalPrompt) {
        const repairPrompt = `
The previous LLM response has validation issues that need to be fixed:

ISSUES FOUND:
${issues.join('\n')}

ORIGINAL PROMPT:
${originalPrompt}

PREVIOUS RESPONSE:
${typeof invalidResponse === 'string' ? invalidResponse : JSON.stringify(invalidResponse, null, 2)}

Please provide a corrected response that addresses all the issues listed above. Ensure the response follows the exact same format requirements as specified in the original prompt. Fix any missing fields, incorrect data types, or formatting problems.

Respond with ONLY the corrected JSON object, no additional text or explanations.
`;

        try {
            const res = await fetch('https://api.llm7.io/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini-2024-07-18',
                    messages: [{ role: 'user', content: repairPrompt }],
                    temperature: 0.3, // Lower temperature for more consistent repairs
                    max_tokens: 2000
                })
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            const responseText = data.choices[0]?.message?.content?.trim() || 'No response';

            try {
                return JSON.parse(responseText);
            } catch (parseError) {
                console.error('Failed to parse repaired response:', parseError);
                return null;
            }
        } catch (err) {
            console.error('Repair LLM error:', err);
            return null;
        }
    }

    // ========== TAB CONTEXT FUNCTIONS ==========
    function getCurrentActiveTab() {
        const activeTabButton = document.querySelector('.tab-button.active');
        return activeTabButton ? activeTabButton.dataset.tab : null;
    }

    // ========== LOADING STATE MANAGEMENT ==========
    function showLLMLoading(status = 'Thinking...') {
        const loadingContainer = document.getElementById('llm-loading');
        const statusElement = document.getElementById('loading-status');

        if (loadingContainer && statusElement) {
            statusElement.textContent = status;
            statusElement.className = 'loading-text';

            if (status.toLowerCase().includes('validating')) {
                statusElement.className = 'validating-text';
            } else if (status.toLowerCase().includes('repairing')) {
                statusElement.className = 'repairing-text';
            } else if (status.toLowerCase().includes('error') || status.toLowerCase().includes('failed')) {
                statusElement.className = 'text-red-500';
            }

            loadingContainer.classList.remove('hidden');
        }
    }

    function hideLLMLoading() {
        const loadingContainer = document.getElementById('llm-loading');
        if (loadingContainer) {
            loadingContainer.classList.add('hidden');
        }
    }

    // Enhanced loading function with context-aware messages
    function showContextualLoading(tabName, action = 'searching') {
        const loadingMessages = {
            destinations: {
                searching: 'Finding perfect destinations...',
                validating: 'Checking destination options...',
                repairing: 'Refining destination suggestions...'
            },
            accommodations: {
                searching: 'Looking for great places to stay...',
                validating: 'Verifying accommodation details...',
                repairing: 'Improving hotel recommendations...'
            },
            transportation: {
                searching: 'Finding the best travel routes...',
                validating: 'Checking transportation options...',
                repairing: 'Optimizing travel suggestions...'
            },
            itinerary: {
                searching: 'Creating your personalized itinerary...',
                validating: 'Reviewing daily plans...',
                repairing: 'Perfecting your schedule...'
            }
        };

        const message = loadingMessages[tabName]?.[action] || `Working on ${tabName}...`;
        showLLMLoading(message);
    }
    async function queryLLM(prompt) {
    try {
        const res = await fetch('https://api.llm7.io/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '   // ← pusty, ale wymagany przez API
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini-2024-07-18',
            messages: [{ role: 'user', content: prompt }]
        })
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return data.choices[0]?.message?.content?.trim() || 'No response';
    } catch (err) {
        console.error('LLM7 error:', err);
        return 'Sorry, I could not reach the AI service right now.';
    }
    }

    // ========== ENHANCED LLM INTEGRATION WITH VALIDATION ==========
    async function queryLLMWithValidation(prompt, maxRetries = 2, contextTab = null) {
        let attempts = 0;
        let lastResponse = null;

        // Get current active tab if not provided
        const activeTab = contextTab || getCurrentActiveTab();

        // Show initial loading state with context
        showContextualLoading(activeTab, 'searching');

        while (attempts <= maxRetries) {
            try {
                // Get current context for better prompting
                const currentTrip = state.travelAssistant.currentTrip;
                const contextualInfo = getContextualInfo(activeTab);

                // Enhanced prompt with strict formatting instructions and context
                const structuredPrompt = `
        You are an AI Travel Assistant for the Odyssey life navigation RPG app. You must respond in a specific JSON format that the application can parse and display properly.

        CURRENT CONTEXT:
        - Active Tab: ${activeTab || 'general'}
        - Selected Destination: ${currentTrip?.destination?.name || 'None'}
        - User Preferences: ${JSON.stringify(state.travelAssistant.preferences)}
        - Current Trip Status: ${currentTrip ? 'Destination selected' : 'No destination selected'}

        ${contextualInfo}

        IMPORTANT FORMATTING RULES:
        1. ALWAYS respond with valid JSON
        2. Structure your response based on the user's intent and current tab:
            - For general conversation: use "conversation" type
            - For destination suggestions: use "destinations" type
            - For accommodation searches: use "accommodations" type
            - For transportation planning: use "transportation" type
            - For itinerary generation: use "itinerary" type

        RESPONSE FORMAT:
        {
          "type": "conversation|destinations|accommodations|transportation|itinerary",
          "content": "Your main response text that will be shown in chat",
          "data": {
            // Structured data based on type - populate this based on current tab context
            // For destinations: array of destination objects
            // For accommodations: array of accommodation objects
            // For transportation: array of route objects
            // For itinerary: array of day objects
          },
          "actions": [
            // Optional: suggested actions for the UI
            {"type": "show_destinations", "label": "Show Destinations"},
            {"type": "show_accommodations", "label": "Find Hotels"},
            {"type": "show_transportation", "label": "Plan Journey"},
            {"type": "show_itinerary", "label": "Create Itinerary"}
          ],
          "needs_more_info": false,
          "missing_info": [],
          "approval_required": false,
          "approval_message": ""
        }

        DESTINATION OBJECT FORMAT:
        {
          "id": number,
          "name": "string (City, Country)",
          "type": "cultural|relaxation|adventure|food",
          "budget": "budget|mid-range|luxury",
          "description": "string (detailed description)",
          "image": "emoji",
          "attractions": ["string"],
          "best_time_to_visit": "string"
        }

        ACCOMMODATION OBJECT FORMAT:
        {
          "id": number,
          "name": "string (Hotel/Resort name)",
          "location": "string (City, Country)",
          "price": "string (€XXX/night)",
          "rating": number (3.5-5.0),
          "amenities": ["string"],
          "image": "emoji",
          "booking_url": "string",
          "distance_from_center": "string",
          "description": "string"
        }

        TRANSPORTATION OBJECT FORMAT:
        {
          "id": number,
          "from": "string (Departure city)",
          "to": "string (Destination city)",
          "duration": "string (format: 14h 30m)",
          "price": "string (€XXX)",
          "type": "Flight|Train|Bus|Car",
          "stops": number (0 for direct),
          "departure_time": "string (HH:MM)",
          "arrival_time": "string (HH:MM)",
          "booking_url": "string",
          "carbon_footprint": "string"
        }

        ITINERARY OBJECT FORMAT:
        [
          {
            "day": number,
            "date": "string (YYYY-MM-DD)",
            "activities": [
              {
                "time": "string (HH:MM)",
                "activity": "string (specific activity)",
                "type": "meal|attraction|transport|activity|shopping|entertainment",
                "location": "string",
                "duration": "string (1h 30m)",
                "cost": "string (€XX)",
                "description": "string",
                "transport_needed": boolean,
                "transport_details": "string"
              }
            ],
            "daily_budget": "string (€XXX)",
            "transport_summary": "string"
          }
        ]

        USER PROMPT: ${prompt}

        ADDITIONAL INSTRUCTIONS:
        - If you need more specific information to provide accurate suggestions, set "needs_more_info": true and list missing information in "missing_info" array
        - For itinerary planning, set "approval_required": true if the plan needs user confirmation before booking
        - Always tailor suggestions to the current context and selected destination
        - Ensure all suggestions are realistic and bookable options
        - Include specific details like booking URLs, times, and costs where possible
        - For ${activeTab || 'general'} tab, focus on providing relevant ${activeTab || 'travel'} assistance
        - If suggesting complex travel plans, ask for approval before proceeding with bookings

        Respond with ONLY the JSON object, no additional text or markdown formatting.
        `;

                const res = await fetch('https://api.llm7.io/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '   // ← TODO: Replace with actual API key
                    },
                    body: JSON.stringify({
                        model: 'gpt-4o-mini-2024-07-18', // lub deepseek-v3, llama-3.3-70b itd.
                        messages: [{ role: 'user', content: structuredPrompt }],
                        temperature: 0.7,
                        max_tokens: 2000
                    })
                });

                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                const responseText = data.choices[0]?.message?.content?.trim() || 'No response';

                // Try to parse the JSON response
                try {
                    lastResponse = JSON.parse(responseText);
                } catch (parseError) {
                    console.error('Failed to parse LLM response as JSON:', parseError);
                    lastResponse = responseText;
                }

                // Check if AI needs more information
                if (lastResponse && lastResponse.needs_more_info) {
                    hideLLMLoading();
                    const missingInfo = lastResponse.missing_info || [];
                    if (missingInfo.length > 0) {
                        const contextualPrompts = {
                            destinations: `To suggest better destinations, I need: ${missingInfo.join(', ')}. For example, your preferred budget range and travel style would help me find perfect matches.`,
                            accommodations: `To find the best accommodations, I need: ${missingInfo.join(', ')}. Please let me know your preferences so I can suggest suitable options.`,
                            transportation: `To plan your transportation, I need: ${missingInfo.join(', ')}. This will help me find the most convenient and cost-effective travel options.`,
                            itinerary: `To create a personalized itinerary, I need: ${missingInfo.join(', ')}. More details will help me craft a perfect daily schedule for your trip.`
                        };

                        const contextualMessage = contextualPrompts[activeTab] ||
                            `I need more details to help you better: ${missingInfo.join(', ')}. Could you provide more information about your preferences?`;

                        addChatMessage('ai', contextualMessage);
                        return null;
                    }
                }

                // Validate the response with context
                showLLMLoading(`Validating ${contextTab} response...`);
                const validation = validateLLMResponse(lastResponse, prompt, contextTab);

                if (validation.isValid) {
                    hideLLMLoading();
                    return lastResponse;
                } else {
                    console.warn('Response validation failed:', validation.issues);

                    // If we have attempts left, try to repair
                    if (attempts < maxRetries) {
                        console.log(`Attempting to repair response (attempt ${attempts + 1}/${maxRetries})`);
                        showLLMLoading(`Repairing ${contextTab} response (attempt ${attempts + 1}/${maxRetries})...`);
                        const repairedResponse = await repairLLMResponse(lastResponse, validation.issues, prompt, contextTab);

                        if (repairedResponse) {
                            showLLMLoading(`Validating repaired ${contextTab} response...`);
                            const repairValidation = validateLLMResponse(repairedResponse, prompt, contextTab);
                            if (repairValidation.isValid) {
                                console.log('Response successfully repaired');
                                hideLLMLoading();
                                return repairedResponse;
                            }
                        }
                    }

                    attempts++;

                    // Wait a bit before retrying
                    if (attempts <= maxRetries) {
                        showLLMLoading(`Retrying ${contextTab}... (attempt ${attempts}/${maxRetries})`);
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                }
            } catch (err) {
                console.error('LLM error:', err);
                attempts++;

                if (attempts <= maxRetries) {
                    showLLMLoading(`Retrying... (attempt ${attempts}/${maxRetries})`);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } else {
                    // All attempts failed, use fallback
                    hideLLMLoading();
                    console.error('All LLM attempts failed, using fallback');
                    return getContextualFallback(contextTab);
                }
            }
        }

        // If all attempts failed, return a contextual fallback response
        console.error('All LLM attempts failed, using contextual fallback');
        hideLLMLoading();
        return getContextualFallback(contextTab);
    }

    function getContextualInfo(currentTab) {
         const currentTrip = state.travelAssistant.currentTrip;
         const preferences = state.travelAssistant.preferences;

         switch (currentTab) {
             case 'destinations':
                 return `
                 CONTEXT FOR DESTINATION SUGGESTIONS:
                 - User wants destination recommendations
                 - Budget preference: ${preferences.budget}
                 - Travel style preference: ${preferences.style}
                 - If no preferences set, ask for budget and travel style preferences
                 - Suggest 3-4 diverse destinations that match preferences
                 - Include popular attractions and best time to visit
                 - Consider current season and travel trends
                 - Provide realistic budget estimates and travel requirements
                 `;

             case 'accommodations':
                 if (!currentTrip?.destination) {
                     return `
                     CONTEXT FOR ACCOMMODATION SEARCH:
                     - No destination selected yet
                     - Ask user to select a destination first before searching accommodations
                     - Once destination is selected, suggest accommodations based on budget preference
                     - Include location details and booking information
                     `;
                 }
                 return `
                 CONTEXT FOR ACCOMMODATION SUGGESTIONS:
                 - Destination: ${currentTrip.destination.name}
                 - Budget preference: ${preferences.budget}
                 - Travel style: ${preferences.style}
                 - Suggest 3-4 accommodations in ${currentTrip.destination.name}
                 - Price should match budget: ${preferences.budget}
                 - Include amenities relevant to the destination and travel style
                 - Provide booking URLs and distance from city center
                 - Include guest ratings and reviews summary
                 - Consider location convenience for planned activities
                 `;

             case 'transportation':
                 if (!currentTrip?.destination) {
                     return `
                     CONTEXT FOR TRANSPORTATION PLANNING:
                     - No destination selected yet
                     - Ask user to select a destination first before planning transportation
                     - Once destination is selected, suggest routes from major hubs
                     - Include departure location options
                     `;
                 }
                 return `
                 CONTEXT FOR TRANSPORTATION SUGGESTIONS:
                 - Destination: ${currentTrip.destination.name}
                 - Assume departure from major hub (customizable)
                 - Budget preference: ${preferences.budget}
                 - Suggest 3-4 transportation options to ${currentTrip.destination.name}
                 - Include different transportation types (flight, train, bus, car)
                 - Provide realistic durations, prices, and schedules
                 - Include booking URLs and carbon footprint estimates
                 - Consider layovers, connections, and travel time
                 - Factor in current travel restrictions and requirements
                 `;

             case 'itinerary':
                 if (!currentTrip?.destination) {
                     return `
                     CONTEXT FOR ITINERARY GENERATION:
                     - No destination selected yet
                     - Ask user to select a destination first before generating itinerary
                     - Once destination is selected, create personalized daily plans
                     - Include transportation arrangements and directions
                     `;
                 }
                 return `
                 CONTEXT FOR ITINERARY GENERATION:
                 - Destination: ${currentTrip.destination.name}
                 - Travel style: ${preferences.style}
                 - Budget: ${preferences.budget}
                 - Create realistic daily itinerary for ${currentTrip.destination.name}
                 - Include meal times, attractions, and activities
                 - Consider the destination's main attractions and culture
                 - Make it personalized and achievable based on travel style
                 - Include transportation between locations
                 - Provide cost estimates and booking information
                 - Structure as hourly schedule with specific locations
                 - Include rest periods and realistic pacing
                 - Set approval_required to true for complex itineraries
                 `;

             case 'tracking':
                 return `
                 CONTEXT FOR JOURNEY TRACKING:
                 - Provide real-time updates on active journeys
                 - Include delay notifications and alternative suggestions
                 - Show transport status and next update times
                 - Provide alternative route options if delays occur
                 - Include emergency contact and support information
                 `;

             default:
                 return `
                 CONTEXT FOR GENERAL TRAVEL ASSISTANCE:
                 - Provide helpful travel-related responses
                 - If asking about destinations, accommodations, transportation, or itineraries, guide them to use the appropriate tab
                 - Be conversational but helpful
                 - Ask clarifying questions for vague requests
                 - Offer to help with specific travel planning tasks
                 `;
         }
     }

    function createContextualPrompt(message, currentTab, currentTrip) {
        const preferences = state.travelAssistant.preferences;
        const basePrompt = `User message: "${message}"\n\n`;

        // Analyze message content for keywords
        const messageLower = message.toLowerCase();
        const isDestinationQuery = messageLower.includes('destination') || messageLower.includes('travel') || messageLower.includes('vacation') || messageLower.includes('trip');
        const isAccommodationQuery = messageLower.includes('hotel') || messageLower.includes('accommodation') || messageLower.includes('stay') || messageLower.includes('place to stay');
        const isTransportationQuery = messageLower.includes('flight') || messageLower.includes('transport') || messageLower.includes('travel') || messageLower.includes('get there');
        const isItineraryQuery = messageLower.includes('itinerary') || messageLower.includes('schedule') || messageLower.includes('plan') || messageLower.includes('activities');

        // Determine the appropriate response type based on context and message content
        let responseType = 'conversation';
        if (currentTab === 'destinations' || (isDestinationQuery && !currentTab)) {
            responseType = 'destinations';
        } else if (currentTab === 'accommodations' || (isAccommodationQuery && currentTrip?.destination)) {
            responseType = 'accommodations';
        } else if (currentTab === 'transportation' || (isTransportationQuery && currentTrip?.destination)) {
            responseType = 'transportation';
        } else if (currentTab === 'itinerary' || (isItineraryQuery && currentTrip?.destination)) {
            responseType = 'itinerary';
        }

        // Create specific prompts based on detected intent
        switch (responseType) {
            case 'destinations':
                return basePrompt + `
                The user is asking about destinations. Based on their preferences (budget: ${preferences.budget}, style: ${preferences.style}) and message content, suggest appropriate destinations.
                Respond with destinations type JSON.`;

            case 'accommodations':
                return basePrompt + `
                The user is asking about accommodations in ${currentTrip?.destination?.name || 'their selected destination'}.
                Consider their budget preference: ${preferences.budget}.
                Respond with accommodations type JSON.`;

            case 'transportation':
                return basePrompt + `
                The user is asking about transportation to ${currentTrip?.destination?.name || 'their destination'}.
                Consider their budget preference: ${preferences.budget}.
                Respond with transportation type JSON.`;

            case 'itinerary':
                return basePrompt + `
                The user is asking about itinerary planning for ${currentTrip?.destination?.name || 'their destination'}.
                Consider their travel style: ${preferences.style}.
                Respond with itinerary type JSON.`;

            default:
                return basePrompt + `
                The user sent a general message. Provide a helpful conversational response.
                If they're asking about travel planning, guide them to use the appropriate tab or ask clarifying questions.
                Respond with conversation type JSON.`;
        }
    }

    // ========== SCRAPER INTEGRATION FOR REAL-TIME DATA ==========
    async function fetchRealTimeTransportData(from, to) {
        // Mock scraper integration - in a real app, this would call actual transport APIs
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock real-time data
            const mockData = {
                routes: [
                    {
                        id: Date.now() + 1,
                        from: from,
                        to: to,
                        duration: `${Math.floor(Math.random() * 10) + 10}h ${Math.floor(Math.random() * 60)}m`,
                        price: `€${Math.floor(Math.random() * 200) + 300}`,
                        type: 'Flight',
                        stops: 0,
                        departure_time: `${Math.floor(Math.random() * 12) + 6}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
                        arrival_time: `${Math.floor(Math.random() * 12) + 14}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
                        booking_url: `https://airline.com/booking?from=${from}&to=${to}`,
                        carbon_footprint: `Flight: ${Math.floor(Math.random() * 300) + 400}kg CO2`,
                        real_time_status: Math.random() > 0.7 ? 'Delayed' : 'On Time',
                        delay_minutes: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 5 : 0
                    },
                    {
                        id: Date.now() + 2,
                        from: from,
                        to: to,
                        duration: `${Math.floor(Math.random() * 8) + 12}h ${Math.floor(Math.random() * 60)}m`,
                        price: `€${Math.floor(Math.random() * 150) + 200}`,
                        type: 'Train',
                        stops: Math.floor(Math.random() * 3),
                        departure_time: `${Math.floor(Math.random() * 8) + 8}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
                        arrival_time: `${Math.floor(Math.random() * 12) + 16}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
                        booking_url: `https://train.com/booking?from=${from}&to=${to}`,
                        carbon_footprint: `Train: ${Math.floor(Math.random() * 100) + 50}kg CO2`,
                        real_time_status: 'On Time',
                        delay_minutes: 0
                    }
                ],
                last_updated: new Date().toISOString(),
                source: 'Real-time Transport APIs (Mock Data)'
            };

            return mockData;
        } catch (error) {
            console.error('Error fetching real-time transport data:', error);
            return null;
        }
    }

    async function fetchRealTimeAccommodationData(location, budget) {
        // Mock scraper integration for accommodation data
        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            const budgetMultipliers = {
                'budget': 1,
                'mid-range': 1.5,
                'luxury': 2.5
            };

            const multiplier = budgetMultipliers[budget] || 1.5;
            const basePrice = Math.floor(Math.random() * 100) + 50;

            const mockData = {
                accommodations: [
                    {
                        id: Date.now() + 1,
                        name: `Premium Hotel & Spa`,
                        location: location,
                        price: `€${Math.floor(basePrice * multiplier)}/night`,
                        rating: Math.round((4 + Math.random()) * 10) / 10,
                        amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Room Service'],
                        image: '🏨',
                        booking_url: `https://booking.com/hotel?location=${location}`,
                        distance_from_center: `${Math.floor(Math.random() * 3) + 0.5} km from city center`,
                        description: `Comfortable hotel in the heart of ${location} with excellent amenities and service.`,
                        real_time_availability: Math.random() > 0.3,
                        availability_status: Math.random() > 0.3 ? 'Available' : 'Limited Availability'
                    },
                    {
                        id: Date.now() + 2,
                        name: `Boutique Guesthouse`,
                        location: location,
                        price: `€${Math.floor(basePrice * 0.8 * multiplier)}/night`,
                        rating: Math.round((3.8 + Math.random() * 0.4) * 10) / 10,
                        amenities: ['WiFi', 'Breakfast', 'Garden'],
                        image: '🏘️',
                        booking_url: `https://booking.com/hotel?location=${location}`,
                        distance_from_center: `${Math.floor(Math.random() * 5) + 1} km from city center`,
                        description: `Charming guesthouse with personalized service and local charm.`,
                        real_time_availability: Math.random() > 0.2,
                        availability_status: Math.random() > 0.2 ? 'Available' : 'Limited Availability'
                    }
                ],
                last_updated: new Date().toISOString(),
                source: 'Real-time Booking APIs (Mock Data)'
            };

            return mockData;
        } catch (error) {
            console.error('Error fetching real-time accommodation data:', error);
            return null;
        }
    }

    function getContextualFallback(contextTab) {
        const currentTrip = state.travelAssistant.currentTrip;

        switch (contextTab) {
            case 'destinations':
                return {
                    type: 'conversation',
                    content: 'I can help you find amazing destinations! Please tell me your budget preference (budget, mid-range, or luxury) and travel style (relaxation, adventure, cultural, or food).',
                    data: {},
                    actions: [
                        {type: 'show_destinations', label: 'Browse Destinations'},
                        {type: 'set_preferences', label: 'Set Preferences'}
                    ],
                    needs_more_info: true,
                    missing_info: ['budget_preference', 'travel_style']
                };

            case 'accommodations':
                if (!currentTrip?.destination) {
                    return {
                        type: 'conversation',
                        content: 'I\'d love to help you find accommodations! First, please select a destination using the Destinations tab, then I can suggest hotels and places to stay.',
                        data: {},
                        actions: [
                            {type: 'show_destinations', label: 'Select Destination First'}
                        ],
                        needs_more_info: true,
                        missing_info: ['selected_destination']
                    };
                }
                return {
                    type: 'accommodations',
                    content: `Here are some accommodation options in ${currentTrip.destination.name}.`,
                    data: state.travelAssistant.accommodations.filter(acc =>
                        acc.location.includes(currentTrip.destination.name.split(',')[0])
                    ).slice(0, 3)
                };

            case 'transportation':
                if (!currentTrip?.destination) {
                    return {
                        type: 'conversation',
                        content: 'I can help you plan your transportation! Please select a destination first using the Destinations tab, then I\'ll find the best ways to get there.',
                        data: {},
                        actions: [
                            {type: 'show_destinations', label: 'Select Destination First'}
                        ],
                        needs_more_info: true,
                        missing_info: ['selected_destination']
                    };
                }
                return {
                    type: 'transportation',
                    content: `Here are transportation options to ${currentTrip.destination.name}.`,
                    data: state.travelAssistant.routes.filter(route =>
                        route.to.includes(currentTrip.destination.name.split(',')[0])
                    ).slice(0, 3)
                };

            case 'itinerary':
                if (!currentTrip?.destination) {
                    return {
                        type: 'conversation',
                        content: 'I can create a personalized itinerary for you! First, please select a destination using the Destinations tab, then I\'ll plan your daily activities.',
                        data: {},
                        actions: [
                            {type: 'show_destinations', label: 'Select Destination First'}
                        ],
                        needs_more_info: true,
                        missing_info: ['selected_destination']
                    };
                }
                return {
                    type: 'itinerary',
                    content: `Here's a suggested itinerary for your trip to ${currentTrip.destination.name}.`,
                    data: generateBasicItinerary(3)
                };

            default:
                return {
                    type: 'conversation',
                    content: 'I\'m here to help with your travel planning! You can use the tabs above to explore destinations, find accommodations, plan transportation, or create itineraries. What would you like to do?',
                    data: {},
                    actions: [
                        {type: 'show_destinations', label: 'Browse Destinations'},
                        {type: 'show_accommodations', label: 'Find Hotels'},
                        {type: 'show_transportation', label: 'Plan Journey'},
                        {type: 'show_itinerary', label: 'Create Itinerary'}
                    ]
                };
        }
    }


    // Event listeners for travel assistant
    const sendMessageBtn = document.getElementById('send-message');
    const userInput = document.getElementById('user-input');
    const voiceInputBtn = document.getElementById('voice-input');
    const suggestDestinationBtn = document.getElementById('suggest-destination');
    const searchAccommodationsBtn = document.getElementById('search-accommodations');
    const searchRoutesBtn = document.getElementById('search-routes');
    const generateItineraryBtn = document.getElementById('generate-itinerary');

    if (sendMessageBtn && userInput) {
        sendMessageBtn.addEventListener('click', async () => {
            const message = userInput.value.trim();
            if (!message) return;

            addChatMessage('user', message);

            try {
                // Analyze the message to determine intent and context
                const currentTab = getCurrentActiveTab();
                const currentTrip = state.travelAssistant.currentTrip;

                // Create contextual prompt based on current tab and message content
                const contextualPrompt = createContextualPrompt(message, currentTab, currentTrip);

                const response = await queryLLMWithValidation(contextualPrompt, 2, currentTab);
                if (response) {
                    await handleStructuredResponse(response);
                } else {
                    // Fallback for when LLM fails
                    addChatMessage('ai', 'I\'m having trouble understanding your request. Could you be more specific about what you\'re looking for?');
                }
            } catch (error) {
                console.error('Chat error:', error);
                addChatMessage('ai', 'Sorry, I encountered an error. Please try again.');
            }

            userInput.value = '';
        });

        userInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                sendMessageBtn.click();
            }
        });
    }

    // Handle structured AI responses
    async function handleStructuredResponse(response) {
        try {
            // Handle original simple format (just destinations array as string)
            if (typeof response === 'string' && response.trim().startsWith('[') && response.trim().endsWith(']')) {
                try {
                    const destinations = JSON.parse(response);
                    if (Array.isArray(destinations) && destinations.length > 0) {
                        destinations.forEach((d,i)=>d.id=Date.now()+i);
                        mergeLLMData('destinations', destinations);
                        displayDestinationsInTab(destinations);
                        addChatMessage('ai', 'Here are my destination suggestions!');
                        return;
                    }
                } catch (e) {
                    console.warn('Failed to parse destinations array:', e);
                }
            }

            let parsedResponse = response;

            // Try to parse if it's a string (enhanced format)
            if (typeof response === 'string') {
                try {
                    parsedResponse = JSON.parse(response);
                } catch (e) {
                    // If it's not JSON, treat as conversation
                    addChatMessage('ai', response);
                    return;
                }
            }

            // Handle enhanced response format
            if (parsedResponse.type === 'conversation') {
                addChatMessage('ai', parsedResponse.content);

                // Handle suggested actions
                if (parsedResponse.actions && parsedResponse.actions.length > 0) {
                    handleSuggestedActions(parsedResponse.actions);
                }

                // Handle needs more info
                if (parsedResponse.needs_more_info) {
                    const missingInfo = parsedResponse.missing_info || [];
                    if (missingInfo.length > 0) {
                        addChatMessage('ai', `I need more details to help you better: ${missingInfo.join(', ')}. Could you provide more information?`);
                    }
                }
            } else if (parsedResponse.type === 'destinations' && parsedResponse.data) {
                const destinations = Array.isArray(parsedResponse.data) ? parsedResponse.data : [parsedResponse.data];
                if (destinations.length > 0) {
                    destinations.forEach((d,i)=>d.id=Date.now()+i);
                    mergeLLMData('destinations', destinations);
                    displayDestinationsInTab(destinations);
                    addChatMessage('ai', parsedResponse.content || 'Here are my destination suggestions!');
                }
            } else if (parsedResponse.type === 'accommodations' && parsedResponse.data) {
                const accommodations = Array.isArray(parsedResponse.data) ? parsedResponse.data : [parsedResponse.data];
                if (accommodations.length > 0) {
                    accommodations.forEach((a,i)=>a.id=Date.now()+i);
                    mergeLLMData('accommodations', accommodations);
                    displayAccommodationsInTab(accommodations);
                    addChatMessage('ai', parsedResponse.content || 'Here are my accommodation suggestions!');
                }
            } else if (parsedResponse.type === 'transportation' && parsedResponse.data) {
                const routes = Array.isArray(parsedResponse.data) ? parsedResponse.data : [parsedResponse.data];
                if (routes.length > 0) {
                    routes.forEach((r,i)=>r.id=Date.now()+i);
                    mergeLLMData('transportation', routes);
                    displayTransportationInTab(routes);
                    addChatMessage('ai', parsedResponse.content || 'Here are my transportation suggestions!');
                }
            } else if (parsedResponse.type === 'itinerary' && parsedResponse.data) {
                const itinerary = Array.isArray(parsedResponse.data) ? parsedResponse.data : [parsedResponse.data];
                if (itinerary.length > 0) {
                    displayItineraryInTab(itinerary);
                    addChatMessage('ai', parsedResponse.content || 'Here\'s your personalized itinerary!');
                }
            } else {
                // Fallback for unknown response types or plain text
                const content = parsedResponse.content || parsedResponse;
                addChatMessage('ai', typeof content === 'string' ? content : 'I received your request but couldn\'t process it properly. Could you try rephrasing?');
            }
        } catch (error) {
            console.error('Error handling structured response:', error);
            addChatMessage('ai', 'I encountered an error processing your request. Could you try again?');
        }
    }

    function displayStructuredDestinations(destinations) {
        const container = document.getElementById('destination-cards');
        if (container) {
            container.innerHTML = '';

            destinations.forEach(dest => {
                const card = document.createElement('div');
                card.className = 'bg-white p-4 rounded-xl shadow-md border-2 border-transparent hover:border-sky-300 cursor-pointer transition-all duration-200';
                card.innerHTML = `
                    <div class="text-4xl mb-2">${dest.image || '🌍'}</div>
                    <h4 class="font-bold text-lg">${dest.name}</h4>
                    <p class="text-sm text-slate-600 mb-2">${dest.description}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-xs bg-slate-100 px-2 py-1 rounded-full capitalize">${dest.type}</span>
                        <span class="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full capitalize">${dest.budget}</span>
                    </div>
                    <button class="select-destination w-full mt-3 bg-sky-500 text-white py-2 px-4 rounded-lg hover:bg-sky-600 text-sm font-semibold" data-dest-id="${dest.id}">
                        Select Destination
                    </button>
                `;
                container.appendChild(card);
            });

            // Re-add event listeners
            container.querySelectorAll('.select-destination').forEach(btn => {
                btn.addEventListener('click', e => {
                    const destId = parseInt(e.target.dataset.destId);
                    selectDestination(destId);
                });
            });

            document.getElementById('destination-section').classList.remove('hidden');
        }
    }

    function displayStructuredAccommodations(accommodations) {
        const container = document.getElementById('accommodation-results');
        if (container) {
            container.innerHTML = '';

            accommodations.forEach(acc => {
                const card = document.createElement('div');
                card.className = 'booking-card bg-white p-4 rounded-xl shadow-md border';
                card.innerHTML = `
                    <div class="flex justify-between items-start mb-2">
                        <div class="flex-1">
                            <h4 class="font-bold text-lg">${acc.name}</h4>
                            <p class="text-sm text-slate-600">${acc.location}</p>
                            <p class="text-xs text-slate-500 mt-1">${acc.distance_from_center}</p>
                        </div>
                        <div class="text-right ml-4">
                            <p class="font-bold text-sky-600 text-lg">${acc.price}</p>
                            <div class="flex items-center justify-end">
                                <span class="text-yellow-500">★</span>
                                <span class="text-sm ml-1 font-medium">${acc.rating}</span>
                            </div>
                        </div>
                    </div>
                    <p class="text-sm text-slate-600 mb-3">${acc.description || 'Comfortable accommodation with modern amenities'}</p>
                    <div class="flex flex-wrap gap-1 mb-3">
                        ${acc.amenities.map(amenity => `<span class="text-xs bg-slate-100 px-2 py-1 rounded">${amenity}</span>`).join('')}
                    </div>
                    <div class="flex space-x-2">
                        <button class="book-accommodation flex-1 bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 text-sm font-semibold" data-acc-id="${acc.id}">
                            Book Now
                        </button>
                        ${acc.booking_url ? `<a href="${acc.booking_url}" target="_blank" class="flex-1 bg-slate-500 text-white py-2 px-4 rounded-lg hover:bg-slate-600 text-sm font-semibold text-center">View Details</a>` : ''}
                    </div>
                `;
                container.appendChild(card);
            });

            // Re-add event listeners
            container.querySelectorAll('.book-accommodation').forEach(btn => {
                btn.addEventListener('click', e => {
                    const accId = parseInt(e.target.dataset.accId);
                    bookAccommodation(accId);
                });
            });
        }
    }

    function displayStructuredTransportation(routes) {
        const container = document.getElementById('route-results');
        if (container) {
            container.innerHTML = '';

            routes.forEach(route => {
                const card = document.createElement('div');
                card.className = 'bg-white p-4 rounded-xl shadow-md border';
                card.innerHTML = `
                    <div class="flex justify-between items-start mb-2">
                        <div class="flex-1">
                            <h4 class="font-bold text-lg">${route.from} → ${route.to}</h4>
                            <p class="text-sm text-slate-600">${route.type} • ${route.duration} • ${route.stops} stops</p>
                            <div class="flex items-center space-x-4 mt-1">
                                <span class="text-xs bg-slate-100 px-2 py-1 rounded">Departure: ${route.departure_time || 'TBD'}</span>
                                <span class="text-xs bg-slate-100 px-2 py-1 rounded">Arrival: ${route.arrival_time || 'TBD'}</span>
                            </div>
                            <p class="text-xs text-slate-500 mt-1">${route.carbon_footprint || 'Carbon footprint info available'}</p>
                        </div>
                        <div class="text-right ml-4">
                            <p class="font-bold text-emerald-600 text-lg">${route.price}</p>
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <button class="book-route flex-1 bg-sky-500 text-white py-2 px-4 rounded-lg hover:bg-sky-600 text-sm font-semibold" data-route-id="${route.id}">
                            Book Transportation
                        </button>
                        ${route.booking_url ? `<a href="${route.booking_url}" target="_blank" class="flex-1 bg-slate-500 text-white py-2 px-4 rounded-lg hover:bg-slate-600 text-sm font-semibold text-center">View Details</a>` : ''}
                    </div>
                `;
                container.appendChild(card);
            });

            // Re-add event listeners
            container.querySelectorAll('.book-route').forEach(btn => {
                btn.addEventListener('click', e => {
                    const routeId = parseInt(e.target.dataset.routeId);
                    bookRoute(routeId);
                });
            });
        }
    }

    function displayStructuredItinerary(itineraryData) {
        const container = document.getElementById('itinerary-content');
        if (container) {
            container.innerHTML = '';

            itineraryData.forEach(day => {
                const dayEl = document.createElement('div');
                dayEl.className = 'bg-slate-50 p-4 rounded-lg mb-4';
                dayEl.innerHTML = `
                    <div class="flex justify-between items-start mb-3">
                        <h4 class="font-bold text-lg">${day.date || `Day ${day.day}`}</h4>
                        <div class="text-right">
                            <p class="text-sm font-medium text-emerald-600">Budget: ${day.daily_budget}</p>
                            <p class="text-xs text-slate-500">${day.transport_summary}</p>
                        </div>
                    </div>
                    <div class="space-y-3">
                        ${day.activities.map(activity => `
                            <div class="bg-white p-3 rounded-lg border-l-4 ${activity.type === 'meal' ? 'border-l-emerald-500' : activity.type === 'attraction' ? 'border-l-sky-500' : activity.type === 'transport' ? 'border-l-amber-500' : 'border-l-slate-500'}">
                                <div class="flex justify-between items-start mb-2">
                                    <div class="flex-1">
                                        <div class="flex items-center space-x-2">
                                            <span class="font-mono text-sm font-bold text-slate-600">${activity.time}</span>
                                            <span class="text-xs bg-slate-100 px-2 py-1 rounded capitalize">${activity.type}</span>
                                            ${activity.transport_needed ? '<span class="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">Transport</span>' : ''}
                                        </div>
                                        <p class="font-medium mt-1">${activity.activity}</p>
                                        <p class="text-sm text-slate-600">${activity.location}</p>
                                        ${activity.transport_details ? `<p class="text-xs text-amber-600 mt-1">${activity.transport_details}</p>` : ''}
                                    </div>
                                    <div class="text-right ml-4">
                                        <p class="text-sm font-medium text-slate-600">${activity.duration}</p>
                                        <p class="text-sm font-bold text-emerald-600">${activity.cost}</p>
                                    </div>
                                </div>
                                ${activity.description ? `<p class="text-sm text-slate-500 mt-2">${activity.description}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                `;
                container.appendChild(dayEl);
            });

            // Add approval section for complex itineraries
            if (itineraryData.length > 3) {
                const approvalSection = document.createElement('div');
                approvalSection.className = 'mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200';
                approvalSection.innerHTML = `
                    <h4 class="font-bold text-blue-800 mb-2">Ready to proceed?</h4>
                    <p class="text-sm text-blue-700 mb-3">This itinerary includes detailed hourly planning. Would you like me to help book activities or make adjustments?</p>
                    <div class="flex space-x-2">
                        <button class="approve-itinerary bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm font-semibold">Approve & Book</button>
                        <button class="modify-itinerary bg-slate-500 text-white px-4 py-2 rounded-lg hover:bg-slate-600 text-sm font-semibold">Request Changes</button>
                    </div>
                `;
                container.appendChild(approvalSection);

                // Add event listeners for approval buttons
                approvalSection.querySelector('.approve-itinerary').addEventListener('click', () => {
                    addChatMessage('ai', 'Great! I\'ll help you book the activities and transportation for this itinerary. Let me start with the bookings...');
                    // Here you would implement the booking logic
                });

                approvalSection.querySelector('.modify-itinerary').addEventListener('click', () => {
                    addChatMessage('ai', 'No problem! What would you like me to change in the itinerary? I can adjust activities, times, or add/remove days.');
                });
            }
        }
    }

    function handleSuggestedActions(actions) {
        // Add action buttons to the chat or show them as suggestions
        const lastMessage = document.querySelector('#chat-messages .chat-message:last-child');
        if (lastMessage && actions.length > 0) {
            const actionsContainer = document.createElement('div');
            actionsContainer.className = 'flex flex-wrap gap-2 mt-2';

            actions.forEach(action => {
                const actionBtn = document.createElement('button');
                actionBtn.className = 'text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded';
                actionBtn.textContent = action.label;
                actionBtn.addEventListener('click', () => {
                    // Handle the action based on its type
                    switch (action.type) {
                        case 'show_destinations':
                            document.getElementById('suggest-destination').click();
                            break;
                        case 'show_accommodations':
                            document.getElementById('accommodation-section').classList.remove('hidden');
                            break;
                    }
                });
                actionsContainer.appendChild(actionBtn);
            });

            lastMessage.appendChild(actionsContainer);
        }
    }

    if (voiceInputBtn) {
        voiceInputBtn.addEventListener('click', () => {
            if (!recognition) {
                initSpeechRecognition();
            }
            if (recognition && !isListening) {
                startVoiceInput();
            } else if (recognition && isListening) {
                recognition.stop();
            }
        });
    }

    if (suggestDestinationBtn) {
        suggestDestinationBtn.addEventListener('click', async () => {
            const budget = document.getElementById('budget-select')?.value || 'mid-range';
            const style = document.getElementById('style-select')?.value || 'relaxation';

            // Prompt z prośbą o konkretny typ JSON-a
            const prompt = `
    Based on user preferences:
    - Budget: ${budget}
    - Style: ${style}

    Please suggest 4 travel destinations as JSON array with fields: id, name, type, budget, description, image (single emoji).

    Return ONLY raw JSON array, no markdown blocks, no explanations.
    Example:
    [{"id":1,"name":"Bali, Indonesia","type":"relaxation","budget":"mid-range","description":"Tropical paradise with beaches","image":"🏝️"}, ...]
    `;

            addChatMessage('ai', 'Let me find perfect destinations for you...');

            const raw = await queryLLM(prompt);        // zwraca string
            let list = [];
            try { list = JSON.parse(raw); } catch (e) { console.warn('LLM nie zwrócił poprawnego JSON-a', e); }

            if (Array.isArray(list) && list.length) {
                // Nadaj unikalne ID (żeby nie kolidowały ze statycznymi)
                list = list.map((d, i) => ({ ...d, id: Date.now() + i }));
                await renderDestinations(list);        // ← użyj danych z LLM-a
                addChatMessage('ai', 'Here are my top picks!');
            } else {
                // Fallback – stare mock-i
                await renderDestinations();
                addChatMessage('ai', 'Here are some popular destinations!');
            }
        });
    }

    if (searchAccommodationsBtn) {
        searchAccommodationsBtn.addEventListener('click', () => {
            renderAccommodations();
        });
    }

    if (searchRoutesBtn) {
        searchRoutesBtn.addEventListener('click', () => {
            const fromLocation = document.getElementById('from-location').value;
            const toLocation = document.getElementById('to-location').value;

            if (fromLocation && toLocation) {
                renderRoutes();
                addChatMessage('ai', `Here are the best transportation options from ${fromLocation} to ${toLocation}.`);
            }
        });
    }

    if (generateItineraryBtn) {
        generateItineraryBtn.addEventListener('click', () => {
            generateItinerary();
            addChatMessage('ai', 'Perfect! I\'ve generated a personalized itinerary for your trip. You can adjust the duration and I\'ll customize it further.');
        });
    }

    // ========== NEW TABBED INTERFACE EVENT LISTENERS ==========

    // Destination tab listeners
    const aiDestinationsBtn = document.getElementById('ai-destinations');
    const manualDestinationsBtn = document.getElementById('manual-destinations');
    const searchDestinationsBtn = document.getElementById('search-destinations');

    if (aiDestinationsBtn) {
        aiDestinationsBtn.addEventListener('click', () => {
            toggleDestinationSearchMode('ai');
            suggestDestinationsAI();
        });
    }

    if (manualDestinationsBtn) {
        manualDestinationsBtn.addEventListener('click', () => {
            toggleDestinationSearchMode('manual');
        });
    }

    if (searchDestinationsBtn) {
        searchDestinationsBtn.addEventListener('click', searchDestinationsManual);
    }

    // Accommodation tab listeners
    const aiAccommodationsBtn = document.getElementById('ai-accommodations');
    const manualAccommodationsBtn = document.getElementById('manual-accommodations');
    const searchAccommodationsManualBtn = document.getElementById('search-accommodations');

    if (aiAccommodationsBtn) {
        aiAccommodationsBtn.addEventListener('click', () => {
            toggleAccommodationSearchMode('ai');
            suggestAccommodationsAI();
        });
    }

    if (manualAccommodationsBtn) {
        manualAccommodationsBtn.addEventListener('click', () => {
            toggleAccommodationSearchMode('manual');
        });
    }

    if (searchAccommodationsManualBtn) {
        searchAccommodationsManualBtn.addEventListener('click', searchAccommodationsManual);
    }

    // Transportation tab listeners
    const aiTransportationBtn = document.getElementById('ai-transportation');
    const manualTransportationBtn = document.getElementById('manual-transportation');
    const searchTransportationBtn = document.getElementById('search-transportation');

    if (aiTransportationBtn) {
        aiTransportationBtn.addEventListener('click', () => {
            toggleTransportationSearchMode('ai');
            suggestTransportationAI();
        });
    }

    if (manualTransportationBtn) {
        manualTransportationBtn.addEventListener('click', () => {
            toggleTransportationSearchMode('manual');
        });
    }

    if (searchTransportationBtn) {
        searchTransportationBtn.addEventListener('click', searchTransportationManual);
    }

    // Itinerary tab listeners
    const aiItineraryBtn = document.getElementById('ai-itinerary');
    const manualItineraryBtn = document.getElementById('manual-itinerary');
    const generateAiItineraryBtn = document.getElementById('generate-ai-itinerary');
    const addManualDayBtn = document.getElementById('add-manual-day');

    if (aiItineraryBtn) {
        aiItineraryBtn.addEventListener('click', () => {
            toggleItineraryMode('ai');
        });
    }

    if (manualItineraryBtn) {
        manualItineraryBtn.addEventListener('click', () => {
            toggleItineraryMode('manual');
        });
    }

    if (generateAiItineraryBtn) {
        generateAiItineraryBtn.addEventListener('click', generateItineraryAI);
    }

    if (addManualDayBtn) {
        addManualDayBtn.addEventListener('click', () => {
            const currentDuration = parseInt(document.getElementById('manual-itinerary-duration')?.value || '3');
            document.getElementById('manual-itinerary-duration').value = currentDuration + 1;
            buildManualItineraryInterface();
        });
    }

    // Duration change listeners
    const aiItineraryDuration = document.getElementById('ai-itinerary-duration');
    const manualItineraryDuration = document.getElementById('manual-itinerary-duration');

    if (aiItineraryDuration) {
        aiItineraryDuration.addEventListener('change', () => {
            if (document.getElementById('ai-itinerary-section')?.classList.contains('hidden') === false) {
                generateItineraryAI();
            }
        });
    }

    if (manualItineraryDuration) {
        manualItineraryDuration.addEventListener('change', buildManualItineraryInterface);
    }

    // Initialize travel assistant if on travel assistant page
    function initTravelAssistant() {
        if (document.getElementById('chat-messages')) {
            renderTravelChat();
            renderJourneyTracking();
            startDelayMonitoring();
            initSpeechRecognition(); // Initialize speech recognition for voice input

            // Initialize tabbed interface after a short delay to ensure DOM is ready
            setTimeout(() => {
                initTabbedInterface();
            }, 100);
        }
    }

    // ========== TABBED INTERFACE FUNCTIONALITY ==========
    function initTabbedInterface() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        if (tabButtons.length === 0) return;

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;

                // Update button states
                tabButtons.forEach(btn => {
                    btn.classList.remove('active', 'border-sky-500', 'text-sky-600');
                    btn.classList.add('border-transparent', 'text-slate-500');
                });

                button.classList.add('active', 'border-sky-500', 'text-sky-600');
                button.classList.remove('border-transparent', 'text-slate-500');

                // Update content visibility
                tabContents.forEach(content => {
                    content.classList.add('hidden');
                });

                document.getElementById(`${targetTab}-tab`).classList.remove('hidden');

                // Load tab-specific content
                loadTabContent(targetTab);
            });
        });

        // Load initial tab content (destinations)
        loadTabContent('destinations');
    }

    function loadTabContent(tabName) {
        switch (tabName) {
            case 'destinations':
                renderDestinationTab();
                break;
            case 'accommodations':
                renderAccommodationTab();
                break;
            case 'transportation':
                renderTransportationTab();
                break;
            case 'itinerary':
                renderItineraryTab();
                break;
            case 'tracking':
                renderJourneyTracking();
                break;
        }
    }

    // ========== ENHANCED AI FUNCTIONS FOR EACH TAB ==========

    // Enhanced destination suggestions with better validation
    // ----------------------------  DESTINATIONS  ----------------------------
    /* ------------- DESTYNACJE ------------- */
    /* ------- PRZYCISK „🤖 Suggest Destination” ------- */
    async function suggestDestinationsAI() {
        const budget = document.getElementById('budget-select')?.value || 'mid-range';
        const style  = document.getElementById('style-select')?.value  || 'relaxation';

        // 1.  Prosty, sprawdzony prompt – zwraca TYLKO tablicę
        const prompt = `
        User wants ${style} destinations for ${budget} budget.
        Reply ONLY raw JSON array, no markdown, no text outside array.
        Each object: id, name, type, budget, description, image (emoji).
        Suggest 4 real places.
        Example:
        [{"id":1,"name":"Bali, Indonesia","type":"relaxation","budget":"mid-range","description":"Tropical paradise","image":"🏝️"}]
        `;

        addChatMessage('ai','Let me find perfect destinations for you…');
        showLLMLoading('Thinking…');

        // 2.  Twój sprawdzony endpoint
        const raw = await queryLLM(prompt);
        console.log('RAW LLM RESP:', raw);
        hideLLMLoading();

        let list = [];
        try { list = JSON.parse(raw); } catch (e) {
            console.warn('LLM nie zwrócił tablicy', e);
        }

        if (!Array.isArray(list) || !list.length) {
            addChatMessage('ai','Could you give me more details (warm/cold, region, etc.)?');
            return;
        }

        // 3.  Unikalne ID + merge do stanu
        list = list.map((d, i) => ({ ...d, id: Date.now() + i }));
        mergeLLMData('destinations', list);   // dodaj do state

        // 4.  **OD RAZU** rysuj karty w zakładce „Destinations”
        const container = document.getElementById('destination-cards');
        if (!container) return;

        container.innerHTML = '';                 // wyczyść stare
        list.forEach(dest => {
            const card = document.createElement('div');
            card.className = 'bg-white p-4 rounded-xl shadow-md border-2 border-transparent hover:border-sky-300 cursor-pointer transition-all duration-200';
            card.innerHTML = `
            <div class="text-4xl mb-2">${dest.image || '🌍'}</div>
            <h4 class="font-bold text-lg">${dest.name}</h4>
            <p class="text-sm text-slate-600 mb-2">${dest.description}</p>
            <div class="flex justify-between items-center">
                <span class="text-xs bg-slate-100 px-2 py-1 rounded-full capitalize">${dest.type}</span>
                <span class="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full capitalize">${dest.budget}</span>
            </div>
            <button class="select-destination w-full mt-3 bg-sky-500 text-white py-2 px-4 rounded-lg hover:bg-sky-600 text-sm font-semibold" data-dest-id="${dest.id}">
                Select Destination
            </button>
            `;
            container.appendChild(card);
        });

        // 5.  Dodaj obsługę kliknięcia „Select”
        container.querySelectorAll('.select-destination').forEach(btn =>
            btn.addEventListener('click', e => selectDestination(parseInt(e.target.dataset.destId)))
        );

        addChatMessage('ai','Here are my top picks!');
    }

    /* ------------- ACCOMMODATIONS ------------- */
    async function suggestAccommodationsAI() {
        const trip = state.travelAssistant.currentTrip;
        if (!trip?.destination) {
            addChatMessage('ai','Please select a destination first using the Destinations tab.');
            return;
        }

        const dest = trip.destination.name;
        const budget = state.travelAssistant.preferences.budget || 'mid-range';
        const style = state.travelAssistant.preferences.style || 'relaxation';

        addChatMessage('ai',`Finding the best accommodations in ${dest} for your ${budget} budget and ${style} preferences...`);
        showContextualLoading('accommodations', 'searching');

        try {
            // Try to fetch real-time data first
            const realTimeData = await fetchRealTimeAccommodationData(dest, budget);

            let accommodations = [];
            if (realTimeData && realTimeData.accommodations.length > 0) {
                // Use real-time data
                accommodations = realTimeData.accommodations;
                addChatMessage('ai', `Found real-time accommodation data (updated ${new Date(realTimeData.last_updated).toLocaleTimeString()})`);
            } else {
                // Fall back to LLM suggestions
                const prompt = `
                User wants accommodations in ${dest} for ${budget} budget and ${style} travel style.
                Reply ONLY with a valid JSON array (no markdown, no explanations).
                Each object: id, name, location, price (€XXX/night), rating (3.5-5), amenities (array), image (emoji), booking_url, distance_from_center, description.
                Suggest 3-4 real, bookable accommodations.
                Example:
                [{"id":1,"name":"Seaside Resort & Spa","location":"${dest}","price":"€150/night","rating":4.6,"amenities":["Pool","Spa","Beach Access","WiFi"],"image":"🏨","booking_url":"https://example.com/booking","distance_from_center":"2.5 km from city center","description":"Luxury resort with ocean views"}]
                `;

                const response = await queryLLMWithValidation(prompt, 2, 'accommodations');

                if (response && response.type === 'accommodations' && response.data) {
                    accommodations = Array.isArray(response.data) ? response.data : [response.data];
                }
            }

            hideLLMLoading();

            if (!accommodations.length) {
                addChatMessage('ai','No suitable accommodations found. Try adjusting your budget or preferences.');
                return;
            }

            // Add unique IDs and merge with existing data
            accommodations = accommodations.map((acc, i) => ({
                ...acc,
                id: Date.now() + i,
                booking_url: acc.booking_url || `https://booking.com/search?ss=${encodeURIComponent(dest)}`,
                distance_from_center: acc.distance_from_center || "City center location"
            }));

            mergeLLMData('accommodations', accommodations);
            displayAccommodationsInTab(accommodations);

            addChatMessage('ai', `Perfect! I found ${accommodations.length} great accommodations in ${dest}. You can book directly from the options below.`);

        } catch (error) {
            console.error('Error in suggestAccommodationsAI:', error);
            hideLLMLoading();
            addChatMessage('ai', 'Error finding accommodations. Please try again.');
        }
    }

    /* ------------- TRANSPORTATION ------------- */
    async function suggestTransportationAI() {
        const trip = state.travelAssistant.currentTrip;
        if (!trip?.destination) {
            addChatMessage('ai','Please select a destination first using the Destinations tab.');
            return;
        }

        const from = 'New York'; // TODO: geolocate user or get from preferences
        const to = trip.destination.name;
        const budget = state.travelAssistant.preferences.budget || 'mid-range';

        addChatMessage('ai',`Finding the best transportation options from ${from} to ${to} within your ${budget} budget...`);
        showContextualLoading('transportation', 'searching');

        try {
            // Try to fetch real-time data first
            const realTimeData = await fetchRealTimeTransportData(from, to);

            let routes = [];
            if (realTimeData && realTimeData.routes.length > 0) {
                // Use real-time data
                routes = realTimeData.routes;
                addChatMessage('ai', `Found real-time transportation data (updated ${new Date(realTimeData.last_updated).toLocaleTimeString()})`);
            } else {
                // Fall back to LLM suggestions
                const prompt = `
                User needs transportation from ${from} to ${to} with ${budget} budget.
                Reply ONLY with a valid JSON array (no markdown, no explanations).
                Each object: id, from, to, duration (format: 14h 30m), price (€XXX), type (Flight|Train|Bus|Car), stops (number), departure_time, arrival_time, booking_url, carbon_footprint.
                Suggest 3-4 real, bookable transportation options.
                Example:
                [{"id":1,"from":"${from}","to":"${to}","duration":"14h 30m","price":"€850","type":"Flight","stops":0,"departure_time":"10:30","arrival_time":"16:00","booking_url":"https://airline.com/booking","carbon_footprint":"High (850kg CO2)"}]
                `;

                const response = await queryLLMWithValidation(prompt, 2, 'transportation');

                if (response && response.type === 'transportation' && response.data) {
                    routes = Array.isArray(response.data) ? response.data : [response.data];
                }
            }

            hideLLMLoading();

            if (!routes.length) {
                addChatMessage('ai','No suitable transportation options found. Try adjusting your budget or travel dates.');
                return;
            }

            // Add unique IDs and merge with existing data
            routes = routes.map((route, i) => ({
                ...route,
                id: Date.now() + i,
                booking_url: route.booking_url || `https://booking.com/transport?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`,
                carbon_footprint: route.carbon_footprint || "Calculated per option"
            }));

            mergeLLMData('transportation', routes);
            displayTransportationInTab(routes);

            addChatMessage('ai', `Great! I found ${routes.length} transportation options from ${from} to ${to}. You can book directly or get redirected to ticketing sites.`);

        } catch (error) {
            console.error('Error in suggestTransportationAI:', error);
            hideLLMLoading();
            addChatMessage('ai', 'Error finding transportation options. Please try again.');
        }
    }
    // Enhanced itinerary generation with AI
    async function generateItineraryAI() {
        const trip = state.travelAssistant.currentTrip;
        if (!trip?.destination) {
            addChatMessage('ai','Please select a destination first using the Destinations tab.');
            return;
        }

        const duration = parseInt(document.getElementById('ai-itinerary-duration')?.value || '3');
        const destination = trip.destination.name;
        const style = state.travelAssistant.preferences.style || 'relaxation';
        const budget = state.travelAssistant.preferences.budget || 'mid-range';

        const prompt = `
        User wants a ${duration}-day itinerary for ${destination} with ${style} style and ${budget} budget.
        Reply ONLY with a valid JSON array (no markdown, no explanations).
        Each day: day (number), date (use placeholder like "Day X"), activities (array of {time, activity, type, location, duration, cost, description, transport_needed, transport_details}), daily_budget, transport_summary.
        Create realistic hourly schedule with specific details.
        Example:
        [{"day":1,"date":"Day 1","activities":[{"time":"09:00","activity":"Hotel breakfast","type":"meal","location":"Hotel","duration":"30m","cost":"Included","description":"Start your day with continental breakfast","transport_needed":false},{"time":"10:00","activity":"Visit main attraction","type":"attraction","location":"City Center","duration":"2h","cost":"€15","description":"Guided tour of the main historical site","transport_needed":true,"transport_details":"10 min walk from hotel"}],"daily_budget":"€85","transport_summary":"Mostly walking with optional public transport"}]
        `;

        addChatMessage('ai',`Creating a personalized ${duration}-day itinerary for ${destination} with ${style} focus and ${budget} budget...`);
        showContextualLoading('itinerary', 'searching');

        const response = await queryLLMWithValidation(prompt, 2, 'itinerary');
        hideLLMLoading();

        if (!response) {
            addChatMessage('ai','I need more information to create the perfect itinerary. Could you tell me your interests and any specific activities you want to include?');
            return;
        }

        if (response.needs_more_info) {
            const missingInfo = response.missing_info || [];
            addChatMessage('ai',`To create a better itinerary, I need: ${missingInfo.join(', ')}. For example, your specific interests and activity preferences would help.`);
            return;
        }

        let itinerary = [];
        if (response.type === 'itinerary' && response.data) {
            itinerary = Array.isArray(response.data) ? response.data : [response.data];
        }

        if (!itinerary.length) {
            addChatMessage('ai','Could not generate itinerary. Try adjusting your preferences or trip duration.');
            return;
        }

        // Enhance itinerary with additional details
        itinerary = itinerary.map(day => ({
            ...day,
            daily_budget: day.daily_budget || `€${Math.floor(Math.random() * 100) + 50}`,
            transport_summary: day.transport_summary || "Mix of walking and public transport"
        }));

        displayItineraryInTab(itinerary);

        // Show approval request for complex itineraries
        if (response.approval_required || duration > 5) {
            addChatMessage('ai', `I've created a detailed ${duration}-day itinerary for ${destination}. Please review the plan below and let me know if you'd like me to proceed with bookings or make any adjustments.`);
        } else {
            addChatMessage('ai', `Perfect! Here's your personalized ${duration}-day itinerary for ${destination}. Each day includes hourly activities, costs, and transportation details.`);
        }
    }

    function generateBasicItinerary(duration) {
        const itinerary = [];
        for (let day = 1; day <= duration; day++) {
            const dayPlan = {
                day: day,
                activities: [
                    { time: "09:00", activity: "Breakfast at hotel", type: "meal" },
                    { time: "10:00", activity: "Morning exploration", type: "activity" },
                    { time: "13:00", activity: "Lunch break", type: "meal" },
                    { time: "14:00", activity: "Afternoon sightseeing", type: "attraction" },
                    { time: "19:00", activity: "Dinner and relaxation", type: "meal" }
                ]
            };
            itinerary.push(dayPlan);
        }
        displayItineraryInTab(itinerary);
    }

    // ========== TAB CONTENT DISPLAY FUNCTIONS ==========

    function renderDestinationTab() {
        // Display current destinations or AI suggestions
        const destinationCards = document.getElementById('destination-cards');
        if (destinationCards) {
            destinationCards.innerHTML = '';
            state.travelAssistant.destinations.slice(0, 4).forEach(dest => {
                const card = createDestinationCard(dest);
                destinationCards.appendChild(card);
            });
        }
    }

    function renderAccommodationTab() {
        const currentTrip = state.travelAssistant.currentTrip;
        if (currentTrip && currentTrip.destination) {
            const accommodationCards = document.getElementById('accommodation-cards');
            if (accommodationCards) {
                accommodationCards.innerHTML = '';
                state.travelAssistant.accommodations
                    .filter(acc => acc.location.includes(currentTrip.destination.name.split(',')[0]))
                    .slice(0, 3)
                    .forEach(acc => {
                        const card = createAccommodationCard(acc);
                        accommodationCards.appendChild(card);
                    });
            }
        }
    }

    function renderTransportationTab() {
        const currentTrip = state.travelAssistant.currentTrip;
        if (currentTrip && currentTrip.destination) {
            const transportationCards = document.getElementById('transportation-cards');
            if (transportationCards) {
                transportationCards.innerHTML = '';
                state.travelAssistant.routes
                    .filter(route => route.to.includes(currentTrip.destination.name.split(',')[0]))
                    .slice(0, 3)
                    .forEach(route => {
                        const card = createTransportationCard(route);
                        transportationCards.appendChild(card);
                    });
            }
        }
    }

    function renderItineraryTab() {
        const currentTrip = state.travelAssistant.currentTrip;
        if (currentTrip && currentTrip.destination) {
            const duration = parseInt(document.getElementById('ai-itinerary-duration')?.value || '3');
            generateBasicItinerary(duration);
        }
    }

    function createDestinationCard(dest) {
        const card = document.createElement('div');
        card.className = 'bg-white p-4 rounded-xl shadow-md border-2 border-transparent hover:border-sky-300 cursor-pointer transition-all duration-200';
        card.innerHTML = `
            <div class="text-4xl mb-2">${dest.image || '🌍'}</div>
            <h4 class="font-bold text-lg">${dest.name}</h4>
            <p class="text-sm text-slate-600 mb-2">${dest.description}</p>
            <div class="flex justify-between items-center">
                <span class="text-xs bg-slate-100 px-2 py-1 rounded-full capitalize">${dest.type}</span>
                <span class="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full capitalize">${dest.budget}</span>
            </div>
            <button class="select-destination w-full mt-3 bg-sky-500 text-white py-2 px-4 rounded-lg hover:bg-sky-600 text-sm font-semibold" data-dest-id="${dest.id}">
                Select Destination
            </button>
        `;

        card.querySelector('.select-destination').addEventListener('click', e => {
            const destId = parseInt(e.target.dataset.destId);
            selectDestination(destId);
        });

        return card;
    }

    function createAccommodationCard(acc) {
        const card = document.createElement('div');
        card.className = 'booking-card bg-white p-4 rounded-xl shadow-md border';
        card.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <div>
                    <h4 class="font-bold">${acc.name}</h4>
                    <p class="text-sm text-slate-600">${acc.location}</p>
                </div>
                <div class="text-right">
                    <p class="font-bold text-sky-600">${acc.price}</p>
                    <div class="flex items-center">
                        <span class="text-yellow-500">★</span>
                        <span class="text-sm ml-1">${acc.rating}</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap gap-1 mb-3">
                ${acc.amenities.map(amenity => `<span class="text-xs bg-slate-100 px-2 py-1 rounded">${amenity}</span>`).join('')}
            </div>
            <button class="book-accommodation w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 text-sm font-semibold" data-acc-id="${acc.id}">
                Book Now
            </button>
        `;

        card.querySelector('.book-accommodation').addEventListener('click', e => {
            const accId = parseInt(e.target.dataset.accId);
            bookAccommodation(accId);
        });

        return card;
    }

    function createTransportationCard(route) {
        const card = document.createElement('div');
        card.className = 'bg-white p-4 rounded-xl shadow-md border';
        card.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <div>
                    <h4 class="font-bold">${route.from} → ${route.to}</h4>
                    <p class="text-sm text-slate-600">${route.type} • ${route.duration}</p>
                </div>
                <div class="text-right">
                    <p class="font-bold text-emerald-600">${route.price}</p>
                    <p class="text-sm text-slate-500">${route.stops} stops</p>
                </div>
            </div>
            <button class="book-route w-full bg-sky-500 text-white py-2 px-4 rounded-lg hover:bg-sky-600 text-sm font-semibold" data-route-id="${route.id}">
                Book Transportation
            </button>
        `;

        card.querySelector('.book-route').addEventListener('click', e => {
            const routeId = parseInt(e.target.dataset.routeId);
            bookRoute(routeId);
        });

        return card;
    }

    // ========== DISPLAY FUNCTIONS FOR TAB CONTENT ==========

    function displayDestinationsInTab(destinations) {
        const container = document.getElementById('destination-cards');
        if (container) {
            container.innerHTML = '';
            destinations.forEach(dest => {
                const card = createDestinationCard(dest);
                container.appendChild(card);
            });
        }
    }

    function displayAccommodationsInTab(accommodations) {
        const container = document.getElementById('accommodation-cards');
        if (container) {
            container.innerHTML = '';
            accommodations.forEach(acc => {
                const card = createAccommodationCard(acc);
                container.appendChild(card);
            });
        }
    }

    function displayTransportationInTab(routes) {
        const container = document.getElementById('transportation-cards');
        if (container) {
            container.innerHTML = '';
            routes.forEach(route => {
                const card = createTransportationCard(route);
                container.appendChild(card);
            });
        }
    }

    function displayItineraryInTab(itineraryData) {
        const container = document.getElementById('ai-itinerary-content');
        if (container) {
            container.innerHTML = '';
            itineraryData.forEach(day => {
                const dayEl = document.createElement('div');
                dayEl.className = 'bg-slate-50 p-4 rounded-lg';
                dayEl.innerHTML = `
                    <h4 class="font-bold text-lg mb-3">Day ${day.day}</h4>
                    <div class="space-y-2">
                        ${day.activities.map(activity => `
                            <div class="flex justify-between items-center py-2 border-b border-slate-200 last:border-b-0">
                                <div>
                                    <p class="font-medium">${activity.activity}</p>
                                    <p class="text-sm text-slate-500 capitalize">${activity.type}</p>
                                </div>
                                <span class="text-sm font-mono text-slate-600">${activity.time}</span>
                            </div>
                        `).join('')}
                    </div>
                `;
                container.appendChild(dayEl);
            });
        }
    }

    // ========== MANUAL SEARCH CAPABILITIES ==========

    function searchDestinationsManual() {
        const name = document.getElementById('manual-dest-name')?.value || '';
        const type = document.getElementById('manual-dest-type')?.value || '';
        const budget = document.getElementById('manual-dest-budget')?.value || '';

        let filteredDestinations = state.travelAssistant.destinations;

        // Apply filters
        if (name) {
            filteredDestinations = filteredDestinations.filter(dest =>
                dest.name.toLowerCase().includes(name.toLowerCase()) ||
                dest.description.toLowerCase().includes(name.toLowerCase())
            );
        }

        if (type) {
            filteredDestinations = filteredDestinations.filter(dest => dest.type === type);
        }

        if (budget) {
            filteredDestinations = filteredDestinations.filter(dest => dest.budget === budget);
        }

        // Apply user preferences if no specific budget filter is set
        if (!budget && state.travelAssistant.preferences.budget) {
            const preferredBudget = state.travelAssistant.preferences.budget;
            // Boost destinations that match preferred budget
            filteredDestinations = filteredDestinations.map(dest => ({
                ...dest,
                score: dest.budget === preferredBudget ? 2 : 1
            })).sort((a, b) => b.score - a.score);
        }

        // Apply travel style preferences
        if (state.travelAssistant.preferences.style && !type) {
            const preferredStyle = state.travelAssistant.preferences.style;
            filteredDestinations = filteredDestinations.map(dest => ({
                ...dest,
                score: dest.type === preferredStyle ? 2 : 1
            })).sort((a, b) => b.score - a.score);
        }

        displayManualDestinations(filteredDestinations);
        addChatMessage('ai', `Found ${filteredDestinations.length} destinations matching your criteria. ${filteredDestinations.length > 0 ? 'Destinations matching your preferences are highlighted.' : ''}`);
    }

    function searchAccommodationsManual() {
        const location = document.getElementById('manual-acc-location')?.value || '';
        const name = document.getElementById('manual-acc-name')?.value || '';
        const minPrice = document.getElementById('manual-acc-price-min')?.value || '';
        const maxPrice = document.getElementById('manual-acc-price-max')?.value || '';

        let filteredAccommodations = state.travelAssistant.accommodations;

        // Apply filters
        if (location) {
            filteredAccommodations = filteredAccommodations.filter(acc =>
                acc.location.toLowerCase().includes(location.toLowerCase())
            );
        }

        if (name) {
            filteredAccommodations = filteredAccommodations.filter(acc =>
                acc.name.toLowerCase().includes(name.toLowerCase())
            );
        }

        if (minPrice) {
            filteredAccommodations = filteredAccommodations.filter(acc => {
                const price = parseInt(acc.price.replace(/[^\d]/g, ''));
                return price >= parseInt(minPrice);
            });
        }

        if (maxPrice) {
            filteredAccommodations = filteredAccommodations.filter(acc => {
                const price = parseInt(acc.price.replace(/[^\d]/g, ''));
                return price <= parseInt(maxPrice);
            });
        }

        // Apply user preferences for better matching
        if (state.travelAssistant.preferences.budget && !minPrice && !maxPrice) {
            const budgetRanges = {
                'budget': { min: 0, max: 80 },
                'mid-range': { min: 80, max: 200 },
                'luxury': { min: 200, max: 1000 }
            };

            const range = budgetRanges[state.travelAssistant.preferences.budget];
            if (range) {
                filteredAccommodations = filteredAccommodations.filter(acc => {
                    const price = parseInt(acc.price.replace(/[^\d]/g, ''));
                    return price >= range.min && price <= range.max;
                });
            }
        }

        // Sort by rating and user preferences
        filteredAccommodations = filteredAccommodations.sort((a, b) => {
            // Prioritize higher ratings
            if (b.rating !== a.rating) {
                return b.rating - a.rating;
            }
            // Then by budget preference match
            const aPrice = parseInt(a.price.replace(/[^\d]/g, ''));
            const bPrice = parseInt(b.price.replace(/[^\d]/g, ''));

            if (state.travelAssistant.preferences.budget) {
                const budgetRanges = {
                    'budget': 80,
                    'mid-range': 140,
                    'luxury': 300
                };
                const targetPrice = budgetRanges[state.travelAssistant.preferences.budget];

                const aDiff = Math.abs(aPrice - targetPrice);
                const bDiff = Math.abs(bPrice - targetPrice);

                if (aDiff !== bDiff) {
                    return aDiff - bDiff;
                }
            }

            return 0;
        });

        displayManualAccommodations(filteredAccommodations);
        addChatMessage('ai', `Found ${filteredAccommodations.length} accommodations matching your criteria. Results are sorted by rating and preference match.`);
    }

    function searchTransportationManual() {
        const from = document.getElementById('manual-from-location')?.value || '';
        const to = document.getElementById('manual-to-location')?.value || '';
        const type = document.getElementById('manual-transport-type')?.value || '';

        let filteredRoutes = state.travelAssistant.routes;

        // Apply filters
        if (from) {
            filteredRoutes = filteredRoutes.filter(route =>
                route.from.toLowerCase().includes(from.toLowerCase())
            );
        }

        if (to) {
            filteredRoutes = filteredRoutes.filter(route =>
                route.to.toLowerCase().includes(to.toLowerCase())
            );
        }

        if (type) {
            filteredRoutes = filteredRoutes.filter(route => route.type === type);
        }

        // Apply budget preferences for pricing
        if (state.travelAssistant.preferences.budget) {
            const budgetMultipliers = {
                'budget': 0.8,
                'mid-range': 1.0,
                'luxury': 1.3
            };

            const multiplier = budgetMultipliers[state.travelAssistant.preferences.budget] || 1.0;
            filteredRoutes = filteredRoutes.map(route => {
                const basePrice = parseInt(route.price.replace(/[^\d]/g, ''));
                const adjustedPrice = Math.round(basePrice * multiplier);
                return {
                    ...route,
                    adjustedPrice: `€${adjustedPrice}`,
                    score: basePrice <= (basePrice * multiplier) ? 2 : 1
                };
            }).sort((a, b) => b.score - a.score);
        }

        // Sort by duration and stops for efficiency
        filteredRoutes = filteredRoutes.sort((a, b) => {
            // First by number of stops (prefer direct routes)
            if (a.stops !== b.stops) {
                return a.stops - b.stops;
            }
            // Then by duration
            const aDuration = parseInt(a.duration.replace(/[^\d]/g, ''));
            const bDuration = parseInt(b.duration.replace(/[^\d]/g, ''));
            return aDuration - bDuration;
        });

        displayManualTransportation(filteredRoutes);
        addChatMessage('ai', `Found ${filteredRoutes.length} transportation options. Results are sorted by efficiency (direct routes first) and your budget preferences.`);
    }

    function displayManualDestinations(destinations) {
        const container = document.getElementById('manual-destination-results');
        if (container) {
            container.innerHTML = '';
            if (destinations.length === 0) {
                container.innerHTML = '<p class="text-slate-500 text-center py-4">No destinations found matching your criteria.</p>';
                return;
            }

            destinations.forEach(dest => {
                const card = createDestinationCard(dest);
                container.appendChild(card);
            });
        }
    }

    function displayManualAccommodations(accommodations) {
        const container = document.getElementById('manual-accommodation-results');
        if (container) {
            container.innerHTML = '';
            if (accommodations.length === 0) {
                container.innerHTML = '<p class="text-slate-500 text-center py-4">No accommodations found matching your criteria.</p>';
                return;
            }

            accommodations.forEach(acc => {
                const card = createAccommodationCard(acc);
                container.appendChild(card);
            });
        }
    }

    function displayManualTransportation(routes) {
        const container = document.getElementById('manual-transportation-results');
        if (container) {
            container.innerHTML = '';
            if (routes.length === 0) {
                container.innerHTML = '<p class="text-slate-500 text-center py-4">No transportation options found matching your criteria.</p>';
                return;
            }

            routes.forEach(route => {
                const card = createTransportationCard(route);
                container.appendChild(card);
            });
        }
    }

    // ========== MODE SWITCHING FUNCTIONS ==========

    function toggleDestinationSearchMode(mode) {
        const aiSection = document.getElementById('ai-destination-section');
        const manualSection = document.getElementById('manual-destination-section');

        if (mode === 'ai') {
            aiSection.classList.remove('hidden');
            manualSection.classList.add('hidden');
        } else {
            aiSection.classList.add('hidden');
            manualSection.classList.remove('hidden');
        }
    }

    function toggleAccommodationSearchMode(mode) {
        const aiSection = document.getElementById('ai-accommodation-section');
        const manualSection = document.getElementById('manual-accommodation-section');

        if (mode === 'ai') {
            aiSection.classList.remove('hidden');
            manualSection.classList.add('hidden');
        } else {
            aiSection.classList.add('hidden');
            manualSection.classList.remove('hidden');
        }
    }

    function toggleTransportationSearchMode(mode) {
        const aiSection = document.getElementById('ai-transportation-section');
        const manualSection = document.getElementById('manual-transportation-section');

        if (mode === 'ai') {
            aiSection.classList.remove('hidden');
            manualSection.classList.add('hidden');
        } else {
            aiSection.classList.add('hidden');
            manualSection.classList.remove('hidden');
        }
    }

    function toggleItineraryMode(mode) {
        const aiSection = document.getElementById('ai-itinerary-section');
        const manualSection = document.getElementById('manual-itinerary-section');

        if (mode === 'ai') {
            aiSection.classList.remove('hidden');
            manualSection.classList.add('hidden');
        } else {
            aiSection.classList.add('hidden');
            manualSection.classList.remove('hidden');
            buildManualItineraryInterface();
        }
    }

    function buildManualItineraryInterface() {
        const container = document.getElementById('manual-itinerary-builder');
        if (!container) return;

        const duration = parseInt(document.getElementById('manual-itinerary-duration')?.value || '3');
        container.innerHTML = '';

        for (let day = 1; day <= duration; day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'bg-slate-50 p-4 rounded-lg';
            dayEl.innerHTML = `
                <h4 class="font-bold text-lg mb-3">Day ${day}</h4>
                <div class="space-y-2">
                    <div class="flex space-x-2">
                        <input type="time" class="time-input p-2 border border-slate-300 rounded text-sm" data-day="${day}" data-activity="0" value="09:00">
                        <input type="text" class="activity-input flex-1 p-2 border border-slate-300 rounded text-sm" data-day="${day}" data-activity="0" placeholder="Activity description">
                        <select class="type-input p-2 border border-slate-300 rounded text-sm" data-day="${day}" data-activity="0">
                            <option value="meal">Meal</option>
                            <option value="attraction">Attraction</option>
                            <option value="transport">Transport</option>
                            <option value="activity">Activity</option>
                        </select>
                        <button class="add-activity bg-emerald-500 text-white px-3 py-2 rounded text-sm" data-day="${day}">+</button>
                    </div>
                </div>
            `;
            container.appendChild(dayEl);
        }
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

        // Debug: Check modal elements exist
        const modalElements = {
            'event-planning-modal': document.getElementById('event-planning-modal'),
            'event-info-section': document.getElementById('event-info-section'),
            'ai-planning-section': document.getElementById('ai-planning-section'),
            'ai-plan-container-existing': document.getElementById('ai-plan-container-existing'),
            'ai-plan-content-existing': document.getElementById('ai-plan-content-existing'),
            'data-analysis-existing': document.getElementById('data-analysis-existing'),
            'optimal-schedule-existing': document.getElementById('optimal-schedule-existing'),
            'smart-recommendations-existing': document.getElementById('smart-recommendations-existing'),
            'cost-breakdown-existing': document.getElementById('cost-breakdown-existing'),
            'accept-plan-existing': document.getElementById('accept-plan-existing'),
            'reject-plan-existing': document.getElementById('reject-plan-existing')
        };
        console.log('Modal elements check:', modalElements);

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

        // Set up existing event plan action handlers
        const acceptPlanExistingBtn = document.getElementById('accept-plan-existing');
        const rejectPlanExistingBtn = document.getElementById('reject-plan-existing');

        console.log('Setting up existing event handlers:', { acceptPlanExistingBtn, rejectPlanExistingBtn });

        if (acceptPlanExistingBtn) {
            acceptPlanExistingBtn.addEventListener('click', (e) => {
                console.log('Accept plan clicked');
                handleAcceptPlan();
            });
        }
        if (rejectPlanExistingBtn) {
            rejectPlanExistingBtn.addEventListener('click', (e) => {
                console.log('Reject plan clicked');
                closeEventPlanningModal();
            });
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

        console.log('Setting up modal handlers:', { quickPlanBtn, closeModalBtn });

        if (quickPlanBtn) {
            quickPlanBtn.addEventListener('click', () => {
                console.log('Quick plan button clicked');
                openEventPlanningModal();
            });
        }

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                console.log('Close modal button clicked');
                closeEventPlanningModal();
            });
        }

        // Close modal when clicking outside
        const planningModal = document.getElementById('event-planning-modal');
        console.log('Setting up modal close handler:', planningModal);
        if (planningModal) {
            planningModal.addEventListener('click', (e) => {
                if (e.target === planningModal) {
                    closeEventPlanningModal();
                }
            });
        }

        // Debug: Check if we're on the events page
        console.log('Initializing Odyssey app...');

        // Only initialize components that exist on the current page
        try {
            createStatsChart();
            createFutureChart();
            createMarketChart();
            renderRoadmap();
            updateUI();
            console.log('App initialized successfully');
        } catch (error) {
            console.warn('Error during initialization:', error);
        }

        // Save state periodically
        setInterval(saveState, 30000); // Save every 30 seconds
        initTravelAssistant();
    }

    init();
});

/* ======  osobny listener dla guzika „AI Suggest”  ====== */
const aiDestBtn = document.getElementById('ai-destinations');
if (aiDestBtn) {
  aiDestBtn.addEventListener('click', () => {
    suggestDestinationsAI();   // ← za każdym kliknięciem
  });
}

function extractArray(text) {
  // szuka pierwszej napotkanej tablicy JSON w tekście
  const match = text.match(/\[[\s\S]*?\]/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}
