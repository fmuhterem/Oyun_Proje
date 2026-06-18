/**
 * NEON VOID SURVIVOR - SIMPLIFIED CONTROLS VERSION
 * This version uses a basic key tracking system for WASD
 */

// GLOBAL KEYS OBJECT - Simple and direct
const keys = {};

// Add at the very start of the script, before setupInput
document.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    console.log('KEY DOWN:', e.key);
});

document.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

console.log('KEYBOARD LISTENERS REGISTERED - Press WASD to test');
