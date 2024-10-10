// api.js

const API_URL = 'https://bbd7-2800-e2-2780-2479-2417-fe6c-d24e-ecb3.ngrok-free.app/foods';

export default class FoodAPI {
  // Fetch the list of foods
  static async getFoods() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch foods');
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

// dom.js

import FoodAPI from './api.js';

// Function to display foods
export function displayFoods(foods) {
  const container = document.getElementById('foodsContainer');
  container.innerHTML = '';

  foods.forEach(food => {
    const foodDiv = document.createElement('div');
    foodDiv.classList.add('food-item');
    foodDiv.innerHTML = `
      <h3>${food.name}</h3>
      <p>${food.description}</p>
      <img src="${food.image}" alt="${food.name}">
    `;

    // Add event listener for editing
    foodDiv.addEventListener('click', () => fillForm(food));
    container.appendChild(foodDiv);
  });
}

async function initApp() {
  // Fetch and display foods
  const foods = await FoodAPI.getFoods();
  displayFoods(foods);
}

// Initialize app on load
window.addEventListener('load', initApp);
