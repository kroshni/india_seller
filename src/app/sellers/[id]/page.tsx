// This is now a Server Component
import { getSellerById } from '@/lib/services/seller-service';
import SellerDetailsClient from './SellerDetailsClient';

export default async function SellerDetailsPage({ params }: { params: { id: string } }) {
  try {
    // Fetch the seller data directly from the server-side service
    const sellerData = await getSellerById(params.id);
    
    if (!sellerData) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-yellow-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-yellow-700 mb-2">Seller Not Found</h2>
            <p className="text-yellow-700">The seller you are looking for does not exist or has been deleted.</p>
            <a
              href="/"
              className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Go Back to Home
            </a>
          </div>
        </div>
      );
    }
    
    // Extract only the public seller data (removing confidential information)
    const publicSellerData = {
      seller: {
        id: sellerData.seller.id,
        name: sellerData.seller.name,
        email: sellerData.seller.email,
        phone: sellerData.seller.phone,
        profilePicture: sellerData.seller.profilePicture,
        isTopScorer: sellerData.seller.isTopScorer,
        kycStatus: sellerData.seller.kycStatus,
        status: sellerData.seller.status,
        createdAt: sellerData.seller.createdAt
      },
      business: {
        companyName: sellerData.business.companyName
      },
      addresses: sellerData.addresses.map(address => ({
        id: address.id,
        addressType: address.addressType,
        city: address.city,
        state: address.state,
        country: address.country,
        image: address.image
      })),
      // No documents - these are confidential
      gallery: sellerData.gallery
    };
    
    // Render the client component with the pre-fetched data
    return <SellerDetailsClient sellerData={publicSellerData} />;
  } catch (error) {
    console.error('Error fetching seller details:', error);
    // Return error state
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-700">Failed to load seller details. Please try again.</p>
          <a
            href="/"
            className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Go Back to Home
          </a>
        </div>
      </div>
    );
  }
} 