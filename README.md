# BucketList Front-End

Our BucketList is an application where users can log in, and set up a list of places they want to experience.  Our app is for all users that are looking to travel and/or find things to do in the area(s) that they want to visit.

**Front End Deployment**: [gh-pages](http://wdi09-lovelace-squad.github.io/bucketlist)

**Back End Repo**: [wdi09-lovelace-squad](https://github.com/wdi09-lovelace-squad/bucketlist-api)

## Team

* Kelvin Ma - Project Lead
* Wil Trahan - Front End Lead
* Allie Sebastian - Back End Lead

## Project Prompt
[express-group-project](https://github.com/ga-wdi-boston/express-group-project)

Besides finishing WDI, you surely have one or two things you'd love to do with your life. Let's get 'em on paper! You could integrate with a third-party location-based API to allow users to search for a location or venue to add to their bucket list items.

**Reach Goal**: Add social features to your site, such as following other users. Allow users to make certain list items public, but default to private.

## Planning
- Assigned Roles
- Discussed User Stories

### Pre Production (Before Thanksgiving)
- Completed market research
- Researched external APIs, chose Foursquare and Mapbox
- Read Foursquare's and Mapbox's documentation
- Completed OpenLayers online-workshop
- Discussed limited scope, decided to make sure to aim for achievable goals
- demo-ed Foursquare and Mapbox APIs, so that we would understand what JSON data was being given to us from the external APIs
- Boilerplate Passport set up in Back-End repo

### Production / Development (After Thanksgiving)

- Foursquare API query via Back-End venues route
- Added (list : [ListEntry]) as a subschema to the User model
- Wrote AJAX calls on click handlers
- Added xhr credentials to Front-End AJAX to tells jquery to use cookies
- Upgraded Map functionality, geo JSON tied to map layers

## Challenges

Our biggest challenge during production was knowing what data was coming back, whether Foursquare, Map pin, or BucketList data.  Our best practice is to use chrome console and console log everything.

At the begining of the project version control and branching seemed intimidating, but after a few days the squad was comfortably working together communicating which branches everyone was working on and how to merge them.

## Back-End Data Structure

- User model with mongoose schema
- subschema to hold list and list entries
- allows for Data ID query of list

## User Stories

As a user I want to be able to create a list of places I'd like to go, and things I'd like to do.

- List array is automatically created when user is created.

As a user I want to be able to search for places to add to my list.

- A user can add pin from map to their personal to-do list.
- The user sees the 'add' button on the pin.

As a user I want to be able to add the places that I search to my to-do list.

- When the user clicks the add button the location is added to their to-do list.
- The front end will make a call to add a specific venue to the current users to-do list.
- The back end will recieve the call on a route and add the venue to the users to-do list.
- Success equals item is now on todo list.

As a user I want to be able to update the note.

- A user can click an edit button in their list.
- A hidden div will be shown allowing the users to input the note they want to add.
- A save button will be next to the input field allowing the user to save their note.
- When the save button is clicked it will send the note to the back end.

As a user I want to be able to delete items from the list.

- A user can click a delete button in their list.
- When the delete button is clicked, it will send the instruction to the back end.

As a user I want to be able to mark a to-do item completed.

- Create a button on each to-do item to mark as complete.
- When a user clicks on the button the front end changes the color of the list item.

## TaskList / Schedule

In order to make sure we completed all of our goals we wrote up a rough schedule during our 9am Stand-ups the last few days so that we were all on the same page about what we needed to achieve that day.

> ***Wed Tasks***:
> finish Delete CRUD today by lunch
> in html, editNote button in todo list
> in js, add click handler to show form to edit the note
> in html, update div in todo list window, to add input
> in js, ajax patch
> in html, which then will need a save button
> in js, add click handler
> in html, completed button in todo list
> in js, add click handler
> in html, trash button in todo list
> in js, add click handler
>
> ***Thu Tasks***:
> CSS styling of everything!
> Logout needs to be rewritten
> edit pencil needs to toggle
> completed new schema value

## Known Issues

- Currently not compatible with safari
- Currently not compatible with mobile

## Additional Features

- Add Completion to List Items
- Geotagging BucketList Items, as it is in search results
- Display more info in search result
