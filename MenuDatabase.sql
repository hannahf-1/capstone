CREATE DATABASE IF NOT EXISTS MenuDatabase;
USE MenuDatabase;

CREATE TABLE IF NOT EXISTS Menu (
    ItemID INT PRIMARY KEY AUTO_INCREMENT,
    ItemName VARCHAR(255) NOT NULL,
    FoodCategory VARCHAR(50) NOT NULL,
    TimeCategory VARCHAR(50),
    ItemPrice DECIMAL(10, 2) NOT NULL

);

--query to retrieve all items in the menu
SELECT * FROM Menu;
