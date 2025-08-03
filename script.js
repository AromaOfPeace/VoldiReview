// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

let pageLoaded = false;
let minTimeReached = false;
let soundEnabled = false;
const video = document.getElementById('loading-video');

// Create skip button for loading screen
const skipButton = document.createElement('button');
skipButton.id = 'skip-loading';
skipButton.innerHTML = 'Skip <i class="fas fa-forward"></i>';
skipButton.addEventListener('click', () => {
    hideLoadingScreen();
});
document.body.appendChild(skipButton);

// Enable sound after user interaction (required by browser policies)
function enableSound() {
    if (!soundEnabled && video) {
        soundEnabled = true;
        video.muted = false;
        video.play().catch(err => {
            console.log("Play with sound failed:", err);
        });
        document.removeEventListener('click', enableSound);
    }
}

// ====== [1] Prevent Loading Screen on Back Navigation ======
document.addEventListener('DOMContentLoaded', function() {
    // Check if returning from boosting.html
    if (sessionStorage.getItem('returningFromBoosting')) {
        // Hide loading screen immediately
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) loadingScreen.style.display = 'none';
        
        // Hide skip button immediately
        if (skipButton) skipButton.style.display = 'none';
        
        // Ensure video is paused and muted
        if (video) {
            video.pause();
            video.muted = true;
        }
        
        // Clear the flag
        sessionStorage.removeItem('returningFromBoosting');
        
        // Mark as loaded to prevent normal loading sequence
        pageLoaded = true;
        minTimeReached = true;
        document.body.classList.add('loaded');
        
        return; // Exit early to prevent normal loading sequence
    }
    
    // Normal loading sequence only if not returning from boosting
    // Wait for user interaction for sound
    document.addEventListener('click', enableSound);
    
    // Try to play video initially (fallback to muted)
    if (video) {
        video.play().catch(() => {
            video.muted = true;
            video.play();
        });
    }
});

// Set minimum loading time to 7.55 seconds (only if not returning from boosting)
setTimeout(() => {
    if (!sessionStorage.getItem('returningFromBoosting')) {
        minTimeReached = true;
        if (pageLoaded) {
            hideLoadingScreen();
        }
    }
}, 7550);

window.addEventListener('load', () => {
    if (!sessionStorage.getItem('returningFromBoosting')) {
        pageLoaded = true;
        if (minTimeReached) {
            hideLoadingScreen();
        }
    }
});

function hideLoadingScreen() {
    document.body.classList.add('loaded');
    
    // Stop and mute the video immediately
    if (video) {
        video.pause();
        video.muted = true;
        video.currentTime = 0; // Reset video to beginning
    }
    
    // Remove sound event listener to prevent future triggering
    document.removeEventListener('click', enableSound);
    
    // Hide loading screen and skip button
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) loadingScreen.style.display = 'none';
    if (skipButton) skipButton.style.display = 'none';
}

// ====== [2] Set Flag When Navigating to Boosting.html ======
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href="boosting.html"]').forEach(link => {
        link.addEventListener('click', function() {
            sessionStorage.setItem('returningFromBoosting', 'true');
        });
    });
});

// Card IDs that should have the NEW badge
const newBadgeCardIds = [1, 2, 3, 4, 5]; // Add/remove IDs as needed

