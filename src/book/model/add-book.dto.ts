import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddBookDto {
  @ApiProperty({
    description: 'a book name',
    example: 'A Book',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'description of the book',
    example: 'a book about a Book',
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    type: [String],
    description: 'list of authors',
    example: ['Foo Bar', 'John Johnson'],
  })
  @IsString({ each: true })
  readonly authors: [string];
}
