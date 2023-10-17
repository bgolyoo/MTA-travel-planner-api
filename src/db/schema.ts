import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const itineraries = sqliteTable('itineraries', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  fromCity: text('from_city').notNull(),
  toCity: text('to_city').notNull(),
  fromDate: integer('from_date', { mode: 'timestamp' }).notNull(),
  toDate: integer('to_date', { mode: 'timestamp' }).notNull(),
  transportation: text('transportation').notNull(),
  hotel: text('hotel').notNull(),
});

export type Itinerary = typeof itineraries.$inferSelect;
export type NewItinerary = typeof itineraries.$inferInsert;