// Sample data for cards (specific versions, not just champions)
const allCards = [
    { id: 1, name: "Uryu", image: "Uryu.png", tags: ["new", "top-tier"]},  
    { id: 2, name: "Renji", image: "Renji.png", tags: ["new", "top-tier"]},
    { id: 3, name: "Jushiro", image: "Jushiro.png", tags: ["new", "top-tier"]},
    { id: 4, name: "Rukia", image: "Rukia.png", tags: ["new", "top-tier"]},
    { id: 5, name: "Ichigo", image: "Ichigo,.png", tags: ["new", "top-tier"]},
    { id: 6, name: "Masaki", image: "Masaki.png", tags: ["new"] },
    { id: 7, name: "Liltotto", image: "Liltotto.png", tags: ["new"] },
    { id: 8, name: "Yoruichi", image: "Yoruichi.png", tags: ["new"] },
    { id: 9, name: "Byakuya", image: "Byakuya.png", tags: ["new", "top-tier"]},
    { id: 10, name: "Aizen", image: "Aizen.png", tags: ["new", "top-tier"]},
    { id: 11, name: "Rangiku", image: "Rangiku.png", tags: ["new"] },
    { id: 12, name: "Mayuri", image: "Mayuri.png", tags: ["new"] },
    { id: 13, name: "Toshiro", image: "Toshiro.png", tags: ["new"] },
    { id: 14, name: "Ururu", image: "Ururu.png", tags: ["new"] },
    { id: 15, name: "Kon", image: "Kon.png", tags: ["new"] },
    { id: 16, name: "Askin", image: "Askin.png", tags: ["new"] },
    { id: 17, name: "Äs Nödt", image: "As.png", tags: ["new"] },
    { id: 18, name: "Ulquiorra", image: "Ulquiorra.png", tags: ["new", "top-tier"]},
    { id: 19, name: "Ichigo Kurosaki", image: "Ichigo.png", tags: ["new", "top-tier"]},
    { id: 20, name: "Emilou", image: "Emilou.png", tags: ["new"] },
    { id: 21, name: "Franceska", image: "Franceska.png", tags: ["new"] },
    { id: 22, name: "Cyan", image: "Cyan.png", tags: ["new"] },
    { id: 23, name: "Askin", image: "AskinBlood War.png", tags: ["top-tier"] },
    { id: 24, name: "Senjumaru", image: "Senjumaru.png", tags: ["top-tier"] },
    { id: 25, name: "Ichigo", image: "Ichigo2025.png", tags: ["top-tier"] },
    { id: 26, name: "Kenpachi", image: "Kenpachi.png", tags: ["top-tier"] },
    { id: 27, name: "Gremmy", image: "Gremmy.png", tags: ["top-tier"] },
    { id: 28, name: "Yhwach", image: "Yhwach 2024.png", tags: ["top-tier"] },
    { id: 29, name: "Orihime", image: "Orihime.png", tags: ["top-tier"] },
    { id: 30, name: "Ichigo", image: "Ichigo 2024.png", tags: ["top-tier"] },
];

// Sample data for accounts
const accounts = [
    { 
        id: 1, 
        code: "BBS-001", 
        category: "fresh", 
        orbs: 5000, 
        links: ["https://i.imgur.com/abc123.jpg", "https://i.imgur.com/def456.jpg"],
        cards: [1, 3, 10],
        tags: ["new"]
    },
    { 
        id: 2, 
        code: "BBS-002", 
        category: "farmed", 
        orbs: 2500, 
        links: ["https://i.imgur.com/ghi789.jpg"],
        cards: [2, 5, 8],
        tags: ["top-tier"]
    },
    { 
        id: 3, 
        code: "BBS-003", 
        category: "endgame", 
        orbs: 1000, 
        links: ["https://i.imgur.com/jkl012.jpg", "https://i.imgur.com/mno345.jpg"],
        cards: [1, 2, 5, 6, 8],
        tags: ["new", "top-tier"]
    },
    { 
        id: 4, 
        code: "BBS-004", 
        category: "fresh", 
        orbs: 4500, 
        links: ["https://i.imgur.com/pqr678.jpg"],
        cards: [1, 7],
        tags: ["new"]
    },
    { 
        id: 5, 
        code: "BBS-005", 
        category: "farmed", 
        orbs: 3500, 
        links: ["https://i.imgur.com/stu901.jpg", "https://i.imgur.com/vwx234.jpg"],
        cards: [2, 6, 9],
        tags: ["top-tier"]
    },
    { 
        id: 6, 
        code: "BBS-006", 
        category: "endgame", 
        orbs: 800, 
        links: ["https://i.imgur.com/yzA567.jpg"],
        cards: [4, 5, 8],
        tags: ["new", "top-tier"]
    }
];

