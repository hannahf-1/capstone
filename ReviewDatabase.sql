CREATE DATABASE IF NOT EXISTS ReviewDatabase;

USE ReviewDatabase;

CREATE TABLE IF NOT EXISTS Reviews (
    ReviewID INT PRIMARY KEY AUTO_INCREMENT,
    LastName VARCHAR(100) NOT NULL,
    FirstName VARCHAR(100) NOT NULL,
    CellPhone VARCHAR(15) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    ReviewText TEXT
);

--query to retrieve all reviews
SELECT * FROM Reviews;