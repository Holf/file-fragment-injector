// Order matters! For example, the Powershell cloaser ('#>') must
// go before the Shell closer ('#'), as it is more specific.
const commentDelimiters = [
    // XML, HTML, etc.
    ["<!--", "-->"],
    // C, C++, Java, etc.
    [/\/\*/, /\*\//],
    // Powershell
    ["<#", "#>"],
    // Shells, Python, Ruby, etc.
    ["#", "#"],
];

const [commentOpenersRegExp, commentClosersRegExp] = commentDelimiters.reduce(
    ([commentOpeners, commentClosers], [opener, closer]) => {
        const fragmentStartString: string = opener instanceof RegExp ? opener.source : opener;
        const fragmentEndString: string = closer instanceof RegExp ? closer.source : closer;

        if (!commentOpeners) {
            return [fragmentStartString, fragmentEndString];
        }

        return [
            `${commentOpeners}|${fragmentStartString}`,
            `${commentClosers}|${fragmentEndString}`,
        ];
    },
    [],
);

export const placeholderRegExp = new RegExp(
    `(?:${commentOpenersRegExp})% *FRAGMENT_PATH: *(.*?) *%(?:${commentClosersRegExp})`,
    "g",
);
