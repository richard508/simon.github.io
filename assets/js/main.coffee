# start after ready
$(document).ready ->
  #set variables
  start = $('.start')
  button = $('.button')
  atimer = 1000
  score = 0
  bestScore = parseInt($('.bestScore').html(localStorage.getItem('score')).html()) or 0
  begin = 'off'
  click = 0
  numPlay = []
  selectedSpeed = 1000
  # map each color values
  simonSays = 
    1: 'red'
    2: 'blue'
    3: 'green'
    4: 'yellow'
  # array for order of sequence
  transactionalOrder = []
  i = 1
  # randomize to choose which to add to transactionalOrder

  seq = ->
    num = Math.floor(Math.random() * Math.floor(4) + 1)
    numPlay.push num
    transactionalOrder.push simonSays[num]
    #call transactional function after order has been added
    setTimeout (->
      transactional()
      return
    ), 250
    return

  # when clicking start do color animation

  onStart = ->
    setTimeout (->
      $('.' + simonSays[i]).css 'background', simonSays[i]
      i++
      if i < 5
        onStart()
      else
        setTimeout (->
          `var i`
          i = 1
          while i <= 4
            $('.' + simonSays[i]).removeAttr 'style'
            i++
          seq()
          return
        ), 500
      return
    ), 500
    return

  playAudio = (num) ->
    $('#' + simonSays[num]).get(0).play()
    return

  # light and dim the colors based on order

  transactional = ->
    if atimer <= 300
      atimer
    else
      atimer -= 50
    j = 0
    while j < transactionalOrder.length
      setTimeout (->
        $('.' + transactionalOrder[j]).addClass 'on' + transactionalOrder[j]
        playAudio numPlay[j]
        return
      ), atimer * (j + 1)
      setTimeout (->
        $('.' + transactionalOrder[j]).removeClass 'on' + transactionalOrder[j]
        return
      ), atimer * (j + 1) + 250
      j++
    return

  #reset everything to start a new game

  reset = ->
    click = 0
    score = 0
    begin = 'off'
    atimer = selectedSpeed
    $('.dot').removeAttr 'style'
    $('.currentScore').html score
    transactionalOrder = []
    start.prop 'disabled', false
    return

  $('#difficulty button').click ->
    # console.log(this.className.split(' ')[3])
    $('.normal').removeClass 'btn-outline-warning'
    $('.slow').removeClass 'btn-outline-primary'
    $('.fast').removeClass 'btn-outline-danger'
    if @className.split(' ')[3] == 'slow'
      atimer = 1000
      selectedSpeed = atimer
      $('.slow').addClass 'btn-outline-primary'
      reset()
    else if @className.split(' ')[3] == 'normal'
      atimer = 500
      selectedSpeed = atimer
      $('.normal').addClass 'btn-outline-warning'
      reset()
    else
      atimer = 200
      selectedSpeed = atimer
      $('.fast').addClass 'btn-outline-danger'
      reset()
    return
  # start game
  start.click ->
    $('.dot').css 'background', 'red'
    onStart()
    begin = 'on'
    start.prop 'disabled', true
    return
  # on mouse down
  button.mousedown ->
    className = @className.split(' ')[0]
    $.each simonSays, (key, value) ->
      if value == className
        playAudio key
      return
    # change background
    $(this).addClass 'on' + className
    #only do this if begin is on
    if begin == 'off'
      return
    #if color click is correct
    if transactionalOrder[click] == className
      click += 1
      # start new sequence if correct
      if transactionalOrder.length <= click
        score++
        $('.currentScore').html score
        # increase best score if new score is higher
        if score > bestScore
          bestScore = score
          $('.bestScore').html bestScore
        click = 0
        #save best score in local storage
        local = $('.bestScore').html()
        localStorage.setItem 'score', local
        # alert(localStorage.getItem('score'));
        # call seq function for new order
        setTimeout (->
          seq()
          return
        ), 250
    else
      reset()
      #add sweet alert message
      setTimeout (->
        swal
          type: 'error'
          title: 'WRONG!!!'
          text: 'Click Start to try again'
        return
      ), 500
    return
  # remove class for mouse up
  button.mouseup ->
    $(this).removeClass 'on' + @className.split(' ')[0]
    return
  return