module.exports = {

"[project]/.next-internal/server/app/api/auth/login/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/cassandra-driver [external] (cassandra-driver, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("cassandra-driver", () => require("cassandra-driver"));

module.exports = mod;
}}),
"[project]/src/lib/db/cassandra.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "createKeyspaceIfNotExists": (()=>createKeyspaceIfNotExists),
    "getClient": (()=>getClient),
    "initializeSchema": (()=>initializeSchema),
    "shutdownClient": (()=>shutdownClient)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$cassandra$2d$driver__$5b$external$5d$__$28$cassandra$2d$driver$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/cassandra-driver [external] (cassandra-driver, cjs)");
;
let client = null;
async function getClient() {
    if (client) return client;
    client = new __TURBOPACK__imported__module__$5b$externals$5d2f$cassandra$2d$driver__$5b$external$5d$__$28$cassandra$2d$driver$2c$__cjs$29$__["Client"]({
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
    const tempClient = new __TURBOPACK__imported__module__$5b$externals$5d2f$cassandra$2d$driver__$5b$external$5d$__$28$cassandra$2d$driver$2c$__cjs$29$__["Client"]({
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
    CREATE KEYSPACE IF NOT EXISTS ${process.env.CASSANDRA_KEYSPACE || 'indiaseller'}
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
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[project]/src/lib/auth.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "authenticateUser": (()=>authenticateUser),
    "createUser": (()=>createUser),
    "seedAdminUser": (()=>seedAdminUser)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$cassandra$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/cassandra.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
;
;
async function authenticateUser(email, password) {
    try {
        const client = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$cassandra$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getClient"])();
        const query = 'SELECT email, password, name, role FROM users WHERE email = ?';
        const result = await client.execute(query, [
            email
        ], {
            prepare: true
        });
        const user = result.first();
        if (!user) return null;
        const isValidPassword = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["compare"])(password, user.password);
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
        const client = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$cassandra$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getClient"])();
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
        const hashedPassword = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hash"])(password, 10);
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
        const client = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$cassandra$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getClient"])();
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
}}),
"[project]/src/app/api/auth/login/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-route] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'jsonwebtoken'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;
        if (!email || !password) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: 'Email and password are required'
            }, {
                status: 400
            });
        }
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authenticateUser"])(email, password);
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: 'Invalid email or password'
            }, {
                status: 401
            });
        }
        // Create JWT token
        const token = sign({
            email: user.email,
            name: user.name,
            role: user.role
        }, process.env.JWT_SECRET || 'your-secret-key', {
            expiresIn: '1d'
        });
        // Set HTTP-only cookie
        const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            user,
            message: 'Login successful'
        }, {
            status: 200
        });
        response.cookies.set({
            name: 'auth-token',
            value: token,
            httpOnly: true,
            secure: ("TURBOPACK compile-time value", "development") === 'production',
            sameSite: 'strict',
            maxAge: 86400,
            path: '/'
        });
        return response;
    } catch (error) {
        console.error('Login error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__612d1bf7._.js.map