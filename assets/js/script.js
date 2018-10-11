$(document).ready(function(){
	const start = $('.start')
  const button = $('.button')
  var atimer = 250
  var btimer = 300
  var score = 0
  var bestScore = 0
  var begin = 'off'
  var click = 0
	const simonSays = {
		1: 'red',
		2: 'blue',
		3: 'green',
		4: 'yellow'
	}
	var transactionalOrder = []

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
    let num = Math.floor(Math.random() * Math.floor(4)+1)
    transactionalOrder.push(simonSays[num])
    setTimeout(function () {
      transactional()
    }, 250)
  }

  function transactional(){
    for(let j = 0; j < transactionalOrder.length; j++){
        setTimeout(function () {
          $('.'+transactionalOrder[j]).addClass('on'+transactionalOrder[j])
        }, atimer*(j+1))
        setTimeout(function () {
          $('.'+transactionalOrder[j]).removeClass('on'+transactionalOrder[j])
        }, btimer*(j+1))
    }
  }

	start.click(function(){
		$('.dot').css('background','red')
    onStart()
    begin = 'on'
    start.prop("disabled",true);
  })

  button.mousedown(function(){
    $(this).addClass('on'+this.className.split(' ')[0])
    if(begin == 'on'){
      if(transactionalOrder[click] == this.className.split(' ')[0]){
        click+= 1
        score++
        if(score > bestScore){
          bestScore = score
          $('.bestScore').html(bestScore)
        }
        $('.currentScore').html(score)
        if(transactionalOrder.length <= click){
          click = 0
          setTimeout(function () {
            seq()
          }, 250)
        }
      } else{
        click = 0
        score = 0
        begin = 'off'
        $('.dot').removeAttr("style")
        $('.currentScore').html(score)
        transactionalOrder = []
      }
    }
  })
  button.mouseup(function (){
    $(this).removeClass('on'+this.className.split(' ')[0])
  })
})