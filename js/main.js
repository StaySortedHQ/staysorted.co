// Generated by CoffeeScript 1.7.1
(function() {
  var emailIsValid, fullPageInstantiated, handleOrientation, playerInstantiated, setupEmailModal, setupFullPage, showRotateDevice, showSite;

  setupEmailModal = function() {
    Parse.initialize("PJrCjZ1mqVIqBhYwdv2DxMZj8kAqAntfMaYozqRY", "sUQonoF8Y2O3YFtuweJ8V0uaPwS4sbDKsSAtQK9R");
    $('#email-modal').on('click', function(e) {
      return $(this).fadeOut();
    });
    $('.join-beta').on('click', function(e) {
      e.preventDefault();
      return $('#email-modal').fadeIn();
    });
    $('input').on('click', function(e) {
      return e.stopImmediatePropagation();
    });
    $('button').on('click', function(e) {
      return e.stopImmediatePropagation();
    });
    return $('.email-form').submit(function(e) {
      var Contact, action, checkmark, contact, email, errorField, form, formData, join, spinner, successField;
      e.preventDefault();
      form = $(this);
      action = form.attr('action');
      email = $.trim(form.find('input[name=email]')[0].value);
      successField = $(form.find('.form-message'));
      errorField = $(form.find('.form-error'));
      spinner = $(form.find('.loader'));
      join = $(form.find('.join'));
      checkmark = $(form.find('.done'));
      successField.html('').fadeOut(0);
      errorField.html('').fadeOut(0);
      if (emailIsValid(email)) {
        join.hide();
        checkmark.hide();
        spinner.fadeIn();
        formData = {
          'email': email
        };
        Contact = Parse.Object.extend("Contact");
        contact = new Contact();
        return contact.save({
          email: email
        }).then(function(object) {
          successField.html('Thank you. You will receive an email soon.').fadeIn();
          spinner.hide();
          return checkmark.fadeIn();
        });
      } else {
        return errorField.html('Please check your email again. Thanks.').fadeIn();
      }
    });
  };

  emailIsValid = function(email) {
    var emailReg;
    emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return emailReg.test(email);
  };

  setupFullPage = function() {
    $('mediumDevice').hide();
    return $('#fullpage').fullpage({
      navigation: true,
      fitToSectionDelay: 9999999,
      paddingTop: '50px',
      fixedElements: '.phone',
      afterRender: function() {
        return $('mediumDevice').fadeIn(1000);
      },
      onLeave: function(index, nextIndex, direction) {
        $('#screen').removeClass();
        $('.down-arrow').removeClass('hide');
        if (nextIndex === 1) {
          return $('#screen').addClass('one');
        } else if (nextIndex === 2) {
          return $('#screen').addClass('two');
        } else if (nextIndex === 3) {
          return $('#screen').addClass('three');
        } else if (nextIndex === 4) {
          return $('#screen').addClass('four');
        } else if (nextIndex === 5) {
          return $('#screen').addClass('five');
        } else if (nextIndex === 6) {
          $('#screen').addClass('six');
          return $('.down-arrow').addClass('hide');
        }
      }
    });
  };

  showRotateDevice = function() {
    $('.rotate').fadeIn();
    return $('#primary-phone').hide();
  };

  showSite = function() {
    $('.rotate').fadeOut();
    return $('#primary-phone').show();
  };

  handleOrientation = function(e) {
    if (window.orientation === 0) {
      return showSite();
    } else {
      return showRotateDevice();
    }
  };

  playerInstantiated = false;

  fullPageInstantiated = false;

  $(function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      $('.rotate').addClass('mobile');
    } else {
      $('#promoVideo').on('click', function(e) {
        $('#promoVideo').fadeOut();
        return $('#promoVideo video').get(0).pause();
      });
    }
    $(window).on('orientationchange', handleOrientation);
    $('#promoVideo video').on('stop', function(e) {
      return $('#promoVideo').fadeOut();
    });
    $('#promoVideo video').on('ended', function(e) {
      return $('#promoVideo').fadeOut();
    });
    $('video').get(0).addEventListener('webkitendfullscreen', function(e) {
      $(this).get(0).stop();
      return $('#promoVideo').fadeOut();
    });
    $('.promoVideoButton').on('click', function(e) {
      $('#promoVideo').fadeIn();
      $('#promoVideo video').get(0).play();
      return e.preventDefault();
    });
    setupEmailModal();
    return mediaCheck({
      media: '(min-width: 40.063em)',
      entry: function() {
        if (!fullPageInstantiated) {
          setupFullPage();
          return fullPageInstantiated = true;
        }
      },
      exit: function() {
        if (fullPageInstantiated) {
          $.fn.fullpage.destroy('all');
          return fullPageInstantiated = false;
        }
      }
    });
  });

}).call(this);
