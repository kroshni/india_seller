# Dummy Seller Data Seeding

This project includes multiple ways to generate and seed 15 dummy sellers with detailed information.

## Option 1: Using the UI Button (Recommended)

1. Start the application with `npm run dev`
2. Navigate to the Sellers page at `/dashboard/sellers`
3. Click the "Add 15 Dummy Sellers" button at the top right of the page
4. The system will automatically generate and insert 15 sellers with random:
   - Personal information
   - Business details
   - Products (1-4 per seller)
   - Documents (1-3 per seller)
   - Profile pictures (for some sellers)
5. The page will automatically refresh once the sellers are created

## Option 2: Using the API Directly

You can directly hit the API endpoint:

```
GET /api/seed/sellers
```

This will generate and insert the same data as the UI button.

## Option 3: Using the JavaScript Scripts

We've included two scripts for generating dummy data:

### 1. Generate Seed Data JSON (No Database Access Required)

```bash
node scripts/simple-seeder.js
```

This script will:
- Generate 15 dummy sellers with all related information
- Save the data to `scripts/seed-data.json`
- No database connection is needed

### 2. Insert Dummy Data Directly to Database

```bash
node scripts/add-dummy-sellers.js
```

This script will:
- Connect to the Cassandra database
- Generate 15 dummy sellers
- Insert them directly into the database

## Customizing the Seed Data

If you need to modify the generated data, you can edit any of these files:

- `scripts/simple-seeder.js` - The standalone generator
- `scripts/add-dummy-sellers.js` - The CommonJS direct inserter
- `scripts/add-dummy-sellers.mjs` - The ESM direct inserter
- `src/app/api/seed/sellers/route.ts` - The API endpoint

The main customization points are:

- Number of sellers (default: 15)
- Product count per seller (default: 1-4 randomly)
- Document count per seller (default: 1-3 randomly)
- Categories, document types, and bank names (predefined lists)
- Status distributions (Active/Inactive, Verified/Pending, TopScorer)

## Sample Generated Data

Each seller includes:

```javascript
{
  "id": "uuid",
  "name": "Seller 1",
  "email": "seller1@example.com",
  "phone": "9876500000",
  "profilePicture": "https://randomuser.me/api/portraits/men/1.jpg", // Some are null
  "isTopScorer": true, // 30% chance
  "kycStatus": "Verified", // 70% Verified, 30% Pending
  "status": "Active", // 80% Active, 20% Inactive
  "createdAt": "2023-09-30T12:34:56.789Z",
  "updatedAt": "2023-09-30T12:34:56.789Z",
  "business": {
    "sellerId": "uuid",
    "companyName": "Company 1",
    "address": "Address 1, New Delhi, India",
    "gstin": "GST0000000001",
    "pan": "PAN00000001",
    "bankName": "HDFC", // Random from list
    "accountNumber": "ACC1234567890",
    "ifscCode": "IFSC12345"
  },
  "products": [
    {
      "sellerId": "uuid",
      "productName": "Product 1 of Seller 1",
      "category": "Electronics" // Random from list
    },
    // 1-4 products per seller
  ],
  "documents": [
    {
      "sellerId": "uuid",
      "documentType": "ID Proof", // Random from list
      "documentUrl": "https://example.com/documents/seller1/doc1.pdf",
      "uploadedAt": "2023-09-30T12:34:56.789Z"
    },
    // 1-3 documents per seller
  ]
}
``` 