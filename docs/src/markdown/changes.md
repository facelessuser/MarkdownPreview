# Changes

## 2.4.0

- **NEW**: Add `mermaid.js` support.
- **FIX**: `title` in YAML frontmatter should be handled case insensitively.

## 2.3.0

Some **breaking** changes! Please read:

- **NEW**: `pymdownx.superfences` no longer sources any settings from `markdown.extensions.codehilite` and instead uses
  `pymdownx.highlight`. No need to specify `markdown.extensions.codehilite` in the default settings.
- **NEW**: Default `pygments_css` class is now set to `highlight` which is `pymdownx.highlight`'s default. If you are
  using `pymdownx.superfences`, you use use `highlight`, if you are using `markdown.extensions.codehilite`, then you may
  want to change this to `codehilite`, or change `codehilite` to use the `highlight` class as well.
- **FIX**: Use `markdown.extensions.md_in_html` instead of `pymdownx.extrarawhtml` in the default settings as the latter
  is no longer available in the latest dependency.

## 2.2.5

- **FIX**: Fix for detecting browser in macOS Catalina.

## 2.2.4

- **FIX**: Fix GitHub emoji asset links.

## 2.2.3

- **FIX**: Linux browser preview issue.

## 2.2.2

- **FIX**: Reload issues in some browsers.

## 2.2.1

- Add support for Markdown 3+ and Pymdownx 6+.
- Add `viewport` scaling in HTML.

## 2.2.0

- Add basic GitLab support.
- Add per parser support for JavaScript and CSS configurations. Please see documentation to learn the new format.

## 2.1.2

- Don't allow live reload on save if using GitHub parser with no OAuth.

## 2.1.1

- Revert `autoNumber` set to `all` in MathJax config.
- Revert alignment left of MathJax display equations as the default has always been center prior to 2.0 releases.

## 2.1.0

- Add support for KaTeX math.
- Ensure MathJax properly looks for `\begin{env}...\end{env}`.
- Unified menu.

## 2.0.3

- MathJax should only scan for `arithmatex` classes in HTML.

## 2.0.2

- Code highlighting should have guessing disabled by default.
- Fix failure when code highlighting has guessing enabled, but the user specified a language name which has no lexer.

## 2.0.1

- Fix missing code highlight extension.
- Fix build command failing.

## 2.0.0

Please read documentation as there have been big changes in this version which may require updates to your personal settings.

* Do not vendor Python Markdown. Python Markdown will be acquired via the current markdown dependency.

* Python Markdown configuration changes:

    * No more defining settings as `extension(option1=a,option2=b)`. Options will be defined as a dictionary.
    * You will have to define the full extension name: `markdown.extensions.codehilite`. This will allow you to import any extension you want outside of Markdown Preview.
    * New line to `<br>` conversion has been dropped from GitHub emulation as GitHub no longer does this. Ref issue #374.

* Originally a couple pymdownx-extension extensions were ported over to this plugin to give a GitHub-ish feel to Markdown, these are no longer be included directly, but are included as a dependency. This will provide the latest versions, and also provide new extensions previously not included. Ref issue #378.

* Drop ST2 so we no longer have to provide specially crafted Python Markdown versions when we try to upgrade.

* Improve yaml front matter parsing: see issue #392.

* Better UML JavaScript injection.

* Link contributors in readme.

* Remove "magic" Pygments configuration. User will now explicitly configure Pygments CSS injection separately.

* Require explicit parser name moving forward instead of default, but provide a deprecation path for the short term.

* Fix GitHub header ID generation. GitHub only lowercases ASCII chars.

* Ensure default parser is Python Markdown, and enable auto-reload by default.

* Hopefully better documentation.

* Make flake8 compatible.

* Fix outdated links.

* Remove MathJax and UML option in favor of a more generalized solution via the pre-existing `css` option.

* Remove `embed_css_for_sublime_output` option in favor of more generalized `include_head` option.

## 1.4.3

* Fix issue where Chrome prevents live reload.

## 1.4.0

* `css` setting can now be an array and contain multiple CSS files (see settings file for more info).
* Updated GitHub style to latest.

## 1.3.0

* Now supports any markdown parser through a generalized method.  Now you can map a binary to parser name via `markdown_binary_map`.  Then use the parser name in `enabled_parsers` to use it.
* MultiMarkdown specific settings have been removed.  MultiMarkdown should now be configured via `markdown_binary_map` and `enabled_parsers`.
* Upgraded to Python Markdown 2.6.4.
* Removed internal PyYaml and Pygments.  Markdown Preview now uses Package Control dependencies to obtain PyYaml and Pygments.
* Update kbd CSS for GitHub.

## 1.0.3

* The `messages.json` should OK for this time.

## 1.0.2

* Fixes messages.json and changelog versions.

## 1.0.1

* Removed markdown2 parser for its not well maintained and buggy.
* Make Python Markdown parser as default.
* Split the preview commands for *Python Markdown* parser and *GitHub Flavored Markdown* parser.
* Add markdown file build support, build parser are config via the origin `"parser"` settings.
* Add this changelog file for both developers and users.
* Add messages.json which make display of `README.md` and `CHANGES.md`
* Try use `Markdown Extended.tmLanguage` for cheat sheet if you installed `Markdown Extended`.

## 1.0.0

* Support for ST3.
* Added Python Markdown parser.
* CSS search first in markdown file directory and the the build-in.
