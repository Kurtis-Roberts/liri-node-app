var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs")
var config = require("./keys.js");
var textFile = ("./random.txt")

var command = process.argv[2];

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

    var client = new Spotify({
        id: spotifyClientId,
        secret: spotifyClientSecret,
    });

    var inputSong = process.argv[3];
    if (process.argv[3] === undefined || process.argv[3] === " ") {
        inputSong = "The Sign";
    } else {
        inputSong = process.argv[3];
    }



    client.search({ type: 'track', query: inputSong }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        if (inputSong === "The Sign") {
            /////////// ARTIST ///////////////////////
            console.log("Artist(s) Name: " + data.tracks.items[8].artists[0].name)
                /////////////// SONG ///////////////////////
            console.log("Song Name: " + data.tracks.items[8].name)
                /////////////// PREVIEW ////////////////////
            console.log("Song Preview URL: " + data.tracks.items[8].preview_url)
                /////////////// ALBUM //////////////////////
            console.log("Album Name: " + data.tracks.items[8].album.name)

            console.log("======================================")


        } else {
            /////////// ARTIST ///////////////////////
            console.log("Artist(s) Name: " + data.tracks.items[0].artists[0].name)
                /////////////// SONG ///////////////////////
            console.log("Song Name: " + data.tracks.items[0].name)
                /////////////// PREVIEW ////////////////////
            console.log("Song Preview URL: " + data.tracks.items[0].preview_url)
                /////////////// ALBUM //////////////////////
            console.log("Album Name: " + data.tracks.items[0].album.name)

            console.log("======================================")

        }

    });
};

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
        console.log("Movie Title: " + response.Title)
        console.log("Year Released: " + response.Year)
        console.log("Movie Rated: " + response.Rated)
        console.log("Country Where Movie Was Produced: " + response.Country)
        console.log("Language: " + response.Language)
        console.log("Movie Plot: " + response.Plot)
        console.log("Main Actors: " + response.Actors)
    })
};

function doWhatItSays() {
    fs.readFile(textFile, "utf8", function(error, data) {
        console.log(data)
        var dataArray = data.split(",");
        console.log(dataArray)

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

                    /////////// ARTIST ///////////////////////
                    console.log("Artist(s) Name: " + data.tracks.items[8].artists[0].name)
                        /////////////// SONG ///////////////////////
                    console.log("Song Name: " + data.tracks.items[8].name)
                        /////////////// PREVIEW ////////////////////
                    console.log("Song Preview URL: " + data.tracks.items[8].preview_url)
                        /////////////// ALBUM //////////////////////
                    console.log("Album Name: " + data.tracks.items[8].album.name)

                    console.log("======================================")


                } else {
                    /////////// ARTIST ///////////////////////
                    console.log("Artist(s) Name: " + data.tracks.items[0].artists[0].name)
                        /////////////// SONG ///////////////////////
                    console.log("Song Name: " + data.tracks.items[0].name)
                        /////////////// PREVIEW ////////////////////
                    console.log("Song Preview URL: " + data.tracks.items[0].preview_url)
                        /////////////// ALBUM //////////////////////
                    console.log("Album Name: " + data.tracks.items[0].album.name)

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
                console.log("Movie Title: " + response.Title)
                console.log("Year Released: " + response.Year)
                console.log("Movie Rated: " + response.Rated)
                console.log("Country Where Movie Was Produced: " + response.Country)
                console.log("Language: " + response.Language)
                console.log("Movie Plot: " + response.Plot)
                console.log("Main Actors: " + response.Actors)
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