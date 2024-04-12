// src/Form.jsx
//goal: update the state of Form every time a field is changed in the form, and when we submit, 
//all that data will pass to the MyApp state (feeding the list of characters), which will then update Table. 
import React, { useState } from "react";

function Form() {
  const [person, setPerson] = useState({
    name: "",
    job: ""
  });
  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={person.name}
        onChange={handleChange}
      />
      <label htmlFor="job">Job</label>
      <input
        type="text"
        name="job"
        id="job"
        value={person.job}
        onChange={handleChange}
      />
    </form>
  );
  
}

function handleChange(event) {
    const { name, value } = event.target;
    if (name === "job")
      setPerson({ name: person["name"], job: value });
    else setPerson({ name: value, job: person["job"] });
  }


export default Form;
