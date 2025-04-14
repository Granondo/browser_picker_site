// // script.js
import { db, heartClicks } from 'astro:db';

export async function POST() {
  try {
    // Get the current clicks record (should only be one)
    let clickRecord = await db.select().from(heartClicks).limit(1);
    
    if (clickRecord.length === 0) {
      // If no record exists, create initial record
      await db.insert(heartClicks).values({
        totalClicks: 1,
        lastUpdated: new Date()
      });
      return new Response(JSON.stringify({ clicks: 1 }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      // Update existing record
      const newClicks = clickRecord[0].totalClicks + 1;
      await db.update(heartClicks)
        .set({ 
          totalClicks: newClicks,
          lastUpdated: new Date()
        });
      
      return new Response(JSON.stringify({ clicks: newClicks }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update clicks' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

