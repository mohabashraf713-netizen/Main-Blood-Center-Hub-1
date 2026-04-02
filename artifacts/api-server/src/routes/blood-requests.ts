import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { bloodRequestsTable } from "@workspace/db/schema";
import {
  ListBloodRequestsQueryParams,
  CreateBloodRequestBody,
} from "@workspace/api-zod";
import { eq, and, sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/blood-requests", async (req, res) => {
  const query = ListBloodRequestsQueryParams.parse(req.query);
  const conditions = [];

  if (query.urgency) {
    conditions.push(eq(bloodRequestsTable.urgency, query.urgency));
  }
  if (query.bloodType) {
    conditions.push(eq(bloodRequestsTable.bloodType, query.bloodType));
  }
  if (query.status) {
    conditions.push(eq(bloodRequestsTable.status, query.status));
  }
  if (query.city) {
    conditions.push(eq(bloodRequestsTable.city, query.city));
  }

  const requests = await db
    .select()
    .from(bloodRequestsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(bloodRequestsTable.createdAt);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(bloodRequestsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  res.json({ requests, total: count });
});

router.post("/blood-requests", async (req, res) => {
  const body = CreateBloodRequestBody.parse(req.body);

  const [request] = await db
    .insert(bloodRequestsTable)
    .values({ ...body })
    .returning();

  res.status(201).json(request);
});

export default router;
