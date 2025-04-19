import { db, heartclicks } from 'astro:db';
import type { HeartClick } from '../../../db/config';
import { rateLimiter } from '../../middleware/rateLimiter';
import type { APIContext } from 'astro';

export async function POST({ request, ...context }: APIContext) {
  // Check rate limit
  const rateLimitResponse = rateLimiter({ request, ...context });
  if (rateLimitResponse) return rateLimitResponse;

  // Verify CSRF token
  const csrfToken = request.headers.get('X-CSRF-Token');
  if (!csrfToken || csrfToken !== context.cookies.get('csrf-token')?.value) {
    return new Response(JSON.stringify({ error: 'Invalid CSRF token' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const result = await (async () => {
      const clickRecord = await db.select().from(heartclicks).limit(1) as HeartClick[];
      
      if (clickRecord.length === 0) {
        await db.insert(heartclicks).values({
          totalClicks: 1,
          lastUpdated: new Date()
        });
        return 1;
      } else {
        const newClicks = clickRecord[0].totalClicks + 1;
        await db.update(heartclicks)
          .set({ 
            totalClicks: newClicks,
            lastUpdated: new Date()
          });
        return newClicks;
      }
    })();

    // Add logging
    console.log(`Heart clicks updated: ${result}`);

    return new Response(JSON.stringify({ clicks: result }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
        'X-RateLimit-Remaining': '29' // Example rate limit header
      }
    });
  } catch (error) {
    // Enhanced error logging
    console.error('Database error:', {
      error,
      timestamp: new Date().toISOString(),
      path: '/api/heart-clicks',
      method: 'POST'
    });

    return new Response(JSON.stringify({ error: 'Failed to update clicks' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}








