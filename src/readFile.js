const fs = require("fs");

function readFile(filePath, fileType) {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        return data;
    } catch (error) {
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
}
exports.readFile = readFile;
