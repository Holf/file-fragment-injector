const fs = require("fs");
const injectFileFragment = require("./index.js");

describe("File fragment injection", () => {
  it("should", () => {
    injectFileFragment(
      "./testAssets/sourceFile.html",
      "./testAssets/destFile.html"
    );

    const generatedFile = fs.readFileSync("./testAssets/destFile.html", "utf8");

    expect(generatedFile).toMatchSnapshot();
  });
});
