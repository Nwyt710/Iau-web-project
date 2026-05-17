
let existingUser = localStorage.getItem('healthyLeafUser');
if (existingUser) {
    let user = JSON.parse(existingUser);
    if (user.isLoggedIn) window.location.href = 'index.html';
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let errorMsg = document.getElementById('errorMsg');

    if (username === 'testUser' && password === 'pass1234') {
        localStorage.setItem('healthyLeafUser', JSON.stringify({ username: username, isLoggedIn: true }));
        window.location.href = 'index.html';
    } else {
        errorMsg.style.display = 'block';
        errorMsg.innerText = 'Invalid username or password. Use testUser / pass1234';
    }
});
