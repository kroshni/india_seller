'use client';

import Link from 'next/link';

export default function BusinessTypeSection() {
  const businessTypes = [
    {
      id: 'b2b',
      title: 'Business to Business',
      shortTitle: 'B2B',
      description: 'Connect with wholesalers, manufacturers, and suppliers for bulk orders and business partnerships.',
      icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
      color: 'bg-indigo-600',
      textColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      link: '/business-type/b2b'
    },
    {
      id: 'b2c',
      title: 'Business to Consumer',
      shortTitle: 'B2C',
      description: 'Direct sales from businesses to individual customers with retail pricing and consumer-focused products.',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      color: 'bg-emerald-600',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      link: '/business-type/b2c'
    },
    {
      id: 'c2c',
      title: 'Consumer to Consumer',
      shortTitle: 'C2C',
      description: 'Peer-to-peer marketplace for individuals to buy, sell, or trade products and services directly.',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      color: 'bg-amber-600',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      link: '/business-type/c2c'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {businessTypes.map((type) => (
        <div 
          key={type.id} 
          className={`rounded-lg shadow-sm overflow-hidden ${type.bgColor} border border-gray-200`}
        >
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className={`rounded-full p-2 ${type.color} text-white`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={type.icon}
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className={`text-lg font-semibold ${type.textColor}`}>{type.shortTitle}</h3>
                <p className="text-sm text-gray-600">{type.title}</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">{type.description}</p>
            
            <Link
              href={type.link}
              className={`inline-block px-4 py-2 border border-gray-300 rounded-md hover:bg-white ${type.textColor} font-medium transition-colors duration-200`}
            >
              Browse {type.shortTitle}
            </Link>
          </div>
          
          <div className={`${type.color} px-6 py-3 text-white`}>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Popular in {type.shortTitle}</span>
              <Link href={`${type.link}/popular`} className="text-sm underline">
                View All
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 