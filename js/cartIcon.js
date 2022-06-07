export default class CartIcon {
  constructor() {
    this.render()
  }

  render() {
    this.elem = document.querySelector('.header__cart')
  }

  update(cart) {
    if (cart.isEmpty()) {
      this.elem.querySelector('.cart__count').textContent = `0`
    } else {
      this.elem.querySelector('.cart__count').textContent = `${cart.getTotalCount()}`
    }
  }
}

