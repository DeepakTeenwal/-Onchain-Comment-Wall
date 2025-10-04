# 🚀 Complete Setup Guide

This guide will walk you through setting up the Onchain Comment Wall from scratch.

## Prerequisites Checklist

- [ ] Node.js 18+ installed ([Download](https://nodejs.org))
- [ ] Git installed
- [ ] MetaMask or another Web3 wallet
- [ ] Some testnet tokens (we'll get these for free)

## Step 1: Get API Keys

### WalletConnect Project ID (Required)

1. Go to [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Sign up / Log in
3. Click "Create New Project"
4. Name it "Onchain Comment Wall"
5. Copy the **Project ID**

### Neynar API Key (Optional - for Farcaster integration)

1. Go to [neynar.com](https://neynar.com)
2. Sign up with your Farcaster account
3. Create a new app
4. Copy the **Client ID**

## Step 2: Get Testnet Tokens

### Celo Alfajores (Testnet)

1. Go to [faucet.celo.org](https://faucet.celo.org)
2. Enter your wallet address
3. Click "Get Alfajores CELO"
4. Wait ~30 seconds

### Arbitrum Sepolia (Testnet)

1. Go to [faucet.quicknode.com/arbitrum/sepolia](https://faucet.quicknode.com/arbitrum/sepolia)
2. Enter your wallet address
3. Complete captcha
4. Get testnet ETH

## Step 3: Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/onchain-comment-wall.git
cd onchain-comment-wall

# Install dependencies
npm install
```

## Step 4: Configure Environment

```bash
# Copy the example env file
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Get this from your wallet (NEVER share this!)
PRIVATE_KEY=your_private_key_without_0x

# RPC URLs (these free ones work fine)
CELO_RPC_URL=https://alfajores-forno.celo-testnet.org
ARBITRUM_RPC_URL=https://sepolia-rollup.arbitrum.io/rpc

# From WalletConnect dashboard
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# From Neynar (optional)
NEXT_PUBLIC_NEYNAR_CLIENT_ID=your_neynar_id_here

# Leave empty for now (we'll fill after deployment)
NEXT_PUBLIC_CELO_CONTRACT_ADDRESS=
NEXT_PUBLIC_ARBITRUM_CONTRACT_ADDRESS=

# For local development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 🔐 Getting Your Private Key (MetaMask)

1. Open MetaMask
2. Click the three dots → Account Details
3. Click "Show Private Key"
4. Enter your password
5. Copy the key (remove the `0x` prefix)

**⚠️ Security Warning:**
- Never commit this file to GitHub
- Never share your private key
- Only use testnet wallets for development

## Step 5: Compile Contracts

```bash
npm run compile
```

You should see:
```
Compiled 1 Solidity file successfully
```

## Step 6: Deploy to Testnets

### Deploy to Celo Alfajores

```bash
npm run deploy:celo -- --network celoTestnet
```

You'll see output like:
```
🚀 Deploying CommentWall to celoTestnet...
✅ CommentWall deployed to: 0x1234...5678
```

**Copy the contract address!**

### Deploy to Arbitrum Sepolia

```bash
npm run deploy:arbitrum -- --network arbitrumSepolia
```

Copy this address too!

## Step 7: Update Contract Addresses

Edit `.env.local` and add your deployed addresses:

```env
NEXT_PUBLIC_CELO_CONTRACT_ADDRESS=0x1234...5678
NEXT_PUBLIC_ARBITRUM_CONTRACT_ADDRESS=0xabcd...efgh
```

## Step 8: Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

You should see the app! 🎉

## Step 9: Test It Out

1. Click "Connect Wallet"
2. Choose your wallet and connect
3. Switch to Celo Alfajores network in your wallet
4. Type a test message
5. Click "Post Onchain"
6. Confirm the transaction (should cost ~$0.001)
7. Wait a few seconds
8. Your message appears on the wall!

## Troubleshooting

### "Insufficient funds" error
- Make sure you have testnet tokens
- Check you're on the correct network (Celo Alfajores or Arbitrum Sepolia)

### Contract not deployed
- Check your `.env.local` has the correct contract addresses
- Make sure deployment was successful

### Wallet not connecting
- Check your WalletConnect Project ID is correct
- Try refreshing the page
- Make sure your wallet is unlocked

### Transaction failing
- Make sure you have enough testnet tokens for gas
- Check you're on the correct network
- Try increasing gas limit in MetaMask settings

## Next Steps

### Deploy to Mainnet (Production)

Once everything works on testnet:

1. Get real tokens (Celo and ETH for Arbitrum)
2. Deploy to mainnet:
   ```bash
   npm run deploy:celo -- --network celo
   npm run deploy:arbitrum -- --network arbitrum
   ```
3. Update contract addresses in production environment variables
4. Deploy frontend to Vercel

### Deploy Frontend to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add all environment variables from `.env.local`
5. Click Deploy!

## Getting Help

- Check the [README.md](README.md) for more info
- Open an issue on GitHub
- Ask in the Farcaster community

---

**Happy Building! 🧱**