// DOM Elements
let categoryTabs = document.querySelectorAll('.category-tab');
const subFiltersContainer = document.getElementById('sub-filters-container');
const subFilters = document.querySelectorAll('.sub-filter');
const cardFilters = document.getElementById('card-filters');
const sortButtons = document.querySelectorAll('.sort-btn');
const accountList = document.getElementById('account-list');
const selectedCardsCount = document.getElementById('selected-cards-count');
const clearCardsBtn = document.getElementById('clear-cards');

// State
let selectedCategory = null;
let selectedTags = [];
let selectedCards = [];
let currentSort = 'orbs-desc';

// Initialize the page
function init() {
    // Re-select elements in case they weren't available when the script first loaded
    categoryTabs = document.querySelectorAll('.category-tab');
    
    setupEventListeners();
    createParticles();
    renderAccounts(); // Initial render
}

// Render card sections based on selected tags
function renderCardSections() {
    cardFilters.innerHTML = '';
    
    if (selectedTags.includes('new')) {
        const newSection = createCardSection('New Arrivals', 'new');
        cardFilters.appendChild(newSection);
    }
    
    if (selectedTags.includes('top-tier')) {
        const topTierSection = createCardSection('Top Tier', 'top-tier');
        cardFilters.appendChild(topTierSection);
    }
    
    if (selectedTags.length > 0) {
        cardFilters.classList.add('active');
    } else {
        cardFilters.classList.remove('active');
    }
}

// Create a card section for a specific tag - UPDATED to show NEW badge only for specific IDs
function createCardSection(title, tag) {
    const section = document.createElement('div');
    section.className = 'card-section';
    
    const titleElement = document.createElement('h3');
    titleElement.className = 'card-section-title';
    titleElement.textContent = title;
    
    const grid = document.createElement('div');
    grid.className = 'card-grid';
    
    // Filter cards by tag
    const filteredCards = allCards.filter(card => card.tags.includes(tag));
    
    // Add cards to grid
    filteredCards.forEach(card => {
        const isSelected = selectedCards.includes(card.id);
        const cardElement = document.createElement('div');
        cardElement.className = `card-item ${isSelected ? 'selected' : ''}`;
        cardElement.dataset.id = card.id;
        
        // Show NEW badge only if the card ID is in the newBadgeCardIds array
        const showNewBadge = newBadgeCardIds.includes(card.id);
        
        cardElement.innerHTML = `
            ${showNewBadge ? '<div class="new-badge">NEW</div>' : ''}
            <img src="${card.image}" alt="${card.name}" class="card-image">
            <div class="card-name">${card.name}</div>
        `;
        grid.appendChild(cardElement);
    });
    
    section.appendChild(titleElement);
    section.appendChild(grid);
    return section;
}

// Update selected cards count display
function updateSelectedCardsCount() {
    const count = selectedCards.length;
    selectedCardsCount.textContent = `${count} card${count !== 1 ? 's' : ''} selected`;
}

