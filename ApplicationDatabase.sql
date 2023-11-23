CREATE DATABASE IF NOT EXISTS ApplicationDatabase;

USE ApplicationDatabase;

-- ApplicationPersonal table
CREATE TABLE IF NOT EXISTS application_personal (
    application_id UUID DEFAULT UUID() PRIMARY KEY,
    last_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100) NOT NULL,
    street_address VARCHAR(255) NOT NULL,
    city VARCHAR(60) NOT NULL,
    state_ VARCHAR(60) NOT NULL,
    zip VARCHAR(10) NOT NULL,
    home_phone VARCHAR(15) NOT NULL,
    cell_phone VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    social_security VARCHAR(12) NOT NULL,
    us_citizen BOOLEAN NOT NULL,
    convicted_felony BOOLEAN NOT NULL,
    drug_test BOOLEAN NOT NULL
);

-- ApplicationEmploymentHistory table
CREATE TABLE IF NOT EXISTS application_employment_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_fk_id UUID,
    position VARCHAR(100) NOT NULL,
    desired_salary INT NOT NULL,
    date_available DATETIME NOT NULL,
    employer VARCHAR(100) NOT NULL,
    dates_employed_start DATETIME NOT NULL,
    dates_employed_end DATETIME NOT NULL,
    work_phone VARCHAR(16) NOT NULL,
    pay_rate INT NOT NULL,
    street_address VARCHAR(255) NOT NULL,
    city VARCHAR(60) NOT NULL,
    state_ VARCHAR(60) NOT NULL,
    zip VARCHAR(10) NOT NULL,
    position_held VARCHAR(100) NOT NULL,
    duties_performed VARCHAR(255) NOT NULL,
    supervisor_name VARCHAR(255) NOT NULL,
    reason_for_leave VARCHAR(255) NOT NULL,
    can_contact BOOLEAN NOT NULL,
    
    FOREIGN KEY (application_fk_id) REFERENCES application_personal(application_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- ApplicationEducationHistory table
CREATE TABLE IF NOT EXISTS application_education_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_fk_id UUID,
    school_name VARCHAR(255) NOT NULL,
    years_attended INT NOT NULL,
    school_location VARCHAR(255) NOT NULL,
    city VARCHAR(60) NOT NULL,
    state_ VARCHAR(60) NOT NULL,
    degree_received VARCHAR(100) NOT NULL,
    major VARCHAR(100) NOT NULL,
    
    FOREIGN KEY (application_fk_id) REFERENCES application_personal(application_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- ApplicationReferences table
CREATE TABLE IF NOT EXISTS application_references (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_fk_id UUID,
    reference_name VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    company VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    
    FOREIGN KEY (application_fk_id) REFERENCES application_personal(application_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);


--query to retrieve all application info
SELECT * FROM ApplicationPersonal;
SELECT * FROM ApplicationEmployment;
SELECT * FROM ApplicationEducation;
SELECT * FROM ApplicationReference;
