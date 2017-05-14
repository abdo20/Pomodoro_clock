$(document).ready(function(){
	var minutesElement = $('.clock').find('.minutes');
	var secondsElement = $('.clock').find('.seconds');
	var playButton= $('.control').find('.play');
	var minutes, seconds, timer;

	function prependZero(time, length){
		//Quick way to turn number to string is to prepend it with a string
		//also a quick way to turn floats to integers is to complement with 0
		time=''+(time|0);
		while (time.length<length) time='0'+time;
		return time;
	}

	function setClock(minutes, seconds){
		//using text(). html() will construct HTML when it finds one overhead
		$(minutesElement).text(prependZero(minutes, 2));
		$('.colon').text(':');
		$(secondsElement).text(prependZero(seconds, 2));
	}

	//split out timer functions into functions
	//easier to read and write down resposibilities

	function pause(){
		running=false;
		$(playButton).text('play');
		clearTimeout(timer);
		//$(toggleElement).html('<i class="fa fa-play fa-5x" aria-hidden="true"></i>');
	}

	function run(){
		running=true;
		$(playButton).text('pause');
		$('.reset').removeAttr('disabled');
		runClock();
		//$(toggleElement).html('<i class="fa fa-pause fa-5x" aria-hidden="true"></i>');
	}

	function reset(){
		running=false;
		$('.reset').attr('disabled','');
		pause();
		minutes=25;
		seconds=0;
		setClock(minutes, seconds);
	}


	function runClock(){
		var remainingSeconds = minutes*60;
		timer = setInterval(function(){
			// take 1 second each loop
			remainingSeconds=remainingSeconds-1;
			minutes = ((remainingSeconds/60))%60;
			seconds =((remainingSeconds))%60;
			setClock(minutes, seconds);
			// check if the clock runout of time (seconds)
			if (remainingSeconds==0){
				reset();
			}
			},1000);
		
	}

	
	$('.play').on('click',function(){
		(running) ? pause() : run();
	});
	reset();
	if (running) run();

	$('.reset').on('click',function(){
		reset();
	});

});

