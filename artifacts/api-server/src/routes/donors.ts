import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { donorsTable } from "@workspace/db/schema";
import {
  ListDonorsQueryParams,
  RegisterDonorBody,
} from "@workspace/api-zod";
import { eq, and, sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/donors", async (req, res) => {
  const query = ListDonorsQueryParams.parse(req.query);
  const conditions = [];

  if (query.bloodType) {
    conditions.push(eq(donorsTable.bloodType, query.bloodType));
  }
  if (query.city) {
    conditions.push(eq(donorsTable.city, query.city));
  }

  const limit = query.limit ?? 20;
  const offset = query.offset ?? 0;

  const donors = await db
    .select()
    .from(donorsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .limit(limit)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(donorsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  res.json({ donors, total: count });
});

router.post("/donors", async (req, res) => {
  const body = RegisterDonorBody.parse(req.body);

  const isEligible = !body.hasChronicDisease && body.weight >= 50;

  const [donor] = await db
    .insert(donorsTable)
    .values({
      ...body,
      isEligible,
    })
    .returning();

  res.status(201).json(donor);
});

export default router;
