// Define validation error interface
interface ValidationError {
  field: string;
  message: string;
}

// Type for validation result
interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

// Utility to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Utility to validate phone number (basic format)
function isValidPhone(phone: string): boolean {
  // Allow only digits, optional +, and minimum 10 digits
  const phoneRegex = /^(\+?\d{10,15})$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ''));
}

// Utility to validate Indian GSTIN
function isValidGSTIN(gstin: string): boolean {
  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
  return gstinRegex.test(gstin);
}

// Utility to validate Indian PAN
function isValidPAN(pan: string): boolean {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
}

// Utility to validate IFSC code
function isValidIFSC(ifsc: string): boolean {
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  return ifscRegex.test(ifsc);
}

// Main function to validate a seller row from bulk upload
export function validateSellerRow(row: any): ValidationResult {
  const errors: ValidationError[] = [];
  
  // Required fields check
  const requiredFields = [
    { key: 'Name', label: 'Name' },
    { key: 'Email', label: 'Email' },
    { key: 'Phone', label: 'Phone' },
    { key: 'Company Name', label: 'Company Name' },
    { key: 'GSTIN', label: 'GSTIN' },
    { key: 'PAN', label: 'PAN' },
    { key: 'Bank Name', label: 'Bank Name' },
    { key: 'Account Number', label: 'Account Number' },
    { key: 'IFSC Code', label: 'IFSC Code' },
    { key: 'Address Type', label: 'Address Type' },
    { key: 'Address Line 1', label: 'Address Line 1' },
    { key: 'City', label: 'City' },
    { key: 'State', label: 'State' },
    { key: 'Postal Code', label: 'Postal Code' },
    { key: 'Country', label: 'Country' }
  ];
  
  // Check for missing required fields
  requiredFields.forEach(field => {
    const value = row[field.key];
    if (!value || value.toString().trim() === '') {
      errors.push({
        field: field.label,
        message: `${field.label} is required`
      });
    }
  });
  
  // Email validation
  if (row['Email'] && !isValidEmail(row['Email'])) {
    errors.push({
      field: 'Email',
      message: 'Invalid email format'
    });
  }
  
  // Phone validation
  if (row['Phone'] && !isValidPhone(row['Phone'])) {
    errors.push({
      field: 'Phone',
      message: 'Invalid phone number format (should be 10-15 digits)'
    });
  }
  
  // GSTIN validation
  if (row['GSTIN'] && !isValidGSTIN(row['GSTIN'])) {
    errors.push({
      field: 'GSTIN',
      message: 'Invalid GSTIN format'
    });
  }
  
  // PAN validation
  if (row['PAN'] && !isValidPAN(row['PAN'])) {
    errors.push({
      field: 'PAN',
      message: 'Invalid PAN format'
    });
  }
  
  // IFSC validation
  if (row['IFSC Code'] && !isValidIFSC(row['IFSC Code'])) {
    errors.push({
      field: 'IFSC Code',
      message: 'Invalid IFSC Code format'
    });
  }
  
  // Account number validation (basic check)
  if (row['Account Number'] && !/^\d{9,18}$/.test(row['Account Number'])) {
    errors.push({
      field: 'Account Number',
      message: 'Account number should be 9-18 digits'
    });
  }
  
  // Postal code validation (basic check for India)
  if (row['Postal Code'] && !/^\d{6}$/.test(row['Postal Code']) && row['Country']?.toLowerCase() === 'india') {
    errors.push({
      field: 'Postal Code',
      message: 'Indian postal code should be 6 digits'
    });
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// Format data from CSV/Excel to match the seller input structure
export function formatSellerData(row: any): any {
  return {
    name: row['Name'],
    email: row['Email'],
    phone: row['Phone'],
    business: {
      companyName: row['Company Name'],
      gstin: row['GSTIN'],
      pan: row['PAN'],
      bankName: row['Bank Name'],
      accountNumber: row['Account Number'],
      ifscCode: row['IFSC Code'],
    },
    addresses: [
      {
        addressType: row['Address Type'],
        addressLine1: row['Address Line 1'],
        addressLine2: row['Address Line 2'] || '',
        city: row['City'],
        state: row['State'],
        postalCode: row['Postal Code'],
        country: row['Country'],
        isDefault: true
      }
    ]
  };
} 