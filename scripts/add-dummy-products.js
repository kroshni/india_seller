// Add dummy products script
const fs = require('fs');
const path = require('path');

// Function to generate a random number between min and max (inclusive)
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to get a random element from an array
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Generate a random date within the last year
function randomDate() {
  const now = new Date();
  const pastYear = new Date();
  pastYear.setFullYear(now.getFullYear() - 1);
  
  return new Date(
    pastYear.getTime() + Math.random() * (now.getTime() - pastYear.getTime())
  ).toISOString();
}

// Generate a random future date within the next year
function randomFutureDate() {
  const now = new Date();
  const nextYear = new Date();
  nextYear.setFullYear(now.getFullYear() + 1);
  
  return new Date(
    now.getTime() + Math.random() * (nextYear.getTime() - now.getTime())
  ).toISOString();
}

// Product types
const productTypes = ['Simple', 'Configurable', 'Virtual', 'Downloadable', 'Grouped', 'Bundled'];

// Status options
const statusOptions = ['Enabled', 'Disabled'];

// Stock status options
const stockStatusOptions = ['In Stock', 'Out of Stock', 'Pre-Order'];

// Visibility options
const visibilityOptions = ['Store', 'Search', 'Both', 'None'];

// Category IDs
const categoryIds = [
  '550e8400-e29b-41d4-a716-446655440000', // Electronics
  '550e8400-e29b-41d4-a716-446655440001', // Clothing
  '550e8400-e29b-41d4-a716-446655440002', // Footwear
  '550e8400-e29b-41d4-a716-446655440003', // Accessories
  '550e8400-e29b-41d4-a716-446655440004', // Home & Kitchen
];

// Brand IDs
const brandIds = [
  '550e8400-e29b-41d4-a716-446655440010', // Apple
  '550e8400-e29b-41d4-a716-446655440011', // Samsung
  '550e8400-e29b-41d4-a716-446655440012', // Sony
  '550e8400-e29b-41d4-a716-446655440013', // LG
  '550e8400-e29b-41d4-a716-446655440014', // HP
  '550e8400-e29b-41d4-a716-446655440015', // Nike
  '550e8400-e29b-41d4-a716-446655440016', // Adidas
];

// Colors
const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Grey', 'Brown', 'Orange'];

// Materials
const materials = ['Cotton', 'Polyester', 'Leather', 'Nylon', 'Wool', 'Silk', 'Plastic', 'Metal', 'Glass', 'Wood'];

// Tags
const tags = [
  'bestseller', 'new', 'sale', 'trending', 'featured', 'premium', 
  'eco-friendly', 'handmade', 'limited-edition', 'organic', 'vegan', 
  'sustainable', 'waterproof', 'wireless', 'bluetooth', 'rechargeable'
];

// Image URLs
const imageUrls = [
  'https://picsum.photos/id/1/800/800',
  'https://picsum.photos/id/20/800/800',
  'https://picsum.photos/id/21/800/800',
  'https://picsum.photos/id/26/800/800',
  'https://picsum.photos/id/62/800/800',
  'https://picsum.photos/id/96/800/800',
  'https://picsum.photos/id/119/800/800',
  'https://picsum.photos/id/169/800/800',
  'https://picsum.photos/id/237/800/800',
  'https://picsum.photos/id/249/800/800',
  'https://picsum.photos/id/257/800/800',
  'https://picsum.photos/id/287/800/800',
  'https://picsum.photos/id/335/800/800',
  'https://picsum.photos/id/338/800/800',
  'https://picsum.photos/id/375/800/800',
  'https://picsum.photos/id/407/800/800',
  'https://picsum.photos/id/433/800/800',
  'https://picsum.photos/id/486/800/800',
  'https://picsum.photos/id/535/800/800',
  'https://picsum.photos/id/633/800/800',
];

