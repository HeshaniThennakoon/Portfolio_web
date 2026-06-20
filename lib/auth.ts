import { cookies } from "next/headers";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { getSettings } from "./data";

const COOKIE_NAME = "portfolio_admin_session";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

// Simple helper to sign messages using HMAC-SHA256
function signMessage(message: string) {
  const secret = process.env.ADMIN_JWT_SECRET || "heshani-thennakoon-portfolio-secret-token-key-2026";
  return crypto.createHmac("sha256", secret).update(message).digest("hex");
}

export async function createSession(username: string): Promise<string> {
  const expiresAt = Date.now() + SESSION_DURATION;
  const payload = `${username}.${expiresAt}`;
  const signature = signMessage(payload);
  return `${payload}.${signature}`;
}

export async function verifySession(token: string): Promise<boolean> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const [username, expiresAtStr, signature] = parts;
    const expiresAt = parseInt(expiresAtStr, 10);

    if (Date.now() > expiresAt) return false;

    const payload = `${username}.${expiresAt}`;
    const expectedSignature = signMessage(payload);

    return signature === expectedSignature;
  } catch (error) {
    console.error("Session verification failed:", error);
    return false;
  }
}

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);
  if (!sessionCookie) return false;
  return verifySession(sessionCookie.value);
}
