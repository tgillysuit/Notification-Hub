// Required Packages
const express = require('express');
const mariadb = require('mariadb');

const bcrypt = require('bcrypt'); // This is for hashing passwords

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
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Home page
app.get('/', (req, res) => {
    res.render('home');
});

// Sign-up page
app.get('/signup', (req, res) => {
    res.render('signup');
});

// Sign-up form submission
app.post('/signup', async (req, res) => {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      phoneNumber,
      smsOptIn
    } = req.body;
  
    try {
      // Validate input
      if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
        return res.status(400).send('All fields are required.');
      }
      if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match.');
      }
  
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).send('Invalid email format.');
      }
  
      // Validate phone number (optional)
      const phoneRegex = /^\d{10}$/; // Example: 10 digits
      if (phoneNumber && !phoneRegex.test(phoneNumber)) {
        return res.status(400).send('Invalid phone number format.');
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert user into the database
      const conn = await pool.getConnection();
      await conn.query(
        `INSERT INTO users (first_name, last_name, username, email, password, phone_number, sms_opt_in, agreed_to_sms_terms)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          firstName,
          lastName,
          username,
          email,
          hashedPassword,
          phoneNumber || null,
          smsOptIn === 'on' ? 1 : 0,
          smsOptIn === 'on' ? 1 : 0 // Assuming agreeing to terms is tied to SMS opt-in
        ]
      );
      conn.release();
  
      // Redirect to a thank-you page
      res.redirect('/thank-you');
    } catch (err) {
      console.error('Error processing sign-up:', err);
      res.status(500).send('An error occurred while signing up. Please try again later.');
    }
  });
  
  // Thank-you page
  app.get('/thank-you', (req, res) => {
    res.send('<h1>Thank you for signing up!</h1>');
  });

// Admin page
app.get('/admin', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const users = await conn.query("SELECT * FROM users");
        conn.release();

        // Render the admin page and pass the users data
        res.render('admin', { users });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('An error occurred while retrieving users.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

