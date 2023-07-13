const fs = require("fs");
const path = require("path");

const fragmentPlaceholderRegEx = /<!--% *FRAGMENT_PATH:(.*?) *%-->/g;

const injectFileFragment = (sourceFilePath, destFilePath) => {
  const sourceFileContent = fs.readFileSync(sourceFilePath, "utf8");

  const result = sourceFileContent.replace(
    fragmentPlaceholderRegEx,
    (match, fragmentRelativeFilePath) => {
      const fragmentAbsoluteFilePath = path.join(
        path.dirname(sourceFilePath),
        fragmentRelativeFilePath
      );

      const fragmentFileContent = fs.readFileSync(
        fragmentAbsoluteFilePath,
        "utf8"
      );
      return fragmentFileContent;
    }
  );

  fs.writeFileSync(destFilePath, result);
};

module.exports = injectFileFragment;
