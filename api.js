const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.DB_PORT;

app.use(cors());
app.use(express.json());
const mystery = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

/////////// GET
app.get('/', (req, res) => {
    mystery.query('SELECT * FROM todoList', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

////////// DELETE
app.delete('/:id', (req, res) => {
    let id = req.params.id;
    mystery.query(`DELETE FROM todoList WHERE id=${id}`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

////////// POST

app.post('/:zadanie', (req, res) => {
    let zadanie = req.params.zadanie;
    mystery.query(`INSERT INTO todoList (zadanie, priorytet, id) VALUES("${zadanie}", "", NULL)`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`My DB run on ${PORT} port`);
});