// Render account rows with orb icons
function renderAccounts() {
    accountList.innerHTML = '';
    
    let filteredAccounts = accounts;
    
    // Filter by category if one is selected
    if (selectedCategory) {
        filteredAccounts = filteredAccounts.filter(account => account.category === selectedCategory);
    } else {
        // If no category selected, show empty state
        const noResultsRow = document.createElement('tr');
        noResultsRow.className = 'no-results';
        noResultsRow.innerHTML = `
            <td colspan="3">
                <i class="fas fa-search"></i>
                <p>Please select a category to view available accounts</p>
            </td>
        `;
        accountList.appendChild(noResultsRow);
        return;
    }
    
    // Filter by selected tags
    if (selectedTags.length > 0) {
        filteredAccounts = filteredAccounts.filter(account => {
            return selectedTags.some(tag => account.tags.includes(tag));
        });
    }
    
    // Filter by selected cards
    if (selectedCards.length > 0) {
        filteredAccounts = filteredAccounts.filter(account => {
            return selectedCards.every(cardId => account.cards.includes(cardId));
        });
    }
    
    // Sort accounts
    filteredAccounts = sortAccounts(filteredAccounts);
    
    if (filteredAccounts.length === 0) {
        const noResultsRow = document.createElement('tr');
        noResultsRow.className = 'no-results';
        noResultsRow.innerHTML = `
            <td colspan="3">
                <i class="fas fa-search"></i>
                <p>No accounts match your filters</p>
                <p>Try adjusting your criteria or check back later</p>
            </td>
        `;
        accountList.appendChild(noResultsRow);
        return;
    }
    
    filteredAccounts.forEach((account, index) => {
        const row = document.createElement('tr');
        row.className = 'fade-in';
        row.style.animationDelay = `${index * 0.1}s`;
        
        // Create links list
        const linksList = account.links.map(link => 
            `<a href="${link}" class="account-link" target="_blank">View Image ${account.links.indexOf(link) + 1}</a>`
        ).join(' ');
        
        // Add orb icon before the orb count
        row.innerHTML = `
            <td><strong>${account.code}</strong></td>
            <td>${linksList}</td>
            <td>
                <img src="orb.png" alt="Spirit Orbs" class="orb-icon">
                <span class="orb-count">${account.orbs.toLocaleString()}</span>
            </td>
        `;
        accountList.appendChild(row);
    });
}

// Sort accounts based on current sort method
function sortAccounts(accounts) {
    const sorted = [...accounts];
    
    if (currentSort === 'orbs-desc') {
        sorted.sort((a, b) => b.orbs - a.orbs);
    } else if (currentSort === 'orbs-asc') {
        sorted.sort((a, b) => a.orbs - b.orbs);
    }
    
    return sorted;
}

// Set up event listeners
function setupEventListeners() {
    // Category tabs - fixed implementation
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Toggle category selection
            if (selectedCategory === category) {
                selectedCategory = null;
                this.classList.remove('active');
                subFiltersContainer.classList.add('hidden');
                cardFilters.classList.remove('active');
            } else {
                selectedCategory = category;
                categoryTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                subFiltersContainer.classList.remove('hidden');
            }
            
            // Reset filters when changing category
            selectedTags = [];
            subFilters.forEach(btn => btn.classList.remove('active'));
            selectedCards = [];
            updateSelectedCardsCount();
            renderCardSections();
            
            renderAccounts();
        });
    });
    
    // Sub filters (new/top-tier)
    subFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            const tag = btn.dataset.tag;
            const index = selectedTags.indexOf(tag);
            
            if (index === -1) {
                selectedTags.push(tag);
                btn.classList.add('active');
            } else {
                selectedTags.splice(index, 1);
                btn.classList.remove('active');
            }
            
            renderCardSections();
            renderAccounts();
        });
    });
    
    // Card selection (delegated event)
    cardFilters.addEventListener('click', (e) => {
        const cardItem = e.target.closest('.card-item');
        if (!cardItem) return;
        
        const cardId = parseInt(cardItem.dataset.id);
        const index = selectedCards.indexOf(cardId);
        
        if (index === -1) {
            selectedCards.push(cardId);
            // Update ALL instances of this card across all sections
            document.querySelectorAll(`.card-item[data-id="${cardId}"]`).forEach(item => {
                item.classList.add('selected');
            });
        } else {
            selectedCards.splice(index, 1);
            // Update ALL instances of this card across all sections
            document.querySelectorAll(`.card-item[data-id="${cardId}"]`).forEach(item => {
                item.classList.remove('selected');
            });
        }
        
        updateSelectedCardsCount();
        renderAccounts();
    });
    
    // Sort buttons
    sortButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const sortMethod = btn.dataset.sort;
            currentSort = sortMethod;
            
            sortButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            renderAccounts();
        });
    });
    
    // Clear card filters
    clearCardsBtn.addEventListener('click', () => {
        selectedCards = [];
        updateSelectedCardsCount();
        // Remove selected class from all cards
        document.querySelectorAll('.card-item').forEach(item => {
            item.classList.remove('selected');
        });
        renderAccounts();
    });
}

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 1px and 3px
        const size = Math.random() * 2 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration between 10s and 20s
        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatBubble = document.querySelector('.chat-bubble');
    const chatWindow = document.querySelector('.chat-window');
    const chatMessages = document.querySelector('.chat-messages');
    const messageInput = document.querySelector('.message-input');
    const sendButton = document.querySelector('.send-button');
    const typingIndicator = document.querySelector('.typing-indicator');
    const quickActions = document.querySelectorAll('.quick-action');
    const selectButton = document.querySelector('.select-button');
    const questionDropdown = document.querySelector('.question-dropdown');
    const questionOptions = document.querySelectorAll('.question-option');
    
 // FAQ Responses
