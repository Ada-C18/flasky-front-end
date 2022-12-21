import "./App.css";
import { useState, useEffect } from "react";
import DogList from "./components/DogList";
// import dogDataJson from "./data/dogData.json";
import axios from 'axios';
import DogForm from "./components/DogForm";

const BaseUrl = 'http://localhost:5000';

// helper function focusing on API request
const getAllDogsApi = () => {
  return axios.get(`${BaseUrl}/dogs`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
}

// helper function focusing on patch request
const petDogApi = (id) => {
  return axios.patch(`${BaseUrl}/dogs/${id}/pet`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
}

function App() {
  const [dogData, setDogData] = useState([]);
  const name = "Panthers";

  // add helper in component and effect
  const getAllDogs = () => {
    return getAllDogsApi()
      .then(dogs => setDogData(dogs));
  }


  useEffect(() => {
    getAllDogs();
  }, [])


  // Event Handler that describes how to increment petCount
  const petDog = (id) => {
    console.log(`Petting Doge ${id}`)
    return petDogApi(id)
      .then(dogResult => {
        setDogData(dogData => dogData.map(dog => {
          if (dog.id === id) {
            return dogResult;
          } else {
            return dog;
          }
        }));
      })
  }

  const unregisterDog = id => {
    setDogData(dogData => dogData.filter(dog => {
      return dog.id !== id;
    }));
  }

  // reduce tangent
  const calcTotalPets = dogData => {
    return dogData.reduce((total, dog) => {
      return total + dog.petCount;
    }, 0);
  };

  const addDogCallback = (newDogData) => {
    axios
      .post('http://localhost:5000/dogs', newDogData)
      .then(response => {
        // console.log(response.data)
        const newDogs = [...dogData];

        newDogs.push({
          id: response.data.id,
          name: response.data.name,
          age: response.data.age,
          breed: response.data.breed,
          cuteness: response.data.cuteness,
          petCount: response.data.petCount,
          gender: response.data.gender,
          ...dogData
        });

        setDogData(newDogs);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const totalPetTally = calcTotalPets(dogData);

  return (
    <div className="App">
      Hello! It's Wednesday in {name} Roundtable!
      <h2>Total Number of Pets Across all Doggos: {totalPetTally} </h2>
      <DogForm addDogCallback={addDogCallback} />
      <DogList 
        dogData={dogData}
        onPetDog={petDog}
        onUnregister={unregisterDog}
      />
    </div>
  );
}

export default App;
