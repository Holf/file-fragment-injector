# Inject File Fragments

`@drtrt/inject-file-fragments` is for those moments when all you want to do is inject the contents of one file into another, in the simplest and most framework-free manner possible.

[![CI status](https://img.shields.io/badge/ci-passing-green)](https://github.com/drtrt-org/inject-file-fragments/actions/workflows/CI.yml)
[![NPM version](https://img.shields.io/npm/v/@drtrt/inject-file-fragments)](https://www.npmjs.com/package/@drtrt/inject-file-fragments)
[![License](https://img.shields.io/npm/l/@drtrt/inject-file-fragments)](./LICENSE)
[![NPM bundle size analysis](https://img.shields.io/bundlephobia/minzip/@drtrt/inject-file-fragments)](https://bundlephobia.com/package/@drtrt/inject-file-fragments)

## Example

This example uses two fragment files, each of which will be injected into an HTML template.

### Fragments

`fragment_1.js`:

```js
console.log("Why, hello there.");
```

`fragment_2.html`:

```html
<div>Hello, again.</div>
```

### Template

`index.html.template`:

```html
<!doctype html>
<html lang="en">
    <head>
        <title>Greetings to all</title>

        <script>
            /*% FRAGMENT_PATH: ./fragment_1.js %*/
        </script>
    </head>

    <body>
        <!--% FRAGMENT_PATH: ./fragment_2.html %-->
    </body>
</html>
```

### Result

Executing the command:

```sh
$ inject-file-fragments index.html.template index.html
```

... gives us the result:

`index.html`:

```html
<!doctype html>
<html lang="en">
    <head>
        <title>Greetings to all</title>

        <script>
            console.log("Why, hello there.");
        </script>
    </head>

    <body>
        <div>Hello, again.</div>
    </body>
</html>
```

## Installation

#### NPM

```sh
npm install @drtrt/inject-file-fragments -D
```

#### Yarn

```sh
yarn add @drtrt/inject-file-fragments -D
```

## Usage

The example above is self-explanatory. However, there are some points to bear in mind:

### The path to a Fragment File should be specified in the placeholder

This makes for a straightforward configuration, as it is very clear to see which fragment will end up in which placeholder.

For example:

`index.html.template`:

```html
<!doctype html>
<html lang="en">
    <head>
        <script>
            /*% FRAGMENT_PATH: ./fragment_1.js %*/
        </script>
    </head>
</html>
```

Here, we can see that it is the contents of `fragment_1.js` that will be injected, and we can see exactly where this will happen.

_**Note**: Fragment File paths are relative to the template file. In the example above, `fragment_1.js` is in the same folder as `index.html.template`_.

### Any common comment type can be used

This allows placeholders to be used in many different template types, without causing linting complaints or formatting issues in Code Editors:

| Comment Type                                  | Example                                     |
| --------------------------------------------- | ------------------------------------------- |
| `XML`, `HTML`, etc.                           | `<!--% FRAGMENT_PATH: ./fragment.html %-->` |
| `C`, `C++`, `CSS`, `Java`, `JavaScript`, etc. | `/*% FRAGMENT_PATH: ./fragment.cs %*/`      |
| `sh`, `bash`, `Python`, `Ruby`, etc.          | `#% FRAGMENT_PATH: ./fragment.sh %#`        |
| `PowerShell`                                  | `<#% FRAGMENT_PATH: ./fragment.ps1 %#>`     |

### The Placeholder comment format must be precise

The examples in the table above give the general idea:

-   The comment opener & closer should each include a `%` symbol.
-   The comment opener should be followed by `FRAGMENT_PATH:`
-   This should then be followed by the path to the Fragment File.

Aside from this, the parser is quite permissive regarding use of whitespace.

### Placeholder comments do not have to be on a separate line

This would work fine, for example:

<!-- prettier-ignore-start -->
```html
<!doctype html>
<html lang="en">
    <head>
        <script>/*% FRAGMENT_PATH: ./fragment_1.js %*/</script>
    </head>
</html>
```
<!-- prettier-ignore-end -->

_**Note**: The entire comment is removed as part of the injected content substitution_.

## Consumption from Node.js

The main use case for `@drtrt/inject-file-fragments` is from the command line during build processes. But, it can also be used in Node.js projects:

#### ECMAScript Modules (ESM)

```javascript
import { injectFileFragments } from "@drtrt/inject-file-fragments";

injectFileFragments(templateFilePath, generatedFilePath);
```

#### CommonJS (CJS)

```javascript
const { injectFileFragments } = require("@drtrt/inject-file-fragments");

injectFileFragments(templateFilePath, generatedFilePath);
```

## Why?

Many JavaScript bundlers have features or plugins that allow you to inject content from one file into another. `Parcel`, `Rollup`, `Vite` and `webpack`, for example, can all be persuaded to do this.

However, this can mean finding the right plugin, of which there are sometimes many, and making sure it is suitable for the file type that you are working with; what works with an HTML file might not also work for CSS.

Additionally, for anything other than the most straightforward cases, the configuration for getting file injection to work can become involved. What is more, sometimes a development framework will include an injection-capable bundler, but the framework conventions prevent this functionality from being easily exposed.

In these situations, you want a tool which will do file injection, and only file injection, in as simple and straightforward a way possible.

## Questions

### What if I want to add content to a file directly from the command line?

_For example, I'd like to write a Git Commit hash directly into a `data-ver` attribute on my index page's `html` element._

#### **Answer:** _Write to an intermediary file fragment._

If you write the fragment to a file:

```sh
printf $(git rev-parse --short HEAD) > ./gitCommitShortHash.txt
```

... then you can use `inject-file-fragments` as normal:

`index.html.template`:

```html
<!doctype html>
<html lang="en" data-ver="/*% FRAGMENT_PATH: ./gitCommitShortHash.txt %*/">
    ...
</html>
```

... and then:

```sh
$ inject-file-fragments index.html.template index.html
```

... gives the result:

`index.html`:

```html
<!doctype html>
<html lang="en" data-ver="72fc5cb">
    ...
</html>
```

## Release History

The Change Log for this package is available in the GitHub Repo, [here](https://github.com/drtrt-org/inject-file-fragments/blob/main/CHANGELOG.md).
