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

// -------------------------------------------------
// Link
// -------------------------------------------------
export const links = mysqlTable("links", {
  id: varchar("id", { length: 36 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 36 })
    .notNull()
    .references(() => users.id),
  key: varchar("key", { length: 6 }).notNull().unique(),
  url: text("url").notNull(),

  created_at: timestamp("createdAt").defaultNow(),
  updated_at: timestamp("updatedAt").onUpdateNow(),
});

export type DrizzleLink = typeof links.$inferSelect;

// -------------------------------------------------
// Log
// -------------------------------------------------
export const logs = mysqlTable("logs", {
  id: varchar("id", { length: 36 }).notNull().primaryKey(),
  linkId: varchar("linkId", { length: 36 })
    .notNull()
    .references(() => links.id),
  city: varchar("city", { length: 50 }).notNull(),
  country: varchar("country", { length: 2 }).notNull(),
  region: varchar("region", { length: 10 }).notNull(),
  latitude: varchar("latitude", { length: 10 }).notNull(),
  longitude: varchar("longitude", { length: 10 }).notNull(),

  // UA
  browser: varchar("browser", { length: 20 }).notNull(),
  os: varchar("os", { length: 20 }).notNull(),

  created_at: timestamp("createdAt").defaultNow(),
  updated_at: timestamp("updatedAt").onUpdateNow(),
});
export type DrizzleLog = typeof logs.$inferSelect;
