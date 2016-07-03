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
			$that.trigger(event.trigger, [event]);

			if ( handler.return && handler.return !== '' ) {

				if ( handler.return === 'false' ) {
					return false;
				}

			}

		});
	}

	handle_event = function(element) {

		var $that = $(element),
			event = $that.attr('data-event'),
			trigger = $that.attr('data-trigger'),
			handler = $that.attr('data-handler'),
			event_return = $that.attr('data-return'),
			handler_events;

		if ( typeof handle_trigger !== 'function' ) return false;

		if ( handler && handler !== '' ) {

			handler_events = JSON.parse(handler);

			for ( var i = 0, handler_events_len = handler_events.length; i < handler_events_len; i++ ) {
				handle_trigger( {
					$that: $that,
					event: handler_events[i].event,
					trigger: handler_events[i].trigger,
					return: event_return
				});
			}

		} else if ( event && event !== '' ) {
			handle_trigger( {
				$that: $that,
				event: event,
				trigger: trigger,
				return: event_return
			});
		}



	};

	for ( var i = 0, handler_len = $handler.length; i < handler_len; i++ ) {
		handle_event($handler[i])
	}	

});