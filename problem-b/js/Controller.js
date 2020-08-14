'use strict';

// controller is:
//  the place where we handle user input:
//      what happen if user click a button
//      everything that user is touching and tell the model 
//      to do the work and change the view

//without the ./ on the path it will look from the node modules folder
import readline from 'readline-sync';

//with the ./ on the path it will look at the folder we defined.
import * as model from './Model';

//import the printTweets function from View.js
import { printTweets } from './View';

//handle the user input that let user to type in the search query
export function runSearch() {
    //the intro 
    console.log("Here are some tweets by @UW_iSchool");
    let recent = model.getRecentTweets();
    printTweets(recent);

    //prompt user to input search, readline is like Scanner in 142
    let queryResponse = readline.question("Search tweets, or EXIT to quit: ");
    if (queryResponse == "EXIT") {
        return; //quit, break the function by returning nothing 
    }
    let results = model.searchTweets(queryResponse);
    printTweets(results);
}
