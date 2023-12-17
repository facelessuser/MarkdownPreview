# Usage

/// info
When referring to settings, we are referring to the settings found at
`Preferences`->`Package Settings`->`MarkdownPreview`.
///

-   `Settings - User` is where you change your settings for Markdown Preview.
-   `Settings - Default` is a good reference with detailed descriptions for each setting.

## To preview

-   Optionally select some of your markdown for conversion.
-   Use the shortcut ++cmd+shift+p++ then select `MarkdownPreview` to show the follow commands (you will be prompted to
    select which parser you prefer):

    -   Markdown Preview: Preview in Browser
    -   Markdown Preview: Export HTML in Sublime Text
    -   Markdown Preview: Copy to Clipboard
    -   Markdown Preview: Open Markdown Cheat sheet

    ![Usage Demo](images/sublimetext-markdown-preview.gif)

-   Or bind some shortcut in your user key binding, go to `Preferences --> Keybindings` then add to the User map:

    For a specific parser and target:

    ```js
    { "keys": ["alt+m"], "command": "markdown_preview", "args": {"target": "browser", "parser":"markdown"} },
    ```

    To bring up the quick panel to select enabled parsers for a given target:

    ```js
    { "keys": ["alt+m"], "command": "markdown_preview_select", "args": {"target": "browser"} },
    ```

-   If you want to control which browser the preview is opened in, you can edit the `browser` option in the settings file:

    ```js
        /*
            Sets the default opener for HTML files
    
            default - Use the system default HTML viewer
            other - Set a full path to any executable. ex: /Applications/Google Chrome Canary.app or /Applications/Firefox.app
        */
        "browser": "default",
    ```

## Custom Templates

By default, Markdown Preview uses a simple template, but you can use your own custom template with the setting
`html_template`. If you wish to not include the default stylesheets, just remove them from the `css` option.

```js
    /*
        Specify a HTML template file to render your markdown within.

        Available place holders in HTML template:
        {{ HEAD }} - would be replaced by generated stylesheets, javascripts enabled above
        {{ BODY }} - would be replaced by HTML converted from markdown

        By setting "skip_default_stylesheet" to true you can use the styles only in your HTML
        template. In most cases you should turn this setting on to have a full-featured design.

        Refer to 'customized-template-sample.html' as a show case.
    */
    "html_template": "/ABS_PATH_TO_A_HTML_FILE",
```

## LiveReload

To get live updates while editing a file after preview, you need to do the following:

1.  Enable the `enable_autoreload` setting in `MarkdownPreview.sublime-settings`.
    ```js
        /*
            Enable auto-reloaded on save. Will not work if GitHub parser or GitLab parser is used without oauth key specified.
        */
        "enable_autoreload": true,
    ```
2.  Install [LiveReload][live-reload] package from Package Control.
3.  Restart.
4.  Open the command palette and select the command `LiveReload: Enable/disable plug-ins`.
5.  Select `Simple Reload with delay (400ms)`.  It is possible you can get away with `Simple Reload`, but some experience
    an issue where they are one rev behind when using `Simple Reload`.
6.  Edit document and enjoy live reload.

You don't need to enable `Simple Reload` on every file as it is done globally; it can be turned on or off as needed.
From now on, files should auto-reload when you open them in the browser unless you disable `Simple Reload`.

## Preview Path Conversion

In the generated previews, paths are converted so that images and other links work properly. By default, paths are
converted to absolute paths, but you can use relative if desired as well.  Image paths can also be changed to inject
embedded base 64 images (only for local images). Path handling is controlled by the following two settings:

```js
    /*
        Sets how image paths are handled.
        Setting is a string value: (absolute | relative | base64 | none)
            absolute: converts relative local paths to absolute
            relative: converts relative local paths to a path relative to the
                        HTML output
            base64: coverts the local file to base64 and embeds it in the HTML
            none: does nothing
    */
    "image_path_conversion": "absolute",

    /*
        Sets how file paths are handled.
        Setting is a string value: (absolute | relative | none)
            absolute: converts relative local paths to absolute
            relative: converts relative local paths to a path relative to the
                        HTML output
            none: does nothing
    */
    "file_path_conversions": "absolute",
```

