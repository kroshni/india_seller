'use client';

import { useState } from 'react';

interface BusinessDetailsFormProps {
  formData: any;
  updateFormData: (data: any) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function BusinessDetailsForm({
  formData,
  updateFormData,
  onBack,
  onNext,
}: BusinessDetailsFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({
      business: {
        ...formData.business,
        [name]: value,
      },
    });
    
    // Clear the error for this field when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.business.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    
    if (!formData.business.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.business.gstin.trim()) {
      newErrors.gstin = 'GSTIN is required';
    } else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.business.gstin)) {
      newErrors.gstin = 'Please enter a valid GSTIN';
    }
    
    if (!formData.business.pan.trim()) {
      newErrors.pan = 'PAN is required';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.business.pan)) {
      newErrors.pan = 'Please enter a valid PAN';
    }
    
    if (!formData.business.bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    }
    
    if (!formData.business.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    } else if (!/^\d{9,18}$/.test(formData.business.accountNumber.replace(/\D/g, ''))) {
      newErrors.accountNumber = 'Please enter a valid account number';
    }
    
    if (!formData.business.ifscCode.trim()) {
      newErrors.ifscCode = 'IFSC code is required';
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.business.ifscCode)) {
      newErrors.ifscCode = 'Please enter a valid IFSC code';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onNext();
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.business.companyName}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${
              errors.companyName ? 'border-red-300' : 'border-gray-300'
            } shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500`}
          />
          {errors.companyName && (
            <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Business Address <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            rows={3}
            value={formData.business.address}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${
              errors.address ? 'border-red-300' : 'border-gray-300'
            } shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500`}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="gstin" className="block text-sm font-medium text-gray-700">
              GSTIN <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="gstin"
              name="gstin"
              value={formData.business.gstin}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.gstin ? 'border-red-300' : 'border-gray-300'
              } shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500`}
              placeholder="22AAAAA0000A1Z5"
            />
            {errors.gstin && (
              <p className="mt-1 text-sm text-red-600">{errors.gstin}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="pan" className="block text-sm font-medium text-gray-700">
              PAN <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="pan"
              name="pan"
              value={formData.business.pan}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.pan ? 'border-red-300' : 'border-gray-300'
              } shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500`}
              placeholder="AAAAA0000A"
            />
            {errors.pan && (
              <p className="mt-1 text-sm text-red-600">{errors.pan}</p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">
            Bank Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="bankName"
            name="bankName"
            value={formData.business.bankName}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${
              errors.bankName ? 'border-red-300' : 'border-gray-300'
            } shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500`}
          />
          {errors.bankName && (
            <p className="mt-1 text-sm text-red-600">{errors.bankName}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
              Account Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={formData.business.accountNumber}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.accountNumber ? 'border-red-300' : 'border-gray-300'
              } shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.accountNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700">
              IFSC Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="ifscCode"
              name="ifscCode"
              value={formData.business.ifscCode}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.ifscCode ? 'border-red-300' : 'border-gray-300'
              } shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500`}
              placeholder="SBIN0000001"
            />
            {errors.ifscCode && (
              <p className="mt-1 text-sm text-red-600">{errors.ifscCode}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Next: Product Categories
        </button>
      </div>
    </form>
  );
} 