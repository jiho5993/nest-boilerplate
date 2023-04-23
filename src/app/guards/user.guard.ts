import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class UserGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // fill code
    // const req = context.switchToHttp().getRequest<IRequestAugmented>();
    // const authorization = req.headers.authorization;
    // if (!authorization) {
    //   throw new ClientRequestException(ERROR_CODE.ERR_002_0001, HttpStatus.BAD_REQUEST);
    // }

    // const token = authorization.replace('Bearer ', '');
    // await jwtVerify(token);

    // const user = req.extras.getUser();
    // if (!user) {
    //   throw new ClientRequestException(ERROR_CODE.ERR_002_0001, HttpStatus.UNAUTHORIZED);
    // }

    // user.isActivated();

    return true;
  }
}
