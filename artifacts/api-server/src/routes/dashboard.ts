import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { donorsTable, bloodRequestsTable, hospitalsTable } from "@workspace/db/schema";
import { GetEmergencyFeedQueryParams } from "@workspace/api-zod";
import { eq, and, sql, desc, gte } from "drizzle-orm";

const router: IRouter = Router();

router.get("/dashboard/stats", async (_req, res) => {
  const [donorsCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(donorsTable);

  const [{ totalDonations }] = await db
    .select({ totalDonations: sql<number>`coalesce(sum(total_donations), 0)::int` })
    .from(donorsTable);

  const [activeRequests] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(bloodRequestsTable)
    .where(eq(bloodRequestsTable.status, "active"));

  const [hospitalsCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(hospitalsTable);

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const [donationsThisMonth] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(donorsTable)
    .where(gte(donorsTable.createdAt, oneMonthAgo));

  const bloodTypeBreakdown = await db
    .select({
      bloodType: donorsTable.bloodType,
      count: sql<number>`count(*)::int`,
    })
    .from(donorsTable)
    .groupBy(donorsTable.bloodType);

  res.json({
    totalDonors: donorsCount.count,
    totalDonations: totalDonations,
    activeRequests: activeRequests.count,
    partnerHospitals: hospitalsCount.count,
    livesSaved: Math.floor(totalDonations * 3),
    donationsThisMonth: donationsThisMonth.count,
    bloodTypeBreakdown,
  });
});

router.get("/dashboard/emergency-feed", async (req, res) => {
  const query = GetEmergencyFeedQueryParams.parse(req.query);
  const conditions = [eq(bloodRequestsTable.status, "active")];

  if (query.city) {
    conditions.push(eq(bloodRequestsTable.city, query.city));
  }

  const limit = query.limit ?? 10;

  const requests = await db
    .select()
    .from(bloodRequestsTable)
    .where(and(...conditions))
    .orderBy(desc(bloodRequestsTable.createdAt))
    .limit(limit);

  const now = new Date();
  const emergencies = requests.map((r) => ({
    id: r.id,
    patientName: r.patientName,
    bloodType: r.bloodType,
    unitsNeeded: r.unitsNeeded,
    hospitalName: r.hospitalName,
    city: r.city,
    urgency: r.urgency,
    contactPhone: r.contactPhone,
    minutesAgo: Math.floor((now.getTime() - new Date(r.createdAt).getTime()) / 60000),
    status: r.status,
  }));

  res.json({ emergencies });
});

export default router;
