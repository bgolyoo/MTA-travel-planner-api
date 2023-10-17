import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DB, DbType } from '../db/db.provider';
import { itineraries, Itinerary } from '../db/schema';
import { CreateItineraryDto } from './dto/create-itinerary.dto';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';

@Injectable()
export class ItinerariesService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async create(
    createItineraryDto: CreateItineraryDto,
  ): Promise<{ id: number }> {
    const result = await this.db.insert(itineraries).values({
      name: createItineraryDto.name,
      fromCity: createItineraryDto.fromCity,
      toCity: createItineraryDto.toCity,
      fromDate: new Date(createItineraryDto.fromDate),
      toDate: new Date(createItineraryDto.toDate),
      transportation: createItineraryDto.transportation,
      hotel: createItineraryDto.hotel,
    });

    return { id: result.lastInsertRowid as number };
  }

  async findAll(): Promise<Itinerary[]> {
    return this.db.select().from(itineraries);
  }

  async findOne(id: number): Promise<Itinerary> {
    const result = await this.db
      .select()
      .from(itineraries)
      .where(eq(itineraries.id, id));

    if (result.length === 0)
      throw new NotFoundException(`Itinerary with id: ${id} not found`);

    return result[0];
  }

  async update(
    id: number,
    updateItineraryDto: UpdateItineraryDto,
  ): Promise<{ id: number }> {
    const result = await this.db
      .update(itineraries)
      .set({
        name: updateItineraryDto.name,
        fromCity: updateItineraryDto.fromCity,
        toCity: updateItineraryDto.toCity,
        fromDate: new Date(updateItineraryDto.fromDate),
        toDate: new Date(updateItineraryDto.toDate),
        transportation: updateItineraryDto.transportation,
        hotel: updateItineraryDto.hotel,
      })
      .where(eq(itineraries.id, id));

    if (result.changes === 0)
      throw new NotFoundException(`Itinerary with id: ${id} not found`);

    return { id: result.lastInsertRowid as number };
  }

  async remove(id: number): Promise<{ id: number }> {
    const result = await this.db
      .delete(itineraries)
      .where(eq(itineraries.id, id));

    if (result.changes === 0)
      throw new NotFoundException(`Itinerary with id: ${id} not found`);

    return { id: result.lastInsertRowid as number };
  }
}
