import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateItineraryDto } from './dto/create-itinerary.dto';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';
import { ItinerariesService } from './itineraries.service';

@Controller('itineraries')
export class ItinerariesController {
  constructor(private readonly itinerariesService: ItinerariesService) {}

  @Post()
  create(@Body() createItineraryDto: CreateItineraryDto) {
    return this.itinerariesService.create(createItineraryDto);
  }

  @Get()
  findAll() {
    return this.itinerariesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itinerariesService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateItineraryDto: UpdateItineraryDto,
  ) {
    return await this.itinerariesService.update(+id, updateItineraryDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.itinerariesService.remove(+id);
  }
}
