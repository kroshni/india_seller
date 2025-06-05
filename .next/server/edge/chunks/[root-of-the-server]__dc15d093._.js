(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root-of-the-server]__dc15d093._.js", {

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
;
;
const config = {
    matcher: [
        // Customer and API routes that need authentication
        '/customer/:path*',
        '/api/customers/:path*',
        // Exclude static files and authentication routes
        '/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)'
    ],
    runtime: 'edge'
};
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
        console.log('Middleware: Detected authenticated user without customer-auth-token:', token.email);
        console.log('Middleware: Customer ID from NextAuth token:', token.customerId);
        // Instead of creating the JWT token here (which requires crypto), redirect to an API route
        // that will handle the token creation on the server side
        if (request.nextUrl.pathname.startsWith('/customer') && !request.nextUrl.pathname.startsWith('/customer/login')) {
            // Store the original URL to redirect back after token creation
            const originalUrl = request.nextUrl.pathname + request.nextUrl.search;
            // Create a URL for the token creation API with the return URL as a query parameter
            const tokenUrl = new URL('/api/customers/auth/token', request.url);
            tokenUrl.searchParams.set('returnUrl', originalUrl);
            console.log('Middleware: Redirecting to token creation API:', tokenUrl.toString());
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(tokenUrl);
        }
        // For API routes, we can't redirect, so we'll just continue and let the API handle the auth check
        console.log('Middleware: API route without token, continuing to let API handle auth check');
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    } else if (token && token.customerId) {
        console.log('Middleware: Customer already has auth token, no action needed');
    } else if (token) {
        console.log('Middleware: NextAuth token exists but missing customerId');
    } else {
        console.log('Middleware: No NextAuth token found');
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
} // Config is already defined at the top of the file
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__dc15d093._.js.map