import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  PipeTransform
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectId implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): Types.ObjectId {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException();
    }

    return new Types.ObjectId(value);
  }
}
