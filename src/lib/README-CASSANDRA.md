# Cassandra Database Setup

This application uses Apache Cassandra for data storage. In development mode, mock data is used by default.

## Configuration

To configure the Cassandra connection, set the following environment variables:

```
CASSANDRA_CONTACT_POINTS=localhost
CASSANDRA_LOCAL_DATACENTER=datacenter1
CASSANDRA_KEYSPACE=india_seller
CASSANDRA_USERNAME=
CASSANDRA_PASSWORD=
```

To use a real Cassandra database in development mode, set:

```
USE_REAL_DB=true
```

## Development Mode

By default, when `NODE_ENV` is not set to `production`, the application uses an in-memory mock database to make development easier.

## Required Schema

The following tables are required for the application to function properly:

- `sellers`
- `seller_business`
- `seller_products`
- `seller_documents`
- `customers`
- `customer_addresses`
- `customer_documents`
- `customer_requirements`
- `products`
- `categories`
- `brands`
- `orders`
- `order_items`

The application will automatically create these tables on startup if they don't exist.

## Running Local Cassandra (Docker)

To run Cassandra locally using Docker:

```bash
docker run --name india-seller-cassandra -p 9042:9042 -d cassandra:latest
```

To create the keyspace:

```bash
docker exec -it india-seller-cassandra cqlsh -e "CREATE KEYSPACE IF NOT EXISTS india_seller WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};"
```