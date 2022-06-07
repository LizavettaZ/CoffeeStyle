import createElement from './create-element.js'

function cardTemplate(name, id, price){
  return `<div class="product_card card" id="${id}">
                  <div class="product__img">
                    <img src="img/products/${id}.png" alt="">
                  </div>
                  <h4>${name}</h4>
                  <div class="product__price">
                    <span class="price">$ ${price.toFixed(2)} USD</span>
                  </div>
                  <button type="button" class="product__add">Add</button>
                </div>`
}

export default class ProductCard {
  constructor(product) {
    this._name = product.name
    this._price = product.price
    this._id = product.id
    this.elem = createElement(cardTemplate(this._name, this._id, this._price))

    this._customEvent()
  }

  _customEvent = () => {
    this.elem.addEventListener('click', (event) => {
      if (!event.target.closest('.product__add')) return

      event.target.closest('.product__add').classList.add('add__done')
      event.target.closest('button').innerHTML = ''

      console.log('click2')
      event.target.closest('.product__add').dispatchEvent(new CustomEvent('product-add', {
        detail: this._id,
        bubbles: true
      }))
    })
  }
}

