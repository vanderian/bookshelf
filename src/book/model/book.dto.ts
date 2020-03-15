import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class BookDto {
  @ApiProperty({
    description: 'a book name',
    example: 'A Book',
  })
  @IsString()
  @IsNotEmpty()
  @Expose()
  readonly title: string;

  @ApiProperty({
    description: 'description of the book',
    example: 'a book about a Book',
  })
  @IsString()
  @Expose()
  readonly description: string;

  @ApiProperty({
    type: [String],
    description: 'list of authors',
    example: ['Foo Bar', 'John Johnson'],
  })
  @IsString({ each: true })
  @Expose()
  @Type(() => String)
  readonly authors: [string];

  public getIdQuery(): object {
    return { title: this.title };
  }
}
