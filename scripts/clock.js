$(document).ready(function(){
	var clock=$('.clock');
	var toggleElement = $(clock).find('.toggle');
	var pauseText = $(toggleElement).data('pausetext');
	var resumeText= $(toggleElement).data('resumetext');
	var minutesElement = $(clock).find('.minutes');
	var secondsElement = $(clock).find('.seconds');
	var startText = $(toggleElement).text();
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
		$(secondsElement).text(prependZero(seconds, 2));
	}

	//split out timer functions into functions
	//easier to read and write down resposibilities

	function pause(){
		running=false;
		clearTimeout(timer);
		$(toggleElement).text(resumeText);
	}

	function run(){
		running=true;
		runClock();
		$(toggleElement).text(pauseText);
	}

	function reset(){
		running=false;
		pause();
		minutes=25;
		seconds=0;
		setClock(minutes,seconds);
		toggleElement.text(startText);
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


	

	
	$(toggleElement).on('click',function(){
		(running) ? pause() : run();
	});
	reset();
	if (running) run();
});

