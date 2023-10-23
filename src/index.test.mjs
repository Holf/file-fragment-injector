import { injectFileFragments } from "./index.mjs";

describe("File fragment injection (ESM)", () => {
    it("should be able to import an ECMAScript Module instance", () => {
        expect(injectFileFragments).toEqual(expect.any(Function));
        expect(injectFileFragments.name).toEqual("injectFileFragments");
    });
});
