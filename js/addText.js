export default function addText() {
  const description = document.querySelector('.description__text')
  document.querySelector('.description_card').addEventListener('click', (event) => {
    event.preventDefault()

    if (event.target.closest('.description__open_link') && !description.classList.contains('full_description')) {

      description.classList.add('full_description')
      description.insertAdjacentHTML('beforeend', `<p class="add_text">
             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab corporis ex quae quam quia reprehenderit saepe
              sapiente sequi sunt ullam? Consequatur ex, id laborum minus molestias placeat praesentium quas veniam!
              Accusamus aliquam animi aperiam autem blanditiis consequuntur cum cumque deserunt dignissimos dolorem
              dolores ducimus earum enim eos illo ipsa ipsam iure iusto minus modi natus necessitatibus neque nihil
              obcaecati odit optio perspiciatis placeat praesentium provident quaerat qui quidem quos, repellat
              reprehenderit saepe sunt tenetur! Distinctio est odio quos ratione? Commodi corporis dolore ea minus
              molestiae qui vel velit voluptatibus? A assumenda consequuntur cumque eligendi et mollitia nisi ratione
              vel vero.</p>`)

      document.querySelector('.description__open_link').style.display = 'none'
      document.querySelector('.description__close_link').style.display = 'block'

    } else if (event.target.closest('.description__close_link') && description.classList.contains('full_description')) {
      description.classList.remove('full_description')
      document.querySelector('.add_text').remove()
      document.querySelector('.description__open_link').style.display = ''
      document.querySelector('.description__close_link').style.display = 'none'
    }
  })
}

