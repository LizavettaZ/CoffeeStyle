import createElement from "./create-element.js"

export default class SubscribeValidation {
  constructor(form) {
    this._form = form
    this._emailValidation(this._form.email)
  }

  _emailValidation(email) {
    email.addEventListener('blur', () => {
      if (!email.value.match(/.+@.+\..+/i)) {
        this._form.after(createElement(`<div class="error_text">Enter correct email</div>`))
        email.classList.add('error')
        this._form.classList.add('error_in_form')
        this._form.style.position = 'relative'
      }
    })

    email.addEventListener('focus', () => {
      if (email.classList.contains('error')) {
        email.classList.remove('error')
        document.querySelector('.error_text').remove()
        this._form.classList.remove('error_in_form')

      }
    })

    this._eventListener()
  }

  _eventListener() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault()

      if (this._form.classList.contains('error_in_form')) return

      const formSubscribe = new FormData(event.target)

      fetch('https://httpbin.org/post', {
        body: formSubscribe,
        method: 'POST'
      }).then(() => {
        this._form.style.display = 'none'
        this._form.classList.add('subscribed')
        this._form.after(createElement(`<div class="success_text text">Success! <br> Thank you for your subscription</div>`))
        this._form.email.value = ''
      })
    })
  }
}