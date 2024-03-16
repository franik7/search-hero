// seed.js
const dotenv = require('dotenv');
const sequelize = require('sequelize');

dotenv.config();

const sql = new sequelize.Sequelize(process.env.CONNECTION_STRING);

const seedDatabase = async () => {
  const SQL_CODE = `
   DROP TABLE PRODUCTS;
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(255),
  url VARCHAR(255),
  email VARCHAR(255),
  created_at TIMESTAMP,
  likes INTEGER
);
INSERT INTO products (product_name, url, email, created_at, likes)
VALUES 
  ('Equate Face Wash', 'https://i5.walmartimages.com/seo/Equate-Oil-Free-Daily-Face-Wash-6-5oz_7e640653-ceca-400c-abfa-3c572a9504bf.93596a832fb705af910e4515cdfea7d4.jpeg', '123@yahoo.com', CURRENT_TIMESTAMP, 2),
  ('Centrum Multivitamins', 'https://i5.walmartimages.com/asr/b49b9b21-2aed-4a93-885e-a68298a2f06e.b574aafeb3049adc5f36974f3d8bf470.jpeg', '1234@yahoo.com', CURRENT_TIMESTAMP, 0),
  ('Cafe Bustelo Instant 100g', 'https://shop.smucker.com/cdn/shop/files/gw89k24i5nq0p619099h.jpg?v=1706205309&width=1400', '12345@yahoo.com', CURRENT_TIMESTAMP, 2),
  ('Banana', 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg', 'Hello', CURRENT_TIMESTAMP, 4),
  ('Peach', 'https://t3.ftcdn.net/jpg/03/00/59/16/360_F_300591692_sE2Zpz9hoU0H1Klz0JzRw1F74HO7vWne.jpg', 'franik@franik.com', CURRENT_TIMESTAMP, 5),
  ('Peach', 'https://t3.ftcdn.net/jpg/03/00/59/16/360_F_300591692_sE2Zpz9hoU0H1Klz0JzRw1F74HO7vWne.jpg', 'franik@franik.com', CURRENT_TIMESTAMP, 0),
  ('Peach', 'https://t3.ftcdn.net/jpg/03/00/59/16/360_F_300591692_sE2Zpz9hoU0H1Klz0JzRw1F74HO7vWne.jpg', 'franik@franik.com', CURRENT_TIMESTAMP, 7);
  `;

  try {
    await sql.query(SQL_CODE);
    console.log('Successfully seeded the database');
  } catch (error) {
    console.error('Failed to seed the database', error);
  }
};

module.exports = seedDatabase;
