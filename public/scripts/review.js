document.getElementById("main").innerHTML = "Send Review Script";


let base_url = "http://csdevweb.vps.webdock.cloud:3001/api/v1/public";

function sendReview(data, method = "POST", id) {
  console.log("Sending data...");
  const xhr = new XMLHttpRequest();
  xhr.open(method.toUpperCase(), base_url + "/review/submit");
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
      } else {
        // Handle errors here
        console.error("Error:", xhr.statusText);
      }
    }
  }
  if (id)
    document.getElementById(id).innerHTML = xhr.responseText;
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

const formData = {
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

  application_education_history: {
    school_name: "University of Example",
    years_attended: 4,
    school_location: "Example Location",
    city: "Education City",
    state_: "Education State",
    degree_received: "Bachelor of Science",
    major: "Computer Science",
  },

  application_employment_history: {
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

  application_reference: {
    reference_name: "Jane Reference",
    title: "Reference Title",
    company: "Reference Company",
    phone_number: "555-4321",
  },
  // ... (other data for reference schema)
}
