import { injectFileFragment } from "./index.mjs";

describe("File fragment injection (ESM)", () => {
    it("should be able to import an ECMAScript Module instance", () => {
        expect(injectFileFragment).toEqual(expect.any(Function));
        expect(injectFileFragment.name).toEqual("injectFileFragment");
    });
});
