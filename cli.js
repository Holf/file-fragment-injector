#!/usr/bin/env node

// The following import is generated, but eslint doesn't know this. So:
// eslint-disable-next-line node/no-unpublished-import, node/no-missing-import
import { injectFileFragments } from "./dist/index.js";

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
