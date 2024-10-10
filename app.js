// Example API URL (replace this with your actual API URL)
const apiUrl = 'http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/foods'; 

// Static food data (initial display before API call)
const foods = [
  {
    id: 7,
    name: "back engineer",
    description: "ut ullamco sed nulla",
    image: "http://loremflickr.com/640/480/food?07602",
    ingredients: ["Soft Account", "eyeballs Account neural", "Extended"],
  },
  {
    id: 9,
    name: "Account",
    description: "cillum nostrud",
    image: "http://loremflickr.com/640/480/food?43326",
    ingredients: ["array foreground Associate", "SAS", "Fort Forks", "capacitor", "Future"],
  },
  {
    id: 8,
    name: "Producer Intelligent Principal",
    description: "ad",
    image: "http://loremflickr.com/640/480/food?05875",
    ingredients: ["Won"],
  },
];

// Variable for tracking currently edited food
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

// Function to handle form submission for adding or modifying a food
document.getElementById("foodForm").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission

  const foodName = document.getElementById("foodName").value;
  const foodDescription = document.getElementById("foodDescription").value;
  const foodImage = document.getElementById("foodImage").value || "http://loremflickr.com/640/480/food"; // Default image if none provided

  // Validate inputs
  if (!foodName || !foodDescription) {
    alert("Please provide valid food name and description.");
    return;
  }

  try {
    let response;

    if (editingFood) {
      // If editing an existing food, update it (PUT request)
      const updatedFood = {
        name: foodName,
        description: foodDescription,
        image: foodImage,
      };
      response = await fetch(`${apiUrl}/${editingFood.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFood),
      });

      if (!response.ok) {
        throw new Error('Failed to update food');
      }
      alert("Food updated successfully!");

      // Update the local food list
      editingFood.name = foodName;
      editingFood.description = foodDescription;
      editingFood.image = foodImage;
    } else {
      alert("Select an existing food to edit.");
    }

    // Reset the form and display updated list
    editingFood = null;
    document.getElementById("foodForm").reset();
    displayFoods(foods);
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while processing your request.");
  }
});

// Function to populate form with existing food data for editing
function editFood(food) {
  document.getElementById("foodName").value = food.name;
  document.getElementById("foodDescription").value = food.description;
  document.getElementById("foodImage").value = food.image;
  editingFood = food;  // Track the current food being edited
}

// Initial display of foods
displayFoods(foods);
