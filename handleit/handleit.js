/*!
 * handleit - DOM configurable jQuery events
 * https://github.com/colbyfayock/handleit
 * Version: 0.0.1
 * Colby Fayock <hello@fay.io>
 */

$(function() {

	var $handler = $('.handler'),
		handle_trigger,
		handle_event;

	handle_trigger = function(handler) {
		var $that = handler.$that;
		$that.on(handler.event, function(event) {

			event.trigger = handler.trigger;

			console.log('event - event', event);
			console.log('event - event.type', event.type);
			console.log('event - event.which', event.which);
			console.log('event - event.target', event.target);
			console.log('event - event.pageX', event.pageX);
			console.log('event - event.pageY', event.pageY);
			console.log('event - event.trigger', event.trigger);
			$that.trigger(event.trigger, [event]);

		});
	}

	handle_event = function(element) {

		var $that = $(element),
			event = $that.attr('data-event'),
			trigger = $that.attr('data-trigger'),
			handler = $that.attr('data-handler'),
			handler_events;

		if ( typeof handle_trigger !== 'function' ) return false;

		if ( handler && handler !== '' ) {

			handler_events = JSON.parse(handler);

			for ( var i = 0, handler_events_len = handler_events.length; i < handler_events_len; i++ ) {
				handle_trigger( {
					$that: $that,
					event: handler_events[i].event,
					trigger: handler_events[i].trigger
				});
			}

		} else if ( event && event !== '' ) {
			handle_trigger( {
				$that: $that,
				event: event,
				trigger: trigger
			});
		}



	};

	for ( var i = 0, handler_len = $handler.length; i < handler_len; i++ ) {
		handle_event($handler[i])
	}	

});