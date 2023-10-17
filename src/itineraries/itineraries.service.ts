import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DB, DbType } from '../db/db.provider';
import { itineraries, Itinerary, NewItinerary } from '../db/schema';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { CreateItineraryDto } from './dto/create-itinerary.dto';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';

@Injectable()
export class ItinerariesService {
  constructor(
    @Inject(DB) private readonly db: DbType,
    private readonly ws: WebsocketGateway,
  ) {}

  async create(
    createItineraryDto: CreateItineraryDto,
  ): Promise<{ id: number }> {
    const newItinerary: NewItinerary = {
      name: createItineraryDto.name,
      fromCity: createItineraryDto.fromCity,
      toCity: createItineraryDto.toCity,
      fromDate: new Date(createItineraryDto.fromDate),
      toDate: new Date(createItineraryDto.toDate),
      transportation: createItineraryDto.transportation,
      hotel: createItineraryDto.hotel,
    };

    const result = await this.db.insert(itineraries).values(newItinerary);

    try {
      this.ws.server.emit('ITINERARY_CREATED', {
        ...newItinerary,
        id: result.lastInsertRowid,
      });
    } catch (e) {
      console.error(e);
    }

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
    const newItinerary: NewItinerary = {
      name: updateItineraryDto.name,
      fromCity: updateItineraryDto.fromCity,
      toCity: updateItineraryDto.toCity,
      fromDate: new Date(updateItineraryDto.fromDate),
      toDate: new Date(updateItineraryDto.toDate),
      transportation: updateItineraryDto.transportation,
      hotel: updateItineraryDto.hotel,
    };

    const result = await this.db
      .update(itineraries)
      .set(newItinerary)
      .where(eq(itineraries.id, id));

    if (result.changes === 0)
      throw new NotFoundException(`Itinerary with id: ${id} not found`);

    try {
      this.ws.server.emit('ITINERARY_UPDATED', {
        ...newItinerary,
        id,
      });
    } catch (e) {
      console.error(e);
    }

    return { id };
  }

  async remove(id: number): Promise<{ id: number }> {
    const result = await this.db
      .delete(itineraries)
      .where(eq(itineraries.id, id));

    if (result.changes === 0)
      throw new NotFoundException(`Itinerary with id: ${id} not found`);

    try {
      this.ws.server.emit('ITINERARY_DELETED', { id });
    } catch (e) {
      console.error(e);
    }

    return { id };
  }
}
