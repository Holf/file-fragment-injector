const fs = require("fs");
const path = require("path");
const { placeholderRegExp } = require("./placeholderRegExp");

const injectFileFragments = (templateFilePath, generatedFilePath) => {
    const sourceFileContent = fs.readFileSync(templateFilePath, "utf8");

    const result = sourceFileContent.replace(
        placeholderRegExp,
        (match, fragmentRelativeFilePath) => {
            const fragmentAbsoluteFilePath = path.join(
                path.dirname(templateFilePath),
                fragmentRelativeFilePath,
            );

            const fragmentFileContent = fs.readFileSync(fragmentAbsoluteFilePath, "utf8");
            return fragmentFileContent;
        },
    );

    fs.writeFileSync(generatedFilePath, result);
};

module.exports = { injectFileFragments };
