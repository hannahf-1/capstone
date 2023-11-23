CREATE DATABASE IF NOT EXISTS EventCalendar;

USE EventCalendar;

CREATE TABLE IF NOT EXISTS Events (
    EventID INT PRIMARY KEY AUTO_INCREMENT,
    EventName VARCHAR(255) NOT NULL,
    EventDate DATE NOT NULL,
    EventDescription TEXT
);

INSERT INTO Events (EventName, EventDate, EventDescription)
VALUES
    ('Event 1', '2023-12-25', 'Event 1 Description'),
    ('Event 2', '2023-12-26', 'Event 2 Description'),
    ('Event 3', '2023-12-27', 'Event 3 Description');