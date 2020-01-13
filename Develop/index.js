const inquirer = require("inquirer");
const electron = require("electron");
const generateHtml = require("./generateHTML");
const axios = require("axios");
var fs = require('fs'),
    convertFactory = require('electron-html-to');
require('dotenv').config();
const api = require("./api");

const questions = [
    {
        type: "input",
        message: "Enter your GitHub username:",
        name: "userName"

    },
    {
        type: "input",
        message: "What is you favorate color?",
        name: "color"
    }
]
inquirer
    .prompt(questions)
    .then(function (answers)
     {
         const dataToHtml = {
             color: answers.color 
         }
         
         axios.get(`https://api.github.com/users/${answers.userName}`)
            .then(function(gitUserData){
                    dataToHtml.data = gitUserData.data;
                    // console.log((dataToHtml));
                axios.get(`https://api.github.com/users/${answers.userName}/repos?per_page=100`)
                .then(function(res){
                    const totalStars = res.data.reduce(function (accumulator, currentValue) {
                        return accumulator + currentValue.stargazers_count;
                        }, 0);
                    console.log(totalStars);
                    dataToHtml.stars = totalStars;
                    console.log((dataToHtml));
                    
                        const htmlDataReady = generateHtml(dataToHtml)

                        var conversion = convertFactory({
                            converterPath: convertFactory.converters.PDF
                          });
                           
                          conversion({ html: htmlDataReady }, function(err, result) {
                            if (err) {
                              return console.error(err);
                            }
                           
                            console.log(result.numberOfPages);
                            console.log(result.logs);
                            result.stream.pipe(fs.createWriteStream('resume.pdf'));
                            conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
                          });


                })



            })

    });