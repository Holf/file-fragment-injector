const fs = require("fs");
const injectFileFragment = require("./index.js");

const targetFilePath = "./testAssets/generated/destFile.html";

describe("File fragment injection", () => {
    it("should", () => {
        injectFileFragment("./testAssets/sourceFile.html", targetFilePath);

        const generatedFile = fs.readFileSync(targetFilePath, "utf8");

        expect(generatedFile).toMatchSnapshot();
    });
});
