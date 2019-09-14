define("./chunk-0329137a.js",['exports'], function (exports) { 'use strict';

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
  function clamp(value, min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY) {
      return Math.max(min, Math.min(max, value));
  }

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
  function ease(value, pow = 3) {
      return 1 - Math.pow(1 - value, pow);
  }

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
  const fades = new Map();
  function fade({ el = document.body, from = 1, to = 0, duration = 300 }) {
      return new Promise((resolve) => {
          const existingAnimation = fades.get(el);
          if (typeof existingAnimation !== 'undefined') {
              from = existingAnimation;
          }
          const start = performance.now();
          const update = () => {
              const time = (performance.now() - start) / duration;
              const position = ease(clamp(time, 0, 1));
              const newOpacity = from + (to - from) * position;
              el.style.opacity = String(newOpacity);
              if (position === 1) {
                  resolve();
                  fades.delete(el);
              }
              else {
                  requestAnimationFrame(update);
                  fades.set(el, newOpacity);
              }
          };
          // Start the animation.
          requestAnimationFrame(update);
          fades.set(el, 0);
      });
  }

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
  const duration = 300;
  class SectionElement extends HTMLElement {
      async show(hostElement, routeData) {
          if (!this.mainSource) {
              throw new Error('Unable to show section, no source element provided');
          }
          const el = this.mainSource.cloneNode(true);
          hostElement.innerHTML = '';
          hostElement.appendChild(el);
          if (this.styleSource) {
              const style = this.styleSource.cloneNode(true);
              style.dataset.injected = 'true';
              document.head.appendChild(style);
          }
          return fade({ el: hostElement, from: 0, to: 1, duration });
      }
      async hide(hostElement) {
          await fade({ el: hostElement, from: 1, to: 0, duration });
          const injectedStyles = document.head.querySelectorAll('style[data-injected="true"]');
          for (const style of injectedStyles) {
              style.remove();
          }
      }
      adopt({ main, style }) {
          this.mainSource = main;
          this.styleSource = style;
      }
  }

  exports.SectionElement = SectionElement;
  exports.clamp = clamp;
  exports.ease = ease;
  exports.fade = fade;

});