// Product templates for different types of products
const productTemplates = [
  // Electronics
  {
    namePrefix: 'Smart',
    nameSuffix: ['Phone', 'Watch', 'TV', 'Speaker', 'Headphones', 'Tablet', 'Laptop', 'Camera'],
    descriptionTemplate: 'Advanced {name} with cutting-edge technology. Features include {features}.',
    shortDescriptionTemplate: 'High-quality {name} for everyday use',
    priceRange: { min: 99.99, max: 1999.99 },
    weightRange: { min: 0.1, max: 10 },
    dimensionsRange: { 
      length: { min: 5, max: 100 },
      width: { min: 5, max: 80 },
      height: { min: 1, max: 30 }
    },
    categoryId: '550e8400-e29b-41d4-a716-446655440000', // Electronics
    featuresPool: [
      'high-resolution display', 'fast processor', 'long battery life', 
      'water resistance', 'wireless charging', 'voice control', 
      'touch screen', 'Bluetooth connectivity', 'AI assistance'
    ],
    customAttributesPool: [
      { name: 'connectivity', values: ['Bluetooth', 'WiFi', '5G', '4G', 'LTE'] },
      { name: 'storage', values: ['32GB', '64GB', '128GB', '256GB', '512GB', '1TB'] },
      { name: 'screen_size', values: ['5.5"', '6.1"', '6.7"', '13"', '15"', '27"', '32"', '55"'] },
      { name: 'color', values: colors }
    ]
  },
  // Clothing
  {
    namePrefix: '',
    nameSuffix: ['T-Shirt', 'Jeans', 'Sweater', 'Jacket', 'Dress', 'Skirt', 'Hoodie', 'Shirt', 'Pants'],
    descriptionTemplate: 'Stylish and comfortable {name} made from high-quality {material}. Perfect for {occasion}.',
    shortDescriptionTemplate: 'Trendy {name} for your wardrobe',
    priceRange: { min: 19.99, max: 199.99 },
    weightRange: { min: 0.2, max: 2 },
    dimensionsRange: { 
      length: { min: 20, max: 80 },
      width: { min: 15, max: 60 },
      height: { min: 1, max: 5 }
    },
    categoryId: '550e8400-e29b-41d4-a716-446655440001', // Clothing
    featuresPool: [
      'comfortable fit', 'durable material', 'stylish design', 
      'machine washable', 'versatile style', 'seasonal colors'
    ],
    customAttributesPool: [
      { name: 'size', values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
      { name: 'material', values: materials },
      { name: 'color', values: colors },
      { name: 'gender', values: ['Men', 'Women', 'Unisex'] }
    ],
    occasionPool: ['casual outings', 'formal events', 'daily wear', 'work', 'sports', 'special occasions']
  },
  // Footwear
  {
    namePrefix: '',
    nameSuffix: ['Sneakers', 'Boots', 'Sandals', 'Loafers', 'Running Shoes', 'Hiking Boots', 'Slippers', 'Heels'],
    descriptionTemplate: 'Premium quality {name} designed for {purpose}. Features {features} for maximum comfort.',
    shortDescriptionTemplate: 'Comfortable {name} for everyday use',
    priceRange: { min: 29.99, max: 299.99 },
    weightRange: { min: 0.5, max: 3 },
    dimensionsRange: { 
      length: { min: 20, max: 35 },
      width: { min: 10, max: 20 },
      height: { min: 5, max: 20 }
    },
    categoryId: '550e8400-e29b-41d4-a716-446655440002', // Footwear
    featuresPool: [
      'cushioned insole', 'arch support', 'non-slip sole', 
      'breathable material', 'shock absorption', 'lightweight design'
    ],
    customAttributesPool: [
      { name: 'size', values: ['7', '8', '9', '10', '11', '12'] },
      { name: 'material', values: ['Leather', 'Canvas', 'Synthetic', 'Rubber', 'Mesh'] },
      { name: 'color', values: colors },
      { name: 'closure', values: ['Lace-up', 'Slip-on', 'Zipper', 'Buckle', 'Velcro'] }
    ],
    purposePool: ['daily wear', 'sports activities', 'outdoor adventures', 'formal occasions', 'casual outings']
  },
  // Home & Kitchen
  {
    namePrefix: '',
    nameSuffix: ['Blender', 'Coffee Maker', 'Toaster', 'Microwave', 'Kettle', 'Cookware Set', 'Knife Set', 'Dinnerware Set'],
    descriptionTemplate: 'High-quality {name} for your kitchen. Made from {material} with {features}.',
    shortDescriptionTemplate: 'Essential {name} for modern kitchens',
    priceRange: { min: 24.99, max: 499.99 },
    weightRange: { min: 1, max: 15 },
    dimensionsRange: { 
      length: { min: 20, max: 60 },
      width: { min: 15, max: 40 },
      height: { min: 10, max: 50 }
    },
    categoryId: '550e8400-e29b-41d4-a716-446655440004', // Home & Kitchen
    featuresPool: [
      'easy to clean', 'durable construction', 'energy efficient', 
      'programmable settings', 'dishwasher safe', 'multiple speed settings'
    ],
    customAttributesPool: [
      { name: 'material', values: ['Stainless Steel', 'Glass', 'Ceramic', 'Plastic', 'Silicone', 'Cast Iron'] },
      { name: 'color', values: colors },
      { name: 'power', values: ['600W', '800W', '1000W', '1200W', '1500W'] },
      { name: 'capacity', values: ['Small', 'Medium', 'Large', 'Extra Large'] }
    ]
  }
];

// Generate a random product
function generateRandomProduct(index) {
  // Pick a random template
  const template = getRandomElement(productTemplates);
  
  // Generate basic product details
  const type = getRandomElement(productTypes);
  const nameSuffix = getRandomElement(template.nameSuffix);
  const material = getRandomElement(materials);
  const name = `${template.namePrefix} ${nameSuffix}`.trim();
  const sku = `SKU-${index.toString().padStart(3, '0')}`;
  const slug = name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
  
  // Generate prices
  const price = parseFloat((Math.random() * (template.priceRange.max - template.priceRange.min) + template.priceRange.min).toFixed(2));
  const hasSalePrice = Math.random() > 0.5;
  const salePrice = hasSalePrice ? parseFloat((price * (0.7 + Math.random() * 0.2)).toFixed(2)) : null;
  
  // Generate random features
  const features = [];
  const featureCount = randomBetween(2, 4);
  for (let i = 0; i < featureCount; i++) {
    const feature = getRandomElement(template.featuresPool);
    if (!features.includes(feature)) {
      features.push(feature);
    }
  }
  
  // Generate description
  let description = template.descriptionTemplate
    .replace('{name}', name)
    .replace('{material}', material)
    .replace('{features}', features.join(', '));
  
  if (description.includes('{occasion}')) {
    description = description.replace('{occasion}', getRandomElement(template.occasionPool));
  }
  
  if (description.includes('{purpose}')) {
    description = description.replace('{purpose}', getRandomElement(template.purposePool));
  }
  
  // Generate custom attributes
  const customAttributes = [];
  const attributeCount = randomBetween(2, 4);
  const attributePool = [...template.customAttributesPool];
  
  for (let i = 0; i < attributeCount && attributePool.length > 0; i++) {
    const attributeIndex = randomBetween(0, attributePool.length - 1);
    const attribute = attributePool[attributeIndex];
    
    customAttributes.push({
      name: attribute.name,
      value: getRandomElement(attribute.values)
    });
    
    // Remove this attribute from the pool to avoid duplicates
    attributePool.splice(attributeIndex, 1);
  }
  
  // Generate random tags
  const productTags = [];
  const tagCount = randomBetween(2, 5);
  for (let i = 0; i < tagCount; i++) {
    const tag = getRandomElement(tags);
    if (!productTags.includes(tag)) {
      productTags.push(tag);
    }
  }
  
  // Generate images
  const mainImage = getRandomElement(imageUrls);
  const galleryCount = randomBetween(2, 4);
  const galleryImages = [];
  for (let i = 0; i < galleryCount; i++) {
    let image;
    do {
      image = getRandomElement(imageUrls);
    } while (image === mainImage || galleryImages.includes(image));
    galleryImages.push(image);
  }
  
  // Generate random dimensions
  const dimensions = {
    length: randomBetween(template.dimensionsRange.length.min, template.dimensionsRange.length.max),
    width: randomBetween(template.dimensionsRange.width.min, template.dimensionsRange.width.max),
    height: randomBetween(template.dimensionsRange.height.min, template.dimensionsRange.height.max)
  };
  
  // Generate random stock info
  const manageStock = Math.random() > 0.3;
  const stockQuantity = manageStock ? randomBetween(0, 100) : 0;
  const stockStatus = stockQuantity > 0 ? 'In Stock' : getRandomElement(stockStatusOptions);
  
  // Create the product object
  return {
    id: `dummy-product-${index.toString().padStart(3, '0')}`,
    sku,
    name,
    slug,
    type,
    description,
    shortDescription: template.shortDescriptionTemplate.replace('{name}', nameSuffix.toLowerCase()),
    price,
    salePrice,
    saleStartDate: hasSalePrice ? randomDate() : null,
    saleEndDate: hasSalePrice ? randomFutureDate() : null,
    stockStatus,
    stockQuantity,
    manageStock,
    weight: parseFloat((Math.random() * (template.weightRange.max - template.weightRange.min) + template.weightRange.min).toFixed(1)),
    dimensions,
    mainImage,
    galleryImages,
    categoryIds: [template.categoryId, getRandomElement(categoryIds)].filter((value, index, self) => self.indexOf(value) === index),
    tags: productTags,
    brandId: getRandomElement(brandIds),
    visibility: getRandomElement(visibilityOptions),
    status: getRandomElement(statusOptions),
    customAttributes,
    createdAt: randomDate(),
    updatedAt: randomDate()
  };
}

// Generate 15 dummy products
const dummyProducts = [];
for (let i = 1; i <= 15; i++) {
  dummyProducts.push(generateRandomProduct(i));
}

// Save to file
const outputPath = path.join(__dirname, '..', 'public', 'dummy-products.json');
fs.writeFileSync(outputPath, JSON.stringify(dummyProducts, null, 2));

console.log(`Generated 15 dummy products and saved to ${outputPath}`);

// Write code to import these products into localStorage
const importScript = `
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
    
    console.log(\`Added \${dummyProducts.length} dummy products to localStorage. Total products: \${combinedProducts.length}\`);
  })
  .catch(error => {
    console.error('Error importing dummy products:', error);
  });
`;

const importScriptPath = path.join(__dirname, '..', 'public', 'import-dummy-products.js');
fs.writeFileSync(importScriptPath, importScript);

console.log(`Generated import script at ${importScriptPath}`); 