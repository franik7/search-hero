const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const sequelize = require('sequelize')

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())


const { CONNECTION_STRING } = process.env
const sql = new sequelize.Sequelize(CONNECTION_STRING)


module.exports = {
    getHomePage: (req, res) => {
        res.sendFile('index.html');
    },

    getProducts: (req, res) => {
            sql.query('SELECT * FROM products order by id asc;').then(sqlResult => {
                const products = sqlResult[0];
                console.log(sqlResult[0])
                res.status(200).send(products)
            }).catch(err => {
                res.status(500).send(err)
            })
        },

    createProduct: (req, res) => {
        const product_name = req.body.product_name
        const url = req.body.url
        const email = req.body.email

        const SQL_CODE = `
            INSERT INTO products (product_name, email, url, created_at, likes)
            VALUES ('${product_name}', '${email}', '${url}', CURRENT_TIMESTAMP, 0);
            
            `
        console.log(product_name, url, email) 
            
        sql.query(SQL_CODE).then(sqlResult => {
            res.status(200).end()
        }).catch(err => {
            res.status(500).send(err)
        })
    },

    deleteProduct: (req, res) => {
            const{ id } = req.params
            sql.query(`DELETE FROM products where id = ${id}`)
            .then(() =>res.status(200).end())
            .catch(err => {
                res.status(500).send(err)
            })
        },
        
    sortByName: (req, res) => {
        sql.query('SELECT * FROM products order by product_name asc;').then(sqlResult => {
            const products = sqlResult[0];
            console.log(sqlResult[0])
            res.status(200).send(products)
        }).catch(err => {
            res.status(500).send(err)
        })
    },

    sortByDate: (req, res) => {
        sql.query('SELECT * FROM products order by created_at desc;').then(sqlResult => {
            const products = sqlResult[0];
            console.log(sqlResult[0])
            res.status(200).send(products)
        }).catch(err => {
            res.status(500).send(err)
        })
    },

    sortByLikes: (req, res) => {
        sql.query('SELECT * FROM products order by likes desc;').then(sqlResult => {
            const products = sqlResult[0];
            console.log(sqlResult[0])
            res.status(200).send(products)
        }).catch(err => {
            res.status(500).send(err)
        })
    },

    emailAboutProduct: (req, res) => {
            const{ id } = req.params
            sql.query(`select product_name, email from products where id = ${id}`)
            .then(sqlResult => {
                console.log(sqlResult[0])
                res.status(200).send(sqlResult[0])
            })
            .catch(err => {
                res.status(500).send(err)
            })
    },

    updateLikes: (req, res) => {
        let { id } = req.params
        let { likes } = req.body

        const SQL_CODE = `UPDATE products SET likes = likes + 1 where id = ${id};
        select * from products
        order by id asc;
        `

        sql.query(SQL_CODE).then(sqlResult => {
            res.status(200).send(sqlResult[0])
        }).catch(err => {
            res.status(500).send(err)
        })
    }
}       
        
