'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { marked } from 'marked';

export default function BulkUploadGuidePage() {
  const [markdownContent, setMarkdownContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchGuide() {
      try {
        const response = await fetch('/dashboard/sellers/bulk-upload/README.md');
        const content = await response.text();
        setMarkdownContent(content);
      } catch (error) {
        console.error('Error fetching guide:', error);
        setMarkdownContent('# Error\n\nFailed to load the guide. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchGuide();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Seller Bulk Upload Guide</h1>
        <Link
          href="/dashboard/sellers/bulk-upload"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Bulk Upload
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-lg">Loading guide...</span>
          </div>
        ) : (
          <div 
            className="prose max-w-none" 
            dangerouslySetInnerHTML={{ __html: marked(markdownContent) }}
          />
        )}
      </div>
    </div>
  );
} 