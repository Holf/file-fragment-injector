# Inject File Fragments

`@drtrt/inject-file-fragments` is for those moments when all you want to do is inject the contents of one file into another, in the simplest and most framework-free manner possible.

## Example

This example uses two fragment files, each of which will be injected into an HTML template.

### Fragments

`fragment1.js`:

```js
console.log("Why, hello there.");
```

`fragment2.html`:

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
            /*% FRAGMENT_PATH:./fragmentFile1.js %*/
        </script>
    </head>

    <body>
        <!--% FRAGMENT_PATH:./fragmentFile2.html %-->
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
        <div>Hello, again</div>
    </body>
</html>
```

## Why?

Many JavaScript bundlers have features or plugins that allow you to inject content from one file into another. `Parcel`, `Rollup`, `Vite` and `webpack`, for example, can all be persuaded to do this.

However, this can mean finding the right plugin, of which there are sometimes many, and making sure it is suitable for the file type that you are working with; what works with an HTML file might not also work for CSS.

Additionally, for anything other than the most straightforward cases, the configuration for getting file injection to work can become involved. What is more, sometimes a development framework will include an injection-capable bundler, but the framework conventions do not allow this functionality to be easily exposed.

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
<html lang="en" data-ver="/*% FRAGMENT_PATH:./gitCommitShortHash.txt %*/">
    ...
</html>
```

... and then:

```sh
$ inject-file-fragments index.html.template index.html
```

... gives the result:

```html
<!doctype html>
<html lang="en" data-ver="72fc5cb">
    ...
</html>
```

## Release History

The Change Log for this package is available in the GitHub Repo, [here](https://github.com/drtrt-org/inject-file-fragments/blob/main/CHANGELOG.md).
