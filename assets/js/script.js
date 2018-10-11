$(document).ready(function(){
  const start = $('.start')
  const red = $('.red')
  const green = $('.green')
  const blue = $('.blue')
  const yellow = $('.yellow')
  const borders = ['','border-top','border-bottom','border-left','border-right']
  const simonSays = {
    1: 'red',
    2: 'blue',
    3: 'green',
    4: 'yellow'
  }
  const transactionalOrder = []

  function onStart () { 
    var i = 1;
    setTimeout(function () {
      $('.'+simonSays[i]).css(borders[i], '150px solid '+simonSays[i])
      i++;
      if (i < 5) { 
        onStart();
      } else{
        for(let i=1;i<=4;i++){
          $('.'+simonSays[i]).removeAttr("style")
        }
      }
    }, 200)
  }

  start.click(function(){
    $('.dot').css('background','red')
    onStart()
  })
})