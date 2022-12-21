import PropTypes from 'prop-types';
import Dog from "./Dog";
import React from 'react';

const DogList = ( props ) => {
    const dogs = props.dogData.map((dog, i) => {
      return (
        <Dog
        key={i} 
        name={dog.name}
        id={dog.id}
        age={dog.age}
        breed={dog.breed}
        gender={dog.gender}
        cuteness={dog.cuteness}
        petCount={dog.petCount}
        onPetDog={props.onPetDog}
        onUnregister={props.onUnregister}
        />
      )
    });

    return (
      <div>
          {/* <Dog/>
          <Dog/>
          <Dog/> */}
          <div>
            {dogs}
          </div>
      </div>
    );
}

DogList.propTypes = {
  dogData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    age:  PropTypes.number.isRequired,
    breed: PropTypes.string.isRequired,
    cuteness: PropTypes.number.isRequired,
    petCount: PropTypes.number.isRequired,
    gender: PropTypes.string.isRequired,
  })),
  onPetDog: PropTypes.func.isRequired,
  onUnregister: PropTypes.func.isRequired
};


export default DogList;