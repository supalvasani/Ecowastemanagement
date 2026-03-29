import {
	boolean,
	integer,
	numeric,
	pgEnum,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["customer", "admin"]);
export const orderTypeEnum = pgEnum("order_type", ["residential", "business", "enterprise"]);
export const orderStatusEnum = pgEnum("order_status", [
	"pending",
	"confirmed",
	"in_progress",
	"completed",
	"cancelled",
]);

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	fullName: varchar("full_name", { length: 120 }).notNull(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	phone: varchar("phone", { length: 20 }),
	subscriptionId: varchar("subscription_id", { length: 100 }),
	passwordHash: text("password_hash").notNull(),
	role: userRoleEnum("role").default("customer").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const orders = pgTable("orders", {
	id: serial("id").primaryKey(),
	userId: integer("user_id")
		.references(() => users.id, { onDelete: "set null" }),
	orderType: orderTypeEnum("order_type").notNull(),
	serviceName: varchar("service_name", { length: 150 }).notNull(),
	address: text("address"),
	notes: text("notes"),
	amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
	status: orderStatusEnum("status").default("pending").notNull(),
	scheduledFor: timestamp("scheduled_for", { withTimezone: true }),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
