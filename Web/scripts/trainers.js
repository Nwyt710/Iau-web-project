console.log("Trainers page loaded");

var trainers = [
    { name: "Ahmad salem", specialty: "Keto Specialist" },
    { name: "Naif alrashed", specialty: "Vegan Nutrition" },
    { name: "Tamim Alghamdi", specialty: "Weight Loss" }
];

console.log("Total trainers: " + trainers.length);

// Simple loop to print trainers
for (var i = 0; i < trainers.length; i++) {
    console.log("Trainer " + (i + 1) + ": " + trainers[i].name + " - " + trainers[i].specialty);
}