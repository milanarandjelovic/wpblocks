//// By Yair Even-Or
//// 2014

// http://hilios.github.io/jQuery.countdown/documentation.html

////// Do X in Y seconds /////////
function Doin( settings ) {  //step, duration, done
	this.duration = settings.duration || 2;
	this.step = settings.step;
	this.done = settings.done;
	this.fps = typeof settings.fps != "undefined" && settings.fps > 0 ? settings.fps : null;
	this.RAF;
};

Doin.prototype = {
	run: function () {
		"use strict";
		cancelAnimationFrame( this.RAF );

		var startTime = new Date(),
			that = this;

		(function run() {
			var now, elapsed, t;

			now = new Date();
			elapsed = (now - startTime) / 1000;
			t = (elapsed / that.duration);

			// do a step on each frame
			that.step( t, elapsed );

			// stop sequence if duration has passed
			if ( t < 1 ) {
				if ( that.fps )
					setTimeout( function () {
						requestAnimationFrame( run )
					}, 1000 / that.fps );
				else
					that.RAF = requestAnimationFrame( run );  // can also use: setTimeout(run, 60/1000)
			}
			else if ( that.done )
				that.done();
		})();
	}
};

(function ( $ ) {

	var easing = {
		// no easing, no acceleration
		linear: function ( t ) {
			return t
		},
		// acceleration until halfway, then deceleration
		easeInOutQuad: function ( t ) {
			return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
		},
		// acceleration until halfway, then deceleration
		easeInOutCubic: function ( t ) {
			return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
		},
		// acceleration until halfway, then deceleration
		easeInOutQuart: function ( t ) {
			return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
		},
	};


	var timeElm = 0,
		defaultEasing = easing.easeInOutCubic,
		duration = 3; // default duration (in seconds)

	// click to start doing stuff
	$( document ).on( 'ready', function () {

		$( '.animated-countdown .countdown' ).each( function ( index, member ) {

			new Waypoint( {
				element: member,
				handler: function () {

					if ( !$( this ).data( 'doin' ) ) {
						$( this ).data( 'doin', new Task( this.element, 500, defaultEasing ) );
					}
					else {
						$( this ).data( 'doin' ).doin.run();
					}

					this.destroy();

				},
				offset: '95%'
			} );

		} );
	} );

	// constructor to run a specific job using Do-in
	function Task( el, toValue, easingFunc ) {
		this.el = el;
		// get variables
		this.initialValue = el.innerHTML | 0;
		this.toValue = el.getAttribute( 'data-to' ) || toValue;
		this.delta = this.toValue - this.initialValue;
		this.easing = easing[el.getAttribute( 'data-easing' )] || easingFunc;

		// Do-in settings object
		var settings = {
			step: this.step.bind( this ),
			duration: duration,
			done: this.done.bind( this ),
			// fps : 16
		}
		// create an instance of Do-in
		this.doin = new Doin( settings );
		this.doin.run();
	}

	// a step of the thing we want to do
	Task.prototype.step = function ( t, elapsed ) {
		// easing
		t = this.easing( t );

		// calculate new value
		var value = this.delta * t + this.initialValue;

		// limit value
		if ( t > 0.999 )
			value = this.toValue;

		value = (value | 0).toLocaleString();
		// print value
		this.el.innerHTML = value;
		//timeElm.innerHTML = elapsed.toFixed(2);
	}

	// on DONE
	Task.prototype.done = function () {
		//$(this.el).removeData('doin');
	}


})( jQuery );
