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
                vitality: {
                    current: 70,
                    base: 70,
                    subStats: {
                        physical: 75,
                        sleep: 65,
                        nutrition: 70
                    },
                    trend: [68, 69, 70, 71, 70],
                    lastUpdated: new Date()
                },
                cognition: {
                    current: 85,
                    base: 85,
                    subStats: {
                        focus: 80,
                        learning: 90,
                        memory: 85
                    },
                    trend: [83, 84, 85, 86, 85],
                    lastUpdated: new Date()
                },
                resilience: {
                    current: 60,
                    base: 60,
                    subStats: {
                        stress: 55,
                        emotional: 65,
                        social: 60
                    },
                    trend: [58, 59, 60, 61, 60],
                    lastUpdated: new Date()
                },
                prosperity: {
                    current: 50,
                    base: 50,
                    subStats: {
                        savings: 45,
                        budgeting: 55,
                        investing: 50
                    },
                    trend: [48, 49, 50, 51, 50],
                    lastUpdated: new Date()
                }
            },
            streaks: {
                workout: { current: 7, longest: 12, lastCompleted: new Date() },
                meditation: { current: 3, longest: 8, lastCompleted: new Date() },
                reading: { current: 5, longest: 15, lastCompleted: new Date() },
                budgeting: { current: 2, longest: 6, lastCompleted: new Date() }
            },
            weeklyStats: {
                questsCompleted: 12,
                totalQuests: 15,
                xpGained: 245,
                averageStatGain: 8.5
            }
        },
        quests: [
            {
                id: 1,
                text: "Complete morning workout",
                stat: "vitality",
                category: "physical",
                xp: 20,
                impactWeight: 0.7,
                streakMultiplier: 1.2,
                diminishingReturn: 0.95,
                done: false,
                streak: { current: 7, longest: 12 },
                lastCompleted: new Date(),
                subStat: "physical"
            },
            {
                id: 2,
                text: "30 mins of deep work",
                stat: "cognition",
                category: "productivity",
                xp: 30,
                impactWeight: 0.8,
                streakMultiplier: 1.15,
                diminishingReturn: 0.92,
                done: true,
                streak: { current: 3, longest: 8 },
                lastCompleted: new Date(),
                subStat: "focus"
            },
            {
                id: 3,
                text: "Maintain 7-day savings streak",
                stat: "prosperity",
                category: "financial",
                xp: 50,
                impactWeight: 0.9,
                streakMultiplier: 1.3,
                diminishingReturn: 0.90,
                done: false,
                rewardGold: 25,
                streak: { current: 2, longest: 6 },
                lastCompleted: new Date(),
                subStat: "savings"
            },
            {
                id: 4,
                text: "Meditate for 10 minutes",
                stat: "resilience",
                category: "mindfulness",
                xp: 15,
                impactWeight: 0.6,
                streakMultiplier: 1.1,
                diminishingReturn: 0.96,
                done: false,
                streak: { current: 5, longest: 15 },
                lastCompleted: new Date(),
                subStat: "emotional"
            },
            {
                id: 5,
                text: "Review daily budget",
                stat: "prosperity",
                category: "financial",
                xp: 10,
                impactWeight: 0.4,
                streakMultiplier: 1.05,
                diminishingReturn: 0.98,
                done: false,
                streak: { current: 1, longest: 4 },
                lastCompleted: new Date(),
                subStat: "budgeting"
            },
            {
                id: 6,
                text: "Read for 20 minutes",
                stat: "cognition",
                category: "learning",
                xp: 25,
                impactWeight: 0.7,
                streakMultiplier: 1.25,
                diminishingReturn: 0.93,
                done: false,
                streak: { current: 4, longest: 10 },
                lastCompleted: new Date(),
                subStat: "learning"
            }
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

    // --- Advanced Calculation Functions ---
    function calculateStreakMultiplier(streakCount) {
        // Diminishing returns on streak multipliers
        return Math.min(1 + (streakCount * 0.05), 2.0); // Max 2x multiplier
    }

    function calculateDiminishingReturn(currentStat, baseGain, diminishingRate) {
        // Apply diminishing returns based on current stat level
        const distanceFromMax = 100 - currentStat;
        const diminishingFactor = Math.max(0.1, distanceFromMax / 100);
        return Math.round(baseGain * diminishingRate * diminishingFactor);
    }

    function calculateImpactWeightBonus(quest, characterStreaks) {
        const baseWeight = quest.impactWeight;
        const streakMultiplier = calculateStreakMultiplier(quest.streak.current);
        return baseWeight * streakMultiplier;
    }

    function updateStreak(questId, completed) {
        const quest = state.quests.find(q => q.id === questId);
        if (!quest) return;

        if (completed) {
            quest.streak.current += 1;
            quest.lastCompleted = new Date();

            // Update character streaks if this quest has a streak
            if (state.character.streaks[quest.text.toLowerCase().split(' ')[0]]) {
                state.character.streaks[quest.text.toLowerCase().split(' ')[0]].current += 1;
                state.character.streaks[quest.text.toLowerCase().split(' ')[0]].lastCompleted = new Date();
            }
        } else {
            quest.streak.current = 0;
        }

        if (quest.streak.current > quest.streak.longest) {
            quest.streak.longest = quest.streak.current;
        }
    }

    function calculateWeeklyStats() {
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const completedThisWeek = state.quests.filter(q =>
            q.lastCompleted && q.lastCompleted >= weekAgo
        ).length;

        state.character.weeklyStats.questsCompleted = completedThisWeek;
        state.character.weeklyStats.totalQuests = state.quests.length;
        state.character.weeklyStats.xpGained = state.quests
            .filter(q => q.lastCompleted && q.lastCompleted >= weekAgo)
            .reduce((sum, q) => sum + q.xp, 0);
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
        calculateWeeklyStats();
    }
    
    function renderCharacterSheet() {
        if (document.getElementById('char-level')) {
            const { level, xp, xp_needed, evasionPoints, gold, streaks, weeklyStats } = state.character;

            // Basic info
            document.getElementById('char-level').innerHTML = `Alex <span class="text-sm font-medium text-slate-500">Lv. ${level}</span>`;
            document.getElementById('evasion-points').textContent = evasionPoints;
            document.getElementById('char-gold').textContent = gold;

            // XP progress
            document.getElementById('xp-bar').style.width = `${Math.max(0, (xp / xp_needed) * 100)}%`;
            document.getElementById('xp-text').textContent = `${xp} / ${xp_needed} XP`;
            document.getElementById('xp-to-next-level').textContent = xp_needed - xp;

            // Advanced metrics
            document.getElementById('overall-level').textContent = level;
            document.getElementById('active-streaks-display').textContent = Object.values(streaks).filter(s => s.current > 0).length;
            document.getElementById('weekly-xp-gain').textContent = weeklyStats.xpGained;
            document.getElementById('weekly-quests').textContent = `${weeklyStats.questsCompleted}/${weeklyStats.totalQuests}`;
            document.getElementById('weekly-stat-gain').textContent = `+${weeklyStats.averageStatGain}`;

            // Calculate efficiency (quests completed this week / total quests)
            const efficiency = Math.round((weeklyStats.questsCompleted / weeklyStats.totalQuests) * 100);
            document.getElementById('stat-efficiency').textContent = `${efficiency}%`;

            // Render detailed stats
            renderDetailedStats();

            // Render recent activities
            renderRecentActivities();
        }
    }

    function renderDetailedStats() {
        const container = document.getElementById('detailed-stats');
        if (!container) return;

        container.innerHTML = '';

        Object.entries(state.character.stats).forEach(([statName, statData]) => {
            const statEl = document.createElement('div');
            statEl.className = 'bg-slate-50 p-4 rounded-lg';

            const trendDirection = statData.trend[statData.trend.length - 1] > statData.trend[statData.trend.length - 2] ? '↗' : '↘';
            const trendColor = trendDirection === '↗' ? 'text-emerald-600' : 'text-red-600';

            statEl.innerHTML = `
                <div class="flex justify-between items-center mb-2">
                    <h4 class="font-semibold capitalize ${getStatColor(statName)}">${statName}</h4>
                    <span class="text-xs ${trendColor} font-semibold">${trendDirection}</span>
                </div>
                <div class="text-2xl font-bold mb-2">${Math.round(statData.current)}</div>
                <div class="space-y-1 text-xs">
                    ${Object.entries(statData.subStats).map(([subStat, value]) =>
                        `<div class="flex justify-between">
                            <span class="capitalize">${subStat}:</span>
                            <span class="font-medium">${Math.round(value)}</span>
                        </div>`
                    ).join('')}
                </div>
                <div class="mt-2 text-xs text-slate-500">
                    Base: ${Math.round(statData.base)} | Trend: ${statData.trend.slice(-3).join(', ')}
                </div>
            `;
            container.appendChild(statEl);
        });
    }

    function renderRecentActivities() {
        const container = document.getElementById('recent-activities');
        if (!container) return;

        container.innerHTML = '';

        // Get recent quest completions
        const recentQuests = state.quests
            .filter(q => q.lastCompleted)
            .sort((a, b) => new Date(b.lastCompleted) - new Date(a.lastCompleted))
            .slice(0, 5);

        recentQuests.forEach(quest => {
            const activityEl = document.createElement('div');
            activityEl.className = 'flex justify-between items-center text-sm';

            const timeAgo = Math.floor((new Date() - new Date(quest.lastCompleted)) / (1000 * 60 * 60));
            const timeText = timeAgo < 24 ? `${timeAgo}h ago` : `${Math.floor(timeAgo / 24)}d ago`;

            activityEl.innerHTML = `
                <span class="text-slate-600">${quest.text}</span>
                <div class="flex items-center space-x-2">
                    <span class="text-emerald-600 font-semibold">+${quest.xp} XP</span>
                    <span class="text-slate-400 text-xs">${timeText}</span>
                </div>
            `;
            container.appendChild(activityEl);
        });
    }

    function getStatColor(statName) {
        const colors = {
            vitality: 'text-red-600',
            cognition: 'text-blue-600',
            resilience: 'text-green-600',
            prosperity: 'text-yellow-600'
        };
        return colors[statName] || 'text-slate-600';
    }

    function renderQuests(filter = 'all') {
        const questList = document.getElementById('quest-list');
        if (questList) {
            questList.innerHTML = '';

            const filteredQuests = filter === 'all'
                ? state.quests
                : state.quests.filter(q => q.stat === filter);

            filteredQuests.forEach(quest => {
                const questEl = document.createElement('div');
                questEl.className = 'p-4 bg-slate-50 rounded-lg border border-slate-200';
                questEl.dataset.category = quest.stat;

                const rewardHtml = quest.rewardGold ? `<span class="text-xs font-bold text-yellow-500 mr-2">+${quest.rewardGold} G</span>` : '';
                const streakBonus = calculateStreakMultiplier(quest.streak.current);
                const impactBonus = calculateImpactWeightBonus(quest, state.character.streaks);

                questEl.innerHTML = `
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center mb-2">
                                <input type="checkbox" id="quest-${quest.id}" data-id="${quest.id}" class="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500 cursor-pointer" ${quest.done ? 'checked' : ''}>
                                <label for="quest-${quest.id}" class="ml-3 text-sm font-medium ${quest.done ? 'text-slate-400 line-through' : 'text-slate-700'} cursor-pointer">${quest.text}</label>
                            </div>

                            <div class="ml-7 space-y-1">
                                <div class="flex items-center justify-between text-xs">
                                    <span class="text-slate-500">Impact Weight:</span>
                                    <span class="font-semibold text-sky-600">${quest.impactWeight} → ${impactBonus.toFixed(2)}x</span>
                                </div>

                                <div class="flex items-center justify-between text-xs">
                                    <span class="text-slate-500">Streak:</span>
                                    <span class="font-semibold ${getStatColor(quest.stat)}">${quest.streak.current} days (${streakBonus.toFixed(2)}x)</span>
                                </div>

                                <div class="flex items-center justify-between text-xs">
                                    <span class="text-slate-500">Category:</span>
                                    <span class="px-2 py-1 bg-white rounded text-xs font-medium ${getStatColor(quest.stat)}">${quest.category}</span>
                                </div>
                            </div>
                        </div>

                        <div class="text-right ml-4">
                            <div class="flex items-center mb-1">
                                ${rewardHtml}
                                <span class="text-sm font-bold text-emerald-600">+${quest.xp} XP</span>
                            </div>
                            <div class="text-xs text-slate-500">Base gain</div>
                        </div>
                    </div>
                `;
                questList.appendChild(questEl);
            });

            questList.querySelectorAll('input[type="checkbox"]').forEach(cb =>
                cb.addEventListener('change', e => handleQuestToggle(parseInt(e.target.dataset.id), e.target.checked))
            );
        }

        // Render streak summary
        renderStreakSummary();
    }

    function renderStreakSummary() {
        const container = document.getElementById('streak-summary');
        if (!container) return;

        container.innerHTML = '';

        Object.entries(state.character.streaks).forEach(([streakName, streakData]) => {
            if (streakData.current > 0) {
                const streakEl = document.createElement('div');
                streakEl.className = 'flex justify-between items-center text-sm';

                streakEl.innerHTML = `
                    <span class="capitalize text-slate-600">${streakName}:</span>
                    <div class="flex items-center space-x-2">
                        <span class="font-semibold text-emerald-600">${streakData.current} days</span>
                        <span class="text-xs text-slate-400">Best: ${streakData.longest}</span>
                    </div>
                `;
                container.appendChild(streakEl);
            }
        });
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

    // Quest filtering functionality
    const questFilters = document.querySelectorAll('.quest-filter');
    if (questFilters.length > 0) {
        questFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                // Update active filter button
                questFilters.forEach(f => {
                    f.classList.remove('bg-sky-500', 'text-white');
                    f.classList.add('bg-white', 'text-slate-600');
                });
                e.target.classList.add('bg-sky-500', 'text-white');
                e.target.classList.remove('bg-white', 'text-slate-600');

                // Filter quests
                const category = e.target.dataset.category;
                renderQuests(category);
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
        quest.lastCompleted = isDone ? new Date() : null;

        const { character } = state;

        if (isDone) {
            // Update streak
            updateStreak(questId, true);

            // Calculate advanced stat gain with diminishing returns and impact weights
            const baseStatGain = 5;
            const impactBonus = calculateImpactWeightBonus(quest, character.streaks);
            const streakMultiplier = calculateStreakMultiplier(quest.streak.current);
            const actualStatGain = calculateDiminishingReturn(
                character.stats[quest.stat].current,
                baseStatGain * impactBonus * streakMultiplier,
                quest.diminishingReturn
            );

            // Update main stat
            character.stats[quest.stat].current = Math.min(100, character.stats[quest.stat].current + actualStatGain);
            character.stats[quest.stat].trend.push(character.stats[quest.stat].current);
            character.stats[quest.stat].lastUpdated = new Date();

            // Update sub-stat specifically
            if (quest.subStat && character.stats[quest.stat].subStats[quest.subStat] !== undefined) {
                character.stats[quest.stat].subStats[quest.subStat] = Math.min(100,
                    character.stats[quest.stat].subStats[quest.subStat] + actualStatGain * 1.2
                );
            }

            // Update XP with streak bonus
            const xpBonus = Math.floor(quest.xp * streakMultiplier);
            character.xp += xpBonus;

            // Update gold rewards
            if (quest.rewardGold) {
                character.gold += quest.rewardGold;
            }

            // Level up logic
            while (character.xp >= character.xp_needed) {
                character.xp -= character.xp_needed;
                character.level++;
                character.xp_needed += character.base_xp_increment;
            }

        } else {
            // Reset streak when quest is unmarked
            updateStreak(questId, false);

            // Reduce stats (less severe penalty)
            const statReduction = 2;
            character.stats[quest.stat].current = Math.max(0, character.stats[quest.stat].current - statReduction);

            if (quest.subStat && character.stats[quest.stat].subStats[quest.subStat] !== undefined) {
                character.stats[quest.stat].subStats[quest.subStat] = Math.max(0,
                    character.stats[quest.stat].subStats[quest.subStat] - statReduction * 1.2
                );
            }

            // Reduce XP (less severe penalty)
            const xpReduction = Math.floor(quest.xp * 0.5);
            character.xp = Math.max(0, character.xp - xpReduction);

            // Reduce gold rewards
            if (quest.rewardGold) {
                character.gold = Math.max(0, character.gold - Math.floor(quest.rewardGold * 0.5));
            }

            // Level down logic (only if XP is very low)
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

            // Calculate stat details for tooltips
            const statDetails = {};
            Object.entries(state.character.stats).forEach(([statName, statData]) => {
                const subStatsText = Object.entries(statData.subStats)
                    .map(([subStat, value]) => `${subStat}: ${Math.round(value)}`)
                    .join('\n');

                statDetails[statName] = `${statName.charAt(0).toUpperCase() + statName.slice(1)}\nCurrent: ${Math.round(statData.current)}\nBase: ${Math.round(statData.base)}\nTrend: ${statData.trend.slice(-3).join(' → ')}\n\nSub-stats:\n${subStatsText}`;
            });

            statsChart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: Object.keys(state.character.stats).map(s => s.charAt(0).toUpperCase() + s.slice(1)),
                    datasets: [{
                        label: 'Character Stats',
                        data: Object.values(state.character.stats).map(s => s.current),
                        backgroundColor: 'rgba(56, 189, 248, 0.2)',
                        borderColor: 'rgb(14, 165, 233)',
                        pointBackgroundColor: 'rgb(14, 165, 233)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(14, 165, 233)',
                        borderWidth: 2
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const statName = Object.keys(state.character.stats)[context.dataIndex];
                                    return statDetails[statName];
                                }
                            },
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: 'white',
                            bodyColor: 'white',
                            borderColor: 'rgb(14, 165, 233)',
                            borderWidth: 1
                        }
                    },
                    scales: {
                        r: {
                            suggestedMin: 0,
                            suggestedMax: 100,
                            pointLabels: {
                                font: { size: 14, weight: 'bold' },
                                callback: function(label) {
                                    return label;
                                }
                            },
                            angleLines: { display: true, color: 'rgba(0, 0, 0, 0.1)' },
                            grid: { color: 'rgba(0, 0, 0, 0.1)' },
                            ticks: {
                                backdropColor: 'rgba(0,0,0,0)',
                                stepSize: 20,
                                font: { size: 12 }
                            }
                        }
                    }
                }
            });
        }
    }

    function updateStatsChart() {
        if (statsChart) {
            statsChart.data.datasets[0].data = Object.values(state.character.stats).map(s => s.current);
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

        // Initialize quest filtering to show all quests by default
        renderQuests('all');
    }

    init();
});
