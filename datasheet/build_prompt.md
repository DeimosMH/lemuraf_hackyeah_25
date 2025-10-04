LeveLife: The Life Navigation RPG

Core Concept: Odyssey is a full-stack, cross-platform life management system that transforms the user's personal growth, long-term goals, and daily logistical challenges into an engaging, multi-faceted Role-Playing Game (RPG). Every positive action, every successful habit, and every timely decision contributes to the user's "Future Self" character development.

Target Audience: Proactive individuals who value personal growth, struggle with long-term goal consistency, and seek a more engaging, gamified approach to managing daily life and travel.

Technical Blueprint: Server-based architecture (like Habitica) using a modern, type-safe full-stack monorepo (e.g., Next.js, tRPC, Prisma, with Expo/React Native for universal mobile/desktop deployment).

I. Character Sheet & Daily Quests (The "Game-Life Tab")

This is the core gamification engine, focused on Human Performance and daily accountability.

1. Primary Character Stats

The user’s avatar level is determined by four primary, interconnected stats (blending physical, cognitive, and financial health):

1. VITALITY (HP/Stamina): Tracks physical health, sleep quality, and fitness.

Habit Example: Completing a workout, getting 7+ hours of sleep.

2. COGNITION (Mana/Skill): Tracks learning, focus, and mental acuity.

Habit Example: 30 minutes of deep work, completing a course module, reading a book chapter.

3. RESILIENCE (Armor/Defense): Tracks stress management and emotional well-being (Real-time Stress Tracking).

Habit Example: Meditation, journaling, spending time in nature.

4. PROSPERITY (Gold/Fortune): Tracks financial habits and savings.

Habit Example: Tracking daily spending, investing, saving a set amount.

2. Daily & To-Do Quests

Users set "Daily Quests" (recurring habits) and "To-Do Quests" (one-time tasks). Completion awards XP (for overall character level) and Gold (for in-game items/theme unlocks).

Gamification Hooks: Leaderboards, visual streaks, collecting gear/titles.

Social API: "Party System" for groups to tackle shared quests (e.g., a "Team Fitness Challenge") and collaborate on group-based goals.

II. Logistics Dashboard (The "Plan" Tab)

This section focuses on minimizing stress and disruption in daily logistics and travel, tackling the Public Transport challenge.

1. The Oracle: Disruption Prediction System

This is the central solution to the public transport challenge.

Function: Integrates real-time operator data, crowd-sourced reports, and predictive analytics to determine the risk level of scheduled trips.

Input Data: Real-time train/bus locations, delay reports, and historical data.

Output: Delay Risk Score (DRS) on the user's scheduled trips (e.g., "High Risk, 25-min predicted delay").

Gamification: If a user successfully follows the Oracle's rerouting advice and avoids a predicted delay, they earn Evasion Points and a bonus to their RESILIENCE stat.

2. Travel Quests & Inventory

This addresses the Travel/Exploration challenge (Calmcations, Cultural Exchange).

Recharge Quests (Calmcations): Guided trips based on user interests, prioritizing low-stress, wellness-focused destinations. Successfully completing a Recharge Quest grants a temporary Vitality Buff.

Cultural Exchange Missions: Tasks that require interacting with local culture (e.g., "Attend a local market," "Learn 5 words in the native language").

In-App Payments: A simple, integrated "Merchant" API to pay for tickets/bookings related to successful Quests, reinforcing the seamless flow of the game-life.

III. The Future Self Simulator (The "Future" Tab)

This section tackles the Life Run challenge by visualizing the long-term impact of daily choices.

1. Setting the Epic Challenges (1 Year)

Users define 3 major "Epic Challenges" (1-Year Goals) across different aspects of their lives (e.g., "Launch My Business," "Complete a Marathon," "Pay off Debt").

2. Milestone Habits (Monthly)

Each Epic Challenge is broken down into "Milestone Habits" (monthly goals). The successful completion rate of these Milestone Habits is the key input for the simulation.

3. The Life Run Simulation

The system uses the user’s current 30-day average success rate in their Daily and Milestone Habits to project the likely outcome of their 1-Year Epic Challenges.

Visual Feedback: A dynamic graph and narrative that shows the user's projected Future Self:

High Success Rate: "Projected Future Self: Level 45, High Prosperity and Vitality, Epic Challenge Success: 90%."

Low Success Rate: "Projected Future Self: Level 12, Low Prosperity and High Stress, Epic Challenge Success: 20%."

Core Principle: This directly presents the long-term consequences of everyday choices in an engaging, visual way, answering the "Life Run" prompt.

IV. The Guild Hall (The "Interests" Tab)

This section fosters community and local exploration.

Interest Tags: Users tag their hobbies (e.g., "Hiking," "Photography," "Coding").

Local Side Quests: Odyssey matches the user to local, real-world events based on their Interest Tags.

Guild System: Creates permanent, interest-based groups. These Guilds can initiate collaborative "Raid Challenges" (e.g., a local hackathon or a group hike).

use information about gamification in education\
\`\`\`\
The Gamification in Education
Maciej Hejlasz
University of Southern Denmark
The Faculty of Engineering
Campusvej 55, 5230 Odense, Denmark
[mahej21@student.sdu.dk](mailto:mahej21@student.sdu.dk)Abstract—Given the interactive media characteristics, com-
puter games have potential and are very effective teachers that
affect players in multiple domains. Studies on the learning effects
of games have shown better results than traditional media. This
work presents a comparative study that thoroughly investigates
the effects of video games, their interactivity and media richness
on the players, and how to use it for its own benefit.
Index Terms—Computer games, entertainment, education, in-
teractivity
I. I NTRODUCTION
Video games which are arguably one of the most so-
phisticated forms of information technology to this date are
influencing the world higher and higher every year, including
education. According to research from 2013, 97% people till
adolescent lives were playing at least one hour per day in
USA \[1\]. “The vast majority of research by psychologists on
the effects of “gaming” has been on its negative impact: the
potential harm related to violence, addiction, and depression.
There is recognition of the value of that research; however,
one can argue that a more balanced perspective is needed, one
that considers not only the possible negative effects but also
the benefits of playing these games.” \[1\]. And yet despite the
focus on the negative features of games on society for more
than 20 years researchers have been using video games for
researching individuals and as societal experiments that are
increasingly used. How an individual can use it for their own
advantage? By understanding how certain aspects of a game
can develop specific skills and implementing them in life.
In the first part, there is a delve into the current state
and attempts at gamification in the world, followed by a
look at what characterizes a good game and what designers
look for when creating games. Then how one of the most
successful gamification frameworks currently works and is
used. Further how to combine the good game design directive
with the gamification framework in making a difference in the
education system. And finally, with the condition that when
the game is more fun the higher advantage player can have
from, a summary of the impact, the opportunities it brings, and
the potential for future use of video games and gamification
in education are discussed in the conclusion in the article.
II. C URRENT S TATE OF G AMIFICATION
Nowadays, almost every student in a developed or develop-
ing country has access to a computer and the internet and, as
video games are becoming more influential and mature as a
form of entertainment thanks to advances in technology and
ubiquitous availability via the internet and platforms such as
steam, the greater the potential for their use in the education
for the next generation as exercises or teaching materials, as
well as for the gradual gamification of certain parts of the
current education system.
The question is how to use video games and make gam-
ification of the education system work so that it brings the
most significant benefits to the recipient - the learner or player
as both are correct. A partial answer to this question that
imposes itself on every gamer is the high-quality gameplay, the
storyline, the art design, graphics, and the last is the challenge.
And yet simulations that are most commonly used in education
today, in comparison with games which are widely regarded as
fun, are crude and devoid of entertainment leading to reduced
involvement and interest in the subject.
However, teaching institutions, to keep up with technologi-
cal change, increasing demands for knowledge of the material
after starting a career in higher education, competition, and
changing approach in society, must gradually develop. The
pioneers that of currently under development of game-like
experience are, among others: The University of Pennsylva-
nia, Wharton School of Business Wharton’s Alfred West Jr.
Learning Lab has fostered the development of more than 30
games for supplementing business education courses.
Bristol University where Paul Howard-Jones preaches and
several of his graduate-level courses in educational neuro-
science are taught using his TWIG (teaching with immersive
gaming) method.
The Kanda University of International Studies where the
English language is taught through video gaming. \[3\]
Massachusetts Institute of Technology, National Science
Foundation, Siegel Family Endowment, LEGO Foundation
which created Scratch (<https://scratch.mit.edu>) and Microsoft
Kodu Game Lab that is used to teach the younger generation
basics of programming and animations, yet is very similar to
the game.
And the icing on the cake Minecraft Education Edition with
support of the python scripts.
Despite the plethora of tools, opportunities, research con-
firming the positive effects of gamification, technological
change, and time, there has been little action to increase the
level of learning through game-like experiences on a larger
scale. It is also worth noticing that the experiential educationthat introduces game-like experience is more relevant than ever
thanks to the presence of COVID-19.
So it’s worth trying to ask the question what drives, what
are the characteristics, the ingredients of the successful games.
What gamification models, research, and results exist. And
finally how to combine and use this in education.
III. T HE P LAYER
“But when I come to think more on it, the biggest reason it
has become that popular is Mr. Tajiri, the main developer and
creator of Pokemon, didn’t start this project with a business
sense. In other words, he was not intending to make something
that would become very popular. He just wanted to make
something he wanted to play. There was no business sense
included, only his love involved in the creation. Somehow,
what he wanted to create for himself was appreciated by others
in this country and is shared by people in other countries.
...And that’s the point: not to make something sell, something
very popular, but to love something, and make something that
we creators can love. It’s the very core feeling we should have
in making games.”
— Shigeru Miyamoto, talking about the creation of Pokemon
\[5\]
When creating games (this problem is especially true for
educational games) or the gamification of certain activities,
there can be a problem due to the focus on the knowledge itself
to be imparted during the activity. Forgetting or not paying
attention that sharing the knowledge itself is not making the
game experience enjoyable and even though the result can
be better than the standard type of teaching, with such an
approach it will not give as good results as could by exploiting
the potential of what makes games addictive. For the best
outcome, this approach should be avoided as this is the recipe
for failure, which in the case of game companies there is a
problem of “reuse” of what players liked last year. “Often
game designers are so bereft of an idea of what will be fun
and what gamers want that they instead only include gameplay
ideas that have been tried before, rehashing what was popular
with game players last year” \[5\]
While the first thing before the creation of a successful game
should be the question: Is it fun?
Then connection of the second part as the thing to deliver.
What would be the game that you would play —fun part—
and at the same time would provide the information you want
to provide —purpose—?
While these basics are mostly a subjective part, it is worth
paying attention to aspects of what players want and expect.
A. Want Part
It is worth noting that even though some of the “Want Parts”
seem to be contradictory, they can be applied in one game.
For example “Socialize” and “Solitary Experience” as “Want
Parts” are in the game that has both multiplayer and single-
player modes.

 1. Challenge: As one of the basic expectations of the
    game is a challenge where the most common and basic
    implementation is the difficulty level that player can choose
    to be individually adapted. There is joy and the knowledge
    that remains after overcoming a challenge in a game, and
    properly implemented challenge is the fundamental of the
    game design. The example of games is Tetris with Physical
    coordination (speed and reaction time), Pac-Man - Conflict
    (survival), Civilization - Economic ( accumulating resources),
    Doom - Conflict (survival) & Exploration (finding hidden
    passages) and other games. \[6\] For proper implementation
    of challenge (that is - making the game balanced) in-game
    “The Concept of Flow” created by Mihaly Csikszentmihalyi
    is used which determines the appropriate level for the player
    depending on their skills \[9\]
    Fig. 1. Flow Channel (Csikszentmihalyi 1990, Flow: The psychology of
    optimal experience. \[11\])
    The basic application of it would be difficulty modes as
    previously mentioned, on the other hand, more advanced use is
    in system Dynamic game difficulty balancing (DGDB) which
    automatically adjust difficulty based on feedback from player’s
    ability. The system used in Left 4 Dead is called The AI
    Director, or simply as AID \[10\].
 2. Interaction: Games are superior in terms of interactivity
    compared to other entertainment options and in this respect,
    they are also distinctive which makes it a reason for choosing
    a game over anything else. Interactivity within games has
    tremendous value, it is most heavily used, helps in the ex-
    planation of complex subjects, and is worth paying attention
    to \[7\] \[8\], especially when it should be used in research and
    education. Focusing on interactivity is one of the keys to
    success, yet the interactivity itself is not enough.
 3. Solitary Experience: Depending on the person solo
    games attract introverts, the person who has had enough
    interaction with other people, or somebody who wants to
    experience the story in the game. The motives and reason
    can be different yet the control over the level of play, the
    ability to play, stop and go whenever you want, the lack of
    team pressure from other players make solo games the basis
    of player expectations.4) Socialize: From playing with friends on Scrabble or
    Chess, Lan Party playing Warcraft to League of Legends with
    strangers or team. Enjoyment of spending time with friends or
    competing with strangers with the benefits of “being the best
    within statistics” or rewards in coins in case of current online
    multi-player games with modern connection and commonplace
    of internet connection makes people stay longer online within
    the game. But for many individuals, multiplayer games are
    time pleasantly spent with friends.
 4. Dynamism: The dynamism of the game with a nice
    graphic design makes the player focus and increases imersive-
    ness if implemented properly and the most important: makes
    the game less boring and more attractive.
 5. Explore: Curiosity is the critical cognitive function
    influencing human behavior and the main factor for motivation
    to explore. \[12\]
    “I have no special talents. I am only passionately curious.”
    — Albert Einstein
    Different levels in Super Mario or Ori and the Blind Forest,
    new enemies in Doom: Eternal or strategic choices in Stellaris
    fulfilling curiousness.
 6. Fantasize: The elements of fantasy are major com-
    ponents creating an interesting climate and adding color to
    the “gray” everyday life. Strange dangerous and intelligent
    creatures that player can interact often mixed with realistic
    physics Divinity 2: Ego Draconis, realistic space development
    and interaction with other aliens Stellaris or maybe another
    world filled with colors like in Ori and the Will of the Wisps
    or dark futurism SOMA. People enjoy being transported into
    a different, more colorful, or simply more interesting world
    than their own that creating a cultural strand called “escapism”
    which under current situation intensifying \[13\] \[14\]
    B. Expect Part
 7. Consistency: The game world must be consistent and
    comprehensible. If there is some sort of skill that is used by
    the player to attack it cannot fail for no apparent reason. Such
    mechanics make a person frustrated and such a game with it
    is often called “crap”.
 8. Reasonable Solutions to Work: Through the progress
    of the game by solving many challenges if the player will
    find a reasonable solution that will not work because the
    designer has not foreseen it makes the player frustrated. The
    less the designer predicts possible solutions to a scenario that
    the player can come up with, the more frustrating the game
    will be, or to put it more laconically, it will be more rubbish.
 9. Direction: A game with a strict objective, the goal of
    where the player should aim yet with a certain degree of
    freedom that gives the ability create their own story of victory.
    In Super Mario rescue of the princess and get & survive to the
    end of the level, in SimCity make dream city or in Warzone
    2100 to destroy the enemy. The SimCity goal is not explicit yet
    the foundation of what is the goal is based within the reality
    that is widely understood, making the player come up with
    their own goals. The concept is known as “software toy” - the
    player can do whatever they want without explicitly defined
    failure.
10. Immersion: By the proper pace of the game, look game
    flow \[9\], and depending from the individual, by realistic game
    world, good graphics, gameplay or other aspects of the game
    which create “presence”, the player can be immersed. Presence
    can be defined as “the extent to which a person’s cognitive
    and perceptual systems are tricked into believing they are
    somewhere other than their physical location” \[15\] and it can
    be easily shattered by bugs in the game.
11. Fair Chance: It should be possible in theory to get
    through the obstacle without fail. If the player cannot avoid
    failure with knowledge and skill this leads to frustration due
    to the short-sighted design of the gameplay.
12. Lack of Repetitiveness: Except for games with game
    mechanics based on repetition like Tetris, DOOM and FIFA
    the repetitiveness in games is and should be avoided. As if
    the same or similar task is given many times, or maybe the
    player finished a mundane task but there is no checkpoint or
    auto-save, the game will become simply mundane and boring.
13. Doing Instead of Watch: This is a typical problem for
    educational games and in some cases also with gamification.
    The long introduction to certain topics, in some cases with
    low quality which makes the experience even worse, makes it
    a typical stiff school experience effectively discouraging any
    major learning without being forced to. Just as interactivity
    characterizes games it should be used. The cut-scenes, intro-
    duction to topics should be short and give the player time for
    action and reward for its completion.
    IV. G AMIFICATION D ESIGN F RAMEWORK
    “According to the Entertainment Software Association,
    70% of major employers are already using gamification to
    enhance performance and training at their companies. In a
    similar report, the market research firm Gartner predicted that
    70% of Fortune 500 firms would use Gamification by the
    end of 2014... Unfortunately, in the same report, Gartner also
    predicted that 80% of those gamified efforts will fail due to
    bad design”
    — Yu-Kai Chou “Actionable Gamification” \[16\]
    The Octalysis Framework is a gamification design frame-
    work used to analyze and build strategies around various
    systems to make games engaging. It is presented in a figure


2) 

A. 8 Core Drives
Almost every successful game appeals at a greater degree
to certain Core Drives within us and motivates us towards a
variety of decisions and activities.

1. Epic Meaning & Calling: The belief that the action
   is for a higher purpose or the person is the chosen one to
   be able to accomplish the task greater than themselves. In
   Mass Effect player take actions that can not only save or
   exterminate planets with their natives but also life in the entireFig. 2. Octalysis gamification design framework with 8 Core Drives present \[4\]
   universe. As an example also Wikipedia is a good example
   as people contribute their time and knowledge to protect and
   share humanity’s knowledge, that is, for the greater good.
2. Development & Accomplishment: This core is empow-
   ered by the desire for developing skills, overcoming chal-
   lenges, and getting trophies for them. However, it should be
   noted that achievements are only meaningful thanks to the
   challenges.
3. Empowerment of Creativity & Feedback: When a
   person is committed in process of creative thinking figuring
   out how to solve the problems or challenges in different
   combinations. To empower this drive core more the player
   should not only have a way to express their creativity but
   also the result, feedback, and possibility to adjust the result.
   The Opus Magnum, Minecraft or Legos are good examples.
   “where a game designer no longer needs to continuously
   add additional content to keep the activity fresh and engaging.
   The brain simply entertains itself”
   — Yu-Kai Chou “Actionable Gamification” \[16\]
4. Ownership & Possession: This core is empowered
   thanks to the sensation ownership or control of something.
   Through ownership of something, there is an internal drive to
   improve, accumulate more of it (gold for example) or destroy.
   The virtual currency, loot boxes of which the infamous EA is,
   or the Sims in which player controls the entire life of the sim.
5. Social Influence & Relatedness: All elements of social
   influence that motivate people like acceptance, companionship,
   envy, and competitiveness. The relatedness when you feel
   nostalgia because the product reminds you of your childhood

- the people have a natural tendency to draw closer to things
  which can be relating to.

 6. Scarcity & Impatience: Rarity, exclusivity with the in-
    ability to get it immediately are a thing that can drive prices
    to heaven for some products and also these sensations are the
    empowerment of this drive core. In many online, especially
    mobile ones, games like Arcaea, Dragon Mania there are
    Appointment Dynamics or so-called “Torture Breaks” \[16\]
    where to get a reward or renew the energy you need to waithours. Lack of immediate acquisition motivating player to specific Core Drive. The site: \[19\] speeds up and facilitates the
    wait for it which result in getting back to the product more determination of the final result with graphical representation.
    often. This is also used in games as “daily rewards” almost
    Arguably, subjectivity may also have a large influence in
    universally used in newer multiplayer games, for example, this case, yet defining the parameters of the game mechanics
    Quake Champions.
    is not difficult and the result will likely be similar or the
 7. Unpredictability & Curiosity: In gambling, the result is same for different people.
    not fully predictable and the curiosity with a chance of getting
    “Of course, the Score itself is not very useful or actionable,
    a reward that makes the player try again. When something
    so
    I always tell my clients to focus on what Core Drive is
    deviates from the previous pattern the attention increases as
    lacking,
    instead of being obsessed with their “score.” ”
    it is perceived as interesting and it makes the player curious
    about the outcome.
    — Yu-Kai Chou ’[yukaichou.com](http://yukaichou.com)’ \[4\]
 8. Loss & Avoidance: It is natural for the player to do what
    they can to avoid defeat and beat the final boss in the game.
 9. Application of Gamification: The most crucial is the
    The possibility of a negative, harmful outcome motivates the identification of the game mechanics and assigning them to
    player to perform certain actions. Often used in ads is limited the Drive Cores, then analyzed to determine the score. The
    time offers and in games in the possibility of losing progress result will be so-called “Level 1 Octalysis”.
    if you will not log in.
    In most cases, any product/game that can be considered
10. —Hidden— Ninth Core Drive: Sensation: Sensation good has at least a higher score or potential in one of the
    Core is described as “physical pleasure one obtains from Octalysis Core Drives.
    taking an action” \[16\]. Which is based on physical feelings
11. Other Frameworks: Of course there are other gamifica-
    like touch, sight, smell, taste, nociception, and others that tion frameworks, for example: MDA framework, Werbach and
    drive trigger the taking of action as an example: petting the Hunter’s gamification framework, Schell’s gamification frame-
    cat, getting and writing messages, scratching oneself and even work, Dynamical model for gamification of learning (DMGL),
    getting drugs, drinking alcohol, or having sex.
    Integrative gamification framework, the Playful Experience
12. White and Black Hat Gamification: Top core drives on framework (PLEX framework) for gamification dynamics,
    a figure 2 are considered as mostly positive motivators and which are described in greater detail in book “Gamification in
    products/techniques utilizing it are White Hat Gamificators Learning and Education” \[18\]. Yet the Octalysis framework is
    that engage, make express creativity, and leave filling of currently most successful, commonly used and, if one looks
    successfulness and meaning. On the opposite side, the bottom deeper into it, the basics of operation are similar.
    Core Drives are considered as mostly negative motivators with
    V. G AMING E DUCATION S YSTEM
    the creation of Black Hat Gamificators through utilizing it that
    will leave a bad taste in the player’s mouth and in the longer A. Environment
    term are harmful and addictive. If the action to play, gamble or
    “To reach a point where educational games can provide
    buy is made due to not knowing what will happen next, by fear
    good
    educational value, high utility, and an interesting and
    of losing something it is probably Black Hat Gamified. On the
    motivating
    experience for students your school needs to be
    other hand, the high White Hat Gamification does not mean
    ready
    for
    them.
    Some games place higher requirements on
    that the game or product is necessarily good. For example,
    your
    environment
    than others - highly advanced games need
    it can be used to make induce the player to buy unnecessary
    advanced
    technology
    and game-savviness on the part of the
    things. On the other side, The Black Hat Gamification does
    teacher.
    If
    an
    environment
    does not have the right setup to
    not have to be used only for malicious actions or to exploit
    support
    a
    game,
    it
    won’t
    be
    very useful and it won’t be able
    the player, as many people voluntarily use it to improve their
    to
    provide
    good
    educational
    value
    nor a good experience.”
    lifestyle, health, or increase productiveness. However, it cannot
    be denied the use of psychological tricks to exploit a player,
    —Björn Berg Marklund “Working with Educational Games” \[17\]
    making him addicted, get the most of the information, and
    obtain the maximum amount of money. It is very common
    The environment and the approach are the key features that
    practice by companies like EA, Zynga, Gameloft and many can make successful the use of game-like education. Starting
    others.
    a new project with new technology introduced into classrooms
    Yet for the introduction of gamification to be successful, is time-consuming and also depends on the infrastructure. And
    all 8 Core Drives should be examined and evaluated to obtain the state of these aspects is subjective to the individual and
    the best result and in this case, the most productive, fun, and institution.
    overall positive impact.
    By simplification of the design application, reducing re-
13. Obtaining score: To get the score, an analysis of the quirements, and enabling offline operation of the application
    selected subject that is performed using all the data, knowledge (if a student loses connection/is unstable the quizzes, tasks,
    about the product, and personal judgment, is required with and progress are still available) it is possible to reduce the
    assessment from 0 to 10, that squared is assigned to the negative impact of immediate change.If a high-tech game or application is to be used for which
    your environment is inadequate, the result may be worse than
    with standard methods as shown in the chart in figure 3.
    Fig. 3. Conditions and use of games (“Working with Educational Games”
    \[17\])
    level (new chapter in subject) and negative life points for lack
    of execution in time.
    And from the student’s perspective simple, standardized
    design as shown in figure 4.
14. Gamification of a Meeting: Setting a clear objective -
    summary of what students/players should learn on the up-
    loaded document. Short - max 10 or 15 minutes of explanation
    of uploaded material (containing explanation and references)
    with prepared quizzes with points on ItsLearning, Quizlet, or
    own site in which progress send to the teacher. Tasks to do on
    Codewars (the site used by employers for the recruitment of
    programmers) or on own website that unlocks other people’s
    answers by honoring the best ones.
    Quizzes and tasks that unlock progress for solutions/other
    materials increase the activity of the student and make the
    lecture enjoyable if properly implemented.
    To make even higher attention it’s good to make the gam-
    ified lecture more: visually pleasing, rewarding (gamelike),
    creating competition between two competing individuals or
    groups - competitiveness.
    VI. C ONCLUSION
    B. Use of Current Solutions
    By using currently available programs, games, and tools that
    are mostly free and have been tested reduces costs and allows
    faster or immediate implementation. For example Habitica,
    Todoist Karma or Bounty Tasker which are used as game-like
    life productivity tools. It is also worth referring to successful
    tools and creating a learning tool based on an existing solution.
    For instance SoloLearn and Duolingo are used as learning apps
    similar to the games.
    C. Creation of new Solutions
    On the other hand, by creating its tools or modification of
    existing tools and programs the institution is in full control of
    implemented mechanics and safety, which allows the gradual
    introduction of mechanics to the institution. Yet by deciding
    to create a game, application as a basis for teaching, for it to
    be successful there is a need to be the focus on the player as
    referred on the third part and proper implementation of the
    White Hat Gamification referred in part four.
    D. Ideas for Implementation in Institution
15. ItsLearning as a Game: The basic of implementing
    gamification should be of the breakdown of a complex topic
    to simple tasks as quests, quiz assessment with the allocation
    of points as a prize.
    Simple application available on every platform with options
    from the teacher side: - Schedule meeting - Create Quiz -
    Create Assessment - Upload Material (Drag & Drop function
    is very intuitive and useful) - Play.
    By playing/quiz/assessment it can also use external apps
    or environments to teach. For example automatic install of
    MatLab, Visual Studio of Unity with prepared tasks and
    examples by teacher and institution. For every task there could
    be points used as a currency for evaluation, unlocking new
    Gamification in any aspect of education can have directly
    proportional effects if properly implemented using tried and
    tested methods. Based on the fun aspect, the fact that work,
    the school can be entertainment in itself is still inconceivable
    to some people, however, thanks to modern technological and
    social progress it is slowly becoming a reality. It is likely to
    be progressively more strongly implemented thanks to current
    successes in corporations, changes in public attitudes, and
    further development of technology.
    On the other hand, it is difficult at the moment to determine
    the negative impact gamification may have, yet given the
    increasing amount of time spent in front of the monitor by the
    majority of the population it will have an additional, indirect
    effect. But gamification does not have to take place in the
    realm of computers and new technologies either, instead, it
    can be implemented through the board and fun gamification
    methods that have a similar level of effectiveness.
    R EFERENCES
    \[1\] A. Lobel, R. Engels “The Benefits of Playing Video Games” American
    Psychologist, Dec 2013.
    \[2\] A. Utoyo “Video Games as Tools for Education” Journal of Game, Game
    Art, and Gamification (JGGAG) At: Jakarta, Indonesia, Dec 2018.
    \[3\] “18 Ways Universities are Using Video Games in Learning”,
    TeachThought site.
    \[4\] Yu-kai Chou, “The Octalysis Framework for Gamification & Behavioral
    Design”.
    \[5\] R. Rouse III “Game Design: Theory & Practice Second Edition”,
    Wordware Publishing, Inc. 2005.
    \[6\] Adams and Rollings, “Fundamentals of Game Design”, University of
    North Carolina at Chapel Hill site.
    \[7\] Fei Yu, Xueyong Liang, “The Research of Kinect Technology Based
    Interactive Game Product Design for Preschoolers”, Nicograph Interna-
    tional (NicoInt) 2016.
    \[8\] M. Pohl, T. Wien, M. Rester, P. Judmaier, “Interactive Game Based
    Learning: Advantages and Disadvantages”, Universal Access in Human-
    Computer Interaction. Applications and Services, 5th International Con-
    ference, UAHCI 2009.\[9\] “Dynamic Game Difficulty Balancing”, Game Art & Design Department
    of ICAT Design and Media College 2019.
    \[10\] “The Director”, Left 4 Dead Wiki site.
    \[11\] S. Lindemann “Product Flow — What Product Management can learn
    from Psychology” May 2016.
    \[12\] “The Psychology of Curiosity”, Ourhumanminds site.
    \[13\] B. Hester “Quarantine Has Made Video Games About More Than
    Escapism” 2020.
    \[14\] F. Garcia “Escaping lockdown into a world of video games is nothing
    to feel guilty about” May 2020.
    \[15\] E. Patrick, D. Cosgrove, A. Slavkovic, J. Rode, T. Verratti, & Chiselko,
    G. “Using a large projection screen as an alternative to head-mounted
    displays for virtual environments”, Proceedings of the SIGCHI Confer-
    ence on Human Factors in Computing Systems 2000.
    \[16\] Yu-kai Chou, “Actionable Gamification” 2015.
    \[17\] Björn Berg Marklund “Working with Educational Games”, University
    of Skövde, 2014
    \[18\] S. Kim, K. Song, B. Lockee, J. Burton, “Gamification in Learning and
    Education”, Springer 2018
    \[19\] Tool for graphical representation of Octalysis:
    <https://yukaichou.com/octalysis-tool/.Fig>. 4. Examplanary design of an application

```plaintext


