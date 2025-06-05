(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

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
"[project]/src/components/products/ProductTable.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ProductTable)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function ProductTable({ products, total, page, totalPages, isLoading, onPageChange, onSortChange, onStatusUpdate, onDeleteClick, onEditClick, onViewClick, onSelectionChange, currentSort }) {
    _s();
    // Selection state
    const [selectedIds, setSelectedIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectAll, setSelectAll] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Handle selection change
    const handleSelectAll = ()=>{
        if (selectAll) {
            setSelectedIds([]);
        } else {
            setSelectedIds(products.map((product)=>product.id));
        }
        setSelectAll(!selectAll);
        onSelectionChange(selectAll ? [] : products.map((product)=>product.id));
    };
    // Handle individual selection
    const handleSelectItem = (id)=>{
        let newSelectedIds;
        if (selectedIds.includes(id)) {
            newSelectedIds = selectedIds.filter((selectedId)=>selectedId !== id);
        } else {
            newSelectedIds = [
                ...selectedIds,
                id
            ];
        }
        setSelectedIds(newSelectedIds);
        // If all items are selected, check the "select all" checkbox
        setSelectAll(newSelectedIds.length === products.length);
        onSelectionChange(newSelectedIds);
    };
    // Handle sort
    const handleSort = (field)=>{
        const newOrder = currentSort.field === field && currentSort.order === 'asc' ? 'desc' : 'asc';
        onSortChange(field, newOrder);
    };
    // Format currency
    const formatCurrency = (amount)=>{
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };
    // Format date
    const formatDate = (dateString)=>{
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-6 animate-pulse",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-12 bg-gray-200 rounded mb-4"
                }, void 0, false, {
                    fileName: "[project]/src/components/products/ProductTable.tsx",
                    lineNumber: 98,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-16 bg-gray-200 rounded mb-2"
                }, void 0, false, {
                    fileName: "[project]/src/components/products/ProductTable.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-16 bg-gray-200 rounded mb-2"
                }, void 0, false, {
                    fileName: "[project]/src/components/products/ProductTable.tsx",
                    lineNumber: 100,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-16 bg-gray-200 rounded mb-2"
                }, void 0, false, {
                    fileName: "[project]/src/components/products/ProductTable.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/products/ProductTable.tsx",
            lineNumber: 97,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "shadow overflow-hidden border-b border-gray-200 sm:rounded-lg",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "min-w-full divide-y divide-gray-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "bg-gray-50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            checked: selectAll,
                                            onChange: handleSelectAll,
                                            className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/products/ProductTable.tsx",
                                            lineNumber: 113,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/ProductTable.tsx",
                                        lineNumber: 112,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Image"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/ProductTable.tsx",
                                        lineNumber: 120,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        onClick: ()=>handleSort('name'),
                                        className: "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center",
                                            children: [
                                                "Product",
                                                currentSort.field === 'name' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-1",
                                                    children: currentSort.order === 'asc' ? '↑' : '↓'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/products/ProductTable.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/products/ProductTable.tsx",
                                            lineNumber: 127,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/ProductTable.tsx",
                                        lineNumber: 123,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "SKU"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/ProductTable.tsx",
                                        lineNumber: 136,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        onClick: ()=>handleSort('price'),
                                        className: "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center",
                                            children: [
                                                "Price",
                                                currentSort.field === 'price' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-1",
                                                    children: currentSort.order === 'asc' ? '↑' : '↓'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/products/ProductTable.tsx",
                                                    lineNumber: 146,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/products/ProductTable.tsx",
                                            lineNumber: 143,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/ProductTable.tsx",
                                        lineNumber: 139,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        onClick: ()=>handleSort('status'),
                                        className: "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center",
                                            children: [
                                                "Status",
                                                currentSort.field === 'status' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-1",
                                                    children: currentSort.order === 'asc' ? '↑' : '↓'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/products/ProductTable.tsx",
                                                    lineNumber: 159,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/products/ProductTable.tsx",
                                            lineNumber: 156,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/ProductTable.tsx",
                                        lineNumber: 152,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        onClick: ()=>handleSort('createdAt'),
                                        className: "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center",
                                            children: [
                                                "Created",
                                                currentSort.field === 'createdAt' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-1",
                                                    children: currentSort.order === 'asc' ? '↑' : '↓'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/products/ProductTable.tsx",
                                                    lineNumber: 172,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/products/ProductTable.tsx",
                                            lineNumber: 169,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/ProductTable.tsx",
                                        lineNumber: 165,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Actions"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/ProductTable.tsx",
                                        lineNumber: 178,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/products/ProductTable.tsx",
                                lineNumber: 111,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/products/ProductTable.tsx",
                            lineNumber: 110,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            className: "bg-white divide-y divide-gray-200",
                            children: products.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    colSpan: 8,
                                    className: "px-6 py-4 text-center text-gray-500",
                                    children: "No products found. Create your first product or adjust your filters."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/products/ProductTable.tsx",
                                    lineNumber: 186,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/ProductTable.tsx",
                                lineNumber: 185,
                                columnNumber: 15
                            }, this) : products.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "hover:bg-gray-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-4 whitespace-nowrap",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: selectedIds.includes(product.id),
                                                onChange: ()=>handleSelectItem(product.id),
                                                className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/products/ProductTable.tsx",
                                                lineNumber: 194,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/products/ProductTable.tsx",
                                            lineNumber: 193,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-4 whitespace-nowrap",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-12 w-12 relative bg-gray-100 rounded",
                                                children: product.mainImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: product.mainImage,
                                                    alt: product.name,
                                                    className: "h-12 w-12 object-contain rounded",
                                                    onError: (e)=>{
                                                        e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/products/ProductTable.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-12 w-12 flex items-center justify-center bg-gray-100 text-gray-400 text-xs rounded",
                                                    children: "No image"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/products/ProductTable.tsx",
                                                    lineNumber: 213,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/products/ProductTable.tsx",
                                                lineNumber: 202,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/products/ProductTable.tsx",
                                            lineNumber: 201,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-4 whitespace-nowrap",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm font-medium text-gray-900",
                                                    children: product.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/products/ProductTable.tsx",
                                                    lineNumber: 220,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-gray-500",
                                                    children: product.type
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/products/ProductTable.tsx",
                                                    lineNumber: 221,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/products/ProductTable.tsx",
                                            lineNumber: 219,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-4 whitespace-nowrap",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-gray-900",
                                                children: product.sku
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/products/ProductTable.tsx",
                                                lineNumber: 224,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/products/ProductTable.tsx",
                                            lineNumber: 223,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-4 whitespace-nowrap",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-gray-900",
                                                    children: formatCurrency(product.price)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/products/ProductTable.tsx",
                                                    lineNumber: 227,
                                                    columnNumber: 21
                                                }, this),
                                                product.salePrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-red-600",
                                                    children: formatCurrency(product.salePrice)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/products/ProductTable.tsx",
                                                    lineNumber: 229,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/products/ProductTable.tsx",
                                            lineNumber: 226,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-4 whitespace-nowrap",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${product.status === 'Enabled' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`,
                                                children: product.status
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/products/ProductTable.tsx",
                                                lineNumber: 233,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/products/ProductTable.tsx",
                                            lineNumber: 232,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-4 whitespace-nowrap text-sm text-gray-500",
                                            children: formatDate(product.createdAt)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/products/ProductTable.tsx",
                                            lineNumber: 242,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-4 whitespace-nowrap text-right text-sm",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-end space-x-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>onViewClick(product),
                                                        className: "text-blue-600 hover:text-blue-900",
                                                        title: "View product details",
                                                        children: "View"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/products/ProductTable.tsx",
                                                        lineNumber: 247,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-300",
                                                        children: "|"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/products/ProductTable.tsx",
                                                        lineNumber: 254,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>onEditClick(product),
                                                        className: "text-indigo-600 hover:text-indigo-900",
                                                        title: "Edit product",
                                                        children: "Edit"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/products/ProductTable.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-300",
                                                        children: "|"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/products/ProductTable.tsx",
                                                        lineNumber: 262,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>onStatusUpdate(product.id, product.status === 'Enabled' ? 'Disabled' : 'Enabled'),
                                                        className: "text-blue-600 hover:text-blue-900",
                                                        title: `Set status to ${product.status === 'Enabled' ? 'Disabled' : 'Enabled'}`,
                                                        children: product.status === 'Enabled' ? 'Disable' : 'Enable'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/products/ProductTable.tsx",
                                                        lineNumber: 263,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-300",
                                                        children: "|"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/products/ProductTable.tsx",
                                                        lineNumber: 273,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>onDeleteClick(product),
                                                        className: "text-red-600 hover:text-red-900",
                                                        title: "Delete product",
                                                        children: "Delete"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/products/ProductTable.tsx",
                                                        lineNumber: 274,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/products/ProductTable.tsx",
                                                lineNumber: 246,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/products/ProductTable.tsx",
                                            lineNumber: 245,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, product.id, true, {
                                    fileName: "[project]/src/components/products/ProductTable.tsx",
                                    lineNumber: 192,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/products/ProductTable.tsx",
                            lineNumber: 183,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/products/ProductTable.tsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/products/ProductTable.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-gray-700",
                        children: [
                            "Showing ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: (page - 1) * 10 + 1
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/ProductTable.tsx",
                                lineNumber: 294,
                                columnNumber: 21
                            }, this),
                            " to ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: Math.min(page * 10, total)
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/ProductTable.tsx",
                                lineNumber: 294,
                                columnNumber: 85
                            }, this),
                            " of",
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: total
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/ProductTable.tsx",
                                lineNumber: 295,
                                columnNumber: 13
                            }, this),
                            " products"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/products/ProductTable.tsx",
                        lineNumber: 293,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex space-x-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onPageChange(page - 1),
                                disabled: page === 1,
                                className: `relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`,
                                children: "Previous"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/ProductTable.tsx",
                                lineNumber: 298,
                                columnNumber: 13
                            }, this),
                            Array.from({
                                length: Math.min(5, totalPages)
                            }, (_, i)=>{
                                // Logic to show pages around current page
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (page <= 3) {
                                    pageNum = i + 1;
                                } else if (page >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = page - 2 + i;
                                }
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onPageChange(pageNum),
                                    className: `relative inline-flex items-center px-4 py-2 border ${page === pageNum ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'} text-sm font-medium rounded-md`,
                                    children: pageNum
                                }, pageNum, false, {
                                    fileName: "[project]/src/components/products/ProductTable.tsx",
                                    lineNumber: 321,
                                    columnNumber: 17
                                }, this);
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onPageChange(page + 1),
                                disabled: page === totalPages,
                                className: `relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${page === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`,
                                children: "Next"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/ProductTable.tsx",
                                lineNumber: 334,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/products/ProductTable.tsx",
                        lineNumber: 297,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/ProductTable.tsx",
                lineNumber: 292,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/products/ProductTable.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_s(ProductTable, "W6ynI6qY7uWqg5Om+D+GGjH9T8o=");
