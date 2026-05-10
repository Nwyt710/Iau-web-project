
console.log("Custom Meals page loaded");

// Basic array of food data
var foods = [
    { name: "Grilled Chicken", calories: 165 },
    { name: "Salmon Fillet", calories: 208 },
    { name: "Brown Rice", calories: 216 },
    { name: "Broccoli", calories: 55 },
    { name: "Avocado", calories: 234 },
    { name: "Eggs (2)", calories: 143 }
];

console.log("Available foods: " + foods.length);

// Simple loop to print foods
for (var i = 0; i < foods.length; i++) {
    console.log(foods[i].name + ": " + foods[i].calories + " kcal");
}

// Simple function to calculate total
function calculateTotal(foodArray) {
    var total = 0;
    for (var i = 0; i < foodArray.length; i++) {
        total = total + foodArray[i].calories;
    }
    return total;
}

console.log("Total calories of all items: " + calculateTotal(foods));