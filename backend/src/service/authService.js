import { eq } from "drizzle-orm";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function toUserResponse(record) {
  return {
    id: record.id,
    fullName: record.fullName,
    email: record.email,
    role: record.role,
    subscriptionId: record.subscriptionId || null,
  };
}

function signToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is required");
  }

  return jwt.sign(
    {
      email: user.email,
      role: user.role,
    },
    secret,
    {
      subject: String(user.id),
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
}

export async function registerUser({ fullName, email, password, phone, subscriptionId }) {
  if (!fullName || !email || !password) {
    throw new Error("fullName, email and password are required");
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, normalizedEmail))
    .limit(1);

  if (existing.length > 0) {
    return { error: "User already exists with this email", statusCode: 409 };
  }

  const created = await db
    .insert(users)
    .values({
      fullName: fullName.trim(),
      email: normalizedEmail,
      phone: phone?.trim() || null,
      subscriptionId: subscriptionId?.trim() || null,
      passwordHash: hashPassword(password),
    })
    .returning({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      role: users.role,
      subscriptionId: users.subscriptionId,
    });

  const user = toUserResponse(created[0]);
  const token = signToken(user);

  return { user, token };
}

export async function loginUser({ email, password }) {
  if (!email || !password) {
    throw new Error("email and password are required");
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, normalizedEmail))
    .limit(1);

  if (existing.length === 0) {
    return { error: "Invalid credentials", statusCode: 401 };
  }

  const userRecord = existing[0];
  if (userRecord.passwordHash !== hashPassword(password)) {
    return { error: "Invalid credentials", statusCode: 401 };
  }

  const user = toUserResponse(userRecord);
  const token = signToken(user);

  return { user, token };
}
