mailgun = require("mailgun")
mailgun.initialize("mg.onereminder.co", "key-1d18d71a2638337f57f73259704aa420")

Parse.Cloud.afterSave "Contact", (request) ->

  email = request.object.get 'email'

  mailgun.sendEmail({
    to: "leo@onereminder.co"
    from: "beta@onereminder.co"
    subject: email + " has just registered for OneReminder Beta!"
    text: "Their email is: " + email
  }, {
    success: (httpResponse) ->
      console.log httpResponse
      console.log email
      console.log "Email sent successfully"
    error: (httpResponse) ->
      console.error httpResponse
      console.log email
      console.error "Uh oh, something went wrong"
  })

  mailgun.sendEmail({
      to: email
      from: "beta@onereminder.co"
      subject: "Thank you for joining OneReminder Beta"
      text: "You will receive an email from Apple's TestFlight system with your invitation to join OneReminder's beta.
            \n\nCheers and you're awesome!"
    }, {
      success: (httpResponse) ->
        console.log httpResponse
        console.log email
        console.log "Email sent successfully"
      error: (httpResponse) ->
        console.error httpResponse
        console.log email
        console.error "Uh oh, something went wrong"
    })

Parse.Cloud.define 'sendEmail', (request, response) ->
  mailgun.sendEmail {
    to: 'leo@onereminder.co'
    from: 'leo@onereminder.co'
    subject: 'Hello World!'
    text: 'Hello'
  }, {
    success: (httpResponse) ->
      console.log(httpResponse)
      response.success 'Email sent!'
    error: (httpResponse) ->
      console.log(httpResponse)
      response.error 'Uh oh, something went wrong'
  }