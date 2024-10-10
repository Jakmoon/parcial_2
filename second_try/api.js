// api.js
export class Api {
    static baseUrl = 'http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/foods';
  
    // Fetch all foods from the API
    static async fetchFoods() {
      const response = await fetch(this.baseUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch foods.');
      }
      const data = await response.json();
      return data;
    }
  
    // Create a new food
    static async createFood(food) {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(food),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create food: ${errorData.message}`);
      }
  
      return await response.json();
    }
  
    // Update an existing food
    static async updateFood(foodId, food) {
      const response = await fetch(`${this.baseUrl}/${foodId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(food),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update food: ${errorData.message}`);
      }
  
      return await response.json();
    }
  }
  