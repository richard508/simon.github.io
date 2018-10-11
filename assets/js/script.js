// start after ready
$(document).ready(function(){
  //set variables
	const start = $('.start')
  const button = $('.button')
  var atimer = 250
  var btimer = 300
  var score = 0
  var bestScore = 0
  var begin = 'off'
  var click = 0
  // map each color values
	const simonSays = {
		1: 'red',
		2: 'blue',
		3: 'green',
		4: 'yellow'
  }
  // array for order of sequence
	var transactionalOrder = []

  var i = 1;
  // when clicking start do color animation
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
  
  // randomize to choose which to add to transactionalOrder
  var seq = function (){
    let num = Math.floor(Math.random() * Math.floor(4)+1)
    transactionalOrder.push(simonSays[num])
    //call transactional function after order has been added
    setTimeout(function () {
      transactional()
    }, 250)
  }

  // light and dim the colors based on order
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

  // start game
	start.click(function(){
		$('.dot').css('background','red')
    onStart()
    begin = 'on'
    start.prop("disabled",true);
  })

  // on mouse down
  button.mousedown(function(){
    // change background
    $(this).addClass('on'+this.className.split(' ')[0])
    //only do this if begin is on
    if(begin == 'on'){
      //if color click is correct
      if(transactionalOrder[click] == this.className.split(' ')[0]){
        click+= 1
        // start new sequence if correct
        if(transactionalOrder.length <= click){
          score++
          $('.currentScore').html(score)
          // increase best score if new score is higher
          if(score > bestScore){
            bestScore = score
            $('.bestScore').html(bestScore)
          }
          click = 0
          // call seq function for new order
          setTimeout(function () {
            seq()
          }, 250)
        }
      } else{
        //reset everything to start a new game
        click = 0
        score = 0
        begin = 'off'
        $('.dot').removeAttr("style")
        $('.currentScore').html(score)
        transactionalOrder = []
        start.prop("disabled",false);
      }
    }
  })
  // remove class for mouse up
  button.mouseup(function (){
    $(this).removeClass('on'+this.className.split(' ')[0])
  })
})