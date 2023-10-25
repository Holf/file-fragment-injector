module.exports = {
    // This will be changed to 'main' once we're happy with everything
    branches: "generate-release-notes",
    plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        [
            "@semantic-release/changelog",
            {
                changelogFile: "CHANGELOG.md",
            },
        ],
        // "@semantic-release/npm",
        [
            "@semantic-release/git",
            {
                assets: ["package.json", "CHANGELOG.md"], // Add other files you want to commit here
                message:
                    "chore(release): set `package.json` to ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
            },
        ],
    ],
    releaseRules: [
        {
            type: "docs",
            release: "patch",
        },
    ],
};
