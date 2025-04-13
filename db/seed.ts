import { db, moonClicks } from 'astro:db';

export default async function seed() {
  await db.insert(moonClicks).values({
    totalClicks: 0,
    lastUpdated: new Date()
  });
}


