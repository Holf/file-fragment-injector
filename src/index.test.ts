import { readFileSync } from "fs";
import { injectFileFragments } from "./index";

const targetFilePath = "./testAssets/generated/destFile.html";

describe("File fragment injection", () => {
    it("should inject file fragments", () => {
        injectFileFragments("./testAssets/sourceFile.html", targetFilePath);

        const generatedFile = readFileSync(targetFilePath, "utf8");

        expect(generatedFile).toMatchSnapshot();
    });
});
