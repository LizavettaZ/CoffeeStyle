import createElement from "./create-element.js"
import escapeHtml from "./escape-html.js"

import Modal from "./modalWindow.js"
import OrderValidation from "./orderValidation.js";


export default class Cart {
  cartItems = []

  constructor(cartIcon) {
    this.cartIcon = cartIcon

    this._addEventListeners()
  }

  addProduct(product) {
    if (!product) return
    const noProduct = this.cartItems.every(cartItem => cartItem.product.name !== product.name)

    if (noProduct) {
      this.cartItems.push({ product, count: 1 })
      this.onProductUpdate({ product, count: 1 })
    } else {
      this.cartItems.forEach(cartItem => {
        if (cartItem.product.name === product.name) {
          cartItem.count++
          this.onProductUpdate(cartItem)
        }
      })
    }
  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach((cartItem, index) => {
      if (cartItem.product.id === productId) {
        cartItem.count = amount

        if (cartItem.count === 0) {
          this.cartItems.splice(index, 1)
        }
        this.onProductUpdate(cartItem)
      }
    })
  }

  isEmpty() {
    return !this.cartItems.length
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => sum + item.count, 0)
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, item) => sum + item.count * item.product.price, 0)
  }

  renderProduct(product, count) {
    return createElement(`
      <div class="order__product" id="${product.id}">
        <div class="order_product__img">
          <img src="img/products/${product.id}.png" alt="product">
        </div>
        <div class="order_counter__info">
          <div class="product_info__title">${escapeHtml(product.name)}</div>
            <div class="product_info__price-wrap">
              <div class="order_counter">
                <button type="button" class="order_counter__button order_counter__button_minus">
                  <img src="img/icons/minus.svg" alt="minus">
                </button>
                <span class="order_counter__count">${count}</span>
                <button type="button" class="order_counter__button order_counter__button_plus">
                  <img src="img/icons/plus.svg" alt="plus">
                </button>
              </div>
              <div class="order_counter__price">$${(product.price * count).toFixed(2)}</div>
            </div>
        </div>
      </div>
    `)
  }

  renderOrderForm() {
    return createElement(`
      <form class="order__form error_in_form">
        <h3 class="order_form__title">Delivery</h3>
        <div class="order_form__group">
          <input name="name" type="text" class="order_form__input" autocomplete="off" placeholder="Name">
          <input name="email" type="email" class="order_form__input" autocomplete="off" placeholder="Email">
          <input name="tel" type="tel" class="order_form__input" autocomplete="off" placeholder="Phone">
        </div>
        <div class="order_form__address">
          <input name="address" type="text" class="order_form__input" placeholder="Address">
        </div>
        <div class="order_form__button">
          <div class="order_form_button__full_price">
            <p class="full_price__text">total</p>
            <p class="full_price__price">€${this.getTotalPrice().toFixed(2)}</p>
          </div>
          <button type="submit" class="order_form_button__button">order</button>
        </div>
      </form>
    `)
  }

  onProductUpdate(cartItem) {
    if (document.body.classList.contains('is-modal-open')) {
      const productId = cartItem.product.id
      const modalBody = document.querySelector('.modal__body')
      const productCount = modalBody.querySelector(`[id='${productId}'] .order_counter__count`)
      const productPrice = modalBody.querySelector(`[id='${productId}'] .order_counter__price`)
      const infoPrice = modalBody.querySelector(`.full_price__price`)

      productCount.innerHTML = `${cartItem.count}`
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`

      if (cartItem.count === 0 && this.cartItems.length !== 0) {
        document.querySelector(`[id='${cartItem.product.id}']`).remove()
      } else if (this.cartItems.length === 0) {
        document.body.querySelector('.container').remove()
        document.body.classList.remove('is-modal-open')
      }
    }

    this.cartIcon.update(this)
  }

  renderModal() {
    const modal = new Modal()
    modal.setTitle('Your order')
    modal.setBody(createElement('<div class="body__order"></div>'))
    modal.open()

    const modalBody = document.querySelector('.modal__inner .modal__body')

    this.cartItems.forEach(cartItem => {
      modalBody.querySelector('.body__order').append(this.renderProduct(cartItem.product, cartItem.count))
    })

    modalBody.querySelector('.body__order').append(this.renderOrderForm())

    modalBody.addEventListener('click', (event) => {
      if (!event.target.closest('.order__product')) return

      const productId = event.target.closest('.order__product').id

      this.cartItems.forEach(cartItem => {
        if (cartItem.product.id === productId) {
          if (!event.target.closest('button')) return

          if (event.target.closest('button').classList.contains('order_counter__button_minus')) {
            cartItem.count--
            this.updateProductCount(productId, cartItem.count)
          } else {
            cartItem.count++
            this.updateProductCount(productId, cartItem.count)
          }
        }
      })
    })

    this._validation = new OrderValidation(document.querySelector('.order__form'))

    modalBody.querySelector('.order__form').addEventListener('submit', (event) => {
      this.onSubmit(event)
    })
  }

  onSubmit(event) {
    const module = document.querySelector('.modal__inner')

    event.preventDefault()

    if (module.querySelector('.order__form').classList.contains('error_in_form')) return

    const formData = new FormData(event.target)

    const responsePromise = fetch('https://httpbin.org/post', {
      body: formData,
      method: 'POST'
    })

    responsePromise
      .then(() => {
        document.querySelectorAll('.add__done').forEach(card => {
          card.classList.remove('add__done')
          card.innerHTML = `Add`
        })
      })
      .then(() => {
        if (document.querySelector('.subscribe_form').classList.contains('subscribed')) {
          document.querySelector('.subscribe_form').style.display = ''
          document.querySelector('.success_text').remove()
        }
      })
      .then(() => {
        this.cartItems.length = 0
        this.cartIcon.update(this)

        module.querySelector('.modal__title').innerHTML = 'Success!'
        module.querySelector('.modal__title').classList.add('title_success')
        module.querySelector('.modal__body').innerHTML = ''
        module.querySelector('.modal__body').insertAdjacentHTML("afterbegin", `
          <div class="modal__body-inner">
            <h2>
              Thanks for your order!<br>
              Our manager will contact you to confirm the order.<br>
              <img src="img/gif/cup.gif" alt="cup.gif">
            </h2>
          </div>
        `)
      })
  }

  _addEventListeners() {
    this.cartIcon.elem.onclick = () => !this.isEmpty() && this.renderModal()
  }
}

