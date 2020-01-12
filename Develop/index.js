const inquirer = require("inquirer");
const electron = require("electron");
const generateHtml = require("./generateHTML");
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
    .then(function (answer)
     {
         console.log(answer);
         const color = answer.color;
         const userName = answer.userName;
        api.retrieveUser(userName)
        .then(function(data) {
            api.getUserStars(userName) 
            .then(function(stars) {
                return generateHtml({
                    stars, 
                    color,
                    ...data
                });
            })
            .catch(function (err) {
                console.log(err);
                process.exit(1);
            });
        })
        .then(function(html) {
            const convert = convertFactory({
                converterPath: convertFactory.converters.PDF
            });
            convert({html}, function(err, res){
                if (err) {
                    throw err;
                }
                res.stream.pipe(
                    fs.createWriteStream(path.join(__dirname, "resume.pdf"))
                );
                convert.kill();
            });
            open(path.join(process.cwd(), "resume.pdf"));
        });

    });