'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { MessageSquare } from 'lucide-react';
import { CommentForm } from '@/components/CommentForm';
import { CommentWall } from '@/components/CommentWall';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Onchain Comment Wall</h1>
                <p className="text-xs text-gray-600">Leave your mark on the blockchain</p>
              </div>
            </div>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isConnected ? (
          // Not Connected State
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to the Onchain Comment Wall
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Post messages permanently on Celo or Arbitrum. Your words, forever onchain.
            </p>
            <div className="flex flex-col items-center gap-4">
              <ConnectButton />
              <p className="text-sm text-gray-500">
                Connect your wallet to start posting
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="text-3xl mb-3">🌱</div>
                <h3 className="font-semibold text-gray-900 mb-2">Post on Celo</h3>
                <p className="text-sm text-gray-600">Ultra-low gas fees, fast confirmation</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="text-3xl mb-3">🦄</div>
                <h3 className="font-semibold text-gray-900 mb-2">Post on Arbitrum</h3>
                <p className="text-sm text-gray-600">L2 speed with Ethereum security</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="text-3xl mb-3">♾️</div>
                <h3 className="font-semibold text-gray-900 mb-2">Forever Onchain</h3>
                <p className="text-sm text-gray-600">Your messages live permanently</p>
              </div>
            </div>
          </div>
        ) : (
          // Connected State
          <div className="space-y-8">
            {/* Post Form */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Post a Message</h2>
              <CommentForm />
            </section>

            {/* Comments Wall */}
            <section>
              <CommentWall />
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>Built for Farcaster • Powered by Celo & Arbitrum</p>
            <p className="mt-2">
              <a href="https://github.com/yourusername/onchain-comment-wall" 
                 className="text-blue-600 hover:underline"
                 target="_blank"
                 rel="noopener noreferrer">
                View on GitHub
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
