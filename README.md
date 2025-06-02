# Seller Admin Panel

A full-stack admin panel for seller management using Next.js (App Router) and Apache Cassandra.

## Features

- 🔐 Secure authentication with JWT
- 👤 Comprehensive seller management (CRUD)
- 📊 Dashboard with seller statistics
- 📄 Listing page with filtering options
- 🔍 Detailed seller views
- 📝 Form-based seller creation and editing
- 📋 Customer requirements management
- 🖼️ Image/document upload support
- 🚀 Responsive design with Tailwind CSS

## Tech Stack

- **Frontend:** Next.js 15+ (App Router), Tailwind CSS, React Hook Form
- **Backend API:** Next.js API Routes
- **Authentication:** JWT-based with HTTP-only cookies
- **Database:** Apache Cassandra
- **File Storage:** (Optional) S3 or Cloudinary integration

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Apache Cassandra (local installation or managed service)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Cassandra Configuration
CASSANDRA_CONTACT_POINTS=127.0.0.1
CASSANDRA_LOCAL_DATACENTER=datacenter1
CASSANDRA_KEYSPACE=indiaseller1
CASSANDRA_USERNAME=cassandra
CASSANDRA_PASSWORD=cassandra

# JWT Secret for Authentication
JWT_SECRET=your-secret-key-here

# Optional: S3 or Cloudinary credentials for file uploads
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/seller-admin-panel.git
cd seller-admin-panel
```

2. Install dependencies
```bash
npm install
```

3. Initialize the database
```bash
npx ts-node src/lib/db/init.ts
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser

### Default Admin Credentials

- Email: `admin@example.com`
- Password: `Admin@123`

## Project Structure

```
src/
├── app/                    # Next.js App Router structure
│   ├── api/                # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   └── sellers/        # Seller management endpoints
│   ├── auth/               # Authentication pages
│   └── dashboard/          # Admin dashboard pages
├── components/             # React components
│   ├── forms/              # Form components
│   ├── layout/             # Layout components
│   └── ui/                 # UI components
├── lib/                    # Library code
│   ├── db/                 # Database connection and utilities
│   └── services/           # Business logic services
└── ...
```

## Database Schema

The application uses the following Cassandra tables:

- `users`: Stores admin user information
- `sellers`: Stores seller personal information
- `seller_business`: Stores seller business details
- `seller_products`: Stores seller products
- `seller_documents`: Stores seller document uploads

## License

[MIT](LICENSE)
