
// This code can be run in the browser console to import the dummy products
fetch('/dummy-products.json')
  .then(response => response.json())
  .then(dummyProducts => {
    // Get existing products from localStorage
    const localStorageKey = 'india_seller_products';
    const existingData = localStorage.getItem(localStorageKey);
    let existingProducts = [];
    
    if (existingData) {
      try {
        existingProducts = JSON.parse(existingData);
      } catch (err) {
        console.error('Error parsing existing products:', err);
      }
    }
    
    // Add dummy products to existing products
    const combinedProducts = [...existingProducts];
    
    // Add each dummy product if it doesn't already exist
    dummyProducts.forEach(dummyProduct => {
      const exists = existingProducts.some(p => p.sku === dummyProduct.sku);
      if (!exists) {
        combinedProducts.push(dummyProduct);
      }
    });
    
    // Save back to localStorage
    localStorage.setItem(localStorageKey, JSON.stringify(combinedProducts));
    
    console.log(`Added ${dummyProducts.length} dummy products to localStorage. Total products: ${combinedProducts.length}`);
  })
  .catch(error => {
    console.error('Error importing dummy products:', error);
  });
