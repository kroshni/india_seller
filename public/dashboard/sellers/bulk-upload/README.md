# Seller Bulk Upload Guide

This guide explains how to prepare your CSV file for bulk uploading sellers into the system.

## File Format Requirements

- The file must be in CSV (Comma-Separated Values) format
- Maximum file size: 5MB
- The first row must contain the column headers
- Required columns are marked with an asterisk (*)

## Required Columns

### Basic Information
- `Name`* - Seller's full name
- `Email`* - Valid email address
- `Phone`* - Phone number (10-15 digits)
- `Company Name`* - Business name
- `Profile Picture` - URL to profile image (optional)

### Business Details
- `GSTIN`* - GST Identification Number (format: 29ABCDE1234F1Z5)
- `PAN`* - Permanent Account Number (format: ABCDE1234F)
- `Bank Name`* - Bank name
- `Account Number`* - Bank account number (9-18 digits)
- `IFSC Code`* - Indian Financial System Code (format: HDFC0001234)

### Primary Address (Required)
- `Address1_Type`* - Type of address (Business, Warehouse, Factory, or Other)
- `Address1_Line1`* - Address line 1
- `Address1_Line2` - Address line 2 (optional)
- `Address1_City`* - City
- `Address1_State`* - State
- `Address1_Postal`* - Postal code (6 digits for India)
- `Address1_Country`* - Country
- `Address1_Image` - URL to location image (optional)

### Additional Addresses (Optional)
You can include up to 4 additional addresses by using the Address2_, Address3_, Address4_, and Address5_ prefixes:

- `Address2_Type` - Type of second address
- `Address2_Line1` - Address line 1 for second address
- `Address2_Line2` - Address line 2 for second address
- `Address2_City` - City for second address
- `Address2_State` - State for second address
- `Address2_Postal` - Postal code for second address
- `Address2_Country` - Country for second address
- `Address2_Image` - URL to location image for second address

Follow the same pattern for Address3_, Address4_, and Address5_ if needed.

### Documents (Optional)
- `Document Types` - Comma-separated list of document types (e.g., "GST Certificate,PAN Card")
- `Document URLs` - Comma-separated list of document URLs (e.g., "https://example.com/gst.pdf,https://example.com/pan.pdf")

The number of document types must match the number of document URLs. Supported document types include:
- GST Certificate
- PAN Card
- Aadhar Card
- Business License
- Store Images
- ID Proof
- Shop & Establishment Certificate
- Other

### Gallery Images (Optional)
- `Gallery URLs` - Comma-separated list of image URLs (e.g., "https://example.com/image1.jpg,https://example.com/image2.jpg")
- `Gallery Captions` - Comma-separated list of captions for gallery images (optional)

## CSV Format Example

```
Name,Email,Phone,Company Name,GSTIN,PAN,Bank Name,Account Number,IFSC Code,Profile Picture,Address1_Type,Address1_Line1,Address1_Line2,Address1_City,Address1_State,Address1_Postal,Address1_Country,Address1_Image,Address2_Type,Address2_Line1,Address2_Line2,Address2_City,Address2_State,Address2_Postal,Address2_Country,Address2_Image,Document Types,Document URLs,Gallery URLs,Gallery Captions
John Doe,john@example.com,9876543210,Acme Inc.,29ABCDE1234F1Z5,ABCDE1234F,HDFC Bank,1234567890,HDFC0001234,https://example.com/john.jpg,Business,123 Main St,Suite 101,Mumbai,Maharashtra,400001,India,https://example.com/store1.jpg,Warehouse,456 Park Ave,,Delhi,Delhi,110001,India,https://example.com/warehouse1.jpg,"GST Certificate,PAN Card","https://example.com/gst.pdf,https://example.com/pan.pdf","https://example.com/gallery1.jpg,https://example.com/gallery2.jpg","Main Store,Product Display"
```

## Tips for Successful Import

1. Download and use the sample template from the Bulk Upload page
2. Ensure all required fields are filled
3. Follow the correct format for Indian-specific fields (GSTIN, PAN, IFSC)
4. For fields with commas inside them, enclose the entire field in double quotes
5. Make sure all URLs are valid and accessible
6. For multiple items in a field (documents, gallery), keep the same order between related fields
7. For additional addresses, all required fields must be provided for each address

## Validation Rules

The system validates your data before import:

- Email must be in valid format
- Phone number must be 10-15 digits
- GSTIN must follow the standard Indian format
- PAN must follow the standard Indian format
- IFSC code must follow the standard format
- Account number must be 9-18 digits
- For Indian addresses, postal code must be 6 digits
- URLs must be in valid format
- Document types and URLs must have matching counts
- Additional addresses must have all required fields completed 