const faqResponses = {
    'buy': {
        question: 'How can I buy an account?',
        answer: `To purchase an account, please contact the seller on our supported platforms:
        <div class="social-links">
            <a href="https://www.epicnpc.com/members/voldigoad.1579253/" class="social-link" target="_blank"><i class="fas fa-store"></i> EpicNPC</a>
            <a href="https://discord.com/users/1046773939843645503" class="social-link" target="_blank"><i class="fab fa-discord"></i> Discord</a>
            <a href="https://www.instagram.com/bbsvoldigoadd/" class="social-link" target="_blank"><i class="fab fa-instagram"></i> Instagram</a>
            <a href="https://mail.google.com/mail/u/0/?to=voldigoadzeref@gmail.com&su=Interested+in+BBS+Accounts&body=Hello,+I'm+interested+in+your+Bleach+Brave+Souls+accounts/services&fs=1&tf=cm" class="social-link"><i class="fas fa-envelope"></i> Email</a>
            <a href="https://api.whatsapp.com/send/?phone=905075638741&text=Hello%2C+I'm+interested+in+your+Bleach+Brave+Souls+accounts%2Fservices&type=phone_number&app_absent=0" class="social-link" target="_blank"><i class="fab fa-whatsapp"></i> WhatsApp</a>
        </div>
        Provide details of the account you're interested in, and our team will guide you through the secure purchasing process.`
    },
    'sell': {
        question: 'How can I sell my account?',
        answer: `To sell your account, send the account details and pictures to VOLDIGOAD on our supported platforms:
        <div class="social-links">
            <a href="https://www.epicnpc.com/members/voldigoad.1579253/" class="social-link" target="_blank"><i class="fas fa-store"></i> EpicNPC</a>
            <a href="https://discord.com/users/1046773939843645503" class="social-link" target="_blank"><i class="fab fa-discord"></i> Discord</a>
            <a href="https://www.instagram.com/bbsvoldigoadd/" class="social-link" target="_blank"><i class="fab fa-instagram"></i> Instagram</a>
            <a href="https://mail.google.com/mail/u/0/?to=voldigoadzeref@gmail.com&su=Interested+in+BBS+Accounts&body=Hello,+I'm+interested+in+your+Bleach+Brave+Souls+accounts/services&fs=1&tf=cm" class="social-link"><i class="fas fa-envelope"></i> Email</a>
            <a href="https://api.whatsapp.com/send/?phone=905075638741&text=Hello%2C+I'm+interested+in+your+Bleach+Brave+Souls+accounts%2Fservices&type=phone_number&app_absent=0" class="social-link" target="_blank"><i class="fab fa-whatsapp"></i> WhatsApp</a>
        </div>
        If your account meets our requirements, it will be listed for sale successfully.`
    },
    'payment': {
        question: 'What payment methods do you accept?',
        answer: `We accept various payment methods  including PayPal, credit/debit cards, bank transfers, and cryptocurrency (Binance). All transactions are secure and protected.
    <div class="payment-methods">
            <div class="payment-method">
                <img src="Paypal.png" alt="PayPal" class="payment-icon">
            </div>
            <div class="payment-method">
                <img src="btc.png" alt="Cryptocurrency" class="payment-icon">
            </div>
            <div class="payment-method">
                <img src="bt.png" alt="Bank Transfer" class="payment-icon">
            </div>
            <div class="payment-method">
                <img src="Master.png" alt="Mastercard" class="payment-icon">
            </div>
            <div class="payment-method">
                <img src="Visa.png" alt="Visa" class="payment-icon">
            </div>
        </div>`
    },
    
    'delivery': {
        question: 'How long does it take to receive the account?',
        answer: 'Account delivery is instant once payment is confirmed. You\'ll receive the login details immediately after completing your purchase.'
    },
    'response': {
        question: 'How long does it take for seller to respond?',
        answer: 'Our sellers typically respond instantly. In rare cases, response time may be 2-3 hours during peak periods or outside standard business hours.'
    },
    'account-delivery': {
        question: 'How is the account delivered?',
        answer: 'Accounts are delivered via Klab ID (you\'ll create a new Klab ID login which will be linked to the account). For some endgame accounts, only your email address is required for transfer.'
    }
};
    
