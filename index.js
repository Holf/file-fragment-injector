const fs = require("fs");
const path = require("path");

const telomeres = [
  // XML, HTML, etc.
  ["<!--", "-->"],
  // C, C++, Java, etc.
  [/\/\*/, /\*\//],
  // Shells, Python, Ruby, etc.
  ["#", "#"],
  // Powershell
  ["<#", "#>"]
];

const [commentOpeners, commentClosers] = telomeres.reduce(
  ([start, end], [fragmentStart, fragmentEnd]) => {
    const fragmentStartString = fragmentStart.source
      ? fragmentStart.source
      : fragmentStart;
    const fragmentEndString = fragmentEnd.source
      ? fragmentEnd.source
      : fragmentEnd;

    if (!start) {
      return [fragmentStartString, fragmentEndString];
    }

    return [`${start}|${fragmentStartString}`, `${end}|${fragmentEndString}`];
  },
  []
);

const bigglyRegex = new RegExp(
  `(?:${commentOpeners})% *FRAGMENT_PATH: *(.*?) *%(?:${commentClosers})`,
  "g"
);

const injectFileFragment = (sourceFilePath, destFilePath) => {
  const sourceFileContent = fs.readFileSync(sourceFilePath, "utf8");

  const result = sourceFileContent.replace(
    bigglyRegex,
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
