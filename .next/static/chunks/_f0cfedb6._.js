(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/lib/api-client/seller-client.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "bulkDeleteSellers": (()=>bulkDeleteSellers),
    "bulkUpdateSellers": (()=>bulkUpdateSellers),
    "bulkUploadSellers": (()=>bulkUploadSellers),
    "createSeller": (()=>createSeller),
    "deleteSeller": (()=>deleteSeller),
    "getFeaturedSellers": (()=>getFeaturedSellers),
    "getPublicSellerDetails": (()=>getPublicSellerDetails),
    "getSellerById": (()=>getSellerById),
    "getSellerProductAssignments": (()=>getSellerProductAssignments),
    "getSellers": (()=>getSellers),
    "updateSeller": (()=>updateSeller),
    "updateSellerKycStatus": (()=>updateSellerKycStatus),
    "updateSellerProductAssignments": (()=>updateSellerProductAssignments),
    "updateSellerStatus": (()=>updateSellerStatus),
    "updateSellerTopScorer": (()=>updateSellerTopScorer)
});
async function getSellers(filters = {}) {
    try {
        // Build query string from filters
        const queryParams = new URLSearchParams();
        if (filters.search) queryParams.append('search', filters.search);
        if (filters.status) queryParams.append('status', filters.status);
        if (filters.kycStatus) queryParams.append('kycStatus', filters.kycStatus);
        if (filters.minTopScorer !== undefined) queryParams.append('minTopScorer', filters.minTopScorer.toString());
        if (filters.maxTopScorer !== undefined) queryParams.append('maxTopScorer', filters.maxTopScorer.toString());
        if (filters.page) queryParams.append('page', filters.page.toString());
        if (filters.limit) queryParams.append('limit', filters.limit.toString());
        if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);
        if (filters.sortOrder) queryParams.append('sortOrder', filters.sortOrder);
        const url = `/api/sellers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch sellers: ${response.statusText}`);
        }
        const data = await response.json();
        return {
            data: data.sellers,
            pagination: data.pagination
        };
    } catch (error) {
        console.error('Error fetching sellers:', error);
        return {
            data: [],
            pagination: {
                total: 0,
                currentPage: 1,
                totalPages: 0,
                limit: 10
            }
        };
    }
}
async function getSellerById(id) {
    try {
        const response = await fetch(`/api/sellers/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch seller: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching seller with ID ${id}:`, error);
        throw error;
    }
}
async function createSeller(sellerData) {
    try {
        const response = await fetch('/api/sellers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sellerData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create seller');
        }
        const data = await response.json();
        return data.sellerId;
    } catch (error) {
        console.error('Error creating seller:', error);
        throw error;
    }
}
async function updateSeller(id, sellerData) {
    try {
        const response = await fetch(`/api/sellers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sellerData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update seller');
        }
        return true;
    } catch (error) {
        console.error(`Error updating seller with ID ${id}:`, error);
        return false;
    }
}
async function deleteSeller(id) {
    try {
        const response = await fetch(`/api/sellers/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to delete seller');
        }
        return true;
    } catch (error) {
        console.error(`Error deleting seller with ID ${id}:`, error);
        return false;
    }
}
async function updateSellerStatus(id, status) {
    try {
        const response = await fetch(`/api/sellers/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status
            })
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update seller status');
        }
        return true;
    } catch (error) {
        console.error(`Error updating status for seller with ID ${id}:`, error);
        return false;
    }
}
async function updateSellerKycStatus(id, kycStatus) {
    try {
        const response = await fetch(`/api/sellers/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                kycStatus
            })
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update seller KYC status');
        }
        return true;
    } catch (error) {
        console.error(`Error updating KYC status for seller with ID ${id}:`, error);
        return false;
    }
}
async function updateSellerTopScorer(id, isTopScorer) {
    try {
        const response = await fetch(`/api/sellers/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isTopScorer
            })
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update seller top scorer');
        }
        return true;
    } catch (error) {
        console.error(`Error updating top scorer for seller with ID ${id}:`, error);
        return false;
    }
}
async function bulkUpdateSellers(data) {
    try {
        const response = await fetch('/api/sellers', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to bulk update sellers');
        }
        return true;
    } catch (error) {
        console.error('Error bulk updating sellers:', error);
        return false;
    }
}
async function bulkDeleteSellers(sellerIds) {
    try {
        const response = await fetch('/api/sellers', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sellerIds
            })
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to bulk delete sellers');
        }
        return true;
    } catch (error) {
        console.error('Error bulk deleting sellers:', error);
        return false;
    }
}
async function getSellerProductAssignments(sellerId) {
    try {
        console.log(`[API CLIENT] Getting product assignments for seller ${sellerId}`);
        const response = await fetch(`/api/sellers/${sellerId}/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to get seller product assignments');
        }
        const data = await response.json();
        const productIds = data.productIds || [];
        console.log(`[API CLIENT] Received ${productIds.length} product assignments`);
        return productIds;
    } catch (error) {
        console.error('Error getting seller product assignments:', error);
        throw error;
    }
}
async function updateSellerProductAssignments(sellerId, productIds) {
    try {
        console.log(`[API CLIENT] Updating products for seller ${sellerId}`);
        console.log(`[API CLIENT] Original product IDs (${productIds.length}):`, productIds);
        // Validate that productIds is an array and is not empty
        if (!Array.isArray(productIds)) {
            console.error('[API CLIENT] Product IDs is not an array');
            throw new Error('Product IDs must be an array');
        }
        // Check if we have any products with DUMMY format (from the old code)
        const dummyProductIds = productIds.filter((id)=>id.startsWith('DUMMY-'));
        if (dummyProductIds.length > 0) {
            console.warn(`[API CLIENT] Found ${dummyProductIds.length} dummy-formatted product IDs that won't be saved:`, dummyProductIds);
        }
        // Only send UUIDs that match the expected format
        const validProductIds = [];
        const invalidProductIds = [];
        for (const id of productIds){
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            if (uuidRegex.test(id)) {
                validProductIds.push(id);
            } else {
                invalidProductIds.push(id);
            }
        }
        if (invalidProductIds.length > 0) {
            console.warn(`[API CLIENT] Found ${invalidProductIds.length} invalid UUID format product IDs:`, invalidProductIds);
        }
        // If we have no valid IDs and were trying to assign products, this is probably an error
        if (validProductIds.length === 0 && productIds.length > 0) {
            console.error(`[API CLIENT] No valid UUIDs found in the ${productIds.length} product IDs provided`);
            throw new Error(`No valid UUIDs found in the ${productIds.length} product IDs. Please check that your products have valid UUIDs.`);
        }
        console.log(`[API CLIENT] Sending ${validProductIds.length} valid product IDs to server:`, validProductIds);
        // Send only valid product IDs to the server
        const response = await fetch(`/api/sellers/${sellerId}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productIds: validProductIds,
                originalCount: productIds.length,
                debug: true
            })
        });
        const data = await response.json();
        console.log(`[API CLIENT] Server response:`, data);
        if (!response.ok) {
            const errorMessage = data.error || 'Failed to update seller product assignments';
            console.error(`[API CLIENT] API error (${response.status}):`, errorMessage);
            throw new Error(errorMessage);
        }
        return data.success;
    } catch (error) {
        console.error('[API CLIENT] Error updating seller product assignments:', error);
        throw error;
    }
}
async function getFeaturedSellers() {
    try {
        const response = await fetch('/api/sellers/featured', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch featured sellers: ${response.statusText}`);
        }
        const data = await response.json();
        return data.sellers;
    } catch (error) {
        console.error('Error fetching featured sellers:', error);
        return [];
    }
}
async function getPublicSellerDetails(id) {
    try {
        const response = await fetch(`/api/sellers/${id}/public`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch seller: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching public seller details with ID ${id}:`, error);
        throw error;
    }
}
async function bulkUploadSellers(sellersData) {
    try {
        console.log(`[API CLIENT] Bulk uploading ${sellersData.length} sellers`);
        const response = await fetch('/api/sellers/bulk-upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sellers: sellersData
            })
        });
        const data = await response.json();
        if (!response.ok) {
            const errorMessage = data.error || 'Failed to bulk upload sellers';
            console.error(`[API CLIENT] API error (${response.status}):`, errorMessage);
            throw new Error(errorMessage);
        }
        return data;
    } catch (error) {
        console.error('[API CLIENT] Error bulk uploading sellers:', error);
        throw error;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/cassandra.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Use a safe way to check for browser environment
__turbopack_context__.s({
    "closeClient": (()=>closeClient),
    "getClient": (()=>getClient),
    "initializeDatabase": (()=>initializeDatabase),
    "isDbConnected": (()=>isDbConnected)
});
const isBrowser = "object" !== 'undefined';
// Initialize these variables for both server and client
let client = null;
let isConnected = false;
let connectionAttempted = false;
// Only run this code on the server
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
}
function getClient() {
    return client;
}
async function initializeDatabase() {
    if ("TURBOPACK compile-time truthy", 1) {
        console.log('Cannot initialize database in browser environment');
        return false;
    }
    "TURBOPACK unreachable";
}
function isDbConnected() {
    return isConnected;
}
async function closeClient() {
    if (client) {
        try {
            await client.shutdown();
            console.log('Cassandra client shut down');
        } catch (error) {
            console.error('Error shutting down Cassandra client:', error);
        } finally{
            client = null;
            isConnected = false;
            connectionAttempted = false;
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/local-storage.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Simple local storage implementation for categories and brands
// This is a fallback solution when Cassandra database is not available
__turbopack_context__.s({
    "addBrand": (()=>addBrand),
    "addCategory": (()=>addCategory),
    "addProduct": (()=>addProduct),
    "deleteBrandFromStorage": (()=>deleteBrandFromStorage),
    "deleteBulkProductsFromStorage": (()=>deleteBulkProductsFromStorage),
    "deleteCategoryFromStorage": (()=>deleteCategoryFromStorage),
    "deleteProductFromStorage": (()=>deleteProductFromStorage),
    "loadBrands": (()=>loadBrands),
    "loadCategories": (()=>loadCategories),
    "loadProducts": (()=>loadProducts),
    "saveBrands": (()=>saveBrands),
    "saveCategories": (()=>saveCategories),
    "saveProducts": (()=>saveProducts),
    "updateBrandInStorage": (()=>updateBrandInStorage),
    "updateBulkProductStatusInStorage": (()=>updateBulkProductStatusInStorage),
    "updateCategoryInStorage": (()=>updateCategoryInStorage),
    "updateProductInStorage": (()=>updateProductInStorage)
});
const CATEGORIES_STORAGE_KEY = 'india_seller_categories';
const BRANDS_STORAGE_KEY = 'india_seller_brands';
const PRODUCTS_STORAGE_KEY = 'india_seller_products';
function saveCategories(categories) {
    // Only run in browser
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    try {
        localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
        console.log('Categories saved to localStorage:', categories.length);
    } catch (error) {
        console.error('Failed to save categories to localStorage:', error);
    }
}
function loadCategories() {
    // Only run in browser
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    try {
        const data = localStorage.getItem(CATEGORIES_STORAGE_KEY);
        if (!data) return [];
        const categories = JSON.parse(data);
        console.log('Categories loaded from localStorage:', categories.length);
        return categories;
    } catch (error) {
        console.error('Failed to load categories from localStorage:', error);
        return [];
    }
}
function addCategory(category) {
    const categories = loadCategories();
    categories.push(category);
    saveCategories(categories);
    console.log('Category added to localStorage:', category.name);
}
function updateCategoryInStorage(id, updatedCategory) {
    try {
        const categories = loadCategories();
        const index = categories.findIndex((c)=>c.id === id);
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
function deleteCategoryFromStorage(id) {
    try {
        const categories = loadCategories();
        const index = categories.findIndex((c)=>c.id === id);
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
function saveBrands(brands) {
    // Only run in browser
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    try {
        localStorage.setItem(BRANDS_STORAGE_KEY, JSON.stringify(brands));
        console.log('Brands saved to localStorage:', brands.length);
    } catch (error) {
        console.error('Failed to save brands to localStorage:', error);
    }
}
function loadBrands() {
    // Only run in browser
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    try {
        const data = localStorage.getItem(BRANDS_STORAGE_KEY);
        if (!data) return [];
        const brands = JSON.parse(data);
        console.log('Brands loaded from localStorage:', brands.length);
        return brands;
    } catch (error) {
        console.error('Failed to load brands from localStorage:', error);
        return [];
    }
}
function addBrand(brand) {
    const brands = loadBrands();
    brands.push(brand);
    saveBrands(brands);
    console.log('Brand added to localStorage:', brand.name);
}
function updateBrandInStorage(id, updatedBrand) {
    try {
        const brands = loadBrands();
        const index = brands.findIndex((b)=>b.id === id);
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
function deleteBrandFromStorage(id) {
    try {
        const brands = loadBrands();
        const index = brands.findIndex((b)=>b.id === id);
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
function saveProducts(products) {
    // Only run in browser
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    try {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
        console.log('Products saved to localStorage:', products.length);
    } catch (error) {
        console.error('Failed to save products to localStorage:', error);
    }
}
function loadProducts() {
    // Only run in browser
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    try {
        const data = localStorage.getItem(PRODUCTS_STORAGE_KEY);
        if (!data) return [];
        const products = JSON.parse(data);
        console.log('Products loaded from localStorage:', products.length);
        return products;
    } catch (error) {
        console.error('Failed to load products from localStorage:', error);
        return [];
    }
}
function addProduct(product) {
    const products = loadProducts();
    products.push(product);
    saveProducts(products);
    console.log('Product added to localStorage:', product.name);
}
function updateProductInStorage(id, updatedProduct) {
    try {
        const products = loadProducts();
        const index = products.findIndex((p)=>p.id === id);
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
function deleteProductFromStorage(id) {
    try {
        const products = loadProducts();
        const index = products.findIndex((p)=>p.id === id);
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
function deleteBulkProductsFromStorage(ids) {
    try {
        let products = loadProducts();
        const initialCount = products.length;
        // Filter out products with IDs in the deletion list
        products = products.filter((p)=>!ids.includes(p.id));
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
function updateBulkProductStatusInStorage(ids, status) {
    try {
        const products = loadProducts();
        let updatedCount = 0;
        // Update each product in the array
        products.forEach((product)=>{
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/services/product-service.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "bulkDeleteProducts": (()=>bulkDeleteProducts),
    "bulkUpdateProductStatus": (()=>bulkUpdateProductStatus),
    "createProduct": (()=>createProduct),
    "debugProducts": (()=>debugProducts),
    "deleteProduct": (()=>deleteProduct),
    "duplicateProduct": (()=>duplicateProduct),
    "getAllProducts": (()=>getAllProducts),
    "getProductById": (()=>getProductById),
    "isSkuUnique": (()=>isSkuUnique),
    "updateProduct": (()=>updateProduct)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/v4.js [app-client] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cassandra.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/local-storage.ts [app-client] (ecmascript)");
;
;
;
// Sample mock data for products
const mockProducts = [];
// Initialize mock data
function initializeMockData() {
    // Only run in browser
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    console.log('Checking if mock data needs to be initialized in localStorage');
    try {
        const storedProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadProducts"])();
        if (!storedProducts || storedProducts.length === 0) {
            console.log('No products found in localStorage, initializing with mock data');
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveProducts"])(mockProducts);
            console.log('Saved', mockProducts.length, 'mock products to localStorage');
        } else {
            console.log('Found', storedProducts.length, 'products in localStorage, skipping initialization');
        }
    } catch (error) {
        console.error('Error initializing mock data:', error);
    }
}
// Call initialization on module load in browser environment
if ("TURBOPACK compile-time truthy", 1) {
    initializeMockData();
}
// Environment check for debug mode
const DEBUG = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.DEBUG_PRODUCTS === 'true';
// Helper function to log debugging information
function log(...args) {
    if (DEBUG) {
        console.log('[ProductService]', ...args);
    }
}
// Helper to check if we should use mock data
function shouldUseMockData() {
    // Always check connection status on each request
    const connected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDbConnected"])();
    const useMock = !connected;
    if (useMock) {
        log('Database not connected, using mock data');
    }
    return useMock;
}
// Helper to generate a slug from a name
function generateSlug(name) {
    return name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}
async function getAllProducts(options = {}) {
    log('Getting all products with options:', options);
    // Set default values for pagination
    const page = options.page || 1;
    const limit = options.limit || 10;
    if (shouldUseMockData()) {
        log('Using mock data');
        // Try to load from localStorage first (for client-side)
        let products = [];
        if ("TURBOPACK compile-time truthy", 1) {
            products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadProducts"])();
        } else {
            products = [
                ...mockProducts
            ];
        }
        // Apply filters
        if (options.search) {
            const searchLower = options.search.toLowerCase();
            products = products.filter((product)=>product.name.toLowerCase().includes(searchLower) || product.sku.toLowerCase().includes(searchLower));
        }
        if (options.productType) {
            products = products.filter((product)=>product.type === options.productType);
        }
        if (options.status) {
            products = products.filter((product)=>product.status === options.status);
        }
        if (options.categoryId) {
            products = products.filter((product)=>product.categoryIds.includes(options.categoryId));
        }
        if (options.brandId) {
            products = products.filter((product)=>product.brandId === options.brandId);
        }
        // Apply sorting
        if (options.sortBy) {
            products.sort((a, b)=>{
                let valueA, valueB;
                switch(options.sortBy){
                    case 'name':
                        valueA = a.name;
                        valueB = b.name;
                        break;
                    case 'price':
                        valueA = a.price;
                        valueB = b.price;
                        break;
                    case 'status':
                        valueA = a.status;
                        valueB = b.status;
                        break;
                    case 'createdAt':
                    default:
                        valueA = new Date(a.createdAt).getTime();
                        valueB = new Date(b.createdAt).getTime();
                }
                // Check the sort order and compare values
                if (options.sortOrder === 'desc') {
                    return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
                } else {
                    return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
                }
            });
        }
        // Calculate pagination values
        const total = products.length;
        const totalPages = Math.ceil(total / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedProducts = products.slice(startIndex, endIndex);
        return {
            products: paginatedProducts,
            total,
            page,
            totalPages
        };
    }
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            log('No database client available, falling back to mock data');
            return getAllProducts(options); // This will use the mock data branch
        }
        // This is a simplified query for demonstration purposes
        // A real implementation would need to build a more complex query with filtering
        let query = 'SELECT * FROM products';
        const params = [];
        // In a real implementation, you would add WHERE clauses for the filters
        // and handle sorting and pagination server-side
        const result = await client.execute(query, params);
        let products = result.rows.map((row)=>({
                id: row.id.toString(),
                sku: row.sku,
                name: row.name,
                slug: row.slug,
                type: row.type,
                description: row.description,
                shortDescription: row.short_description,
                price: row.price,
                salePrice: row.sale_price,
                saleStartDate: row.sale_start_date?.toISOString(),
                saleEndDate: row.sale_end_date?.toISOString(),
                stockStatus: row.stock_status,
                stockQuantity: row.stock_quantity,
                manageStock: row.manage_stock,
                weight: row.weight,
                dimensions: row.dimensions,
                mainImage: row.main_image,
                galleryImages: row.gallery_images,
                categoryIds: row.category_ids?.map((id)=>id.toString()),
                tags: row.tags,
                brandId: row.brand_id?.toString(),
                visibility: row.visibility,
                status: row.status,
                customAttributes: Object.entries(row.custom_attributes || {}).map(([name, value])=>({
                        name,
                        value: value
                    })),
                sellerId: row.seller_id?.toString(),
                createdAt: row.created_at?.toISOString() || new Date().toISOString(),
                updatedAt: row.updated_at?.toISOString() || new Date().toISOString()
            }));
        // Apply filters
        if (options.search) {
            const searchLower = options.search.toLowerCase();
            products = products.filter((product)=>product.name.toLowerCase().includes(searchLower) || product.sku.toLowerCase().includes(searchLower));
        }
        if (options.productType) {
            products = products.filter((product)=>product.type === options.productType);
        }
        if (options.status) {
            products = products.filter((product)=>product.status === options.status);
        }
        if (options.categoryId) {
            products = products.filter((product)=>product.categoryIds.includes(options.categoryId));
        }
        if (options.brandId) {
            products = products.filter((product)=>product.brandId === options.brandId);
        }
        // Apply sorting
        if (options.sortBy) {
            products.sort((a, b)=>{
                let valueA, valueB;
                switch(options.sortBy){
                    case 'name':
                        valueA = a.name;
                        valueB = b.name;
                        break;
                    case 'price':
                        valueA = a.price;
                        valueB = b.price;
                        break;
                    case 'status':
                        valueA = a.status;
                        valueB = b.status;
                        break;
                    case 'createdAt':
                    default:
                        valueA = new Date(a.createdAt).getTime();
                        valueB = new Date(b.createdAt).getTime();
                }
                // Check the sort order and compare values
                if (options.sortOrder === 'desc') {
                    return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
                } else {
                    return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
                }
            });
        }
        // Calculate pagination values
        const total = products.length;
        const totalPages = Math.ceil(total / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedProducts = products.slice(startIndex, endIndex);
        return {
            products: paginatedProducts,
            total,
            page,
            totalPages
        };
    } catch (error) {
        log('Error getting all products:', error);
        log('Falling back to mock data');
        return getAllProducts(options); // This will use the mock data branch
    }
}
async function debugProducts() {
    // Log mock products
    console.log('Mock products:', mockProducts);
    // Log localStorage products if in browser
    if ("TURBOPACK compile-time truthy", 1) {
        const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadProducts"])();
        console.log('localStorage products:', products);
    }
    return {
        mockProducts: mockProducts.length,
        localStorage: ("TURBOPACK compile-time truthy", 1) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadProducts"])().length : ("TURBOPACK unreachable", undefined)
    };
}
async function getProductById(id) {
    console.log(`Getting product by ID: ${id}`);
    if (shouldUseMockData()) {
        console.log('Using mock data');
        // Try to load from localStorage first (for client-side)
        if ("TURBOPACK compile-time truthy", 1) {
            const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadProducts"])();
            console.log('Products in localStorage:', products.length);
            const product = products.find((p)=>p.id === id);
            console.log('Found product in localStorage:', product ? 'Yes' : 'No');
            return product || null;
        }
        "TURBOPACK unreachable";
        const product = undefined;
    }
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            log('No database client available, falling back to mock data');
            if ("TURBOPACK compile-time truthy", 1) {
                const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadProducts"])();
                const product = products.find((p)=>p.id === id);
                return product || null;
            }
            "TURBOPACK unreachable";
            const product = undefined;
        }
        const result = await client.execute('SELECT * FROM products WHERE id = ?', [
            id
        ], {
            prepare: true
        });
        if (result.rows.length === 0) {
            return null;
        }
        const row = result.rows[0];
        return {
            id: row.id.toString(),
            sku: row.sku,
            name: row.name,
            slug: row.slug,
            type: row.type,
            description: row.description,
            shortDescription: row.short_description,
            price: row.price,
            salePrice: row.sale_price,
            saleStartDate: row.sale_start_date?.toISOString(),
            saleEndDate: row.sale_end_date?.toISOString(),
            stockStatus: row.stock_status,
            stockQuantity: row.stock_quantity,
            manageStock: row.manage_stock,
            weight: row.weight,
            dimensions: row.dimensions,
            mainImage: row.main_image,
            galleryImages: row.gallery_images,
            categoryIds: row.category_ids?.map((id)=>id.toString()),
            tags: row.tags,
            brandId: row.brand_id?.toString(),
            visibility: row.visibility,
            status: row.status,
            customAttributes: Object.entries(row.custom_attributes || {}).map(([name, value])=>({
                    name,
                    value: value
                })),
            sellerId: row.seller_id?.toString(),
            createdAt: row.created_at?.toISOString() || new Date().toISOString(),
            updatedAt: row.updated_at?.toISOString() || new Date().toISOString()
        };
    } catch (error) {
        log('Error getting product by ID:', error);
        log('Falling back to mock data');
        if ("TURBOPACK compile-time truthy", 1) {
            const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadProducts"])();
            const product = products.find((p)=>p.id === id);
            return product || null;
        }
        "TURBOPACK unreachable";
        const product = undefined;
    }
}
async function createProduct(data) {
    log('Creating new product:', data);
    const now = new Date();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
    const slug = data.slug || generateSlug(data.name);
    const newProduct = {
        id,
        sku: data.sku,
        name: data.name,
        slug,
        type: data.type,
        description: data.description,
        shortDescription: data.shortDescription,
        price: data.price,
        salePrice: data.salePrice,
        saleStartDate: data.saleStartDate,
        saleEndDate: data.saleEndDate,
        stockStatus: data.stockStatus,
        stockQuantity: data.stockQuantity,
        manageStock: data.manageStock,
        weight: data.weight,
        dimensions: data.dimensions,
        mainImage: data.mainImage,
        galleryImages: data.galleryImages || [],
        categoryIds: data.categoryIds || [],
        tags: data.tags || [],
        brandId: data.brandId,
        visibility: data.visibility,
        status: data.status,
        customAttributes: data.customAttributes || [],
        sellerId: data.sellerId,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString()
    };
    if (shouldUseMockData()) {
        log('Using mock data for product creation');
        // Add to localStorage for persistence (client-side)
        if ("TURBOPACK compile-time truthy", 1) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addProduct"])(newProduct);
        }
        return newProduct;
    }
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            log('No database client available, falling back to mock data');
            // Add to localStorage for persistence (client-side)
            if ("TURBOPACK compile-time truthy", 1) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addProduct"])(newProduct);
            }
            return newProduct;
        }
        console.log('Saving product to database:', newProduct);
        // Convert custom attributes to a map for Cassandra
        const customAttributesMap = {};
        if ("TURBOPACK compile-time truthy", 1) {
            newProduct.customAttributes.forEach((attr)=>{
                customAttributesMap[attr.name] = attr.value;
            });
        }
        // Convert dimensions to a map for Cassandra
        const dimensionsMap = {};
        if (newProduct.dimensions) {
            dimensionsMap.length = newProduct.dimensions.length;
            dimensionsMap.width = newProduct.dimensions.width;
            dimensionsMap.height = newProduct.dimensions.height;
        }
        await client.execute(`INSERT INTO products (
        id, sku, name, slug, type, description, short_description, price, 
        sale_price, sale_start_date, sale_end_date, stock_status, stock_quantity, 
        manage_stock, weight, dimensions, main_image, gallery_images, 
        category_ids, tags, brand_id, visibility, status, 
        custom_attributes, seller_id, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            id,
            newProduct.sku,
            newProduct.name,
            slug,
            newProduct.type,
            newProduct.description,
            newProduct.shortDescription,
            newProduct.price,
            newProduct.salePrice || null,
            newProduct.saleStartDate ? new Date(newProduct.saleStartDate) : null,
            newProduct.saleEndDate ? new Date(newProduct.saleEndDate) : null,
            newProduct.stockStatus,
            newProduct.stockQuantity || 0,
            newProduct.manageStock,
            newProduct.weight || null,
            Object.keys(dimensionsMap).length > 0 ? dimensionsMap : null,
            newProduct.mainImage || null,
            newProduct.galleryImages || null,
            newProduct.categoryIds || null,
            newProduct.tags || null,
            newProduct.brandId || null,
            newProduct.visibility,
            newProduct.status,
            Object.keys(customAttributesMap).length > 0 ? customAttributesMap : null,
            newProduct.sellerId || null,
            now,
            now
        ], {
            prepare: true
        });
        // Create category relationships
        if (newProduct.categoryIds && newProduct.categoryIds.length > 0) {
            for (const categoryId of newProduct.categoryIds){
                await client.execute('INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)', [
                    id,
                    categoryId
                ], {
                    prepare: true
                });
            }
        }
        // Create tag relationships
        if (newProduct.tags && newProduct.tags.length > 0) {
            for (const tag of newProduct.tags){
                await client.execute('INSERT INTO product_tags (tag, product_id) VALUES (?, ?)', [
                    tag,
                    id
                ], {
                    prepare: true
                });
            }
        }
        console.log('Product saved successfully to database');
        return newProduct;
    } catch (error) {
        console.error('Error creating product in database:', error);
        log('Falling back to mock data');
        // Add to localStorage for persistence (client-side)
        if ("TURBOPACK compile-time truthy", 1) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addProduct"])(newProduct);
        }
        return newProduct;
    }
}
async function updateProduct(id, data) {
    log(`Updating product ${id} with:`, data);
    if (shouldUseMockData()) {
        log('Using mock data');
        // Try to load from localStorage first (client-side)
        if ("TURBOPACK compile-time truthy", 1) {
            const success = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateProductInStorage"])(id, data);
            if (success) {
                const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadProducts"])();
                return products.find((p)=>p.id === id) || null;
            }
            return null;
        }
        "TURBOPACK unreachable";
        // Server-side mock data handling
        const index = undefined;
        const now = undefined;
        const updatedProduct = undefined;
    }
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            log('No database client available, falling back to mock data');
            // Try to load from localStorage first (client-side)
            if ("TURBOPACK compile-time truthy", 1) {
                const success = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateProductInStorage"])(id, data);
                if (success) {
                    const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadProducts"])();
                    return products.find((p)=>p.id === id) || null;
                }
                return null;
            }
            "TURBOPACK unreachable";
            // Server-side mock data handling
            const index = undefined;
            const now = undefined;
            const updatedProduct = undefined;
        }
        // First check if the product exists
        const existing = await getProductById(id);
        if (!existing) {
            return null;
        }
        const now = new Date();
        // Construct query dynamically based on provided fields
        let query = 'UPDATE products SET updated_at = ?';
        const params = [
            now
        ];
        // Add each field to the query if it's provided
        if (data.sku !== undefined) {
            query += ', sku = ?';
            params.push(data.sku);
        }
        if (data.name !== undefined) {
            query += ', name = ?';
            params.push(data.name);
        }
        if (data.slug !== undefined) {
            query += ', slug = ?';
            params.push(data.slug);
        } else if (data.name && !data.slug) {
            // Auto-update slug if name changes but slug is not provided
            const newSlug = generateSlug(data.name);
            query += ', slug = ?';
            params.push(newSlug);
        }
        if (data.type !== undefined) {
            query += ', type = ?';
            params.push(data.type);
        }
        if (data.description !== undefined) {
            query += ', description = ?';
            params.push(data.description);
        }
        if (data.shortDescription !== undefined) {
            query += ', short_description = ?';
            params.push(data.shortDescription);
        }
        if (data.price !== undefined) {
            query += ', price = ?';
            params.push(data.price);
        }
        if (data.salePrice !== undefined) {
            query += ', sale_price = ?';
            params.push(data.salePrice);
        }
        if (data.saleStartDate !== undefined) {
            query += ', sale_start_date = ?';
            params.push(data.saleStartDate ? new Date(data.saleStartDate) : null);
        }
        if (data.saleEndDate !== undefined) {
            query += ', sale_end_date = ?';
            params.push(data.saleEndDate ? new Date(data.saleEndDate) : null);
        }
        if (data.stockStatus !== undefined) {
            query += ', stock_status = ?';
            params.push(data.stockStatus);
        }
        if (data.stockQuantity !== undefined) {
            query += ', stock_quantity = ?';
            params.push(data.stockQuantity);
        }
        if (data.manageStock !== undefined) {
            query += ', manage_stock = ?';
            params.push(data.manageStock);
        }
        if (data.weight !== undefined) {
            query += ', weight = ?';
            params.push(data.weight);
        }
        if (data.dimensions !== undefined) {
            query += ', dimensions = ?';
            const dimensionsMap = {
                length: data.dimensions.length,
                width: data.dimensions.width,
                height: data.dimensions.height
            };
            params.push(dimensionsMap);
        }
        if (data.mainImage !== undefined) {
            query += ', main_image = ?';
            params.push(data.mainImage);
        }
        if (data.galleryImages !== undefined) {
            query += ', gallery_images = ?';
            params.push(data.galleryImages);
        }
        if (data.categoryIds !== undefined) {
            query += ', category_ids = ?';
            params.push(data.categoryIds);
        // Update category relationships
        // This would require additional code to handle the many-to-many relationship
        }
        if (data.tags !== undefined) {
            query += ', tags = ?';
            params.push(data.tags);
        // Update tag relationships
        // This would require additional code to handle the many-to-many relationship
        }
        if (data.brandId !== undefined) {
            query += ', brand_id = ?';
            params.push(data.brandId);
        }
        if (data.visibility !== undefined) {
            query += ', visibility = ?';
            params.push(data.visibility);
        }
        if (data.status !== undefined) {
            query += ', status = ?';
            params.push(data.status);
        }
        if (data.customAttributes !== undefined) {
            query += ', custom_attributes = ?';
            const customAttributesMap = {};
            data.customAttributes.forEach((attr)=>{
                customAttributesMap[attr.name] = attr.value;
            });
            params.push(customAttributesMap);
        }
        if (data.sellerId !== undefined) {
            query += ', seller_id = ?';
            params.push(data.sellerId);
        }
        query += ' WHERE id = ?';
        params.push(id);
        await client.execute(query, params, {
            prepare: true
        });
        // Return the updated product
        return {
            ...existing,
            ...data,
            updatedAt: now.toISOString()
        };
    } catch (error) {
        log('Error updating product:', error);
        log('Falling back to mock data');
        // Try to load from localStorage first (client-side)
        if ("TURBOPACK compile-time truthy", 1) {
            const success = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateProductInStorage"])(id, data);
            if (success) {
                const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadProducts"])();
                return products.find((p)=>p.id === id) || null;
            }
            return null;
        }
        "TURBOPACK unreachable";
        // Server-side mock data handling
        const index = undefined;
        const now = undefined;
        const updatedProduct = undefined;
    }
}
async function deleteProduct(id) {
    log(`Deleting product ${id}`);
    if (shouldUseMockData()) {
        log('Using mock data');
        // Try to delete from localStorage first (client-side)
        if ("TURBOPACK compile-time truthy", 1) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteProductFromStorage"])(id);
        }
        "TURBOPACK unreachable";
        // Server-side mock data handling
        const index = undefined;
    }
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            log('No database client available, falling back to mock data');
            // Try to delete from localStorage first (client-side)
            if ("TURBOPACK compile-time truthy", 1) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteProductFromStorage"])(id);
            }
            "TURBOPACK unreachable";
            // Server-side mock data handling
            const index = undefined;
        }
        // First check if the product exists
        const existing = await getProductById(id);
        if (!existing) {
            return false;
        }
        // Delete from product_categories table
        await client.execute('DELETE FROM product_categories WHERE product_id = ?', [
            id
        ], {
            prepare: true
        });
        // Delete from product_tags table
        if (existing.tags && existing.tags.length > 0) {
            for (const tag of existing.tags){
                await client.execute('DELETE FROM product_tags WHERE tag = ? AND product_id = ?', [
                    tag,
                    id
                ], {
                    prepare: true
                });
            }
        }
        // Delete from products table
        await client.execute('DELETE FROM products WHERE id = ?', [
            id
        ], {
            prepare: true
        });
        return true;
    } catch (error) {
        log('Error deleting product:', error);
        log('Falling back to mock data');
        // Try to delete from localStorage first (client-side)
        if ("TURBOPACK compile-time truthy", 1) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteProductFromStorage"])(id);
        }
        "TURBOPACK unreachable";
        // Server-side mock data handling
        const index = undefined;
    }
}
async function bulkDeleteProducts(ids) {
    log(`Bulk deleting products: ${ids.length} items`);
    if (shouldUseMockData()) {
        log('Using mock data');
        // Try to delete from localStorage first (client-side)
        if ("TURBOPACK compile-time truthy", 1) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteBulkProductsFromStorage"])(ids);
        }
        "TURBOPACK unreachable";
        // Server-side mock data handling
        const initialCount = undefined;
        const filteredProducts = undefined;
        const deletedCount = undefined;
    }
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            log('No database client available, falling back to mock data');
            // Try to delete from localStorage first (client-side)
            if ("TURBOPACK compile-time truthy", 1) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteBulkProductsFromStorage"])(ids);
            }
            "TURBOPACK unreachable";
            // Server-side mock data handling
            const initialCount = undefined;
            const filteredProducts = undefined;
            const deletedCount = undefined;
        }
        let successCount = 0;
        // Process each product to delete
        for (const id of ids){
            try {
                // First check if the product exists
                const existing = await getProductById(id);
                if (!existing) continue;
                // Delete from product_categories table
                await client.execute('DELETE FROM product_categories WHERE product_id = ?', [
                    id
                ], {
                    prepare: true
                });
                // Delete from product_tags table
                if (existing.tags && existing.tags.length > 0) {
                    for (const tag of existing.tags){
                        await client.execute('DELETE FROM product_tags WHERE tag = ? AND product_id = ?', [
                            tag,
                            id
                        ], {
                            prepare: true
                        });
                    }
                }
                // Delete from products table
                await client.execute('DELETE FROM products WHERE id = ?', [
                    id
                ], {
                    prepare: true
                });
                successCount++;
            } catch (err) {
                log(`Error deleting product ${id}:`, err);
            // Continue with next product
            }
        }
        return {
            success: successCount > 0,
            count: successCount
        };
    } catch (error) {
        log('Error in bulk delete products:', error);
        log('Falling back to mock data');
        // Try to delete from localStorage first (client-side)
        if ("TURBOPACK compile-time truthy", 1) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteBulkProductsFromStorage"])(ids);
        }
        "TURBOPACK unreachable";
        // Server-side mock data handling
        const initialCount = undefined;
        const filteredProducts = undefined;
        const deletedCount = undefined;
    }
}
async function bulkUpdateProductStatus(ids, status) {
    log(`Bulk updating product status to ${status} for ${ids.length} products`);
    if (shouldUseMockData()) {
        log('Using mock data');
        // Try to update in localStorage first (client-side)
        if ("TURBOPACK compile-time truthy", 1) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateBulkProductStatusInStorage"])(ids, status);
        }
        "TURBOPACK unreachable";
        // Server-side mock data handling
        let updatedCount;
    }
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            log('No database client available, falling back to mock data');
            // Try to update in localStorage first (client-side)
            if ("TURBOPACK compile-time truthy", 1) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateBulkProductStatusInStorage"])(ids, status);
            }
            "TURBOPACK unreachable";
            // Server-side mock data handling
            let updatedCount;
        }
        let successCount = 0;
        const now = new Date();
        // Process each product to update
        for (const id of ids){
            try {
                await client.execute('UPDATE products SET status = ?, updated_at = ? WHERE id = ?', [
                    status,
                    now,
                    id
                ], {
                    prepare: true
                });
                successCount++;
            } catch (err) {
                log(`Error updating product ${id} status:`, err);
            // Continue with next product
            }
        }
        return {
            success: successCount > 0,
            count: successCount
        };
    } catch (error) {
        log('Error in bulk update product status:', error);
        log('Falling back to mock data');
        // Try to update in localStorage first (client-side)
        if ("TURBOPACK compile-time truthy", 1) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateBulkProductStatusInStorage"])(ids, status);
        }
        "TURBOPACK unreachable";
        // Server-side mock data handling
        let updatedCount;
    }
}
async function isSkuUnique(sku, excludeProductId) {
    log(`Checking if SKU "${sku}" is unique${excludeProductId ? ` (excluding product ${excludeProductId})` : ''}`);
    if (shouldUseMockData()) {
        log('Using mock data');
        // Try to check in localStorage first (client-side)
        if ("TURBOPACK compile-time truthy", 1) {
            const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadProducts"])();
            return !products.some((p)=>p.sku === sku && p.id !== excludeProductId);
        }
        "TURBOPACK unreachable";
    }
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            log('No database client available, falling back to mock data');
            // Try to check in localStorage first (client-side)
            if ("TURBOPACK compile-time truthy", 1) {
                const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadProducts"])();
                return !products.some((p)=>p.sku === sku && p.id !== excludeProductId);
            }
            "TURBOPACK unreachable";
        }
        const result = await client.execute('SELECT id FROM products WHERE sku = ?', [
            sku
        ], {
            prepare: true
        });
        if (result.rows.length === 0) {
            return true; // SKU doesn't exist, so it's unique
        }
        // If excluding a product, check if the found SKU belongs to the excluded product
        if (excludeProductId && result.rows.length === 1) {
            const foundId = result.rows[0].id.toString();
            return foundId === excludeProductId;
        }
        return false; // SKU exists
    } catch (error) {
        log('Error checking SKU uniqueness:', error);
        log('Falling back to mock data');
        // Try to check in localStorage first (client-side)
        if ("TURBOPACK compile-time truthy", 1) {
            const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadProducts"])();
            return !products.some((p)=>p.sku === sku && p.id !== excludeProductId);
        }
        "TURBOPACK unreachable";
    }
}
async function duplicateProduct(id, newSku) {
    log(`Duplicating product ${id} with new SKU ${newSku}`);
    // First check if the new SKU is unique
    const isUnique = await isSkuUnique(newSku);
    if (!isUnique) {
        log(`SKU ${newSku} already exists, cannot duplicate product`);
        throw new Error(`SKU ${newSku} already exists`);
    }
    // Get the product to duplicate
    const product = await getProductById(id);
    if (!product) {
        log(`Product ${id} not found, cannot duplicate`);
        return null;
    }
    // Create a new product based on the existing one
    const duplicateData = {
        ...product,
        sku: newSku,
        name: `${product.name} (Copy)`,
        slug: `${product.slug}-copy`,
        status: 'Disabled'
    };
    // Remove properties that shouldn't be duplicated
    delete duplicateData.id;
    delete duplicateData.createdAt;
    delete duplicateData.updatedAt;
    // Create the duplicated product
    return createProduct(duplicateData);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/dashboard/sellers/products/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>SellerProductsPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2f$seller$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-client/seller-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$product$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/product-service.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function SellerProductsPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [sellersWithProducts, setSellersWithProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Pagination state
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [totalPages, setTotalPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [pageLimit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10);
    // Fetch data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SellerProductsPage.useEffect": ()=>{
            const fetchData = {
                "SellerProductsPage.useEffect.fetchData": async ()=>{
                    setIsLoading(true);
                    setError(null);
                    try {
                        // Get all sellers first
                        const page = searchParams.get('page') ? parseInt(searchParams.get('page')) : 1;
                        const sellersResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2f$seller$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSellers"])({
                            page,
                            limit: pageLimit
                        });
                        const sellers = sellersResponse.data;
                        setCurrentPage(sellersResponse.pagination.currentPage);
                        setTotalPages(sellersResponse.pagination.totalPages);
                        // Get all products to have them in memory
                        const productsResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$product$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllProducts"])({
                            limit: 1000
                        });
                        const allProducts = productsResponse.products;
                        // Get product assignments for each seller
                        const sellersData = await Promise.all(sellers.map({
                            "SellerProductsPage.useEffect.fetchData": async (seller)=>{
                                try {
                                    const productIds = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2f$seller$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSellerProductAssignments"])(seller.id);
                                    const sellerProducts = productIds.map({
                                        "SellerProductsPage.useEffect.fetchData.sellerProducts": (id)=>allProducts.find({
                                                "SellerProductsPage.useEffect.fetchData.sellerProducts": (product)=>product.id === id
                                            }["SellerProductsPage.useEffect.fetchData.sellerProducts"])
                                    }["SellerProductsPage.useEffect.fetchData.sellerProducts"]).filter(Boolean);
                                    return {
                                        id: seller.id,
                                        name: seller.name,
                                        productIds,
                                        products: sellerProducts
                                    };
                                } catch (err) {
                                    console.error(`Error fetching products for seller ${seller.id}:`, err);
                                    return {
                                        id: seller.id,
                                        name: seller.name,
                                        productIds: [],
                                        products: []
                                    };
                                }
                            }
                        }["SellerProductsPage.useEffect.fetchData"]));
                        setSellersWithProducts(sellersData);
                    } catch (err) {
                        console.error('Error fetching data:', err);
                        setError('Failed to load sellers and products. Please try again.');
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["SellerProductsPage.useEffect.fetchData"];
            fetchData();
        }
    }["SellerProductsPage.useEffect"], [
        searchParams,
        pageLimit
    ]);
    // Handle pagination
    const goToPage = (page)=>{
        if (page < 1 || page > totalPages) return;
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`/dashboard/sellers/products?${params.toString()}`);
    };
    // Format currency
    const formatCurrency = (amount)=>{
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-gray-900",
                        children: "Seller Products"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/dashboard/sellers",
                        className: "px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50",
                        children: "Back to Sellers"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                lineNumber: 122,
                columnNumber: 9
            }, this),
            isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center py-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                    lineNumber: 129,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                lineNumber: 128,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-8",
                children: [
                    sellersWithProducts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white p-6 rounded-lg shadow-sm text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-500",
                            children: "No sellers found."
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                            lineNumber: 135,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                        lineNumber: 134,
                        columnNumber: 13
                    }, this) : sellersWithProducts.map((seller)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-lg shadow-sm overflow-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6 border-b border-gray-200",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: `/dashboard/sellers/${seller.id}`,
                                                className: "text-xl font-medium text-blue-600 hover:underline",
                                                children: seller.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                                lineNumber: 142,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: `/dashboard/sellers/${seller.id}/manage-products`,
                                                className: "px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700",
                                                children: "Manage Products"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                                lineNumber: 145,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                        lineNumber: 141,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                    lineNumber: 140,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4",
                                    children: seller.products.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-500 text-center py-4",
                                        children: "No products assigned to this seller."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-x-auto",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "min-w-full divide-y divide-gray-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                    className: "bg-gray-50",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                scope: "col",
                                                                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                                children: "Product"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                                                lineNumber: 162,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                scope: "col",
                                                                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                                children: "SKU"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                                                lineNumber: 165,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                scope: "col",
                                                                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                                children: "Price"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                                                lineNumber: 168,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                scope: "col",
                                                                className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                                children: "Actions"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                                                lineNumber: 171,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                                        lineNumber: 161,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                                    lineNumber: 160,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                    className: "bg-white divide-y divide-gray-200",
                                                    children: seller.products.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-6 py-4 whitespace-nowrap",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center",
                                                                        children: [
                                                                            product.mainImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                src: product.mainImage,
                                                                                alt: product.name,
                                                                                className: "h-10 w-10 rounded-md object-cover mr-3"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                                                                lineNumber: 182,
                                                                                columnNumber: 37
                                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center mr-3",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-xs text-gray-500",
                                                                                    children: "No img"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                                                                    lineNumber: 189,
                                                                                    columnNumber: 39
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                                                                lineNumber: 188,
                                                                                columnNumber: 37
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "text-sm font-medium text-gray-900",
                                                                                children: product.name
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                                                                lineNumber: 192,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                                                        lineNumber: 180,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                                                    lineNumber: 179,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                                                    children: product.sku
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                                                    lineNumber: 197,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-6 py-4 whitespace-nowrap",
                                                                    children: product.salePrice ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-sm font-medium text-gray-900",
                                                                                children: formatCurrency(product.salePrice)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                                                                lineNumber: 203,
                                                                                columnNumber: 37
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-sm text-gray-500 line-through ml-2",
                                                                                children: formatCurrency(product.price)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                                                                lineNumber: 206,
                                                                                columnNumber: 37
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                                                        lineNumber: 202,
                                                                        columnNumber: 35
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm font-medium text-gray-900",
                                                                        children: formatCurrency(product.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                                                        lineNumber: 211,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                                                    lineNumber: 200,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        href: `/dashboard/products/${product.id}`,
                                                                        className: "text-blue-600 hover:text-blue-900",
                                                                        children: "View"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                                                        lineNumber: 217,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                                                    lineNumber: 216,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, product.id, true, {
                                                            fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                                            lineNumber: 178,
                                                            columnNumber: 29
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                            lineNumber: 159,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                        lineNumber: 158,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                    lineNumber: 154,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, seller.id, true, {
                            fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                            lineNumber: 139,
                            columnNumber: 15
                        }, this)),
                    totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center mt-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>goToPage(currentPage - 1),
                                    disabled: currentPage === 1,
                                    className: "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
                                    children: "Previous"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                    lineNumber: 239,
                                    columnNumber: 17
                                }, this),
                                Array.from({
                                    length: totalPages
                                }, (_, i)=>i + 1).map((page)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>goToPage(page),
                                        className: `relative inline-flex items-center px-4 py-2 border ${page === currentPage ? 'bg-blue-50 border-blue-500 text-blue-600 z-10' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'} text-sm font-medium`,
                                        children: page
                                    }, page, false, {
                                        fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                        lineNumber: 248,
                                        columnNumber: 19
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>goToPage(currentPage + 1),
                                    disabled: currentPage === totalPages,
                                    className: "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
                                    children: "Next"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                                    lineNumber: 261,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                            lineNumber: 238,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                        lineNumber: 237,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
                lineNumber: 132,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/sellers/products/page.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
_s(SellerProductsPage, "+LMHzDos23kV5TvN3t/4lbnsLgE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = SellerProductsPage;
var _c;
__turbopack_context__.k.register(_c, "SellerProductsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/uuid/dist/esm-browser/native.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const __TURBOPACK__default__export__ = {
    randomUUID
};
}}),
"[project]/node_modules/uuid/dist/esm-browser/rng.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>rng)
});
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
    if (!getRandomValues) {
        if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
            throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
        getRandomValues = crypto.getRandomValues.bind(crypto);
    }
    return getRandomValues(rnds8);
}
}}),
"[project]/node_modules/uuid/dist/esm-browser/regex.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
const __TURBOPACK__default__export__ = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;
}}),
"[project]/node_modules/uuid/dist/esm-browser/validate.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$regex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/regex.js [app-client] (ecmascript)");
;
function validate(uuid) {
    return typeof uuid === 'string' && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$regex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].test(uuid);
}
const __TURBOPACK__default__export__ = validate;
}}),
"[project]/node_modules/uuid/dist/esm-browser/stringify.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__),
    "unsafeStringify": (()=>unsafeStringify)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/validate.js [app-client] (ecmascript)");
;
const byteToHex = [];
for(let i = 0; i < 256; ++i){
    byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
function stringify(arr, offset = 0) {
    const uuid = unsafeStringify(arr, offset);
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(uuid)) {
        throw TypeError('Stringified UUID is invalid');
    }
    return uuid;
}
const __TURBOPACK__default__export__ = stringify;
}}),
"[project]/node_modules/uuid/dist/esm-browser/v4.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$native$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/native.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$rng$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/rng.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/stringify.js [app-client] (ecmascript)");
;
;
;
function v4(options, buf, offset) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$native$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].randomUUID && !buf && !options) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$native$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].randomUUID();
    }
    options = options || {};
    const rnds = options.random ?? options.rng?.() ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$rng$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80;
    if (buf) {
        offset = offset || 0;
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
        for(let i = 0; i < 16; ++i){
            buf[offset + i] = rnds[i];
        }
        return buf;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unsafeStringify"])(rnds);
}
const __TURBOPACK__default__export__ = v4;
}}),
"[project]/node_modules/uuid/dist/esm-browser/v4.js [app-client] (ecmascript) <export default as v4>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "v4": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/v4.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_f0cfedb6._.js.map