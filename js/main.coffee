$ ->

  # function validateEmail(email){
  #   var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  #   var valid = emailReg.test(email);

  #   if(!valid) {
  #         return false;
  #     } else {
  #       return true;
  #     }
  # }

  $('#email-modal').on 'click', (e) ->
    $(@).fadeOut()

  $('.join-beta').on 'click', (e) ->
    e.preventDefault()
    $('#email-modal').fadeIn()

  $('input').on 'click', (e) ->
    e.stopImmediatePropagation()

  $('button').on 'click', (e) ->
    e.stopImmediatePropagation()

  emailIsValid = (email) ->
    emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
    return emailReg.test email

  setupFullPageSmall = ->
    $('#fullPageSmall').fullpage
      sectionSelector: '.sectionSmall'
      loopHorizontal: false
      controlArrows: false
      slidesNavigation: false
      paddingTop: '80px'

    $.fn.fullpage.setAllowScrolling(true, 'left, right')


  setupFullPageMediumUp = ->
    $('#fullpage').fullpage
      navigation: true
      fitToSectionDelay: 9999999
      paddingTop: '50px'
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
        $('.down-arrow').removeClass('hide')

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
          $('.down-arrow').addClass('hide')


  $('.email-form').submit (e) ->

    # prevent default
    e.preventDefault()

    # get values
    form = $(@)
    action = form.attr('action')
    email = $.trim(form.find('input[name=email]')[0].value)

    successField = $(form.find('.form-message'))
    errorField = $(form.find('.form-error'))

    successField.html('').fadeOut(0)
    errorField.html('').fadeOut(0)

    # check if email is valid
    if emailIsValid(email)

      formData = {
        'email' : email
      }

      $.ajax({
        type      : 'POST'
        url       : action
        data      : formData
        dataType  : 'json'
        encode    : true
      }).fail (data) ->
        successField.html('Thank you. You will receive an email soon.').fadeIn()
    else
      errorField.html('Please check your email again. Thanks.').fadeIn()


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

  # Small
  mediaCheck
    media: '(max-width: 40em)'
    entry: ->
      setupFullPageSmall()
    exit: ->
      console.log('')

  # Medium Up
  mediaCheck
    media: '(min-width: 40.063em)'
    entry: ->
      setupFullPageMediumUp()
    exit: ->
      console.log('')


