(function(angular) {

    'use strict';

    var app = angular.module('app', []);

    app.directive('preventScroll', [function () {

        return {
            restrict: 'A',
            link: function (scope, element) {

                element.on('DOMMouseScroll mousewheel', function (event) {

                    var $this        = $(this),
                        scrollTop    = this.scrollTop,
                        scrollHeight = this.scrollHeight,
                        height       = $this.outerHeight(),
                        delta        = (event.type == 'DOMMouseScroll' ? event.originalEvent.detail * -40 : event.originalEvent.wheelDelta),
                        up           = delta > 0;

                    if (scrollHeight > height) {

                        // Down
                        if (!up && -delta > scrollHeight - height - scrollTop) {
                            $this.scrollTop(scrollHeight);
                            return prevent(event);
                        }

                        // Up
                        else if (up && delta > scrollTop) {
                            $this.scrollTop(0);
                            return prevent(event);
                        }
                    }

                });

                // Prevent Default
                function prevent(event) {
                    event.stopPropagation();
                    event.preventDefault();
                    event.returnValue = false;
                    return false;
                }
            }
        };
    }]);

})(angular);