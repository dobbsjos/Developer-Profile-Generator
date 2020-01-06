const inquirer = require("inquirer");
const axios = require("axios");
const electron = require("electron");
const generateHtml = require("./generateHTML");
var fs = require('fs'),
    convertFactory = require('electron-html-to');
require('dotenv').config();


inquirer
    .prompt([{
            message: "Enter your GitHub username:",
            name: "username"

        },
        {
            message: "What is you favorate color?",
            name: "color"
        }
    ])
    .then(function ({
        username
    }) {
        const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

        axios.get(queryUrl).then(function (res) {
            const repoNames = res.data.map(function (repo) {
                return repo.name;
            });

            const repoNamesStr = repoNames.join("\n");

            fs.writeFile("profile.html", repoNamesStr, function (err) {
                if (err) {
                    throw err;
                }
                generateHtml();

                console.log(`Saved ${repoNames.length} repos`);
            });
        });
    });
    