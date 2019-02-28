
var path = require('path');
var friends = require('../data/friends.js');


module.exports = function(app) {

	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	
	app.post('/api/friends', function(req, res) {

		var userInput = req.body;

		var userResponses = userInput.scores;

		var matchName = '';
		var matchImage = '';
		var totalDifference = 100; // Make the initial value big -- having it set to 0 caused it to never find a match

		for (var i = 0; i < friends.length; i++) {
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}
			// If friends[i] has lowest difference then send back match
			if (diff < totalDifference) {
				totalDifference = diff;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
		}

		friends.push(userInput);

		res.status(200).json({matchName: matchName, matchImage: matchImage});
		
	});
};