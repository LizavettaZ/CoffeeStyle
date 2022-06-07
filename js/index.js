import ProductGrid from "./productGrid.js"
import CartIcon from "./cartIcon.js"
import Cart from "./cart.js"
import FeatureGrid from "./featureGrid.js"
import SubscribeValidation from "./subscribeValidation.js";

import burgerMenu from "./burgerMenu.js"
import addText from "./addText.js"

export default class Main {
  constructor() {
    this._featureGrid = null
    this._cartIcon = new CartIcon()
    this._cart = new Cart(this._cartIcon)
    this._productGrid = null

    new SubscribeValidation(document.querySelector('.subscribe_form'))
  }

  async render() {
    await fetch('products.json', {
      method: 'GET'
    }).then(res => {
      return res.json()
    }).then(products => {
      this._productGrid = new ProductGrid(products)
      document.querySelector('.all__swiper').append(this._productGrid.elem)

      this._featureGrid = new FeatureGrid(products)
      document.querySelector('.featured__swiper').append(this._featureGrid.elem)
    }).then(() => {
      document.body.addEventListener('product-add', (event) => {
        this._productGrid._products.forEach(product => {
          if (product.id === event.detail){
            this._cart.addProduct(product)
          }
        })
      })
    })
  }
}

const sliders = document.querySelectorAll('.swiper')

let blogSwiper

sliders.forEach(slider => {
  function mobileSwiper() {
    if (window.innerWidth <= 769 && slider.dataset.mobile === 'false') {
      blogSwiper = new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 10,
        slideClass: 'card',
        pagination: {
          el: slider.querySelector('.swiper-pagination'),
          type: 'bullets',
          clickable: 'true'
        },
      })
      slider.dataset.mobile = 'true'
    }

    if (window.innerWidth > 769 ) {
      slider.dataset.mobile = 'false'

      if (slider.classList.contains('swiper-initialized')){
        blogSwiper.destroy()
      }
    }
  }

  window.addEventListener('resize', () => {
    mobileSwiper()
  })
})

burgerMenu()
addText()

