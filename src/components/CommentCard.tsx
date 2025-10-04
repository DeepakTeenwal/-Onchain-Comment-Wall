'use client';

import { Heart } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { CHAIN_CONFIGS, type WallComment } from '@/types';

interface CommentCardProps {
  comment: WallComment;
  onLike?: (commentId: string) => void;
  isLiking?: boolean;
}

export function CommentCard({ comment, onLike, isLiking }: CommentCardProps) {
  const chainConfig = CHAIN_CONFIGS[comment.chain];
  const timeAgo = formatDistanceToNow(new Date(comment.timestamp * 1000), {
    addSuffix: true,
  });

  const handleLike = () => {
    if (onLike && !isLiking) {
      onLike(comment.id);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{chainConfig.icon}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500">
                {comment.user.slice(0, 6)}...{comment.user.slice(-4)}
              </span>
              {comment.fid && (
                <span className="text-xs text-blue-600">
                  @fid:{comment.fid}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-400">{timeAgo}</span>
          </div>
        </div>
        
        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
          {chainConfig.chainName}
        </span>
      </div>

      {/* Message */}
      <p className="text-gray-800 mb-3 whitespace-pre-wrap break-words">
        {comment.message}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className="flex items-center gap-1.5 text-gray-600 hover:text-red-500 transition-colors disabled:opacity-50"
        >
          <Heart className="w-4 h-4" />
          <span className="text-sm font-medium">{comment.likes}</span>
        </button>

        <a
          href={`${chainConfig.blockExplorer}/address/${comment.user}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:underline"
        >
          View on explorer →
        </a>
      </div>
    </div>
  );
}
