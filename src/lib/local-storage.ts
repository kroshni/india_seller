// Simple local storage implementation for categories and brands
// This is a fallback solution when Cassandra database is not available

import { Category, Brand, Product } from './cassandra';

const CATEGORIES_STORAGE_KEY = 'india_seller_categories';
const BRANDS_STORAGE_KEY = 'india_seller_brands';
const PRODUCTS_STORAGE_KEY = 'india_seller_products';

// ====== CATEGORIES ======

// Save categories to localStorage
export function saveCategories(categories: Category[]): void {
  // Only run in browser
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
    console.log('Categories saved to localStorage:', categories.length);
  } catch (error) {
    console.error('Failed to save categories to localStorage:', error);
  }
}

// Load categories from localStorage
export function loadCategories(): Category[] {
  // Only run in browser
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (!data) return [];
    
    const categories = JSON.parse(data) as Category[];
    console.log('Categories loaded from localStorage:', categories.length);
    return categories;
  } catch (error) {
    console.error('Failed to load categories from localStorage:', error);
    return [];
  }
}

// Add a new category to localStorage
export function addCategory(category: Category): void {
  const categories = loadCategories();
  categories.push(category);
  saveCategories(categories);
  console.log('Category added to localStorage:', category.name);
}

// Update a category in localStorage
export function updateCategoryInStorage(id: string, updatedCategory: Partial<Category>): boolean {
  try {
    const categories = loadCategories();
    const index = categories.findIndex(c => c.id === id);
    
    if (index === -1) {
      console.error('Category not found in localStorage, cannot update:', id);
      return false;
    }
    
    // Create the updated category by merging existing with updates
    const updated = {
      ...categories[index],
      ...updatedCategory,
      updatedAt: new Date().toISOString() // Always update the timestamp
    };
    
    // Replace the category in the array
    categories[index] = updated;
    
    // Save back to localStorage
    saveCategories(categories);
    console.log('Category updated in localStorage:', updated.name);
    return true;
  } catch (error) {
    console.error('Error updating category in localStorage:', error);
    return false;
  }
}

// Delete a category from localStorage
export function deleteCategoryFromStorage(id: string): boolean {
  try {
    const categories = loadCategories();
    const index = categories.findIndex(c => c.id === id);
    
    if (index === -1) {
      console.error('Category not found in localStorage, cannot delete:', id);
      return false;
    }
    
    // Remove the category from the array
    const name = categories[index].name;
    categories.splice(index, 1);
    
    // Save back to localStorage
    saveCategories(categories);
    console.log('Category deleted from localStorage:', name);
    return true;
  } catch (error) {
    console.error('Error deleting category from localStorage:', error);
    return false;
  }
}

// ====== BRANDS ======

// Save brands to localStorage
export function saveBrands(brands: Brand[]): void {
  // Only run in browser
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(BRANDS_STORAGE_KEY, JSON.stringify(brands));
    console.log('Brands saved to localStorage:', brands.length);
  } catch (error) {
    console.error('Failed to save brands to localStorage:', error);
  }
}

// Load brands from localStorage
export function loadBrands(): Brand[] {
  // Only run in browser
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(BRANDS_STORAGE_KEY);
    if (!data) return [];
    
    const brands = JSON.parse(data) as Brand[];
    console.log('Brands loaded from localStorage:', brands.length);
    return brands;
  } catch (error) {
    console.error('Failed to load brands from localStorage:', error);
    return [];
  }
}

// Add a new brand to localStorage
export function addBrand(brand: Brand): void {
  const brands = loadBrands();
  brands.push(brand);
  saveBrands(brands);
  console.log('Brand added to localStorage:', brand.name);
}

// Update a brand in localStorage
export function updateBrandInStorage(id: string, updatedBrand: Partial<Brand>): boolean {
  try {
    const brands = loadBrands();
    const index = brands.findIndex(b => b.id === id);
    
    if (index === -1) {
      console.error('Brand not found in localStorage, cannot update:', id);
      return false;
    }
    
    // Create the updated brand by merging existing with updates
    const updated = {
      ...brands[index],
      ...updatedBrand,
      updatedAt: new Date().toISOString() // Always update the timestamp
    };
    
    // Replace the brand in the array
    brands[index] = updated;
    
    // Save back to localStorage
    saveBrands(brands);
    console.log('Brand updated in localStorage:', updated.name);
    return true;
  } catch (error) {
    console.error('Error updating brand in localStorage:', error);
    return false;
  }
}

