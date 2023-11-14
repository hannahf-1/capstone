CREATE DATABASE IF NOT EXISTS ApplicationDatabase;

USE ApplicationDatabase;

CREATE TABLE IF NOT EXISTS ApplicationPersonal (
    ApplicationID INT PRIMARY KEY,
    LastName VARCHAR (100) NOT NULL,
    FirstName VARCHAR (100) NOT NULL,
    MiddleName VARCHAR(100) NOT NULL,
    StreetAddress VARCHAR(255) NOT NULL,
    City VARCHAR(100) NOT NULL,
    State_ VARCHAR(100) NOT NULL,
    Zip VARCHAR (10) NOT NULL,
    HomePhone VARCHAR(15) NOT NULL,
    CellPhone VARCHAR(15) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    SocialSecurity VARCHAR(10) NOT NULL,
    UsCitizen Boolean NOT NULL,
    ConvictedFelony Boolean NOT NULL,
    DrugTest Boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS ApplicationEmployment(
    ApplicationID INT,
    Position VARCHAR(100) NOT NULL,
    DesiredSalary INT NOT NULL,
    DateAvaliable DATE NOT NULL,
    Employer VARCHAR(100) NOT NULL,
    DatesEmployed DATE NOT NULL,
    WorkPhone VARCHAR(15) NOT NULL,
    PayRate INT NOT NULL,
    StreetAddress VARCHAR(255) NOT NULL,
    City VARCHAR(100) NOT NULL,
    State_ VARCHAR(100) NOT NULL,
    Zip VARCHAR(10) NOT NULL,
    PositionHeld VARCHAR(100) NOT NULL,
    DutiesPerformed VARCHAR(255) NOT NULL,
    SupervisorName VARCHAR(255) NOT NULL,
    ReasonForLeave VARCHAR(255) NOT NULL,
    CanContact Boolean NOT NULL,
    FOREIGN KEY (ApplicationID) REFERENCES ApplicationPersonal(ApplicationID)
);

CREATE TABLE IF NOT EXISTS ApplicationEducation(
    ApplcationID INT,
    SchoolName VARCHAR(255) NOT NULL,
    YearsAttended INT NOT NULL,
    SchoolLocation VARCHAR(255) NOT NULL,
    City VARCHAR(100) NOT NULL,
    State_ VARCHAR(100) NOT NULL,
    DegreeRecieved VARCHAR(100) NOT NULL,
    Major VARCHAR(100) NOT NULL,
    FOREIGN KEY (ApplicationID) REFERENCES ApplicationPersonal(ApplicationID)
);

CREATE TABLE IF NOT EXISTS ApplicationReference(
    ApplicationID INT,
    ReferenceName VARCHAR(100) NOT NULL,
    Title VARCHAR(100) NOT NULL,
    Company VARCHAR(100) NOT NULL,
    PhoneNumber VARCHAR(15) NOT NULL,
    FOREIGN KEY (ApplicationID) REFERENCES ApplicationPersonal(ApplicationID)
);

--query to retrieve all application info
SELECT * FROM ApplicationPersonal;
SELECT * FROM ApplicationEmployment;
SELECT * FROM ApplicationEducation;
SELECT * FROM ApplicationReference;