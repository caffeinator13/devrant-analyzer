/**
 * Simple lightbox
 * Author: Alexandre Bodelot <alexandre.bodelot@gmail.com>
 * Usage:
 * <ANY lightbox="imageUrlArray">
 *   <ANY href="imageUrl" class="lightbox-trigger"></ANY>
 * </ANY>
 *
 * The MIT License (MIT)

 Copyright (c) 2015 Alexandre Bodelot

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */
angular.module('devrantAnalyzerApp')
    .directive('lightbox', function() {
        return{
            restrict: 'A',
            scope: {
                images: '=lightbox'
            },
            link: function(scope, element, attrs) {
                $(element).on('click', '.lightbox-trigger', function(event) {
                    // If ctrl key or middle button pressed
                    if (event.ctrlKey || event.which == 2) {
                        // Open image in new tab
                        window.open(this.href, '_blank');
                    }
                    else {
                        // Build DOM
                        var dom = $(
                            '<div class="angular-lightbox-overlay" style="display: none">' +
                            '<span class="angular-lightbox-inner">' +
                            '<img src="" />' +
                            '<a href class="close" title="Close">×</a>' +
                            '</span>' +
                            '</div>'
                        );
                        scope.dom = dom;
                        scope.image = dom.find('img')[0];
                        dom.appendTo(document.body);

                        var index = scope.images.indexOf($(this).attr('href'));

                        scope.loadImageAt(index);

                        // Previous image button
                        dom.on('click', 'a.previous', function() {
                            scope.showPrevious();
                            return false;
                        });

                        // Next image button
                        dom.on('click', 'a.next', function() {
                            scope.showNext();
                            return false;
                        });

                        // Close button
                        dom.on('click', 'a.close', function() {
                            dom.remove();
                            return false;
                        });
                    }
                    return false;
                });

                /**
                 * Load image at given index
                 */
                scope.loadImageAt = function(index) {
                    scope.path = scope.images[index];
                    var img = new Image();
                    var inner = scope.dom.find('.angular-lightbox-inner');
                    img.onload = function() {
                        inner[0].replaceChild(this, scope.image);
                        scope.image = this;
                        scope.dom.show();
                    }
                    img.onerror = function() {
                        inner[0].replaceChild(this, scope.image);
                        scope.image = this;
                        scope.dom.show();
                    };
                    img.title = (index + 1) + '/' + scope.images.length;
                    img.src = scope.path; // Trigger image loading
                    img.alt = scope.path;
                };
            }
        };
    });
