module.exports = {

"[project]/src/lib/db/cassandra.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "createKeyspaceIfNotExists": (()=>createKeyspaceIfNotExists),
    "getClient": (()=>getClient),
    "initializeSchema": (()=>initializeSchema),
    "shutdownClient": (()=>shutdownClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cassandra$2d$driver$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/cassandra-driver/index.js [app-rsc] (ecmascript)");
;
let client = null;
async function getClient() {
    if (client) return client;
    client = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cassandra$2d$driver$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Client"]({
        contactPoints: process.env.CASSANDRA_CONTACT_POINTS?.split(',') || [
            '127.0.0.1'
        ],
        localDataCenter: process.env.CASSANDRA_LOCAL_DATACENTER || 'datacenter1',
        keyspace: process.env.CASSANDRA_KEYSPACE || 'indiaseller1',
        credentials: {
            username: process.env.CASSANDRA_USERNAME || 'cassandra',
            password: process.env.CASSANDRA_PASSWORD || 'cassandra'
        }
    });
    await client.connect();
    console.log('Connected to Cassandra');
    return client;
}
async function createKeyspaceIfNotExists() {
    // Create a temporary client without keyspace to create the keyspace
    const tempClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cassandra$2d$driver$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Client"]({
        contactPoints: process.env.CASSANDRA_CONTACT_POINTS?.split(',') || [
            '127.0.0.1'
        ],
        localDataCenter: process.env.CASSANDRA_LOCAL_DATACENTER || 'datacenter1',
        credentials: {
            username: process.env.CASSANDRA_USERNAME || 'cassandra',
            password: process.env.CASSANDRA_PASSWORD || 'cassandra'
        }
    });
    await tempClient.connect();
    await tempClient.execute(`
    CREATE KEYSPACE IF NOT EXISTS ${process.env.CASSANDRA_KEYSPACE || 'indiaseller1'}
    WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}
  `);
    await tempClient.shutdown();
}
async function initializeSchema() {
    const client = await getClient();
    // Create sellers table
    await client.execute(`
    CREATE TABLE IF NOT EXISTS sellers (
      id uuid PRIMARY KEY,
      name text,
      email text,
      phone text,
      profile_picture text,
      is_top_scorer boolean,
      kyc_status text,
      status text,
      created_at timestamp,
      updated_at timestamp
    )
  `);
    // Create seller_business table
    await client.execute(`
    CREATE TABLE IF NOT EXISTS seller_business (
      seller_id uuid PRIMARY KEY,
      company_name text,
      address text,
      gstin text,
      pan text,
      bank_name text,
      account_number text,
      ifsc_code text
    )
  `);
    // Create seller_products table
    await client.execute(`
    CREATE TABLE IF NOT EXISTS seller_products (
      seller_id uuid,
      product_name text,
      category text,
      PRIMARY KEY (seller_id, product_name)
    )
  `);
    // Create seller_product_assignments table (many-to-many relationship)
    await client.execute(`
    CREATE TABLE IF NOT EXISTS seller_product_assignments (
      seller_id uuid,
      product_id uuid,
      assigned_at timestamp,
      PRIMARY KEY (seller_id, product_id)
    )
  `);
    // Create seller_documents table
    await client.execute(`
    CREATE TABLE IF NOT EXISTS seller_documents (
      seller_id uuid,
      document_type text,
      document_url text,
      uploaded_at timestamp,
      PRIMARY KEY (seller_id, document_type)
    )
  `);
    // Create customers table
    await client.execute(`
    CREATE TABLE IF NOT EXISTS customers (
      id uuid PRIMARY KEY,
      name text,
      email text,
      phone text,
      profile_picture text,
      status text,
      created_at timestamp,
      updated_at timestamp
    )
  `);
    // Create customer_addresses table
    await client.execute(`
    CREATE TABLE IF NOT EXISTS customer_addresses (
      id uuid PRIMARY KEY,
      customer_id uuid,
      address_type text,
      address_line1 text,
      address_line2 text,
      city text,
      state text,
      postal_code text,
      country text,
      is_default boolean
    )
  `);
    // Create customer_documents table
    await client.execute(`
    CREATE TABLE IF NOT EXISTS customer_documents (
      id uuid,
      customer_id uuid,
      document_type text,
      document_url text,
      uploaded_at timestamp,
      PRIMARY KEY (customer_id, document_type)
    )
  `);
    // Create users table for authentication
    await client.execute(`
    CREATE TABLE IF NOT EXISTS users (
      email text PRIMARY KEY,
      password text,
      name text,
      role text,
      created_at timestamp
    )
  `);
}
async function shutdownClient() {
    if (client) {
        await client.shutdown();
        client = null;
    }
}
}}),
"[externals]/buffer [external] (buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}}),
"[project]/src/lib/auth.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "authenticateCustomer": (()=>authenticateCustomer),
    "authenticateCustomerRequest": (()=>authenticateCustomerRequest),
    "authenticateRequest": (()=>authenticateRequest),
    "authenticateUser": (()=>authenticateUser),
    "createCustomerUser": (()=>createCustomerUser),
    "createUser": (()=>createUser),
    "seedAdminUser": (()=>seedAdminUser)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$cassandra$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/cassandra.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsonwebtoken/index.js [app-rsc] (ecmascript)");
