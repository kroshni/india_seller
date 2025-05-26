// Simple local storage implementation for categories and brands
// This is a fallback solution when Cassandra database is not available

import { Category, Brand } from './cassandra';

const CATEGORIES_STORAGE_KEY = 'india_seller_categories';
const BRANDS_STORAGE_KEY = 'india_seller_brands';

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