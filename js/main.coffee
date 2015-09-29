setupEmailModal = ->
  # Hide email modal on clicking background
  $('#email-modal').on 'click', (e) ->
    $(@).fadeOut()

  # Show email modal on click
  $('.join-beta').on 'click', (e) ->
    e.preventDefault()
    $('#email-modal').fadeIn()

  # Prevent closing email modal when tapping on fields
  $('input').on 'click', (e) ->
    e.stopImmediatePropagation()

  # Prevent closing email modal when tapping on button
  $('button').on 'click', (e) ->
    e.stopImmediatePropagation()

  # Handle email form submit
  $('.email-form').submit (e) ->

    # prevent default
    e.preventDefault()

    # get values
    form = $(@)
    action = form.attr('action')
    email = $.trim(form.find('input[name=email]')[0].value)

    successField = $(form.find('.form-message'))
    errorField = $(form.find('.form-error'))

    spinner = $(form.find('.loader'))
    join = $(form.find('.join'))
    checkmark = $(form.find('.done'))

    successField.html('').fadeOut(0)
    errorField.html('').fadeOut(0)

    # check if email is valid
    if emailIsValid(email)

      join.hide()
      checkmark.hide()
      spinner.fadeIn()

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
        spinner.hide()
        checkmark.fadeIn()

    else
      errorField.html('Please check your email again. Thanks.').fadeIn()

# Email validation helper
emailIsValid = (email) ->
  emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
  return emailReg.test email

setupFullPageMediumUp = ->
  $('main#main').hide()

  $('#fullpage').fullpage
    navigation: true
    fitToSectionDelay: 9999999
    paddingTop: '50px'
    fixedElements: '.phone'
    afterRender: ->
      $('main#main').fadeIn(1000)
    onLeave: (index, nextIndex, direction) ->

      # Stop playing Phosphors
      # if player_Plan?
      #   player_Plan.stop()
      #   player_Adapt.stop()
      #   player_Inbox.stop()

      $('#screen').removeClass()
      $('.down-arrow').removeClass('hide')

      # Fade next index in and set background color class
      if nextIndex == 1
        $('#screen').addClass('one')
      else if nextIndex == 2
        $('#screen').addClass('two')

        # Play Phosphor
        # if player_Plan?
        #   player_Plan.setCurrentFrameNumber(0)
        #   player_Plan.play()

      else if nextIndex == 3
        $('#screen').addClass('three')

        # Play Phosphor
        # player_Adapt.setCurrentFrameNumber(0)
        # player_Adapt.play()

      else if nextIndex == 4
        $('#screen').addClass('four')

        # Play Phosphor
        # player_Inbox.setCurrentFrameNumber(0)
        # player_Inbox.play()

      else if nextIndex == 5
        $('#screen').addClass('five')
      else if nextIndex == 6
        $('#screen').addClass('six')
        $('.down-arrow').addClass('hide')

handleOrientation = (e) ->
  height = window.innerHeight
  if height < 480
    $('main#main').hide()
    $('.rotate').fadeIn()

playerInstantiated = false
fullPageInstantiated = false

$ ->

  # window.addEventListener('deviceorientation', handleOrientation, true)

  setupEmailModal()


  # CSS Media Query check: Medium Up
  mediaCheck
    media: '(min-width: 40.063em)'
    entry: ->

      if window.innerHeight < 769
        $('main#main').hide()
        $('.rotate').fadeIn()
      else
        if !fullPageInstantiated
          setupFullPageMediumUp()
          fullPageInstantiated = true

    exit: ->
      $('main#main').fadeIn(0)
      $('.rotate').hide()

      if fullPageInstantiated
        $.fn.fullpage.destroy('all')
        fullPageInstantiated = false

