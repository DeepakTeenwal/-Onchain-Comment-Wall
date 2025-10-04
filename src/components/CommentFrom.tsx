'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { usePostComment } from '@/hooks/usePostComment';
import { ChainSelector } from './ChainSelector';
import type { ChainType } from '@/types';

interface CommentFormProps {
  onSuccess?: () => void;
}

export function CommentForm({ onSuccess }: CommentFormProps) {
  const [message, setMessage] = useState('');
  const [selectedChain, setSelectedChain] = useState<ChainType>('celo');
  
  const { postComment, isPending, isConfirmed, error } = usePostComment(selectedChain);

  const MAX_LENGTH = 280;
  const remainingChars = MAX_LENGTH - message.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || message.length > MAX_LENGTH) {
      return;
    }

    try {
      await postComment(message.trim(), '');
      setMessage('');
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Failed to post comment:', err);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Chain Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose Chain
          </label>
          <ChainSelector
            selectedChain={selectedChain}
            onChainChange={setSelectedChain}
          />
        </div>

        {/* Message Input */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave your mark on the blockchain..."
            rows={4}
            maxLength={MAX_LENGTH}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={isPending}
          />
          <div className="flex justify-between items-center mt-2">
            <span className={`text-sm ${remainingChars < 20 ? 'text-red-500' : 'text-gray-500'}`}>
              {remainingChars} characters remaining
            </span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">
              Failed to post comment. Please try again.
            </p>
          </div>
        )}

        {/* Success Message */}
        {isConfirmed && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-600">
              ✅ Comment posted successfully!
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!message.trim() || isPending || message.length > MAX_LENGTH}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Posting...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Post Onchain</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
