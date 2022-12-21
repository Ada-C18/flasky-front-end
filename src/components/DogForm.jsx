import React, { useState } from "react";
import PropTypes from 'prop-types';

const DogForm = ( {addDogCallback} ) => {

    // const [dogName, setDogName] = useState("");
    // const [dogAge, setDogAge] = useState("");

    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        cuteness: 0,
        age: 0,
        petCount: 0,
        gender: ''
    })

    // const handleChange = event => {
    //     // console.log("event object", event);
    //     // console.log('Details about the element that fired the event:', event.target);
    //     console.log('The value of that element:', event.target.value);
    //     setDogName(event.target.value);
    // };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitDogData = e => {
        e.preventDefault();

        addDogCallback(formData)

        setFormData({
            name: '',
            breed: '',
            cuteness: 0,
            age: 0,
            petCount: 0,
            gender: ''
        });
    };

    return (
        <div>
            <h2>Add A Dog</h2>
            <form onSubmit={submitDogData}>
                <section>
                    <div>
                        <label htmlFor="name">Dog Name</label>
                        <input 
                            type="text" 
                            onChange={handleChange}
                            name="name"
                            placeholder="Dog Name"
                            value={formData.name}
                        />
                    </div>

                    <div>
                        <label htmlFor="breed">Dog Breed:</label>
                        <input 
                            name="breed"
                            type="text" 
                            onChange={handleChange}
                            placeholder="Dog Breed"
                            value={formData.breed} 
                        />
                    </div>

                    <div>
                        <label htmlFor="age">Dog Age:</label>
                        <input 
                            name="age"
                            type="number" 
                            onChange={handleChange}
                            placeholder="Dog Age"
                            value={formData.age} 
                        />
                    </div>

                    <div>
                        <label htmlFor="cuteness">Dog Cuteness:</label>
                        <input 
                            name="cuteness"
                            type="number" 
                            onChange={handleChange}
                            placeholder="Dog Cuteness"
                            value={formData.cuteness} 
                        />
                    </div>

                    <div>
                        <label htmlFor="gender">Dog Gender:</label>
                        <input 
                            name="gender"
                            type="text" 
                            onChange={handleChange}
                            placeholder="Dog Gender"
                            value={formData.gender} 
                        />
                    </div>

                    <div>
                        <label htmlFor="petCount">Pet Count:</label>
                        <input 
                            name="petCount"
                            type="number" 
                            onChange={handleChange}
                            placeholder="Pet Count"
                            value={formData.petCount} 
                        />
                    </div>

                    <div>
                        <button type="submit" value="Add Dog">Add Dog</button>
                    </div>

                </section>
            </form>
        </div>
    );
}

DogForm.propTypes = {
    addDogCallback: PropTypes.func.isRequired,
};

export default DogForm;