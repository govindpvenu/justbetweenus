/**
 * End-to-End Encryption Utilities
 *
 * Uses Web Crypto API (built into browsers) - no external dependencies needed!
 * Messages are encrypted client-side before sending to server.
 * Only people with the encryption key can read messages.
 */

/**
 * Generate a random encryption key for a room
 * Returns a base64-encoded string that can be shared via URL
 */
export async function generateRoomKey(): Promise<string> {
  // Generate a 256-bit (32-byte) random key
  const keyBytes = crypto.getRandomValues(new Uint8Array(32));

  // Convert to base64 for easy sharing in URLs
  return btoa(String.fromCharCode(...keyBytes));
}

/**
 * Import a key from base64 string
 */
async function importKey(keyBase64: string): Promise<CryptoKey> {
  // Decode base64 to bytes
  const keyBytes = Uint8Array.from(atob(keyBase64), (c) => c.charCodeAt(0));

  // Import as AES-GCM key (256-bit)
  return crypto.subtle.importKey(
    "raw",
    keyBytes,
    {
      name: "AES-GCM",
      length: 256,
    },
    false, // key is not extractable after import (security)
    ["encrypt", "decrypt"]
  );
}

/**
 * Encrypt a message before sending to server
 * Each message gets a unique random IV (initialization vector) for security
 */
export async function encryptMessage(
  text: string,
  keyBase64: string
): Promise<string> {
  const key = await importKey(keyBase64);

  // Generate random IV (12 bytes) for each message
  // This ensures same message encrypted twice looks different
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // Convert text to bytes
  const textBytes = new TextEncoder().encode(text);

  // Encrypt using AES-GCM (authenticated encryption)
  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
      tagLength: 128, // 128-bit authentication tag
    },
    key,
    textBytes
  );

  // Combine IV + encrypted data, then encode as base64
  // Format: [IV (12 bytes)][Encrypted Data]
  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encrypted), iv.length);

  return btoa(String.fromCharCode(...combined));
}

/**
 * Decrypt a message received from server
 */
export async function decryptMessage(
  encryptedBase64: string,
  keyBase64: string
): Promise<string> {
  try {
    const key = await importKey(keyBase64);

    // Decode from base64
    const combined = Uint8Array.from(atob(encryptedBase64), (c) =>
      c.charCodeAt(0)
    );

    // Extract IV (first 12 bytes) and encrypted data (rest)
    const iv = combined.slice(0, 12);
    const encrypted = combined.slice(12);

    // Decrypt
    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
        tagLength: 128,
      },
      key,
      encrypted
    );

    // Convert bytes back to text
    return new TextDecoder().decode(decrypted);
  } catch {
    throw new Error(
      "Failed to decrypt message. Invalid key or corrupted data."
    );
  }
}

/**
 * Check if a key format is valid (32 bytes when decoded)
 */
export function isValidKeyFormat(keyBase64: string): boolean {
  try {
    const decoded = atob(keyBase64);
    return decoded.length === 32; // 256 bits = 32 bytes
  } catch {
    return false;
  }
}
