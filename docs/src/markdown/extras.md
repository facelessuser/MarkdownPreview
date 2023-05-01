# Extras

## MathJax Support

!!! danger
    GitHub and GitLab is not supported with MathJax. You will have to come up with a MathJax config that works for it
    and escape problematic syntax that GitHub may try to convert.

To render Tex style math in Markdown, you can use the default MathJax configuration that is included with Markdown
Preview or create and reference your own.

When using Python Markdown (the `markdown` parser), it is recommended to use something like the extension
[`pymdownx.arithmatex`][arithmatex] as it ensures that math notation is preserved in the Markdown conversion process.

In this example, we will try to show a generalized approach that should work when using Python Markdown with Arithmatex.
Arithmatex will be configured in a generalized way that could potentially be used with libraries like MathJax or KaTeX
(see [KaTeX Support](#katex-support) to use KaTeX instead).  It is left to the user to figure out a configuration that
works for other potential, alternate libraries. There are other non-generalized approaches we could use, but as
previously stated, in this example, the output will be a non MathJax specific output via Arithmatex's "generic" mode.

Markdown Preview provides a script in `MarkdownPreview/js/math_config.js` that uses MathJax's `tex2jax` plain text
scanning. It searches for `#!tex $...$`, `#!tex $$...$$`, `#!tex \(...\)`, `#!tex \[...\]`, and
`#!tex \begin{env}...\end{env}`.

To load MathJax support, simply include the MathJax library along with the math config file provided by this extension.
You are free to provide your own and reference it instead if you'd like to tweak the configuration:

```js
    "js": {
        "markdown": [
            "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js",
            "res://MarkdownPreview/js/math_config.js"
        ]
    }
```

If you are using `pymdownx.arithmatex` you can configure it like so to take advantage of the generalized configuration.
You are also free to customize Arithmatex to your liking, though you may have to modify your MathJax config to
accommodate certain changes. Check out Arithmatex documentation for more info.

```js
    "markdown_extensions": [
        {
            "pymdownx.arithmatex": {
                "generic": true,
            },
        }
    ]
```

## KaTeX Support

!!! warning
    GitLab is already configured for KaTeX by default. You should just include `default` in your CSS and JS list.

!!! danger
    GitHub is not supported with KaTeX. You will have to come up with a MathJax config that works for it and escape
    problematic syntax that GitHub may try to convert.

To render Tex style math in Markdown, you can use the default KaTeX configuration that is included with Markdown Preview
or create and reference your own.

When using Python Markdown (the `markdown` parser), it is recommended to use something like the extension
[`pymdownx.arithmatex`][arithmatex] as it ensures that math notation is preserved in the Markdown conversion process.

In this example, we will try to show a generalized approach that should work when using Python Markdown with Arithmatex.
Arithmatex will be configured in a generalized way that could potentially be used with libraries like MathJax or KaTeX
(see [MathJax Support](#mathjax-support) to use MathJax instead).  It is left to the user to figure out a configuration
that works for other potential, alternate libraries. There are other non-generalized approaches we could use, but as
previously stated, in this example, the output will be a non MathJax specific output via Arithmatex's "generic" mode.

Markdown Preview provides a script in `MarkdownPreview/js/katex_config.js` that uses KaTeX's API to scan for
`arithmatex` classes, and converts and renders the math. It searches for `#!tex $...$`, `#!tex $$...$$`,
`#!tex \(...\)`, `#!tex \[...\]`, and `#!tex \begin{env}...\end{env}`.

To load KaTeX support, simply include the KaTeX library along with the KaTeX configuration script provided by this
extension. You are free to provide your own and reference it instead if you'd like to tweak the configuration:

```js
    "js": {
        "markdown": [
            "https://cdn.jsdelivr.net/npm/katex@0.10.0-alpha/dist/katex.min.js",
            "res://MarkdownPreview/js/katex_config.js"
        ]
    },
```

You also must provide the KaTeX CSS file. Optionally, if you'd like equation numbers, a simple CSS solution is provided,
though it will left align your math.  Feel free to create your own.

```js
    "css": {
        "markdown": [
            "default",                                                            // <- The default Markdown CSS.
            "https://cdn.jsdelivr.net/npm/katex@0.10.0-alpha/dist/katex.min.css", // <- KaTeX CSS
            "res://MarkdownPreview/css/katex_eqnum.css"                           // <- Optional equation numbering CSS
        ]
    },
```

If you are using `pymdownx.arithmatex` you can configure it like so to take advantage of the generalized configuration.
You are also free to customize Arithmatex to your liking, though you may have to modify your KaTeX config to accommodate
certain changes. Check out Arithmatex documentation for more info.

```js
    "markdown_extensions": [
        {
            "pymdownx.arithmatex": {
                "generic": true,
            },
        }
    ]
```

## UML Support

!!! danger
    GitHub is not supported with UML.

If you are using the extension [SuperFences extension][superfences], it has an option to create special, custom fences.
By default, it specifies `flow` and `sequence` languages to generate special code blocks that JavaScript can be applied
to later to create UML diagrams: see [documentation][custom-fences] for more info. Assuming you are using SuperFences,
you can include the following libraries to transform `sequence` and `flow` blocks using [js-sequence-diagrams][sequence]
and [flowchart.js][flow] respectively.

```js
    "js": [
        // Required libraries to transform UML notation
        "https://cdnjs.cloudflare.com/ajax/libs/raphael/2.2.7/raphael.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/js-sequence-diagrams/1.0.6/sequence-diagram-min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/flowchart/1.6.5/flowchart.min.js",

        // This library applies the above libraries to the fenced code blocks `flow` and `sequence`.
        "res://MarkdownPreview/js/uml.js"
    ]
```

Please see the `MarkdownPreview.sublime-settings` file to see how custom fences are configured in case you need to
configure them manually. Check out our [example file][example] if using YAML frontmatter to define custom fences.

## Mermaid UML Support

Mermaid is an alternate approach for rendering UML in a browser. Like the aforementioned [UML Support](#uml-support), it
also uses [SuperFences extension][superfences] to create special, custom fences. Then we can just add the needed
libraries, are custom loader, and configuration file. If you would like to tweak the configuration file, you can create
your own and load it instead.

```js
    "js": [
        // Mermaid library
        "https://unpkg.com/mermaid@8.8.4/dist/mermaid.min.js",
        // User configuration, should be loaded before the loader
        "res://MarkdownPreview/js/mermaid_config.js",
        // Mermaid loader
        "res://MarkdownPreview/js/mermaid.js"
    ]
```

Please see the `MarkdownPreview.sublime-settings` file to see how custom fences are configured in case you need to
configure them manually. Check out our [example file][example] if using YAML frontmatter to define custom fences.
