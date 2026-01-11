import CryptoJS from 'crypto-js'

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY

// For build time, return mock functions if env var is missing
if (!ENCRYPTION_KEY && process.env.NODE_ENV === 'production') {
  console.warn('ENCRYPTION_KEY environment variable is missing')
}

export function encrypt(text: string): string {
  if (!ENCRYPTION_KEY) {
    // Return mock for build time
    return 'mock-encrypted-' + text
  }
  if (ENCRYPTION_KEY.length !== 32) {
    throw new Error('ENCRYPTION_KEY must be exactly 32 characters long')
  }
  return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString()
}

export function decrypt(ciphertext: string): string {
  if (!ENCRYPTION_KEY) {
    // Return mock for build time
    return ciphertext.replace('mock-encrypted-', '')
  }
  const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY)
  return bytes.toString(CryptoJS.enc.Utf8)
}

export function hash(text: string): string {
  return CryptoJS.SHA256(text).toString()
}

// For API keys - we store the hash, not the actual key
export function hashApiKey(apiKey: string): string {
  return hash(apiKey)
}

export function getApiKeyPrefix(apiKey: string): string {
  return apiKey.substring(0, 8)
}