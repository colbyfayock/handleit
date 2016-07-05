/*!
 * handleit - DOM configurable jQuery events
 * https://github.com/colbyfayock/handleit
 * Version: 0.0.1
 * Colby Fayock <hello@fay.io>
 */

$(function() {

    var $handleit = $('.handleit'),
        _this = this;

    if ( !$handleit[0] ) return;

    _this.handle_trigger = function(handler) {
        var $that = handler.$that,
            target = handler.target && handler.target !== '' ? handler.target : false;

        $that.on(handler.event, target, function(event) {

            event.trigger = handler.trigger;
            $that.trigger(event.trigger, [event]);

            if ( handler.return === 'preventDefault' ) {
                event.preventDefault();
            }

            if ( handler.return === 'stopPropagation' ) {
                event.stopPropagation();
            }

            if ( handler.return === 'false' ) return false;

        });
    }

    _this.handle_event = function(element) {

        var $that = $(element),
            event = $that.attr('data-event'),
            trigger = $that.attr('data-trigger'),
            handler = $that.attr('data-handler'),
            target = $that.attr('data-target'),
            event_return = $that.attr('data-return'),
            handler_events = [];

        if ( typeof _this.handle_trigger !== 'function' ) return false;

        if ( event && event !== '' ) {
            handler_events.push({
                $that: $that,
                event: event,
                trigger: trigger,
                target: target,
                return: event_return
            });
        } else if ( handler && handler !== '' ) {
            handler_events = JSON.parse(handler);
        }

        for ( var i = 0, handler_events_len = handler_events.length; i < handler_events_len; i++ ) {
            _this.handle_trigger({
                $that: $that,
                event: handler_events[i].event,
                trigger: handler_events[i].trigger,
                target: handler_events[i].target,
                return: event_return
            });
        }

    };

    _this.go = function($handler) {
        for ( var i = 0, handler_len = $handler.length; i < handler_len; i++ ) {
            _this.handle_event($handler[i])
        }
    }

    _this.go($handleit);

});