┌─────────────────────────────────────────────────────────────────────────────┐
│ END-TO-END ENCRYPTION FLOW DIAGRAM │
│ Just Between Us Chat Application │
└─────────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
PHASE 1: ROOM CREATION & KEY GENERATION
═══════════════════════════════════════════════════════════════════════════════

┌─────────────────┐
│ User A (Alice) │
│ Creates Room │
└────────┬────────┘
│
│ 1. Click "CREATE SECURE ROOM"
▼
┌─────────────────────────────────────┐
│ generateRoomKey() │
│ ──────────────────────────────── │
│ 1. crypto.getRandomValues() │
│ → Generate 32 random bytes │
│ → [256-bit encryption key] │
│ │
│ 2. btoa(String.fromCharCode(...)) │
│ → Convert bytes to Base64 │
│ → "aB3dEf9GhIjKlMnOpQrStUvWxYz=="│
└────────┬────────────────────────────┘
│
│ 2. Key stored in URL fragment
▼
┌─────────────────────────────────────┐
│ URL Generated: │
│ /room/abc123#key=aB3dEf9GhIj... │
│ └─┬─┘ └──────┬──────────┘ │
│ Room ID Encryption Key │
│ (URL Fragment) │
│ │
│ ⚠️ KEY POINT: │
│ URL fragments (#...) are NEVER │
│ sent to the server! │
└─────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
PHASE 2: KEY SHARING (OUT-OF-BAND)
═══════════════════════════════════════════════════════════════════════════════

┌─────────────────┐ ┌─────────────────┐
│ User A (Alice) │ │ User B (Bob) │
└────────┬────────┘ └────────┬────────┘
│ │
│ 3. Copy full URL with key │
│ /room/abc123#key=aB3dEf9GhIj... │
│ │
│ 4. Share via secure channel │
│ (Signal, WhatsApp, Email, etc.) │
│ │
└───────────────────────────────────────►
│
│ 5. Opens URL
│
▼
┌────────────────────────────┐
│ useRoomKey Hook │
│ ────────────────────── │
│ 1. Extract from URL: │
│ window.location.hash │
│ → "#key=aB3dEf9GhIj..."│
│ │
│ 2. Parse key: │
│ URLSearchParams │
│ → "aB3dEf9GhIjKlMn..." │
│ │
│ 3. Validate format: │
│ atob(key).length === 32│
│ │
│ 4. Store in React state │
│ (NEVER sent to server) │
└────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
PHASE 3: MESSAGE ENCRYPTION (SENDING)
═══════════════════════════════════════════════════════════════════════════════

┌─────────────────┐
│ User A Types: │
│ "Hello Bob!" │
└────────┬────────┘
│
│ 1. User types message
▼
┌─────────────────────────────────────────────────────────────────┐
│ encryptMessage("Hello Bob!", "aB3dEf9GhIjKlMnOpQrStUvWxYz==") │
│ ──────────────────────────────────────────────────────────── │
│ │
│ Step 1: Import Key │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ importKey(keyBase64) │ │
│ │ 1. atob(keyBase64) │ │
│ │ → Decode Base64 to bytes │ │
│ │ → Uint8Array[32 bytes] │ │
│ │ │ │
│ │ 2. crypto.subtle.importKey() │ │
│ │ → Import as AES-GCM key (256-bit) │ │
│ │ → CryptoKey object │ │
│ └──────────────────────────────────────────────────────────┘ │
│ │
│ Step 2: Generate IV (Initialization Vector) │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ crypto.getRandomValues(new Uint8Array(12)) │ │
│ │ → Random 12-byte IV │ │
│ │ → [0x3A, 0x7F, 0x2C, ...] (unique per message) │ │
│ └──────────────────────────────────────────────────────────┘ │
│ │
│ Step 3: Convert Text to Bytes │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ new TextEncoder().encode("Hello Bob!") │ │
│ │ → Uint8Array[72, 101, 108, 108, 111, ...] │ │
│ └──────────────────────────────────────────────────────────┘ │
│ │
│ Step 4: Encrypt with AES-GCM │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ crypto.subtle.encrypt({ │ │
│ │ name: "AES-GCM", │ │
│ │ iv: [random 12 bytes], │ │
│ │ tagLength: 128 │ │
│ │ }, key, textBytes) │ │
│ │ → Encrypted bytes + authentication tag │ │
│ │ → Uint8Array[encrypted data] │ │
│ └──────────────────────────────────────────────────────────┘ │
│ │
│ Step 5: Combine IV + Encrypted Data │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ Format: [IV (12 bytes)][Encrypted Data] │ │
│ │ │ │
│ │ [0x3A, 0x7F, 0x2C, ...][0x8F, 0x2A, 0x9B, ...] │ │
│ │ └───── IV ──────┘ └──── Encrypted ──────┘ │ │
│ └──────────────────────────────────────────────────────────┘ │
│ │
│ Step 6: Encode to Base64 │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ btoa(String.fromCharCode(...combined)) │ │
│ │ → "Ol8sXy5hYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eg==" │ │
│ └──────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
│
│ 2. Encrypted message sent to server
▼
┌─────────────────────────────────────────────────────────────────┐
│ SERVER (Upstash Redis) │
│ ────────────────────────────────────────────────────────────── │
│ │
│ What Server Sees: │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │ { │ │
│ │ id: "xyz789", │ │
│ │ sender: "red-monkey-abc", │ │
│ │ text: "Ol8sXy5hYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eg==", │ │
│ │ timestamp: 1234567890, │ │
│ │ roomId: "abc123" │ │
│ │ } │ │
│ └────────────────────────────────────────────────────────────┘ │
│ │
│ ❌ Server CANNOT read the message! │
│ ❌ Server does NOT have the encryption key! │
│ ✅ Server only stores encrypted Base64 string │
└─────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
PHASE 4: MESSAGE DECRYPTION (RECEIVING)
═══════════════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────┐
│ User B receives encrypted message from server │
│ ──────────────────────────────────────────────────────────── │
│ │
│ Encrypted: "Ol8sXy5hYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eg==" │
└────────┬────────────────────────────────────────────────────────┘
│
│ 1. Receive encrypted message
▼
┌─────────────────────────────────────────────────────────────────┐
│ decryptMessage(encryptedBase64, "aB3dEf9GhIjKlMnOpQrStUvWxYz==")│
│ ──────────────────────────────────────────────────────────── │
│ │
│ Step 1: Import Key (same as encryption) │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ importKey(keyBase64) │ │
│ │ → CryptoKey object │ │
│ └──────────────────────────────────────────────────────────┘ │
│ │
│ Step 2: Decode Base64 │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ atob("Ol8sXy5hYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eg==") │ │
│ │ → Uint8Array[combined data] │ │
│ └──────────────────────────────────────────────────────────┘ │
│ │
│ Step 3: Extract IV and Encrypted Data │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ combined.slice(0, 12) → IV │ │
│ │ combined.slice(12) → Encrypted Data │ │
│ │ │ │
│ │ [0x3A, 0x7F, 0x2C, ...][0x8F, 0x2A, 0x9B, ...] │ │
│ │ └───── IV ──────┘ └──── Encrypted ──────┘ │ │
│ └──────────────────────────────────────────────────────────┘ │
│ │
│ Step 4: Decrypt with AES-GCM │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ crypto.subtle.decrypt({ │ │
│ │ name: "AES-GCM", │ │
│ │ iv: [extracted IV], │ │
│ │ tagLength: 128 │ │
│ │ }, key, encrypted) │ │
│ │ → Decrypted bytes │ │
│ │ → Uint8Array[72, 101, 108, 108, 111, ...] │ │
│ └──────────────────────────────────────────────────────────┘ │
│ │
│ Step 5: Convert Bytes to Text │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ new TextDecoder().decode(decrypted) │ │
│ │ → "Hello Bob!" │ │
│ └──────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
│
│ 2. Display decrypted message
▼
┌─────────────────┐
│ User B Sees: │
│ "Hello Bob!" │
└─────────────────┘

═══════════════════════════════════════════════════════════════════════════════
SECURITY GUARANTEES
═══════════════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────────┐
│ ✅ END-TO-END ENCRYPTION │
│ • Messages encrypted before leaving client │
│ • Server only sees encrypted Base64 strings │
│ • Server cannot decrypt without the key │
│ │
│ ✅ ZERO-KNOWLEDGE ARCHITECTURE │
│ • Encryption keys stored in URL fragments (#key=...) │
│ • URL fragments NEVER sent to server │
│ • Keys only exist in browser memory │
│ │
│ ✅ FORWARD SECRECY │
│ • Each message uses unique random IV │
│ • Same message encrypted twice = different ciphertext │
│ │
│ ✅ AUTHENTICATED ENCRYPTION │
│ • AES-GCM provides message authentication │
│ • Detects tampering or corruption │
│ │
│ ✅ NO EXTERNAL DEPENDENCIES │
│ • Uses browser Web Crypto API │
│ • No third-party libraries │
└─────────────────────────────────────────────────────────────────────────────┘
