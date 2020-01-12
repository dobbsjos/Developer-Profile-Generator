const axios = require("axios");
require('dotenv').config();

const api = {
    retrieveUser(userName) {
        const queryUrl = `https://api.github.com/users/${userName}`;
        return axios.get(queryUrl)
        .catch(function (err) {
            console.log(err);
            process.exit(1);
        });
    },
    getUserStars(userName) {
        const queryUrl = `https://api.github.com/users/${userName}/repos?per_page=100`;
        axios.get(queryUrl).then(function (res) {
            const totalStars = res.data.reduce(function (accumulator, currentValue) {
                return accumulator + currentValue.stargazers_count;
                }, 0);
            console.log(totalStars);
            return totalStars;
        }).catch(function (err) {
            console.log(err);
            process.exit(1);
        });
        
    }
};
module.exports = api;