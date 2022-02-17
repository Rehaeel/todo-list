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
	database: process.env.DB_DATABASE,
});

const users = mysql.createConnection({
	user: process.env.USER_DB_USER,
	host: process.env.USER_DB_HOST,
	password: process.env.USER_DB_PASSWORD,
	database: process.env.USER_DB_DATABASE,
});

/////////////////////////////// TASKS
/////////// GET
app.get('/', (_, res) => {
	mystery.query('SELECT * FROM todoList', (err, response) => {
		if (err) {
			console.log(err);
		} else {
			res.send(response);
		}
	});
});

////////// DELETE
app.delete('/:id', (req, res) => {
	const { id } = req.params;

	mystery.query(`DELETE FROM todoList WHERE id=${id}`, (err, response) => {
		if (err) {
			console.log(err);
		} else {
			res.send(response);
		}
	});
});

////////// POST

app.post('/:zadanie', (req, res) => {
	const { zadanie } = req.params;

	mystery.query(
		`INSERT INTO todoList (zadanie, priorytet, id) VALUES("${zadanie}", "", NULL)`,
		(err, response) => {
			if (err) {
				console.log(err);
			} else {
				res.send(response);
			}
		}
	);
});

/////////////////////////////// USERS

app.get('/user', (req, res) => {
	const { email, password } = req.headers;

	users.query(
		`SELECT email FROM users WHERE email='${email}' AND password='${password}'`,
		(err, response) => {
			if (err) {
				res.status(400).send(err);
			} else {
				if (response.length === 0) res.status(404).json('not Found');
				else res.status(200).send('ok');
			}
		}
	);
});

app.get('/user/:email', (req, res) => {
	const { email } = req.params;

	users.query(
		`SELECT email FROM users WHERE email='${email}'`,
		(err, response) => {
			if (err) res.status(400).send(err);
			else {
				if (response.length === 0) res.status(404).json('not Found');
				else res.status(200).send('ok');
			}
		}
	);
});

//////////////////////////////////////////////

app.listen(process.env.PORT || PORT, () => {
	console.log(`My DB run on ${PORT} port`);
});
