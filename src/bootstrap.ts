/**
 * Copyright (c) 2019 Paul Lewis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { getHtml as getHtmlElement } from './utils/html.js';
import * as Router from './utils/router.js';

async function init() {
  Router.register('/', () => {
    return {
      element: getHtmlElement('/index.html'),
      section: import('./index.js'),
    };
  });
  Router.register('/settings/', () => {
    return {
      element: getHtmlElement('/settings/index.html'),
      section: import('./settings/settings.js')
    };
  });
  Router.register(['/details/', '/details/:name/'], () => {
    return {
      element: getHtmlElement('/details/index.html'),
      section: import('./details/details.js')
    };
  });

  const host = document.querySelector('main');
  if (!host) {
    throw new Error('No <main>!');
  }
  await Router.init(host);
}

init();
