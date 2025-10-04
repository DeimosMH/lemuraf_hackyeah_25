# Concept design of app

The app can be  divided into 4 parts
1. Event life
2. Routine life
3. Flow - feedback that is based on data from both to adjust charts and chalenges for both parts   
4. Life Run - behavioral modeling and Monte Carlo-style projections to visualize the long-term impact of your daily choices across health, career, and personal development based on gathered data

## Event life

### Planned Events

1.
You enter your preferences, what you like, etc., and set filters:
date, price, number of people, category

Scraper finds events with Eventim Biletin, etc.

You can also search by name. You can even use the website API.

Filters, preferences, and search results are sent to the AI. The AI ​​provides suggestions for the most relevant results in a precisely defined format via prompt.

Control AI checks the correctness of the format and the reasonableness of the responses.

2.
AI returns:
- suggested events
- links to the purchase page
- maybe illustrations

3.
In the GUI:
- A beautifully illustrated list of found items
- Suggested choices based on your history
- Option to purchase a ticket, etc.
After purchase:
- Event details
- Event calendar

### Local events

1. 
You enter your preferences, what you like, etc., and set filters:
date, price, number of people, category

Scraper finds public events based on location, 
eg., from classifieds sites like Facebook, etc.

You can also search by name; you can even use the website API.

Filters, preferences, and search results are sent to the AI. The AI ​​provides suggestions for the most relevant ones in a precisely defined format via prompt.
Control AI checks the correctness of the format and the reasonableness of the responses.

2.
AI returns:
- suggested events
- links to a page with information
- maybe illustrations

3. 
In the GUI:
- A beautifully illustrated list of found items
- Suggested choices based on your history
After purchase:
- Event details
- Event calendar

### Private Events 

1. 
It's simply a GUI that you can add, like in a calendar event.

For example, you can request an idea and then use the form to specify what you want. TTS.

The AI ​​API follows a strict format to provide ideas based on preferences.

2. 
AI returns:
- an idea for an event
- if possible, any specific suggestions

3. 
GUI:
- Displays the idea, allows you to approve it, and moves it to the calendar.
- Ability to purchase tickets, make reservations, and contact the venue.
- Check event details.


## Routine life

### Sleep 

#### Sleep monitoring

Collecting information from a smart watch

A limited way to simply monitor phone activity

Maybe audio tracking for this?

#### Sleep recommendations

Sleep data is sent to the AI ​​and, with imposed formatting, it provides recommendations, advice, and preferences that could improve the quality of sleep. Ultimately, it is not AI but a deterministic algorithm based on research.

### Health control 

#### Monitoring vital life-functions

Collecting information from a smart watch
Aggregation with all other information and habits to determine current health and possible risks   

#### Health recommendation 

Sleep data is sent to the AI ​​and, with imposed formatting, it provides recommendations, advice, and preferences that could improve the quality of health. Ultimately, it is not AI but a deterministic algorithm based on research.

### Habits 

#### Creating habits

Long-term goals
where in a year

Medium-term goals like a month

#### Monitoring habit retention/maintenance

Whether it is clicked that it is done correctly, keeping track of the streak, some weights given to various habits

#### Gratification of maintained habits

Ranking
Various gradations of the habit streak

### Task acomplishing

#### Creating tasks to do

You can divide them into urgent important, urgent unimportant, chill important, chill unimportant, just create some kind of wizard, you can give them a deadline, assign them to some category, you can repeat reminders and simply mark them off

#### heuristics of completed tasks

They are separately valued based on the habit streak, habit weight, oneTimeEvent weight, and whether or not they're completed (there are also negative points, as well as for breaking the habit streak). Events are also considered separate points.

Everything adds up and can be ranked.

Health goals, or simply improving your health, should also bring results.

#### Rewards for earned points

Visualization: a tree grows, a village or city is created, etc.

I'd like streaks, for example, to be responsible for growth based on the "power" of habits and tasks.

For example, streaks change the advancement level of your city, and the weight determines how big it is, or something else.

Additional things appear in the city when events are held. Their power depends on their weight. For example, running small private events adds trees, while going on vacation adds a power grid or something else.

Each user chooses the development of their city, e.g., what to develop next, etc., and you can observe other people's cities and the global ranking.