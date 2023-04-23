import { IRequestExtraData, JwtUserPayload } from '../app.interface';

export class RequestExtras {
  private readonly payload?: JwtUserPayload;
  // private readonly user?: UserEntity;

  constructor(data: IRequestExtraData) {
    this.payload = data.payload;
    // this.user = data.user;
  }

  // getUser(): UserEntity {
  //   if (!this.user) {
  //     throw new ClientRequestException(ERROR_CODE.ERR_002_0001, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  //   return this.user;
  // }

  getPayload(): JwtUserPayload | undefined {
    return this.payload;
  }
}
