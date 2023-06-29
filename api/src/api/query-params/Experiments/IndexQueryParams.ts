import { IsOptional, IsPositive } from 'class-validator';

export class IndexQueryParams {
  @IsOptional()
  @IsPositive()
  limit?: number;
}
