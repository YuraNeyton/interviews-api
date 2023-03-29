import { ObjectMap } from './object-map.interface';

export class ApiResponse<T> {
  data: T;
  metadata?: ObjectMap;
}
