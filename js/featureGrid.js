import ProductCard from "./productCard.js"
import createElement from "./create-element.js";

export default class FeatureGrid {

  constructor(products) {
    this._products = products
    this.elem = createElement(`<div class="swiper-wrapper featured_container"></div>`)
    this._createCards()
  }

  _createCards() {
    for (const product of this._products) {

      if (product.featured) {
        const card = new ProductCard(product)
        this.elem.append(card.elem)

        if (product.old_price) {
          this.elem.querySelector(`[id="${product.id}"] .price`).classList.add('new_price')
          this.elem.querySelector(`[id="${product.id}"] .price`).insertAdjacentHTML('afterend',
            `<span class="price old_price">$ ${product.old_price.toFixed(2)}</span>`)
        }
      }
    }
  }
}

