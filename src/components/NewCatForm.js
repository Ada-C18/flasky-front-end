import React, { useState } from 'react';

const kDefaultFormState = {
  name: "", 
  personality: "", 
  color: ""
};

const NewCatForm = ({ handleCatSubmit }) => {

  const [formData, setFormData] = useState(kDefaultFormState);
  
  const handleChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    const newFormData = {...formData, [fieldName]: fieldValue}

    setFormData(newFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCatSubmit(formData);
    setFormData(kDefaultFormState);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Cat Name: </label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="personality">Cat Personality: </label>
        <input type="text" id="personality" name="personality" value={formData.personality} onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor="color">Cat Color: </label>
        <input type="text" id="color" name="color" value={formData.color} onChange={handleChange}/>
      </div>
      <div><input type="submit" value="Add a Cat" /></div>
    </form>
  )
}

export default NewCatForm;