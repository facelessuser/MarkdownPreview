[![Package Control Downloads][pc-image]][pc-link]
![License][license-image]

# Markdown Preview

Preview and build your markdown files quickly in your web browser using [Sublime Text](https://www.sublimetext.com/).

You can use the builtin [Python Markdown][pymd] parser (offline) or use the [GitHub Markdown API][gfm-api] or
[GitLab Markdown API][glfm-api] (online) for the conversion.

## Features

- Markdown preview using the [python-markdown][pymd] with syntax highlighting via Pygments and optional 3rd party
  extensions ([pymdown-extensions][pymdownx-docs] included by default).
- Markdown previews via the GitHub API.
- Markdown previews via the GitLab API thanks to [@hadisfr][hadisfr].
- Ability use other external Markdown parsers.
- Build markdown file using Sublime Text build system.
- Browser preview auto reload on save if you have the [LiveReload plugin][live-reload] installed.
- Configurable CSS and JavaScript assets with overriding if needed.
- YAML support thanks to [@tommi][tommi].
- Clipboard selection and copy to clipboard thanks to [@hexatrope][hexatrope].
- MathJax support : `\(\frac{\pi}{2}\)`.
- HTML template customization thanks to [@hozaka][hozaka].
- Embed images as base64.
- Strip out MultiMarkdown CriticMarkup.

## Documentation

https://facelessuser.github.io/MarkdownPreview/

## Support

- Any bugs about Markdown Preview please feel free to report [here][issue].
- And you are welcome to fork and submit pull requests.

## Attribution

Markdown Preview contains a stripped down version of font awesome that is included in the default non-GitHub CSS. It
contains only the icons we currently use.

https://fontawesome.com/license

## License

The code is available at under the [MIT license][license].

[bps10]: https://github.com/bps10
[gfm-api]: https://developer.github.com/v3/markdown/
[glfm-api]: https://docs.gitlab.com/ee/api/markdown.html
[hexatrope]: https://github.com/hexatrope
[hozaka]: https://github.com/hozaka
[hadisfr]: https://github.com/hadisfr
[issue]: https://github.com/facelessuser/MarkdownPreview/issues
[license]: http://revolunet.mit-license.org
[live-reload]: https://packagecontrol.io/packages/LiveReload
[pymd]: https://github.com/Python-Markdown/markdown
[pymdownx-docs]: http://facelessuser.github.io/pymdown-extensions/usage_notes/
[tommi]: https://github.com/tommi
[pc-image]: https://img.shields.io/packagecontrol/dt/MarkdownPreview.svg?logo=sublime%20text&logoColor=cccccc
[pc-link]: https://packagecontrol.io/packages/MarkdownPreview
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