Adjusting concept of app for task that have:
```

```plaintext

Reimagine the way we explore the world! Whether it’s making travel safer, more sustainable, or simply more enjoyable, we want to see your best ideas in action. Consider how technology can address the rising trend of "calmcations", find a way that helps travelers recharge, design a platform for meaningful cultural exchanges, or a new way to navigate cities stress-free. From eco-friendly trip planning to smarter safety solutions, show us how your idea can make travel more enriching and hassle-free for everyone.



Unlock the full potential of the human body! This challenge is all about blending health, science, and technology to push human performance to the next level. Build an app, device, or system that enhances cognitive function, improves sleep, or boosts physical fitness. Think real-time stress tracking, personalized nutrition insights, or smart workout planning. Whether it’s a mindfulness app that helps with focus or a revolutionary health gadget, show us how tech can supercharge well-being.



Delays and disruptions are an everyday challenge for millions of public transport passengers. Too often, information about these issues arrives too late, is incomplete, or scattered across multiple sources. Without a fast and consistent flow of data between operators, dispatch systems, and passengers, travelers are left relying on fragmented updates — turning trip planning into little more than guesswork. The impact is most visible when every minute counts: on trains, buses, and city transit. While modern technology makes it possible to gather information in real time, the real challenge lies in integrating, verifying, and delivering it in a way that truly supports passengers.



The question is: how can passengers stay one step ahead of disruptions? How can we give them the insights they need to make better decisions, respond faster to changes, and just maybe... save more than a few missed appointments?



Life is a constant sequence of decisions that shape the future – from education and career choices, through lifestyle and relationships, to financial security in old age. In the rush of everyday life, we rarely reflect on the long-term impact of our actions. How do overwork, lack of savings, or neglecting health affect quality of life later on? And on the other hand – how can investing in education, nurturing passions, or maintaining balance between work and family contribute to greater stability and fulfillment in the future? The simulation game Life Run poses a fundamental question: what does a well-planned life really mean? It is not only about finances, but also about health, relationships, and a sense of satisfaction. As part of this challenge, participants will explore these complexities and look for ways to present the consequences of everyday choices in an engaging and accessible way.```
```