import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetJwt = createParamDecorator<void, ExecutionContext>((_, ctx): string => {
  const authorization = ctx
    .switchToHttp()
    .getRequest()
    .get('Authorization');

  if (!authorization) {
    throw new BadRequestException();
  }
  const [, token] = authorization.split(' ');

  return token;
});
