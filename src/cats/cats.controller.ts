import {
    Body,
    Controller,
    ForbiddenException,
    Get,
    Header,
    HttpCode,
    Param,
    Post,
    Query,
    Redirect,
    Req,
    UseFilters, UseInterceptors,
} from '@nestjs/common';
import {Request} from 'express';
import {CreateCatDto} from './create-cat.dto';
import {HttpExceptionFilter} from '../http-exception.filter';
import {LoggingInterceptor} from '../interceptor/logging.interceptor';

@UseInterceptors(new LoggingInterceptor())
@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsController) {}
    @Post()
    @HttpCode(204) // 状态码
    @Header('Cache-Control', 'none')
    // create(): string {
    //     return '这个操作是添加一个新的cat';
    // }
    @Get('ab*cd') // 路由通配符
    @Redirect('https://nestjs.com', 301)
    findAll(@Req() request: Request): string {
        return '这个操作是返回所有的cats';
    }

    @Get('docs')
    @Redirect('https://docs.nestjs.com', 302) // 重定向
    getDocs(@Query('version') version) {
        if (version && version === '5') {
            return {url: 'https://docs.nestjs.com/v5'};
        }
    }

    @Get(':id') // 路由参数
    findOne(@Param() params): string {
        console.log(params.id);
        return `这个操作是返回一个${params.id}cat`;
    }

    // @Get(':id')
    // findOne(@Param('id') id): string {
    //     return `这个操作返回#${id}cat`;
    // }

    // Async / await
    // @Get()
    // async findAll(): Promise<any[]> {
    //     return [];
    // }
    // @Post()
    // async create(@Body() createCatDto: CreateCatDto) {
    //     this.catsService.create(createCatDto);
    //     return '这个操作添加新的cat';
    // }
    @Post()
    @UseFilters(new HttpExceptionFilter())
    async create(@Body() createCatDto: CreateCatDto) {
        throw new ForbiddenException();
    }

}
