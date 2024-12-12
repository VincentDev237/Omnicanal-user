const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'auth_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL database');
});

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

app.get('/all', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving users');
            throw err;
        }
        res.json(results);
    });
});


app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    // Vérifiez si l'utilisateur existe déjà
    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkUserQuery, [email], (err, results) => {
        if (err) {
            res.status(500).send('Error checking user existence');
            throw err;
        }

        if (results.length > 0) {
            res.status(400).send({ message: 'User already exists' });
        } else {
            // Insérez l'utilisateur si l'email n'existe pas
            const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
            db.query(query, [username, email, password], (err, result) => {
                if (err) {
                    res.status(500).send('Error inserting user');
                    throw err;
                }
                res.send({ message: 'User registered successfully' });
            });
        }
    });
});


app.get('/admin', (req, res) => {
    const query = 'SELECT * FROM admin'; // Assurez-vous que la table "admin" existe dans votre DB
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving admin content');
            throw err;
        }
        res.json(results);
    });
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
