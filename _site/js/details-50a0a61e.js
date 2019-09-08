define("./details-50a0a61e.js",['exports', './chunk-101f3e4a'], function (exports, __chunk_1) { 'use strict';

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
  class Details {
      async show(hostElement, routeData) {
          console.log('Details show', routeData);
          this.el = this.elSource.cloneNode(true);
          hostElement.innerHTML = '';
          hostElement.appendChild(this.el);
          if (routeData.data.name) {
              document.querySelector('h1').textContent = routeData.data.name;
          }
          return __chunk_1.fade({ el: hostElement, from: 0, to: 1 });
      }
      async hide(hostElement) {
          console.log('Details hide');
          return __chunk_1.fade({ el: hostElement, from: 1, to: 0 });
      }
      adopt(elSource) {
          this.elSource = elSource;
      }
  }
  customElements.define('pm-details', Details);
  var details = new Details();

  exports.default = details;

});
