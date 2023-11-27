"use strict";

const express = require('express');
const mysql = require('mysql2/promise');
const app =express();
const port = 3000;

const dbConfig = {
    host: '',
    user: '',
    password: '',
    database: 'MenuDatabase',
};

app.get('/get-menu', async(req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);

        const [menuRows, menuFields] = await connection.execute('SELECT * FROM Meun');
        //close connection
        await connection.end();

        res.status(200).json({success: true, menu: menuRows });
    }
    catch (error){
        console.error('Error retrieving menu information: ', error);
        res.status(500).json({success: false, error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});