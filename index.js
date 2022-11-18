const express = require('express')
const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'booksdb'

})

//connect to the sql 
db.connect((err) => {
    if(err){
        throw err
    }
    console.log('Mysql connected')
})

// conenct the app to express 
const app = express()

// create the database 
app.get('/createdb', (req,res) => {
    let sql = 'CREATE DATABASE booksdb'
    db.query(sql, err => {
        if(err){
            throw err
        }
        res.send('Database has been created')
    })
})

// step 2 create the table 
app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE books(id int AUTO_INCREMENT, title VARCHAR(225), author VARCHAR(225), yearofpub VARCHAR(124), PRIMARY KEY(id))'
    db.query(sql, err => {
        if(err) {
            throw err
        }
        res.send('table created')
    })
})

// insert value into the table
app.get('/insertval', (req, res) => {
    let post = {title: 'The Gods must be crazy', author: 'Kemi badmus', yearofpub: '04/9/2022'}
    let sql = 'INSERT INTO books SET ?'
    let query = db.query(sql, post, (err) => {
        if(err)
        {
            throw err;
        }
        res.send('VALUE ADDED TO TABLE ')
    })
})

//update the value in the table 
app.get('/updateval', (req, res) => {
    let newTitle = 'Lets ride'
    let newAuthor = 'KELVIN IKEDUBA'
    let year_of_pub='04/04/2017'
    let sql = `UPDATE books SET title ='${newTitle}', author = '${newAuthor}', yearofpub = '${year_of_pub}' WHERE id = '${1}'`
    let query = db.query(sql, err => {
        if(err) {
            throw err
        }
        res.send('table updated')
    })
})

app.listen('4001', (req, res) =>{
    console.log('Now on port 4001')
})