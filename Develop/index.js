const inquirer = require("inquirer");
const axios = require("axios");
const electron = require("electron");
const generateHtml = require("./generateHTML");
const fs = require("fs");

inquirer
    .prompt({
        message: "Enter your GitHub username",
        name: "username"
    });
const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
axios.get(queryUrl)
    .then(function (response) {
        // handle success
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });