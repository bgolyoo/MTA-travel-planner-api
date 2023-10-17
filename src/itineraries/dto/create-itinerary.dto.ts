import {
  IsDateString,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateItineraryDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  fromCity: string;

  @IsNotEmpty()
  toCity: string;

  @IsDateString()
  @IsNotEmpty()
  fromDate: Date;

  @IsDateString()
  @IsNotEmpty()
  toDate: Date;

  @IsNotEmpty()
  transportation: string;

  @IsNotEmpty()
  hotel: string;
}
