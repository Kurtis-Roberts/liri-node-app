var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs")
var config = require("./keys.js");
var textFile = ("./random.txt")

var command = process.argv[2];
var artistArray = [];
// console.log(command)

function getTweets() {
    var twitterConsumerKey = config.twitterKeys.consumer_key
    var twitterConsumerSecret = config.twitterKeys.consumer_secret
    var twitterAccessTokenKey = config.twitterKeys.access_token_key
    var twitterAccessTokenSecret = config.twitterKeys.access_token_secret



    var client = new Twitter({
        consumer_key: twitterConsumerKey,
        consumer_secret: twitterConsumerSecret,
        access_token_key: twitterAccessTokenKey,
        access_token_secret: twitterAccessTokenSecret
    });

    var username;

    if (process.argv[3] === undefined) {
        username = 'Bauer_Power_1'
    } else {
        if (process.argv.length <= 4) {
            username = process.argv[3]
        } else if (process.argv.length >= 4) {
            console.log("INVALID USERNAME, CHECK AND TRY AGAIN")
            return;
        }

    }

    var params = { screen_name: username, count: 20 };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {

        if (tweets.length > 0) {

            console.log("\n")
            console.log("\n")
            console.log("======================" + username + "========================")
            for (i = 0; i < tweets.length; i++) {
                if (!error) {
                    console.log("\n" + tweets[i].text);
                    console.log(tweets[i].created_at.slice(0, 16) + "\n");
                    // console.log(tweets[i])
                    console.log("==============================================")
                }
            }
            console.log("\n")
            console.log("\n")
        } else {
            console.log("THIS USER HAS NO TWEETS. PLEASE ENTER A VALID USERNAME")
        }
    });

}




function getSpotify() {
    var spotifyClientId = config.spotifyKeys.Client_ID
    var spotifyClientSecret = config.spotifyKeys.Client_Secret

    var artistArray = [];

    var client = new Spotify({
        id: spotifyClientId,
        secret: spotifyClientSecret,
    });

    var inputSong;
    if (process.argv.length > 4) {
        inputSong = process.argv.slice(3).join(" ")
    } else {
        if (process.argv[3] === undefined || process.argv[3] === " ") {
            inputSong = "The Sign";
        } else {
            inputSong = process.argv[3]
        }
    }
    var inputSong = inputSong.replace(/\s/g, "+");

    client.search({ type: 'track', query: inputSong }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (i = 0; i < data.tracks.items.length; i++) {
            artistArray.push(data.tracks.items[i].artists[0].name)

            artistArray = artistArray.filter(function(item, index, inputArray) {
                return inputArray.indexOf(item) == index;

            });


            if (process.argv[3] === undefined || process.argv[3] === " ") {
                inputSong = "The Sign";

                /////////// ARTIST ///////////////////////
                console.log("ARTIST(S) NAME: " + data.tracks.items[8].artists[0].name)
                    /////////////// SONG ///////////////////////
                console.log("SONG NAME: " + data.tracks.items[8].name)
                    /////////////// PREVIEW ////////////////////
                console.log("SONG PREVIEW URL: " + data.tracks.items[8].preview_url)
                    /////////////// ALBUM //////////////////////
                console.log("ALBUM NAME: " + data.tracks.items[8].album.name)
                console.log("\n")
                console.log("======================================")


            } else {

                console.log("\n")
                    /////////// ARTIST ///////////////////////
                console.log("ARTIST(S) NAME: " + artistArray)
                    /////////////// SONG ///////////////////////
                console.log("SONG NAME: " + data.tracks.items[0].name)
                    /////////////// PREVIEW ////////////////////
                console.log("SONG PREVIEW URL: " + data.tracks.items[0].preview_url)
                    /////////////// ALBUM //////////////////////
                console.log("ALBUM NAME: " + data.tracks.items[0].album.name)
                console.log("\n")
                console.log("======================================")

            }

        }

    })


}




