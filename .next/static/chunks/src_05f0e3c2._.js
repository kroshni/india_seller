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
    "deleteBrandFromStorage": (()=>deleteBrandFromStorage),
    "deleteCategoryFromStorage": (()=>deleteCategoryFromStorage),
    "loadBrands": (()=>loadBrands),
    "loadCategories": (()=>loadCategories),
    "saveBrands": (()=>saveBrands),
    "saveCategories": (()=>saveCategories),
    "updateBrandInStorage": (()=>updateBrandInStorage),
    "updateCategoryInStorage": (()=>updateCategoryInStorage)
});
const CATEGORIES_STORAGE_KEY = 'india_seller_categories';
const BRANDS_STORAGE_KEY = 'india_seller_brands';
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
"[project]/src/components/categories/CategoryAddModal.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CategoryAddModal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$category$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/category-service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cassandra.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function CategoryAddModal({ isOpen, onClose, onCategoryAdded }) {
    _s();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [slug, setSlug] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Active');
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    if (!isOpen) return null;
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        try {
            console.log('Submitting category:', {
                name,
                slug,
                description,
                status
            });
            console.log('Database connected:', (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDbConnected"])());
            // Use direct service call instead of API route
            const newCategory = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$category$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCategory"])({
                name,
                slug: slug || '',
                description,
                status
            });
            console.log('New category created:', newCategory);
            onCategoryAdded(newCategory);
            // Reset form
            setName('');
            setSlug('');
            setDescription('');
            setStatus('Active');
        } catch (err) {
            console.error('Error creating category:', err);
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally{
            setIsSubmitting(false);
        }
    };
    // Generate slug from name
    const handleNameChange = (e)=>{
        const newName = e.target.value;
        setName(newName);
        // Auto-generate slug if user hasn't manually entered one
        if (!slug || slug === generateSlug(name)) {
            setSlug(generateSlug(newName));
        }
    };
    // Helper to generate slug
    const generateSlug = (text)=>{
        return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    };
    // Simple modal with minimal styling
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                width: '100%',
                maxWidth: '32rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                padding: '1.5rem'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '1rem'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                fontSize: '1.25rem',
                                fontWeight: 'bold'
                            },
                            children: "Add New Category"
                        }, void 0, false, {
                            fileName: "[project]/src/components/categories/CategoryAddModal.tsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            style: {
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer'
                            },
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/src/components/categories/CategoryAddModal.tsx",
                            lineNumber: 107,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/categories/CategoryAddModal.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    children: [
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                backgroundColor: '#FEE2E2',
                                padding: '0.75rem',
                                borderRadius: '0.375rem',
                                marginBottom: '1rem',
                                color: '#B91C1C'
                            },
                            children: [
                                "Error: ",
                                error
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/categories/CategoryAddModal.tsx",
                            lineNumber: 117,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: '1rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: 'medium'
                                    },
                                    children: "Name *"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryAddModal.tsx",
                                    lineNumber: 129,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: name,
                                    onChange: handleNameChange,
                                    required: true,
                                    style: {
                                        width: '100%',
                                        padding: '0.5rem',
                                        border: '1px solid #D1D5DB',
                                        borderRadius: '0.375rem'
                                    },
                                    placeholder: "Category name"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryAddModal.tsx",
                                    lineNumber: 132,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/categories/CategoryAddModal.tsx",
                            lineNumber: 128,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: '1rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: 'medium'
                                    },
                                    children: "Slug"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryAddModal.tsx",
                                    lineNumber: 148,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: slug,
                                    onChange: (e)=>setSlug(e.target.value),
                                    style: {
                                        width: '100%',
                                        padding: '0.5rem',
                                        border: '1px solid #D1D5DB',
                                        borderRadius: '0.375rem'
                                    },
                                    placeholder: "category-slug"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryAddModal.tsx",
                                    lineNumber: 151,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: '0.75rem',
                                        color: '#6B7280',
                                        marginTop: '0.25rem'
                                    },
                                    children: "URL-friendly version of the name. Leave empty for auto-generation."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryAddModal.tsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/categories/CategoryAddModal.tsx",
                            lineNumber: 147,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: '1rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: 'medium'
                                    },
                                    children: "Description"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryAddModal.tsx",
                                    lineNumber: 169,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: description,
                                    onChange: (e)=>setDescription(e.target.value),
                                    rows: 3,
                                    style: {
                                        width: '100%',
                                        padding: '0.5rem',
                                        border: '1px solid #D1D5DB',
                                        borderRadius: '0.375rem'
                                    },
                                    placeholder: "Category description"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryAddModal.tsx",
                                    lineNumber: 172,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/categories/CategoryAddModal.tsx",
                            lineNumber: 168,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: '1.5rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: 'medium'
                                    },
                                    children: "Status"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryAddModal.tsx",
                                    lineNumber: 187,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: status,
                                    onChange: (e)=>setStatus(e.target.value),
                                    style: {
                                        width: '100%',
                                        padding: '0.5rem',
                                        border: '1px solid #D1D5DB',
                                        borderRadius: '0.375rem'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "Active",
                                            children: "Active"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/categories/CategoryAddModal.tsx",
                                            lineNumber: 200,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "Inactive",
                                            children: "Inactive"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/categories/CategoryAddModal.tsx",
                                            lineNumber: 201,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/categories/CategoryAddModal.tsx",
                                    lineNumber: 190,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/categories/CategoryAddModal.tsx",
                            lineNumber: 186,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '0.75rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onClose,
                                    disabled: isSubmitting,
                                    style: {
                                        padding: '0.5rem 1rem',
                                        backgroundColor: 'white',
                                        border: '1px solid #D1D5DB',
                                        borderRadius: '0.375rem',
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                        opacity: isSubmitting ? 0.5 : 1
                                    },
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryAddModal.tsx",
                                    lineNumber: 206,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: isSubmitting,
                                    style: {
                                        padding: '0.5rem 1rem',
                                        backgroundColor: '#3B82F6',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.375rem',
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                        opacity: isSubmitting ? 0.5 : 1
                                    },
                                    children: isSubmitting ? 'Saving...' : 'Save Category'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryAddModal.tsx",
                                    lineNumber: 221,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/categories/CategoryAddModal.tsx",
                            lineNumber: 205,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/categories/CategoryAddModal.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/categories/CategoryAddModal.tsx",
            lineNumber: 97,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/categories/CategoryAddModal.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_s(CategoryAddModal, "ZnW5A2pJ+0mSx37zqCbbsKYmTtI=");
_c = CategoryAddModal;
var _c;
__turbopack_context__.k.register(_c, "CategoryAddModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/categories/CategoryEditModal.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CategoryEditModal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$category$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/category-service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cassandra.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function CategoryEditModal({ isOpen, onClose, category, onCategoryUpdated }) {
    _s();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [slug, setSlug] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Active');
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Load category data when the modal opens or category changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CategoryEditModal.useEffect": ()=>{
            if (category) {
                setName(category.name);
                setSlug(category.slug);
                setDescription(category.description);
                setStatus(category.status);
            }
        }
    }["CategoryEditModal.useEffect"], [
        category
    ]);
    if (!isOpen || !category) return null;
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        try {
            console.log('Updating category:', {
                id: category.id,
                name,
                slug,
                description,
                status
            });
            console.log('Database connected:', (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDbConnected"])());
            // Use direct service call instead of API route
            const updatedCategory = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$category$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateCategory"])(category.id, {
                name,
                slug: slug || undefined,
                description,
                status
            });
            if (!updatedCategory) {
                throw new Error('Failed to update category - not found');
            }
            console.log('Category updated:', updatedCategory);
            onCategoryUpdated(updatedCategory);
            onClose();
        } catch (err) {
            console.error('Error updating category:', err);
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally{
            setIsSubmitting(false);
        }
    };
    // Generate slug from name
    const handleNameChange = (e)=>{
        const newName = e.target.value;
        setName(newName);
        // Auto-generate slug if user hasn't manually entered one
        if (!slug || slug === generateSlug(category.name)) {
            setSlug(generateSlug(newName));
        }
    };
    // Helper to generate slug
    const generateSlug = (text)=>{
        return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                width: '100%',
                maxWidth: '32rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                padding: '1.5rem'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '1rem'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                fontSize: '1.25rem',
                                fontWeight: 'bold'
                            },
                            children: "Edit Category"
                        }, void 0, false, {
                            fileName: "[project]/src/components/categories/CategoryEditModal.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            style: {
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer'
                            },
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/src/components/categories/CategoryEditModal.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/categories/CategoryEditModal.tsx",
                    lineNumber: 113,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    children: [
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                backgroundColor: '#FEE2E2',
                                padding: '0.75rem',
                                borderRadius: '0.375rem',
                                marginBottom: '1rem',
                                color: '#B91C1C'
                            },
                            children: [
                                "Error: ",
                                error
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/categories/CategoryEditModal.tsx",
                            lineNumber: 125,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: '1rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: 'medium'
                                    },
                                    children: "Name *"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryEditModal.tsx",
                                    lineNumber: 137,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: name,
                                    onChange: handleNameChange,
                                    required: true,
                                    style: {
                                        width: '100%',
                                        padding: '0.5rem',
                                        border: '1px solid #D1D5DB',
                                        borderRadius: '0.375rem'
                                    },
                                    placeholder: "Category name"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryEditModal.tsx",
                                    lineNumber: 140,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/categories/CategoryEditModal.tsx",
                            lineNumber: 136,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: '1rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: 'medium'
                                    },
                                    children: "Slug"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryEditModal.tsx",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: slug,
                                    onChange: (e)=>setSlug(e.target.value),
                                    style: {
                                        width: '100%',
                                        padding: '0.5rem',
                                        border: '1px solid #D1D5DB',
                                        borderRadius: '0.375rem'
                                    },
                                    placeholder: "category-slug"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryEditModal.tsx",
                                    lineNumber: 159,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: '0.75rem',
                                        color: '#6B7280',
                                        marginTop: '0.25rem'
                                    },
                                    children: "URL-friendly version of the name. Leave empty for auto-generation."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryEditModal.tsx",
                                    lineNumber: 171,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/categories/CategoryEditModal.tsx",
                            lineNumber: 155,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: '1rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: 'medium'
                                    },
                                    children: "Description"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryEditModal.tsx",
                                    lineNumber: 177,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: description,
                                    onChange: (e)=>setDescription(e.target.value),
                                    rows: 3,
                                    style: {
                                        width: '100%',
                                        padding: '0.5rem',
                                        border: '1px solid #D1D5DB',
                                        borderRadius: '0.375rem'
                                    },
                                    placeholder: "Category description"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryEditModal.tsx",
                                    lineNumber: 180,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/categories/CategoryEditModal.tsx",
                            lineNumber: 176,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: '1.5rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: 'medium'
                                    },
                                    children: "Status"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryEditModal.tsx",
                                    lineNumber: 195,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: status,
                                    onChange: (e)=>setStatus(e.target.value),
                                    style: {
                                        width: '100%',
                                        padding: '0.5rem',
                                        border: '1px solid #D1D5DB',
                                        borderRadius: '0.375rem'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "Active",
                                            children: "Active"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/categories/CategoryEditModal.tsx",
                                            lineNumber: 208,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "Inactive",
                                            children: "Inactive"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/categories/CategoryEditModal.tsx",
                                            lineNumber: 209,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/categories/CategoryEditModal.tsx",
                                    lineNumber: 198,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/categories/CategoryEditModal.tsx",
                            lineNumber: 194,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '0.75rem'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onClose,
                                    disabled: isSubmitting,
                                    style: {
                                        padding: '0.5rem 1rem',
                                        backgroundColor: 'white',
                                        border: '1px solid #D1D5DB',
                                        borderRadius: '0.375rem',
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                        opacity: isSubmitting ? 0.5 : 1
                                    },
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryEditModal.tsx",
                                    lineNumber: 214,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: isSubmitting,
                                    style: {
                                        padding: '0.5rem 1rem',
                                        backgroundColor: '#3B82F6',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.375rem',
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                        opacity: isSubmitting ? 0.5 : 1
                                    },
                                    children: isSubmitting ? 'Saving...' : 'Save Changes'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryEditModal.tsx",
                                    lineNumber: 229,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/categories/CategoryEditModal.tsx",
                            lineNumber: 213,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/categories/CategoryEditModal.tsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/categories/CategoryEditModal.tsx",
            lineNumber: 105,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/categories/CategoryEditModal.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
_s(CategoryEditModal, "MyVx6Km5Iq2RQ0f+cjZAz08LwPo=");
_c = CategoryEditModal;
var _c;
__turbopack_context__.k.register(_c, "CategoryEditModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/categories/CategoryTable.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CategoryTable)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$PencilSquareIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PencilSquareIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/PencilSquareIcon.js [app-client] (ecmascript) <export default as PencilSquareIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$TrashIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrashIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroicons/react/24/outline/esm/TrashIcon.js [app-client] (ecmascript) <export default as TrashIcon>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function CategoryTable({ categories, isLoading, onStatusUpdate, onDeleteClick, onEditClick }) {
    _s();
    const [sortField, setSortField] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('name');
    const [sortDirection, setSortDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('asc');
    // Handle sorting
    const handleSort = (field)=>{
        if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };
    // Sort the categories
    const sortedCategories = [
        ...categories
    ].sort((a, b)=>{
        const fieldA = a[sortField];
        const fieldB = b[sortField];
        if (fieldA === fieldB) return 0;
        // Handle different types of fields
        if (typeof fieldA === 'string' && typeof fieldB === 'string') {
            return sortDirection === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
        } else if (typeof fieldA === 'number' && typeof fieldB === 'number') {
            return sortDirection === 'asc' ? fieldA - fieldB : fieldB - fieldA;
        } else {
            // Fallback for other types or dates
            if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
            if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        }
    });
    // Format date in a user-friendly way
    const formatDate = (dateString)=>{
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };
    // Render sort indicator
    const renderSortIndicator = (field)=>{
        if (field !== sortField) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ml-1 text-gray-500",
            children: sortDirection === 'asc' ? '↑' : '↓'
        }, void 0, false, {
            fileName: "[project]/src/components/categories/CategoryTable.tsx",
            lineNumber: 72,
            columnNumber: 7
        }, this);
    };
    // Handle status toggle
    const handleStatusToggle = (id, currentStatus)=>{
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
        onStatusUpdate(id, newStatus);
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-6 flex items-center justify-center py-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"
                }, void 0, false, {
                    fileName: "[project]/src/components/categories/CategoryTable.tsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "ml-2 text-gray-600",
                    children: "Loading categories..."
                }, void 0, false, {
                    fileName: "[project]/src/components/categories/CategoryTable.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/categories/CategoryTable.tsx",
            lineNumber: 86,
            columnNumber: 7
        }, this);
    }
    if (categories.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-6 rounded-lg border border-gray-200 bg-white py-12 text-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-500",
                children: "No categories found. Add your first category to get started."
            }, void 0, false, {
                fileName: "[project]/src/components/categories/CategoryTable.tsx",
                lineNumber: 96,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/categories/CategoryTable.tsx",
            lineNumber: 95,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                    className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500",
                                    onClick: ()=>handleSort('name'),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex cursor-pointer items-center",
                                        children: [
                                            "Name ",
                                            renderSortIndicator('name')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                        lineNumber: 112,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                    lineNumber: 107,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    scope: "col",
                                    className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500",
                                    children: "Slug"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                    lineNumber: 116,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    scope: "col",
                                    className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500",
                                    children: "Description"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                    lineNumber: 119,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    scope: "col",
                                    className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500",
                                    onClick: ()=>handleSort('productCount'),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex cursor-pointer items-center",
                                        children: [
                                            "Products ",
                                            renderSortIndicator('productCount')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                        lineNumber: 127,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                    lineNumber: 122,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    scope: "col",
                                    className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500",
                                    onClick: ()=>handleSort('status'),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex cursor-pointer items-center",
                                        children: [
                                            "Status ",
                                            renderSortIndicator('status')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                        lineNumber: 136,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                    lineNumber: 131,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    scope: "col",
                                    className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500",
                                    onClick: ()=>handleSort('updatedAt'),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex cursor-pointer items-center",
                                        children: [
                                            "Updated ",
                                            renderSortIndicator('updatedAt')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                        lineNumber: 145,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                    lineNumber: 140,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    scope: "col",
                                    className: "px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500",
                                    children: "Actions"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                    lineNumber: 149,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/categories/CategoryTable.tsx",
                            lineNumber: 106,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/categories/CategoryTable.tsx",
                        lineNumber: 105,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        className: "divide-y divide-gray-200 bg-white",
                        children: sortedCategories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "hover:bg-gray-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900",
                                        children: category.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                        lineNumber: 157,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "whitespace-nowrap px-6 py-4 text-sm text-gray-500",
                                        children: category.slug
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                        lineNumber: 160,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-6 py-4 text-sm text-gray-500",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "max-w-xs truncate",
                                            children: category.description || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                className: "text-gray-400",
                                                children: "No description"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                                lineNumber: 165,
                                                columnNumber: 46
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                            lineNumber: 164,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                        lineNumber: 163,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "whitespace-nowrap px-6 py-4 text-sm text-gray-500",
                                        children: category.productCount
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                        lineNumber: 168,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "whitespace-nowrap px-6 py-4 text-sm",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleStatusToggle(category.id, category.status),
                                            className: `inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${category.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`,
                                            children: category.status
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                            lineNumber: 172,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                        lineNumber: 171,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "whitespace-nowrap px-6 py-4 text-sm text-gray-500",
                                        children: formatDate(category.updatedAt)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                        lineNumber: 183,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "whitespace-nowrap px-6 py-4 text-right text-sm font-medium",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-end space-x-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>onEditClick(category),
                                                    className: "rounded p-1 text-blue-600 hover:bg-blue-100 hover:text-blue-800",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$PencilSquareIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PencilSquareIcon$3e$__["PencilSquareIcon"], {
                                                            className: "h-5 w-5",
                                                            "aria-hidden": "true"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                                            lineNumber: 192,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "sr-only",
                                                            children: [
                                                                "Edit ",
                                                                category.name
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                                            lineNumber: 193,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>onDeleteClick(category),
                                                    className: "rounded p-1 text-red-600 hover:bg-red-100 hover:text-red-800",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$TrashIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrashIcon$3e$__["TrashIcon"], {
                                                            className: "h-5 w-5",
                                                            "aria-hidden": "true"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                                            lineNumber: 199,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "sr-only",
                                                            children: [
                                                                "Delete ",
                                                                category.name
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                                            lineNumber: 200,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                                    lineNumber: 195,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                            lineNumber: 187,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                        lineNumber: 186,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, category.id, true, {
                                fileName: "[project]/src/components/categories/CategoryTable.tsx",
                                lineNumber: 156,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/categories/CategoryTable.tsx",
                        lineNumber: 154,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/categories/CategoryTable.tsx",
                lineNumber: 104,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/categories/CategoryTable.tsx",
            lineNumber: 103,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/categories/CategoryTable.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
_s(CategoryTable, "Fj045t1ahEHHc0rfEBwG2TrD7sk=");
_c = CategoryTable;
var _c;
__turbopack_context__.k.register(_c, "CategoryTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/dashboard/DashboardShell.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>DashboardShell)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function DashboardShell({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 min-h-screen",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex-1 overflow-y-auto py-6",
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/dashboard/DashboardShell.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/dashboard/DashboardShell.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = DashboardShell;
var _c;
__turbopack_context__.k.register(_c, "DashboardShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/ConfirmationModal.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ConfirmationModal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', isLoading = false }) {
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                width: '100%',
                maxWidth: '28rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                padding: '1.5rem'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: '1rem'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                backgroundColor: '#FEE2E2',
                                borderRadius: '50%',
                                padding: '0.625rem',
                                marginRight: '0.75rem'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "24",
                                height: "24",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
                                    stroke: "#DC2626",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/ConfirmationModal.tsx",
                                    lineNumber: 57,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/ConfirmationModal.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/ConfirmationModal.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        fontSize: '1.125rem',
                                        fontWeight: 'bold',
                                        marginBottom: '0.5rem'
                                    },
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/ConfirmationModal.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: '0.875rem',
                                        color: '#6B7280'
                                    },
                                    children: message
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/ConfirmationModal.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/ConfirmationModal.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/ConfirmationModal.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '0.75rem',
                        marginTop: '1.5rem',
                        backgroundColor: '#F9FAFB',
                        padding: '0.75rem',
                        borderRadius: '0.375rem'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onConfirm,
                            disabled: isLoading,
                            style: {
                                padding: '0.5rem 1rem',
                                backgroundColor: '#DC2626',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.375rem',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                opacity: isLoading ? 0.5 : 1,
                                display: 'flex',
                                alignItems: 'center'
                            },
                            children: [
                                isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    style: {
                                        marginRight: '0.5rem',
                                        animation: 'spin 1s linear infinite'
                                    },
                                    width: "16",
                                    height: "16",
                                    viewBox: "0 0 24 24",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "12",
                                            cy: "12",
                                            r: "10",
                                            stroke: "currentColor",
                                            strokeWidth: "4",
                                            fill: "none",
                                            opacity: "0.25"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/ConfirmationModal.tsx",
                                            lineNumber: 97,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            fill: "currentColor",
                                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/ConfirmationModal.tsx",
                                            lineNumber: 98,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/ConfirmationModal.tsx",
                                    lineNumber: 96,
                                    columnNumber: 15
                                }, this),
                                isLoading ? 'Processing...' : confirmText
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/ConfirmationModal.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            disabled: isLoading,
                            style: {
                                padding: '0.5rem 1rem',
                                backgroundColor: 'white',
                                color: '#374151',
                                border: '1px solid #D1D5DB',
                                borderRadius: '0.375rem',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                opacity: isLoading ? 0.5 : 1
                            },
                            children: cancelText
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/ConfirmationModal.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/ConfirmationModal.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/ConfirmationModal.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/ConfirmationModal.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = ConfirmationModal;
var _c;
__turbopack_context__.k.register(_c, "ConfirmationModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/dashboard/categories/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CategoriesPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$category$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/category-service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cassandra.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$categories$2f$CategoryAddModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/categories/CategoryAddModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$categories$2f$CategoryEditModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/categories/CategoryEditModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$categories$2f$CategoryTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/categories/CategoryTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$DashboardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dashboard/DashboardShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ConfirmationModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/ConfirmationModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
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
;
;
function CategoriesPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isAddModalOpen, setIsAddModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isEditModalOpen, setIsEditModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [categoryToEdit, setCategoryToEdit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [categoryToDelete, setCategoryToDelete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isDeleting, setIsDeleting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Fetch categories
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CategoriesPage.useEffect": ()=>{
            async function fetchCategories() {
                setIsLoading(true);
                setError(null);
                try {
                    console.log('Database connected status:', (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cassandra$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDbConnected"])());
                    // Use direct service call instead of API route
                    const categoriesList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$category$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllCategories"])();
                    console.log('Fetched categories:', categoriesList);
                    setCategories(categoriesList);
                } catch (err) {
                    console.error('Error fetching categories:', err);
                    setError('Failed to load categories. Please try again.');
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to load categories');
                } finally{
                    setIsLoading(false);
                }
            }
            fetchCategories();
        }
    }["CategoriesPage.useEffect"], []);
    // Handle category creation
    const handleCategoryAdded = (newCategory)=>{
        setCategories((prev)=>[
                ...prev,
                newCategory
            ]);
        setIsAddModalOpen(false);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Category added successfully');
        router.refresh(); // Refresh the page to update the data
    };
    // Handle category update
    const handleCategoryUpdated = (updatedCategory)=>{
        setCategories((prev)=>prev.map((c)=>c.id === updatedCategory.id ? updatedCategory : c));
        setIsEditModalOpen(false);
        setCategoryToEdit(null);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Category updated successfully');
    };
    // Handle edit click
    const handleEditClick = (category)=>{
        setCategoryToEdit(category);
        setIsEditModalOpen(true);
    };
    // Handle status update
    const handleStatusUpdate = async (id, newStatus)=>{
        try {
            // Use direct service call instead of API route
            const updatedCategory = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$category$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateCategoryStatus"])(id, newStatus);
            if (updatedCategory) {
                // Update the categories list with the updated category
                setCategories((prev)=>prev.map((c)=>c.id === id ? updatedCategory : c));
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`Category status updated to ${newStatus}`);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Category not found');
            }
        } catch (err) {
            console.error('Error updating category status:', err);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to update category status');
        }
    };
    // Handle delete confirmation
    const handleDeleteClick = (category)=>{
        setCategoryToDelete(category);
        setIsDeleteModalOpen(true);
    };
    // Handle actual deletion
    const handleDeleteConfirm = async ()=>{
        if (!categoryToDelete) return;
        setIsDeleting(true);
        try {
            console.log('Deleting category with ID:', categoryToDelete.id);
            // Use direct service call instead of API route
            const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$category$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteCategory"])(categoryToDelete.id);
            console.log('Delete operation result:', success);
            if (success) {
                // Remove the deleted category from the list
                setCategories((prev)=>prev.filter((c)=>c.id !== categoryToDelete.id));
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Category deleted successfully');
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Category not found or could not be deleted');
            }
        } catch (err) {
            console.error('Error deleting category:', err);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to delete category');
        } finally{
            setIsDeleting(false);
            setIsDeleteModalOpen(false);
            setCategoryToDelete(null);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dashboard$2f$DashboardShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 sm:px-6 lg:px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sm:flex sm:items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sm:flex-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-xl font-semibold text-gray-900",
                                        children: "Categories"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/categories/page.tsx",
                                        lineNumber: 147,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-sm text-gray-700",
                                        children: "A list of all product categories available on the platform."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/categories/page.tsx",
                                        lineNumber: 148,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/categories/page.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 sm:mt-0 sm:ml-16 sm:flex-none",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsAddModalOpen(true),
                                    style: {
                                        backgroundColor: '#3B82F6',
                                        color: 'white',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '0.375rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                marginRight: '0.5rem'
                                            },
                                            children: "+"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/categories/page.tsx",
                                            lineNumber: 166,
                                            columnNumber: 15
                                        }, this),
                                        "Add Category"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/categories/page.tsx",
                                    lineNumber: 153,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/categories/page.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/categories/page.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 rounded-md bg-red-50 p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ml-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-medium text-red-800",
                                        children: "Error"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/categories/page.tsx",
                                        lineNumber: 176,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 text-sm text-red-700",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: error
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/categories/page.tsx",
                                            lineNumber: 178,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/categories/page.tsx",
                                        lineNumber: 177,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/categories/page.tsx",
                                lineNumber: 175,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/categories/page.tsx",
                            lineNumber: 174,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/categories/page.tsx",
                        lineNumber: 173,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$categories$2f$CategoryTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        categories: categories,
                        isLoading: isLoading,
                        onStatusUpdate: handleStatusUpdate,
                        onDeleteClick: handleDeleteClick,
                        onEditClick: handleEditClick
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/categories/page.tsx",
                        lineNumber: 185,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/categories/page.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$categories$2f$CategoryAddModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isAddModalOpen,
                onClose: ()=>setIsAddModalOpen(false),
                onCategoryAdded: handleCategoryAdded
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/categories/page.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$categories$2f$CategoryEditModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isEditModalOpen,
                onClose: ()=>{
                    setIsEditModalOpen(false);
                    setCategoryToEdit(null);
                },
                category: categoryToEdit,
                onCategoryUpdated: handleCategoryUpdated
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/categories/page.tsx",
                lineNumber: 202,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ConfirmationModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isDeleteModalOpen,
                onClose: ()=>setIsDeleteModalOpen(false),
                onConfirm: handleDeleteConfirm,
                title: "Delete Category",
                message: `Are you sure you want to delete the category "${categoryToDelete?.name}"? This action cannot be undone.`,
                confirmText: "Delete",
                cancelText: "Cancel",
                isLoading: isDeleting
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/categories/page.tsx",
                lineNumber: 213,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/categories/page.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, this);
}
_s(CategoriesPage, "jo5PysKM7WPPQW+vlQNMnjNs+e8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = CategoriesPage;
var _c;
__turbopack_context__.k.register(_c, "CategoriesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_05f0e3c2._.js.map