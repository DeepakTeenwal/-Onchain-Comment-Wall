# 🧱 Onchain Comment Wall

A cross-chain comment wall built for Farcaster where users can post messages permanently on Celo and Arbitrum blockchains.

## ✨ Features

- 🌱 **Post on Celo** - Ultra-low gas fees
- 🦄 **Post on Arbitrum** - L2 speed with Ethereum security
- ♾️ **Forever Onchain** - Messages stored permanently on blockchain
- 🔄 **Real-time Updates** - See new comments instantly
- 💙 **Like Comments** - Engage with messages
- 🎨 **Beautiful UI** - Modern, responsive design

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A wallet with Celo/Arbitrum tokens for gas fees
- Neynar API key (get from [neynar.com](https://neynar.com))
- WalletConnect Project ID (get from [cloud.walletconnect.com](https://cloud.walletconnect.com))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/onchain-comment-wall.git
cd onchain-comment-wall
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your keys:
```env
PRIVATE_KEY=your_private_key_here
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_NEYNAR_CLIENT_ID=your_neynar_key
```

4. **Compile smart contracts**
```bash
npm run compile
```

5. **Deploy contracts**

Deploy to Celo testnet:
```bash
npm run deploy:celo -- --network celoTestnet
```

Deploy to Arbitrum testnet:
```bash
npm run deploy:arbitrum -- --network arbitrumSepolia
```

6. **Update contract addresses**

After deployment, copy the contract addresses to `.env.local`:
```env
NEXT_PUBLIC_CELO_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_ARBITRUM_CONTRACT_ADDRESS=0x...
```

7. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
onchain-comment-wall/
├── contracts/              # Smart contracts
│   ├── CommentWall.sol    # Main contract
│   └── deploy.js          # Deployment script
├── src/
│   ├── app/               # Next.js app directory
│   ├── components/        # React components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Libraries and configs
│   └── types/             # TypeScript types
├── .env.example           # Environment variables template
├── hardhat.config.js      # Hardhat configuration
├── package.json           # Dependencies
└── README.md             # This file
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run compile` - Compile smart contracts
- `npm run test` - Run contract tests
- `npm run deploy:celo` - Deploy to Celo
- `npm run deploy:arbitrum` - Deploy to Arbitrum

## 🌐 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Smart Contracts (Mainnet)

**Celo Mainnet:**
```bash
npm run deploy:celo -- --network celo
```

**Arbitrum One:**
```bash
npm run deploy:arbitrum -- --network arbitrum
```

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Blockchain:** Solidity, Hardhat
- **Web3:** Wagmi, Viem, RainbowKit
- **Chains:** Celo, Arbitrum

## 📝 Smart Contract

The `CommentWall.sol` contract stores messages onchain with:
- User address
- Message content (max 280 characters)
- Farcaster ID
- Timestamp
- Like count

Key functions:
- `postComment(message, fid)` - Post a new comment
- `likeComment(id)` - Like a comment
- `getRecentComments(count)` - Get recent comments
- `getTotalComments()` - Get total comment count

## 🔐 Security

- Never commit `.env.local` file
- Keep your private keys secure
- Test on testnets before mainnet deployment
- Smart contracts are unaudited - use at your own risk

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built for the Farcaster community
- Powered by Celo and Arbitrum
- Inspired by the need for permanent, cross-chain messaging

## 📞 Support

If you have any questions or run into issues:
- Open an issue on GitHub
- Tag us on Farcaster

---

**Made with ❤️ for Farcaster**
