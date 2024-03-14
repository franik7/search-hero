const productsContainer = document.querySelector('#products-container')
const form = document.querySelector('form')
const randomHelper = document.querySelector('#random-helper')
const viewAll = document.querySelector('#view-all')
const sortByNameButton = document.querySelector("#sort-by-name")
const sortByDateButton = document.querySelector("#sort-by-date")
const sortByLikesButton = document.querySelector("#sort-by-likes")


// const baseURL = `http://localhost:5678/api/products`
const baseURL = `https://search-hero.onrender.com/api/products`

const productsCallback = products => {
  console.log("Products received in frontend:", products)
  displayProducts(products)
}

const errCallback = err => console.log(err)

const getAllProducts = () => axios.get(baseURL).then(response => {
    console.log("Full response from server:", response.data)
    productsCallback(response.data)
  })
  .catch(errCallback)

const createProduct = body => axios.post(baseURL, body)
  .then(response => {
    console.log("Product added", body)
    productsCallback
    getAllProducts()
  })
  .catch(errCallback)


const deleteProduct = id => axios.delete(`${baseURL}/${id}`)
.then(() => {
  console.log(`Product ${id} deleted`)
  productsCallback
  getAllProducts()
})
.catch(errCallback)


const updateLike = (id, likes) => axios.put(`${baseURL}/${id}`, {likes})

.then(() => {
  console.log(`Product with id:${id} updated`)
  productsCallback
  getAllProducts()
})
.catch(errCallback)


const emailAboutProduct = id => axios.get(`${baseURL}/${id}`)
.then(response => {
  console.log(response.data[0].email)
  console.log(response.data[0].product_name)
  let subject = `I found your ${response.data[0].product_name} product on SearchHero!`
  let body = ` (please list the URL or store where the product was located)
  `
  let composedEmail = "mailto:" + response.data[0].email + "?subject=" + subject + "&body=" + body;
  window.location.href = composedEmail;
})
.catch(errCallback)


function submitHandler(e) {
  e.preventDefault()

  let product_name = document.querySelector('#name').value
  let url = document.querySelector('#img').value
  let email = document.querySelector('#email').value


  let bodyObj = {
    product_name: product_name,
    url: url,
    email: email,
  }

  createProduct(bodyObj)


  document.querySelector('#name').value = ''
  document.querySelector('#img').value = ''
  document.querySelector('#email').value = ''
}


function createProductCard(product) {


  const productCard = document.createElement('div')
  productCard.classList.add('product-card')

  productCard.innerHTML = `
  <div class="card-bootstrap p-1">
  <div class="col">
    <div class="card" style="width: 18rem;">
    
      <img src="${product.url}" class="card-img-top imgBorder" alt="product">

      <div class="card-body">
        <!-- Product Title -->
        <h5 class="card-title">${product.product_name}</h5>

        <div class="d-flex justify-content-around mb-3">
          <button onclick="emailAboutProduct(${product.id})" class="btn btn-primary">Email</button>
          <button onclick="deleteProduct(${product.id})" class="btn btn-danger">Delete</button>
        </div>

        <div class="d-flex justify-content-center">
          <p>I am also looking for this product</p>
        </div>

        <div class="d-flex justify-content-center">
        <!-- Like Section -->
        <button onclick="updateLike(${product.id})" class="like-button btn btn-warning d-flex align-items-center">
          
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
          <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
           </svg>

        
          <p class="mb-0" style="font-size: 18px;">&nbsp${product.likes}</p>
        </button>
        </div>
      </div>
    </div>
  </div>
</div>

`;




  productsContainer.appendChild(productCard)
}

function displayProducts(arr) {
    productsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
     
      createProductCard(arr[i])
      viewAll.style.display = 'none'
      randomHelper.style.display = 'inline-block'
      sortByNameButton.style.display = 'inline-block'
      sortByDateButton.style.display = 'inline-block'
      sortByLikesButton.style.display = 'inline-block'
    }
  }
  
  function getRandomProduct(products) {
    const randomProductIndex = Math.floor(Math.random() * products.length)
    return products[randomProductIndex]
  }
  
  function displayRandomProduct() {
    axios.get(baseURL)
      .then(({ data: products }) => {
        console.log(products)
        const randomProduct = getRandomProduct(products)
        productsContainer.innerHTML = ''
        viewAll.style.display = 'inline-block'
        randomHelper.style.display = 'none'
        sortByNameButton.style.display = 'none'
        sortByDateButton.style.display = 'none'
        sortByLikesButton.style.display = 'none'
        
        createProductCard(randomProduct)
        const card = document.querySelector('.card')
        card.classList.add('animateCard')
      })
      .catch(errCallback)
  }

  const sortByName = () => axios.get(`${baseURL}/sort`).then(response => {
    productsCallback(response.data)
  })
  .catch(errCallback)


  const sortByDate = () => axios.get(`${baseURL}/date`).then(response => {
    productsCallback(response.data)
  })
  .catch(errCallback)

  const sortByLikes = () => axios.get(`${baseURL}/likes`).then(response => {
    productsCallback(response.data)
  })
  .catch(errCallback)

  
  sortByDateButton.addEventListener('click', sortByDate)
  sortByNameButton.addEventListener('click', sortByName)
  sortByLikesButton.addEventListener('click', sortByLikes)
  form.addEventListener('submit', submitHandler)
  randomHelper.addEventListener('click', displayRandomProduct)
  viewAll.addEventListener('click', getAllProducts)

  
  getAllProducts()

  
