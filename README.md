# 🚀 Just Between Us - Real-Time Self-Destructing Chat Rooms

> A **modern**, **secure**, and **lightning-fast** real-time chat application built with cutting-edge web technologies. Create private chat rooms that automatically self-destruct after 10 minutes, ensuring your conversations remain ephemeral and secure.

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Redis](https://img.shields.io/badge/Redis-Upstash-red?style=for-the-badge&logo=redis)](https://upstash.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## ✨ Features

- ⚡ **Real-Time Messaging** - Instant message delivery powered by Upstash Realtime
- 🔒 **Secure & Private** - End-to-end room isolation with secure token-based authentication
- 💣 **Self-Destructing Rooms** - Automatic room expiration after 10 minutes
- 🎨 **Modern UI/UX** - Beautiful, responsive interface built with Tailwind CSS 4
- 🚀 **Lightning Fast** - Optimized performance with React 19 and Next.js 16
- 📱 **Fully Responsive** - Works seamlessly across all devices
- 🔐 **Anonymous Identity** - Auto-generated usernames for privacy
- ⏱️ **Live Countdown** - Real-time TTL display for room expiration
- 🎯 **Type-Safe** - Full TypeScript coverage with Zod validation

## 🛠️ Tech Stack

### Frontend

- **Next.js 16.1** - React framework with App Router
- **React 19.2** - Latest React with React Compiler
- **TypeScript 5.0** - Type-safe development
- **Tailwind CSS 4** - Modern utility-first CSS framework
- **TanStack Query** - Powerful data synchronization for React
- **Date-fns** - Modern date utility library

### Backend & Infrastructure

- **Elysia** - Fast, type-safe web framework (Bun runtime)
- **Upstash Redis** - Serverless Redis for data persistence
- **Upstash Realtime** - Real-time messaging infrastructure
- **Zod** - TypeScript-first schema validation
- **Nanoid** - Secure, URL-friendly unique ID generation

### Development Tools

- **ESLint** - Code linting and quality
- **React Compiler** - Automatic React optimization
- **Bun** - Fast JavaScript runtime and package manager

## 🏗️ Architecture

```
┌─────────────────┐
│   Next.js App   │
│   (Frontend)    │
└────────┬────────┘
         │
         │ HTTP/WebSocket
         │
┌────────▼────────┐
│  Elysia API     │
│  (Backend)      │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼──────┐
│ Redis │ │ Realtime│
│(Data) │ │(Events) │
└───────┘ └─────────┘
```

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

## 📖 Usage

1. **Create a Room** - Click "CREATE SECURE ROOM" on the homepage
2. **Share the Link** - Copy and share the room URL with others
3. **Chat Securely** - Messages are delivered in real-time
4. **Auto-Destruct** - Room automatically expires after 10 minutes
5. **Manual Destroy** - Click "DESTROY NOW" to instantly delete the room

## 🎯 Key Highlights

- **Performance Optimized** - Built with React 19's compiler and Next.js 16's latest optimizations
- **Scalable Architecture** - Serverless Redis and Realtime infrastructure scales automatically
- **Type Safety** - End-to-end TypeScript with runtime validation via Zod
- **Modern Stack** - Uses the latest stable versions of all frameworks
- **Production Ready** - Clean code architecture with proper error handling

## 📝 Project Structure

```
justbetweenus/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── api/          # API routes (Elysia)
│   │   ├── room/         # Chat room pages
│   │   └── page.tsx      # Homepage
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utilities and clients
├── public/              # Static assets
└── package.json         # Dependencies
```

## 🔐 Security Features

- Token-based room authentication
- Room isolation and data separation
- Automatic data expiration
- No persistent user data storage
- Anonymous identity system

## 🚧 Development

```bash
# Development server
bun dev

# Build for production
bun build

# Start production server
bun start

# Lint code
bun lint
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

---

**Built with ❤️ using Next.js, React, and modern web technologies**
