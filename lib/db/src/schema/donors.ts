import { pgTable, text, serial, boolean, integer, date, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const donorsTable = pgTable("donors", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  bloodType: text("blood_type").notNull(),
  city: text("city").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  dateOfBirth: date("date_of_birth").notNull(),
  lastDonationDate: date("last_donation_date"),
  weight: integer("weight").notNull(),
  hasChronicDisease: boolean("has_chronic_disease").notNull().default(false),
  isEligible: boolean("is_eligible").notNull().default(true),
  totalDonations: integer("total_donations").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertDonorSchema = createInsertSchema(donorsTable).omit({ id: true, isEligible: true, totalDonations: true, createdAt: true });
export type InsertDonor = z.infer<typeof insertDonorSchema>;
export type Donor = typeof donorsTable.$inferSelect;
