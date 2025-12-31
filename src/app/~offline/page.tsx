export default function OfflinePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-green-500">You're Offline</h1>
        <p className="text-zinc-500 text-sm">
          This page is not available offline.
        </p>
      </div>
    </main>
  );
}