;
;
;
async function authenticateUser(email, password) {
    try {
        const client = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$cassandra$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getClient"])();
        const query = 'SELECT email, password, name, role FROM users WHERE email = ?';
        const result = await client.execute(query, [
            email
        ], {
            prepare: true
        });
        const user = result.first();
        if (!user) return null;
        const isValidPassword = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["compare"])(password, user.password);
        if (!isValidPassword) return null;
        return {
            email: user.email,
            name: user.name,
            role: user.role
        };
    } catch (error) {
        console.error('Authentication error:', error);
        return null;
    }
}
async function createUser(email, password, name, role = 'admin') {
    try {
        const client = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$cassandra$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getClient"])();
        // Check if user already exists
        const checkQuery = 'SELECT email FROM users WHERE email = ?';
        const checkResult = await client.execute(checkQuery, [
            email
        ], {
            prepare: true
        });
        if (checkResult.rowLength > 0) {
            throw new Error('User already exists');
        }
        const hashedPassword = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hash"])(password, 10);
        const timestamp = new Date();
        const insertQuery = 'INSERT INTO users (email, password, name, role, created_at) VALUES (?, ?, ?, ?, ?)';
        await client.execute(insertQuery, [
            email,
            hashedPassword,
            name,
            role,
            timestamp
        ], {
            prepare: true
        });
        return {
            email,
            name,
            role
        };
    } catch (error) {
        console.error('Create user error:', error);
        return null;
    }
}
async function seedAdminUser() {
    try {
        const client = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$cassandra$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getClient"])();
        const query = 'SELECT count(*) as count FROM users WHERE role = ? ALLOW FILTERING';
        const result = await client.execute(query, [
            'admin'
        ], {
            prepare: true
        });
        const count = result.first()?.count?.low || 0;
        if (count === 0) {
            await createUser('admin@example.com', 'Admin@123', 'Admin User', 'admin');
            console.log('Admin user seeded');
        }
    } catch (error) {
        console.error('Seed admin error:', error);
    }
}
async function authenticateCustomer(email, password) {
    try {
        const client = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$cassandra$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getClient"])();
        // First check if there's a user with this email and role 'customer'
        const userQuery = 'SELECT email, password, name, role FROM users WHERE email = ?';
        const userResult = await client.execute(userQuery, [
            email
        ], {
            prepare: true
        });
        const user = userResult.first();
        if (!user) return null;
        if (user.role !== 'customer') return null;
        const isValidPassword = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["compare"])(password, user.password);
        if (!isValidPassword) return null;
        // Find the associated customer record
        const customerQuery = 'SELECT id FROM customers WHERE email = ? ALLOW FILTERING';
        const customerResult = await client.execute(customerQuery, [
            email
        ], {
            prepare: true
        });
        if (customerResult.rowLength === 0) {
            console.error('User exists but no matching customer record found');
            return null;
        }
        const customerId = customerResult.first().id.toString();
        return {
            email: user.email,
            name: user.name,
            role: user.role,
            customerId
        };
    } catch (error) {
        console.error('Customer authentication error:', error);
        return null;
    }
}
async function createCustomerUser(email, password, name, customerId) {
    try {
        const client = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$cassandra$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getClient"])();
        // Check if user already exists
        const checkQuery = 'SELECT email FROM users WHERE email = ?';
        const checkResult = await client.execute(checkQuery, [
            email
        ], {
            prepare: true
        });
        if (checkResult.rowLength > 0) {
            throw new Error('User already exists');
        }
        const hashedPassword = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hash"])(password, 10);
        const timestamp = new Date();
        const insertQuery = 'INSERT INTO users (email, password, name, role, created_at) VALUES (?, ?, ?, ?, ?)';
        await client.execute(insertQuery, [
            email,
            hashedPassword,
            name,
            'customer',
            timestamp
        ], {
            prepare: true
        });
        return {
            email,
            name,
            role: 'customer',
            customerId
        };
    } catch (error) {
        console.error('Create customer user error:', error);
        return null;
    }
}
const authenticateRequest = async (request)=>{
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
        return null;
    }
    try {
        const decoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["verify"])(token, process.env.JWT_SECRET || 'your-secret-key');
        return decoded;
    } catch (error) {
        return null;
    }
};
const authenticateCustomerRequest = async (request)=>{
    const token = request.cookies.get('customer-auth-token')?.value;
    if (!token) {
        return null;
    }
    try {
        const decoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["verify"])(token, process.env.JWT_SECRET || 'your-secret-key');
        return decoded;
    } catch (error) {
        return null;
    }
};
}}),
"[project]/src/app/customer/dashboard/layout.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CustomerDashboardLayout)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'next-auth'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-rsc] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-rsc] (ecmascript) <export default as FileText>");
;
;
;
;
;
;
async function CustomerDashboardLayout({ children }) {
    const session = await getServerSession(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["authOptions"]);
    if (!session) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/auth/signin');
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen flex-col",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                    className: "w-64 border-r bg-gray-100/40 lg:block",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-full max-h-screen flex-col gap-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-auto py-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "grid items-start px-4 text-sm font-medium",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/customer/dashboard",
                                        className: "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                                        children: "Dashboard"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/customer/dashboard/layout.tsx",
                                        lineNumber: 25,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/customer/dashboard/profile",
                                        className: "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                                        children: "Profile"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/customer/dashboard/layout.tsx",
                                        lineNumber: 31,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/customer/dashboard/orders",
                                        className: "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                                        children: "Orders"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/customer/dashboard/layout.tsx",
                                        lineNumber: 37,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/customer/dashboard/addresses",
                                        className: "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                                        children: "Addresses"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/customer/dashboard/layout.tsx",
                                        lineNumber: 43,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/customer/dashboard/requirements",
                                        className: "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/customer/dashboard/layout.tsx",
                                                lineNumber: 53,
                                                columnNumber: 19
                                            }, this),
                                            "Requirements"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/customer/dashboard/layout.tsx",
                                        lineNumber: 49,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/api/auth/signout",
                                        className: "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/customer/dashboard/layout.tsx",
                                                lineNumber: 60,
                                                columnNumber: 19
                                            }, this),
                                            "Sign Out"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/customer/dashboard/layout.tsx",
                                        lineNumber: 56,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/customer/dashboard/layout.tsx",
                                lineNumber: 24,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/customer/dashboard/layout.tsx",
                            lineNumber: 23,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/customer/dashboard/layout.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/customer/dashboard/layout.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/app/customer/dashboard/layout.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/customer/dashboard/layout.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/customer/dashboard/layout.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__36b4dce2._.js.map