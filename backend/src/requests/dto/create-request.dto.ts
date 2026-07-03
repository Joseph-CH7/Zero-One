import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Department } from '../enums/department.enum';


export class CreateRequestDto{
  @IsString()
  @IsNotEmpty()
  title!: string; //we use ! because we will assign a value later

  @IsString()
  @IsNotEmpty()
  description!:string;

  @IsEnum(Department)
  department!: Department;

  @IsString()
  @IsNotEmpty()
  requestedBy!: string;

}