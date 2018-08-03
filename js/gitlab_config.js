'use strict';

/*
  Copyright GitLab B.V.

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */

mermaid.initialize({
  // mermaid core options
  mermaid: {
    startOnLoad: false,
  },
  // mermaidAPI options
  theme: 'neutral',
});

function renderMath(el) {
  let mathNode = document.createElement('span');
  let display = el.getAttribute('data-math-style') === 'display';
  try {
    katex.render(el.textContent, mathNode, { displayMode: display, throwOnError: false });
    el.parentNode.replaceChild(mathNode, el);
  } catch (err) {
    console.log(err);
  }
}

function syntaxHighlight(el) {
  el.classList.add(HIGHLIGHT_THEME);
}

function renderMermaid(el) {
  const source = el.textContent;

  // Remove any extra spans added by the backend syntax highlighting.
  Object.assign(el, { textContent: source });

  mermaid.init(undefined, el, (id) => {
    const svg = document.getElementById(id);

    svg.classList.add('mermaid');

    // pre > code > svg
    svg.closest('pre').replaceWith(svg);

    // We need to add the original source into the DOM to allow Copy-as-GFM
    // to access it.
    const sourceEl = document.createElement('text');
    sourceEl.classList.add('source');
    sourceEl.setAttribute('display', 'none');
    sourceEl.textContent = source;

    svg.appendChild(sourceEl);
  });
}

function renderGFM(el) {
  el.querySelectorAll('.js-syntax-highlight').forEach(syntaxHighlight);
  el.querySelectorAll('.js-render-math').forEach(renderMath);
  el.querySelectorAll('.js-render-mermaid').forEach(renderMermaid);
};

document.addEventListener("DOMContentLoaded", () => {
  renderGFM(document.getElementsByTagName('body')[0])
});
