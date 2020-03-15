import {
  ArgumentMetadata,
  ConflictException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { BookDto } from '../../book/model/book.dto';
import { Book } from '../../book/model/book.model';
import { BOOK_MODEL } from '../../book/model/book.schema';

@Injectable()
export class CheckBookExistsPipe
  implements PipeTransform<object, Promise<object>> {
  constructor(@InjectModel(BOOK_MODEL) private bookModel: Model<Book>) {}

  async transform(value: object, _: ArgumentMetadata): Promise<object> {
    const dto = plainToClass(BookDto, value);
    if (await this.bookModel.exists(dto.getIdQuery())) {
      throw new ConflictException(`Book already exists`);
    }
    return value;
  }
}
