import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Department } from '../enums/department.enum';
import { RequestStatus } from '../enums/status.enum';

export class FindRequestsQueryDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(Department)
  department?: Department;

  @IsOptional()
  @IsEnum(RequestStatus)
  status?: RequestStatus;

  @IsOptional()
  @IsString()
  requestedBy?: string;
}