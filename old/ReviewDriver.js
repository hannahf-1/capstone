"use strict";

const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

//MIDDLEWARE
app.use(express.json());

//MySQL config (need to find host, user, and password info)
const dbConfig = {
    host: '',
    user: '',
    password: '',
    database: 'ReviewDatabase',
};

//Review submission handle route
app.post('/submit-review', async (req, res) => {
    try{
        const{ReviewID, LastName, FirstName, CellPhone, Email, Rating, ReviewText} = req.body;

        //creates the connection to MySQL
        const connection = await mysql.createConnection(dbConfig);

        //insert the review into the database
        const [result] = await connection.execute(
            'INSERT INTO reviews ((ReviewID, LastName, FirstName, CellPhone, Email, Rating, ReviewText) VALUES (?, ?, ?, ?, ?, ?)',
            [ReviewID, LastName, FirstName, CellPhone, Email, Rating, ReviewText]
        );
        
        //to close the connection to the database
        await connection.end();

        res.status(201).json({success : true, message: 'The Review was successfully submitted!'});
    }
    catch (error){
        console.error('Error submiting review: ', error);
        res.status(500).json({success: false, error: 'Internal Server Error'});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});