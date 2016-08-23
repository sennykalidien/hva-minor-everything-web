/*
 * This directive creates a infinite moving photoroll
 *
 * Usage: element or attibute.
 * Just create a list and put the elements in a horizontal row with display:inline-block.
 * This directive should be the container of the elements
 *
 *  photoroll - initialize the directive
 *  photoroll-speed="40" - pixels the photoroll travels in a second
 *
 */

app.directive('photoRoll', function(debouncedEvents) {
    return {
        link: function($scope, $element, $attrs) {
            // Save the original elements
            var items = $element.find('li');
            var originalItems = items.clone();

            // Prepare PhotoRoll properties
            var speed = $attrs.photoRollSpeed || 40;
            
            // resize event id
            var resizeEventId;

            // PhotoRoll object
            var PhotoRoll = function(originalItems, speed) {
                var stop = true;
                var rollWidth = 0;
                var currentOffset = 0;

                var getRollWidthAndPrepare = function() {
                    // Reset HTML content
                    $element.html('').append(originalItems);

                    // Calculate widths
                    var viewWidth = $element[0].offsetWidth;
                    var localRollWidth = 0;
                    _(originalItems).each(function(item) {
                        localRollWidth += item.offsetWidth;
                    });

                    // Make necessary copies
                    if (localRollWidth > 100) {
                        var necessaryCopies = Math.ceil(viewWidth / localRollWidth * 2);
                        for (var i = 0; i < necessaryCopies; i++) {
                            var clone = $element.html();
                            $element.append(clone);
                        }
                    }

                    rollWidth = localRollWidth;
                    return localRollWidth;
                };

                var step = function() {
                    requestAnimationFrame(step);

                    var stepLength = speed / 60;
                    var transformArguments = 'translate3d(-' + Math.round(currentOffset) + 'px, 0, 0)';

                    $element.css({
                        '-webkit-transform': transformArguments,
                        '-moz-transform': transformArguments,
                        '-ms-transform': transformArguments,
                        '-o-transform': transformArguments,
                        'transform': transformArguments
                    });

                    if (currentOffset < rollWidth) {
                        currentOffset += stepLength;
                    } else {
                        getRollWidthAndPrepare();
                        currentOffset = stepLength;
                    }
                };

                resizeEventId = debouncedEvents.onResize(getRollWidthAndPrepare, 100);
                step();

                return this;
            };

            // Initialize the movement
            var photoroll = new PhotoRoll(originalItems, speed);

            $scope.$on('$destroy', function () {
                debouncedEvents.off(resizeEventId);
            });
        }
    };
});
