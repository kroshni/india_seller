module.exports = {

"[project]/src/lib/api-client/seller-client.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "bulkDeleteSellers": (()=>bulkDeleteSellers),
    "bulkUpdateSellers": (()=>bulkUpdateSellers),
    "createSeller": (()=>createSeller),
    "deleteSeller": (()=>deleteSeller),
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
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/util [external] (util, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}}),
"[externals]/dns [external] (dns, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}}),
"[externals]/net [external] (net, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}}),
"[externals]/events [external] (events, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/node:util [external] (node:util, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:util", () => require("node:util"));

module.exports = mod;
}}),
"[externals]/tls [external] (tls, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}}),
"[externals]/os [external] (os, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/https [external] (https, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[externals]/url [external] (url, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}}),
"[externals]/vm [external] (vm, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("vm", () => require("vm"));

module.exports = mod;
}}),
"[project]/src/lib/cassandra.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Use a safe way to check for browser environment
__turbopack_context__.s({
    "closeClient": (()=>closeClient),
    "getClient": (()=>getClient),
    "initializeDatabase": (()=>initializeDatabase),
    "isDbConnected": (()=>isDbConnected)
});
const isBrowser = "undefined" !== 'undefined';
// Initialize these variables for both server and client
let client = null;
let isConnected = false;
let connectionAttempted = false;
// Only run this code on the server
if ("TURBOPACK compile-time truthy", 1) {
    try {
        // Dynamic import for cassandra-driver (this won't run in the browser)
        const cassandraDriver = __turbopack_context__.r("[project]/node_modules/cassandra-driver/index.js [app-ssr] (ecmascript)");
        const { Client, auth } = cassandraDriver;
        // Initialize the client if we're in a server environment
        try {
            // Check for environment variables
            const contactPoints = process.env.CASSANDRA_CONTACT_POINTS?.split(',') || [
                'localhost'
            ];
            const localDataCenter = process.env.CASSANDRA_LOCAL_DATACENTER || 'datacenter1';
            const keyspace = process.env.CASSANDRA_KEYSPACE || 'india_seller';
            const username = process.env.CASSANDRA_USERNAME || 'cassandra';
            const password = process.env.CASSANDRA_PASSWORD || 'cassandra';
            // Create new client with proper auth provider
            const options = {
                contactPoints,
                localDataCenter,
                keyspace,
                protocolOptions: {
                    maxVersion: 4
                }
            };
            // Always add authProvider with default values if not provided
            options.authProvider = new auth.PlainTextAuthProvider(username, password);
            client = new Client(options);
            console.log('Cassandra client created with options:', {
                contactPoints,
                localDataCenter,
                keyspace
            });
            // Immediately attempt to connect to set isConnected flag
            initializeDatabase().catch((err)=>{
                console.error('Failed to initialize database on startup:', err);
            });
        } catch (error) {
            console.error('Error creating Cassandra client:', error);
            client = null;
        }
    } catch (error) {
        console.error('Failed to load cassandra-driver (this is normal in browser):', error);
    }
}
function getClient() {
    return client;
}
async function initializeDatabase() {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    if (!client) {
        console.error('No Cassandra client available');
        return false;
    }
    if (connectionAttempted && isConnected) {
        console.log('Already connected to database');
        return true;
    }
    connectionAttempted = true;
    try {
        // Test connection
        await client.connect();
        console.log('Connected to Cassandra successfully');
        isConnected = true;
        // Create categories table
        await client.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id uuid PRIMARY KEY,
        name text,
        slug text,
        description text,
        status text,
        product_count int,
        created_at timestamp,
        updated_at timestamp
      )
    `);
        // Create brands table
        await client.execute(`
      CREATE TABLE IF NOT EXISTS brands (
        id uuid PRIMARY KEY,
        name text,
        slug text,
        logo text,
        status text,
        product_count int,
        created_at timestamp,
        updated_at timestamp
      )
    `);
        // Create products table
        await client.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id uuid PRIMARY KEY,
        sku text,
        name text,
        slug text,
        type text,
        description text,
        short_description text,
        price decimal,
        sale_price decimal,
        sale_start_date timestamp,
        sale_end_date timestamp,
        stock_status text,
        stock_quantity int,
        manage_stock boolean,
        weight decimal,
        dimensions map<text, decimal>,
        main_image text,
        gallery_images list<text>,
        category_ids list<uuid>,
        tags list<text>,
        brand_id uuid,
        visibility text,
        status text,
        custom_attributes map<text, text>,
        seller_id uuid,
        created_at timestamp,
        updated_at timestamp
      )
    `);
        // Create product_categories table (for many-to-many relationship)
        await client.execute(`
      CREATE TABLE IF NOT EXISTS product_categories (
        product_id uuid,
        category_id uuid,
        PRIMARY KEY (product_id, category_id)
      )
    `);
        // Create product_tags table (for indexing and searching by tag)
        await client.execute(`
      CREATE TABLE IF NOT EXISTS product_tags (
        tag text,
        product_id uuid,
        PRIMARY KEY (tag, product_id)
      )
    `);
        console.log('Database tables initialized successfully');
        return true;
    } catch (error) {
        console.error('Failed to initialize database tables:', error);
        isConnected = false;
        return false;
    }
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
}}),
"[project]/src/lib/local-storage.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
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
    if ("TURBOPACK compile-time truthy", 1) return;
    "TURBOPACK unreachable";
}
function loadCategories() {
    // Only run in browser
    if ("TURBOPACK compile-time truthy", 1) return [];
    "TURBOPACK unreachable";
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
    if ("TURBOPACK compile-time truthy", 1) return;
    "TURBOPACK unreachable";
}
function loadBrands() {
    // Only run in browser
    if ("TURBOPACK compile-time truthy", 1) return [];
    "TURBOPACK unreachable";
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
    if ("TURBOPACK compile-time truthy", 1) return;
    "TURBOPACK unreachable";
}
function loadProducts() {
    // Only run in browser
    if ("TURBOPACK compile-time truthy", 1) return [];
    "TURBOPACK unreachable";
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
}}),
"[project]/src/lib/services/product-service.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm/v4.js [app-ssr] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cassandra.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/local-storage.ts [app-ssr] (ecmascript)");
;
;
;
// Sample mock data for products
const mockProducts = [
    {
        id: '550e8400-e29b-41d4-a716-446655440100',
        sku: 'TSH-001',
        name: 'Basic Cotton T-Shirt',
        slug: 'basic-cotton-t-shirt',
        type: 'Simple',
        description: 'A comfortable 100% cotton t-shirt for everyday wear. Available in multiple colors.',
        shortDescription: 'Comfortable cotton t-shirt',
        price: 19.99,
        salePrice: 14.99,
        saleStartDate: new Date(2023, 6, 1).toISOString(),
        saleEndDate: new Date(2023, 7, 30).toISOString(),
        stockStatus: 'In Stock',
        stockQuantity: 100,
        manageStock: true,
        weight: 0.2,
        dimensions: {
            length: 30,
            width: 20,
            height: 2
        },
        mainImage: 'https://example.com/images/tshirt.jpg',
        galleryImages: [
            'https://example.com/images/tshirt-front.jpg',
            'https://example.com/images/tshirt-back.jpg'
        ],
        categoryIds: [
            '550e8400-e29b-41d4-a716-446655440001'
        ],
        tags: [
            'cotton',
            't-shirt',
            'casual'
        ],
        brandId: '550e8400-e29b-41d4-a716-446655440010',
        visibility: 'Both',
        status: 'Enabled',
        customAttributes: [
            {
                name: 'color',
                value: 'White'
            },
            {
                name: 'material',
                value: 'Cotton'
            }
        ],
        createdAt: new Date(2023, 5, 15).toISOString(),
        updatedAt: new Date(2023, 5, 15).toISOString()
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440101',
        sku: 'JNS-001',
        name: 'Slim Fit Jeans',
        slug: 'slim-fit-jeans',
        type: 'Configurable',
        description: 'Slim fit jeans with stretch material for comfort. Available in multiple sizes and colors.',
        shortDescription: 'Comfortable slim fit jeans',
        price: 49.99,
        stockStatus: 'In Stock',
        stockQuantity: 75,
        manageStock: true,
        weight: 0.5,
        dimensions: {
            length: 40,
            width: 30,
            height: 5
        },
        mainImage: 'https://example.com/images/jeans.jpg',
        galleryImages: [
            'https://example.com/images/jeans-front.jpg',
            'https://example.com/images/jeans-back.jpg'
        ],
        categoryIds: [
            '550e8400-e29b-41d4-a716-446655440001'
        ],
        tags: [
            'jeans',
            'denim',
            'slim fit'
        ],
        brandId: '550e8400-e29b-41d4-a716-446655440011',
        visibility: 'Both',
        status: 'Enabled',
        customAttributes: [
            {
                name: 'material',
                value: 'Denim'
            },
            {
                name: 'fit',
                value: 'Slim'
            }
        ],
        createdAt: new Date(2023, 4, 10).toISOString(),
        updatedAt: new Date(2023, 4, 10).toISOString()
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440102',
        sku: 'SHS-001',
        name: 'Running Shoes',
        slug: 'running-shoes',
        type: 'Configurable',
        description: 'Lightweight running shoes with cushioned soles for maximum comfort.',
        shortDescription: 'Lightweight running shoes',
        price: 79.99,
        salePrice: 59.99,
        stockStatus: 'In Stock',
        stockQuantity: 50,
        manageStock: true,
        weight: 0.8,
        dimensions: {
            length: 35,
            width: 20,
            height: 15
        },
        mainImage: 'https://example.com/images/shoes.jpg',
        galleryImages: [
            'https://example.com/images/shoes-side.jpg',
            'https://example.com/images/shoes-front.jpg'
        ],
        categoryIds: [
            '550e8400-e29b-41d4-a716-446655440002'
        ],
        tags: [
            'shoes',
            'running',
            'sports'
        ],
        brandId: '550e8400-e29b-41d4-a716-446655440012',
        visibility: 'Both',
        status: 'Enabled',
        customAttributes: [
            {
                name: 'material',
                value: 'Synthetic'
            },
            {
                name: 'color',
                value: 'Black/Red'
            }
        ],
        createdAt: new Date(2023, 3, 5).toISOString(),
        updatedAt: new Date(2023, 3, 5).toISOString()
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440103',
        sku: 'LPT-001',
        name: 'Laptop Backpack',
        slug: 'laptop-backpack',
        type: 'Simple',
        description: 'Water-resistant backpack with padded compartment for laptops up to 15 inches.',
        shortDescription: 'Water-resistant laptop backpack',
        price: 45.99,
        stockStatus: 'In Stock',
        stockQuantity: 30,
        manageStock: true,
        weight: 1.2,
        dimensions: {
            length: 45,
            width: 30,
            height: 15
        },
        mainImage: 'https://example.com/images/backpack.jpg',
        galleryImages: [
            'https://example.com/images/backpack-front.jpg',
            'https://example.com/images/backpack-inside.jpg'
        ],
        categoryIds: [
            '550e8400-e29b-41d4-a716-446655440003'
        ],
        tags: [
            'backpack',
            'laptop',
            'travel'
        ],
        brandId: '550e8400-e29b-41d4-a716-446655440013',
        visibility: 'Both',
        status: 'Enabled',
        customAttributes: [
            {
                name: 'material',
                value: 'Polyester'
            },
            {
                name: 'waterproof',
                value: 'Yes'
            }
        ],
        createdAt: new Date(2023, 2, 20).toISOString(),
        updatedAt: new Date(2023, 2, 20).toISOString()
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440104',
        sku: 'WTC-001',
        name: 'Smart Watch',
        slug: 'smart-watch',
        type: 'Simple',
        description: 'Smart watch with heart rate monitor, step tracker, and notifications.',
        shortDescription: 'Smart watch with health features',
        price: 129.99,
        salePrice: 99.99,
        stockStatus: 'In Stock',
        stockQuantity: 20,
        manageStock: true,
        weight: 0.1,
        dimensions: {
            length: 10,
            width: 5,
            height: 2
        },
        mainImage: 'https://example.com/images/watch.jpg',
        galleryImages: [
            'https://example.com/images/watch-front.jpg',
            'https://example.com/images/watch-side.jpg'
        ],
        categoryIds: [
            '550e8400-e29b-41d4-a716-446655440000'
        ],
        tags: [
            'watch',
            'smart',
            'fitness'
        ],
        brandId: '550e8400-e29b-41d4-a716-446655440014',
        visibility: 'Both',
        status: 'Enabled',
        customAttributes: [
            {
                name: 'color',
                value: 'Black'
            },
            {
                name: 'waterproof',
                value: 'Yes'
            }
        ],
        createdAt: new Date(2023, 1, 15).toISOString(),
        updatedAt: new Date(2023, 1, 15).toISOString()
    }
];
// Initialize mock data
function initializeMockData() {
    // Only run in browser
    if ("TURBOPACK compile-time truthy", 1) return;
    "TURBOPACK unreachable";
}
// Call initialization on module load in browser environment
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
}
// Environment check for debug mode
const DEBUG = process.env.DEBUG_PRODUCTS === 'true';
// Helper function to log debugging information
function log(...args) {
    if (DEBUG) {
        console.log('[ProductService]', ...args);
    }
}
// Helper to check if we should use mock data
function shouldUseMockData() {
    // Always check connection status on each request
    const connected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isDbConnected"])();
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
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
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
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClient"])();
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
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    return {
        mockProducts: mockProducts.length,
        localStorage: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : 'N/A'
    };
}
async function getProductById(id) {
    console.log(`Getting product by ID: ${id}`);
    if (shouldUseMockData()) {
        console.log('Using mock data');
        // Try to load from localStorage first (for client-side)
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        console.log('Checking mock products:', mockProducts.length);
        const product = mockProducts.find((p)=>p.id === id);
        console.log('Found product in mockProducts:', product ? 'Yes' : 'No');
        return product || null;
    }
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            log('No database client available, falling back to mock data');
            if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
            }
            const product = mockProducts.find((p)=>p.id === id);
            return product || null;
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
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        const product = mockProducts.find((p)=>p.id === id);
        return product || null;
    }
}
async function createProduct(data) {
    log('Creating new product:', data);
    const now = new Date();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
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
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        return newProduct;
    }
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            log('No database client available, falling back to mock data');
            // Add to localStorage for persistence (client-side)
            if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
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
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        return newProduct;
    }
}
async function updateProduct(id, data) {
    log(`Updating product ${id} with:`, data);
    if (shouldUseMockData()) {
        log('Using mock data');
        // Try to load from localStorage first (client-side)
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        // Server-side mock data handling
        const index = mockProducts.findIndex((p)=>p.id === id);
        if (index === -1) {
            return null;
        }
        const now = new Date();
        const updatedProduct = {
            ...mockProducts[index],
            ...data,
            updatedAt: now.toISOString()
        };
        mockProducts[index] = updatedProduct;
        return updatedProduct;
    }
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            log('No database client available, falling back to mock data');
            // Try to load from localStorage first (client-side)
            if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
            }
            // Server-side mock data handling
            const index = mockProducts.findIndex((p)=>p.id === id);
            if (index === -1) {
                return null;
            }
            const now = new Date();
            const updatedProduct = {
                ...mockProducts[index],
                ...data,
                updatedAt: now.toISOString()
            };
            mockProducts[index] = updatedProduct;
            return updatedProduct;
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
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        // Server-side mock data handling
        const index = mockProducts.findIndex((p)=>p.id === id);
        if (index === -1) {
            return null;
        }
        const now = new Date();
        const updatedProduct = {
            ...mockProducts[index],
            ...data,
            updatedAt: now.toISOString()
        };
        mockProducts[index] = updatedProduct;
        return updatedProduct;
    }
}
async function deleteProduct(id) {
    log(`Deleting product ${id}`);
    if (shouldUseMockData()) {
        log('Using mock data');
        // Try to delete from localStorage first (client-side)
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        // Server-side mock data handling
        const index = mockProducts.findIndex((p)=>p.id === id);
        if (index === -1) {
            return false;
        }
        mockProducts.splice(index, 1);
        return true;
    }
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            log('No database client available, falling back to mock data');
            // Try to delete from localStorage first (client-side)
            if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
            }
            // Server-side mock data handling
            const index = mockProducts.findIndex((p)=>p.id === id);
            if (index === -1) {
                return false;
            }
            mockProducts.splice(index, 1);
            return true;
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
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        // Server-side mock data handling
        const index = mockProducts.findIndex((p)=>p.id === id);
        if (index === -1) {
            return false;
        }
        mockProducts.splice(index, 1);
        return true;
    }
}
async function bulkDeleteProducts(ids) {
    log(`Bulk deleting products: ${ids.length} items`);
    if (shouldUseMockData()) {
        log('Using mock data');
        // Try to delete from localStorage first (client-side)
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        // Server-side mock data handling
        const initialCount = mockProducts.length;
        const filteredProducts = mockProducts.filter((p)=>!ids.includes(p.id));
        const deletedCount = initialCount - filteredProducts.length;
        return {
            success: true,
            count: deletedCount
        };
    }
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            log('No database client available, falling back to mock data');
            // Try to delete from localStorage first (client-side)
            if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
            }
            // Server-side mock data handling
            const initialCount = mockProducts.length;
            const filteredProducts = mockProducts.filter((p)=>!ids.includes(p.id));
            const deletedCount = initialCount - filteredProducts.length;
            return {
                success: true,
                count: deletedCount
            };
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
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        // Server-side mock data handling
        const initialCount = mockProducts.length;
        const filteredProducts = mockProducts.filter((p)=>!ids.includes(p.id));
        const deletedCount = initialCount - filteredProducts.length;
        return {
            success: true,
            count: deletedCount
        };
    }
}
async function bulkUpdateProductStatus(ids, status) {
    log(`Bulk updating product status to ${status} for ${ids.length} products`);
    if (shouldUseMockData()) {
        log('Using mock data');
        // Try to update in localStorage first (client-side)
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        // Server-side mock data handling
        let updatedCount = 0;
        mockProducts.forEach((product)=>{
            if (ids.includes(product.id)) {
                product.status = status;
                product.updatedAt = new Date().toISOString();
                updatedCount++;
            }
        });
        return {
            success: updatedCount > 0,
            count: updatedCount
        };
    }
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            log('No database client available, falling back to mock data');
            // Try to update in localStorage first (client-side)
            if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
            }
            // Server-side mock data handling
            let updatedCount = 0;
            mockProducts.forEach((product)=>{
                if (ids.includes(product.id)) {
                    product.status = status;
                    product.updatedAt = new Date().toISOString();
                    updatedCount++;
                }
            });
            return {
                success: updatedCount > 0,
                count: updatedCount
            };
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
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        // Server-side mock data handling
        let updatedCount = 0;
        mockProducts.forEach((product)=>{
            if (ids.includes(product.id)) {
                product.status = status;
                product.updatedAt = new Date().toISOString();
                updatedCount++;
            }
        });
        return {
            success: updatedCount > 0,
            count: updatedCount
        };
    }
}
async function isSkuUnique(sku, excludeProductId) {
    log(`Checking if SKU "${sku}" is unique${excludeProductId ? ` (excluding product ${excludeProductId})` : ''}`);
    if (shouldUseMockData()) {
        log('Using mock data');
        // Try to check in localStorage first (client-side)
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        // Server-side mock data handling
        return !mockProducts.some((p)=>p.sku === sku && p.id !== excludeProductId);
    }
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            log('No database client available, falling back to mock data');
            // Try to check in localStorage first (client-side)
            if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
            }
            // Server-side mock data handling
            return !mockProducts.some((p)=>p.sku === sku && p.id !== excludeProductId);
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
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        // Server-side mock data handling
        return !mockProducts.some((p)=>p.sku === sku && p.id !== excludeProductId);
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
}}),
"[project]/src/components/sellers/ProductAssignmentForm.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ProductAssignmentForm)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$product$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/product-service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2f$seller$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-client/seller-client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function ProductAssignmentForm({ sellerId, standalone = false }) {
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedProducts, setSelectedProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const previousSelections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const selectionCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    // Fetch all products and currently assigned products
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchData = async ()=>{
            setIsLoading(true);
            try {
                // Fetch all products
                const productsResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$product$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllProducts"])({
                    limit: 100
                });
                console.log(`Loaded ${productsResponse.products.length} products from service`);
                // Check UUID format of products
                const validUuids = productsResponse.products.filter((p)=>{
                    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                    return uuidRegex.test(p.id);
                });
                console.log(`Found ${validUuids.length} products with valid UUIDs`);
                if (validUuids.length !== productsResponse.products.length) {
                    console.warn(`${productsResponse.products.length - validUuids.length} products have invalid UUID format`);
                    // Print the first few invalid IDs
                    const invalidProducts = productsResponse.products.filter((p)=>{
                        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                        return !uuidRegex.test(p.id);
                    });
                    console.warn('Sample invalid product IDs:', invalidProducts.slice(0, 3).map((p)=>p.id));
                }
                setProducts(productsResponse.products);
                // Fetch assigned products
                const assignedProductIds = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2f$seller$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSellerProductAssignments"])(sellerId);
                console.log(`Fetched ${assignedProductIds.length} assigned product IDs:`, assignedProductIds);
                // Set the selectedProducts state with the fetched data
                console.log('Setting initial selected products state:', assignedProductIds);
                setSelectedProducts(assignedProductIds);
                previousSelections.current = [
                    ...assignedProductIds
                ];
            } catch (error) {
                console.error('Error loading data:', error);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Failed to load products data');
            } finally{
                setIsLoading(false);
            }
        };
        fetchData();
    }, [
        sellerId
    ]);
    // Debug log when selectedProducts changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        selectionCount.current += 1;
        console.log(`SELECTION UPDATE #${selectionCount.current} - Products selected: ${selectedProducts.length}`);
        console.log('Previous selections:', previousSelections.current);
        console.log('Current selections:', selectedProducts);
        // Check what products were added or removed
        const added = selectedProducts.filter((id)=>!previousSelections.current.includes(id));
        const removed = previousSelections.current.filter((id)=>!selectedProducts.includes(id));
        if (added.length > 0) {
            console.log('Products added:', added);
        }
        if (removed.length > 0) {
            console.log('Products removed:', removed);
        }
        // Update the previous selections reference
        previousSelections.current = [
            ...selectedProducts
        ];
    }, [
        selectedProducts
    ]);
    // Handle product selection
    const handleProductToggle = (productId)=>{
        console.log(`Toggling product selection: ${productId}`);
        // Create a new array for the updated selections
        let newSelectedProducts;
        if (selectedProducts.includes(productId)) {
            console.log(`Removing product ${productId} from selection`);
            newSelectedProducts = selectedProducts.filter((id)=>id !== productId);
        } else {
            console.log(`Adding product ${productId} to selection`);
            newSelectedProducts = [
                ...selectedProducts,
                productId
            ];
        }
        console.log(`New selected products (${newSelectedProducts.length}):`, newSelectedProducts);
        // Set the state with the new array
        setSelectedProducts([
            ...newSelectedProducts
        ]);
    };
    // Handle form submission
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsSaving(true);
        try {
            console.log(`Submitting ${selectedProducts.length} products for seller ${sellerId}`);
            console.log('Selected product IDs for submission:', selectedProducts);
            // Check products array
            if (!Array.isArray(selectedProducts)) {
                throw new Error('Selected products is not an array');
            }
            if (selectedProducts.length === 0) {
                console.warn('No products selected for submission');
            }
            // Ensure all product IDs are valid UUIDs
            const validProducts = [];
            const invalidProducts = [];
            for (const id of selectedProducts){
                const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                if (uuidRegex.test(id)) {
                    validProducts.push(id);
                } else {
                    invalidProducts.push(id);
                }
            }
            if (invalidProducts.length > 0) {
                console.warn('Products with invalid UUID format will not be saved:', invalidProducts);
                // If we're losing products due to filtering, show a warning
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].warning(`${invalidProducts.length} products have invalid format and can't be saved to the database. Valid: ${validProducts.length}/${selectedProducts.length}`);
            }
            console.log(`Sending ${validProducts.length} valid product IDs to API:`, validProducts);
            // Make sure we're actually sending products
            if (validProducts.length === 0 && selectedProducts.length > 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('None of the selected products have valid UUIDs. Cannot save assignments.');
                return;
            }
            // Call the API to update product assignments
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2f$seller$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateSellerProductAssignments"])(sellerId, validProducts);
            console.log('API response success:', result);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Product assignments updated successfully');
        // Don't refresh - keep the user's selections
        } catch (error) {
            console.error('Error saving product assignments:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(`Failed to update product assignments: ${error.message || 'Unknown error'}`);
        } finally{
            setIsSaving(false);
        }
    };
    // Debug selected products list
    const debugSelectedProductsList = ()=>{
        if (selectedProducts.length === 0) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-red-500",
                children: "No products selected"
            }, void 0, false, {
                fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                lineNumber: 181,
                columnNumber: 14
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs overflow-x-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "font-bold mb-1",
                    children: [
                        "Selected Products (",
                        selectedProducts.length,
                        "):"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                    lineNumber: 186,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "list-disc pl-5",
                    children: selectedProducts.map((id, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "mb-1",
                            children: id
                        }, index, false, {
                            fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                            lineNumber: 189,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                    lineNumber: 187,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
            lineNumber: 185,
            columnNumber: 7
        }, this);
    };
    // Filter products based on search query
    const filteredProducts = searchQuery ? products.filter((product)=>product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.sku.toLowerCase().includes(searchQuery.toLowerCase())) : products;
    // Debug products list
    const debugProductsList = ()=>{
        if (products.length === 0) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-red-500",
                children: "No products loaded"
            }, void 0, false, {
                fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                lineNumber: 209,
                columnNumber: 14
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs bg-gray-100 p-2 rounded mb-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "font-bold mb-1",
                    children: "Debug: Products"
                }, void 0, false, {
                    fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                    lineNumber: 214,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: [
                        "Total products loaded: ",
                        products.length
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                    lineNumber: 215,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: [
                        "Products with valid UUIDs: ",
                        products.filter((p)=>{
                            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                            return uuidRegex.test(p.id);
                        }).length
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                    lineNumber: 216,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: [
                        "Products with invalid UUIDs: ",
                        products.filter((p)=>{
                            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                            return !uuidRegex.test(p.id);
                        }).length
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                    lineNumber: 222,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-bold",
                            children: "Sample Product IDs:"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                            lineNumber: 229,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "list-disc pl-5",
                            children: products.slice(0, 3).map((product, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: [
                                        product.id,
                                        " - ",
                                        product.name
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                                    lineNumber: 232,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                            lineNumber: 230,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                    lineNumber: 228,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
            lineNumber: 213,
            columnNumber: 7
        }, this);
    };
    // Form content to avoid duplication
    const formContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "search",
                        className: "block text-sm font-medium text-gray-700 mb-1",
                        children: "Search Products"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                        lineNumber: 245,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        id: "search",
                        value: searchQuery,
                        onChange: (e)=>setSearchQuery(e.target.value),
                        placeholder: "Search by name or SKU",
                        className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                        lineNumber: 248,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                lineNumber: 244,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-gray-600 font-bold",
                        children: [
                            selectedProducts.length,
                            " products selected"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                        lineNumber: 260,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 p-2 bg-gray-100 rounded text-xs",
                        children: debugSelectedProductsList()
                    }, void 0, false, {
                        fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                        lineNumber: 263,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                lineNumber: 259,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-h-96 overflow-y-auto border border-gray-200 rounded-md mb-4",
                children: filteredProducts.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "divide-y divide-gray-200",
                    children: filteredProducts.map((product)=>{
                        const isSelected = selectedProducts.includes(product.id);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "p-3 hover:bg-gray-50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center space-x-3 cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: isSelected,
                                        onChange: ()=>handleProductToggle(product.id),
                                        className: "h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                                        lineNumber: 278,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-medium text-gray-900",
                                                children: product.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                                                lineNumber: 285,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500",
                                                children: [
                                                    "SKU: ",
                                                    product.sku,
                                                    isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 text-green-600 font-bold",
                                                        children: "(Selected)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                                                        lineNumber: 290,
                                                        columnNumber: 40
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                                                lineNumber: 288,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                                        lineNumber: 284,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-medium text-gray-900",
                                                children: [
                                                    "₹",
                                                    product.salePrice || product.price
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                                                lineNumber: 294,
                                                columnNumber: 23
                                            }, this),
                                            product.salePrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500 line-through",
                                                children: [
                                                    "₹",
                                                    product.price
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                                                lineNumber: 298,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                                        lineNumber: 293,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                                lineNumber: 277,
                                columnNumber: 19
                            }, this)
                        }, product.id, false, {
                            fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                            lineNumber: 276,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                    lineNumber: 271,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 text-center text-gray-500",
                    children: searchQuery ? 'No products match your search' : 'No products available'
                }, void 0, false, {
                    fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                    lineNumber: 307,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                lineNumber: 269,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-end",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: standalone ? "submit" : "button",
                    onClick: standalone ? undefined : handleSubmit,
                    disabled: isSaving,
                    className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50",
                    children: isSaving ? 'Saving...' : 'Save Product Assignments'
                }, void 0, false, {
                    fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                    lineNumber: 315,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                lineNumber: 314,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg shadow-sm p-6 mb-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-medium text-gray-900 mb-4",
                children: "Assign Products"
            }, void 0, false, {
                fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                lineNumber: 329,
                columnNumber: 7
            }, this),
            isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center py-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                        lineNumber: 333,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-3",
                        children: "Loading products..."
                    }, void 0, false, {
                        fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                        lineNumber: 334,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                lineNumber: 332,
                columnNumber: 9
            }, this) : standalone ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                children: formContent
            }, void 0, false, {
                fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                lineNumber: 338,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: formContent
            }, void 0, false, {
                fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
                lineNumber: 342,
                columnNumber: 11
            }, this),
            debugProductsList()
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sellers/ProductAssignmentForm.tsx",
        lineNumber: 328,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/app/dashboard/sellers/[id]/manage-products/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ManageSellerProductsPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2f$seller$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-client/seller-client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sellers$2f$ProductAssignmentForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/sellers/ProductAssignmentForm.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function ManageSellerProductsPage({ params }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // Use React.use to unwrap the params Promise
    const resolvedParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(params);
    const sellerId = resolvedParams.id;
    const [seller, setSeller] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchSellerDetails = async ()=>{
            setIsLoading(true);
            setError(null);
            try {
                const sellerData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2f$seller$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSellerById"])(sellerId);
                setSeller(sellerData);
            } catch (error) {
                console.error('Error fetching seller details:', error);
                setError('Failed to load seller details. Please try again.');
            } finally{
                setIsLoading(false);
            }
        };
        fetchSellerDetails();
    }, [
        sellerId
    ]);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center items-center min-h-screen",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/sellers/[id]/manage-products/page.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ml-3 text-xl",
                    children: "Loading seller details..."
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/sellers/[id]/manage-products/page.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/sellers/[id]/manage-products/page.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-red-100 p-6 rounded-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold text-red-700 mb-2",
                    children: "Error"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/sellers/[id]/manage-products/page.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-red-700",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/sellers/[id]/manage-products/page.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>router.push(`/dashboard/sellers/${sellerId}`),
                    className: "mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700",
                    children: "Go Back to Seller"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/sellers/[id]/manage-products/page.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/sellers/[id]/manage-products/page.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this);
    }
    if (!seller) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-yellow-100 p-6 rounded-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold text-yellow-700 mb-2",
                    children: "Seller Not Found"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/sellers/[id]/manage-products/page.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-yellow-700",
                    children: "The seller you are looking for does not exist or has been deleted."
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/sellers/[id]/manage-products/page.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>router.push('/dashboard/sellers'),
                    className: "mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700",
                    children: "Go Back to Sellers"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/sellers/[id]/manage-products/page.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/sellers/[id]/manage-products/page.tsx",
            lineNumber: 65,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold text-gray-900",
                                children: [
                                    "Manage Products for ",
                                    seller.seller.name
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/sellers/[id]/manage-products/page.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600",
                                children: seller.business.companyName
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/sellers/[id]/manage-products/page.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/sellers/[id]/manage-products/page.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex space-x-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: `/dashboard/sellers/${sellerId}`,
                            className: "px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50",
                            children: "Back to Seller"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/sellers/[id]/manage-products/page.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/sellers/[id]/manage-products/page.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/sellers/[id]/manage-products/page.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sellers$2f$ProductAssignmentForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                sellerId: sellerId,
                standalone: true
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/sellers/[id]/manage-products/page.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/sellers/[id]/manage-products/page.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__eb75b824._.js.map