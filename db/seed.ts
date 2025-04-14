import { db, heartClicks } from 'astro:db';

export default async function seed() {
  await db.insert(heartClicks).values({
    totalClicks: 1000000,
    lastUpdated: new Date()
  });
}


