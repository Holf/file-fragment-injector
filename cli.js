#!/usr/bin/env node

const { injectFileFragments } = require("./src/index.js");

const [templateFilePath, generatedFilePath] = process.argv.slice(2);

try {
    injectFileFragments(templateFilePath, generatedFilePath);
} catch (error) {
    console.log(error.message);
    // We do not want to throw, here. Rather we want our nice, CLI-friendly error
    // message to appear only, so:
    // eslint-disable-next-line no-process-exit
    process.exit(1);
}
