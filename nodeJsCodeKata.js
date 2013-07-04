"use strict";

var http = require("http"), fs = require("fs");

var server = http.createServer(function (req, res) {

    fs.readFile('football.dat', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        var lines = data.split('\n'), goalDifference, team = "Hmm we have an error";

        lines.forEach(function(line) {
            var tableRow = line.replace(/\s+/g, ",");
            tableRow = tableRow.split(',');

            if (tableRow.length === 11) {
                if (goalDifference === undefined || Math.abs(tableRow[7] - tableRow[9]) < goalDifference) {
                    goalDifference = Math.abs(tableRow[7] - tableRow[9]);
                    team = tableRow[2];
                }
            }

        });

        console.log("Smallest goal difference is " + team + " " + goalDifference);

        res.end("Smallest goal difference is " + team + " " + goalDifference + "\n");
    });

});


server.listen(8080);