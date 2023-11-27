"use strict";

const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

//connection config (need to find host user and password)
const dbConfig = {
    host: '',
    user: '',
    password: '',
    database: 'ApplicationDatabase.sql',
};

//get the information from the tables to combine
app.get('/get-information', async (req, res) => {
    try {
        //create MySQL connection
        const connection = await mysql.createConnection(dbConfig);

        //query the database
        const [PersonalRows, PersonalFields] = await connection.execute('SELECT * FROM ApplicationPersonal');
        const [EmploymentRows, EmploymentFields] = await connection.execute('SELECT * FROM ApplicationEmployment');
        const [EducationRows, EducationFields] = await connection.execute('SELECT * FROM ApplicationEducation');
        const [ReferenceRows, ReferenceFields] = await connection.execute('SELECT * FROM ApplicationReference');
        //close connection
        await connection.end();

        //combine the results
        const combinedData = {
            ApplicationPersonal: PersonalRows,
            ApplicationEmployment: EmploymentRows,
            ApplicationEducation: EducationRows,
            ApplicationReference: ReferenceRows,
        };

        //send combined info as JSON response
        res.status(200).json({success: true, data: combinedData });
    }
    catch (error) {
        console.error('Error retrieving information: ', error);
        res.status(500).json({success: false, error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});