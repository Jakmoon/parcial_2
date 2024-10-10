// api.js
export async function fetchFoods() {
  const response = await fetch('http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/foods');
  if (!response.ok) {
      throw new Error('Failed to fetch food data');
  }
  return await response.json();
}

export async function createFood(food) {
  const response = await fetch('http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/foods', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(food)
  });
  if (!response.ok) {
      throw new Error('Failed to create food');
  }
  return await response.json();
}

export async function updateFood(foodId, food) {
  const response = await fetch(`http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/foods/${foodId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(food)
  });
  if (!response.ok) {
      throw new Error('Failed to update food');
  }
  return await response.json();
}
