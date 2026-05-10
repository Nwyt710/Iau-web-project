
console.log("Login page loaded");

var correctUser = "testUser";
var correctPass = "pass1234";

console.log("Expected username: " + correctUser);
console.log("Expected password: " + correctPass);

// Basic function to check login
function checkLogin(username, password) {
    if (username === correctUser && password === correctPass) {
        return true;
    } else {
        return false;
    }
}

// Test the function
console.log("Test correct login: " + checkLogin("testUser", "pass1234"));
console.log("Test wrong login: " + checkLogin("wrong", "wrong"));