## Preview Temp Location

By default, previews are generated in the OSs default temp location, but you can specify your own custom temp location
via the `path_tempfile` option:

```js
    /*
        Sets a custom temporary folder for MarkdownPreview-generated HTML files. Useful if you're
        using LiveReload and don't want to use the OS default. The directory will be created if it
        doesn't exist. Relative paths are supported, and are checked against `os.path.isabs`, see
        doc: http://docs.python.org/3/library/os.path.html#os.path.isabs
        Environment variables and user "~" placeholder are supported.
        see docs: https://docs.python.org/3/library/os.path.html#os.path.expanduser
        see docs: https://docs.python.org/3/library/os.path.html#os.path.expandvars

        Examples: /tmp/custom_folder   (Linux/OSX - absolute path)
                    C:/TEMP/MYNOTES
                    C:\\TEMP\\MYNOTES    (Windows - absolute path, forward slash or escaped back slash)
                    build                (All OS - relative path, current dir)
                    ../build             (Linux/OSX - relative path, in parent dir)
                    ..\\build            (Windows - relative path, in parent dir)
    */
    "path_tempfile": "/tmp/my_notes",
```

## Enabling Other External Markdown Parsers

External parser commands and arguments should first be mapped to a name.  Each binary value must be an array with the
path to the binary being first, followed by flags and options as individual indexes in the array.

```js
    "markdown_binary_map": {
        "multimarkdown": ["/usr/local/bin/multimarkdown", "--some-option", "some-value"]
    },
```

Then the name can be placed in `enabled_parsers` to enable use of the new parser.

```js
    "enabled_parsers": ["markdown", "github", "gitlab", "multimarkdown"],
```

## Configuring Python Markdown Extensions

Python Markdown comes with a number of extensions and can also use a number of 3rd party extensions.  To configure
Markdown Preview with extensions, use the `markdown_extensions` setting.

`markdown_extensions` is a setting that contains an array of extensions in the format of their import path. For
instance, the Toc (Table of Contents) extension is found in the Markdown Package at `markdown.extensions.toc`.  This is
according to Python Markdown [documentation][toc].  All extensions must be specified this way.

```js
    "markdown_extensions": [
        "markdown.extensions.toc"
    ]
```

To configure an extension, make the entry a dictionary.  In this example, we want to turn on Toc's permalink feature:

```js
    "markdown_extensions": [
        {
            "markdown.extensions.toc": {
                "permalink": true
            }
        }
    ]
```

You can configure extension options with strings, booleans, integers, floats, etc.  But sometimes, an extension can take
a function.  Functions are not part of the JSON spec. Luckily, support has been added with the following syntax:

To specify a function, create an object whose key is named `!!python/name`, and whose value is the import path of the
function.  This syntax was picked to be similar to PyYaml's syntax which is used for the Markdown frontmatter.

So let's pretend we didn't like Toc's default slugify `markdown.extensions.headerid.slugify`, and instead wanted to use
PyMdown Extensions' slugify `pymdownx.slugs.uslugify`.  We could specify the new slugify function with the following
syntax:

```js
    "markdown_extensions": [
        {
            "markdown.extensions.toc": {
                "slugify": {"!!python/name": "pymdownx.slugs.uslugify"}
            }
        }
    ]
```

Compare to the PyYaml format:

```yaml
markdown_extensions:
  - markdown.extensions.toc:
      slugify: !!python/name:pymdownx.slugs.uslugify
```

## To build

Just use <kbd>ctrl</kbd>+<kbd>B</kbd> (Windows/Linux) or <kbd>cmd</kbd>+<kbd>B</kbd> (Mac) to build current file.

You can configure the build action by using the `build_action` setting.

```js
    /*
        By default, Markdown Preview builds the HTML in the source directory.
        It expects the file to exist on disk.  It pops up the build output panel etc.

        If you wish to override this behavior, you can change "build_action"

        build - The default build behavior.
        browser - Preview the file in your browser.
        clipboard - Copy the HTML output to the clipboard.
        sublime - Export the HTML to a Sublime tab.
        save - Run the normal save command that outputs to the source directory.
            It will also prompt for "save as" if the file does not exit on disk.

        All the build options use the default parser defined above in "parser"
    */
    "build_action": "build",
```

