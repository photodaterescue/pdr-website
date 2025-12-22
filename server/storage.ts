import { type User, type InsertUser, type InsertSupportSubmission, type SupportSubmission } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createSupportSubmission(submission: InsertSupportSubmission): Promise<SupportSubmission>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private supportSubmissions: Map<string, SupportSubmission>;

  constructor() {
    this.users = new Map();
    this.supportSubmissions = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createSupportSubmission(submission: InsertSupportSubmission): Promise<SupportSubmission> {
    const id = randomUUID();
    const supportSubmission: SupportSubmission = {
      id,
      email: submission.email,
      message: submission.message,
      category: submission.category || "Something else",
      source: submission.source || "web",
      app_version: submission.app_version || null,
      os: submission.os || "unknown",
      page_referrer: submission.page_referrer || null,
      timestamp: new Date(),
    };
    this.supportSubmissions.set(id, supportSubmission);
    return supportSubmission;
  }
}

export const storage = new MemStorage();
