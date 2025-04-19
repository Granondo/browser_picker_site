import { defineDb, defineTable, column } from 'astro:db';

export interface HeartClick {
  id: number;
  totalClicks: number;
  lastUpdated: Date;
}

export const heartclicks = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    totalClicks: column.number({ default: 0 }),
    lastUpdated: column.date({ default: new Date() })
  }
});

export default defineDb({
  tables: { heartclicks },
});



