'use strict';

//Model serve as a database that store all the data
//and provide functions for user to access pieces of data
//not all the data at once.


import allTweets from './uw_ischool_tweets';

//private! Do not export/share
const tweeetData = allTweets.map((tweetObj) => {
    let mappedObj = {
        text: tweetObj.text,
        timestamp: Date.parse(tweetObj.created_at)
    }
    return mappedObj;
    
});

export function getRecentTweets() {
    tweeetData.sort((tweet1, tweet2) => {
        return tweet2.timestamp - tweet1.timestamp;
    })
    return tweeetData.slice(0, 5);
}

export function searchTweets(searchQuery) {
    let results = tweeetData.filter((tweetObj) => {
        //return if query is in text
        return (
            tweetObj.text
            .toLowerCase()
            .indexOf(searchQuery.toLowerCase()) >= 0
        )
    })
    return results;
}


