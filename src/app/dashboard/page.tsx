'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface StatsType {
  totalSellers: number;
  activeSellers: number;
  pendingKyc: number;
  topScorers: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<StatsType>({
    totalSellers: 0,
    activeSellers: 0,
    pendingKyc: 0,
    topScorers: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/sellers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            // Redirect to login if unauthorized
            router.replace('/auth/login');
            return;
          }
          throw new Error('Failed to fetch sellers');
        }
        
        const { sellers } = await response.json();
        
        // Calculate stats from sellers data
        const activeSellers = sellers.filter((seller: any) => seller.status === 'Active').length;
        const pendingKyc = sellers.filter((seller: any) => seller.kycStatus === 'Pending').length;
        const topScorers = sellers.filter((seller: any) => seller.isTopScorer).length;
        
        setStats({
          totalSellers: sellers.length,
          activeSellers,
          pendingKyc,
          topScorers,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStats();
  }, [router]);
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Overview of your seller management system
        </p>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center my-12">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Loading stats...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard
              title="Total Sellers"
              value={stats.totalSellers}
              color="bg-blue-500"
            />
            <StatCard
              title="Active Sellers"
              value={stats.activeSellers}
              color="bg-green-500"
            />
            <StatCard
              title="Pending KYC"
              value={stats.pendingKyc}
              color="bg-yellow-500"
            />
            <StatCard
              title="Top Scorers"
              value={stats.topScorers}
              color="bg-purple-500"
            />
          </div>
          
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ActionCard
                title="View All Sellers"
                description="Browse and manage all sellers in the system"
                link="/dashboard/sellers"
                linkText="View Sellers"
              />
              <ActionCard
                title="Add New Seller"
                description="Register a new seller in the system"
                link="/dashboard/sellers/new"
                linkText="Add Seller"
              />
              <ActionCard
                title="Pending KYC Verifications"
                description="Review sellers awaiting KYC verification"
                link="/dashboard/sellers?filter=pending"
                linkText="Review KYC"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className={`h-2 ${color}`}></div>
      <div className="p-5">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function ActionCard({ 
  title, 
  description, 
  link, 
  linkText 
}: { 
  title: string; 
  description: string; 
  link: string; 
  linkText: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden p-6">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
      <div className="mt-4">
        <Link
          href={link}
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {linkText}
        </Link>
      </div>
    </div>
  );
} 