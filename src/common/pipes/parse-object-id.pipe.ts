import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  PipeTransform
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectId implements PipeTransform {
  transform(id: string, metadata: ArgumentMetadata): Types.ObjectId {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException();
    }

    return new Types.ObjectId(id);
  }
}
