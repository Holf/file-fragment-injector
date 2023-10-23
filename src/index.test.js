const fs = require("fs");
const { injectFileFragments } = require("./index.js");

const targetFilePath = "./testAssets/generated/destFile.html";

describe("File fragment injection", () => {
    it("should inject file fragments", () => {
        injectFileFragments("./testAssets/sourceFile.html", targetFilePath);

        const generatedFile = fs.readFileSync(targetFilePath, "utf8");

        expect(generatedFile).toMatchSnapshot();
    });
});