// Keyword detection
const keywordMap = {
    'buy|purchase|acquire|get account': 'buy',
    'sell|list|offer account': 'sell',
    'pay|payment|method|credit|debit|crypto': 'payment',
    'deliver|delivery|receive|get account|time': 'delivery',
    'respond|response|reply|answer|wait': 'response',
    'klab|id|email|transfer|deliver': 'account-delivery'
};
    
    // Initial bot message
    setTimeout(() => {
        addMessage('Hello!👋 I\'m your account support assistant. How can I help you today? You can select a question from the dropdown or type your query.', 'bot');
    }, 1000);
    
    // Toggle chat window
    chatBubble.addEventListener('click', function() {
        chatWindow.classList.toggle('open');
        chatBubble.classList.toggle('active');
        if (chatWindow.classList.contains('open')) {
            messageInput.focus();
        }
    });
    
    // Toggle question dropdown
    selectButton.addEventListener('click', function(e) {
        e.stopPropagation();
        questionDropdown.classList.toggle('open');
        selectButton.classList.toggle('open');
    });
    
    // Close dropdown when clicking elsewhere
    document.addEventListener('click', function() {
        questionDropdown.classList.remove('open');
        selectButton.classList.remove('open');
    });
    
    // Select question from dropdown
    questionOptions.forEach(option => {
        option.addEventListener('click', function() {
            const questionType = this.getAttribute('data-question');
            triggerFAQResponse(questionType);
            questionDropdown.classList.remove('open');
            selectButton.classList.remove('open');
        });
    });
    
    // Send message function
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            messageInput.value = '';
            processUserMessage(message);
        }
    }
    
    // Send button click
    sendButton.addEventListener('click', sendMessage);
    
    // Enter key to send
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Quick action click
    quickActions.forEach(action => {
        action.addEventListener('click', function() {
            const questionType = this.getAttribute('data-question');
            triggerFAQResponse(questionType);
        });
    });
    
    // Trigger FAQ response
    function triggerFAQResponse(type) {
        const faq = faqResponses[type];
        if (faq) {
            addMessage(faq.question, 'user');
            setTimeout(() => {
                addMessage(faq.answer, 'bot');
            }, 800);
        }
    }
    
    // Process user message with keyword detection
    function processUserMessage(message) {
        showTyping();
        
        setTimeout(() => {
            hideTyping();
            
            // Check for exact matches first
            let matched = false;
            
            // Check for keywords
            for (const [keywords, responseKey] of Object.entries(keywordMap)) {
                const regex = new RegExp(keywords.split('|').join('|'), 'i');
                if (regex.test(message)) {
                    const response = faqResponses[responseKey];
                    if (response) {
                        addMessage(response.answer, 'bot');
                        matched = true;
                        break;
                    }
                }
            }
            
            // Default response if no match
            if (!matched) {
                addMessage('Thanks for your message! You can select a question from the dropdown menu or ask about buying/selling accounts, payment methods, or delivery times. How else can I assist you?', 'bot');
            }
        }, 1000 + Math.random() * 1000);
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `
            <div class="message-avatar">
                ${sender === 'bot' ? `
                    <img src="skull.png" alt="Support" class="skull-icon" />
                ` : `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                `}
            </div>
            <div class="message-content">${text}</div>
        `;
        
        chatMessages.insertBefore(messageDiv, typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Show typing indicator
    function showTyping() {
        typingIndicator.style.display = 'flex';
        scrollToBottom();
    }
    
    // Hide typing indicator
    function hideTyping() {
        typingIndicator.style.display = 'none';
    }
    
    // Scroll to bottom of chat
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Close chat when clicking outside
    document.addEventListener('click', function(e) {
        if (!chatWindow.contains(e.target) && !chatBubble.contains(e.target)) {
            chatWindow.classList.remove('open');
            chatBubble.classList.remove('active');
        }
    });
});

