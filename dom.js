// dom.js continued

import FoodAPI from './api.js';

// Form validation and submission
export function handleFormSubmit() {
  const form = document.getElementById('foodForm');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('foodName').value;
    const description = document.getElementById('foodDescription').value;
    const food = { name, description };
    
    // Validate form fields
    if (!name || !description) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Call API to create food
      await FoodAPI.createFood(food);
      alert('Food item created successfully');

      // Reload the foods list
      const foods = await FoodAPI.getFoods();
      displayFoods(foods);
      
      form.reset();  // Clear form
    } catch (error) {
      console.error(error);
      alert('Failed to create food item');
    }
  });
}

// Create food API call (in api.js)
export default class FoodAPI {
  static async createFood(food) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(food),
      });
      if (!response.ok) throw new Error('Failed to create food');
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }
}

// dom.js continued

// Function to fill form with existing food data
function fillForm(food) {
  document.getElementById('foodName').value = food.name;
  document.getElementById('foodDescription').value = food.description;
  document.getElementById('foodForm').dataset.id = food.id;  // Store food ID in form
}

// Form submit handler for update
export function handleFormSubmit() {
  const form = document.getElementById('foodForm');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const id = form.dataset.id;
    const name = document.getElementById('foodName').value;
    const description = document.getElementById('foodDescription').value;
    const food = { name, description };
    
    if (!name || !description) {
      alert('Please fill in all fields');
      return;
    }

    try {
      if (id) {
        // Update existing food item
        await FoodAPI.updateFood(food, id);
        alert('Food item updated successfully');
      } else {
        // Create new food item
        await FoodAPI.createFood(food);
        alert('Food item created successfully');
      }

      // Reload the foods list
      const foods = await FoodAPI.getFoods();
      displayFoods(foods);
      
      form.reset();
    } catch (error) {
      console.error(error);
      alert('Operation failed');
    }
  });
}

// Update food API call (in api.js)
export default class FoodAPI {
  static async updateFood(food, id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(food),
      });
      if (!response.ok) throw new Error('Failed to update food');
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }
}
