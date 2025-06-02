import { v4 as uuidv4 } from 'uuid';
import { getClient } from '../db/cassandra';

// Helper function to execute queries
async function executeQuery(query: string, params: any[] = []) {
  const client = await getClient();
  const result = await client.execute(query, params, { prepare: true });
  return result.rows;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  orderDate: string;
  status: string;
  totalAmount: number;
  paymentStatus: string;
  shippingAddressId: string;
  billingAddressId: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
}

export interface CreateOrderInput {
  customerId: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  shippingAddressId: string;
  billingAddressId: string;
}

// Get all orders for a specific customer
export async function getOrdersByCustomerId(customerId: string): Promise<OrderWithItems[]> {
  try {
    // Get orders for the customer
    const ordersQuery = `
      SELECT * FROM orders 
      WHERE customer_id = ? 
      ALLOW FILTERING
    `;
    const orders = await executeQuery(ordersQuery, [customerId]);

    // Get order items for each order
    const orderWithItems: OrderWithItems[] = await Promise.all(
      orders.map(async (order: any) => {
        const itemsQuery = `
          SELECT * FROM order_items 
          WHERE order_id = ? 
          ALLOW FILTERING
        `;
        const items = await executeQuery(itemsQuery, [order.id]);

        // Map database column names to camelCase for frontend
        return {
          id: order.id,
          orderNumber: order.order_number,
          customerId: order.customer_id,
          orderDate: order.order_date,
          status: order.status,
          totalAmount: order.total_amount,
          paymentStatus: order.payment_status,
          shippingAddressId: order.shipping_address_id,
          billingAddressId: order.billing_address_id,
          items: items.map((item: any) => ({
            id: item.id,
            orderId: item.order_id,
            productId: item.product_id,
            productName: item.product_name,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.subtotal
          }))
        };
      })
    );

    return orderWithItems;
  } catch (error) {
    console.error('Error getting orders by customer ID:', error);
    throw error;
  }
}

// Get a specific order by ID
export async function getOrderById(orderId: string): Promise<OrderWithItems | null> {
  try {
    // Get the order
    const orderQuery = `
      SELECT * FROM orders 
      WHERE id = ?
    `;
    const orders = await executeQuery(orderQuery, [orderId]);
    
    if (orders.length === 0) {
      return null;
    }
    
    const order = orders[0];

    // Get order items
    const itemsQuery = `
      SELECT * FROM order_items 
      WHERE order_id = ? 
      ALLOW FILTERING
    `;
    const items = await executeQuery(itemsQuery, [orderId]);

    // Map database column names to camelCase for frontend
    return {
      id: order.id,
      orderNumber: order.order_number,
      customerId: order.customer_id,
      orderDate: order.order_date,
      status: order.status,
      totalAmount: order.total_amount,
      paymentStatus: order.payment_status,
      shippingAddressId: order.shipping_address_id,
      billingAddressId: order.billing_address_id,
      items: items.map((item: any) => ({
        id: item.id,
        orderId: item.order_id,
        productId: item.product_id,
        productName: item.product_name,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal
      }))
    };
  } catch (error) {
    console.error('Error getting order by ID:', error);
    throw error;
  }
}

// Create a new order
export async function createOrder(orderData: CreateOrderInput): Promise<string> {
  try {
    const orderId = uuidv4();
    const orderNumber = generateOrderNumber();
    const orderDate = new Date().toISOString();
    const status = 'Pending';
    const paymentStatus = 'Pending';
    
    // Calculate total amount
    const totalAmount = orderData.items.reduce(
      (sum, item) => sum + (item.price * item.quantity), 
      0
    );

    // Insert order
    const orderQuery = `
      INSERT INTO orders (
        id, order_number, customer_id, order_date, status, 
        total_amount, payment_status, shipping_address_id, billing_address_id
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await executeQuery(orderQuery, [
      orderId,
      orderNumber,
      orderData.customerId,
      orderDate,
      status,
      totalAmount,
      paymentStatus,
      orderData.shippingAddressId,
      orderData.billingAddressId
    ]);

    // Insert order items
    for (const item of orderData.items) {
      const itemId = uuidv4();
      const subtotal = item.price * item.quantity;
      
      const itemQuery = `
        INSERT INTO order_items (
          id, order_id, product_id, product_name, 
          quantity, price, subtotal
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      
      await executeQuery(itemQuery, [
        itemId,
        orderId,
        item.productId,
        item.productName,
        item.quantity,
        item.price,
        subtotal
      ]);
    }

    return orderId;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

// Update order status
export async function updateOrderStatus(
  orderId: string, 
  status: string, 
  paymentStatus?: string
): Promise<boolean> {
  try {
    let query = 'UPDATE orders SET status = ?';
    const params = [status];

    if (paymentStatus) {
      query += ', payment_status = ?';
      params.push(paymentStatus);
    }

    query += ' WHERE id = ?';
    params.push(orderId);

    await executeQuery(query, params);
    return true;
  } catch (error) {
    console.error('Error updating order status:', error);
    return false;
  }
}

// Cancel an order
export async function cancelOrder(orderId: string): Promise<boolean> {
  return updateOrderStatus(orderId, 'Cancelled');
}

// Helper function to generate a unique order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `ORD-${timestamp}${random}`;
}