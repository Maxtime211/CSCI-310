// This block of code is executed once the document is ready
$(document).ready(function () {
  // Select the shopping cart container and create a subtotal element
  const cartContainer = $('#shopping-cart');
  const subtotalElement = $('<p id="subtotal">Subtotal: $0.00</p>');
  
  // Insert the subtotal element after the shopping cart container
  cartContainer.after(subtotalElement);

  // Initialize the cartItems array with sample items (replace with actual items)
  let cartItems = [item1, item2, item3, item4]; // Assuming items are loaded from items.js

  // Initial rendering of the shopping cart
  renderCart();

  // Function to render the shopping cart based on the cartItems array
  function renderCart() {
    // Clear the content of the shopping cart container
    cartContainer.empty();

    // Loop through each item in the cartItems array
    cartItems.forEach(item => {
      // Create a div for each product in the shopping cart
      const productDiv = $('<div class="product">');

      // Set the HTML content of the productDiv using template literals
      productDiv.html(`
        <img src="${item.image}" alt="${item.productName}" />
        <div class="item-details">
          <h3>${item.productName}</h3>
          <p>${item.description}</p>
          <p>Price: $${item.price}</p>
          <p>Quantity: <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-item-id="${item.itemid}" /></p>
          <button class="delete-button" data-item-id="${item.itemid}">Delete</button>
        </div>
      `);

      // Append the productDiv to the shopping cart container
      cartContainer.append(productDiv);
    });

    // Update the subtotal after rendering the cart
    updateSubtotal();
  }

  // Function to calculate the subtotal based on the cartItems array
  function calculateSubtotal() {
    // Use the reduce function to sum the product of price and quantity for each item
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // Function to update the displayed subtotal in the DOM
  function updateSubtotal() {
    // Calculate the subtotal and update the text content of the subtotalElement
    const subtotal = calculateSubtotal();
    $('#subtotal').text(`Subtotal: $${subtotal.toFixed(2)}`);
  }

  // Event listeners for input changes in quantity and delete button clicks
  $(document).on('input', '.quantity-input', function () {
    // Retrieve the item ID from the data attribute
    const itemId = $(this).data('item-id');
    // Find the corresponding item in the cartItems array
    const item = cartItems.find(item => item.itemid === itemId);

    // If the item is found, update its quantity and refresh the subtotal
    if (item) {
      item.quantity = parseInt($(this).val());
      updateSubtotal();
    }
  });

  $(document).on('click', '.delete-button', function () {
    // Retrieve the item ID from the data attribute
    const itemId = $(this).data('item-id');
    // Remove the item with the specified ID from the cartItems array
    cartItems = cartItems.filter(item => item.itemid !== itemId);
    // Render the updated cart and refresh the subtotal
    renderCart();
    updateSubtotal();
  });
});