_c = ProductTable;
var _c;
__turbopack_context__.k.register(_c, "ProductTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/services/category-service.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "createCategory": (()=>createCategory),
    "deleteCategory": (()=>deleteCategory),
    "getAllCategories": (()=>getAllCategories),
    "getCategoryById": (()=>getCategoryById),
    "updateCategory": (()=>updateCategory),
    "updateCategoryStatus": (()=>updateCategoryStatus)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/v4.js [app-client] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cassandra.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/local-storage.ts [app-client] (ecmascript)");
;
;
;
// In-memory storage for development - will be initialized from localStorage if available
let mockCategories = [];
// Initialize mock data from localStorage if available
if ("TURBOPACK compile-time truthy", 1) {
    const storedCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadCategories"])();
    if (storedCategories && storedCategories.length > 0) {
        console.log('Initializing categories from localStorage:', storedCategories.length);
        mockCategories = storedCategories;
    } else {
        // Store initial mock data to localStorage
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveCategories"])(mockCategories);
    }
}
// Environment check - use this to toggle between mock and real data
// Force a check for database connection on each request
const DEBUG = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.DEBUG_CATEGORIES === 'true';
// Helper function to log debugging information
function log(...args) {
    if (DEBUG) {
        console.log('[CategoryService]', ...args);
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
async function getAllCategories() {
    log('Getting all categories');
    if (shouldUseMockData()) {
        log('Using mock data');
        // Try to load from localStorage first (for client-side)
        if ("TURBOPACK compile-time truthy", 1) {
            const storedCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadCategories"])();
            if (storedCategories && storedCategories.length > 0) {
                return storedCategories;
            }
        }
        return [
            ...mockCategories
        ];
    }
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            log('No database client available, falling back to mock data');
            return [
                ...mockCategories
            ];
        }
        const result = await client.execute('SELECT * FROM categories');
        return result.rows.map((row)=>({
                id: row.id.toString(),
                name: row.name,
                slug: row.slug,
                description: row.description,
                status: row.status,
                productCount: row.product_count,
                createdAt: row.created_at?.toISOString() || new Date().toISOString(),
                updatedAt: row.updated_at?.toISOString() || new Date().toISOString()
            }));
    } catch (error) {
        log('Error getting all categories:', error);
        log('Falling back to mock data');
        return [
            ...mockCategories
        ];
    }
}
async function getCategoryById(id) {
    log(`Getting category by ID: ${id}`);
    if (shouldUseMockData()) {
        log('Using mock data');
        const category = mockCategories.find((c)=>c.id === id);
        return category || null;
    }
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            log('No database client available, falling back to mock data');
            const category = mockCategories.find((c)=>c.id === id);
            return category || null;
        }
        const result = await client.execute('SELECT * FROM categories WHERE id = ?', [
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
            name: row.name,
            slug: row.slug,
            description: row.description,
            status: row.status,
            productCount: row.product_count,
            createdAt: row.created_at?.toISOString() || new Date().toISOString(),
            updatedAt: row.updated_at?.toISOString() || new Date().toISOString()
        };
    } catch (error) {
        log('Error getting category by ID:', error);
        log('Falling back to mock data');
        const category = mockCategories.find((c)=>c.id === id);
        return category || null;
    }
}
async function createCategory(data) {
    log('Creating new category:', data);
    const now = new Date();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
    const slug = data.slug || generateSlug(data.name);
    const newCategory = {
        id,
        name: data.name,
        slug,
        description: data.description,
        status: data.status,
        productCount: 0,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString()
    };
    if (shouldUseMockData()) {
        log('Using mock data for category creation');
        mockCategories.push(newCategory);
        // Save to localStorage for persistence
        if ("TURBOPACK compile-time truthy", 1) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addCategory"])(newCategory);
        }
        return newCategory;
    }
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            log('No database client available, falling back to mock data');
            mockCategories.push(newCategory);
            // Save to localStorage for persistence
            if ("TURBOPACK compile-time truthy", 1) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addCategory"])(newCategory);
            }
            return newCategory;
        }
        console.log('Saving category to database:', newCategory);
        await client.execute('INSERT INTO categories (id, name, slug, description, status, product_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
            id,
            data.name,
            slug,
            data.description,
            data.status,
            0,
            now,
            now
        ], {
            prepare: true
        });
        console.log('Category saved successfully to database');
        return newCategory;
    } catch (error) {
        console.error('Error creating category in database:', error);
        log('Falling back to mock data');
        mockCategories.push(newCategory);
        // Save to localStorage for persistence
        if ("TURBOPACK compile-time truthy", 1) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addCategory"])(newCategory);
        }
        return newCategory;
    }
}
async function updateCategory(id, data) {
    log(`Updating category ${id} with:`, data);
    if (shouldUseMockData()) {
        log('Using mock data');
        const index = mockCategories.findIndex((c)=>c.id === id);
        if (index === -1) {
            return null;
        }
        const now = new Date();
        const updatedCategory = {
            ...mockCategories[index],
            ...data,
            updatedAt: now.toISOString()
        };
        mockCategories[index] = updatedCategory;
        // Update in localStorage using our dedicated function
        if ("TURBOPACK compile-time truthy", 1) {
            console.log('Updating category in localStorage (fallback):', id);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateCategoryInStorage"])(id, data);
        }
        return updatedCategory;
    }
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            log('No database client available, falling back to mock data');
            const index = mockCategories.findIndex((c)=>c.id === id);
            if (index === -1) {
                return null;
            }
            const now = new Date();
            const updatedCategory = {
                ...mockCategories[index],
                ...data,
                updatedAt: now.toISOString()
            };
            mockCategories[index] = updatedCategory;
            // Update in localStorage using our dedicated function
            if ("TURBOPACK compile-time truthy", 1) {
                console.log('Updating category in localStorage (fallback):', id);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateCategoryInStorage"])(id, data);
            }
            return updatedCategory;
        }
        // First check if the category exists
        const existing = await getCategoryById(id);
        if (!existing) {
            return null;
        }
        const now = new Date();
        // Construct query dynamically based on provided fields
        let query = 'UPDATE categories SET updated_at = ?';
        const params = [
            now
        ];
        if (data.name) {
            query += ', name = ?';
            params.push(data.name);
        }
        if (data.slug) {
            query += ', slug = ?';
            params.push(data.slug);
        } else if (data.name && !data.slug) {
            // Auto-update slug if name changes but slug is not provided
            const newSlug = generateSlug(data.name);
            query += ', slug = ?';
            params.push(newSlug);
        }
        if (data.description !== undefined) {
            query += ', description = ?';
            params.push(data.description);
        }
        if (data.status) {
            query += ', status = ?';
            params.push(data.status);
        }
        if (data.productCount !== undefined) {
            query += ', product_count = ?';
            params.push(data.productCount);
        }
        query += ' WHERE id = ?';
        params.push(id);
        await client.execute(query, params, {
            prepare: true
        });
        // Return the updated category
        return {
            ...existing,
            ...data,
            updatedAt: now.toISOString()
        };
    } catch (error) {
        log('Error updating category:', error);
        log('Falling back to mock data');
        const index = mockCategories.findIndex((c)=>c.id === id);
        if (index === -1) {
            return null;
        }
        const now = new Date();
        const updatedCategory = {
            ...mockCategories[index],
            ...data,
            updatedAt: now.toISOString()
        };
        mockCategories[index] = updatedCategory;
        // Update in localStorage using our dedicated function
        if ("TURBOPACK compile-time truthy", 1) {
            console.log('Updating category in localStorage (error fallback):', id);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateCategoryInStorage"])(id, data);
        }
        return updatedCategory;
    }
}
async function deleteCategory(id) {
    log(`Deleting category ${id}`);
    if (shouldUseMockData()) {
        log('Using mock data');
        const index = mockCategories.findIndex((c)=>c.id === id);
        if (index === -1) {
            return false;
        }
        mockCategories.splice(index, 1);
        // Remove from localStorage using our dedicated function
        if ("TURBOPACK compile-time truthy", 1) {
            console.log('Deleting category from localStorage (fallback):', id);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteCategoryFromStorage"])(id);
        }
        return true;
    }
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            log('No database client available, falling back to mock data');
            const index = mockCategories.findIndex((c)=>c.id === id);
            if (index === -1) {
                return false;
            }
            mockCategories.splice(index, 1);
            // Remove from localStorage using our dedicated function
            if ("TURBOPACK compile-time truthy", 1) {
                console.log('Deleting category from localStorage (fallback):', id);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteCategoryFromStorage"])(id);
            }
            return true;
        }
        // First check if the category exists
        const existing = await getCategoryById(id);
        if (!existing) {
            return false;
        }
        await client.execute('DELETE FROM categories WHERE id = ?', [
            id
        ], {
            prepare: true
        });
        return true;
    } catch (error) {
        log('Error deleting category:', error);
        log('Falling back to mock data');
        const index = mockCategories.findIndex((c)=>c.id === id);
        if (index === -1) {
            return false;
        }
        mockCategories.splice(index, 1);
        // Remove from localStorage using our dedicated function
        if ("TURBOPACK compile-time truthy", 1) {
            console.log('Deleting category from localStorage (error fallback):', id);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteCategoryFromStorage"])(id);
        }
        return true;
    }
}
async function updateCategoryStatus(id, status) {
    log(`Updating category ${id} status to ${status}`);
    return updateCategory(id, {
        status
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/services/brand-service.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "createBrand": (()=>createBrand),
    "deleteBrand": (()=>deleteBrand),
    "getAllBrands": (()=>getAllBrands),
    "getBrandById": (()=>getBrandById),
    "updateBrand": (()=>updateBrand),
    "updateBrandStatus": (()=>updateBrandStatus)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/v4.js [app-client] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cassandra.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/local-storage.ts [app-client] (ecmascript)");
;
;
;
// In-memory storage for development - will be initialized from localStorage if available
let mockBrands = [
    {
        id: '550e8400-e29b-41d4-a716-446655440010',
        name: 'Apple',
        slug: 'apple',
        logo: 'https://example.com/logos/apple.png',
        status: 'Active',
        productCount: 42,
        createdAt: new Date(2023, 6, 15).toISOString(),
        updatedAt: new Date(2023, 6, 15).toISOString()
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440011',
        name: 'Samsung',
        slug: 'samsung',
        logo: 'https://example.com/logos/samsung.png',
        status: 'Active',
        productCount: 128,
        createdAt: new Date(2023, 5, 10).toISOString(),
        updatedAt: new Date(2023, 7, 5).toISOString()
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440012',
        name: 'Sony',
        slug: 'sony',
        logo: 'https://example.com/logos/sony.png',
        status: 'Active',
        productCount: 76,
        createdAt: new Date(2023, 4, 22).toISOString(),
        updatedAt: new Date(2023, 4, 22).toISOString()
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440013',
        name: 'LG',
        slug: 'lg',
        logo: 'https://example.com/logos/lg.png',
        status: 'Inactive',
        productCount: 45,
        createdAt: new Date(2023, 3, 5).toISOString(),
        updatedAt: new Date(2023, 8, 1).toISOString()
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440014',
        name: 'HP',
        slug: 'hp',
        logo: 'https://example.com/logos/hp.png',
        status: 'Active',
        productCount: 65,
        createdAt: new Date(2023, 7, 12).toISOString(),
        updatedAt: new Date(2023, 7, 12).toISOString()
    }
];
// Initialize mock data from localStorage if available
if ("TURBOPACK compile-time truthy", 1) {
    const storedBrands = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadBrands"])();
    if (storedBrands && storedBrands.length > 0) {
        console.log('Initializing brands from localStorage:', storedBrands.length);
        mockBrands = storedBrands;
    } else {
        // Store initial mock data to localStorage
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveBrands"])(mockBrands);
    }
}
// Environment check - use this to toggle between mock and real data
// Force a check for database connection on each request
const DEBUG = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.DEBUG_BRANDS === 'true';
// Helper function to log debugging information
function log(...args) {
    if (DEBUG) {
        console.log('[BrandService]', ...args);
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
async function getAllBrands() {
    log('Getting all brands');
    if (shouldUseMockData()) {
        log('Using mock data');
        // Try to load from localStorage first (for client-side)
        if ("TURBOPACK compile-time truthy", 1) {
            const storedBrands = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadBrands"])();
            if (storedBrands && storedBrands.length > 0) {
                return storedBrands;
            }
        }
        return [
            ...mockBrands
        ];
    }
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            log('No database client available, falling back to mock data');
            return [
                ...mockBrands
            ];
        }
        const result = await client.execute('SELECT * FROM brands');
        return result.rows.map((row)=>({
                id: row.id.toString(),
                name: row.name,
                slug: row.slug,
                logo: row.logo,
                status: row.status,
                productCount: row.product_count,
                createdAt: row.created_at?.toISOString() || new Date().toISOString(),
                updatedAt: row.updated_at?.toISOString() || new Date().toISOString()
            }));
    } catch (error) {
        log('Error getting all brands:', error);
        log('Falling back to mock data');
        return [
            ...mockBrands
        ];
    }
}
async function getBrandById(id) {
    log(`Getting brand by ID: ${id}`);
    if (shouldUseMockData()) {
        log('Using mock data');
        const brand = mockBrands.find((b)=>b.id === id);
        return brand || null;
    }
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            log('No database client available, falling back to mock data');
            const brand = mockBrands.find((b)=>b.id === id);
            return brand || null;
        }
        const result = await client.execute('SELECT * FROM brands WHERE id = ?', [
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
            name: row.name,
            slug: row.slug,
            logo: row.logo,
            status: row.status,
            productCount: row.product_count,
            createdAt: row.created_at?.toISOString() || new Date().toISOString(),
            updatedAt: row.updated_at?.toISOString() || new Date().toISOString()
        };
    } catch (error) {
        log('Error getting brand by ID:', error);
        log('Falling back to mock data');
        const brand = mockBrands.find((b)=>b.id === id);
        return brand || null;
    }
}
async function createBrand(data) {
    log('Creating new brand:', data);
    const now = new Date();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
    const slug = data.slug || generateSlug(data.name);
    const newBrand = {
        id,
        name: data.name,
        slug,
        logo: data.logo,
        status: data.status,
        productCount: 0,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString()
    };
    if (shouldUseMockData()) {
        log('Using mock data for brand creation');
        mockBrands.push(newBrand);
        // Save to localStorage for persistence
        if ("TURBOPACK compile-time truthy", 1) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addBrand"])(newBrand);
        }
        return newBrand;
    }
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            log('No database client available, falling back to mock data');
            mockBrands.push(newBrand);
            // Save to localStorage for persistence
            if ("TURBOPACK compile-time truthy", 1) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addBrand"])(newBrand);
            }
            return newBrand;
        }
        console.log('Saving brand to database:', newBrand);
        await client.execute('INSERT INTO brands (id, name, slug, logo, status, product_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
            id,
            data.name,
            slug,
            data.logo || null,
            data.status,
            0,
            now,
            now
        ], {
            prepare: true
        });
        console.log('Brand saved successfully to database');
        return newBrand;
    } catch (error) {
        console.error('Error creating brand in database:', error);
        log('Falling back to mock data');
        mockBrands.push(newBrand);
        // Save to localStorage for persistence
        if ("TURBOPACK compile-time truthy", 1) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addBrand"])(newBrand);
        }
        return newBrand;
    }
}
async function updateBrand(id, data) {
    log(`Updating brand ${id} with:`, data);
    if (shouldUseMockData()) {
        log('Using mock data');
        const index = mockBrands.findIndex((b)=>b.id === id);
        if (index === -1) {
            return null;
        }
        const now = new Date();
        const updatedBrand = {
            ...mockBrands[index],
            ...data,
            updatedAt: now.toISOString()
        };
        mockBrands[index] = updatedBrand;
        // Update in localStorage using our dedicated function
        if ("TURBOPACK compile-time truthy", 1) {
            console.log('Updating brand in localStorage:', id);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateBrandInStorage"])(id, data);
        }
        return updatedBrand;
    }
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            log('No database client available, falling back to mock data');
            const index = mockBrands.findIndex((b)=>b.id === id);
            if (index === -1) {
                return null;
            }
            const now = new Date();
            const updatedBrand = {
                ...mockBrands[index],
                ...data,
                updatedAt: now.toISOString()
            };
            mockBrands[index] = updatedBrand;
            // Update in localStorage using our dedicated function
            if ("TURBOPACK compile-time truthy", 1) {
                console.log('Updating brand in localStorage (fallback):', id);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateBrandInStorage"])(id, data);
            }
            return updatedBrand;
        }
        // First check if the brand exists
        const existing = await getBrandById(id);
        if (!existing) {
            return null;
        }
        const now = new Date();
        // Construct query dynamically based on provided fields
        let query = 'UPDATE brands SET updated_at = ?';
        const params = [
            now
        ];
        if (data.name) {
            query += ', name = ?';
            params.push(data.name);
        }
        if (data.slug) {
            query += ', slug = ?';
            params.push(data.slug);
        } else if (data.name && !data.slug) {
            // Auto-update slug if name changes but slug is not provided
            const newSlug = generateSlug(data.name);
            query += ', slug = ?';
            params.push(newSlug);
        }
        if (data.logo !== undefined) {
            query += ', logo = ?';
            params.push(data.logo);
        }
        if (data.status) {
            query += ', status = ?';
            params.push(data.status);
        }
        if (data.productCount !== undefined) {
            query += ', product_count = ?';
            params.push(data.productCount);
        }
        query += ' WHERE id = ?';
        params.push(id);
        await client.execute(query, params, {
            prepare: true
        });
        // Return the updated brand
        return {
            ...existing,
            ...data,
            updatedAt: now.toISOString()
        };
    } catch (error) {
        log('Error updating brand:', error);
        log('Falling back to mock data');
        const index = mockBrands.findIndex((b)=>b.id === id);
        if (index === -1) {
            return null;
        }
        const now = new Date();
        const updatedBrand = {
            ...mockBrands[index],
            ...data,
            updatedAt: now.toISOString()
        };
        mockBrands[index] = updatedBrand;
        // Update in localStorage using our dedicated function
        if ("TURBOPACK compile-time truthy", 1) {
            console.log('Updating brand in localStorage (error fallback):', id);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateBrandInStorage"])(id, data);
        }
        return updatedBrand;
    }
}
async function deleteBrand(id) {
    log(`Deleting brand ${id}`);
    if (shouldUseMockData()) {
        log('Using mock data');
        const index = mockBrands.findIndex((b)=>b.id === id);
        if (index === -1) {
            return false;
        }
        mockBrands.splice(index, 1);
        // Remove from localStorage using our dedicated function
        if ("TURBOPACK compile-time truthy", 1) {
            console.log('Deleting brand from localStorage:', id);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteBrandFromStorage"])(id);
        }
        return true;
    }
    try {
        const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClient"])();
        if (!client) {
            log('No database client available, falling back to mock data');
            const index = mockBrands.findIndex((b)=>b.id === id);
            if (index === -1) {
                return false;
            }
            mockBrands.splice(index, 1);
            // Remove from localStorage using our dedicated function
            if ("TURBOPACK compile-time truthy", 1) {
                console.log('Deleting brand from localStorage (fallback):', id);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteBrandFromStorage"])(id);
            }
            return true;
        }
        // First check if the brand exists
        const existing = await getBrandById(id);
        if (!existing) {
            return false;
        }
        await client.execute('DELETE FROM brands WHERE id = ?', [
            id
        ], {
            prepare: true
        });
        return true;
    } catch (error) {
        log('Error deleting brand:', error);
        log('Falling back to mock data');
        const index = mockBrands.findIndex((b)=>b.id === id);
        if (index === -1) {
            return false;
        }
        mockBrands.splice(index, 1);
        // Remove from localStorage using our dedicated function
        if ("TURBOPACK compile-time truthy", 1) {
            console.log('Deleting brand from localStorage (error fallback):', id);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteBrandFromStorage"])(id);
        }
        return true;
    }
}
async function updateBrandStatus(id, status) {
    log(`Updating brand ${id} status to ${status}`);
    return updateBrand(id, {
        status
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/products/ProductFilters.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ProductFilters)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$category$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/category-service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$brand$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/brand-service.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function ProductFilters({ onFilterChange, currentFilters }) {
    _s();
    // Local state for filters
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(currentFilters.search || '');
    const [productType, setProductType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(currentFilters.productType || '');
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(currentFilters.status || '');
    const [categoryId, setCategoryId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(currentFilters.categoryId || '');
    const [brandId, setBrandId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(currentFilters.brandId || '');
    // State for options from API
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [brands, setBrands] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Load categories and brands on component mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductFilters.useEffect": ()=>{
            const loadFilters = {
                "ProductFilters.useEffect.loadFilters": async ()=>{
                    setIsLoading(true);
                    try {
                        // Load categories
                        const categoriesData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$category$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllCategories"])();
                        setCategories(categoriesData.filter({
                            "ProductFilters.useEffect.loadFilters": (cat)=>cat.status === 'Active'
                        }["ProductFilters.useEffect.loadFilters"]).map({
                            "ProductFilters.useEffect.loadFilters": (cat)=>({
                                    id: cat.id,
                                    name: cat.name
                                })
                        }["ProductFilters.useEffect.loadFilters"]));
                        // Load brands
                        const brandsData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$brand$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllBrands"])();
                        setBrands(brandsData.filter({
                            "ProductFilters.useEffect.loadFilters": (brand)=>brand.status === 'Active'
                        }["ProductFilters.useEffect.loadFilters"]).map({
                            "ProductFilters.useEffect.loadFilters": (brand)=>({
                                    id: brand.id,
                                    name: brand.name
                                })
                        }["ProductFilters.useEffect.loadFilters"]));
                    } catch (error) {
                        console.error('Error loading filter options:', error);
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["ProductFilters.useEffect.loadFilters"];
            loadFilters();
        }
    }["ProductFilters.useEffect"], []);
    // Handle search input changes with debounce
    const handleSearchChange = (value)=>{
        setSearch(value);
        // Debounce search to avoid too many requests
        const timeoutId = setTimeout(()=>{
            onFilterChange({
                ...currentFilters,
                search: value
            });
        }, 300);
        return ()=>clearTimeout(timeoutId);
    };
    // Handle filter changes
    const handleFilterChange = (field, value)=>{
        // Update local state
        switch(field){
            case 'productType':
                setProductType(value);
                break;
            case 'status':
                setStatus(value);
                break;
            case 'categoryId':
                setCategoryId(value);
                break;
            case 'brandId':
                setBrandId(value);
                break;
        }
        // Update parent component
        onFilterChange({
            ...currentFilters,
            [field]: value || undefined
        });
    };
    // Handle clear filters
    const handleClearFilters = ()=>{
        setSearch('');
        setProductType('');
        setStatus('');
        setCategoryId('');
        setBrandId('');
        onFilterChange({});
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white p-4 shadow rounded-lg mb-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "search",
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "Search"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/ProductFilters.tsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                id: "search",
                                name: "search",
                                placeholder: "Search by name or SKU",
                                value: search,
                                onChange: (e)=>handleSearchChange(e.target.value),
                                className: "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/ProductFilters.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/products/ProductFilters.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full md:w-48",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "productType",
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "Product Type"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/ProductFilters.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                id: "productType",
                                name: "productType",
                                value: productType,
                                onChange: (e)=>handleFilterChange('productType', e.target.value),
                                className: "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "All Types"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/ProductFilters.tsx",
                                        lineNumber: 156,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Simple",
                                        children: "Simple"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/ProductFilters.tsx",
                                        lineNumber: 157,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Configurable",
                                        children: "Configurable"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/ProductFilters.tsx",
                                        lineNumber: 158,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Virtual",
                                        children: "Virtual"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/ProductFilters.tsx",
                                        lineNumber: 159,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Downloadable",
                                        children: "Downloadable"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/ProductFilters.tsx",
                                        lineNumber: 160,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Grouped",
                                        children: "Grouped"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/ProductFilters.tsx",
                                        lineNumber: 161,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Bundled",
                                        children: "Bundled"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/ProductFilters.tsx",
                                        lineNumber: 162,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/products/ProductFilters.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/products/ProductFilters.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full md:w-36",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "status",
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "Status"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/ProductFilters.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                id: "status",
                                name: "status",
                                value: status,
                                onChange: (e)=>handleFilterChange('status', e.target.value),
                                className: "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "All Statuses"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/ProductFilters.tsx",
                                        lineNumber: 178,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Enabled",
                                        children: "Enabled"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/ProductFilters.tsx",
                                        lineNumber: 179,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Disabled",
                                        children: "Disabled"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/ProductFilters.tsx",
                                        lineNumber: 180,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/products/ProductFilters.tsx",
                                lineNumber: 171,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/products/ProductFilters.tsx",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full md:w-48",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "category",
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "Category"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/ProductFilters.tsx",
                                lineNumber: 186,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                id: "category",
                                name: "category",
                                value: categoryId,
                                onChange: (e)=>handleFilterChange('categoryId', e.target.value),
                                className: "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                                disabled: isLoading,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "All Categories"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/ProductFilters.tsx",
                                        lineNumber: 197,
                                        columnNumber: 13
                                    }, this),
                                    categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: category.id,
                                            children: category.name
                                        }, category.id, false, {
                                            fileName: "[project]/src/components/products/ProductFilters.tsx",
                                            lineNumber: 199,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/products/ProductFilters.tsx",
                                lineNumber: 189,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/products/ProductFilters.tsx",
                        lineNumber: 185,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full md:w-48",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "brand",
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "Brand"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/ProductFilters.tsx",
                                lineNumber: 208,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                id: "brand",
                                name: "brand",
                                value: brandId,
                                onChange: (e)=>handleFilterChange('brandId', e.target.value),
                                className: "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                                disabled: isLoading,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "All Brands"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/ProductFilters.tsx",
                                        lineNumber: 219,
                                        columnNumber: 13
                                    }, this),
                                    brands.map((brand)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: brand.id,
                                            children: brand.name
                                        }, brand.id, false, {
                                            fileName: "[project]/src/components/products/ProductFilters.tsx",
                                            lineNumber: 221,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/products/ProductFilters.tsx",
                                lineNumber: 211,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/products/ProductFilters.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/ProductFilters.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex justify-end",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: handleClearFilters,
                    className: "px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                    children: "Clear Filters"
                }, void 0, false, {
                    fileName: "[project]/src/components/products/ProductFilters.tsx",
                    lineNumber: 231,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/products/ProductFilters.tsx",
                lineNumber: 230,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/products/ProductFilters.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
_s(ProductFilters, "ezedSvfSjMy0VVdT+nJgisYnlGU=");
_c = ProductFilters;
var _c;
__turbopack_context__.k.register(_c, "ProductFilters");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/products/BulkActions.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>BulkActions)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function BulkActions({ selectedIds, onBulkStatusChange, onBulkDelete }) {
    if (selectedIds.length === 0) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-blue-50 p-4 rounded-lg shadow-sm mb-6 flex items-center justify-between",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-blue-800",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-medium",
                        children: selectedIds.length
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/BulkActions.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    " products selected"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/BulkActions.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex space-x-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            onChange: (e)=>onBulkStatusChange(e.target.value),
                            className: "border border-blue-300 rounded px-3 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "Change Status"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/products/BulkActions.tsx",
                                    lineNumber: 31,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "Enabled",
                                    children: "Enable"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/products/BulkActions.tsx",
                                    lineNumber: 32,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "Disabled",
                                    children: "Disable"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/products/BulkActions.tsx",
                                    lineNumber: 33,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/products/BulkActions.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/BulkActions.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onBulkDelete,
                        className: "bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
                        children: "Delete Selected"
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/BulkActions.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/BulkActions.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/products/BulkActions.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = BulkActions;
var _c;
__turbopack_context__.k.register(_c, "BulkActions");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/products/DeleteConfirmationDialog.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>DeleteConfirmationDialog)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function DeleteConfirmationDialog({ isOpen, title, message, confirmButtonText, cancelButtonText, onConfirm, onCancel, isDeleting = false }) {
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg max-w-md w-full mx-4 overflow-hidden shadow-xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 py-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-lg font-medium text-red-600 mb-2",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/src/components/products/DeleteConfirmationDialog.tsx",
                            lineNumber: 30,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-700",
                            children: message
                        }, void 0, false, {
                            fileName: "[project]/src/components/products/DeleteConfirmationDialog.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/products/DeleteConfirmationDialog.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 py-4 bg-gray-50 flex justify-end space-x-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onCancel,
                            disabled: isDeleting,
                            className: `px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 
              ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`,
                            children: cancelButtonText
                        }, void 0, false, {
                            fileName: "[project]/src/components/products/DeleteConfirmationDialog.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onConfirm,
                            disabled: isDeleting,
                            className: `px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700 
              ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`,
                            children: isDeleting ? 'Deleting...' : confirmButtonText
                        }, void 0, false, {
                            fileName: "[project]/src/components/products/DeleteConfirmationDialog.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/products/DeleteConfirmationDialog.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/products/DeleteConfirmationDialog.tsx",
            lineNumber: 28,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/products/DeleteConfirmationDialog.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c = DeleteConfirmationDialog;
var _c;
__turbopack_context__.k.register(_c, "DeleteConfirmationDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/dashboard/products/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ProductsPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$product$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/product-service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$products$2f$ProductTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/products/ProductTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$products$2f$ProductFilters$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/products/ProductFilters.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$products$2f$BulkActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/products/BulkActions.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$products$2f$DeleteConfirmationDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/products/DeleteConfirmationDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function ProductsPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // State for products
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedIds, setSelectedIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Pagination
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [totalPages, setTotalPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [total, setTotal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Sorting
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('createdAt');
    const [sortOrder, setSortOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('desc');
    // Filters
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    // Delete confirmation
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDeleting, setIsDeleting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [productToDelete, setProductToDelete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Load products on component mount and when dependencies change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductsPage.useEffect": ()=>{
            loadProducts();
        }
    }["ProductsPage.useEffect"], [
        page,
        sortBy,
        sortOrder,
        filters
    ]);
    // Function to load products
    const loadProducts = async ()=>{
        setIsLoading(true);
        setError(null);
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$product$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllProducts"])({
                page,
                limit: 10,
                search: filters.search,
                sortBy: sortBy,
                sortOrder,
                productType: filters.productType,
                status: filters.status,
                categoryId: filters.categoryId,
                brandId: filters.brandId
            });
            setProducts(response.products);
            setTotal(response.total);
            setTotalPages(response.totalPages);
            // Reset selected IDs when products change
            setSelectedIds([]);
        } catch (err) {
            console.error('Error loading products:', err);
            setError('Failed to load products. Please try again.');
        } finally{
            setIsLoading(false);
        }
    };
    // Handle page change
    const handlePageChange = (newPage)=>{
        setPage(newPage);
    };
    // Handle sort change
    const handleSortChange = (field, order)=>{
        setSortBy(field);
        setSortOrder(order);
    };
    // Handle filter change
    const handleFilterChange = (newFilters)=>{
        setFilters(newFilters);
        setPage(1); // Reset to first page when filters change
    };
    // Handle selection change
    const handleSelectionChange = (ids)=>{
        setSelectedIds(ids);
    };
    // Handle status update
    const handleStatusUpdate = async (id, status)=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$product$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateProduct"])(id, {
                status
            });
            setProducts((prev)=>prev.map((product)=>product.id === id ? {
                        ...product,
                        status,
                        updatedAt: new Date().toISOString()
                    } : product));
        } catch (err) {
            console.error('Error updating product status:', err);
            setError('Failed to update product status. Please try again.');
        }
    };
    // Handle delete click
    const handleDeleteClick = (product)=>{
        setProductToDelete(product);
        setIsDeleteDialogOpen(true);
    };
    // Handle edit click
    const handleEditClick = (product)=>{
        router.push(`/dashboard/products/edit/${product.id}`);
    };
    // Handle view click
    const handleViewClick = (product)=>{
        router.push(`/dashboard/products/view/${product.id}`);
    };
    // Confirm delete
    const confirmDelete = async ()=>{
        if (!productToDelete) return;
        setIsDeleting(true);
        try {
            const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$product$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteProduct"])(productToDelete.id);
            if (success) {
                setProducts((prev)=>prev.filter((p)=>p.id !== productToDelete.id));
                // If this was the last product on the page and not the first page, go to previous page
                if (products.length === 1 && page > 1) {
                    setPage((prev)=>prev - 1);
                }
            } else {
                setError('Failed to delete product. Please try again.');
            }
        } catch (err) {
            console.error('Error deleting product:', err);
            setError('Failed to delete product. Please try again.');
        } finally{
            setIsDeleting(false);
            setIsDeleteDialogOpen(false);
            setProductToDelete(null);
        }
    };
    // Handle bulk status change
    const handleBulkStatusChange = async (status)=>{
        if (selectedIds.length === 0 || !status) return;
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$product$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bulkUpdateProductStatus"])(selectedIds, status);
            if (result.success) {
                // Update local state
                setProducts((prev)=>prev.map((product)=>selectedIds.includes(product.id) ? {
                            ...product,
                            status,
                            updatedAt: new Date().toISOString()
                        } : product));
                setSelectedIds([]);
            } else {
                setError(`Failed to update status for ${selectedIds.length} products. Please try again.`);
            }
        } catch (err) {
            console.error('Error bulk updating product status:', err);
            setError('Failed to update product statuses. Please try again.');
        }
    };
    // Handle bulk delete
    const handleBulkDelete = ()=>{
        if (selectedIds.length === 0) return;
        setIsBulkDeleteDialogOpen(true);
    };
    // Confirm bulk delete
    const confirmBulkDelete = async ()=>{
        if (selectedIds.length === 0) return;
        setIsDeleting(true);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$product$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bulkDeleteProducts"])(selectedIds);
            if (result.success) {
                // If all products on current page are deleted and not the first page, go to previous page
                if (result.count === products.length && page > 1) {
                    setPage((prev)=>prev - 1);
                } else {
                    // Otherwise just refresh the current page
                    await loadProducts();
                }
            } else {
                setError(`Failed to delete ${selectedIds.length} products. Please try again.`);
            }
        } catch (err) {
            console.error('Error bulk deleting products:', err);
            setError('Failed to delete products. Please try again.');
        } finally{
            setIsDeleting(false);
            setIsBulkDeleteDialogOpen(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto px-4 py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold text-gray-900",
                                children: "Products"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/products/page.tsx",
                                lineNumber: 244,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm text-gray-600",
                                children: "Manage your product inventory, pricing, and details."
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/products/page.tsx",
                                lineNumber: 245,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/products/page.tsx",
                        lineNumber: 243,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 sm:mt-0 flex flex-col sm:flex-row gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/dashboard/products/add-dummy-products",
                                className: "px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700",
                                children: "Add Dummy Products"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/products/page.tsx",
                                lineNumber: 250,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/dashboard/products/add",
                                className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700",
                                children: "Add Product"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/products/page.tsx",
                                lineNumber: 256,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/products/page.tsx",
                        lineNumber: 249,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/products/page.tsx",
                lineNumber: 242,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/products/page.tsx",
                lineNumber: 266,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$products$2f$ProductFilters$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onFilterChange: handleFilterChange,
                currentFilters: filters
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/products/page.tsx",
                lineNumber: 272,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$products$2f$BulkActions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                selectedIds: selectedIds,
                onBulkStatusChange: handleBulkStatusChange,
                onBulkDelete: handleBulkDelete
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/products/page.tsx",
                lineNumber: 278,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$products$2f$ProductTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                products: products,
                total: total,
                page: page,
                totalPages: totalPages,
                isLoading: isLoading,
                onPageChange: handlePageChange,
                onSortChange: handleSortChange,
                onStatusUpdate: handleStatusUpdate,
                onDeleteClick: handleDeleteClick,
                onEditClick: handleEditClick,
                onViewClick: handleViewClick,
                onSelectionChange: handleSelectionChange,
                currentSort: {
                    field: sortBy,
                    order: sortOrder
                }
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/products/page.tsx",
                lineNumber: 285,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$products$2f$DeleteConfirmationDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isDeleteDialogOpen,
                title: "Delete Product",
                message: `Are you sure you want to delete the product "${productToDelete?.name}"? This action cannot be undone.`,
                confirmButtonText: "Delete",
                cancelButtonText: "Cancel",
                onConfirm: confirmDelete,
                onCancel: ()=>{
                    setIsDeleteDialogOpen(false);
                    setProductToDelete(null);
                },
                isDeleting: isDeleting
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/products/page.tsx",
                lineNumber: 302,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$products$2f$DeleteConfirmationDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isBulkDeleteDialogOpen,
                title: "Delete Multiple Products",
                message: `Are you sure you want to delete ${selectedIds.length} products? This action cannot be undone.`,
                confirmButtonText: "Delete All",
                cancelButtonText: "Cancel",
                onConfirm: confirmBulkDelete,
                onCancel: ()=>setIsBulkDeleteDialogOpen(false),
                isDeleting: isDeleting
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/products/page.tsx",
                lineNumber: 317,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/products/page.tsx",
        lineNumber: 241,
        columnNumber: 5
    }, this);
}
_s(ProductsPage, "aXi/Tv7n72yuM2r/ozX4JMPQ9JM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ProductsPage;
var _c;
__turbopack_context__.k.register(_c, "ProductsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_2d23b213._.js.map