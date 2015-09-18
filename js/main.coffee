$ ->

  colorClasses = [
    'color-one'
    'color-two'
    'color-three'
    'color-four'
    'color-five'
    'color-six'
  ]

  for colorClass in colorClasses
    $('.section').removeClass(colorClass)
    $('.hider').removeClass(colorClass)

  $('.section').addClass('color-one')
  $('.hider').addClass('color-one')
  $('#background').addClass('one')

  $('#fullpage').fullpage
    onLeave: (index, nextIndex, direction) ->

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
        $('.hider').removeClass(colorClass)

      $('#background').removeClass()

      # Fade next index in and set background color class
      if nextIndex == 1
        $('.one .end').delay(400).fadeIn()
        $('.section').addClass('color-one')
        $('.hider').addClass('color-one')
        $('#background').addClass('one')
      else if nextIndex == 2
        $('.two .end').delay(400).fadeIn()
        $('.section').addClass('color-two')
        $('.hider').addClass('color-two')
        $('#background').addClass('two')
      else if nextIndex == 3
        $('.three .end').delay(400).fadeIn()
        $('.section').addClass('color-three')
        $('.hider').addClass('color-three')
        $('#background').addClass('three')
      else if nextIndex == 4
        $('.four .end').delay(400).fadeIn()
        $('.section').addClass('color-four')
        $('.hider').addClass('color-four')
        $('#background').addClass('four')
      else if nextIndex == 5
        $('.five .end').delay(400).fadeIn()
        $('.section').addClass('color-five')
        $('.hider').addClass('color-five')
        $('#background').addClass('five')
      else if nextIndex == 6
        $('.six .end').delay(400).fadeIn()
        $('.section').addClass('color-six')
        $('.hider').addClass('color-six')
        $('#background').addClass('six')
