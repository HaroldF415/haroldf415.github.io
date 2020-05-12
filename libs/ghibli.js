/* This script is meant to connect with Studio Ghibli's API and request information about it's films and present it to the user. */

// STEP 1 - Retrieving the data with an HttpREQUEST
// Create a REQUEST variable and assign a new XMLHttpRequest object to it.
// XMLHttpRequest - object that can be used to REQUEST data from a WEB SERVER.

var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint

request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)

// The onLoad event will be called when an XMLHttpRequest transaction has been completed successfully

