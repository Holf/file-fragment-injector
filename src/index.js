const fs = require("fs");
const path = require("path");
const { placeholderRegExp } = require("./placeholderRegExp");
const { readFile } = require("./readFile");

const injectFileFragments = (templateFilePath, generatedFilePath) => {
    if (!templateFilePath || !generatedFilePath) {
        throw new Error(
            "You must provide both 'templateFilePath' and 'destinationFilePath' arguments.",
        );
    }

    const templateFileContent = readFile(templateFilePath, "Template File");

    const result = templateFileContent.replace(
        placeholderRegExp,
        (match, fragmentRelativeFilePath) => {
            const fragmentAbsoluteFilePath = path.join(
                path.dirname(templateFilePath),
                fragmentRelativeFilePath,
            );

            const fragmentFileContent = readFile(fragmentAbsoluteFilePath, "Fragment File");
            return fragmentFileContent;
        },
    );

    fs.writeFileSync(generatedFilePath, result);
};

module.exports = { injectFileFragments };
