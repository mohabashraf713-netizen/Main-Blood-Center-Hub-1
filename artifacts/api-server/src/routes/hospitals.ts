import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { hospitalsTable } from "@workspace/db/schema";
import { ListHospitalsQueryParams } from "@workspace/api-zod";
import { eq, and, sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/hospitals", async (req, res) => {
  const query = ListHospitalsQueryParams.parse(req.query);
  const conditions = [];

  if (query.city) {
    conditions.push(eq(hospitalsTable.city, query.city));
  }

  const hospitals = await db
    .select()
    .from(hospitalsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(hospitalsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  res.json({ hospitals, total: count });
});

export default router;
