const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const sequelize = require('sequelize')
const {getProducts, createProduct, deleteProduct, sortByName, sortByDate, sortByLikes, emailAboutProduct, updateLikes, getHomePage} = require('./controller.js')

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use(express.static('public'));

//Routes
app.get('/', getHomePage);
app.get(`/api/products`, getProducts)
app.post(`/api/products`, createProduct)
app.delete(`/api/products/:id`, deleteProduct)
app.get(`/api/products/sort`, sortByName)
app.get(`/api/products/date`, sortByDate)
app.get(`/api/products/likes`, sortByLikes)
app.get(`/api/products/:id`, emailAboutProduct)
app.put(`/api/products/:id`, updateLikes)

app.listen(process.env.PORT, () => console.log(`running on ${process.env.PORT}`))
