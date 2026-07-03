import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateRequestDto } from './create-request.dto';
import { RequestStatus } from '../enums/status.enum';

export class UpdateRequestDto extends PartialType(CreateRequestDto){

    @IsOptional() //at runtime
    @IsEnum(RequestStatus)
    status?:RequestStatus; //during compilation
}