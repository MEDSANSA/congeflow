import { Body, Controller, Post, Req, UseGuards, Get, Param, Delete, Patch } from '@nestjs/common';
import { CongeService } from './conges.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/auth.interface';
import { CongeDto } from './Dto/conges.dto';


@UseGuards(JwtAuthGuard)
@Controller('conge')
export class CongeController {
    constructor(private readonly congesService: CongeService) { }

    @Post()
    async addConge(@Body() congeDto: CongeDto, @Req() request: AuthenticatedRequest) {
        if (request) {
            console.log(request);
        }
        const userId = request.user.id;

        const newConge = await this.congesService.addConge(congeDto, userId);
        return newConge;
    }

    @Get()
    async getAllConges() {
        const conges = await this.congesService.getAllConges();
        return conges;
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        const conge = await this.congesService.getById(id);
        return conge;
    }

    @Get('/user/:userId')
    async getByUserId(@Param('userId') userId: string) {
        const conges = await this.congesService.getByUserId(userId);
        return conges;
    }

    @Delete(':id')
    async deleteConge(@Param('id') id: string) {
        const conge = await this.congesService.deleteConge(id);
        return conge;
    }

    @Patch(':id')
    async updateConge(@Param('id') id: string, @Body() congeDto: CongeDto): Promise<any> {
        await this.congesService.updateConge(id, congeDto);
    }

}
