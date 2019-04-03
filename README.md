# Weekly Shopping List Using Spoonacular API

Author: Ryan Ardray

[View Shopping List App](https://evening-shelf-20638.herokuapp.com)

## Project Overview

Create a grocery List, by searching Spoonacular API. User may add search results to shopping list, adjust quantity, or add to favorites. Any result added to list or favorites will automatically save to history in order to reduce repetitive searches and limit the number of calls to Spoonacular API. Home has a calender, marking current date.
Create unique user account. Because application is designed for two people, (myself and my wife), cookies never expire. One time log in.

(IN PROGRESS) Application allows user to create meals or recipes, add ingredients from history or search, plan weekly meals on calender, and add necessary groceries from recipe to shopping list. May initiate an auto clear of list after 11:59 on Sunday.

I initially wanted to use Walmart API, but decided a better solution was Spoonacular API as the list will primarily be for groceries. This application is not a logical solution for multiple users, it was designed with the intent of being a single person application shared between two people, so the database setup is impractical for multiple users. I opted for referencing a single database collection rather than creating individual, nearly identical, collections.

This application was created using React, Express, Reach Router and MongoDB.

### Objectives for this project:

- Create a sharable weekly shopping list for my wife and myself.

- Use 3rd party API with API key

- Explore styled components

- Explore some new React features such as React Hooks

- Deploy to Heroku for shared use.

- Refactoring

- Create multi-year calender using javascript for loops.

### Future improvements/features

- Create front end with React Native

- Implement bar code scanner on mobile app.

- Redesign as completely classless application using React Hooks.

## Installation Instructions

If you would like to use this app for personal use, install application as follows:

Copy repository to local machine.

```
$ cd <root application directory >
$ npm install
$ cd client
$ npm install
```

Sign up for spoonacular API at: https://rapidapi.com/spoonacular/api
Sign up for Mongo Lab @ https://mlab.com

```
$ export GROCERY_API="<your spoonacular API key>"
$ export MONGOLAB_URI="<your mongo lab url>"
```

To deploy to Heroku:

```
$ git init
$ git add -A
$ git commit -m "heroku deploy"
$ heroku apps:create
$ heroku buildpacks:set heroku/nodejs
$ git push heroku
$ heroku config:set GROCERY_API=<your spoonacular API key>
$ heroku config:set MONGOLAB_URI=<your mongo lab url>
$ heroku open
```
