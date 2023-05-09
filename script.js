'use strict';
// Get DOM Elements
const btnSubmit = document.getElementById('submit-btn');
const inputID = document.getElementById('input-id');
const inputName = document.getElementById('input-name');
const inputAge = document.getElementById('input-age');
const selectType = document.getElementById('input-type');
const inputWeight = document.getElementById('input-weight');
const inputLength = document.getElementById('input-length');
const inputColor = document.getElementById('input-color-1');
const selectBreed = document.getElementById('input-breed');
const checkboxVaccinated = document.getElementById('input-vaccinated');
const checkboxDewormed = document.getElementById('input-dewormed');
const checkboxSterilized = document.getElementById('input-sterilized');

const tableBodyElement = document.getElementById('tbody');
const btnHealthy = document.getElementById('healthy-btn');
const btnCalculateBMI = document.getElementById('calculate-bmi-btn');
// Global variables
const petArr = [];
let healthyCheck = false;
/*-------------------------
   FUNCTIONS
---------------------------*/
// Get input data functions
// Output: pet data object
const getDataFromInput = function () {
  const petData = {
    id: '',
    name: '',
    age: 0,
    type: '0',
    weight: 0,
    length: 0,
    color: '#000000',
    breed: '0',
    vaccinated: false,
    dewormed: false,
    sterilized: false,
    date: new Date(),
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

    if (petData.age === 0) {
      throw 'Please enter Pet Age!';
    } else {
      if (petData.age < 1 || petData.age > 15) {
        throw 'Age must be between 1 and 15!';
      }
    }

    if (petData.type === '0') {
      throw 'Please select Pet Type!';
    }

    if (petData.weight === 0) {
      throw 'Please enter Pet Weight!';
    } else {
      if (petData.weight < 1 || petData.weight > 15) {
        throw 'Weight must be between 1 and 15!';
      }
    }

    if (petData.length === 0) {
      throw 'Please enter Pet Length!';
    } else {
      if (petData.length < 1 || petData.length > 100) {
        throw 'Length must be between 1 and 100!';
      }
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

// Clear input function
const clearInput = function () {
  inputID.value = '';
  inputName.value = '';
  inputAge.value = '';
  selectType.value = '0';
  inputWeight.value = '';
  inputLength.value = '';
  inputColor.value = '#000000';
  selectBreed.value = '0';
  checkboxVaccinated.checked = false;
  checkboxDewormed.checked = false;
  checkboxSterilized.checked = false;
};
// Render table data function
const renderTableData = function (petArr) {
  // Delete existing data
  tableBodyElement.innerHTML = '';
  // Add data to table
  for (let i = 0; i < petArr.length; i++) {
    // Create new row
    const row = document.createElement('tr');
    // Add data to new row;
    row.innerHTML = `
    <th scope="row">${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight} kg</td>
    <td>${petArr[i].length} cm</td>
    <td>${petArr[i].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
    </td>
    <td><i class="bi ${petArr[i].vaccinated ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i></td>
    <td><i class="bi ${petArr[i].dewormed ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i></td>
    <td><i class="bi ${petArr[i].sterilized ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i></td>
    <td>${petArr[i].BMI ? petArr[i].BMI : '?'}</td>
    <td>${petArr[i].date.getDate()}/${petArr[i].date.getMonth() + 1}/${petArr[i].date.getFullYear()}</td>
    <td><button type="button" class="btn btn-danger" onclick="deletePet('${petArr[i].id}')">Delete</button></td>`;

    //Add row to table
    tableBodyElement.appendChild(row);
  }
};

// Delete pet function
// Input: pet id
const deletePet = function (petId) {
  // Confirm before delete
  if (confirm('Are you sure?')) {
    const petIndex = petArr.findIndex(function (petObject) {
      return petObject.id === petId;
    });
    // Delete pet
    petArr.splice(petIndex, 1);
    // Rerender table
    renderTableData(petArr);
  }
};
// Filter healthy pet function
// Input: array of pet objects
// Output: array of healthy pet objects pass the condition
const filterHealthyPet = function (petArr) {
  return petArr.filter(function (petObject) {
    return petObject.vaccinated && petObject.dewormed && petObject.sterilized;
  });
};
// Calculate BMI function
// Input: array of pet objects
// Output: array of pet object with BMI property added
const calculateBMI = function (petArr) {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].type === 'Dog') {
      petArr[i].BMI = ((petArr[i].weight * 703) / petArr[i].length ** 2).toFixed(2);
    } else if (petArr[i].type === 'Cat') {
      petArr[i].BMI = ((petArr[i].weight * 886) / petArr[i].length ** 2).toFixed(2);
    }
  }
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
    // Clear input
    clearInput();
    // Display pet data
    renderTableData(petArr);
  }
});

// Handle healthy button click event
btnHealthy.addEventListener('click', function () {
  const healthyPetArr = filterHealthyPet(petArr);
  //render table data base on healthy check condition
  if (healthyCheck) {
    renderTableData(petArr);
    healthyCheck = false;
  } else {
    renderTableData(healthyPetArr);
    healthyCheck = true;
  }
  btnHealthy.textContent = `${healthyCheck === false ? 'Show Healthy Pet' : 'Show All Pet'}`;
});
// Handle calculate BMI button click event
btnCalculateBMI.addEventListener('click', function () {
  // Calculate BMI and rerender table
  calculateBMI(petArr);
  renderTableData(petArr);
});
