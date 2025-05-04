document.addEventListener('DOMContentLoaded', function() {
    // Cart state
    let cart = [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const totalAmount = document.querySelector('.total-amount');
    const checkoutBtn = document.querySelector('.checkout-btn');

    // Add event listeners to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Add to cart function
    function addToCart(event) {
        const productCard = event.target.closest('.product-card');
        const productId = productCard.dataset.id;
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = parseFloat(productCard.dataset.price);
        const productImage = productCard.querySelector('.product-image img').src;
        const quantitySelect = productCard.querySelector('.qty-select');
        const quantity = parseInt(quantitySelect.value);

        // Check if product already in cart
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            // Update quantity if already in cart
            existingItem.quantity += quantity;
        } else {
            // Add new item to cart
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: quantity
            });
        }

        // Update the cart UI
        updateCartUI();
        
        // Feedback to user
        const originalText = event.target.textContent;
        event.target.textContent = "Added!";
        event.target.disabled = true;
        
        setTimeout(() => {
            event.target.textContent = originalText;
            event.target.disabled = false;
        }, 1000);
    }

    // Update cart UI function
    function updateCartUI() {
        // Clear current cart display
        cartItemsContainer.innerHTML = '';
        
        // If cart is empty
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartCount.textContent = '0 items';
            totalAmount.textContent = '₹0.00';
            checkoutBtn.disabled = true;
            return;
        }
        
        // Enable checkout button
        checkoutBtn.disabled = false;
        
        // Update cart count
        cartCount.textContent = `${cart.length} item${cart.length > 1 ? 's' : ''}`;
        
        // Calculate total
        let total = 0;
        
        // Add each item to cart display
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.dataset.id = item.id;
            
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price.toFixed(2)} × ${item.quantity}</div>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn decrease-btn">-</button>
                    <input type="number" class="item-quantity" value="${item.quantity}" min="1" max="10">
                    <button class="quantity-btn increase-btn">+</button>
                    <i class="fas fa-trash remove-item"></i>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
            
            // Add event listeners for item controls
            const decreaseBtn = cartItemElement.querySelector('.decrease-btn');
            const increaseBtn = cartItemElement.querySelector('.increase-btn');
            const quantityInput = cartItemElement.querySelector('.item-quantity');
            const removeBtn = cartItemElement.querySelector('.remove-item');
            
            decreaseBtn.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    updateCartUI();
                }
            });
            
            increaseBtn.addEventListener('click', () => {
                if (item.quantity < 10) {
                    item.quantity++;
                    updateCartUI();
                }
            });
            
            quantityInput.addEventListener('change', (e) => {
                const newQuantity = parseInt(e.target.value);
                if (newQuantity > 0 && newQuantity <= 10) {
                    item.quantity = newQuantity;
                    updateCartUI();
                } else {
                    updateCartUI(); // Reset to valid value
                }
            });
            
            removeBtn.addEventListener('click', () => {
                cart = cart.filter(cartItem => cartItem.id !== item.id);
                updateCartUI();
            });
        });
        
        // Update total display
        totalAmount.textContent = `₹${total.toFixed(2)}`;
    }
    
    // Initialize cart UI
    updateCartUI();
    
    // Handle checkout button
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Proceeding to checkout with ' + cart.length + ' items totaling ₹' + 
                  cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2));
            // In a real app, this would redirect to a checkout page
        }
    });
    
    // Carousel navigation
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const carousel = document.querySelector('.product-carousel');
    
    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -280, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: 280, behavior: 'smooth' });
    });
}); 