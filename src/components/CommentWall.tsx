'use client';

import { useState } from 'react';
import { RefreshCw, Filter } from 'lucide-react';
import { useAllComments } from '@/hooks/useComments';
import { CommentCard } from './CommentCard';
import type { ChainType } from '@/types';

export function CommentWall() {
  const [filter, setFilter] = useState<'all' | ChainType>('all');
  const { comments, celoComments, arbitrumComments, isLoading, refetch } = useAllComments();

  const filteredComments = filter === 'all'
    ? comments
    : filter === 'celo'
    ? celoComments
    : arbitrumComments;

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Global Wall</h2>
          <p className="text-sm text-gray-600 mt-1">
            {filteredComments.length} message{filteredComments.length !== 1 ? 's' : ''} onchain
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <Filter className="w-4 h-4 text-gray-400" />
        
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            filter === 'all'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          All ({comments.length})
        </button>

        <button
          onClick={() => setFilter('celo')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            filter === 'celo'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          🌱 Celo ({celoComments.length})
        </button>

        <button
          onClick={() => setFilter('arbitrum')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            filter === 'arbitrum'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          🦄 Arbitrum ({arbitrumComments.length})
        </button>
      </div>

      {/* Loading State */}
      {isLoading && filteredComments.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading comments...</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredComments.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-600 text-lg mb-2">No comments yet</p>
          <p className="text-gray-500 text-sm">Be the first to leave a message!</p>
        </div>
      )}

      {/* Comments Grid */}
      {filteredComments.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredComments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}
