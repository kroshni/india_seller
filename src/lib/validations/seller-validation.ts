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

// Utility to validate a URL
function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
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
    { key: 'Address1_Type', label: 'Address Type (Primary)' },
    { key: 'Address1_Line1', label: 'Address Line 1 (Primary)' },
    { key: 'Address1_City', label: 'City (Primary)' },
    { key: 'Address1_State', label: 'State (Primary)' },
    { key: 'Address1_Postal', label: 'Postal Code (Primary)' },
    { key: 'Address1_Country', label: 'Country (Primary)' }
  ];
  
  // Check for missing required fields
  requiredFields.forEach(field => {
    // Case insensitive key lookup
    const fieldKey = Object.keys(row).find(k => 
      k.toLowerCase() === field.key.toLowerCase()
    );
    
    // Use the found key or fall back to the original key
    const value = fieldKey ? row[fieldKey] : undefined;
    
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
  if (row['Address1_Postal'] && !/^\d{6}$/.test(row['Address1_Postal']) && 
      row['Address1_Country']?.toLowerCase() === 'india') {
    errors.push({
      field: 'Address1_Postal',
      message: 'Indian postal code should be 6 digits'
    });
  }
  
  // Check for additional addresses
  for (let i = 2; i <= 5; i++) {
    const addressPrefix = `Address${i}_`;
    // If any field for this address exists, check that required fields are present
    if (hasAddressFields(row, i)) {
      const requiredAddressFields = [
        { key: `${addressPrefix}Type`, label: `Address Type (${i})` },
        { key: `${addressPrefix}Line1`, label: `Address Line 1 (${i})` },
        { key: `${addressPrefix}City`, label: `City (${i})` },
        { key: `${addressPrefix}State`, label: `State (${i})` },
        { key: `${addressPrefix}Postal`, label: `Postal Code (${i})` },
        { key: `${addressPrefix}Country`, label: `Country (${i})` }
      ];
      
      requiredAddressFields.forEach(field => {
        const value = row[field.key];
        if (!value || value.toString().trim() === '') {
          errors.push({
            field: field.label,
            message: `${field.label} is required when adding multiple addresses`
          });
        }
      });
      
      // Postal code validation for additional addresses
      if (row[`${addressPrefix}Postal`] && 
          !/^\d{6}$/.test(row[`${addressPrefix}Postal`]) && 
          row[`${addressPrefix}Country`]?.toLowerCase() === 'india') {
        errors.push({
          field: `${addressPrefix}Postal`,
          message: `Indian postal code should be 6 digits for address ${i}`
        });
      }
    }
  }
  
  // Validate document URLs if provided
  if (row['Document URLs']) {
    const documentUrls = row['Document URLs'].split(',').map((url: string) => url.trim());
    
    // Check if document types are provided
    if (!row['Document Types']) {
      errors.push({
        field: 'Document Types',
        message: 'Document types must be provided when document URLs are specified'
      });
    } else {
      const documentTypes = row['Document Types'].split(',').map((type: string) => type.trim());
      
      // Check if counts match
      if (documentUrls.length !== documentTypes.length) {
        errors.push({
          field: 'Document URLs',
          message: 'Number of document URLs must match number of document types'
        });
      }
      
      // Validate each URL
      documentUrls.forEach((url: string, index: number) => {
        if (!isValidURL(url)) {
          errors.push({
            field: 'Document URLs',
            message: `Invalid URL format for document ${index + 1}: ${url}`
          });
        }
      });
    }
  }
  
  // Validate gallery URLs if provided
  if (row['Gallery URLs']) {
    const galleryUrls = row['Gallery URLs'].split(',').map((url: string) => url.trim());
    
    // Validate each gallery URL
    galleryUrls.forEach((url: string, index: number) => {
      if (!isValidURL(url)) {
        errors.push({
          field: 'Gallery URLs',
          message: `Invalid URL format for gallery image ${index + 1}: ${url}`
        });
      }
    });
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// Check if any address fields exist for a given address number
function hasAddressFields(row: any, addressNum: number): boolean {
  const prefix = `Address${addressNum}_`.toLowerCase();
  return Object.keys(row).some(key => 
    key.toLowerCase().startsWith(prefix) && row[key]
  );
}

// Format data from CSV/Excel to match the seller input structure
export function formatSellerData(row: any): any {
  // Helper function for case-insensitive field access
  const getFieldValue = (fieldName: string, defaultValue: string = '') => {
    const key = Object.keys(row).find(k => k.toLowerCase() === fieldName.toLowerCase());
    return key ? row[key] : defaultValue;
  };

  // Format addresses
  const addresses = [];
  
  // Add primary address
  addresses.push({
    addressType: getFieldValue('Address1_Type'),
    addressLine1: getFieldValue('Address1_Line1'),
    addressLine2: getFieldValue('Address1_Line2', ''),
    city: getFieldValue('Address1_City'),
    state: getFieldValue('Address1_State'),
    postalCode: getFieldValue('Address1_Postal'),
    country: getFieldValue('Address1_Country'),
    isDefault: true,
    image: getFieldValue('Address1_Image', '')
  });
  
  // Check for additional addresses
  for (let i = 2; i <= 5; i++) {
    const prefix = `Address${i}_`;
    if (hasAddressFields(row, i)) {
      addresses.push({
        addressType: getFieldValue(`${prefix}Type`),
        addressLine1: getFieldValue(`${prefix}Line1`),
        addressLine2: getFieldValue(`${prefix}Line2`, ''),
        city: getFieldValue(`${prefix}City`),
        state: getFieldValue(`${prefix}State`),
        postalCode: getFieldValue(`${prefix}Postal`),
        country: getFieldValue(`${prefix}Country`),
        isDefault: false,
        image: getFieldValue(`${prefix}Image`, '')
      });
    }
  }
  
  // Format documents
  const documents = [];
  const documentUrls = getFieldValue('Document URLs');
  const documentTypes = getFieldValue('Document Types');
  
  if (documentUrls && documentTypes) {
    const urlArray = documentUrls.split(',').map((url: string) => url.trim());
    const typeArray = documentTypes.split(',').map((type: string) => type.trim());
    
    for (let i = 0; i < Math.min(urlArray.length, typeArray.length); i++) {
      documents.push({
        documentType: typeArray[i],
        documentUrl: urlArray[i]
      });
    }
  }
  
  // Format gallery
  const gallery = [];
  const galleryUrls = getFieldValue('Gallery URLs');
  const galleryCaptions = getFieldValue('Gallery Captions');
  
  if (galleryUrls) {
    const urlArray = galleryUrls.split(',').map((url: string) => url.trim());
    const captionArray = galleryCaptions ? 
      galleryCaptions.split(',').map((caption: string) => caption.trim()) : [];
    
    for (let i = 0; i < urlArray.length; i++) {
      gallery.push({
        imageUrl: urlArray[i],
        caption: i < captionArray.length ? captionArray[i] : ''
      });
    }
  }
  
  // Format products - add empty array since we don't have product data in CSV
  const products = [];
  
  return {
    name: getFieldValue('Name'),
    email: getFieldValue('Email'),
    phone: getFieldValue('Phone'),
    profilePicture: getFieldValue('Profile Picture', ''),
    business: {
      companyName: getFieldValue('Company Name'),
      gstin: getFieldValue('GSTIN'),
      pan: getFieldValue('PAN'),
      bankName: getFieldValue('Bank Name'),
      accountNumber: getFieldValue('Account Number'),
      ifscCode: getFieldValue('IFSC Code'),
    },
    addresses,
    documents,
    gallery,
    products // Add empty products array
  };
} 