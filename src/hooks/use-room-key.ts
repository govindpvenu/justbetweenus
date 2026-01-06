import { useEffect, useState, useCallback, useRef } from "react";
import { generateRoomKey, isValidKeyFormat } from "@/lib/encryption";

/**
 * Hook to manage encryption key for a room
 * 
 * How it works:
 * 1. Room creator generates a key and puts it in URL fragment (#key=...)
 * 2. URL fragments are NEVER sent to server (only visible in browser)
 * 3. Second person extracts key from URL when joining
 * 4. Key is stored in component state (never sent to server)
 */
export function useRoomKey(roomId: string, isRoomCreator: boolean) {
  const [roomKey, setRoomKey] = useState<string | null>(null);
  const [keyError, setKeyError] = useState<string | null>(null);
  
  // Track the previous roomId to detect room changes
  const prevRoomIdRef = useRef<string | null>(null);

  // Extract key from URL fragment (the part after #)
  const extractKeyFromUrl = useCallback(() => {
    if (typeof window === "undefined") return null;

    // URL fragments (after #) are never sent to server
    const hash = window.location.hash.slice(1); // Remove '#'
    const params = new URLSearchParams(hash);
    const key = params.get("key");

    if (key && isValidKeyFormat(key)) {
      return key;
    }
    return null;
  }, []);

  // Generate new key and update URL
  const generateAndSetKey = useCallback(async () => {
    try {
      const newKey = await generateRoomKey();
      setRoomKey(newKey);

      // Update URL fragment with key (doesn't reload page)
      const url = new URL(window.location.href);
      url.hash = `key=${newKey}`;
      window.history.replaceState({}, "", url.toString());

      return newKey;
    } catch (error) {
      setKeyError("Failed to generate encryption key");
      console.error("Key generation error:", error);
      return null;
    }
  }, []);

  // Reset state when roomId changes (e.g., creating a new room after destroying one)
  useEffect(() => {
    if (prevRoomIdRef.current !== null && prevRoomIdRef.current !== roomId) {
      // Room changed - reset state
      setRoomKey(null);
      setKeyError(null);
    }
    prevRoomIdRef.current = roomId;
  }, [roomId]);

  // Initialize key when component mounts or room changes
  useEffect(() => {
    let isCancelled = false;
    
    const initializeKey = async () => {
      // Small delay to allow browser to update URL hash after client-side navigation
      // This is needed because router.push('/path#hash') may not immediately update window.location.hash
      await new Promise(resolve => setTimeout(resolve, 0));
      
      if (isCancelled) return;

      // First, try to get key from URL (if someone shared link with key)
      const existingKey = extractKeyFromUrl();

      if (existingKey) {
        setRoomKey(existingKey);
        setKeyError(null);
        return;
      }

      // If no key in URL:
      // - Room creator: generate a new key
      // - Joiner: wait for key (should be in shared URL)
      if (isRoomCreator) {
        await generateAndSetKey();
      } else {
        // Second person joining - key should be in URL if link was shared correctly
        setKeyError("Encryption key not found. Make sure you copied the full URL including the key.");
      }
    };

    initializeKey();
    
    return () => {
      isCancelled = true;
    };
  }, [roomId, isRoomCreator, extractKeyFromUrl, generateAndSetKey]);

  return {
    roomKey,
    keyError,
    hasKey: roomKey !== null,
  };
}
