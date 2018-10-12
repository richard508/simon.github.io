// start after ready
$(document).ready(function(){
  //set variables
	const start = $('.start')
  const button = $('.button')
  var atimer = 1000
  var score = 0
  var bestScore = parseInt($('.bestScore').html(localStorage.getItem('score')).html()) || 0
  var begin = 'off'
  var click = 0
  var numPlay = []
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
    numPlay.push(num)
    transactionalOrder.push(simonSays[num])
    //call transactional function after order has been added
    setTimeout(function () {
      transactional()
    }, 250)
  }

  function playAudio(num){
    $("#"+simonSays[num]).get(0).play()
  }

  $('#difficulty button').click(function(){
    // console.log(this.className.split(' ')[3])
    $('.normal').removeClass('btn-outline-warning')
    $('.slow').removeClass('btn-outline-primary')
    $('.fast').removeClass('btn-outline-danger')
    if(this.className.split(' ')[3] === 'slow' ){
      atimer = 1000
      $('.slow').addClass('btn-outline-primary')
      reset()
    }
    else if(this.className.split(' ')[3] === 'normal' ){
      atimer = 500
      $('.normal').addClass('btn-outline-warning')
      reset()
    }
    else{
      atimer = 200
      $('.fast').addClass('btn-outline-danger')
      reset()
    }
  })

  // light and dim the colors based on order
  function transactional(){
    for(let j = 0; j < transactionalOrder.length; j++){
        setTimeout(function () {
          $('.'+transactionalOrder[j]).addClass('on'+transactionalOrder[j])
          playAudio(numPlay[j])
        }, atimer*(j+1))
        setTimeout(function () {
          $('.'+transactionalOrder[j]).removeClass('on'+transactionalOrder[j])
        }, (atimer*(j+1))+250)
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
    let className = this.className.split(' ')[0]
    $.each( simonSays, function( key, value ) {
      if(value === className){
        playAudio(key)
      }
    });
    // change background
    $(this).addClass('on'+className)
    //only do this if begin is on
    if(begin == 'off'){
      return
    }
    //if color click is correct
    if(transactionalOrder[click] == className){
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
        //save best score in local storage
        var local = $('.bestScore').html()
        localStorage.setItem('score', local);
        // alert(localStorage.getItem('score'));
        // call seq function for new order
        setTimeout(function () {
          seq()
        }, 250)
      }
    } else{
      reset()
      //add sweet alert message
      swal({
        type: 'error',
        title: 'WRONG!!!',
        text: 'Click Start to try again'
      })
    }
  })

  //reset everything to start a new game
  function reset(){
    click = 0
    score = 0
    begin = 'off'
    $('.dot').removeAttr("style")
    $('.currentScore').html(score)
    transactionalOrder = []
    start.prop("disabled",false);
  }
  // remove class for mouse up
  button.mouseup(function (){
    $(this).removeClass('on'+this.className.split(' ')[0])
  })
})