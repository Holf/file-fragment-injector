#!/usr/bin/env node

const injectFileFragment = require("./index.js");

const [fragmentFilePath, destFilePath, fragmentPlaceholder] =
  process.argv.slice(2);

if (!sourceFile || !fragmentFile || !placeholder) {
  console.error(
    "You must provide a Fragment File Path, a Destination File Path, and a Fragment Placeholder."
  );
  process.exit(1);
}

injectFileFragment(fragmentFilePath, destFilePath, fragmentPlaceholder);
