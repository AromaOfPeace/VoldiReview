// Shopping cart functionality - FIXED VERSION
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Update cart count display
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Update cart modal
function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    cartItems.innerHTML = '';
    
    let total = 0;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: var(--gray);">Your cart is empty</p>';
        cartTotal.textContent = '$0.00';
        return;
    }
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-title">${item.service}</div>
                ${item.details ? `<div class="cart-item-details">${item.details}</div>` : ''}
                <div class="quantity-selector">
                    <button class="quantity-btn" onclick="changeCartItemQuantity(${index}, -1)">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateCartItemQuantity(${index}, this.value)">
                    <button class="quantity-btn" onclick="changeCartItemQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <div class="cart-item-price">$${(itemTotal).toFixed(2)}</div>
            <div class="cart-item-remove" onclick="removeCartItem(${index})"><i class="fas fa-trash"></i></div>
        `;
        
        cartItems.appendChild(itemElement);
    });
    
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Change cart item quantity
function changeCartItemQuantity(index, change) {
    const newQuantity = cart[index].quantity + change;
    if (newQuantity >= 1) {
        cart[index].quantity = newQuantity;
        updateCartModal();
        updateCartCount();
    }
}

// Update cart item quantity
function updateCartItemQuantity(index, value) {
    const quantity = parseInt(value) || 1;
    if (quantity >= 1) {
        cart[index].quantity = quantity;
        updateCartModal();
        updateCartCount();
    }
}

// Remove cart item
function removeCartItem(index) {
    const removedItem = cart.splice(index, 1)[0];
    updateCartModal();
    updateCartCount();
    showNotification(`Removed: ${removedItem.service}`);
}

// Clear cart - FIXED to persist localStorage clearing
function clearCart() {
    if (cart.length === 0) return;
    
    cart = [];
    
    // Save empty cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartModal();
    updateCartCount();
    showNotification('Cart cleared successfully');
}

// Add item to cart - FIXED
function addToCart(service, price, quantity = 1, details = '') {
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => 
        item.service === service && item.details === details
    );
    
    if (existingItemIndex >= 0) {
        // Update quantity if item exists
        cart[existingItemIndex].quantity += parseInt(quantity) || 1;
    } else {
        // Add new item if it doesn't exist
        cart.push({
            service,
            price: parseFloat(price),
            quantity: parseInt(quantity) || 1,
            details
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartCount();
    showNotification(`Added to cart: ${service}`);
}
// Point Event Calculator - FIXED
function calculatePointEvent() {
    const points = parseInt(document.getElementById('point-amount').value);
    const quantity = parseInt(document.getElementById('point-quantity').value) || 1;
    let unitPrice = 0;
    let tickets = 0;
    
    // Fixed pricing for specific point amounts
    switch(points) {
        case 250000000:
            unitPrice = 15;
            tickets = 1500;
            break;
        case 500000000:
            unitPrice = 24;
            tickets = 3500;
            break;
        case 1000000000:
            unitPrice = 44;
            tickets = 7000;
            break;
        case 2000000000:
            unitPrice = 79;
            tickets = 14000;
            break;
        default:
            unitPrice = 15;
            tickets = 1500;
    }
    
    // Calculate totals
    const totalPrice = unitPrice * quantity;
    const totalTickets = tickets * quantity;
    
    // Update display
    document.getElementById('point-price').textContent = '$' + totalPrice.toFixed(2);
    document.getElementById('point-tickets').textContent = totalTickets.toLocaleString();
    
    return {
        unitPrice: unitPrice,
        totalPrice: totalPrice,
        tickets: totalTickets,
        points: points
    };
}

// Link Slot Calculator - UPDATED PRICING
function calculateLinkSlots() {
    const type = selectedPotionType; // Use global variable
    const amount = parseInt(document.getElementById('potion-amount').value) || 10;
    const quantity = parseInt(document.getElementById('potion-quantity').value) || 1;
    let unitPrice = 0;

    if (type === 'normal') {
        if (amount === 50000) {
            unitPrice = 2.5;
        } else if (amount === 100000) {
            unitPrice = 4.5;
        } else if (amount === 150000) {
            unitPrice = 6.5;
        } else if (amount === 200000) {
            unitPrice = 8;
        } else if (amount === 250000) {
            unitPrice = 10;
        } else if (amount === 300000) {
            unitPrice = 12.5;
        } else if (amount === 350000) {
            unitPrice = 14.5;
        } else if (amount === 400000) {
            unitPrice = 16.5;
        } else if (amount === 450000) {
            unitPrice = 18;
        } else if (amount === 500000) {
            unitPrice = 20;
        } else {
            unitPrice = (amount / 50000) * 2.5; // fallback linear scaling
        }
    } else if (type === 'super') {
        if (amount === 50000) {
            unitPrice = 3;
        } else if (amount === 100000) {
            unitPrice = 5.5;
        } else if (amount === 150000) {
            unitPrice = 8;
        } else if (amount === 200000) {
            unitPrice = 10.5;
        } else if (amount === 250000) {
            unitPrice = 13;
        } else if (amount === 300000) {
            unitPrice = 15.5;
        } else if (amount === 350000) {
            unitPrice = 18;
        } else if (amount === 400000) {
            unitPrice = 20.5;
        } else if (amount === 450000) {
            unitPrice = 23;
        } else if (amount === 500000) {
            unitPrice = 25;
        } else {
            unitPrice = (amount / 50000) * 3; // fallback linear scaling
        }
    }

    const totalPrice = unitPrice * quantity;

    document.getElementById('link-price').textContent = '$' + totalPrice.toFixed(2);
    return {
        unitPrice: unitPrice,
        totalPrice: totalPrice
    };
}

// Enhanced Potion Selection System
let selectedPotionType = 'normal';
let selectedElement = 'power';

// Initialize element icons
function initializeElementIcons() {
    document.querySelectorAll('.element-option').forEach(option => {
        const element = option.dataset.element;
        const icon = option.querySelector('.element-icon');
        const normalIcon = icon.dataset.normal;
        const superIcon = icon.dataset.super;
        
        // Set initial icon based on current potion type
        icon.style.backgroundImage = `url('${selectedPotionType === 'normal' ? normalIcon : superIcon}')`;
    });
    
    updatePreview();
}

// Select potion type
function selectPotionType(type) {
    selectedPotionType = type;
    
    // Update active state
    document.querySelectorAll('.potion-type-option').forEach(option => {
        option.classList.remove('active');
    });
    document.querySelector(`[data-type="${type}"]`).classList.add('active');
    
    // Update all element icons
    document.querySelectorAll('.element-option').forEach(option => {
        const element = option.dataset.element;
        const icon = option.querySelector('.element-icon');
        const normalIcon = icon.dataset.normal;
        const superIcon = icon.dataset.super;
        
        icon.style.backgroundImage = `url('${type === 'normal' ? normalIcon : superIcon}')`;
    });
    
    updatePreview();
    calculateLinkSlots();
}

// Select element
function selectElement(element) {
    selectedElement = element;
    
    // Update active state
    document.querySelectorAll('.element-option').forEach(option => {
        option.classList.remove('active');
    });
    document.querySelector(`[data-element="${element}"]`).classList.add('active');
    
    updatePreview();
}

// Update preview display
function updatePreview() {
    const previewIcon = document.getElementById('selectedPotionIcon');
    const previewName = document.getElementById('selectedPotionName');
    const previewType = document.getElementById('selectedPotionType');
    
    // Get the correct icon
    const elementOption = document.querySelector(`[data-element="${selectedElement}"]`);
    const icon = elementOption.querySelector('.element-icon');
    const iconUrl = selectedPotionType === 'normal' ? 
        icon.dataset.normal : icon.dataset.super;
    
    // Update preview
    previewIcon.style.backgroundImage = `url('${iconUrl}')`;
    previewName.textContent = `${selectedPotionType.charAt(0).toUpperCase() + selectedPotionType.slice(1)} ${selectedElement.charAt(0).toUpperCase() + selectedElement.slice(1)} Potion`;
    previewType.textContent = `${selectedPotionType.charAt(0).toUpperCase() + selectedPotionType.slice(1)} • ${selectedElement.charAt(0).toUpperCase() + selectedElement.slice(1)} Element`;
}

// Epic Raids Calculator - FIXED PRICING
function calculateEpicRaids() {
    const medals = parseInt(document.getElementById('medal-amount').value);
    const quantity = parseInt(document.getElementById('epic-quantity').value) || 1;
    
    // Fixed pricing tiers
    let unitPrice = 0;
    switch(medals) {
        case 50000:
            unitPrice = 5;
            break;
        case 100000:
            unitPrice = 9;
            break;
        case 200000:
            unitPrice = 16;
            break;
        case 300000:
            unitPrice = 22;
            break;
        case 500000:
            unitPrice = 35;
            break;
        case 1000000:
            unitPrice = 65;
            break;
        default:
            unitPrice = 5; // default to smallest package
    }
    
    const totalPrice = unitPrice * quantity;
    const totalMedals = medals * quantity;
    
    document.getElementById('epic-price').textContent = '$' + totalPrice.toFixed(2);
    document.getElementById('epic-medals').textContent = totalMedals.toLocaleString();
    
    return { 
        unitPrice: unitPrice,
        totalPrice: totalPrice, 
        medals: totalMedals 
    };
}

// Initialize all calculators on page load
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    updateCartCount();
    initializeElementIcons();
    
    // Set up event listeners for calculators
    document.getElementById('point-amount').addEventListener('change', calculatePointEvent);
    document.getElementById('point-quantity').addEventListener('input', calculatePointEvent);
    
    document.getElementById('potion-amount').addEventListener('input', calculateLinkSlots);
    document.getElementById('potion-quantity').addEventListener('input', calculateLinkSlots);
    
    document.getElementById('medal-amount').addEventListener('change', calculateEpicRaids);
    document.getElementById('epic-quantity').addEventListener('input', calculateEpicRaids);
    
    // Quantity controls for point event
    document.getElementById('point-increase').addEventListener('click', () => {
        const input = document.getElementById('point-quantity');
        input.value = parseInt(input.value) + 1;
        calculatePointEvent();
    });
    
    document.getElementById('point-decrease').addEventListener('click', () => {
        const input = document.getElementById('point-quantity');
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
            calculatePointEvent();
        }
    });
    
    // Quantity controls for link slots
    document.getElementById('potion-increase').addEventListener('click', () => {
        const input = document.getElementById('potion-quantity');
        input.value = parseInt(input.value) + 1;
        calculateLinkSlots();
    });
    
    document.getElementById('potion-decrease').addEventListener('click', () => {
        const input = document.getElementById('potion-quantity');
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
            calculateLinkSlots();
        }
    });
    
    // Quantity controls for epic raids
    document.getElementById('epic-increase').addEventListener('click', () => {
        const input = document.getElementById('epic-quantity');
        input.value = parseInt(input.value) + 1;
        calculateEpicRaids();
    });
    
    document.getElementById('epic-decrease').addEventListener('click', () => {
        const input = document.getElementById('epic-quantity');
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
            calculateEpicRaids();
        }
    });
    
    // Quantity controls for custom service
    document.getElementById('custom-increase').addEventListener('click', () => {
        const input = document.getElementById('custom-quantity');
        input.value = parseInt(input.value) + 1;
    });
    
    document.getElementById('custom-decrease').addEventListener('click', () => {
        const input = document.getElementById('custom-quantity');
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
        }
    });
    
    // Quantity controls for service options
    document.querySelectorAll('.service-option .increase').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const input = e.target.parentElement.querySelector('.quantity-input');
            input.value = parseInt(input.value) + 1;
        });
    });
    
    document.querySelectorAll('.service-option .decrease').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const input = e.target.parentElement.querySelector('.quantity-input');
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
        });
    });
    
    // Add to cart buttons - FIXED with single event delegation
    document.addEventListener('click', function(e) {
        // Point Event
        if (e.target.id === 'addPointEvent' || e.target.closest('#addPointEvent')) {
            const pointSelect = document.getElementById('point-amount');
            const points = parseInt(pointSelect.value);
            const result = calculatePointEvent();
            const quantity = parseInt(document.getElementById('point-quantity').value);
            const service = `Point Event Boosting`;
            const details = `${points.toLocaleString()} points - Est. tickets: ${document.getElementById('point-tickets').textContent}`;
            
            addToCart(service, result.unitPrice, quantity, details);
        }
        // Link Slot
        else if (e.target.id === 'addLinkSlot' || e.target.closest('#addLinkSlot')) {
            const type = selectedPotionType.charAt(0).toUpperCase() + selectedPotionType.slice(1);
            const element = selectedElement.charAt(0).toUpperCase() + selectedElement.slice(1);
            const amount = parseInt(document.getElementById('potion-amount').value);
            const result = calculateLinkSlots();
            const quantity = parseInt(document.getElementById('potion-quantity').value);
            const service = `Link Slot Potions (${type})`;
            const details = `${amount} ${element} potions per order`;
            
            addToCart(service, result.unitPrice, quantity, details);
        }
        // Epic Raids
        else if (e.target.id === 'addEpicRaids' || e.target.closest('#addEpicRaids')) {
            const medals = parseInt(document.getElementById('medal-amount').value);
            const result = calculateEpicRaids();
            const quantity = parseInt(document.getElementById('epic-quantity').value);
            const service = `Epic Raids Farming`;
            const details = `${medals.toLocaleString()} medals per order`;
            
            addToCart(service, result.unitPrice, quantity, details);
        }
        // Custom Service
        else if (e.target.id === 'addCustomService' || e.target.closest('#addCustomService')) {
            const desc = document.getElementById('custom-service-desc').value.trim();
            const priceInput = document.getElementById('custom-service-price');
            const price = parseFloat(priceInput.value);
            const quantity = parseInt(document.getElementById('custom-quantity').value);
            
            if (!desc) {
                showNotification('Please describe your custom service request');
                return;
            }
            
            if (isNaN(price) || price <= 0) {
                showNotification('Please enter a valid price');
                return;
            }
            
            addToCart('Custom Service', price, quantity, desc);
            
            // Clear the form
            document.getElementById('custom-service-desc').value = '';
            priceInput.value = '';
            document.getElementById('custom-quantity').value = 1;
        }
        // Generic add to cart buttons (service options and story farming)
        else if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart') || 
                 e.target.classList.contains('order-btn') || e.target.closest('.order-btn')) {
            const btn = e.target.classList.contains('add-to-cart') || e.target.classList.contains('order-btn') ? 
                       e.target : e.target.closest('.add-to-cart, .order-btn');
            
            const service = btn.dataset.service;
            const price = parseFloat(btn.dataset.price);
            const quantityInput = btn.parentElement.querySelector('.quantity-input') || 
                                btn.closest('.service-option, .story-option, .story-cta').querySelector('.quantity-input');
            const quantity = parseInt(quantityInput.value) || 1;
            
            addToCart(service, price, quantity);
        }
    });
    
    // Story Farming quantity controls
    document.querySelectorAll('.story-option .increase, .story-cta .increase').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const input = e.target.parentElement.querySelector('.quantity-input');
            input.value = parseInt(input.value) + 1;
        });
    });

    document.querySelectorAll('.story-option .decrease, .story-cta .decrease').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const input = e.target.parentElement.querySelector('.quantity-input');
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
        });
    });

    // Cart modal controls
    document.getElementById('cartButton').addEventListener('click', () => {
        document.getElementById('cartModal').style.display = 'block';
        updateCartModal();
    });

    document.getElementById('closeCart').addEventListener('click', () => {
        document.getElementById('cartModal').style.display = 'none';
    });

    document.getElementById('clearCart').addEventListener('click', clearCart);

    document.getElementById('checkoutBtn').addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Your cart is empty');
            return;
        }
        
        // Redirect to checkout page
        window.location.href = 'checkout.html';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('cartModal')) {
            document.getElementById('cartModal').style.display = 'none';
        }
    });
    
    // Trigger initial calculations
    calculatePointEvent();
    calculateLinkSlots();
    calculateEpicRaids();
});

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
