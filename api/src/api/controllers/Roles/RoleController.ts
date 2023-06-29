import { Request, Response } from 'express';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { Get, JsonController, Req, Res, UseBefore } from 'routing-controllers';
import { Service } from 'typedi';
import { AuthCheck } from '@base/infrastructure/middlewares/Auth/AuthCheck';

@Service()
@JsonController('/roles')
export class RoleController extends ControllerBase {
  public constructor() {
    super();
  }

  /**
   * Get an index of roles available
   * @param request
   * @param response
   * @returns
   */
  @Get()
  @UseBefore(AuthCheck)
  public index(@Req() request: Request, @Res() response: Response) {
    return response.status(200).send('Roles go here.');
  }
}
