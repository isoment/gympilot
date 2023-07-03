import { Request, Response } from 'express';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { Get, JsonController, QueryParams, Req, Res } from 'routing-controllers';
import { Service } from 'typedi';
import { IndexQueryParams } from '@base/api/query-params/Experiments/IndexQueryParams';

@Service()
@JsonController('/experiments')
export class ExperimentController extends ControllerBase {
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
  public index(@QueryParams() query: IndexQueryParams, @Req() request: Request, @Res() response: Response) {
    let isLimited = query.limit ? query.limit : 'No limit';

    return response.status(200).send({ limit: isLimited });
  }
}
