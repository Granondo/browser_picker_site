import { db, heartclicks } from 'astro:db';

export default async function seed() {
  try {
    await db.insert(heartclicks).values({
      totalClicks: 1000000,
      lastUpdated: new Date()
    });
    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Failed to seed database:', error);
    throw error;
  }
}



