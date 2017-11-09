(function($) {
    'use strict';
    const elems = $('.has-ripple');
    elems.each(function () {
        const checkDevice = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)),
        showEvent = checkDevice ? 'touchstart' : 'mousedown',
        hideEvent = checkDevice ? 'touchend' : 'dragstart mouseup mouseout mouseleave';
        var el = $(this);
        el.append("<div class='ripple-container'></div>");
        el.on(showEvent, function(e){

            if (e.button == 2){
                return false
            }

            var $ripple = $('<span class="ripple-effect" />'),
            $button = $(this).find('.ripple-container'),
            $offset = $button.offset(),
            xPos = checkDevice && 'touches' in e ? ( e.touches[0].pageX - $offset.left ) : (e.pageX - $offset.left),
            yPos = checkDevice && 'touches' in e ? ( e.touches[0].pageY - $offset.top ) : (e.pageY - $offset.top),
            $color = $button.parent().data('ripple-color') || 'currentColor',
            size = Math.max( $button.width() , $button.height()) * Math.PI * 1.5,
            speed = 350;

            $ripple.appendTo( $button ).css({
                'top': yPos,
                'left': xPos,
                'background-color': $color
            }).addClass('on')

            setTimeout(function () {
                $ripple.css({
                    'height': size,
                    'width': size
                })
            }, 0);

            el.on(hideEvent, $button, function (e) {
                $ripple.animate({
                    'opacity': 0
                }, speed*1.5, function () {
                    $(this).remove()
                })
            })
        })
    })
}(jQuery));
