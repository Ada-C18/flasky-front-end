import { useEffect, useState } from 'react';
import CatList from './components/CatList';
import axios from 'axios';

import './App.css';

const catDataList = [
  {
    name: "Ubik",
    id: 1, 
    caretaker: "Maria",
    color: "grey",
    personality: "wild child",
    petCount: 3, 
  },
  {
    name: "Pepper",
    id: 2,
    caretaker: "Mark",
    color: "black",
    personality: "spicy",
    petCount: 2,
  },
  {
    name: "Binx",
    id: 3,
    caretaker: "Susan",
    color: "tuxedo",
    personality: "feral",
    petCount: 1,
  },
];

const kBaseUrl = 'http://localhost:5000';

const convertFromApi = (apiCat) => {
  // const {id, name, color, personality, pet_count, caretaker} = apiCat;
  const {pet_count, ...rest} = apiCat;

  // const newCat = {id, name, color, personality, petCount: pet_count, caretaker};
  const newCat = {petCount: pet_count, ...rest};
  return newCat;
};

const getAllCatsApi = () => {
  return axios.get(`${kBaseUrl}/cats`)
  .then(response => {
    return response.data.map(convertFromApi);
  })
  .catch(err => {
    console.log(err);
  })
};

const petCatApi = (id) => {
  return axios.patch(`${kBaseUrl}/cats/${id}/pet`)
  .then(response => {
    return convertFromApi(response.data);
  })
  .catch(error => {
    console.log(error);
  });
};

const unregisterCatApi = (id) => {
  return axios.delete(`${kBaseUrl}/cats/${id}`)
  .then(response => {
    return convertFromApi(response.data);
  })
  .catch(error => {
    console.log(error);
  });
};

function App() {
  const [catData, setCatData] = useState([]);

  const getAllCats = () => {
    return getAllCatsApi()
    .then(cats => {
      // console.log(cats);
      setCatData(cats);
    })
  };

  useEffect(() => {
    // data fetching code
    getAllCats();
  }, []);

  const petCat = (id) => {
    return petCatApi(id)
    .then(catResult => {
      setCatData(catData => catData.map(cat => {
        if(cat.id === catResult.id) {
          return catResult;
        } else {
          return cat;
        }
      }));
    })
  }

  const calcTotalPets = (catData) => {
    return catData.reduce((total, cat) => {
      return total + cat.petCount;
    }, 0)
  };

  const totalPetTally = calcTotalPets(catData);

  const unregisterCat = id => {
    return unregisterCatApi(id)
    .then(catResult => {
      // setCatData(catData => catData.filter(cat => {
      //   return cat.id !== catResult.id;
      // }));
      return getAllCats();
    });
  };

  return (
    <div className="App">
      <h2>Total Number of Pets Across All Kitties: {totalPetTally}</h2>
      <CatList 
        catData={catData}
        onPetCat={petCat}
        onUnregister={unregisterCat}
      />
    </div>
  );
}

export default App;
