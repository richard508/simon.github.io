$(document).ready(function(){
	const start = $('.start')
	const red = $('.red')
	const green = $('.green')
	const blue = $('.blue')
  const yellow = $('.yellow')
  var begin = 'off'
	const simonSays = {
		1: 'red',
		2: 'blue',
		3: 'green',
		4: 'yellow'
	}
	const transactionalOrder = []

	var i = 1;
	function onStart () { 
		setTimeout(function () {
			$('.'+simonSays[i]).css('background', simonSays[i])
			i++;
			if (i < 5) { 
				onStart();
			} else{
				setTimeout(function () {
          for(let i=1;i<=4;i++){
            $('.'+simonSays[i]).removeAttr("style")
          }
				}, 500)
			}
		}, 500)
	}

	start.click(function(){
		$('.dot').css('background','red')
    onStart()
    begin = 'on'
  })
  // Math.floor(Math.random() * Math.floor(max))
  red.click(function(){
    console.log('red hit')
  })
  blue.click(function(){
    console.log('blue hit')
  })
  green.click(function(){
    console.log('hit green')
  })
  yellow.click(function(){
    console.log('hit yellow')
  })
})