# bucketlist

## Front End Repo

### Team

* Kelvin Ma - Project Lead
* Wil Trahan - Front End Lead
* Allie Sebastian - Back End Lead

### Project Details

Besides finishing WDI, you surely have one or two things you'd love to do with your life. Let's get 'em on paper! You could integrate with a third-party location-based API to allow users to search for a location or venue to add to their bucket list items.

Reach Goal: Add social features to your site, such as following other users. Allow users to make certain list items public, but default to private.

### Planning

Our bucketlist app is an app where users can log in, and set up lists of activites they want to experience.
Our app is for all users that are looking to travel and/or find things to do in the area(s) that they want to visit.

### User Stories

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

