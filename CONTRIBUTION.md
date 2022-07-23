# Contribution Guide

This is a document for guidance on how to contribute to the Atlas project. Before starting to contribute, check out the [open issues](https://github.com/gpmc-lab-ufrgs/atlas/issues).

See the guidelines below for each type of contribution:

- [Where to start contributing?](#start-contributing)
- [Report bugs](#found-a-bug)
- [Fix errors](#fixed-a-bug)

## Start Contributing
Want to start contributing to the app? The process in general is quite simple:

1. Create an issue describing a feature you want to work or access open issues (if you start with an existing issue, comment on the issue you are developing).
2. Write your code, tests and documentation
3. Open a pull request describing your proposed changes
4. Your pull request will be reviewed by at least two maintainers, who may raise concerns about any necessary changes or issues.

Check out our issues, especially those tagged **```help-wanted```** and **```good-first-issue```**, which are ideal for starting to contribute.

### Branch policies
```<issue id>-<branch name>```

### Commit policies
```<commit type>: <commit description>```

There are many commits types, like:
- **```feat```** : New functionality or test
- **```refactor```**: Code refactoring
- **```fix```**: Fix a problema

You can follow the description used by [gitmoji](https://gitmoji.dev/) :)

## Found a Bug?
If you have found any errors in the application, let us know through an issue, so we can always be improving. We ask that it be descriptive, that way we can identify and reproduce the error to fix it.

Before reporting the bug, see the [issues with `bug` tag](https://github.com/gpmc-lab-ufrgs/atlas/labels/bug) and check if the bug identified is already there.

For good documentation:
* Name the issue with a clear and descriptive name according to the problem;
* Describe the step by step to get to the error found;
* Show examples of the error;
* Describe the expected behavior and the obtained behavior;
* Tag the created issue with the `bug` tag.

See the following issue structure:
``` markdown
---
name: Bug
about: Bug description
title: ''
labels: bug
assignees: ''

---

## Description
A clear and concise description of the error. Explanation of what can be done to be fixed

## Tasks
- [ ]
- [ ]
```

## Fixed a Bug?
To submit your solution and fix an existing bug, fork our repository and create a Pull Request describing the issue and how it was fixed.

For a good Pull Request:
* Name the PR descriptively and clearly according to the problem solved;
* Describe the problem and its solution;
* Mark the issue that PR resolves.

See the example below:
```markdown
## Motivation

<!-- In the motivation section, you need to explain around what has behind these changes, like a purpose of changes and what benefits do we get -->

## Changes

<!-- In the changelog section, you can add the changes in an objective way -->

- Something that added/fixed/changed

## Status Checklist

<!-- In the status section, you can mark what you have already done -->

- [ ] Test

## Screenshots

<!-- If you are adding a layout change, you can show the images below -->

| Before | After |
| ------ | ----- |
| image before | image after |

## Testing

<!-- How do we test the implementation? -->

- Access the url /employees

```