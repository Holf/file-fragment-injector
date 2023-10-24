#!/usr/bin/env node

const { injectFileFragments } = require("./src/index.js");

const [templateFilePath, generatedFilePath] = process.argv.slice(2);

if (!templateFilePath || !generatedFilePath) {
    console.error("You must provide a Source File Path and a Destination File Path.");
    process.exit(1);
}

injectFileFragments(templateFilePath, generatedFilePath);
