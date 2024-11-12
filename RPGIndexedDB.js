// RPGIndexedDB.js
// IndexedDB Variables
let db;
const dbRequest = indexedDB.open('rpg-game', 1);

// Object Stores
const playerStore = 'player-stats';
const inventoryStore = 'inventory';
const questsStore = 'quests';
const gameWorldStore = 'game-world';

// Initialize Database
dbRequest.onupgradeneeded = (event) => {
    db = event.target.result;
    db.createObjectStore(playerStore, { keyPath: 'id', autoIncrement: true });
    db.createObjectStore(inventoryStore, { keyPath: 'id', autoIncrement: true });
    db.createObjectStore(questsStore, { keyPath: 'id', autoIncrement: true });
    db.createObjectStore(gameWorldStore, { keyPath: 'id', autoIncrement: true });
};

dbRequest.onsuccess = () => {
    db = dbRequest.result;
    console.log('Database initialized');
    loadGame();
};

dbRequest.onerror = (event) => {
    console.error('Error initializing database:', event.target.errorCode);
};

// Load Game Function
function loadGame() {
    // Load Player Stats
    const playerTransaction = db.transaction(playerStore, 'readonly');
    const playerObjectStore = playerTransaction.objectStore(playerStore);
    const playerRequest = playerObjectStore.get(1);

    playerRequest.onsuccess = () => {
        const playerStats = playerRequest.result;
        document.getElementById('health').textContent = playerStats.health;
        document.getElementById('gold').textContent = playerStats.gold;
        document.getElementById('experience').textContent = playerStats.experience;
        document.getElementById('level').textContent = playerStats.level;
    };

    // Load Inventory
    const inventoryTransaction = db.transaction(inventoryStore, 'readonly');
    const inventoryObjectStore = inventoryTransaction.objectStore(inventoryStore);
    const inventoryRequest = inventoryObjectStore.getAll();

    inventoryRequest.onsuccess = () => {
        const inventoryList = inventoryRequest.result;
        const inventoryElement = document.getElementById('inventory-list');

        inventoryList.forEach((item) => {
            const listItem = document.createElement('LI');
            listItem.textContent = item.name;
            inventoryElement.appendChild(listItem);
        });
    };

    // Load Quests
    const questsTransaction = db.transaction(questsStore, 'readonly');
    const questsObjectStore = questsTransaction.objectStore(questsStore);
    const questsRequest = questsObjectStore.getAll();

    questsRequest.onsuccess = () => {
        const questList = questsRequest.result;
        const questElement = document.getElementById('quest-list');

        questList.forEach((quest) => {
            const listItem = document.createElement('LI');
            listItem.textContent = quest.name;
            questElement.appendChild(listItem);
        });
    };

    // Load Game World
    const gameWorldTransaction = db.transaction(gameWorldStore, 'readonly');
    const gameWorldObjectStore = gameWorldTransaction.objectStore(gameWorldStore);
    const gameWorldRequest = gameWorldObjectStore.get(1);

    gameWorldRequest.onsuccess = () => {
        const gameWorldState = gameWorldRequest.result;
        document.getElementById('location').textContent = gameWorldState.location;
    };
}

// Save Player Stats Function
function savePlayerStats(playerStats) {
    const playerTransaction = db.transaction(playerStore, 'readwrite');
    const playerObjectStore = playerTransaction.objectStore(playerStore);
    const playerRequest = playerObjectStore.put(playerStats);

    playerRequest.onsuccess = () => {
        console.log('Player stats saved');
    };
}

// Save Inventory Item Function
function saveInventoryItem(item) {
    const inventoryTransaction = db.transaction(inventoryStore, 'readwrite');
    const inventoryObjectStore = inventoryTransaction.objectStore(inventoryStore);
    const inventoryRequest = inventoryObjectStore.add(item);

    inventoryRequest.onsuccess = () => {
        console.log('Inventory item saved');
    };
}

// Save Quest Function
function saveQuest(quest) {
    const questsTransaction = db.transaction(questsStore, 'readwrite');
    const questsObjectStore = questsTransaction.objectStore(questsStore);
    const questsRequest = questsObjectStore.add(quest);

    questsRequest.onsuccess = () => {
        console.log('Quest saved');
    };
}

// Save Game World State Function
function saveGameWorldState(gameWorldState) {
    const gameWorldTransaction = db.transaction(gameWorldStore, 'readwrite');
    const gameWorldObjectStore = gameWorldTransaction.objectStore(gameWorldStore);
    const gameWorldRequest = gameWorldObjectStore.put(gameWorldState);

    gameWorldRequest.onsuccess = () => {
        console.log('Game world state saved');
    };
}

// Button Event Listeners
document.getElementById('move-north').addEventListener('click', () => {
    const gameWorldTransaction = db.transaction(gameWorldStore, 'readwrite');
    const gameWorldObjectStore = gameWorldTransaction.objectStore(gameWorldStore);
    const gameWorldRequest = gameWorldObjectStore.get(1);

    gameWorldRequest.onsuccess = () => {
        const gameWorldState = gameWorldRequest.result;
        gameWorldState.location = 'North';
        saveGameWorldState(gameWorldState);
    };
});

document.getElementById('move-south').addEventListener('click', () => {
    const gameWorldTransaction = db.transaction(gameWorldStore, 'readwrite');
    const gameWorldObjectStore = gameWorldTransaction.objectStore(gameWorldStore);
    const gameWorldRequest = gameWorldObjectStore.get(1);

    gameWorldRequest.onsuccess = () => {
        const gameWorldState = gameWorldRequest.result;
        gameWorldState.location = 'South';
        saveGameWorldState(gameWorldState);
    };
});

document.getElementById('move-east').addEventListener('click', () => {
    const gameWorldTransaction = db.transaction(gameWorldStore, 'readwrite');
    const gameWorldObjectStore = gameWorldTransaction.objectStore(gameWorldStore);
    const gameWorldRequest = gameWorldObjectStore.get(1);

    gameWorldRequest.onsuccess = () => {
        const gameWorldState = gameWorldRequest.result;
        gameWorldState.location = 'East';
        saveGameWorldState(gameWorldState);
    };
});

document.getElementById('move-west').addEventListener('click', () => {
    const gameWorldTransaction = db.transaction(gameWorldStore, 'readwrite');
    const gameWorldObjectStore = gameWorldTransaction.objectStore(gameWorldStore);
    const gameWorldRequest = gameWorldObjectStore.get(1);

    gameWorldRequest.onsuccess = () => {
        const gameWorldState = game
        gameWorldState.location = 'West';
        saveGameWorldState(gameWorldState);
    };
}


// Example Usage
const playerStats = {
    health: 100,
    gold: 1000,
    experience: 0,
    level: 1
};

savePlayerStats(playerStats);


const inventoryItem = {
    name: 'Sword',
    description: 'A sharp sword'
};

saveInventoryItem(inventoryItem);


const quest = {
    name: 'Kill the Dragon',
    description: 'Kill the dragon to save the kingdom',
    reward: 1000
};

saveQuest(quest);


const gameWorldState = {
    location: 'Town'
};

saveGameWorldState(gameWorldState);
