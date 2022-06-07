import createElement from "./create-element.js"

function modalTemplate() {
  return `
        <div class="container">
            <div class="modal">
                <div class="modal__overlay"></div>
                <div class="modal__inner">
                    <div class="modal__header">
                        <button type="button" class="modal__close">
                            <img src="img/icons/close.svg" alt="close-icon" />
                        </button>
                        <h3 class="modal__title"></h3>
                    </div>
                    <div class="modal__body"></div>
                </div>
            </div>
        </div>
  `
}

export default class Modal {
  constructor() {
    this._modal = this._createModal()
    this._closeByButton()
    this._closeByEsc()
  }

  _createModal() {
    return createElement(modalTemplate())
  }

  setTitle(title) {
    this._modal.querySelector('.modal__title').insertAdjacentText( 'afterbegin',`${title}`)
  }

  setBody(elem) {
    this._modal.querySelector('.modal__body').insertAdjacentText( 'afterbegin','')
    this._modal.querySelector('.modal__body').append(elem)
  }

  open() {
    document.body.insertAdjacentElement('afterbegin', this._modal)
    document.body.classList.add('is-modal-open')
  }

  close() {
    this._modal.remove()
    document.body.classList.remove('is-modal-open')
  }

  _closeByButton() {
    this._modal.addEventListener('click', (event) => {
      const button = event.target.closest('button')
      if (!button) return
      button.classList.contains('modal__close') && this.close()
    })
  }

  _closeByEsc() {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') this.close()
    })
  }
}