// Enhanced JavaScript with smooth animations
const buyBtn = document.getElementById('buyHereBtn');
const popup = document.getElementById('buyHerePopup');
const closeBtn = document.getElementById('closePopup');

buyBtn.addEventListener('click', function(e) {
    e.preventDefault();
    popup.style.display = 'flex';
    // Trigger animation after display is set
    setTimeout(() => {
        popup.classList.add('show');
    }, 10);
});

closeBtn.addEventListener('click', function() {
    closePopup();
});

window.addEventListener('click', function(event) {
    if (event.target === popup) {
        closePopup();
    }
});

function closePopup() {
    popup.classList.remove('show');
    setTimeout(() => {
        popup.style.display = 'none';
    }, 300);
}

// Add keyboard support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popup.classList.contains('show')) {
        closePopup();
    }
});

// Add subtle hover effects to social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px) scale(1.02)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const sellAccountBtn = document.getElementById('sellAccountBtn');
    const sellAccountPopup = document.getElementById('sellAccountPopup');
    const closePopup = document.getElementById('closePopup');

    // Open popup when button is clicked
    if (sellAccountBtn) {
        sellAccountBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Button clicked!'); // Debug
            if (sellAccountPopup) {
                sellAccountPopup.style.display = 'flex';
                // Small delay to trigger animation
                setTimeout(() => {
                    sellAccountPopup.classList.add('show');
                }, 10);
            }
        });
    }

    // Close popup when X is clicked
    if (closePopup) {
        closePopup.addEventListener('click', function() {
            console.log('Close button clicked!'); // Debug
            closeSellPopup();
        });
    }

    // Close popup when clicking outside the content
    if (sellAccountPopup) {
        sellAccountPopup.addEventListener('click', function(e) {
            if (e.target === sellAccountPopup) {
                console.log('Clicked outside popup!'); // Debug
                closeSellPopup();
            }
        });
    }

    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sellAccountPopup && sellAccountPopup.classList.contains('show')) {
            console.log('Escape pressed!'); // Debug
            closeSellPopup();
        }
    });

    // Close popup function
    function closeSellPopup() {
        if (sellAccountPopup) {
            sellAccountPopup.classList.remove('show');
            setTimeout(() => {
                sellAccountPopup.style.display = 'none';
            }, 300);
        }
    }
});

// Initialize the page
init();