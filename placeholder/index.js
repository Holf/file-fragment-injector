#!/usr/bin/env node

console.log("\x1b[8m\x1b[31m%s\x1b[0m", "_");

console.log("\x1b[1m\x1b[31m%s\x1b[0m", "This package is deprecated...\n");

console.log(
    "\x1b[1m\x1b[33m%s\x1b[0m",
    "To use `inject-file-fragments` please install the equivalent package from:\n",
);

console.log(
    "\x1b[1m\x1b[36m%s\x1b[0m",
    "  - https://www.npmjs.com/package/@drtrt/inject-file-fragments\n",
);
