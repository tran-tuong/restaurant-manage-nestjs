import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../user/enitites/user.entity';


export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext):Promise<User> => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);