import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const supportSubmissions = pgTable("support_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  message: text("message").notNull(),
  category: text("category").notNull().default("Something else"),
  source: text("source").notNull().default("web"),
  app_version: text("app_version"),
  os: text("os").default("unknown"),
  page_referrer: text("page_referrer"),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSupportSubmissionSchema = createInsertSchema(supportSubmissions).omit({
  id: true,
  timestamp: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertSupportSubmission = z.infer<typeof insertSupportSubmissionSchema>;
export type SupportSubmission = typeof supportSubmissions.$inferSelect;
