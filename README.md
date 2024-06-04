<br/>
<p align="center">
  <a href="https://search-hero.onrender.com/">
    <img src="/public/assets/product_finder.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Search Hero</h3>

  <p align="center">
    <br/>
    <a href="https://www.youtube.com/watch?v=Cm6gB-Sb7lg"><strong>View Demo »</strong></a>
    <br/>
   
  </p>
</p>

# Search Hero

Search Hero is a platform designed to connect users with the products they want to find, effortlessly. Users can publish products they're searching for, engage with published products by liking them, and sort products based on various criteria.

## Features

- **Easy Product Publication and Discovery**: Users can easily publish products they're searching for by providing product details and contact information. Other users can view these products and offer assistance.
  
- **Like and Sorting System**: Users can like products to indicate interest, and products can be sorted based on likes, date added, or alphabetically.

- **Random Product Search**: Users can choose to help find a random product, providing a unique and adventurous experience.

## Technologies Used

- **JavaScript (Node.js)**: Backend development.
  
- **Express.js**: Web framework for Node.js.
  
- **PostgreSQL**: Database management system.
  
- **Sequelize**: ORM for Node.js.
  
- **Bootstrap**: Frontend framework for responsive design.

## Challenges

In creating this website, the most challenging part was deploying and connecting the database. Numerous times my app and database did not want to communicate with each other or passed the wrong info. For me, figuring out and ensuring my app is available for anyone was the most rewarding and empowering experience.

## Installation

To install Search Hero locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/search-hero.git

2. Navigate to the project directory:
    ```bash
    cd search-hero

3. Install dependencies using npm:
    ```bash
    npm install
    
4. Create a .env file in the root directory of the project, and add the following variables:
    ```bash
    PORT=5678
    CONNECTION_STRING=your_database_connection_string
    Replace your_database_connection_string with your PostgreSQL database connection string.

5. Start the server:
    ```bash
    node server/index.js

6. Start the server:
    Visit http://localhost:5678 in your web browser to access Search Hero locally.
    
## Authors

- **Frants Kavalionak** - [Frants Kavalionak](https://github.com/franik7/) - _All Work_


