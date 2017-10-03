"use strict";

const fs = require('fs');
const path = require('path');
const deprecatedFileMap = require('./deprecatedFileMap');
const checkError = err => {
    if (err) {
        throw err;
    }
};

/**
 * Builds a JSON list of all the SVGs and writes to file. Important to include in the package in case someone needs a
 * list of all the icons ie. you want to render all of them.
 */
const buildList = () => {
    const rootPath = path.resolve(__dirname, '../');
    fs.readdir(`${rootPath}/src`, (error, ls) => {
        checkError(error);
        const deprecatedFileNames = Object.keys(deprecatedFileMap).map(fileName => `${fileName}.svg`);
        const svgs = ls.filter(fileName => fileName.match(/\.svg$/)).filter(fileName => !deprecatedFileNames.includes(fileName));
        fs.writeFile(
            `${rootPath}/list.json`,
            JSON.stringify(svgs, null, 2),
            { encoding: "UTF-8" },
            err => checkError(err)
        );
    });
};

buildList();
