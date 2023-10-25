module.exports = {
    branches: "main",
    plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        [
            "@semantic-release/changelog",
            {
                changelogFile: "CHANGELOG.md",
            },
        ],
        "@semantic-release/npm",
        [
            "@semantic-release/git",
            {
                assets: ["package.json", "CHANGELOG.md"],
                message:
                    "chore(release): set `package.json` to ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
            },
        ],
        [
            "@semantic-release/github",
            {
                successComment:
                    "This PR has been included in release version ${{nextRelease.version}} :tada:",
                failComment: "The release failed with the following error: ${{error.message}}",
                releasedLabels: ["released"], // Label to add to released issues and PRs
                issue: {
                    successComment:
                        "This issue has been resolved in version ${{nextRelease.version}} :tada:",
                    failComment:
                        "There was a problem with the release of version ${{nextRelease.version}}, that should have addressed this issue. The error was: ${{error.message}}",
                    failTitle: "Release failed for version ${{nextRelease.version}}",
                },
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
