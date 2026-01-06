# Just Between Us - Shhh...it's just between us.

> A **modern**, **secure**, and **lightning-fast** real-time chat application built with cutting-edge web technologies. Create private chat rooms that automatically self-destruct after 10 minutes, ensuring your conversations remain ephemeral and secure.

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Elysia.js](https://img.shields.io/badge/Elysia.js-1.4-9d4edd?style=for-the-badge&logo=bun)](https://elysiajs.com/)
[![Redis](https://img.shields.io/badge/Redis-Upstash-red?style=for-the-badge&logo=redis)](https://upstash.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## ✨ Features

### 📡 Real-Time

- **Instant Message Delivery** - Real-time messaging powered by Upstash Realtime
- **Live Updates** - Messages appear instantly without page refresh
- **WebSocket Communication** - Efficient bidirectional communication

### ⚡ Performance

- **Serverless Infrastructure** - Scales automatically with Upstash Redis and Realtime
- **Efficient Real-Time** - WebSocket-based messaging with minimal latency
- **Robust Backend** - Bun-first web framework with exceptional performance.
- **Bun Runtime** - Ultra-fast JavaScript runtime with native TypeScript support, faster startup times, and optimized package management
- **React Compiler** - Automatic memoization and optimization, eliminating manual `useMemo`, `useCallback`, and `React.memo`
- **Turbopack** - Rust-powered bundler from Vercel, up to 700x faster than Webpack for incremental builds

### 🎨 UI/UX

- **Modern Minimal Interface** - Clean, distraction-free design built with Tailwind CSS 4
- **Progressive Web App (PWA)** - Installable app with offline support and service worker caching
- **Intuitive Navigation** - Simple, straightforward user flow
- **Fully Responsive** - Works seamlessly across all devices and screen sizes
- **Enhanced Error Handling** - Clear error messages for room not found, room full, and encryption key issues

### 👨‍💻 Developer Experience

- **End-to-End Type Safety** - Type-safe API calls with Elysia and Eden
- **Runtime Validation** - Zod schemas ensure data integrity at runtime
- **Clean Architecture** - Well-organized codebase with separation of concerns

### 🔐 Security

- **True End-to-End Encryption** - Messages encrypted client-side with AES-256-GCM. Only participants can read messages, even if the server is compromised
- **Secure Key Sharing** - Encryption keys shared via URL fragments (never sent to server)
- **Zero-Knowledge Architecture** - Server never sees encryption keys or plaintext messages
- **Client-Side Key Management** - Encryption keys never leave the browser, stored only in memory
- **Anonymous Identity** - Auto-generated usernames for privacy with regeneration support
- **No Persistent User Data** - No user accounts, tracking, or data collection
- **Room Isolation** - Complete data separation between rooms with token-based authentication
- **Self-Destructing Rooms** - Automatic room expiration after 10 minutes with manual destroy option
- **Automatic Data Expiration** - Rooms and messages auto-delete after expiration
- **Authenticated Encryption** - AES-GCM provides message authentication and tamper detection

## 📊 Project Flow Diagram

Diagram: Just Between Us app architecture, encryption, and real-time flow.

**[🔗 View Interactive Flow Diagram on tldraw](https://www.tldraw.com/f/xl7XIQ3W8BzCjcOixfIwb?d=v-468.-11453.2465.1475.page)**

## 🛠️ Tech Stack

### Frontend

- **Next.js 16.1** - React framework with App Router
- **React 19.2** - Latest React with React Compiler
- **Tailwind CSS 4** - Modern utility-first CSS framework
- **TanStack Query** - Powerful data synchronization for React

### Backend & Infrastructure

- **Elysia** - Fast, type-safe web framework (Bun runtime)
- **Upstash Redis** - Serverless Redis for data persistence
- **Upstash Realtime** - Real-time messaging infrastructure
- **Zod** - TypeScript-first schema validation

### Development Tools

- **TypeScript 5.0** - Type-safe development
- **Turbopack** - Next-generation bundler for fast development
- **ESLint** - Code linting and quality
- **React Compiler** - Automatic React optimization
- **Bun** - Fast JavaScript runtime and package manager
- **Serwist** - Service worker library for PWA functionality and offline support

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ or **Bun** (recommended)
- **Upstash Redis** account (free tier available)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd justbetweenus
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   UPSTASH_REDIS_REST_URL=your_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_redis_token
   ```

4. **Run the development server**

   ```bash
   bun dev
   # or
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 How End-to-End Encryption Works

Just Between Us uses **true end-to-end encryption** to ensure your messages remain private. All encryption happens client-side using the browser's Web Crypto API - no external dependencies required.

### Key Features

- **AES-256-GCM Encryption** - Industry-standard authenticated encryption
- **Zero-Knowledge Architecture** - Server never sees encryption keys or plaintext messages
- **Secure Key Exchange** - Keys shared via URL fragments (never transmitted to server)
- **Unique IV per Message** - Each message uses a random initialization vector for forward secrecy
- **Client-Side Only** - All encryption/decryption happens in your browser

For a detailed explanation of the encryption flow, key generation, message encryption, and security guarantees, see the [End-to-End Encryption Documentation](https://github.com/govindpvenu/justbetweenus/blob/docs/docs/E2EE_EXPLAINED.txt).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

---

**Built with ❤️ using Next.js, React, and modern web technologies**
