import { pgTable, text, serial, boolean, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const hospitalsTable = pgTable("hospitals", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  city: text("city").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  availableBloodTypes: text("available_blood_types").array().notNull().default([]),
  isBloodBank: boolean("is_blood_bank").notNull().default(false),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  operatingHours: text("operating_hours").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertHospitalSchema = createInsertSchema(hospitalsTable).omit({ id: true, createdAt: true });
export type InsertHospital = z.infer<typeof insertHospitalSchema>;
export type Hospital = typeof hospitalsTable.$inferSelect;
