import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class BookQuery {
  @ApiPropertyOptional({
    description:
      'pass an optional search string for looking up books by title, description or author',
  })
  @IsString()
  @IsOptional()
  readonly searchQuery?: string;

  @ApiPropertyOptional({
    description: 'skip number of elements',
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(it => Number(it), { toClassOnly: true })
  readonly offset: number = 0;

  @ApiPropertyOptional({
    description: 'limit number of items per request, default is 100',
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  @Transform(it => Number(it), { toClassOnly: true })
  readonly limit: number = 100;
}
