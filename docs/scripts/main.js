
function getCurrentUser() {
    try {
        let s = localStorage.getItem('healthyLeafUser');
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
    let user = getCurrentUser();
    let nav = document.querySelector('.navbar-links');
    if (!nav) return;

    let link = document.createElement('a');
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
