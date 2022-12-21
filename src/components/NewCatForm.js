import axios from "axios";
import React, { useState } from "react";

const NewCatForm = (props) => {
  const defaultState ={
    name: "Eeyore",
    personality: "Overwhelmingly Happy",
    color: "Blue",
  };
  const [formData, setFormData] = useState(defaultState);

  const onChangeHandler = (event) => {
    console.log(event);
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    const newFormData = {...formData, [fieldName]: fieldValue}
    setFormData(newFormData);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const formDataInput = {
      name: formData.name,
      personality: formData.personality,
      color: formData.color,
    };

    axios
      .post("http://127.0.0.1:5000/cats", formDataInput)
      .then((response) => {
        console.log(response);
        props.onAddCats(formDataInput);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <label htmlFor='name'>Name</label>
      <input
        name='name'
        type='text'
        onChange={onChangeHandler}
        value={formData.name}
      />
      <label htmlFor='personality'>Personality</label>
      <input
        name='personality'
        type='text'
        onChange={onChangeHandler}
        value={formData.personality}
      />
      <label htmlFor='color'>Color</label>
      <input
        name='color'
        type='text'
        onChange={onChangeHandler}
        value={formData.color}
      />
      
      <button type='submit'>Add Cat</button>
    </form>
  );
};

export default NewCatForm;
