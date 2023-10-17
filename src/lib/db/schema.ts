import {
  boolean,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

// -------------------------------------------------
// Users
// -------------------------------------------------
export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).notNull().primaryKey(),
  name: varchar("name", { length: 30 }).notNull().unique(),
  email: varchar("email", { length: 30 }).notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  password: varchar("password", { length: 100 }).notNull(),
  image: text("image"),

  provider: mysqlEnum("providers", ["Credentials", "Google"]).notNull(),

  created_at: timestamp("createdAt").defaultNow(),
  updated_at: timestamp("updatedAt").onUpdateNow(),
});

export type DrizzleUser = typeof users.$inferSelect;
