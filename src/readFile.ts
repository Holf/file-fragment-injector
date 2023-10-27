import fs from "fs";
import { NodeError } from "./NodeError";

export const readFile = function (filePath: string, fileType: string): string {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        return data;
    } catch (e: unknown) {
        const error = e as NodeError;

        let message = `Cannot read ${fileType}. `;

        switch (error.code) {
            case "ENOENT":
                message += `There is no file at path '${filePath}'.`;
                break;
            case "EISDIR":
                message += `'${filePath}' is a directory, not a file.`;
                break;
            case "EACCES":
                message += `Insufficient permissions to read the file at '${filePath}'.`;
                break;
            default:
                message += `An unexpected error occurred trying to read '${filePath}': ${error.message}`;
        }

        throw new Error(message, { cause: error });
    }
};
