
document.addEventListener('DOMContentLoaded', function() {
    let currentUser = getCurrentUser();
    let cartKey = currentUser ? 'cart_' + currentUser.username : 'cart_guest';

    let availableFoods = [
        { id: 1, name: 'Grilled Chicken', cal: 165, protein: 31, carbs: 0, fat: 4, fiber: 0, emoji: '🍗' },
        { id: 2, name: 'Salmon Fillet', cal: 208, protein: 20, carbs: 0, fat: 13, fiber: 0, emoji: '🐟' },
        { id: 3, name: 'Brown Rice', cal: 216, protein: 5, carbs: 45, fat: 2, fiber: 4, emoji: '🍚' },
        { id: 4, name: 'Broccoli', cal: 55, protein: 4, carbs: 11, fat: 1, fiber: 5, emoji: '🥦' },
        { id: 5, name: 'Avocado', cal: 234, protein: 3, carbs: 12, fat: 21, fiber: 10, emoji: '🥑' },
        { id: 6, name: 'Eggs (2)', cal: 143, protein: 13, carbs: 1, fat: 10, fiber: 0, emoji: '🥚' }
    ];

    let selectedFoods = [];
    try {
        let saved = localStorage.getItem(cartKey);
        if (saved) selectedFoods = JSON.parse(saved);
    } catch (e) {
        selectedFoods = [];
    }

    function findFood(id, list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) return i;
        }
        return -1;
    }

    function renderFoodList() {
        let grid = document.getElementById('foodGrid');
        if (!grid) return;
        grid.innerHTML = '';

        for (let i = 0; i < availableFoods.length; i++) {
            let food = availableFoods[i];
            let inCart = findFood(food.id, selectedFoods) > -1;
            let div = document.createElement('div');
            div.className = 'food-item' + (inCart ? ' in-meal' : '');
            div.innerHTML =
                '<div class="food-emoji">' + food.emoji + '</div>' +
                '<div class="food-info">' +
                    '<div class="food-name">' + food.name + '</div>' +
                    '<div class="food-cal">' + food.cal + ' kcal</div>' +
                '</div>' +
                '<button class="btn ' + (inCart ? 'btn-outline' : 'btn-primary') + '" onclick="toggleFood(' + food.id + ')">' +
                    (inCart ? 'Remove' : 'Add') +
                '</button>';
            grid.appendChild(div);
        }
    }

    function calculateTotals() {
        let t = { cal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };
        for (let i = 0; i < selectedFoods.length; i++) {
            let f = selectedFoods[i];
            t.cal += f.cal; t.protein += f.protein; t.carbs += f.carbs; t.fat += f.fat; t.fiber += f.fiber;
        }
        document.getElementById('totalCal').innerText = t.cal;
        document.getElementById('totalProtein').innerText = t.protein + 'g';
        document.getElementById('totalCarbs').innerText = t.carbs + 'g';
        document.getElementById('totalFat').innerText = t.fat + 'g';
        document.getElementById('totalFiber').innerText = t.fiber + 'g';
    }

    function renderSummary() {
        let list = document.getElementById('selectedList');
        if (!list) return;
        list.innerHTML = '';

        if (selectedFoods.length === 0) {
            list.innerHTML = '<p class="text-muted">No items selected.</p>';
        } else {
            for (let i = 0; i < selectedFoods.length; i++) {
                let food = selectedFoods[i];
                let div = document.createElement('div');
                div.className = 'food-item';
                div.innerHTML =
                    '<div class="food-info"><div class="food-name">' + food.name + '</div></div>' +
                    '<button class="remove-btn" onclick="toggleFood(' + food.id + ')">X</button>';
                list.appendChild(div);
            }
        }
        calculateTotals();
    }

    window.toggleFood = function(foodId) {
        let idx = findFood(foodId, selectedFoods);
        if (idx > -1) {
            selectedFoods.splice(idx, 1);
        } else {
            let ai = findFood(foodId, availableFoods);
            if (ai > -1) selectedFoods.push(availableFoods[ai]);
        }
        localStorage.setItem(cartKey, JSON.stringify(selectedFoods));
        renderFoodList();
        renderSummary();
    };

    window.placeOrder = function() {
        if (selectedFoods.length === 0) {
            alert('Please add items to your meal first!');
            return;
        }
        let user = getCurrentUser();
        if (!user || !user.isLoggedIn) {
            alert('You must be logged in to place an order. Redirecting to login...');
            window.location.href = 'login.html';
            return;
        }

        let totalCal = 0, itemNames = [];
        for (var i = 0; i < selectedFoods.length; i++) {
            totalCal += selectedFoods[i].cal;
            itemNames.push(selectedFoods[i].name);
        }

        let order = { username: user.username, items: itemNames, totalCalories: totalCal, date: new Date().toLocaleString() };
        let orderKey = 'orders_' + user.username;
        let orderHistory = [];
        try {
            let saved = localStorage.getItem(orderKey);
            if (saved) orderHistory = JSON.parse(saved);
        } catch (e) { orderHistory = []; }

        orderHistory.push(order);
        localStorage.setItem(orderKey, JSON.stringify(orderHistory));
        selectedFoods = [];
        localStorage.setItem(cartKey, JSON.stringify(selectedFoods));
        alert('Order placed successfully! Total: ' + totalCal + ' kcal');
        console.log('order placed');
        renderFoodList();
        renderSummary();
    };

    renderFoodList();
    renderSummary();
});
