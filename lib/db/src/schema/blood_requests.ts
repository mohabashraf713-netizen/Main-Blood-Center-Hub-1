import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const bloodRequestsTable = pgTable("blood_requests", {
  id: serial("id").primaryKey(),
  patientName: text("patient_name").notNull(),
  bloodType: text("blood_type").notNull(),
  unitsNeeded: integer("units_needed").notNull(),
  hospitalName: text("hospital_name").notNull(),
  city: text("city").notNull(),
  urgency: text("urgency").notNull(),
  status: text("status").notNull().default("active"),
  contactPhone: text("contact_phone").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  fulfilledAt: timestamp("fulfilled_at"),
});

export const insertBloodRequestSchema = createInsertSchema(bloodRequestsTable).omit({ id: true, status: true, createdAt: true, fulfilledAt: true });
export type InsertBloodRequest = z.infer<typeof insertBloodRequestSchema>;
export type BloodRequest = typeof bloodRequestsTable.$inferSelect;
