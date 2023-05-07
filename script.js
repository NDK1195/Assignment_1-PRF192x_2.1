'use strict';
// Get DOM Elements
const btnSubmit = document.getElementById('submit-btn');
const inputID = document.getElementById('input-id');
const inputName = document.getElementById('input-name');
const inputAge = document.getElementById('input-age');
const selectType = document.getElementById('input-type');
const inputWeight = document.getElementById('input-weight');
const inputLength = document.getElementById('input-weight');
const inputColor = document.getElementById('input-color-1');
const selectBreed = document.getElementById('input-breed');
const checkboxVaccinated = document.getElementById('input-vaccinated');
const checkboxDewormed = document.getElementById('input-dewormed');
const checkboxSterilized = document.getElementById('input-sterilized');

const petArr = [];
/*-------------------------
   FUNCTIONS
---------------------------*/
// Get input data functions
// Output: pet data object
const getDataFromInput = function () {
  const petData = {
    id: '',
    name: '',
    age: '',
    type: '0',
    weight: '',
    length: '',
    color: '#000',
    breed: '0',
    vaccinated: false,
    dewormed: false,
    sterilized: false,
  };

  petData.id = inputID.value.trim();
  petData.name = inputName.value.trim();
  petData.age = Number(inputAge.value);
  petData.type = selectType.value;
  petData.weight = Number(inputWeight.value);
  petData.length = Number(inputLength.value);
  petData.color = inputColor.value;
  petData.breed = selectBreed.value;
  petData.vaccinated = checkboxVaccinated.checked;
  petData.dewormed = checkboxDewormed.checked;
  petData.sterilized = checkboxSterilized.checked;

  return petData;
};
// Check duplicate pet id function
// Input: pet id
// Output: check result (true or false)
const checkDuplicateID = function (petID) {
  let result = true;
  for (let index = 0; index < petArr.length; index++) {
    if (petArr[index].id === petID) {
      result = false;
      break;
    }
  }
  return result;
  // return petArr.some(petObject => petObject.id === petID);
};
// Validate pet data function
// Input: pet data object
// Output: validate result (true or false)
const validateData = function (petData) {
  let result = true;
  try {
    if (petData.id === '') {
      throw 'Please enter Pet ID!';
    } else {
      if (!checkDuplicateID(petData.id)) {
        throw 'ID must be unique!';
      }
    }
    if (petData.name === '') {
      throw 'Please enter Pet Name!';
    }
    if (petData.age === '') {
      throw 'Please enter Pet Age!';
    } else {
      if (petData.age < 1 || petData.age > 15) {
        throw 'Age must be between 1 and 15!';
      }
    }
    if (petData.weight === '') {
      throw 'Please enter Pet Weight!';
    } else {
      if (petData.weight < 1 || petData.weight > 15) {
        throw 'Weight must be between 1 and 15!';
      }
    }
    if (petData.length === '') {
      throw 'Please enter Pet Length!';
    } else {
      if (petData.length < 1 || petData.length > 100) {
        throw 'Length must be between 1 and 100!';
      }
    }
    if (petData.type === '0') {
      throw 'Please select Pet Type!';
    }

    if (petData.breed === '0') {
      throw 'Please select Pet Breed!';
    }
  } catch (error) {
    alert(error);
    result = false;
  }
  return result;
};
/*-------------------------
   HANDLE EVENTS
---------------------------*/
// Handle submit button click event
btnSubmit.addEventListener('click', function () {
  // Get data from input
  const petObject = getDataFromInput();
  // Validate data
  const validateResult = validateData(petObject);
  if (validateResult) {
    // Add pet object to pet array
    petArr.push(petObject);
    console.log(petArr);
    // Display pet data
  }
});
