import { defineDb, defineTable, column } from 'astro:db';

export default defineDb({
  tables: {
    moonClicks: defineTable({
      columns: {
        id: column.number({ primaryKey: true, autoIncrement: true }),
        totalClicks: column.number({ default: 0 }),
        lastUpdated: column.date({ default: new Date() })
      }
    })
  }
});



