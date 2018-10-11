$(document).ready(function(){
	const start = $('.start')
	const red = $('.red')
	const green = $('.green')
	const blue = $('.blue')
  const yellow = $('.yellow')
  var score = 0
  var bestScore = 0
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
				onStart()
			} else{
				setTimeout(function () {
          for(let i=1;i<=4;i++){
            $('.'+simonSays[i]).removeAttr("style")
          }
          seq()
        }, 500)
			}
		}, 500)
  }
  
  var seq = function (){
    console.log('seq hit')
    let num = Math.floor(Math.random() * Math.floor(4)+1)
    transactionalOrder.push(simonSays[num])
    setTimeout(function () {
      transactional()
    }, 100)
  }

  function transactional(){
    for(let j = 0; j < transactionalOrder.length; j++){
      $('.'+transactionalOrder[j]).css('background', transactionalOrder[j])
      setTimeout(function () {
        $('.'+transactionalOrder[j]).removeAttr("style")
      }, 500)
    }
  }

	start.click(function(){
		$('.dot').css('background','red')
    onStart()
    begin = 'on'
    start.prop("disabled",true);
  })

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