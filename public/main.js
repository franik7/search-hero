const productsContainer = document.querySelector('#products-container')
const form = document.querySelector('form')
const randomHelper = document.querySelector('#random-helper')
const viewAll = document.querySelector('#view-all')
const sortByNameButton = document.querySelector("#sort-by-name")
const sortByDateButton = document.querySelector("#sort-by-date")
const sortByLikesButton = document.querySelector("#sort-by-likes")

// const baseURL = `http://localhost:5678/api/products`
const baseURL = `https://productfinder-5frz.onrender.com//api/products`

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
        <!-- Product Image -->
        <img src="${product.url}" class="card-img-top" alt="product">
        
        <div class="card-body">
          <!-- Product Title -->
          <h5 class="card-title">${product.product_name}</h5>
          
          <div class="d-flex justify-content-around">
            <button onclick="emailAboutProduct(${product.id})" class="btn btn-primary">Email</button>
            <button onclick="deleteProduct(${product.id})" class="btn btn-danger">Delete</button>
          </div>
        </div>
        
        <div class="d-flex justify-content-center">
          <p>I am also looking for this product</p>
        </div>
  
        <div class="d-flex justify-content-center"> 
        <button onclick="updateLike(${product.id})" class="btn btn-danger">
          <!-- Custom Thumbs-Up Image -->
          <img class="color-change" src="./assets/hand-thumbs-up.svg" alt="thumbs-up">
          
          <!-- Like Counter -->
          <p class="ml-2 mb-0">${product.likes}</p>
        </button>
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
        createProductCard(randomProduct)
        
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

  
