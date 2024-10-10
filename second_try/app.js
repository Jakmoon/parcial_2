// app.js
import { init, handleCreateFood, handleUpdateFood } from './dom.js';

// Initialize the app on page load
window.addEventListener('DOMContentLoaded', init);

// Handle form actions
document.getElementById("createButton").addEventListener("click", handleCreateFood);
document.getElementById("updateButton").addEventListener("click", handleUpdateFood);
