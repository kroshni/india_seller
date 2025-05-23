'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Form step components imports
import PersonalDetailsForm from '@/components/forms/sellers/PersonalDetailsForm';
import BusinessDetailsForm from '@/components/forms/sellers/BusinessDetailsForm';
import ProductCategoryForm from '@/components/forms/sellers/ProductCategoryForm';
import DocumentUploadForm from '@/components/forms/sellers/DocumentUploadForm';
import SellerReviewForm from '@/components/forms/sellers/SellerReviewForm';

// Define the form steps
const STEPS = {
  PERSONAL_DETAILS: 0,
  BUSINESS_DETAILS: 1,
  PRODUCT_CATEGORY: 2,
  DOCUMENT_UPLOAD: 3,
  REVIEW: 4,
};

// Define the form data structure
interface FormData {
  // Personal details
  name: string;
  email: string;
  phone: string;
  profilePicture?: string | null;
  
  // Business details
  business: {
    companyName: string;
    address: string;
    gstin: string;
    pan: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
  };
  
  // Product details
  products: {
    productName: string;
    category: string;
  }[];
  
  // Documents
  documents: {
    documentType: string;
    documentUrl: string;
  }[];
}

export default function NewSellerPage() {
  const router = useRouter();
  const [step, setStep] = useState(STEPS.PERSONAL_DETAILS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    profilePicture: null,
    business: {
      companyName: '',
      address: '',
      gstin: '',
      pan: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
    },
    products: [],
    documents: [],
  });
  
  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };
  
  const nextStep = () => {
    setStep((prev) => prev + 1);
  };
  
  const prevStep = () => {
    setStep((prev) => prev - 1);
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/sellers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create seller');
      }
      
      const data = await response.json();
      
      // Redirect to the seller list page
      router.push('/dashboard/sellers');
    } catch (error) {
      console.error('Error creating seller:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Render the current step form
  const renderStepContent = () => {
    switch (step) {
      case STEPS.PERSONAL_DETAILS:
        return (
          <PersonalDetailsForm
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        );
      case STEPS.BUSINESS_DETAILS:
        return (
          <BusinessDetailsForm
            formData={formData}
            updateFormData={updateFormData}
            onBack={prevStep}
            onNext={nextStep}
          />
        );
      case STEPS.PRODUCT_CATEGORY:
        return (
          <ProductCategoryForm
            formData={formData}
            updateFormData={updateFormData}
            onBack={prevStep}
            onNext={nextStep}
          />
        );
      case STEPS.DOCUMENT_UPLOAD:
        return (
          <DocumentUploadForm
            formData={formData}
            updateFormData={updateFormData}
            onBack={prevStep}
            onNext={nextStep}
          />
        );
      case STEPS.REVIEW:
        return (
          <SellerReviewForm
            formData={formData}
            onBack={prevStep}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Seller</h1>
          <p className="mt-1 text-sm text-gray-600">
            Complete the form to register a new seller in the system
          </p>
        </div>
        
        <Link
          href="/dashboard/sellers"
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </Link>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            {Object.values(STEPS).filter(s => typeof s === 'number').map((stepValue) => (
              <div 
                key={stepValue} 
                className={`flex flex-col items-center ${
                  stepValue < step 
                    ? 'text-green-600' 
                    : stepValue === step 
                    ? 'text-blue-600' 
                    : 'text-gray-400'
                }`}
              >
                <div 
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    stepValue < step 
                      ? 'bg-green-100 border-green-600' 
                      : stepValue === step 
                      ? 'bg-blue-100 border-blue-600' 
                      : 'bg-gray-100 border-gray-400'
                  }`}
                >
                  {stepValue < step ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span>{stepValue + 1}</span>
                  )}
                </div>
                <span className="mt-2 text-xs font-medium">
                  {stepValue === STEPS.PERSONAL_DETAILS && 'Personal Details'}
                  {stepValue === STEPS.BUSINESS_DETAILS && 'Business Details'}
                  {stepValue === STEPS.PRODUCT_CATEGORY && 'Products'}
                  {stepValue === STEPS.DOCUMENT_UPLOAD && 'Documents'}
                  {stepValue === STEPS.REVIEW && 'Review'}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-6">
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
} 