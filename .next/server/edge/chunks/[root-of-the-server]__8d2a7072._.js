(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root-of-the-server]__8d2a7072._.js", {

"[externals]/node:buffer [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[externals]/node:util [external] (node:util, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:util", () => require("node:util"));

module.exports = mod;
}}),
"[project]/src/middleware.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "config": (()=>config),
    "middleware": (()=>middleware)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/jwt/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsonwebtoken/index.js [middleware-edge] (ecmascript)");
;
;
;
async function middleware(request) {
    // Only run this middleware for customer routes
    if (!request.nextUrl.pathname.startsWith('/customer') && !request.nextUrl.pathname.startsWith('/api/customers')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    console.log('Middleware: Processing request for path:', request.nextUrl.pathname);
    console.log('Middleware: Checking for existing customer-auth-token:', request.cookies.has('customer-auth-token'));
    // Check if the user is authenticated with NextAuth
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getToken"])({
        req: request,
        secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET
    });
    console.log('Middleware: NextAuth token exists:', !!token);
    console.log('Middleware: NextAuth token contains customerId:', token?.customerId ? 'Yes' : 'No');
    // If the user is authenticated with NextAuth but doesn't have the custom JWT token cookie
    if (token && token.customerId && !request.cookies.has('customer-auth-token')) {
        console.log('Middleware: Setting customer-auth-token for authenticated user:', token.email);
        console.log('Middleware: Customer ID from NextAuth token:', token.customerId);
        // Create a custom JWT token
        const customToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["sign"])({
            email: token.email,
            name: token.name,
            role: 'customer',
            customerId: token.customerId
        }, process.env.JWT_SECRET || 'your-secret-key', {
            expiresIn: '1d'
        });
        // Clone the response and set the cookie
        const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
        response.cookies.set({
            name: 'customer-auth-token',
            value: customToken,
            httpOnly: true,
            secure: ("TURBOPACK compile-time value", "development") === 'production',
            sameSite: 'strict',
            maxAge: 86400,
            path: '/'
        });
        console.log('Middleware: Set customer-auth-token cookie successfully');
        return response;
    } else if (token && token.customerId) {
        console.log('Middleware: Customer already has auth token, no action needed');
    } else if (token) {
        console.log('Middleware: NextAuth token exists but missing customerId');
    } else {
        console.log('Middleware: No NextAuth token found');
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        '/customer/:path*',
        '/api/customers/:path*'
    ]
};
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__8d2a7072._.js.map