import { readFileSync } from "fs";
import { readFile } from "./readFile";
import { NodeError } from "./NodeError";

jest.mock("fs");

const readFileSyncMock = readFileSync as jest.Mock;

const filePath = "./anyOldFilePath";
const fileType = "Template File";

describe("Read File", () => {
    [
        {
            errorCode: "ENOENT",
            errorMessage: `Cannot read ${fileType}. There is no file at path '${filePath}'.`,
        },
        {
            errorCode: "EISDIR",
            errorMessage: `Cannot read ${fileType}. '${filePath}' is a directory, not a file.`,
        },
        {
            errorCode: "EACCES",
            errorMessage: `Cannot read ${fileType}. Insufficient permissions to read the file at '${filePath}'.`,
        },
        {
            errorCode: null,
            errorMessage: `Cannot read ${fileType}. An unexpected error occurred trying to read '${filePath}': Mocked Error`,
        },
    ].forEach(({ errorCode, errorMessage }) => {
        it(`should throw the correct friendly error for an '${errorCode}' error`, () => {
            const error = new Error("Mocked Error") as NodeError;
            error.code = errorCode;

            readFileSyncMock.mockImplementationOnce(() => {
                throw error;
            });

            let errorToValidate;

            try {
                readFile(filePath, fileType);
            } catch (e: unknown) {
                errorToValidate = e as NodeError;
            }

            expect(errorToValidate!.cause).toBe(error);
            expect(errorToValidate!.message).toBe(errorMessage);
        });
    });
});
