CREATE DATABASE IF NOT EXISTS BookingReservation;
USE BookingReservation;

CREATE TABLE IF NOT EXISTS Reservations (
    ResrvationID INT PRIMARY KEY AUTO_INCREMENT
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    PhoneNumber VARCHAR(15) NOT NULL,
    Email VARCHAR(100),
    MethodOfContact VARCHAR(100) NOT NULL,
    ConfirmEmail VARCHAR(100) NOT NULL,
    EventDate DATE NOT NULL,
    EventTime TIME NOT NULL,
    Occasion VARCHAR(255) NOT NULL,
    Other TEXT,
    Services VARCHAR(100) NOT NULL,
    SpecialRequest TEXT
);

--for faster lookup by number or email
CREATE INDEX idx_phone ON Reservations (PhoneNumber);
CREATE INDEX idx_email ON Reservations (Email);
