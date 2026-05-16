
function getCurrentUser() {
    try {
        var s = localStorage.getItem('healthyLeafUser');
        if (s) return JSON.parse(s);
    } catch (e) {
        localStorage.removeItem('healthyLeafUser');
    }
    return null;
}

function logout() {
    localStorage.removeItem('healthyLeafUser');
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', function() {
    var user = getCurrentUser();
    var nav = document.querySelector('.navbar-links');
    if (!nav) return;

    var link = document.createElement('a');
    link.className = 'nav-link logout-btn';

    if (user && user.isLoggedIn) {
        link.href = '#';
        link.innerText = 'Logout (' + user.username + ')';
        link.onclick = logout;
    } else {
        link.href = 'login.html';
        link.innerText = 'Login';
    }
    nav.appendChild(link);
});