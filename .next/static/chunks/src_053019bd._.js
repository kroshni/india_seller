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
"[project]/src/components/products/form-sections/BasicInfoSection.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>BasicInfoSection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function BasicInfoSection({ values, onChange, errors }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-medium text-gray-900",
                children: "Basic Information"
            }, void 0, false, {
                fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "sku",
                        className: "block text-sm font-medium text-gray-700",
                        children: [
                            "SKU ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-red-500",
                                children: "*"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                                lineNumber: 23,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        id: "sku",
                        value: values.sku || '',
                        onChange: (e)=>onChange('sku', e.target.value),
                        className: `mt-1 block w-full border ${errors.sku ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    errors.sku && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-red-600",
                        children: errors.sku
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 35,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-gray-500",
                        children: "Stock Keeping Unit. A unique identifier for your product."
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "name",
                        className: "block text-sm font-medium text-gray-700",
                        children: [
                            "Product Name ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-red-500",
                                children: "*"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                                lineNumber: 45,
                                columnNumber: 24
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        id: "name",
                        value: values.name || '',
                        onChange: (e)=>onChange('name', e.target.value),
                        className: `mt-1 block w-full border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    errors.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-red-600",
                        children: errors.name
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "slug",
                        className: "block text-sm font-medium text-gray-700",
                        children: "Slug"
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        id: "slug",
                        value: values.slug || '',
                        onChange: (e)=>onChange('slug', e.target.value),
                        className: `mt-1 block w-full border ${errors.slug ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    errors.slug && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-red-600",
                        children: errors.slug
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-gray-500",
                        children: "URL-friendly version of the product name. Leave empty to generate automatically."
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "shortDescription",
                        className: "block text-sm font-medium text-gray-700",
                        children: "Short Description"
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        id: "shortDescription",
                        rows: 2,
                        value: values.shortDescription || '',
                        onChange: (e)=>onChange('shortDescription', e.target.value),
                        className: `mt-1 block w-full border ${errors.shortDescription ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    errors.shortDescription && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-red-600",
                        children: errors.shortDescription
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-gray-500",
                        children: "Brief summary of the product (displayed in product listings)."
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "description",
                        className: "block text-sm font-medium text-gray-700",
                        children: "Full Description"
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        id: "description",
                        rows: 5,
                        value: values.description || '',
                        onChange: (e)=>onChange('description', e.target.value),
                        className: `mt-1 block w-full border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this),
                    errors.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-red-600",
                        children: errors.description
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 120,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-gray-500",
                        children: "Detailed description of the product (displayed on product detail page)."
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "visibility",
                        className: "block text-sm font-medium text-gray-700",
                        children: "Visibility"
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        id: "visibility",
                        value: values.visibility || 'Both',
                        onChange: (e)=>onChange('visibility', e.target.value),
                        className: `mt-1 block w-full border ${errors.visibility ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Both",
                                children: "Visible in Store & Search"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Store",
                                children: "Visible in Store Only"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Search",
                                children: "Visible in Search Only"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "None",
                                children: "Not Visible"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this),
                    errors.visibility && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-red-600",
                        children: errors.visibility
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 146,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "status",
                        className: "block text-sm font-medium text-gray-700",
                        children: "Status"
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        id: "status",
                        value: values.status || 'Disabled',
                        onChange: (e)=>onChange('status', e.target.value),
                        className: `mt-1 block w-full border ${errors.status ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Enabled",
                                children: "Enabled"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Disabled",
                                children: "Disabled"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                                lineNumber: 164,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, this),
                    errors.status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-red-600",
                        children: errors.status
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 167,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-gray-500",
                        children: "Disabled products won't be displayed on the storefront."
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                        lineNumber: 169,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/products/form-sections/BasicInfoSection.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_c = BasicInfoSection;
var _c;
__turbopack_context__.k.register(_c, "BasicInfoSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/products/form-sections/PricingSection.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PricingSection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function PricingSection({ values, onChange, errors }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-medium text-gray-900",
                children: "Pricing Information"
            }, void 0, false, {
                fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "price",
                        className: "block text-sm font-medium text-gray-700",
                        children: [
                            "Regular Price ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-red-500",
                                children: "*"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                                lineNumber: 23,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1 relative rounded-md shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-500 sm:text-sm",
                                    children: "₹"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                                    lineNumber: 27,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                                lineNumber: 26,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                id: "price",
                                min: "0",
                                step: "0.01",
                                value: values.price || '',
                                onChange: (e)=>onChange('price', parseFloat(e.target.value) || 0),
                                className: `block w-full pl-7 pr-12 border ${errors.price ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                                lineNumber: 29,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-500 sm:text-sm",
                                    children: "INR"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                                    lineNumber: 41,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    errors.price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-red-600",
                        children: errors.price
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                        lineNumber: 45,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "salePrice",
                        className: "block text-sm font-medium text-gray-700",
                        children: "Sale Price"
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1 relative rounded-md shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-500 sm:text-sm",
                                    children: "₹"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                id: "salePrice",
                                min: "0",
                                step: "0.01",
                                value: values.salePrice || '',
                                onChange: (e)=>onChange('salePrice', e.target.value === '' ? undefined : parseFloat(e.target.value)),
                                className: `block w-full pl-7 pr-12 border ${errors.salePrice ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-500 sm:text-sm",
                                    children: "INR"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    errors.salePrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-red-600",
                        children: errors.salePrice
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-gray-500",
                        children: "Leave empty if the product is not on sale."
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "saleStartDate",
                                className: "block text-sm font-medium text-gray-700",
                                children: "Sale Start Date"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "date",
                                id: "saleStartDate",
                                value: values.saleStartDate ? new Date(values.saleStartDate).toISOString().split('T')[0] : '',
                                onChange: (e)=>onChange('saleStartDate', e.target.value ? new Date(e.target.value).toISOString() : undefined),
                                className: `mt-1 block w-full border ${errors.saleStartDate ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this),
                            errors.saleStartDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm text-red-600",
                                children: errors.saleStartDate
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "saleEndDate",
                                className: "block text-sm font-medium text-gray-700",
                                children: "Sale End Date"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "date",
                                id: "saleEndDate",
                                value: values.saleEndDate ? new Date(values.saleEndDate).toISOString().split('T')[0] : '',
                                onChange: (e)=>onChange('saleEndDate', e.target.value ? new Date(e.target.value).toISOString() : undefined),
                                className: `mt-1 block w-full border ${errors.saleEndDate ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this),
                            errors.saleEndDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm text-red-600",
                                children: errors.saleEndDate
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                                lineNumber: 115,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/products/form-sections/PricingSection.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_c = PricingSection;
var _c;
__turbopack_context__.k.register(_c, "PricingSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/products/form-sections/InventorySection.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>InventorySection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function InventorySection({ values, onChange, errors }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-medium text-gray-900",
                children: "Inventory"
            }, void 0, false, {
                fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "stockStatus",
                        className: "block text-sm font-medium text-gray-700",
                        children: "Stock Status"
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        id: "stockStatus",
                        value: values.stockStatus || 'In Stock',
                        onChange: (e)=>onChange('stockStatus', e.target.value),
                        className: `mt-1 block w-full border ${errors.stockStatus ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "In Stock",
                                children: "In Stock"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Out of Stock",
                                children: "Out of Stock"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "On Backorder",
                                children: "On Backorder"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    errors.stockStatus && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-red-600",
                        children: errors.stockStatus
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center h-5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            id: "manageStock",
                            type: "checkbox",
                            checked: values.manageStock ?? true,
                            onChange: (e)=>onChange('manageStock', e.target.checked),
                            className: "focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        }, void 0, false, {
                            fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ml-3 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "manageStock",
                                className: "font-medium text-gray-700",
                                children: "Manage Stock"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-500",
                                children: "Enable stock management at product level"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            values.manageStock && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "stockQuantity",
                        className: "block text-sm font-medium text-gray-700",
                        children: "Stock Quantity"
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "number",
                        id: "stockQuantity",
                        min: "0",
                        step: "1",
                        value: values.stockQuantity || 0,
                        onChange: (e)=>onChange('stockQuantity', parseInt(e.target.value) || 0),
                        className: `mt-1 block w-full border ${errors.stockQuantity ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                        lineNumber: 69,
                        columnNumber: 11
                    }, this),
                    errors.stockQuantity && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-red-600",
                        children: errors.stockQuantity
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                        lineNumber: 81,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                lineNumber: 65,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                className: "border-gray-200"
            }, void 0, false, {
                fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-base font-medium text-gray-900",
                        children: "Physical Dimensions"
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-gray-500",
                        children: "Optional. Leave empty for digital products or if not tracking dimensions."
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "weight",
                        className: "block text-sm font-medium text-gray-700",
                        children: "Weight (kg)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "number",
                        id: "weight",
                        min: "0",
                        step: "0.01",
                        value: values.weight || '',
                        onChange: (e)=>onChange('weight', e.target.value === '' ? undefined : parseFloat(e.target.value)),
                        className: `mt-1 block w-full border ${errors.weight ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    errors.weight && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-red-600",
                        children: errors.weight
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                        lineNumber: 113,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "length",
                                className: "block text-sm font-medium text-gray-700",
                                children: "Length (cm)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                id: "length",
                                min: "0",
                                step: "0.1",
                                value: values.dimensions?.length || '',
                                onChange: (e)=>{
                                    const length = e.target.value === '' ? undefined : parseFloat(e.target.value);
                                    const dimensions = values.dimensions || {
                                        length: 0,
                                        width: 0,
                                        height: 0
                                    };
                                    onChange('dimensions', length === undefined ? undefined : {
                                        ...dimensions,
                                        length
                                    });
                                },
                                className: `mt-1 block w-full border ${errors.dimensions ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "width",
                                className: "block text-sm font-medium text-gray-700",
                                children: "Width (cm)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                id: "width",
                                min: "0",
                                step: "0.1",
                                value: values.dimensions?.width || '',
                                onChange: (e)=>{
                                    const width = e.target.value === '' ? undefined : parseFloat(e.target.value);
                                    const dimensions = values.dimensions || {
                                        length: 0,
                                        width: 0,
                                        height: 0
                                    };
                                    onChange('dimensions', width === undefined ? undefined : {
                                        ...dimensions,
                                        width
                                    });
                                },
                                className: `mt-1 block w-full border ${errors.dimensions ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "height",
                                className: "block text-sm font-medium text-gray-700",
                                children: "Height (cm)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                id: "height",
                                min: "0",
                                step: "0.1",
                                value: values.dimensions?.height || '',
                                onChange: (e)=>{
                                    const height = e.target.value === '' ? undefined : parseFloat(e.target.value);
                                    const dimensions = values.dimensions || {
                                        length: 0,
                                        width: 0,
                                        height: 0
                                    };
                                    onChange('dimensions', height === undefined ? undefined : {
                                        ...dimensions,
                                        height
                                    });
                                },
                                className: `mt-1 block w-full border ${errors.dimensions ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/products/form-sections/InventorySection.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_c = InventorySection;
var _c;
__turbopack_context__.k.register(_c, "InventorySection");
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
let mockCategories = [
    {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Electronics',
        slug: 'electronics',
        description: 'Electronic devices and gadgets',
        status: 'Active',
        productCount: 42,
        createdAt: new Date(2023, 6, 15).toISOString(),
        updatedAt: new Date(2023, 6, 15).toISOString()
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Clothing',
        slug: 'clothing',
        description: 'Apparel and fashion items',
        status: 'Active',
        productCount: 128,
        createdAt: new Date(2023, 5, 10).toISOString(),
        updatedAt: new Date(2023, 7, 5).toISOString()
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440002',
        name: 'Home & Kitchen',
        slug: 'home-kitchen',
        description: 'Home appliances and kitchen essentials',
        status: 'Active',
        productCount: 76,
        createdAt: new Date(2023, 4, 22).toISOString(),
        updatedAt: new Date(2023, 4, 22).toISOString()
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440003',
        name: 'Books',
        slug: 'books',
        description: 'Books across all genres',
        status: 'Inactive',
        productCount: 210,
        createdAt: new Date(2023, 3, 5).toISOString(),
        updatedAt: new Date(2023, 8, 1).toISOString()
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440004',
        name: 'Sports & Outdoors',
        slug: 'sports-outdoors',
        description: 'Sports equipment and outdoor gear',
        status: 'Active',
        productCount: 65,
        createdAt: new Date(2023, 7, 12).toISOString(),
        updatedAt: new Date(2023, 7, 12).toISOString()
    }
];
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
"[project]/src/components/products/form-sections/CategoriesSection.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CategoriesSection)
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
function CategoriesSection({ values, onChange, errors }) {
    _s();
    // State for categories and brands data
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [brands, setBrands] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [loadError, setLoadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // State for selected categories
    const [selectedCategories, setSelectedCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(values.categoryIds || []);
    // Get current tag input state
    const [tagInput, setTagInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Load categories and brands on component mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CategoriesSection.useEffect": ()=>{
            const loadData = {
                "CategoriesSection.useEffect.loadData": async ()=>{
                    setIsLoading(true);
                    setLoadError(null);
                    try {
                        // Load categories
                        const categoriesData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$category$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllCategories"])();
                        setCategories(categoriesData.filter({
                            "CategoriesSection.useEffect.loadData": (cat)=>cat.status === 'Active'
                        }["CategoriesSection.useEffect.loadData"]).map({
                            "CategoriesSection.useEffect.loadData": (cat)=>({
                                    id: cat.id,
                                    name: cat.name
                                })
                        }["CategoriesSection.useEffect.loadData"]));
                        // Load brands
                        const brandsData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$brand$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllBrands"])();
                        setBrands(brandsData.filter({
                            "CategoriesSection.useEffect.loadData": (brand)=>brand.status === 'Active'
                        }["CategoriesSection.useEffect.loadData"]).map({
                            "CategoriesSection.useEffect.loadData": (brand)=>({
                                    id: brand.id,
                                    name: brand.name
                                })
                        }["CategoriesSection.useEffect.loadData"]));
                    } catch (error) {
                        console.error('Error loading categories and brands:', error);
                        setLoadError('Failed to load categories and brands. Please try again.');
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["CategoriesSection.useEffect.loadData"];
            loadData();
        }
    }["CategoriesSection.useEffect"], []);
    // Handle category selection
    const handleCategoryChange = (e)=>{
        const categoryId = e.target.value;
        let newSelectedCategories;
        if (categoryId === '') {
            return; // Skip if "Select a category" is chosen
        }
        // Add to selected categories if not already selected
        if (!selectedCategories.includes(categoryId)) {
            newSelectedCategories = [
                ...selectedCategories,
                categoryId
            ];
            setSelectedCategories(newSelectedCategories);
            onChange('categoryIds', newSelectedCategories);
        }
    };
    // Handle removing a category
    const handleRemoveCategory = (categoryId)=>{
        const newSelectedCategories = selectedCategories.filter((id)=>id !== categoryId);
        setSelectedCategories(newSelectedCategories);
        onChange('categoryIds', newSelectedCategories);
    };
    // Handle brand selection
    const handleBrandChange = (e)=>{
        onChange('brandId', e.target.value === '' ? undefined : e.target.value);
    };
    // Handle adding a tag
    const handleAddTag = ()=>{
        if (!tagInput.trim()) return;
        const newTag = tagInput.trim();
        const currentTags = values.tags || [];
        // Check if tag already exists
        if (!currentTags.includes(newTag)) {
            const newTags = [
                ...currentTags,
                newTag
            ];
            onChange('tags', newTags);
        }
        setTagInput('');
    };
    // Handle removing a tag
    const handleRemoveTag = (tag)=>{
        const currentTags = values.tags || [];
        const newTags = currentTags.filter((t)=>t !== tag);
        onChange('tags', newTags);
    };
    // Handle pressing Enter in tag input
    const handleTagKeyDown = (e)=>{
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-medium text-gray-900",
                children: "Categories & Brands"
            }, void 0, false, {
                fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            loadError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4",
                children: loadError
            }, void 0, false, {
                fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                lineNumber: 129,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "category",
                        className: "block text-sm font-medium text-gray-700",
                        children: "Categories"
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            id: "category",
                            onChange: handleCategoryChange,
                            value: "",
                            className: `block w-full border ${errors.categoryIds ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`,
                            disabled: isLoading,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "Select a category"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                                    lineNumber: 149,
                                    columnNumber: 13
                                }, this),
                                categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: category.id,
                                        disabled: selectedCategories.includes(category.id),
                                        children: category.name
                                    }, category.id, false, {
                                        fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                                        lineNumber: 151,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    errors.categoryIds && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-red-600",
                        children: errors.categoryIds
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                        lineNumber: 162,
                        columnNumber: 11
                    }, this),
                    selectedCategories.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 flex flex-wrap gap-2",
                        children: selectedCategories.map((categoryId)=>{
                            const category = categories.find((c)=>c.id === categoryId);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800",
                                children: [
                                    category ? category.name : 'Unknown Category',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>handleRemoveCategory(categoryId),
                                        className: "ml-2 text-blue-500 hover:text-blue-700",
                                        children: "×"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                                        lineNumber: 176,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, categoryId, true, {
                                fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                                lineNumber: 171,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                        lineNumber: 167,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "brand",
                        className: "block text-sm font-medium text-gray-700",
                        children: "Brand"
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                        lineNumber: 192,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        id: "brand",
                        value: values.brandId || '',
                        onChange: handleBrandChange,
                        className: `mt-1 block w-full border ${errors.brandId ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`,
                        disabled: isLoading,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Select a brand (optional)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                                lineNumber: 204,
                                columnNumber: 11
                            }, this),
                            brands.map((brand)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: brand.id,
                                    children: brand.name
                                }, brand.id, false, {
                                    fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                                    lineNumber: 206,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                        lineNumber: 195,
                        columnNumber: 9
                    }, this),
                    errors.brandId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-red-600",
                        children: errors.brandId
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                        lineNumber: 212,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "tags",
                        className: "block text-sm font-medium text-gray-700",
                        children: "Tags"
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1 flex space-x-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                id: "tags",
                                value: tagInput,
                                onChange: (e)=>setTagInput(e.target.value),
                                onKeyDown: handleTagKeyDown,
                                placeholder: "Enter a tag and press Enter",
                                className: `block w-full border ${errors.tags ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                                lineNumber: 222,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleAddTag,
                                className: "px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700",
                                children: "Add"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                                lineNumber: 233,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                        lineNumber: 221,
                        columnNumber: 9
                    }, this),
                    errors.tags && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-red-600",
                        children: errors.tags
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                        lineNumber: 242,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-gray-500",
                        children: "Tags help customers find your product. Separate with Enter."
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                        lineNumber: 244,
                        columnNumber: 9
                    }, this),
                    (values.tags?.length || 0) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 flex flex-wrap gap-2",
                        children: values.tags?.map((tag, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800",
                                children: [
                                    tag,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>handleRemoveTag(tag),
                                        className: "ml-2 text-gray-500 hover:text-gray-700",
                                        children: "×"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                                        lineNumber: 257,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                                lineNumber: 252,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                        lineNumber: 250,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/products/form-sections/CategoriesSection.tsx",
        lineNumber: 125,
        columnNumber: 5
    }, this);
}
_s(CategoriesSection, "WecMLHgSr3bHNOVrU2SUTFAW5Dc=");
_c = CategoriesSection;
var _c;
__turbopack_context__.k.register(_c, "CategoriesSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/products/form-sections/ImagesSection.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ImagesSection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function ImagesSection({ values, onChange, errors }) {
    _s();
    // Local state for new image URL input
    const [newImageUrl, setNewImageUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [imageError, setImageError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Get current gallery images or empty array
    const galleryImages = values.galleryImages || [];
    // Add a new gallery image
    const handleAddGalleryImage = ()=>{
        // Validate
        if (!newImageUrl.trim()) {
            setImageError('Image URL cannot be empty');
            return;
        }
        // Basic URL validation
        try {
            new URL(newImageUrl);
        } catch (e) {
            setImageError('Please enter a valid URL');
            return;
        }
        // Check for duplicate
        if (galleryImages.includes(newImageUrl)) {
            setImageError('This image URL is already in the gallery');
            return;
        }
        // Clear any previous error
        setImageError(null);
        // Add the new image
        const newGalleryImages = [
            ...galleryImages,
            newImageUrl
        ];
        // Update parent form
        onChange('galleryImages', newGalleryImages);
        // Clear input
        setNewImageUrl('');
    };
    // Remove a gallery image
    const handleRemoveGalleryImage = (index)=>{
        const newGalleryImages = [
            ...galleryImages
        ];
        newGalleryImages.splice(index, 1);
        onChange('galleryImages', newGalleryImages);
    };
    // Set main image from gallery
    const handleSetAsMain = (url)=>{
        onChange('mainImage', url);
    };
    // Handle main image change
    const handleMainImageChange = (e)=>{
        onChange('mainImage', e.target.value);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-medium text-gray-900",
                children: "Product Images"
            }, void 0, false, {
                fileName: "[project]/src/components/products/form-sections/ImagesSection.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "mainImage",
                        className: "block text-sm font-medium text-gray-700",
                        children: "Main Product Image"
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/ImagesSection.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        id: "mainImage",
                        value: values.mainImage || '',
                        onChange: handleMainImageChange,
                        placeholder: "https://example.com/image.jpg",
                        className: `mt-1 block w-full border ${errors.mainImage ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/ImagesSection.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    errors.mainImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-red-600",
                        children: errors.mainImage
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/ImagesSection.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this),
                    values.mainImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative w-40 h-40 border rounded-md overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: values.mainImage,
                                alt: "Main product image",
                                className: "w-full h-full object-contain",
                                onError: (e)=>{
                                    e.target.src = 'https://via.placeholder.com/150?text=Image+Error';
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/ImagesSection.tsx",
                                lineNumber: 103,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/products/form-sections/ImagesSection.tsx",
                            lineNumber: 102,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/ImagesSection.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/form-sections/ImagesSection.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-base font-medium text-gray-900 mb-3",
                        children: "Gallery Images"
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/ImagesSection.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    galleryImages.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4",
                        children: galleryImages.map((imageUrl, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative group border rounded-md overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: imageUrl,
                                        alt: `Product gallery image ${index + 1}`,
                                        className: "w-full h-32 object-contain",
                                        onError: (e)=>{
                                            e.target.src = 'https://via.placeholder.com/150?text=Image+Error';
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/form-sections/ImagesSection.tsx",
                                        lineNumber: 125,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>handleSetAsMain(imageUrl),
                                                className: "mx-1 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700",
                                                children: "Set as Main"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/products/form-sections/ImagesSection.tsx",
                                                lineNumber: 136,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>handleRemoveGalleryImage(index),
                                                className: "mx-1 px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700",
                                                children: "Remove"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/products/form-sections/ImagesSection.tsx",
                                                lineNumber: 143,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/products/form-sections/ImagesSection.tsx",
                                        lineNumber: 135,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/src/components/products/form-sections/ImagesSection.tsx",
                                lineNumber: 124,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/ImagesSection.tsx",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 border rounded-md p-4 bg-gray-50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-sm font-medium text-gray-900 mb-2",
                                children: "Add Gallery Image"
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/ImagesSection.tsx",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this),
                            imageError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3 text-sm text-red-600",
                                children: imageError
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/ImagesSection.tsx",
                                lineNumber: 161,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: newImageUrl,
                                        onChange: (e)=>setNewImageUrl(e.target.value),
                                        placeholder: "https://example.com/gallery-image.jpg",
                                        className: "flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/form-sections/ImagesSection.tsx",
                                        lineNumber: 167,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleAddGalleryImage,
                                        className: "px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700",
                                        children: "Add"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/form-sections/ImagesSection.tsx",
                                        lineNumber: 174,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/products/form-sections/ImagesSection.tsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs text-gray-500",
                                children: "Enter the URL of the image you want to add to the product gallery."
                            }, void 0, false, {
                                fileName: "[project]/src/components/products/form-sections/ImagesSection.tsx",
                                lineNumber: 182,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/products/form-sections/ImagesSection.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/form-sections/ImagesSection.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/products/form-sections/ImagesSection.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
_s(ImagesSection, "KgyNT1xhnNicAFacF9qiivw8sYQ=");
_c = ImagesSection;
var _c;
__turbopack_context__.k.register(_c, "ImagesSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/products/form-sections/AttributesSection.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AttributesSection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function AttributesSection({ values, onChange, errors }) {
    _s();
    // Local state for new attribute input
    const [newAttributeName, setNewAttributeName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [newAttributeValue, setNewAttributeValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [attributeError, setAttributeError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Get current attributes or empty array
    const attributes = values.customAttributes || [];
    // Add a new attribute
    const handleAddAttribute = ()=>{
        // Validate
        if (!newAttributeName.trim()) {
            setAttributeError('Attribute name cannot be empty');
            return;
        }
        if (!newAttributeValue.trim()) {
            setAttributeError('Attribute value cannot be empty');
            return;
        }
        // Check for duplicate attribute names
        if (attributes.some((attr)=>attr.name.toLowerCase() === newAttributeName.toLowerCase())) {
            setAttributeError(`Attribute "${newAttributeName}" already exists`);
            return;
        }
        // Clear any previous error
        setAttributeError(null);
        // Add the new attribute
        const newAttributes = [
            ...attributes,
            {
                name: newAttributeName,
                value: newAttributeValue
            }
        ];
        // Update parent form
        onChange('customAttributes', newAttributes);
        // Clear inputs
        setNewAttributeName('');
        setNewAttributeValue('');
    };
    // Remove an attribute
    const handleRemoveAttribute = (index)=>{
        const newAttributes = [
            ...attributes
        ];
        newAttributes.splice(index, 1);
        onChange('customAttributes', newAttributes);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-medium text-gray-900",
                children: "Custom Attributes"
            }, void 0, false, {
                fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-gray-600",
                children: "Add custom attributes to provide additional product information (e.g., material, color, size)."
            }, void 0, false, {
                fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            attributes.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 border rounded-md overflow-hidden",
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
                                        children: "Name"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                                        lineNumber: 82,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        scope: "col",
                                        className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Value"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                                        lineNumber: 85,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        scope: "col",
                                        className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
                                        children: "Action"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                                        lineNumber: 88,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                                lineNumber: 81,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            className: "bg-white divide-y divide-gray-200",
                            children: attributes.map((attribute, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",
                                            children: attribute.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                                            lineNumber: 96,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                            children: attribute.value
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                                            lineNumber: 99,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>handleRemoveAttribute(index),
                                                className: "text-red-600 hover:text-red-900",
                                                children: "Remove"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                                                lineNumber: 103,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                                            lineNumber: 102,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                                    lineNumber: 95,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                            lineNumber: 93,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                    lineNumber: 79,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                lineNumber: 78,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 border rounded-md p-4 bg-gray-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-base font-medium text-gray-900 mb-3",
                        children: "Add New Attribute"
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    attributeError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 text-sm text-red-600",
                        children: attributeError
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "attribute-name",
                                        className: "block text-sm font-medium text-gray-700",
                                        children: "Attribute Name"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                                        lineNumber: 130,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        id: "attribute-name",
                                        value: newAttributeName,
                                        onChange: (e)=>setNewAttributeName(e.target.value),
                                        placeholder: "e.g., Color, Material, Size",
                                        className: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                                        lineNumber: 133,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "attribute-value",
                                        className: "block text-sm font-medium text-gray-700",
                                        children: "Attribute Value"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                                        lineNumber: 144,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        id: "attribute-value",
                                        value: newAttributeValue,
                                        onChange: (e)=>setNewAttributeValue(e.target.value),
                                        placeholder: "e.g., Red, Cotton, XL",
                                        className: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                                        lineNumber: 147,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex justify-end",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleAddAttribute,
                            className: "px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700",
                            children: "Add Attribute"
                        }, void 0, false, {
                            fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/products/form-sections/AttributesSection.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_s(AttributesSection, "DAug8nJMRARcR8ubTEhPX+2oYG8=");
_c = AttributesSection;
var _c;
__turbopack_context__.k.register(_c, "AttributesSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/products/SimpleProductForm.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>SimpleProductForm)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$products$2f$form$2d$sections$2f$BasicInfoSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/products/form-sections/BasicInfoSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$products$2f$form$2d$sections$2f$PricingSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/products/form-sections/PricingSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$products$2f$form$2d$sections$2f$InventorySection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/products/form-sections/InventorySection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$products$2f$form$2d$sections$2f$CategoriesSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/products/form-sections/CategoriesSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$products$2f$form$2d$sections$2f$ImagesSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/products/form-sections/ImagesSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$products$2f$form$2d$sections$2f$AttributesSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/products/form-sections/AttributesSection.tsx [app-client] (ecmascript)");
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
function SimpleProductForm({ initialValues, onSubmit, isSubmitting, buttonText }) {
    _s();
    const [formValues, setFormValues] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialValues);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('basic');
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    // Function to handle form value changes
    const handleChange = (field, value)=>{
        setFormValues((prev)=>({
                ...prev,
                [field]: value
            }));
        // Clear error for this field if it exists
        if (errors[field]) {
            setErrors((prev)=>{
                const newErrors = {
                    ...prev
                };
                delete newErrors[field];
                return newErrors;
            });
        }
    };
    // Function to validate the form
    const validateForm = ()=>{
        const newErrors = {};
        // Basic info validation
        if (!formValues.sku) newErrors.sku = 'SKU is required';
        if (!formValues.name) newErrors.name = 'Product name is required';
        // Pricing validation
        if (formValues.price === undefined || formValues.price < 0) {
            newErrors.price = 'Price must be a positive number';
        }
        if (formValues.salePrice !== undefined && formValues.salePrice > formValues.price) {
            newErrors.salePrice = 'Sale price cannot be higher than regular price';
        }
        // Set errors and return validation result
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    // Handle form submission
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            await onSubmit(formValues);
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };
    // Generate slug from name if slug is empty
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SimpleProductForm.useEffect": ()=>{
            if (formValues.name && !formValues.slug) {
                const slug = formValues.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
                handleChange('slug', slug);
            }
        }
    }["SimpleProductForm.useEffect"], [
        formValues.name
    ]);
    // Define tabs
    const tabs = [
        {
            id: 'basic',
            label: 'Basic Info'
        },
        {
            id: 'pricing',
            label: 'Pricing'
        },
        {
            id: 'inventory',
            label: 'Inventory'
        },
        {
            id: 'categories',
            label: 'Categories & Brands'
        },
        {
            id: 'images',
            label: 'Images'
        },
        {
            id: 'attributes',
            label: 'Attributes'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: "bg-white rounded-lg shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b border-gray-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "flex -mb-px overflow-x-auto",
                    children: tabs.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setActiveTab(tab.id),
                            className: `whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm 
                ${activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`,
                            children: tab.label
                        }, tab.id, false, {
                            fileName: "[project]/src/components/products/SimpleProductForm.tsx",
                            lineNumber: 115,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/products/SimpleProductForm.tsx",
                    lineNumber: 113,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/products/SimpleProductForm.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6",
                children: [
                    activeTab === 'basic' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$products$2f$form$2d$sections$2f$BasicInfoSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        values: formValues,
                        onChange: handleChange,
                        errors: errors
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/SimpleProductForm.tsx",
                        lineNumber: 134,
                        columnNumber: 11
                    }, this),
                    activeTab === 'pricing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$products$2f$form$2d$sections$2f$PricingSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        values: formValues,
                        onChange: handleChange,
                        errors: errors
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/SimpleProductForm.tsx",
                        lineNumber: 143,
                        columnNumber: 11
                    }, this),
                    activeTab === 'inventory' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$products$2f$form$2d$sections$2f$InventorySection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        values: formValues,
                        onChange: handleChange,
                        errors: errors
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/SimpleProductForm.tsx",
                        lineNumber: 152,
                        columnNumber: 11
                    }, this),
                    activeTab === 'categories' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$products$2f$form$2d$sections$2f$CategoriesSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        values: formValues,
                        onChange: handleChange,
                        errors: errors
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/SimpleProductForm.tsx",
                        lineNumber: 161,
                        columnNumber: 11
                    }, this),
                    activeTab === 'images' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$products$2f$form$2d$sections$2f$ImagesSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        values: formValues,
                        onChange: handleChange,
                        errors: errors
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/SimpleProductForm.tsx",
                        lineNumber: 170,
                        columnNumber: 11
                    }, this),
                    activeTab === 'attributes' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$products$2f$form$2d$sections$2f$AttributesSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        values: formValues,
                        onChange: handleChange,
                        errors: errors
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/SimpleProductForm.tsx",
                        lineNumber: 179,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 border-t border-gray-200 pt-6 flex justify-end",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: isSubmitting,
                            className: `px-6 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`,
                            children: isSubmitting ? 'Saving...' : buttonText
                        }, void 0, false, {
                            fileName: "[project]/src/components/products/SimpleProductForm.tsx",
                            lineNumber: 188,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/products/SimpleProductForm.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/products/SimpleProductForm.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/products/SimpleProductForm.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
_s(SimpleProductForm, "OSo/U29G5rMPdEgq8B31lCyrl3s=");
_c = SimpleProductForm;
var _c;
__turbopack_context__.k.register(_c, "SimpleProductForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/dashboard/products/edit/[id]/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>EditProductPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$product$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/product-service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$products$2f$SimpleProductForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/products/SimpleProductForm.tsx [app-client] (ecmascript)");
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
function EditProductPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const id = params.id;
    const [product, setProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditProductPage.useEffect": ()=>{
            const fetchProduct = {
                "EditProductPage.useEffect.fetchProduct": async ()=>{
                    setIsLoading(true);
                    setError(null);
                    try {
                        const productData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$product$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductById"])(id);
                        if (!productData) {
                            setError('Product not found');
                            return;
                        }
                        setProduct(productData);
                    } catch (err) {
                        console.error('Error fetching product:', err);
                        setError('Failed to load product');
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["EditProductPage.useEffect.fetchProduct"];
            fetchProduct();
        }
    }["EditProductPage.useEffect"], [
        id
    ]);
    const handleSubmit = async (values)=>{
        setIsSubmitting(true);
        setError(null);
        try {
            // Validate SKU uniqueness (only if SKU changed)
            if (values.sku !== product?.sku) {
                const isUnique = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$product$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSkuUnique"])(values.sku, id);
                if (!isUnique) {
                    setError(`The SKU "${values.sku}" is already in use. Please choose a different SKU.`);
                    setIsSubmitting(false);
                    return;
                }
            }
            // Update the product
            const updatedProduct = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$product$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateProduct"])(id, values);
            // Check if update was successful
            if (!updatedProduct) {
                setError('Failed to update product. Please try again.');
                setIsSubmitting(false);
                return;
            }
            // Redirect to product list
            router.push('/dashboard/products');
        } catch (err) {
            console.error('Error updating product:', err);
            setError('An error occurred while updating the product. Please try again.');
        } finally{
            setIsSubmitting(false);
        }
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 py-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-6 rounded-lg shadow-md animate-pulse",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-8 bg-gray-200 rounded w-1/4 mb-6"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/products/edit/[id]/page.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-4 bg-gray-200 rounded w-3/4"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/products/edit/[id]/page.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-4 bg-gray-200 rounded w-1/2"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/products/edit/[id]/page.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-4 bg-gray-200 rounded w-5/6"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/products/edit/[id]/page.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/products/edit/[id]/page.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/products/edit/[id]/page.tsx",
                lineNumber: 81,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/products/edit/[id]/page.tsx",
            lineNumber: 80,
            columnNumber: 7
        }, this);
    }
    if (error || !product) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 py-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4",
                    children: error || 'Product not found'
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/products/edit/[id]/page.tsx",
                    lineNumber: 96,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/dashboard/products",
                    className: "text-blue-600 hover:text-blue-800",
                    children: "← Back to products"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/products/edit/[id]/page.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/products/edit/[id]/page.tsx",
            lineNumber: 95,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto px-4 py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-gray-900",
                        children: [
                            "Edit Product: ",
                            product.name
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/products/edit/[id]/page.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-gray-600",
                        children: "Update product information using the form below."
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/products/edit/[id]/page.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/products/edit/[id]/page.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/products/edit/[id]/page.tsx",
                lineNumber: 119,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-end mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/dashboard/products",
                    className: "px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50",
                    children: "Cancel"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/products/edit/[id]/page.tsx",
                    lineNumber: 125,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/products/edit/[id]/page.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$products$2f$SimpleProductForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                initialValues: product,
                onSubmit: handleSubmit,
                isSubmitting: isSubmitting,
                buttonText: "Update Product"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/products/edit/[id]/page.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/products/edit/[id]/page.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
_s(EditProductPage, "V2VXO5PEAXc2+Iab7YncuQ0OfpY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = EditProductPage;
var _c;
__turbopack_context__.k.register(_c, "EditProductPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_053019bd._.js.map