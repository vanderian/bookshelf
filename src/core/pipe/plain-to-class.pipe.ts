import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PlainToClassPipe implements PipeTransform<object, object> {
  transform(value: object, { metatype }: ArgumentMetadata): object {
    return plainToClass(metatype, value);
  }
}