function getMovie() {
    var token = config.movieKeys.token;
    var movie;
    if (process.argv[3] === undefined || process.argv[3] === " ") {
        movie = "Mr. Nobody.";
    } else {
        movie = process.argv[3];
    }

    var getMovie = { url: "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=" + token, method: "GET" }

    request(getMovie, function(error, response, body) {

        var response = JSON.parse(body)
        console.log("\n")
        console.log("MOVIE TITLE: " + response.Title)
        console.log("YEAR RELEASED: " + response.Year)
        console.log("MOVIE RATED: " + response.Rated)
        console.log("COUNTRY WHERE MOVIE WAS PRODUCED: " + response.Country)
        console.log("LANGUAGE: " + response.Language)
        console.log("MOVIE PLOT: " + response.Plot)
        console.log("MAIN ACTORS: " + response.Actors)
        console.log("\n")
        console.log("===========================================")
    })
};

function doWhatItSays() {
    fs.readFile(textFile, "utf8", function(error, data) {
        // console.log(data)
        var dataArray = data.split(",");
        // console.log(dataArray)

        if (dataArray[0] === "spotify-this-song") {
            var spotifyClientId = config.spotifyKeys.Client_ID
            var spotifyClientSecret = config.spotifyKeys.Client_Secret

            var client = new Spotify({
                id: spotifyClientId,
                secret: spotifyClientSecret,
            });

            var inputSong = dataArray[1];

            client.search({ type: 'track', query: inputSong }, function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                if (inputSong === "The Sign") {
                    console.log("\n")
                        /////////// ARTIST ///////////////////////
                    console.log("ARTIST(S) NAME: " + data.tracks.items[8].artists[0].name)
                        /////////////// SONG ///////////////////////
                    console.log("SONG NAME: " + data.tracks.items[8].name)
                        /////////////// PREVIEW ////////////////////
                    console.log("SONG PREVIEW URL: " + data.tracks.items[8].preview_url)
                        /////////////// ALBUM //////////////////////
                    console.log("ALBUM NAME: " + data.tracks.items[8].album.name)
                    console.log("\n")
                    console.log("======================================")

                } else {
                    console.log("\n")
                        /////////// ARTIST ///////////////////////
                    console.log("ARTIST(S) NAME: " + data.tracks.items[0].artists[0].name)
                        /////////////// SONG ///////////////////////
                    console.log("SONG NAME: " + data.tracks.items[0].name)
                        /////////////// PREVIEW ////////////////////
                    console.log("SONG PREVIEW URL: " + data.tracks.items[0].preview_url)
                        /////////////// ALBUM //////////////////////
                    console.log("ALBUM NAME: " + data.tracks.items[0].album.name)
                    console.log("\n")
                    console.log("======================================")

                }
            });

        } else if (dataArray[0] === "movie-this") {
            var token = config.movieKeys.token;
            var movie = dataArray[1];

            var getMovie = { url: "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=" + token, method: "GET" }

            request(getMovie, function(error, response, body) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                var response = JSON.parse(body)
                console.log("\n")
                console.log("MOVIE TITLE: " + response.Title)
                console.log("YEAR RELEASED: " + response.Year)
                console.log("MOVE RATED: " + response.Rated)
                console.log("COUNTRY WHERE MOVIE WAS PRODUCED: " + response.Country)
                console.log("LANGUAGE: " + response.Language)
                console.log("MOVIE PLOT: " + response.Plot)
                console.log("MAIN ACTORS: " + response.Actors)
                console.log("\n")
                console.log("========================================")
            })
        }
    })
}



if (command === "my-tweets") {
    getTweets();
} else if (command === "spotify-this-song") {
    getSpotify();
} else if (command === "movie-this") {
    getMovie();
} else if (command === "do-what-it-says") {
    doWhatItSays();
} else {
    console.log("Please Enter A Valid Command")
}