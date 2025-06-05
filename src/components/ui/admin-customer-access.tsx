'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { UserIcon } from 'lucide-react';

export function AdminCustomerAccess() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const accessCustomerPanel = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/admin/customer-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || result.error || 'Failed to access customer panel');
        return;
      }

      // Redirect to customer dashboard
      router.push(result.redirectUrl || '/customer/dashboard');
    } catch (err) {
      setError('An error occurred while accessing customer panel');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button 
        onClick={accessCustomerPanel} 
        disabled={isLoading}
        variant="outline"
        className="flex items-center gap-2"
      >
        <UserIcon className="h-4 w-4" />
        {isLoading ? 'Accessing...' : 'Access Customer Panel'}
      </Button>
      
      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
}