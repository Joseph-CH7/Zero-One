import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { FindRequestsQueryDto } from './dto/find-requests-query.dto';



@Injectable()
export class RequestsService {
    
    constructor (private readonly prisma:PrismaService){}

    findAll(query:FindRequestsQueryDto) {
    return this.prisma.serviceRequest.findMany({
        where:{
            title:query.title?{
                contains:query.title,
                mode:'insensitive'
                }
                :undefined,
            department:query.department,
            status:query.status,
            requestedBy:query.requestedBy?{
                contains:query.requestedBy,
                mode:'insensitive'
            }
            :undefined
        }
    });
    }


    async findOne(id:number){
            const result=await this.prisma.serviceRequest.findUnique(
                {where:{id:id}}
            );

            if (!result){
                throw new NotFoundException(`Service request with id ${id} not found`)
            }

            return result;
        }

    create(createRequestDto: CreateRequestDto){
            return this.prisma.serviceRequest.create({
                data:createRequestDto
            });
        }

    async update(id: number, updateRequestDto: UpdateRequestDto) {
    await this.findOne(id); //checks if user exists if not will throw error

    return this.prisma.serviceRequest.update({
      where: { id },
      data: updateRequestDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); 

    return this.prisma.serviceRequest.delete({
      where: { id },
    });
  }
}
