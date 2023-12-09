import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsLatitude, IsLongitude } from 'class-validator';

export interface ICoordinate {
  longitude: number;
  latitude: number;
}

export class CoordinateDto implements ICoordinate {
  @ApiProperty({ example: '7.45574331' })
  @IsLongitude()
  @Transform(({ value }) => parseFloat(value))
  longitude: number;

  @ApiProperty({ example: '7.45574331' })
  @IsLatitude()
  @Transform(({ value }) => parseFloat(value))
  latitude: number;
}
