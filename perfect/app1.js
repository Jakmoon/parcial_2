// Food data provided by your professor
const foods = [
  {
    "id": 7,
    "ingredients": ["Soft Account", "eyeballs Account neural", "Extended"],
    "image": "http://loremflickr.com/640/480/food?07602",
    "description": "ut ullamco sed nulla",
    "name": "back engineer"
  },
  {
    "name": "Account",
    "description": "cillum nostrud",
    "image": "http://loremflickr.com/640/480/food?43326",
    "id": 9,
    "ingredients": ["array foreground Associate", "SAS", "Fort Forks", "capacitor", "Future"]
  },
  {
    "id": 8,
    "name": "Producer Intelligent Principal",
    "description": "ad",
    "image": "http://loremflickr.com/640/480/food?05875",
    "ingredients": ["Won"]
  }
];

// Variables for tracking the current food being edited
let editingFood = null;

// Function to display foods on the webpage
function displayFoods(foods) {
  const container = document.getElementById("foodsContainer");
  container.innerHTML = "";

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

// Function to handle creating a new food item
document.getElementById("createButton").addEventListener("click", () => {
  const foodName = document.getElementById("foodName").value;
  const foodDescription = document.getElementById("foodDescription").value;

  // Validate inputs
  if (!foodName || !foodDescription) {
    alert("Please provide valid food name and description.");
    return;
  }

  // Create a new food item
  const newFood = {
    id: foods.length + 1, // Simulate auto-generated ID
    name: foodName,
    description: foodDescription,
    image: "http://loremflickr.com/640/480/food", // Placeholder image
  };

  foods.push(newFood); // Add the new food to the array
  alert("New food added successfully!");
  displayMessage("New food added successfully!", "success");

  // Reset the form and re-render the list
  document.getElementById("foodForm").reset();
  document.getElementById("formTitle").innerText = "Add or Edit Food";
  document.getElementById("updateButton").disabled = true; // Disable update button
  displayFoods(foods); // Refresh the list
});

// Function to handle updating an existing food item
document.getElementById("updateButton").addEventListener("click", () => {
  const foodName = document.getElementById("foodName").value;
  const foodDescription = document.getElementById("foodDescription").value;

  // Validate inputs
  if (!foodName || !foodDescription) {
    alert("Please provide valid food name and description.");
    return;
  }

  if (editingFood) {
    // Update the existing food item
    editingFood.name = foodName;
    editingFood.description = foodDescription;
    alert("Food updated successfully!");
    displayMessage("Food updated successfully!", "success");

    // Reset the form and re-render the list
    editingFood = null;
    document.getElementById("foodForm").reset();
    document.getElementById("formTitle").innerText = "Add or Edit Food";
    document.getElementById("updateButton").disabled = true; // Disable update button
    displayFoods(foods); // Refresh the list
  }
});

// Function to populate form with existing food data for editing
function editFood(food) {
  document.getElementById("foodName").value = food.name;
  document.getElementById("foodDescription").value = food.description;
  editingFood = food; // Set the current food being edited

  // Change the form title and enable the update button
  document.getElementById("formTitle").innerText = "Edit Food";
  document.getElementById("updateButton").disabled = false; // Enable the update button
  displayMessage(`Editing food: ${food.name}`, "info");
}

// Function to display messages
function displayMessage(message, type) {
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

// Initialize the page by displaying foods
displayFoods(foods);
