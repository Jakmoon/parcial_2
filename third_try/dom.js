// dom.js
export function displayFoods(foods, handleClick) {
  const foodList = document.getElementById('food-list');
  foodList.innerHTML = ''; // Clear previous list

  foods.forEach(food => {
      const foodItem = document.createElement('div');
      foodItem.classList.add('food-item');
      foodItem.innerHTML = `
          <h2>${food.name}</h2>
          <p>${food.description}</p>
          <img src="${food.image}" alt="${food.name}">
      `;
      foodItem.addEventListener('click', () => handleClick(food));
      foodList.appendChild(foodItem);
  });
}

export function populateForm(food) {
  document.getElementById('name').value = food.name;
  document.getElementById('description').value = food.description;
  document.getElementById('image').value = food.image;
  document.getElementById('food-form').dataset.id = food.id;
}
