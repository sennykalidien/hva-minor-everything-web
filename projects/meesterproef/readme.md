# Contributions to the Ultimate Frisbee App (UFA)
This is the individual README of **Senny Kalidien**, made for the Amsterdam University of Applied Sciences, at the study of  Communication and Multimedia Design.

In this README you can see read about the app, my reflection and activities on a weekly basis and the contributions that have been made to the [main repository](https://github.com/strexx/Ultimate-Frisbee-App) and how to use the app.

**The other readme's**

- [Go to the main README of the repository](https://github.com/strexx/Ultimate-Frisbee-App)
- [Go to the individual README of contributor Fons Hettema](https://github.com/strexx/Ultimate-Frisbee-App/blob/master/README_fons.md)
- [Go to the individual README of contributor Melvin Reijnoudt](https://github.com/melvinr/Ultimate-Frisbee-App)

## Table of content
1. [The app](#the-app)
  1. [About the app](#about-the-app)
  2. [The problem](#the-problem)
  3. [Design problem](#design-problem)
  4. [Target audience](#target-audience)
  5. [Use cases](#use-cases)
  6. [Design challenges](#design-challenges)
  7. [The solution](#design-solution)
2. [My contribution](#my-contribution)
  1. [Reflection](#reflection)
  2. [Tasks per week](#tasks-per-week)
  4. [Contributions to the repository](#contributions-to-the-repository)
3. [Technical documentation](#technical-documentation)
  1. [Main functionalities](#main-functionalities)
  2. [The structure](#the-structure)
  3. [Features and Packages](#features-and-packages)
  4. [How to install](#how-to-install)
  5. [How to develop](#how-to-develop)

----

## The app
### About the app
The Ultimate Frisbee App started as a school assignment for the Amsterdam University of Applied Sciences, at the study of  Communication and Multimedia Design. Christian Schaffner, a frisbee fanatic and the client for this assignment, had the wish to have a mobile app that can keep scores for the Ultimate Frisbee tournaments.

### The problem
For the public viewers of an Ultimate Frisbee tournament it's difficult to keep tab on when and where a team is playing and what the scores are. There isn't a good resource available to be updated continuously with the latest scores.

For the teams that are playing multiple games a day, it's important to know when and where they are playing.

For the organization of the tournaments there needs to be a fast and secure  solution to confirm and store the (final) scores in the Leaguevine system, which is used to create leagues, tournaments, teams, games and calculation of the ranking, rounds and points.

### Design problem
*How can a mobile web application allow the organization of the Ultimate Frisbee tournaments to receive the (final) scores of a finished match instantly and at the same time serve the public viewers and the teams with real-time (score) updates and other info about the matches during a tournament.*

### Assignment
Build a real-time, progressive enhanced and responsive web application, in which Ultimate Frisbee fans can check and update scores.

### Target audience
- **The public** that wants to be updated with the latest scores.
- **The teams** that want to be updated with the latest scores and know where and when they are playing.
- **The scorekeepers** who are present at the game and need to keep score and insert those scores into the system.
- **The client** who wants to have the scores stored on a digital platform and updated within the Leaguevine API.

### Use cases
What are the most important cases of the users for this app?

#### Must haves
1. As a user I want to have real-time score updates about a match or multiple matches (that I'm interested in).
2. As a user I want to have an overview of the matches that are being played during the tournament and on which field.
3. As a user I want to update the scores of my (favorite) team(s).
4. As a user I want to follow my favorite teams.
5. As a user I want to be able to visit the app, even if I have a bad internet connection.
6. As a scorekeeper of a game I want to confirm the final score, so the score can be updated in the system (Leaguevine API).
7. As a scorekeeper I want to see the matches that are relevant to me.

#### Could haves
1. As a user I want to be notified if a (favorite) team scores.
2. As a user I want to view the scores on a public screen.
3. As a scorekeeper I want to have a personal overview of all the teams that I need to keep the scores for during the tournament.
4. As a team I want to fill in my sprit scores.
5. As a client I want to receive the spirit scores into the Leaguevine API.

### Design challenges
During this project there were the following design challenges:
- The user can experience *bad* to *no* mobile internet connection at some locations of the Ultimate Frisbee tournaments.
- The user isn't always aware of where the matches are being played.
- The Leaguevine API, which is very slow, can be overloaded if there are many requests to the server.

### Design solution
A mobile-first, responsive, real-time, **progressive web application** made in **Node.js**, with the use of **socket.io** and **MongoDB**. *To make the web app a minimum viable product, the app will only display the games of the WindMill tournaments, an event that's being held every year.*

- Node.js is used to keep the application lightweight, fast, and highly customizable. It also allows us to make the application progressive enhanced, so   it's viewable for all kinds of users. Some examples of cases would be to have no JavaScript enabled, slow to no internet connection or using a screenreader. It also allows us to make the app real-time, by using a websocket library that can communicate between the client and the server with only the use of JavaScript.

- Socket.io is the websocket JavaScript library used to make the app update the scores real-time to all the users without the need of constantly refreshing the page.

- MongoDB is used to create a database to reduce the API calls to the highly vulnerable and slow serving Leaguevine API. The app will do a daily API request to store the matches from the Windmill tournaments and divisions of the current day in the database. Each time a score is updated, the database will be updated. If a scorekeeper confirms the final score of a match, an API post request will be done to the API to update and synchronize the API with the database.

- Progressive web app is used to make the application work offline, this is done with a Service Worker. If the user has a bad internet connection, he will still be able to visit the webapp and see the most recent scores.

----

## My contribution

## Reflection
This project was a great way to measure my current skills as a front-end developer. After following some very intensive courses during this study, I wasn't sure how I would stand as a front-end developer now. Was I ready to finally be a worthy developer and be part or even contribute to this big community? Can I develop good and user friendly products? These were questions that needed to be answered before I finished my study.

I've collaborated daily with the other two contributors of the respository: Melvin Reijnoudt & Fons Hettema. It was a interesting journey and fun experience to collaborate with a big project like this one with a life span of 7 weeks. The most interesting thing was finding out how to collaborate effectively when we would create this app together. Github is obviously a great tool for this purpose. But with Github alone you won't make it. In the beginning we would always meet and sit together to work on the app. Because we are all three very easy distracted, we needed a lot of silence and a good atmosphere in order to be productive. So we would regularly sit in an empty room at our school. After our meeting we would continue online with the collaborative communication tool appear.in. After a while, we discovered that we weren't as productive as we could be and noticed that we would do more if we were home, in our own space when we were on appear.in. Halfway this project we decided to work home more often and collaborate online. it worked like a charm.

The sport Ultimate Frisbee was a interesting sport. The ability to have a fair play sport defines the community behind this sport, which would definitely define the tone of voice of this project. The project, which sounded kinda simple and easy at first, has gotten to be one of the more complex projects of all the projects combined (in my honest opinion). The use of Node.js, MongoDb and Socket.io and making them work together defined the level of difficulty of this project. I am extremely proud of this project and I've have grown a lot as a front-end developer.

## Tasks per week
A complete overview of our tasks per week can be viewed below:
![](https://raw.githubusercontent.com/melvinr/Ultimate-Frisbee-App/master/readme/screenshots/trello.png)

### Week 1
- Briefing with the client
- First meeting with the teachers at our school
- Do research in the sport Ultimate Frisbee
- Create the use cases for the app (can be found in the main readme)
- Write the debriefing
- Create a sitemap
- Create wireframes per page
- Join wireframes with the other contributors, take the best parts and re-create a the final wireframes
- Create first sketches and iterate

### Week 2
- Progress meeting with the teachers at our school.
- Do research in the Leaguevine API, used to manage teams and scores
- Do research in socket.io
- Created the flow for our app according to the Leaguevine API
- Set up Node.js
  - Create the structure of Node.js
  - Set up the Node.js server
  - Create the first routes
  - Create our own API for the Single Page App
- Set up Gulp for automated tasks during our development
  - Set up the structure of the our Client
  - Created a source folder and a distribution folder
  - Install Gulp plugins
- Set up the foundation of a Single Page App
  - Created the HTML files
  - Created the JS files
  - Created the CSS files (reset.css + styles.css)
- Set up socket.io within Node.js
- Presented the first prototype to the client

### Week 3
- Progress meeting with the teachers at our school
- Gather all the feedback and create a MoSCoW-based feature list
- Set up a MongoDB database on Digital Ocean
- Set up the connection in our Node.JS with MongoDB
- Insert the Windmill Ultimate Frisbee Tournament matches of 2016
- Insert the Windmill Ultimate Frisbee Tournament divisions of 2016
- Help the other contributors with getting Socket.io to work for real-time score updates
- Add JS filters in the route for the home page (matches overview) for each tab [](code-example)
- Created the Tournaments overview page
- Created the Tournament detail page
- Cleaned up unnecessary libraries and straighten up the flow of the Node.js + SPA app

### Week 4
- Transform HTML & CSS to BEM-method
- Progress meeting with the teachers at our school.
- Helped with setup Service Worker
- Set up continuous integration (automatic deployment) with Jenkins
- User testing

### Week 5
- Help with writing the main readme
- Write my own readme
- Help with design of the poster for the presentation

### Week 6
- Rewrite and restructure the main readme
- Make the app more responsive
- Make a desktop view for the App

### Week 7
- Help with adding visual feedback when user update the score
- Fix the Service Worker bug for offline support
- Finish the main readme
- Finish my individual readme

### Weekly tasks
- Loggin hours on Harvest.
- Updating trello.
- Update Google drive.


### Contributions to the repository
See my total commits to this project below:

![Contributions](readme/contributions.png)

A list of all my commits I've done to contribute to this project:

[List with all my commits](https://github.com/strexx/Ultimate-Frisbee-App/commits?author=sennykalidien)

*I've started this project by setting up Node.JS, created and constantly updated the Gulp task manager file and brainstormed about the flow of the app (server side & client side). Throughout the project I continuously tried to keep the app clean, fixed the flow in a logical order when it became messy, and added some important functionalities.*

Other main contributions:
- Fixed modules (see modules folder) for Node.js.
- Responsible for the Tournaments overview page and the single Tournament page.
- Implemented BEM in the last week of the project.

Branches I was mainly active in:

- [feature/bem](https://github.com/strexx/Ultimate-Frisbee-App/commits/feature/bem)
- [feature/performance](https://github.com/strexx/Ultimate-Frisbee-App/commits/feature/performance)
- [feature/modules](https://github.com/strexx/Ultimate-Frisbee-App/commits/feature/modules)
- [page/tournaments](https://github.com/strexx/Ultimate-Frisbee-App/commits/feature/mongodb)
- [production](https://github.com/strexx/Ultimate-Frisbee-App/commits/production)
- [feature/responsive](https://github.com/strexx/Ultimate-Frisbee-App/commits/feature/responsive)
- [feature/serviceworker](https://github.com/strexx/Ultimate-Frisbee-App/commits/feature/responsive)

See a list of the most important commits below per course:

1. [WebApp From Scratch](#1---webapp-from-scratch--performance-matters)
2. [CSS To The Rescue](#2---css-to-the-rescue)
3. [Performance Matters](#3---performance-matters)
4. [Browser Technologies](#4---browser-technologies)

----

### 1 - WebApp From Scratch / Performance Matters
In the course WebApp From Scratch I've learned how to write (better) vanilla JavaScript code, and how to use some JS standards for creating a Single Page Application from stratch for this project. Things like using a Namespace, IFFE, Modules is implemented.

In Performance Matters I've learned the basics of working with a Node.js server. Why Node.js? Because setting up a server in vanilla Javascript is the sweetest thing ever for a front-end develope!

I've also learned how to set up the task manager Gulp for automated development. And finally how to set up a Digital Ocean droplet server.

##### Code highlight during this course
During this project I was continously trying to keep the flow of the app logical and clean, so it would always work fast and secure.

**Node.js**

1. Set up the app via Express
2. Set up other app essentials within Node.js
3. Define the views
4. Set up user sessions
5. Set up the routes
6. Connect with MongoDB
7. Create a global database variable for global use
8. Connect with socket.io
9. Launch the app and listen to port 3010

```
├── Express
|    ├── Views
|    ├── Sessions
|    ├── Routes
|    |    ├── MongoDB connection
|    |    |    ├── global db variable
|    |    ├── Socket.io connection
|    |    |    ├── Launch app (port 3010)

```

**SPA**

```
├── launcher     
|    ├── fontFaceObserver                            
|    ├── router
|    |    ├── sw (only on home)
|    |    ├── addFavorites
|    |    |    ├── favStorage
|    |    ├── pages
|    |    |    ├── ux
|    |    |    ├── scores

```

##### Setting up Node.JS
The platform we'll be using to create the server for our App.

- [Node server setup + Gulp for automated tasks](https://github.com/strexx/Ultimate-Frisbee-App/commit/97978137f6913c64d3a61bdcd715a0572e2be575)
- [Created routes + layout](https://github.com/strexx/Ultimate-Frisbee-App/commit/16e77d5a88eea6e2596f21cb4d5cee45a2854597)
- [Created our own API to do a GET requests to the Leaguevine API, so we can use it for our SPA](https://github.com/strexx/Ultimate-Frisbee-App/commit/34f14b1b9b821362b00925a3fa37f0abec73b15f)

##### Set up public folder (client)
A Public folder within the node.js structure for all the necessary client-side files.

- [Add public folder for client side development](https://github.com/strexx/Ultimate-Frisbee-App/commit/4bf5a4fd2512a24cee9e6f59e374b473f79a0c80)
- [Created the first views templates and added CSS reset + main folder](https://github.com/strexx/Ultimate-Frisbee-App/commit/d114bbbb3f4bfaff7ffacfb77067219e42d87f44)

##### Single Page App
The client side JS code and structure.

- [Transformed into a SPA so we can add WebApp functionalities](https://github.com/strexx/Ultimate-Frisbee-App/commit/2919307a2bc26b3adc7bbc8a05d9266dad35d5f1)
- [Created the necessary files](https://github.com/strexx/Ultimate-Frisbee-App/commit/3db192a49261e6bc5b4ec8be5e369d2145b9b41e)
- [Implemented or transformed functions into arrow functions (ES6)](https://github.com/strexx/Ultimate-Frisbee-App/commit/e7b7201cc9a309bab0262d98a6b4dd749fe96789)

##### Set up MongoDB in Node
I've set up MongoDB on a Digital Ocean droplet and created the connection with the database. I also contributed with creating the Requests to the API and store it in de database with Fons Hettema.

- [Set up the MongoDB connection](https://github.com/strexx/Ultimate-Frisbee-App/commit/a0ff43c71448ad9f2a0a8de8510b8bf6717b515d)
- [Fix a major issue with the connection](https://github.com/strexx/Ultimate-Frisbee-App/commit/2c027d0813c23a301a110fb2494012933285fb3e)
- [Set up some test accounts in order to create a login page](https://github.com/strexx/Ultimate-Frisbee-App/commit/ab944ecfc1e7ffeaf9e79f060f203c34a79bb9a2)
- [Added all the Winmill 2016 matches in db](https://github.com/strexx/Ultimate-Frisbee-App/commit/bdca7b4aedb0e832fbdea5e1d14c5cc02557a433)

##### More advances Node.js features
After setting up Node.js, these are the most crucial and interesting contributions within this platform.

- [Created global variables so we only have to connect to MongoDB database once and use the database in other files](https://github.com/strexx/Ultimate-Frisbee-App/commit/bda18386ce7933f9b4dddc1d557af0c34a6607fd)
- [Relocated the global variables in seperate files for a better overview of the files structure](https://github.com/strexx/Ultimate-Frisbee-App/commit/58796638e8cea111166eab1c7d03464cab21772a)
- [Created a module to filter the unique keys in a array and return those keys](https://github.com/strexx/Ultimate-Frisbee-App/commit/00c39928f448ea7aef8f67c9707325772fda1a90)
- [Created footer partials for a more modulair structure of files](https://github.com/strexx/Ultimate-Frisbee-App/commit/9c124e1590596c686cc3ca65451f49709fd466fe)

##### Matches page
A first attempt at setting up the home page which will display the current matches of the day

- [Insert dynamic data for layout rendering](https://github.com/strexx/Ultimate-Frisbee-App/commit/b27d33e181d4c64640d54f62c70823fe3a8cc6bb)
- [Filters for each division](https://github.com/strexx/Ultimate-Frisbee-App/commit/9e07db2c27e92f6d13b119e6b40d2bf6aa3c49cc)
- [Template for each division](https://github.com/strexx/Ultimate-Frisbee-App/commit/76649895f1f3a2a3cc9d479e42d466d708dfaf61)

##### Tournaments + Tournament detail page
Setting up the tournaments page and the tournament detail page.

- [Routes for Tournaments](https://github.com/strexx/Ultimate-Frisbee-App/commit/bf4361f88ef37415994158698c18109c4f12f3fe)
- [Templates for tournament](https://github.com/strexx/Ultimate-Frisbee-App/commit/4d10110607ea15b2134e4c4fe717d5f41c1c93f3)

### 2 - CSS to the rescue
In the course **CSS To The Rescue** I've learned how to use FlexBox and also made sure I develop mobile first by creating media queries with a min-width instead of max-width. These are thing that I've used to create the pages I was mainly responsible for: the Tournaments overview page and the Tournament detail page. Besides that, I've also created the desktop view for the app by using media queries.

##### Code highlight during this course
Working with a mobile-first approach and using different font sizes wth 'em's' and '%'.

We'll start with declaring a font-size of 100% on the html, which will stand for a font-size of 16px. So this will mean that 1em = 16px.

```
html {
	font-size: 100%;
}
```

Then we'll add the font-size we want to show on a mobile screen. Because we are working mobile-first, this one doesn't need to be in a media query.


```
body {
	font-size: 85%;
	font-family: sans-serif;
}

.fonts-loaded body {
    font-family: 'Lato', 'Helvetica neue', sans-serif;
}
```

Now we are going to add some font-size to some CSS selectors, but instead of using px as font-size we'll be using em's. The difference? Pixels are always fixed and can't be dynamically changed but em's can.

```
.match__item__team__info__score {
	font-size: 15em !important;
}

.header__title {
    font-size: 2em;
}

.footer__menu__link {
    font-size: 0.9em;
}
```

Now we can declare different font-sizes using the media queries and set a percent on the body

```
@media (min-width: 47em) {
    body {
        font-size: 90%;
    }
}

@media (min-width: 60em) {
	body {
		font-size: 100%;
	}
}

```

This will give us a different font-size on different screen width's.

##### Tournaments + Single Tournament
- [Added the CSS for the Tournaments overview page and some other random CSS](https://github.com/strexx/Ultimate-Frisbee-App/commit/c2821cb3175b10e4d0f6388ebde86a0847a767dd)

##### Loader + loadscreen
- [Added or recreated the CSS for the loader + loadscreen](https://github.com/strexx/Ultimate-Frisbee-App/commit/971ced4553f7d9f0ae93134ed4a39dbb31d90349)

#### Desktop view
- [Made a desktop view for the app and created more media queries for a better responsive view on each device](https://github.com/strexx/Ultimate-Frisbee-App/commits/feature/responsive)


### 3 - Performance Matters

##### Code highlights during this course
The Service Worker was a real tough one to configure, when the app is not exactly a Single Page WebApp. We've used multiple pages, so we could really built the app progressive enhanced. That means that we could create fallbacks for if Javascript was turned of for example. With a SPA this was not possible to do.

The problem was the pages that are being cached by the Service Worker, they would not be updated when a user would refresh the page. This resulted in always serving the old html file. Because we're working with real-time score updates, t was necessary to always have he latest scores displayed when the user would refresh the page. There was also a problem with the offline view of the page. If a user would be offline, the browser would give an error that the HTML could not be found.

For this problem we would need to check in the fetch of the Service Worker. In the old code, it would always check if the request was was already in the cache first. If it was in the cache it would not do a new fetch again and replace our old cached HTML file. This needs to act differently.

0 - The start
```
this.addEventListener('fetch', function(event) {

});

```

1 - Check what kind of request is being made
```
var request = event.request;
var acceptHeader = request.headers.get('Accept');
var resourceType = 'static';

//console.log(acceptHeader);

if (acceptHeader.indexOf('text/html') !== -1) {
	resourceType = 'content';
}
```

2 - If request is HTM, do a fetch and cache the response, else (if there is an error) fetch it from the cache and serve it. This would be the scenario if the user is offline.
```
if (resourceType === 'content') {
	event.respondWith(
		fetch(request)
		.then(response => fetchAndCache(request, response))
		.catch(() => fetchFromCache(event))
	);
}
```
3 - Else: we want to ignore every polling that's been made by the socket.io and first fetch from cache. If the request is not in the cache, fetch the request and add it to our cache.
```
else {
	if (request.url.indexOf("transport=polling") == -1) { // ignore socket polling
		event.respondWith(
			fetchFromCache(event)
			.catch(() => fetch(request))
			.then(response => fetchAndCache(request, response))
		);
	}
}

```

The full code:

```
this.addEventListener('fetch', function(event) {
    var request = event.request;
    var acceptHeader = request.headers.get('Accept');
    var resourceType = 'static';

    //console.log(acceptHeader);

    if (acceptHeader.indexOf('text/html') !== -1) {
        resourceType = 'content';
    }

    if (resourceType === 'content') {
        event.respondWith(
            fetch(request)
            .then(response => fetchAndCache(request, response))
            .catch(() => fetchFromCache(event))
        );
    }
	else {
		if (request.url.indexOf("transport=polling") == -1) { // ignore socket polling
	        event.respondWith(
	            fetchFromCache(event)
	            .catch(() => fetch(request))
	            .then(response => fetchAndCache(request, response))
	        );
		}
    }
});

```

##### Service Worker
- [First attempt at setting up a Service Worker](https://github.com/strexx/Ultimate-Frisbee-App/commit/af530976f8820d27206cbf82de2e96d21952c6e1)
- [The big fix for the Service Worker in order to get the App working offline]

##### BEM
- [Implemented the BEM method, which also allowed me the rewrite en restructure some messy HTML and CSS code](https://github.com/strexx/Ultimate-Frisbee-App/commits/feature/bem)

### 4 - Browser Technologies

##### Code highlight during this course
Built the input field on the match detail page Progressive Enhanced.

If JavaScript is not available, we want to show input fields of the type 'number' in order to update the score. This is an input field with a ticker besides it so you can easy toggle between scores. But if JavaScript is turned on we want to disable the editing ability of the input fields and show a + and - button beneath it for a better UI.

These are the input fields
```
<input type="number" id="team1-input" class="team__home__info__score match__item__team__info__score" name="score_team_1" min="0" max="99" value="{{items.team_1_score}}"/>

<input type="number" id="team2-input" class="team__away__info__score match__item__team__info__score" name="score_team_2" min="0" max="99" value="{{items.team_2_score}}" />
```

This is already been configured correctly. But if JavaScript is turned on, we want to add the attribute 'readonly' to the input fields, in order to make them non-editable. We also need some CSS style to make the numbers align centered and hide the standard white background + black border.

The JavaScript

```
function hideInputs() {
	[].forEach.call(team1_score, function(input) {
		input.setAttribute("readonly", "");
	});

	[].forEach.call(team2_score, function(input) {
		input.setAttribute("readonly", "");
	});
}
```

The CSS

```
.match__item__team__info__score[readonly] {
    border: 0;
    background: #f9f9f9;
    -moz-appearance: textfield;
    margin: auto;
}
```

The ultimate progressive enhancement!

##### The commits
1. [HTML ARIA for screenreader](https://github.com/strexx/Ultimate-Frisbee-App/commit/ef4f0e10cb42f8bf5a902a441e0ce72ea28a433a)
2. [Working with input fields and add progressive enhancement to hide and disable the input ability]()

### 5 - Extra
##### Continuously fixing errors, bugs and cleaned up the flow of the app
- [Cleaned up the JS flow for the client APP](https://github.com/strexx/Ultimate-Frisbee-App/commit/b1de7588d56fc28d7b05af5667e740204586a903)
- [Removed unnecessary routes](https://github.com/strexx/Ultimate-Frisbee-App/commit/25230dd5fea7517ee302d509a5e6d5118956179f)
- [Removed unneeded API calls](https://github.com/strexx/Ultimate-Frisbee-App/commit/8185343143fb05a8465cf24fb6598f801659357f)
- [Removed console logs](https://github.com/strexx/Ultimate-Frisbee-App/commit/6eb687c86a5bf9cb37bcccd38b4b2c1668c3ad35)
- [Cleaned up dependencies](https://github.com/strexx/Ultimate-Frisbee-App/commit/e34c536702055d21c0dd573ff515e002e48ae23e)
- [Fixed client side flow app](https://github.com/strexx/Ultimate-Frisbee-App/commit/adfe1851ca84408e0d8b24dec2b17d60ba83d79b)

##### Set up Digital Ocean for project
- Set up a Digital Ocean server for the web app: http://meesterproef.directzichtbaar.nl, and for the MongoDB database.

##### Deploy to production
Set up a Digital Ocean server for Continuous Integration with Jenkins: http://95.85.1.96:8080

- [Deploy script for Jenkins](https://github.com/strexx/Ultimate-Frisbee-App/commit/6b41f007a59a1667a8ae90f0eb2d91e6557798bd)

----

## Technical documentation

### Main functionalities
- Node.js
- MongoDB
- Socket.io
- Gulp

### The structure
```
├── connections                                 // Folder with database and socket.io connections setup
|    ├── database.js                            // Database connection setup
|    ├── socket.js                              // Web Sockets connection setup
├── lib                                         // Library folder
|    ├── mongodb.js                             // General database calls
|    ├── socket-io.js                           // Socket listeners with functionality
├── modules                                     // General modules setup
|    ├── formatDigits.js                        // Time formatting
|    ├── multiRequest.js                        // Multiple HTTP-requests handler
|    ├── uniqueKeys.js                          // Get unique values from an array
├── node_modules                                // Node modules
├── public                                      // Client side folder
|    ├── src                                    // Source folder
|    |    |── css                               // Styling for the application
|    |    |   ├── reset.css                     // Styling reset
|    |    |   ├── styles.css                    // Styling main file
|    |    ├── images                            // All images used in the application
|    |    ├── js                                // All client-side JavaScript logic
|    |    |   ├── appLauncher.js                // Main js file for launching app flow
|    |    |   ├── fontFaceObserver.js           // Font Face Observer functionality
|    |    |   ├── pages.js                      // Pages functionality
|    |    |   ├── router.js                     // Router functionality
|    |    |   ├── scores.js                     // Scores functionality
|    |    |   ├── serverWorker.js               // Service Worker functionality
|    |    |   ├── tools.js                      // Tools functionality
|    |    |   ├── ux.js                         // Ux behaviour functionality
|    |    ├── lib                               // Library folder
|    |    |   ├── fontfaceobserver.min.js       // Font Face Observer library
|    |    |   ├── modernizr.js                  // Modernizr library
|    |    |   ├── socket.io.min.js              // Socket.io library
|    ├── index.html                             // Basic HTML file for critical css
|    ├── sw.js                                  // Main Service Worker file
├── routes                                      // Routes folder
|    ├── api.js                                 // Servers api file with requests and database storage
|    ├── index.js                               // Page routing, rendering and data logic
├── scripts                                     // Scripts folder
|    ├── deploy                                 // Jenkins deploy bash script for server deployment
├── sessions                                    // All sessions stored when user logging in
├── views                                       // All views of the application, rendered with handlebars.
|    ├── partials                               // Partials
|    |    |── content                           // Partials content
|    |    |   ├── content_matches.hbs
|    |    |   ├── content_ranking.hbs
|    |    ├── footer                            // Partials footer
|    |    |   ├── footer_login.hbs
|    |    |   ├── footer_matches.hbs
|    |    |   ├── footer_tournaments.hbs
|    |    ├── header                            // Partials header
|    |    |   ├── header_login.hbs
|    |    |   ├── header_match.hbs
|    |    |   ├── header_matches.hbs
|    |    |   ├── header_tournament.hbs
|    |    |   ├── header_tournaments.hbs
|    |    ├── loader.hbs
|    |    ├── scripts.hbs
|    |    ├── splash.hbs
├── .gitignore                                  // Git ignore file
├── app.js                                      // Application bootstrap
├── gulpfile.js                                 // Gulp task managing configuration file
├── package.js                                  // Node.js installation file with dependencies
├── readme.md                                   // This readme file
```

### Features and packages

#### NPM packages
Overview of NPM packages / dependencies used to run the application.

Name                 | Version | Description
:------------------- | :------ | :----------
body-parser          | 1.15.0  | Body parsing middleware for node.js
dateformat        	 | 1.0.12  | Date formatting for node.js
express              | 4.13.4  | Fast, unopinionated, minimalist web framework
express-session      | 1.13.0  | Session middleware for Express
gsap 				 	 | 4.0.0   | Animation library
hbs      			 	 | 2.2.3   | Express.js template engine plugin for Handlebars
jsonfile             | 1.1.2   | Easily read/write JSON files.
mongodb              | 2.1.21  | The official MongoDB driver for node.js
password-hash        | 1.2.2   | Password hashing and verification for node.js
path          		 | 0.12.7  | Provides utilities for working with file and directory paths
request              | 2.72.0  | Simplified HTTP request client.
session-file-store   | 0.2.0   | Session file store is a provision for storing session data in the session
socket.io            | 1.4.6   | Node.js realtime framework server

### Feature list

#### Per school course
1. CSS to the rescue
2. Web App From Scratch
3. Performance Matters
4. Real Time Web
5. Browser Technologies
6. EXTRA: Server Side

#### Overview
| Feature                           | Course        |
| --------------------------------- | ------------- |
| Score functionality               | 2, 4, 5, 6    |
| Progressive Enhancement           | 5             |
| Tabs                              | 1, 2, 6       |
| MongoDB database                  | 2, 6          |
| User accounts (scorekeepers)      | 6             |
| CSS Animations and Transitions    | 1, 3, 5       |
| Real Time using socket.io         | 2, 4          |
| Service Worker                    | 2, 3, 5       |
| API                               | 2, 6          |
| Font Face Observer                | 3             |
| Critical CSS                      | 3             |
| LoadCSS                           | 3             |
| First meaningful render           | 3             |
| Login                             | 5, 6          |
| Feedback login (error page)       | 1, 2, 6       |
| Logout                            | 6             |
| User sessions                     | 6             |
| Tournament page                   | 1, 2, 6       |
| Menu design pattern               | 1             |
| Responsive                        | 1             |
| Gulp                              | 3             |
| Partials                          | 2             |
| Handlebars                        | 2, 4          |
| Feature detection                 | 2, 5          |
| Progressive Web App               | 6             |
| Multirequest                      | 2, 6          |
| Modules                           | 2, 3          |
| Jenkins                           | 3, 6          |
| FlexBox                           | 1, 5          |
| Modernizr                         | 1, 5          |
| BEM                               | 1, 3          |
| Checkbox                          | 1             |

#### Future feature wishlist
- User type related content
- Cachebuster with gulp
- Add team color
- Comments and likes on matches
- Touch events
- Overview of games per field
- Current ranking on live results tab


### How to install
A small tutorial on how to install the Node application on your own local machine.

**Git repository**:
[https://github.com/strexx/Ultimate-Frisbee-App.git](https://github.com/strexx/Ultimate-Frisbee-App.git)

#### 1 - Clone the repository
```
git clone https://github.com/strexx/Ultimate-Frisbee-App.git
```

#### 2 - Navigate to the cloned repository

```
cd <path/to/file>
```

#### 3 - Install the node modules and packages
```
npm install
```

#### 4 - Start Gulp to create a dist folder with concatenated and minified files

```
gulp
```

#### 5 - Start the application
```
npm start
```

#### 6 - View the app in the browser
The app will be listening to port 3010. Open the browser and go to either ``http://127.0.0.1:3010`` or ``http://localhost:3010``


### How to develop
- Changes to the server side files can be modified in the folders of the root.
- Changes to the client side CSS and JS can be made in the public folder.
- HTML can be changed in the views folder

#### 1 - Use gulp watch to let Gulp watch for any changes
```
gulp watch
```

#### 2 - Use nodemon to automatically refresh the page on any changes

```
nodemon app.js
```

Open your browser and go to ``http://localhost:3010``
