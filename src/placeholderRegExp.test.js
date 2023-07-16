const { placeholderRegExp } = require("./placeholderRegExp");

describe(`Placeholder RegExp:\n${placeholderRegExp}\n`, () => {
    describe("Parsing various comment types", () => {
        const filePaths = ["./fragmentFile1.html", "./fragmentFile2.html"];

        const scenarios = [
            {
                scenarioName: "XML, HTML, etc.",
                placeholder: (filePath) => `<!--% FRAGMENT_PATH:${filePath} %-->`,
            },
            {
                scenarioName: "C, C++, Java, etc.",
                placeholder: (filePath) => `/*% FRAGMENT_PATH:${filePath} %*/`,
            },
            {
                scenarioName: "Shells, Python, Ruby, etc.",
                placeholder: (filePath) => `#% FRAGMENT_PATH:${filePath} %#`,
            },
            {
                scenarioName: "Powershell",
                placeholder: (filePath) => `<#% FRAGMENT_PATH:${filePath} %#>`,
            },
        ];

        scenarios.forEach(({ scenarioName, placeholder }) => {
            it(`should handle ${scenarioName} comments`, () => {
                const placeholders = filePaths.map((filePath) => placeholder(filePath));

                const sourceFileContent = `Some text
      ${placeholders[0]}
Some more text
${placeholders[1]}
and yet more text`;

                const result = [...sourceFileContent.matchAll(placeholderRegExp)].map(
                    ([match, filePath]) => [match, filePath],
                );

                expect(result).toStrictEqual([
                    [placeholders[0], filePaths[0]],
                    [placeholders[1], filePaths[1]],
                ]);
            });
        });
    });

    describe("Ignoring comments that don't fit the identifying conditons", () => {
        const scenarios = [
            {
                scenarioName: "Leading '%' is missing",
                placeholder: "<!-- FRAGMENT_PATH:./my/file/path.js %-->",
            },
            {
                scenarioName: "Trailing '%' is missing",
                placeholder: "<!--% FRAGMENT_PATH:./my/file/path.js -->",
            },
            {
                scenarioName: "Typo in 'FRAGMENT_PATH'",
                placeholder: "<!--% FRGMENT_PATH:./my/file/path.js %-->",
            },
            {
                scenarioName: "Standard HTML-style comment",
                placeholder: "<!-- This is a comment -->",
            },
            {
                scenarioName: "Standard C-style comment",
                placeholder: "/* This is a comment */",
            },
            {
                scenarioName: "Standard Powershell comment",
                placeholder: "<# This is a comment /#>",
            },
            {
                scenarioName: "Standard Shell-style comment",
                placeholder: "# This is a comment",
            },
        ];

        scenarios.forEach(({ scenarioName, placeholder }) => {
            it(`should ignore ${scenarioName}`, () => {
                const sourceFileContent = `Some text
        ${placeholder}
Some more text`;

                expect(placeholderRegExp.test(sourceFileContent)).toBe(false);
            });
        });
    });

    describe("Confirming permissive spacing", () => {
        const scenarios = [
            {
                scenarioName: "One space after comment opener",
                placeholder: "/*% FRAGMENT_PATH:./my/file/path.js %*/",
            },
            {
                scenarioName: "No space after comment opener",
                placeholder: "/*%FRAGMENT_PATH:./my/file/path.js %*/",
            },
            {
                scenarioName: "Many spaces after comment opener",
                placeholder: "/*%     FRAGMENT_PATH:./my/file/path.js %*/",
            },
            {
                scenarioName: "One space before comment closer",
                placeholder: "/*% FRAGMENT_PATH:./my/file/path.js %*/",
            },
            {
                scenarioName: "No space before comment closer",
                placeholder: "/*% FRAGMENT_PATH:./my/file/path.js%*/",
            },
            {
                scenarioName: "Many spaces before comment closer",
                placeholder: "/*% FRAGMENT_PATH:./my/file/path.js     %*/",
            },
            {
                scenarioName: "One space between FRAGMENT_PATH and file path",
                placeholder: "/*% FRAGMENT_PATH: ./my/file/path.js %*/",
            },
            {
                scenarioName: "Many space between FRAGMENT_PATH and file path",
                placeholder: "/*% FRAGMENT_PATH:    ./my/file/path.js %*/",
            },
            {
                scenarioName: "Spaces everywhere",
                placeholder: "/*%     FRAGMENT_PATH:    ./my/file/path.js     %*/",
            },
        ];

        scenarios.forEach(({ scenarioName, placeholder }) => {
            it(`should ignore ${scenarioName}`, () => {
                const sourceFileContent = `Some text
        ${placeholder}
Some more text`;

                const result = [...sourceFileContent.matchAll(placeholderRegExp)].map(
                    ([match, filePath]) => [match, filePath],
                );

                expect(result).toStrictEqual([[placeholder, "./my/file/path.js"]]);
            });
        });
    });
});