// Delete a brand from localStorage
export function deleteBrandFromStorage(id: string): boolean {
  try {
    const brands = loadBrands();
    const index = brands.findIndex(b => b.id === id);
    
    if (index === -1) {
      console.error('Brand not found in localStorage, cannot delete:', id);
      return false;
    }
    
    // Remove the brand from the array
    const name = brands[index].name;
    brands.splice(index, 1);
    
    // Save back to localStorage
    saveBrands(brands);
    console.log('Brand deleted from localStorage:', name);
    return true;
  } catch (error) {
    console.error('Error deleting brand in localStorage:', error);
    return false;
  }
}

// ====== PRODUCTS ======

// Save products to localStorage
export function saveProducts(products: Product[]): void {
  // Only run in browser
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    console.log('Products saved to localStorage:', products.length);
  } catch (error) {
    console.error('Failed to save products to localStorage:', error);
  }
}

// Load products from localStorage
export function loadProducts(): Product[] {
  // Only run in browser
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!data) return [];
    
    const products = JSON.parse(data) as Product[];
    console.log('Products loaded from localStorage:', products.length);
    return products;
  } catch (error) {
    console.error('Failed to load products from localStorage:', error);
    return [];
  }
}

// Add a new product to localStorage
export function addProduct(product: Product): void {
  const products = loadProducts();
  products.push(product);
  saveProducts(products);
  console.log('Product added to localStorage:', product.name);
}

// Update a product in localStorage
export function updateProductInStorage(id: string, updatedProduct: Partial<Product>): boolean {
  try {
    const products = loadProducts();
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      console.error('Product not found in localStorage, cannot update:', id);
      return false;
    }
    
    // Create the updated product by merging existing with updates
    const updated = {
      ...products[index],
      ...updatedProduct,
      updatedAt: new Date().toISOString() // Always update the timestamp
    };
    
    // Replace the product in the array
    products[index] = updated;
    
    // Save back to localStorage
    saveProducts(products);
    console.log('Product updated in localStorage:', updated.name);
    return true;
  } catch (error) {
    console.error('Error updating product in localStorage:', error);
    return false;
  }
}

// Delete a product from localStorage
export function deleteProductFromStorage(id: string): boolean {
  try {
    const products = loadProducts();
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      console.error('Product not found in localStorage, cannot delete:', id);
      return false;
    }
    
    // Remove the product from the array
    const name = products[index].name;
    products.splice(index, 1);
    
    // Save back to localStorage
    saveProducts(products);
    console.log('Product deleted from localStorage:', name);
    return true;
  } catch (error) {
    console.error('Error deleting product in localStorage:', error);
    return false;
  }
}

// Delete multiple products from localStorage
export function deleteBulkProductsFromStorage(ids: string[]): { success: boolean; count: number } {
  try {
    let products = loadProducts();
    const initialCount = products.length;
    
    // Filter out products with IDs in the deletion list
    products = products.filter(p => !ids.includes(p.id));
    
    // Calculate how many were actually deleted
    const deletedCount = initialCount - products.length;
    
    // Save back to localStorage
    saveProducts(products);
    console.log(`Deleted ${deletedCount} products from localStorage`);
    
    return { 
      success: true, 
      count: deletedCount
    };
  } catch (error) {
    console.error('Error bulk deleting products from localStorage:', error);
    return { 
      success: false, 
      count: 0 
    };
  }
}

// Update multiple products' status in localStorage
export function updateBulkProductStatusInStorage(ids: string[], status: 'Enabled' | 'Disabled'): { success: boolean; count: number } {
  try {
    const products = loadProducts();
    let updatedCount = 0;
    
    // Update each product in the array
    products.forEach(product => {
      if (ids.includes(product.id)) {
        product.status = status;
        product.updatedAt = new Date().toISOString();
        updatedCount++;
      }
    });
    
    // Save back to localStorage
    saveProducts(products);
    console.log(`Updated status for ${updatedCount} products in localStorage`);
    
    return { 
      success: true, 
      count: updatedCount 
    };
  } catch (error) {
    console.error('Error bulk updating product status in localStorage:', error);
    return { 
      success: false, 
      count: 0 
    };
  }
} 