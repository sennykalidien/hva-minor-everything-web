# Ultimate Frisbee App (UFA)
This readme file is divided into two parts:

1. [The main explanation of this repository (the app)](#the-app)
2. [The contribution to this repository, and my own contributions](#the-contribution)

## The app
![Live page](https://raw.githubusercontent.com/strexx/Ultimate-Frisbee-App/master/readme/screenshots/matches_live.png)
![Match detail page](https://raw.githubusercontent.com/strexx/Ultimate-Frisbee-App/master/readme/screenshots/match_detail_score.png)
![Tournaments](https://raw.githubusercontent.com/strexx/Ultimate-Frisbee-App/master/readme/screenshots/tournaments.png)
![Tournament matches](https://raw.githubusercontent.com/strexx/Ultimate-Frisbee-App/master/readme/screenshots/tournament_matches.png)
![Matches live responive](https://raw.githubusercontent.com/strexx/Ultimate-Frisbee-App/master/readme/screenshots/matches_live_responsive.png)
![Tournaments responive](https://raw.githubusercontent.com/strexx/Ultimate-Frisbee-App/master/readme/screenshots/tournaments_responsive.png)

The Ultimate Frisbee App started as a school assignment for the Amsterdam University of Applied Sciences, at the study of Communication and Multimedia Design. This app is a web app, built in the popular platform Node.js. It's currently designed to show the latest matches for the Windmill Tournaments, which is a yearly event. The app uses the Leaguevine API for getting the scores and updating the score.

When using the app it will allow you to post scores to the app in real-time, which other users are able to see live without ever refreshing the page. That is just one of the many strenghts of this web app...

### Live demo
[https://www.meesterproef.directzichtbaar.nl](http://www.meesterproef.directzichtbaar.nl)

### Main functionalities
- Node.js
- MongoDB
- Socket.io
- Gulp

### The structure of the app
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

### How to install
A small tutorial how to install the Node application on your own local machine.

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

#### 1 - Use nodemon to automatically refresh the page on any changes

```
nodemon app.js
```

Open your browser and go to ``http://localhost:3010``


### Overview App
See below an overview op the used NPM packages and features.

#### NPM packages
Overview of NPM packages / dependencies used to run the application.

Name                 | Version | Description
:------------------- | :------ | :----------
body-parser          | 1.15.0  | Body parsing middleware for node.js
dateformat        	 | 1.0.12  | Date formatting for node.js
express              | 4.13.4  | Fast, unopinionated, minimalist web framework
express-session      | 1.13.0  | Session middleware for Express
gsap 				 | 4.0.0   | Animation library
hbs      			 | 2.2.3   | Express.js template engine plugin for Handlebars
jsonfile             | 1.1.2   | Easily read/write JSON files.
mongodb              | 2.1.21  | The official MongoDB driver for node.js
password-hash        | 1.2.2   | Password hashing and verification for node.js
path          		 | 0.12.7  | Provides utilities for working with file and directory paths
request              | 2.72.0  | Simplified HTTP request client.
session-file-store   | 0.2.0   | Session file store is a provision for storing session data in the session
socket.io            | 1.4.6   | Node.js realtime framework server


### Feature list

#### Per course
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

### Testing
![Device Lab](https://raw.githubusercontent.com/strexx/Ultimate-Frisbee-App/master/readme/device-lab.png)

#### Browser and device compatibility
The application was tested on a multitude of devices and browsers on our own machines and in the device lab at the university. Including an old version of Chrome for Android and the foreign UC Browser. The application looked fine and worked good on these browsers and most devices.

## Changes made based on user testing and feedback:

- Changed design pattern, brought menu back on-canvas and fixed to the bottom.
- Changed position of "+" and "-" buttons, to make them easier to tap for the user.
- Created a visual difference between divisions by using material design cards.
- Added visual feedback when a score has been submitted.
- Added visual feedback when a game has finished.
- Added some information directly to the scorepage, instead of just under the info tab.
- Scrolling on the tournaments page was slow, so we changed the design, which made it easier to scroll.
- Added feedback to login.
- Added a final score checkbox, so the scorekeeper won't accidentally submit the score as final.
- Added round and tournament to info page.

----

## The contributions
"A lot of the application's functionality and structure was created as a result of a collaborative effort. The three of us communicated through appear.in and tackled most of the major functionalities as a team. We feel that our workflow and personal growth has had a lot of benefits from this way of working. Our personal development and motivation to work got a boost and in the end helped us to create an even better application."

## Contributors
- [Fons Hettema](https://github.com/strexx)
- [Melvin Reijnoudt](https://github.com/melvinr)
- [Senny Kalidien](https://github.com/sennykalidien)

## Used PM tools (communication and planning)
- [Trello](http://www.trello.com)
- [Google Drive](http://www.drive.google.com)
- [Telegram](http://www.telegram.com)
- [Appear](http://www.appear.in)
- [Slack](http://www.slack.com)
- [Harvest](http://www.harvest.com)

## As a team
![Trello-board](https://raw.githubusercontent.com/strexx/Ultimate-Frisbee-App/master/readme/screenshots/trello.png)

### Tasks per week
Main tasks that were done during this project as a team

#### Week 1
- Briefing meeting with client (Christian Schaffner)
- Created sitemap for the application
- Sketch iterations of pages we need
- Converted sketches to wireframes
- Created Design Brief deliverable
- Created a debriefing
- Created repository
- Created Trello board with cards
- Created Google Drive for file sharing
- Presented wireframes and first concept to Christian

#### Week 2
- Node server setup
- Research for realtime techniques (socket.io)
- Research for libraries and packages
- Create application bootstrap (HTML + CSS)
- Seperated files into modules
- First socket.io test
- Request to API to fetch data
- Render data from API to views (client-side)
- Loader spinner
- Research and testing at Windmill Tournament
- Present first demo to Christian

#### Week 3
- Progress meeting for feedback with teachers
- Setup MoSCow featurelist
- Implement featurelist in Trello
- Setup Harvest for logging work hours
- Research for useful gulp plugins to support workflow
- Setup gulp and it's plugins
- Research mongoDB and setup database

#### Week 4
- Take out unnecessary libraries like Routie
- Added server-side rendering
- Tab-toggle switch for server-side rendering instead of client-side
- Help setup database synchronization on remote server
- Created user collection
- Used express-session package to store sessions
- Created login page with functionality
- Created feedback for login page
- Used password-hash package to secure login
- Added font face observer
- Implemented designs for scorepage
- Progressive enhanced implementation of scorepage
- Implement real time functionality on scorepage
- Logic for dynamic API times
- User testing
- Javascript bugs and errors check on every page

#### Week 5
- Design poster for presentation
- Real time scores update on live page
- Added logic for showing feedback after submitting as scorekeeper
- Created function to update one match from API
- Fade-in / out animation for menu tabs
- Created matches in Leaguevine API for testing
- Created readme for this project

### Weekly tasks
- Update process report with new material
- Update Harvest with working hours
- Update Trello board with tasks (in MoSCow)


## As an individual
Most important things I've done outside the commits are:
- Set up a Digital Ocean server for our Node App: http://meesterproef.directzichtbaar.nl
- Set up a Digital Ocean server for our MongoDB database.
- Set up a Digital Ocean server for the Jenkins: http://95.85.1.96:8080

### 0 - Main contributions in GitHub
See my total commits below:
![]()

Throughout this project I continuously tried to keep the app clean, fixed the flow in a logical order when it went messy, and added some important functionalities. I also was responsible for the Tournaments overview page and the single Tournament page.

A list of all my commits I've done to contribute to this project:

[List with all my commits](https://github.com/strexx/Ultimate-Frisbee-App/commits?author=sennykalidien)

Branches I was mainly responsible for or active in:

[feature/bem](https://github.com/strexx/Ultimate-Frisbee-App/commits/feature/bem)
[feature/performance](https://github.com/strexx/Ultimate-Frisbee-App/commits/feature/performance)
[feature/modules](https://github.com/strexx/Ultimate-Frisbee-App/commits/feature/modules)
[page/tournaments](https://github.com/strexx/Ultimate-Frisbee-App/commits/feature/mongodb)
[production](https://github.com/strexx/Ultimate-Frisbee-App/commits/production)

See a list of the important commits below:

### 1 - Setting up Node.JS
1. [Node server setup](https://github.com/strexx/Ultimate-Frisbee-App/commit/97978137f6913c64d3a61bdcd715a0572e2be575)
2. [Created routes + layout](https://github.com/strexx/Ultimate-Frisbee-App/commit/16e77d5a88eea6e2596f21cb4d5cee45a2854597)
3. [Add public folder](https://github.com/strexx/Ultimate-Frisbee-App/commit/4bf5a4fd2512a24cee9e6f59e374b473f79a0c80)
4. [Templates and first CSS](https://github.com/strexx/Ultimate-Frisbee-App/commit/d114bbbb3f4bfaff7ffacfb77067219e42d87f44)
5. [Get requests to API](https://github.com/strexx/Ultimate-Frisbee-App/commit/34f14b1b9b821362b00925a3fa37f0abec73b15f)

### 2 - Single Page App
1. [Transformed into SPA](https://github.com/strexx/Ultimate-Frisbee-App/commit/2919307a2bc26b3adc7bbc8a05d9266dad35d5f1)
2. [Created files](https://github.com/strexx/Ultimate-Frisbee-App/commit/3db192a49261e6bc5b4ec8be5e369d2145b9b41e)
3. [Arrow functions](https://github.com/strexx/Ultimate-Frisbee-App/commit/e7b7201cc9a309bab0262d98a6b4dd749fe96789)
4. [Added loader + loadscreen](https://github.com/strexx/Ultimate-Frisbee-App/commit/971ced4553f7d9f0ae93134ed4a39dbb31d90349)

### 3 - Matches page
1. [Insert dynamic data](https://github.com/strexx/Ultimate-Frisbee-App/commit/b27d33e181d4c64640d54f62c70823fe3a8cc6bb)
2. [Filters for each division](https://github.com/strexx/Ultimate-Frisbee-App/commit/9e07db2c27e92f6d13b119e6b40d2bf6aa3c49cc)
3. [Template for each division](https://github.com/strexx/Ultimate-Frisbee-App/commit/76649895f1f3a2a3cc9d479e42d466d708dfaf61)

### 4 - Set up MongoDB in Node
I've set up MongoDB on a Digital Ocean droplet and fixed the connection with the Database.

1. [MongoDB connection](https://github.com/strexx/Ultimate-Frisbee-App/commit/a0ff43c71448ad9f2a0a8de8510b8bf6717b515d)
2. [Fixed Connection](https://github.com/strexx/Ultimate-Frisbee-App/commit/2c027d0813c23a301a110fb2494012933285fb3e)

### 5 - More advances Node.js features
1. [Created global variables](https://github.com/strexx/Ultimate-Frisbee-App/commit/bda18386ce7933f9b4dddc1d557af0c34a6607fd)
2. [Relocated global variables](https://github.com/strexx/Ultimate-Frisbee-App/commit/58796638e8cea111166eab1c7d03464cab21772a)
3. [Created module for unique keys](https://github.com/strexx/Ultimate-Frisbee-App/commit/00c39928f448ea7aef8f67c9707325772fda1a90)
4. [Created footer partials](https://github.com/strexx/Ultimate-Frisbee-App/commit/9c124e1590596c686cc3ca65451f49709fd466fe)

### 6 - More advanced functions for MongoDB
1. [Added all matches in db](https://github.com/strexx/Ultimate-Frisbee-App/commit/bdca7b4aedb0e832fbdea5e1d14c5cc02557a433)

### 7 - Tournaments + Single Tournament
1. [Routes for Tournaments](https://github.com/strexx/Ultimate-Frisbee-App/commit/bf4361f88ef37415994158698c18109c4f12f3fe)
2. [Templates for tournament](https://github.com/strexx/Ultimate-Frisbee-App/commit/4d10110607ea15b2134e4c4fe717d5f41c1c93f3)

### 8 - Continuous fixed errors, bugs and cleaned up the flow of the app
1. [Cleaned up flow client APP](https://github.com/strexx/Ultimate-Frisbee-App/commit/b1de7588d56fc28d7b05af5667e740204586a903)
2. [Removed unnecessary routes](https://github.com/strexx/Ultimate-Frisbee-App/commit/25230dd5fea7517ee302d509a5e6d5118956179f)
3. [Removed console logs](https://github.com/strexx/Ultimate-Frisbee-App/commit/6eb687c86a5bf9cb37bcccd38b4b2c1668c3ad35)
4. [Cleaned up dependencies](https://github.com/strexx/Ultimate-Frisbee-App/commit/e34c536702055d21c0dd573ff515e002e48ae23e)
