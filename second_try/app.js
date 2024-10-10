let foods = []; // To track the current list of foods
let editingFood = null; // To track the current food being edited

// Function to fetch foods from the API
async function fetchFoods() {
  const response = await fetch('http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/foods');
  const data = await response.json();
  return data;
}

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

// Function to create a new food using the API
async function createFood(food) {
  const response = await fetch('http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/foods', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(food)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to create food: ${errorData.message}`);
  }

  return await response.json();
}

// Function to update an existing food using the API
async function updateFood(foodId, food) {
  const response = await fetch(`http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/foods/${foodId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(food)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to update food: ${errorData.message}`);
  }

  return await response.json();
}

// Function to handle creating a new food item
document.getElementById("createButton").addEventListener("click", async () => {
  const foodName = document.getElementById("foodName").value.trim();  // Trim any extra spaces
  const foodDescription = document.getElementById("foodDescription").value.trim();

  console.log("Creating food: ", foodName, foodDescription);

  // Validate inputs
  if (!foodName || !foodDescription) {
    alert("Please provide valid food name and description.");
    return;
  }

  // Validate the image URL pattern as specified in the YAML file
  const imagePattern = /^http:\/\/loremflickr\.com\/640\/480\/food\?\d{5}$/;
  const foodImage = "http://loremflickr.com/640/480/food?12345"; // Example valid image URL

  if (!imagePattern.test(foodImage)) {
    alert("Invalid image URL. Must follow the pattern: http://loremflickr.com/640/480/food?XXXXX");
    return;
  }

  // Create a new food item with a valid image URL and default empty ingredients
  const newFood = {
    name: foodName,         // Custom name from the form
    description: foodDescription, // Custom description from the form
    image: foodImage,       // Valid image URL as per the YAML specification
    ingredients: []         // Default empty ingredients
  };

  console.log("Sending data to API:", newFood); // Log the data being sent

  try {
    const createdFood = await createFood(newFood);
    console.log("Response from API after creating food:", createdFood); // Log the response from the API

    // Override the API-generated values with the original input
    createdFood.name = foodName;
    createdFood.description = foodDescription;

    foods.push(createdFood); // Add the newly created food to the local list
    alert("New food added successfully!");
    displayMessage("New food added successfully!", "success");
    document.getElementById("foodForm").reset();
    document.getElementById("formTitle").innerText = "Add or Edit Food";
    document.getElementById("updateButton").disabled = true; // Disable update button
    displayFoods(foods); // Update the DOM without re-fetching from the API
  } catch (error) {
    console.error(error);
    alert("Failed to create food.");
  }
});

// Function to handle updating an existing food item, including the image
document.getElementById("updateButton").addEventListener("click", async () => {
    const foodName = document.getElementById("foodName").value.trim();
    const foodDescription = document.getElementById("foodDescription").value.trim();
    const foodImageElement = document.getElementById("foodImage"); // Get the image input element

    console.log("Updating food: ", foodName, foodDescription);

    // Validate inputs
    if (!foodName || !foodDescription) {
      alert("Please provide valid food name and description.");
      return;
    }

    // Keep the current image unless the user explicitly provides a new one
    let foodImage = editingFood.image;

    // If there is an image input field and a new value is provided, use it
    if (foodImageElement && foodImageElement.value.trim()) {
      foodImage = foodImageElement.value.trim();
      const imagePattern = /^http:\/\/loremflickr\.com\/640\/480\/food\?\d{5}$/;
      if (!imagePattern.test(foodImage)) {
        alert("Invalid image URL. Must follow the pattern: http://loremflickr.com/640/480/food?XXXXX");
        return;
      }
    }

    if (editingFood) {
      const updatedFood = {
        ...editingFood,
        name: foodName,
        description: foodDescription,
        image: foodImage // Use the existing image or new one if provided
      };

      console.log("Sending updated food data to API:", updatedFood); // Debug log before sending data to the API

      try {
        const updatedResponse = await updateFood(editingFood.id, updatedFood);
        
        // Force local name and description values
        updatedResponse.name = foodName; // Override with the local name input
        updatedResponse.description = foodDescription; // Override with the local description input
        updatedResponse.image = foodImage; // Ensure image stays the same
        
        // Update the local foods array with the updated food
        foods = foods.map(food => food.id === editingFood.id ? updatedResponse : food);

        console.log("Updated foods list:", foods); // Debug log to track the updated foods list
        alert("Food updated successfully!");
        displayMessage("Food updated successfully!", "success");
        editingFood = null;
        document.getElementById("foodForm").reset();
        document.getElementById("formTitle").innerText = "Add or Edit Food";
        document.getElementById("updateButton").disabled = true;
        displayFoods(foods);
      } catch (error) {
        console.error(error);
        alert("Failed to update food.");
      }
    }
});

// Function to populate form with existing food data for editing
function editFood(food) {
  document.getElementById("foodName").value = food.name;
  document.getElementById("foodDescription").value = food.description;
  editingFood = { ...food }; // Clone the food object to avoid direct modifications

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
  } else if ( type === "info") {
    messageDiv.style.color = "blue";
  } else {
    messageDiv.style.color = "red";
  }
}

// Initialize the page by fetching and displaying foods from the API
async function init() {
  try {
    foods = await fetchFoods(); // Load foods from API into a local variable
    displayFoods(foods); // Display the foods on the page
  } catch (error) {
    console.error("Error fetching foods:", error);
  }
}

// Initialize the app
init();
