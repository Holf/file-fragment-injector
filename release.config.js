module.exports = {
    // This will be changed to 'main' once we're happy with everything
    branches: "prep-for-publish",
    plugins: [
        [
            "@semantic-release/git",
            {
                assets: ["package.json"], // Add other files you want to commit here
                message:
                    "chore(release): set `package.json` to ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
            },
        ],
    ],
};
