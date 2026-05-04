document.addEventListener("DOMContentLoaded", () => {
    // Navigation Buttons (Simulating context.pushNamed)
    const navLinks = {
        'nav-home': 'HomePage',
        'nav-trainers': 'TrainersPage',
        'nav-meals': 'CustomMealsPage',
        'nav-about': 'AboutUsPage'
    };

    // Attach listeners to standard nav buttons
    for (const [id, routeName] of Object.entries(navLinks)) {
        document.getElementById(id).addEventListener('click', () => {
            console.log(`Navigating to: ${routeName}`);
        });
    }

    // App Bar Settings Button
    document.getElementById('btn-settings').addEventListener('click', () => {
        console.log('Settings button pressed ...');
    });

    // Primary CTA Buttons
    document.getElementById('btn-find-trainer').addEventListener('click', () => {
        console.log('Find a Trainer Button pressed ...');
    });

    document.getElementById('btn-build-meal').addEventListener('click', () => {
        console.log('Build a Meal Button pressed ...');
    });
});