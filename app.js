// Required Packages
const express = require('express');
const mariadb = require('mariadb');

// PORT 
const PORT = process.env.PORT || 3000;

// Pool for grabbing database info
const pool = mariadb.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '1234', // Change the password here for your local machine
  database: process.env.DB_NAME || 'thegillypad',
  connectionLimit: 5
});

// Connecting to the database
async function connect() {
    try {
        let conn = await pool.getConnection();
        console.log('Connected to the database');
        return conn;
    } catch (err) {
        console.error('Error connecting to the database', err);
        throw err;
    }
};

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static('views'));
app.set('view engine', 'ejs');

// Home page
app.get('/', (req, res) => {
    res.render('home');
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

