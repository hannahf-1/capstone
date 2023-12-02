document.getElementById("main").innerHTML = "Request Script Loaded";


let api_url = "http://csdevweb.vps.webdock.cloud:3001/api/v1/public";

function sendReview(data, endpoint, callback_id, method = "POST") {
  console.log("Sending data...");
  const xhr = new XMLHttpRequest();
  xhr.open(method.toUpperCase(), api_url + endpoint);
  xhr.setRequestHeader("Content-Type", "application/json"); // Set the content type to JSON
  xhr.send(JSON.stringify(data));

  /* xhr.onload = () => {
    console.log(xhr.response);
    console.log(xhr.responseText);
    console.log(xhr.status, xhr.statusText);
  }; */

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Successful response, handle it here
        console.log("Request successful:", xhr.responseText);
        if (callback_id)
          document.getElementById(callback_id).innerHTML = xhr.responseText;
      } else {
        // Handle errors here
        console.error("Error:", xhr.statusText);
      }
    }
  }
}

// Send the POST request with the JSON data

let review_data = {
  rating: 1,
  details: "This is a test review.",
  first_name: "Test",
  last_name: "Test",
  phone: "1234567890",
  email: "test@example.com"
}

const reservation_data = {
  occasion: "Birthday Party",
  first_name: "John",
  last_name: "Doe",
  phone_number: "555-1234",
  email: "john.doe@example.com",
  method_of_contact: "Email",
  date_start: "2023-01-15T18:00:00Z",
  date_end: "2023-01-15T22:00:00Z",
  additional_information: "Additional details about the reservation.",
  services: "Catering",
  special_request: "Special requests or notes for the reservation.",
};

const jobapp_data = {
  application_primary: {
    last_name: "Doe",
    first_name: "John",
    middle_name: "M",
    street_address: "123 Main St",
    city: "Example City",
    state_: "Example State",
    zip: "12345",
    home_phone: "123-456-7890",
    cell_phone: "987-654-3210",
    email: "john.doe@example.com",
    social_security: "123-45-6789",
    us_citizen: true,
    convicted_felony: false,
    drug_test: true,
  },

  application_education_history:
    ([
      {
        school_name: "University of Example",
        years_attended: 4,
        school_location: "Example Location",
        city: "Education City",
        state_: "Education State",
        degree_received: "Bachelor of Science",
        major: "Computer Science",
      },
      {
        school_name: "University of Science",
        years_attended: 4,
        school_location: "Cityville",
        city: "Cityville",
        state_: "CA",
        degree_received: "Bachelor of Science",
        major: "Computer Science",
      },
      {
        school_name: "Business College",
        years_attended: 2,
        school_location: "Townsville",
        city: "Townsville",
        state_: "NY",
        degree_received: "Associate of Business",
        major: "Marketing",
      },
      {
        school_name: "Tech Institute",
        years_attended: 3,
        school_location: "Tech City",
        city: "Tech City",
        state_: "TX",
        degree_received: "Master of Technology",
        major: "Information Systems",
      },
      {
        school_name: "Arts Academy",
        years_attended: 4,
        school_location: "Artstown",
        city: "Artstown",
        state_: "CA",
        degree_received: "Bachelor of Arts",
        major: "Fine Arts",
      },
    
      //send just the first one [0]
    ])[0], 

  application_employment_history:
    [
      {
        position: "Software Developer",
        desired_salary: 80000,
        date_available: "2023-01-01",
        employer: "Tech Company",
        dates_employed_start: "2020-01-01",
        dates_employed_end: "2022-12-31",
        work_phone: "555-1234",
        pay_rate: 70000,
        street_address: "456 Tech St",
        city: "Tech City",
        state_: "Tech State",
        zip: "54321",
        position_held: "Junior Developer",
        duties_performed: "Software development tasks",
        supervisor_name: "Tech Supervisor",
        reason_for_leave: "Career advancement",
        can_contact: true,
      },
      {
        position: "Marketing Specialist",
        desired_salary: 60000,
        date_available: "2023-02-01",
        employer: "ABC Marketing Agency",
        dates_employed_start: "2019-05-15",
        dates_employed_end: "2022-11-30",
        work_phone: "987-654-3210",
        pay_rate: 25,
        street_address: "456 Oak Street",
        city: "Smallville",
        state_: "NY",
        zip: "54321",
        position_held: "Marketing Coordinator",
        duties_performed: "Executing marketing campaigns and analyzing market trends",
        supervisor_name: "Jane Smith",
        reason_for_leave: "Relocated to another city",
        can_contact: false,
      }
    ],

  application_reference:
    [
      {
        reference_name: "Jane Reference",
        title: "Reference Title",
        company: "Reference Company",
        phone_number: "555-4321",
      },
      {
        reference_name: "Alice Johnson",
        title: "Manager",
        company: "Tech Solutions Inc.",
        phone_number: "789-123-4567",
      },
      {
        reference_name: "Bob Davis",
        title: "Director of Marketing",
        company: "Marketing Pros LLC",
        phone_number: "321-987-6543",
      }
    ]
}
