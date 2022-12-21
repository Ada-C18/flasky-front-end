import { useEffect, useState } from "react";
import CatList from "./components/CatList";
import NewCatForm from "./components/NewCatForm";
import axios from "axios";

import "./App.css";

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

function App() {
  const [catData, setCatData] = useState([]);

  const petCat = (id) => {
    axios
      .patch(`http://127.0.0.1:5000/cats/${id}/pet`)
      .then((response) => {
        getAllCats();
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  };

  const calcTotalPets = (catData) => {
    return catData.reduce((total, cat) => {
      return total + cat.petCount;
    }, 0);
  };

  const totalPetTally = calcTotalPets(catData);

  const unregisterCat = (id) => {
    setCatData((catData) =>
      catData.filter((cat) => {
        return cat.id !== id;
      })
    );
  };

  const getAllCats = () => {
    axios
      .get("http://127.0.0.1:5000/cats")
      .then((response) => {
        setCatData(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  };

  useEffect(() => {
    console.log("Doing UseEffect!");
    getAllCats();
  }, []);

  return (
    <div className='App'>
      <h2>Total Number of Pets Across All Kitties: {totalPetTally}</h2>
      <NewCatForm onGetAllCats={getAllCats} />
      <CatList
        catData={catData}
        onPetCat={petCat}
        onUnregister={unregisterCat}
      />
    </div>
  );
}

export default App;
