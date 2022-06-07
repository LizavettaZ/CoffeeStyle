export default class OrderValidation {
  constructor(form) {
    this._form = form
    this._validation()
    this.isEmpty()
  }

  _validation() {
    if (this._form.email) {
      this._emailValidation(this._form.email)
    }

    if (this._form.name) {
      this._nameValidation(this._form.name)
    }

    if (this._form.tel) {
      this. _telValidation(this._form.tel)
    }

    if (this._form.address) {
      this. _addressValidation(this._form.address)
    }
  }

  _emailValidation(email) {
    email.addEventListener('blur', () => {
      if (!email.value.match(/.+@.+\..+/i)) {
        email.classList.add('error')
        this._form.classList.add('error_in_form')
      }
    })

    email.addEventListener('focus', () => {
      if (email.classList.contains('error')) {
        email.classList.remove('error')
        this._form.classList.remove('error_in_form')
      }
    })
  }

  _nameValidation(name) {
    name.addEventListener('blur', () => {
      if (name.value.length < 3 ) {
        name.classList.add('error')
        this._form.classList.add('error_in_form')
      }
    })

    name.addEventListener('focus', () => {
      if (name.classList.contains('error')) {
        name.classList.remove('error')
        this._form.classList.remove('error_in_form')
      }
    })
  }

  _telValidation(number) {
    number.addEventListener('blur', () => {
      if (number.value.length < 11 || !number.value.match(/\d/ig)) {
        number.classList.add('error')
        this._form.classList.add('error_in_form')
      }
    })

    number.addEventListener('focus', () => {
      if (number.classList.contains('error')) {
        number.classList.remove('error')
        this._form.classList.remove('error_in_form')
      }
    })
  }

  _addressValidation(address) {
    address.addEventListener('blur', () => {
      if (address.value.length < 10) {
        address.classList.add('error')
        this._form.classList.add('error_in_form')
      }
    })

    address.addEventListener('focus', () => {
      if (address.classList.contains('error')) {
        address.classList.remove('error')
        this._form.classList.remove('error_in_form')
      }
    })
  }

  isEmpty() {
    if (this._form.address.value.length > 1 && this._form.tel.value.length > 1 && this._form.name.value.length > 1 && this._form.email.value.length > 1) {
      this._form.classList.remove('error_in_form')
    }
  }
}