And the parser that is used when building is set in the `parser` setting:

```js
    /*
        Sets the parser used for building markdown to HTML.

        NOTE: The parser setting is not for the preview commands now.
        The previews have separate commands for each parser markdown.

        Warning for github API: if you have a ST2 linux build, Python is not built with SSL so it may not work

        default - The current default parser is python-markdown parser.
        markdown - Use the built-in python-markdown parser
        github - Use the github API to convert markdown, so you can use GitHub flavored Markdown, see https://help.github.com/articles/github-flavored-markdown/
        gitlab - Use the gitlab API to convert markdown, so you can use GitLab flavored Markdown, see https://docs.gitlab.com/ee/user/markdown.html
    */
    "parser": "markdown",
```

When building, a panel will be opened showing build information. This can be disabled by setting `show_panel_on_build`
to `false`:

```js
    /* do we show the panel when building with CMD+B */
    "show_panel_on_build": true,
```

## Configuring Pygments

If you add the `pymdownx.highlight` extension manually in the enabled extensions, you can override some of the default
settings.

*   Turn language guessing *on* or *off* (*on* will highlight fenced blocks even if you don't specify a language):

    ```js
    "markdown_extensions": [
        "pymdownx.highlight": {
            "guess_lang": true
        }
    ]
    ```

*   Show line numbers:

    ```js
    "markdown_extensions": [
        "pymdownx.highlight": {
            "linenums": true
        }
    ]
    ```

*   Change the highlight theme:

    ```js
    "markdown_extensions": [
        "pymdownx.highlight": {
            "pygments_style": "emacs"
        }
    ]
    ```

*   Inline the CSS:

    ```js
    "markdown_extensions": [
        "pymdownx.highlight": {
            "noclasses": true
        }
    ]
    ```

*   Use multiple:
    ```js
    "markdown_extensions": [
        "pymdownx.highlight": {
            "linenums": true,
            "pygments_style": "emacs"
        }
    ]
    ```

The `pymdownx.highlight` extension's `pygments_style` option is only useful if you are using `noclasses` which writes
the styles directly to the HTML tags via the `style` attribute. Normally, we just inject CSS generated by Pygments which
is the default behavior. Whether the CSS injection occurs, the Pygments' style that is used, and the CSS class that is
used for code blocks can all be controlled with the following options:

```js
    /*
        If Pygments is being used, you may want to inject one of the Pygment styles provided into the HTML.
        If so, enable this.
    */
    "pygments_inject_css": true,

    /*
        Name of the Pygments style to inject. Available styles are the styles provided by pygments
        plus "github" and "github2014".
    */
    "pygments_style": "github",

    /*
        This is the class to prepend to the pygments CSS styles. Make sure it matches whatever class(es)
        you've specified in the extension that controls Pygments highlighting.  CodeHilite's default is
        "codehilite", while Highlight's (the extension that SuperFences uses) is "highlight".
    */
    "pygments_css_class": "highlight",
```

See [codehilite page](https://python-markdown.github.io/extensions/code_hilite) for more info.
See [highlight page](https://facelessuser.github.io/pymdown-extensions/extensions/highlight/) for more info.

## Meta Data Support

When the `meta` extension is enabled (https://python-markdown.github.io/extensions/meta_data), the results will be
written to the HTML head in the form `<meta name="key" content="value1,value2">`.  `title` is the one exception, and
its content will be written to the title tag in the HTML head.

## YAML Frontmatter Support

YAML frontmatter can be stripped out and read when `strip_yaml_front_matter` is set to  `true` in the settings file. In
general the, the frontmatter is handled the same as [meta data](#meta-data-support), but if both exist in a file, the
YAML keys will override the `meta` extension keys.  There are a few special key names that won't be handled as HTML meta
data.

```js
    /*
        Strips the YAML front matter header and converts title to a heading
    */
    "strip_yaml_front_matter": false,
```

### Special YAML Key Names

YAML frontmatter has a few special key names that are used that will not be handled as meta data:

-   **basepath**: An absolute path to configure the relative paths for images etc. (for when the markdown is supposed to
    reference images in a different location.)
-   **references**: Can take a file path or an array of file paths for separate markdown files containing references,
    footnotes, etc.  Can be an absolute path or relative path.  Relative paths first use the source file's directory, and
    if the file cannot be found, it will use the `basepath` setting.
-   **destination**: This is an absolute file path or relative file path for when the markdown is saved to HTML via the
    build command or the `Save to HTML` command.  Relative paths first use the source file's directory, and if the file
    cannot be found, it will use the `basepath` setting.
-   **settings**: This is a dictionary where you can override settings that are in the settings file.

```yaml
---
    # Builtin values
    references:
        - references.md
        - abbreviations.md
        - footnotes.md

    destination: destination.html

    # Meta Data
    title: Test Page
    author:
        - John Doe
        - Jane Doe

    # Settings overrides
    settings:
        markdown_extensions:
          - markdown.extensions.footnotes
          - markdown.extensions.attr_list
          - markdown.extensions.def_list
          - markdown.extensions.tables
          - markdown.extensions.abbr
          - markdown.extensions.toc
          - markdown.extensions.smarty
          - markdown.extensions.meta
          - markdown.extensions.wikilinks
          - markdown.extensions.admonition
          - markdown.extensions.md_in_html
          - pymdownx.highlight:
              pygments_style: github
          - pymdownx.progressbar
          - pymdownx.github
          - pymdownx.caret:
              superscript: false
---
```

## Parsing GitHub Flavored Markdown

GitHub Flavored Markdown (GFM) is a very popular markdown.  Markdown Preview can actually handle them in a couple of
ways: online and offline.

### Online

Parsing GFM using the online method requires using the GitHub API as the parser.  It may also require setting
`github_mode` to `gfm` to get things like tasklists to render properly.

```js
    /*
        Default mode for the github Markdown parser : markdown (documents) or gfm (comments)
        see http://developer.github.com/v3/markdown/#render-an-arbitrary-markdown-document
    */
    "github_mode": "markdown",
```

Using the GitHub API without an oauth key is limited to so many calls.  After the limit is reached, the GitHub API will
deny further calls until after a set limit of time. To avoid this issue, you can set your API key in the settings as
follows:

```js
    /*
        Uses an OAuth token when parsing markdown with GitHub API. To create one for Markdown Preview, see https://help.github.com/articles/creating-an-oauth-token-for-command-line-use.
        Warn: this secret *must not be shared* with anyone and at least you should create it with minimal scopes for security reasons.
    */
    "github_oauth_token": "secret",
```

The GitHub API only inserts IDs for headers when `github_mode` is `markdown`, but it doesn't quite generate the way that
GitHub does in your project's readmes on the site. This makes it so the GitHub CSS doesn't create the clickable anchors.
So when `github_mode` is `markdown`, you can have Markdown Preview insert the ids properly so the CSS works with the
following option:

```js
    /*
        Enables a post process to inject header ids to ensure hrefs to headers work
    */
    "github_inject_header_ids": true,
```

### Offline

By default almost all extensions in the default, not GitHub parser are enabled to help with a GitHub-ish feel.

As mentioned earlier, a number of extensions are included by default. You can remove ones that are not part of GFM if
you chose.

GitHub uses CommonMark with some extras included on top. Python Markdown is not a CommonMark parser. It is certainly
possible that someone could include a CommonMark parser externally [call it](#enabling-other-external-markdown-parsers).

## Parsing GitLab Flavored Markdown

GitLab Flavored Markdown (GFM) is a popular markdown, too.  Markdown Preview can handle them online.

### Online

Parsing GFM using the online method requires using the GitLab API as the parser.  It may also require setting
`gitlab_mode` to `gfm` (default) to get things like tasklists to render properly.

```js
    /*
        Default mode for the gitlab Markdown parser : markdown (documents) or gfm (comments)
        see https://docs.gitlab.com/ee/api/markdown.html#render-an-arbitrary-markdown-document
    */
    "gitlab_mode": "markdown",
```

You can set your personal token in the settings as follows:

```js
    /*
        Uses a personal token when parsing markdown with GitLab API. To create one for Markdown Preview, see https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html.
        Warn: this secret *must not be shared* with anyone and at least you should create it with minimal scopes for security reasons.
    */
    "gitlab_personal_token": "secret",
```

## Including CSS

Markdown Preview includes a default CSS via the `css` setting.  It uses the special keyword `default` to represent the
default CSS. As seen below, CSS is configured per parser name (the same name used in `enabled_parsers`). If a parser
name cannot be found in the dictionary, `["default"]` will be used.

```js
    "css": {
        "markdown": ["default"],
        "github": ["default"],
        "gitlab": ["default"]
    },
```

You can include whatever CSS you want, and even remove the `default` if you like.  It can take URLs or file paths. If
you want to add a resource that is contained within a Sublime Package (like the Markdown Preview package itself), you
can use the special URL of `res://<package_name>/<subfolders>/file.css`. Using the `res://` format will allow Markdown
    Preview to resolve the resource when it is in a package that is zipped and unzipped.

### Override CSS by File Type

You can also override the default CSS with special file specific CSS. This CSS does not replace the default, but will
append CSS for a supported file type after the conventional CSS.

So assuming the following configuration:

```js
    "css": {
        "markdown": ["default"],
    }
    // File must be of one type below
    "markdown_filetypes": [".md", ".markdown", ".mdown"],
```

We could enable the following:

```js
    "allow_css_overrides": true,
```

Then if we have a file `filename.md` and a CSS in the same directory `filename.css`, that CSS will be applied to that
file.

### Including HTML HEAD

By default, the head is always included in the HTML output. This includes the CSS, JavaScript, etc. If for some reason
you need to omit the HEAD, you can by modifying the `include_head` option.  Just remove the target that you wish to omit
the head in. The option `build` specifically refers to when `build_action` is set to `build` in the settings.

```js
    /* do we include the CSS when outputting HTML? */
    "include_head": ["build", "browser", "sublime", "clipboard", "save"]
```

### GitLab Highlight Theme

In case of using GitLab online compiler, you can set `gitlab_highlight_theme` to personalize syntax highlighting.

Currently available options are "white" (default), "dark", "solarized-dark", "solarized-light", and, "monokai". Take a
look at GitLab documentations [here][gitlab_highlight_theme] for more details.

## Including JavaScript

Markdown Preview include default JS (if required for the given parser) via the `js` setting.  It uses the special
keyword `default` to represent the default JS. As seen below, JS is configured per parser name (the same name used in
`enabled_parsers`). If a parser name cannot be found in the dictionary, `["default"]` will be used.

```js
    "js": {
        "markdown": ["default"],
        "github": ["default"],
        "gitlab": ["default"]
    },
```

You can include whatever CSS you want, and even remove the `default` if you like. Each entry in the dictionary is a list
and can take file paths or URLs. If you want to add a resource that is contained within a Sublime Package (like the
Markdown Preview package itself), you can use the special URL of `res://<package_name>/<subfolders>/file.js`. Using the
    `res://` format will allow Markdown Preview to resolve the resource when it is in a package that is zipped and
    unzipped.

## CriticMarkup

Python Markdown can strip/apply out [CriticMarkup][critic] syntax if desired.  Simply enable the following option:

```js
    /*
        Sets how multimarkdown critic marks are handled.
        Setting is a string value: (accept | reject | none)
            accept: Accepts the proposed inserts and deletions (comments etc. are discarded)
            reject: Rejects the proposed inserts and deletions (comments etc. are discarded)
            none: does nothing

        Critic marks only affects "github" and "markdown" (Python Markdown).
    */
    "strip_critic_marks": "none",
```

### Simple HTML Output

Some people may desire a stripped down output on occasions that does not include HTML headers, inline styles, and IDs.
Markdown Preview has a mode that will strip out these things and omit using a template.  This mode can be enabled via
the the `html_simple` option:

```js
    /*
        Sets HTML output to a simple form:
            - No head
            - No body tags
            - ids, classes, and style are stripped out
            - Just bare minimum HTML tags and attributes
            - extension modifications included
    */
    "html_simple": false,
```
