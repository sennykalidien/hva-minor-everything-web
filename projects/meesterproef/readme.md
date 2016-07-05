# Contributions to the Ultimate Frisbee App (UFA)
This is the individual README of Senny Kalidien, made for the Amsterdam University of Applied Sciences, at the study of  Communication and Multimedia Design.

In this README you can see read about my experience with this project, my activities on a weekly basis and the contributions that have been made to the [main repository](https://github.com/strexx/Ultimate-Frisbee-App).

**The other readme's**

- [Go to the main README of the repository](https://github.com/strexx/Ultimate-Frisbee-App)
- [Go to the individual README of contributor Fons Hettema](https://github.com/strexx/Ultimate-Frisbee-App/blob/master/README_fons.md)
- [Go to the individual README of contributor Melvin Reijnoudt](https://github.com/melvinr/Ultimate-Frisbee-App)

## Table of content
1. [My experience during this project](my-experience-during-this-project)
2. [Activities per week](#activities-per-week)
3. [The workflow](#about-the-app)
4. [Contributions to the repository](#contributions-to-the-repository)
5. [Code examples and more](#code-examples-and-more)

## My experience during this project
This project was a great way to measure my current skills as a front-end developer. After following some very intensive courses during this study, I wasn't sure how I would stand as a front-end developer now. Was I ready to be a worthy developer and be part or even contribute to this big community? Can I develop good and user friendly products? How i grew in this project will be clear during the read of this readme.

I've collaborated daily with the other two contributors of the respository: Melvin Reijnoudt & Fons Hettema. It was a interesting journey and experience to collaborate with a big project like this one with a life span of 5-7 weeks. The most interesting thing was finding out how to collaborate effectively when we would create this app together. Github is obviously a great tool for this purpose. But with Github alone you won't make it. In the beginning we would always meet and sit together to work on the app. Because we are all three very easy distracted, we needed a lot of silence and a good atmosphere in order to be productive. So we would regulary sit in an empty room at our school. After our meeting we would continue online with the collaborative communication tool appear.in. After a while, we discovered that we weren't as productive as we could be and noticed that we would do more if we were home, in our own space when we were on appear.in. Halfway this project we decided to work home more often and collaborate online. it worked like a charm.

The sport Ultimate Frisbee was a interesting sport. The ability to have a fair play sport defines the community behind this sport, which would definitely define the tone of voice of this project. The project, which sounded kinda simple and easy at first, has gotten to be one of the more complex projects of all the projects combined (in my honest opinion). The use of Node.js, MongoDb and Socket.io and making them work together defined the level of difficulty of this project. I am extremely proud of this project and I've have grown a lot as a front-end developer.

## Tasks per week
A complete overview of our tasks per week can be viewed below:
![](https://raw.githubusercontent.com/melvinr/Ultimate-Frisbee-App/master/readme/screenshots/trello.png)

### Week 1
- Briefing with the client
- First meeting with the teachers at our school
- Do research in the sport Ultimate Frisbee
- Create the use cases for the app
- Write the debriefing
- Create a sitemap
- Create wireframes per page
- Join wireframes with the other contributors, take the best parts and re-create a the final wireframes
- Create first sketches and iterate

### Week 2
- Progress meeting with the teachers at our school.
- Do research in the Leaguevine API, used to manage teams and scores
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
- Presented the first prototype to the client

### Week 3
- Progress meeting with the teachers at our school
- Gather all the feedback and create a MoSCoW-based feature list
- Set up a MongoDB database on Digital Ocean
- Create the connection in our Node.JS with MongoDB
- Insert the Windmill Ultimate Frisbee Tournament matches of 2016
- Insert the Windmill Ultimate Frisbee Tournament divisions of 2016
- Helped the other contributors with fixing Socket.io for real-time score updates
- Add JS filters in the route for the home page (matches overview) for each tab
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
Loggin hours on Harvest.
Updating trello.
Update process report.
Update drive.


### Contributions to the repository
See my total commits to this project below:

![Contributions](readme/contributions.png)

A list of all my commits I've done to contribute to this project:

[List with all my commits](https://github.com/strexx/Ultimate-Frisbee-App/commits?author=sennykalidien)

*I've started this project by setting up Node.JS, created and constantly updated the GULP file and brainstormed about the flow of the app (server side & client side). Throughout the project I continuously tried to keep the app clean, fixed the flow in a logical order when it became messy, and added some important functionalities.*

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

See a list of the most important commits below:

### 1 - WebApp From Scratch
For this course I've used Vanilla JavaScript to write the code pretty much from scratch. Node.JS was used to configure the app server-side. Client side a public folder was created, where the JS files were created in modules.

#### Setting up Node.JS
1. [Node server setup + GULP](https://github.com/strexx/Ultimate-Frisbee-App/commit/97978137f6913c64d3a61bdcd715a0572e2be575)
2. [Created routes + layout](https://github.com/strexx/Ultimate-Frisbee-App/commit/16e77d5a88eea6e2596f21cb4d5cee45a2854597)
3. [First GET requests to API](https://github.com/strexx/Ultimate-Frisbee-App/commit/34f14b1b9b821362b00925a3fa37f0abec73b15f)

#### Set up public folder (client)
3. [Add public folder](https://github.com/strexx/Ultimate-Frisbee-App/commit/4bf5a4fd2512a24cee9e6f59e374b473f79a0c80)
4. [Templates and CSS reset + main folder](https://github.com/strexx/Ultimate-Frisbee-App/commit/d114bbbb3f4bfaff7ffacfb77067219e42d87f44)

#### Single Page App
1. [Transformed into SPA](https://github.com/strexx/Ultimate-Frisbee-App/commit/2919307a2bc26b3adc7bbc8a05d9266dad35d5f1)
2. [Created files](https://github.com/strexx/Ultimate-Frisbee-App/commit/3db192a49261e6bc5b4ec8be5e369d2145b9b41e)
3. [Arrow functions](https://github.com/strexx/Ultimate-Frisbee-App/commit/e7b7201cc9a309bab0262d98a6b4dd749fe96789)

#### Matches page
1. [Insert dynamic data](https://github.com/strexx/Ultimate-Frisbee-App/commit/b27d33e181d4c64640d54f62c70823fe3a8cc6bb)
2. [Filters for each division](https://github.com/strexx/Ultimate-Frisbee-App/commit/9e07db2c27e92f6d13b119e6b40d2bf6aa3c49cc)
3. [Template for each division](https://github.com/strexx/Ultimate-Frisbee-App/commit/76649895f1f3a2a3cc9d479e42d466d708dfaf61)

#### Set up MongoDB in Node
I've set up MongoDB on a Digital Ocean droplet and created the connection with the database.

1. [MongoDB connection](https://github.com/strexx/Ultimate-Frisbee-App/commit/a0ff43c71448ad9f2a0a8de8510b8bf6717b515d)
2. [Fixed Connection](https://github.com/strexx/Ultimate-Frisbee-App/commit/2c027d0813c23a301a110fb2494012933285fb3e)
3. [Set up accounts](https://github.com/strexx/Ultimate-Frisbee-App/commit/ab944ecfc1e7ffeaf9e79f060f203c34a79bb9a2)

#### More advances Node.js features
1. [Created global variables](https://github.com/strexx/Ultimate-Frisbee-App/commit/bda18386ce7933f9b4dddc1d557af0c34a6607fd)
2. [Relocated global variables](https://github.com/strexx/Ultimate-Frisbee-App/commit/58796638e8cea111166eab1c7d03464cab21772a)
3. [Created module for unique keys](https://github.com/strexx/Ultimate-Frisbee-App/commit/00c39928f448ea7aef8f67c9707325772fda1a90)
4. [Created footer partials](https://github.com/strexx/Ultimate-Frisbee-App/commit/9c124e1590596c686cc3ca65451f49709fd466fe)

#### More advanced functions for MongoDB
I also contributed with creating the Requests to the API and store it in de database with Fons Hettema.
1. [Added all matches in db](https://github.com/strexx/Ultimate-Frisbee-App/commit/bdca7b4aedb0e832fbdea5e1d14c5cc02557a433)

#### Tournaments + Single Tournament
1. [Routes for Tournaments](https://github.com/strexx/Ultimate-Frisbee-App/commit/bf4361f88ef37415994158698c18109c4f12f3fe)
2. [Templates for tournament](https://github.com/strexx/Ultimate-Frisbee-App/commit/4d10110607ea15b2134e4c4fe717d5f41c1c93f3)


### 2 - CSS to the rescue
For this course I've used Vanilla JavaScript to write the code pretty much from scratch. Node.JS was used to configure the app server-side. Client side a public folder was created, where the JS files were created in modules.

#### Tournaments + Single Tournament
3. [Tournaments Css](https://github.com/strexx/Ultimate-Frisbee-App/commit/c2821cb3175b10e4d0f6388ebde86a0847a767dd)

### Loader + loadscreen
4. [Added loader + loadscreen](https://github.com/strexx/Ultimate-Frisbee-App/commit/971ced4553f7d9f0ae93134ed4a39dbb31d90349)

### BEM method
[BEM](https://github.com/strexx/Ultimate-Frisbee-App/commits/feature/bem)

### 3 - Performance Matters + Progressive Enhancement

#### Performance
2. [Service Worker](https://github.com/strexx/Ultimate-Frisbee-App/commit/af530976f8820d27206cbf82de2e96d21952c6e1)
3. [BEM](https://github.com/strexx/Ultimate-Frisbee-App/commits/feature/bem)

#### PE
1. [HTML ARIA (not finished)](https://github.com/strexx/Ultimate-Frisbee-App/commit/ef4f0e10cb42f8bf5a902a441e0ce72ea28a433a)
2. [BEM](https://github.com/strexx/Ultimate-Frisbee-App/commits/feature/bem?page=2)

#### 5 - Extra
#### Continuous fixed errors, bugs and cleaned up the flow of the app
1. [Cleaned up the JS flow for the client APP](https://github.com/strexx/Ultimate-Frisbee-App/commit/b1de7588d56fc28d7b05af5667e740204586a903)
2. [Removed unnecessary routes](https://github.com/strexx/Ultimate-Frisbee-App/commit/25230dd5fea7517ee302d509a5e6d5118956179f)
3. [Removed unneeded API calls](https://github.com/strexx/Ultimate-Frisbee-App/commit/8185343143fb05a8465cf24fb6598f801659357f)
3. [Removed console logs](https://github.com/strexx/Ultimate-Frisbee-App/commit/6eb687c86a5bf9cb37bcccd38b4b2c1668c3ad35)
4. [Cleaned up dependencies](https://github.com/strexx/Ultimate-Frisbee-App/commit/e34c536702055d21c0dd573ff515e002e48ae23e)
5. [Fixed client side flow app](https://github.com/strexx/Ultimate-Frisbee-App/commit/adfe1851ca84408e0d8b24dec2b17d60ba83d79b)

#### Set up Digital Ocean for project
- Set up a Digital Ocean server for the web app: http://meesterproef.directzichtbaar.nl, and for the MongoDB database.

#### Deploy to production
Set up a Digital Ocean server for Continuous Integration with Jenkins: http://95.85.1.96:8080
- [Deploy script for Jenkins](https://github.com/strexx/Ultimate-Frisbee-App/commit/6b41f007a59a1667a8ae90f0eb2d91e6557798bd)


### Code highlights

#### 1 - Thinking out the flow of the apps
**Node.js**
1. Set up the app via Express
2. Set up other app essentials within Node.js
3. Define the views
4. Set up user sessions
5. Set up the routes
6. connect with MongoDB
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

**SPA global view**
```
├── launcher.init     
|    ├── fontFaceObserver.init                            
|    ├── router.init
|    |    ├── sw.init
|    |    ├── addFavorites.init
|    |    |    ├── favStorage.init
|    |    ├── pages.init
|    |    |    ├── ux.init
|    |    |    ├── scores.init

```


#### 2 - Create custom filters and push them to a new array
```

```
