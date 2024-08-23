#!/usr/bin/env node

import { injectFileFragments } from "./dist/index.js";

const [templateFilePath, generatedFilePath] = process.argv.slice(2);

try {
    injectFileFragments(templateFilePath, generatedFilePath);
} catch (error) {
    console.log(error.message);
    process.exit(1);
}
