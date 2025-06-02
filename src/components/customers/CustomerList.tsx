import React, { useState, useEffect } from 'react';
import InlineEditableStatus from './InlineEditableStatus';

// Simulate fetching customer data
const fetchCustomers = async () => {
  // Simulate an API call
  return [
    {
      id: 1,
      image: 'path/to/image1.jpg',
      fullName: 'John Doe',
      status: 'Active',
      kycStatus: 'Verified',
      premium: 'Yes',
    },
    {
      id: 2,
      image: 'path/to/image2.jpg',
      fullName: 'Jane Smith',
      status: 'Inactive',
      kycStatus: 'Pending',
      premium: 'No',
    },
    // Add more dummy customers as needed
  ];
};

// Define a type for customer data
interface Customer {
  id: number;
  image: string;
  fullName: string;
  status: string;
  kycStatus: string;
  premium: string;
}

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(10);

  useEffect(() => {
    const loadCustomers = async () => {
      const data = await fetchCustomers();
      setCustomers(data);
    };
    loadCustomers();
  }, []);

  // Filter customers based on search query
  const filteredCustomers = customers.filter((customer) =>
    customer.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleStatusSave = async (customerId: string, status: 'Active' | 'Inactive') => {
    // Simulate saving status to a server
    console.log(`Saving status for customer ${customerId}: ${status}`);
    return true; // Simulate successful save
  };

  return (
    <div>
      <h1>Customer Listing</h1>
      {/* Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by name, email, or mobile number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '10px', width: '100%', maxWidth: '400px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </div>
      {/* Customer Table */}
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Full Name</th>
            <th>Status</th>
            <th>KYC Status</th>
            <th>Premium</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.map((customer) => (
            <tr key={customer.id}>
              <td><img src={customer.image} alt={customer.fullName} width="50" /></td>
              <td>{customer.fullName}</td>
              <td>
                <InlineEditableStatus
                  customerId={customer.id.toString()}
                  initialStatus={customer.status as 'Active' | 'Inactive'}
                  onSave={handleStatusSave}
                />
              </td>
              <td>{customer.kycStatus}</td>
              <td>{customer.premium}</td>
              <td>
                <button>View</button>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div>
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastCustomer >= filteredCustomers.length}>Next</button>
      </div>
    </div>
  );
};

export default CustomerList; 