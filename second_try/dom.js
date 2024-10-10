// dom.js
import { Api } from './api.js';

let foods = []; // Store fetched foods
let editingFood = null; // Track the food being edited

// Function to display foods in the DOM
export function displayFoods(foods) {
  const container = document.getElementById("foodsContainer");
  container.innerHTML = ""; // Clear the container

  foods.forEach((food) => {
    const foodDiv = document.createElement("div");
    foodDiv.classList.add("food-item");
    foodDiv.innerHTML = `
      <h3>${food.name}</h3>
      <p>${food.description}</p>
      <img src="${food.image}" alt="${food.name}">
    `;

    // Add click event to allow editing
    foodDiv.addEventListener("click", () => {
      editFood(food);
    });

    container.appendChild(foodDiv);
  });
}

// Function to populate form with food data for editing
export function editFood(food) {
  document.getElementById("foodName").value = food.name;
  document.getElementById("foodDescription").value = food.description;
  editingFood = { ...food }; // Clone the food object

  // Change the form title and enable the update button
  document.getElementById("formTitle").innerText = "Edit Food";
  document.getElementById("updateButton").disabled = false; // Enable the update button
  displayMessage(`Editing food: ${food.name}`, "info");
}

// Function to handle creating a new food item
export async function handleCreateFood() {
  const foodName = document.getElementById("foodName").value.trim();
  const foodDescription = document.getElementById("foodDescription").value.trim();

  // Validate inputs
  if (!foodName || !foodDescription) {
    alert("Please provide valid food name and description.");
    return;
  }

  // Example valid image URL (can be static or dynamically generated)
  const foodImage = "http://loremflickr.com/640/480/food?12345";

  const newFood = {
    name: foodName,
    description: foodDescription,
    image: foodImage,
    ingredients: [],
  };

  try {
    const createdFood = await Api.createFood(newFood);
    createdFood.name = foodName;
    createdFood.description = foodDescription;
    foods.push(createdFood);
    alert("New food added successfully!");
    displayMessage("New food added successfully!", "success");
    document.getElementById("foodForm").reset();
    document.getElementById("formTitle").innerText = "Add or Edit Food";
    document.getElementById("updateButton").disabled = true; // Disable update button
    displayFoods(foods); // Re-render the updated list
  } catch (error) {
    console.error(error);
    alert("Failed to create food.");
  }
}

// Function to handle updating an existing food item
export async function handleUpdateFood() {
  const foodName = document.getElementById("foodName").value.trim();
  const foodDescription = document.getElementById("foodDescription").value.trim();

  if (!foodName || !foodDescription) {
    alert("Please provide valid food name and description.");
    return;
  }

  const foodImage = editingFood.image; // Keep the existing image unless explicitly changed

  const updatedFood = {
    ...editingFood,
    name: foodName,
    description: foodDescription,
    image: foodImage,
  };

  try {
    const updatedResponse = await Api.updateFood(editingFood.id, updatedFood);
    updatedResponse.name = foodName;
    updatedResponse.description = foodDescription;
    updatedResponse.image = foodImage;
    
    foods = foods.map(food => food.id === editingFood.id ? updatedResponse : food);
    alert("Food updated successfully!");
    displayMessage("Food updated successfully!", "success");
    editingFood = null;
    document.getElementById("foodForm").reset();
    document.getElementById("formTitle").innerText = "Add or Edit Food";
    document.getElementById("updateButton").disabled = true; // Disable update button
    displayFoods(foods); // Re-render the updated list
  } catch (error) {
    console.error(error);
    alert("Failed to update food.");
  }
}

// Function to display messages
export function displayMessage(message, type) {
  const messageDiv = document.getElementById("message");
  messageDiv.innerText = message;

  if (type === "success") {
    messageDiv.style.color = "green";
  } else if (type === "info") {
    messageDiv.style.color = "blue";
  } else {
    messageDiv.style.color = "red";
  }
}

// Initialize the page by fetching and displaying foods
export async function init() {
  try {
    foods = await Api.fetchFoods();
    displayFoods(foods); // Render foods into the DOM
  } catch (error) {
    console.error("Error fetching foods:", error);
  }
}
