// Use Web Crypto API for browser-compatible hashing
async function getHashBuffer(message: string, salt: Uint8Array): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  
  // Combine salt and message
  const combinedBuffer = new Uint8Array(salt.length + data.length);
  combinedBuffer.set(salt);
  combinedBuffer.set(data, salt.length);
  
  return await crypto.subtle.digest('SHA-256', combinedBuffer);
}

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hashBuffer = await getHashBuffer(password, salt);
  const hashHex = bufferToHex(hashBuffer);
  const saltHex = bufferToHex(salt);
  return `${saltHex}:${hashHex}`;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const [saltHex, hash] = storedHash.split(':');
  const salt = new Uint8Array(saltHex.match(/.{2}/g)!.map(byte => parseInt(byte, 16)));
  const hashBuffer = await getHashBuffer(password, salt);
  const hashHex = bufferToHex(hashBuffer);
  return hash === hashHex;
}