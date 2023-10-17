import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const itineraries = sqliteTable('itineraries', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
});

export type Itinerary = typeof itineraries.$inferSelect;
export type NewItinerary = typeof itineraries.$inferInsert;
