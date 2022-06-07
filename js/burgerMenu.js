export default function burgerMenu() {
  const burgerMenu = document.querySelector('.header__burger')

  burgerMenu.addEventListener('click', (event) => {
    event.target.closest('.header__burger')

    if (!event.target.closest('.header__burger')) return

    event.target.closest('.header__burger').classList.toggle('active')
    document.querySelector('.header__menu').classList.toggle('active')
    document.body.classList.toggle('lock')
  })

  document.querySelector('.header__menu').addEventListener('click', (event) => {

    if (!event.target.closest('a')) return

    document.querySelector('.header__burger').classList.toggle('active')
    document.querySelector('.header__menu').classList.toggle('active')
    document.body.classList.toggle('lock')
  })
}

