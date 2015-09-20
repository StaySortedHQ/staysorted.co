$ ->

  colorClasses = [
    'color-one'
    'color-two'
    'color-three'
    'color-four'
    'color-five'
    'color-six'
  ]

  $('body').addClass('color-one')
  $('#background').addClass('one')
  $('#screen').addClass('one')
  $('#phone2').addClass('one')
  $('#phone3').addClass('one')

  $('#fullpage').fullpage
    # responsiveWidth: 500
    fixedElements: '.phone'
    onLeave: (index, nextIndex, direction) ->

      player_Plan.stop()
      player_Adapt.stop()
      player_Inbox.stop()

      if index == 1
        $('.one .end').fadeOut(200)
        $('.two .end').fadeOut(0)
      else if index == 2
        $('.two .end').fadeOut(200)
        $('.three .end').fadeOut(0)
      else if index == 3
        $('.three .end').fadeOut(200)
        $('.four .end').fadeOut(0)
      else if index == 4
        $('.four .end').fadeOut(200)
        $('.five .end').fadeOut(0)
      else if index == 5
        $('.five .end').fadeOut(200)
        $('.six .end').fadeOut(0)
      else if index == 6
        $('.six .end').fadeOut(200)
        $('.fix .end').fadeOut(0)

      # Remove background color classes
      for colorClass in colorClasses
        $('.section').removeClass(colorClass)

      $('#background').removeClass()
      $('body').removeClass()
      $('#screen').removeClass()
      $('#phone2').removeClass()
      $('#phone3').removeClass()

      # Fade next index in and set background color class
      if nextIndex == 1
        $('.one .end').delay(400).fadeIn()
        $('body').addClass('color-one')
        $('#background').addClass('one')
        $('#screen').addClass('one')
      else if nextIndex == 2
        $('.two .end').delay(400).fadeIn()
        $('body').addClass('color-two')
        $('#background').addClass('two')
        $('#screen').addClass('two')
        player_Plan.setCurrentFrameNumber(0)
        player_Plan.play()
      else if nextIndex == 3
        $('.three .end').delay(400).fadeIn()
        $('body').addClass('color-three')
        $('#background').addClass('three')
        $('#screen').addClass('three')
        player_Adapt.setCurrentFrameNumber(0)
        player_Adapt.play()
      else if nextIndex == 4
        $('.four .end').delay(400).fadeIn()
        $('body').addClass('color-four')
        $('#background').addClass('four')
        $('#screen').addClass('four')
        player_Inbox.setCurrentFrameNumber(0)
        player_Inbox.play()
      else if nextIndex == 5
        $('.five .end').delay(400).fadeIn()
        $('body').addClass('color-five')
        $('#background').addClass('five')
        $('#screen').addClass('five')
        $('#phone2').addClass('five')
        $('#phone3').addClass('five')
      else if nextIndex == 6
        $('.six .end').delay(400).fadeIn()
        $('body').addClass('color-six')
        $('#background').addClass('six')
        $('#screen').addClass('six')
        $('#phone2').addClass('six')
        $('#phone3').addClass('six')
