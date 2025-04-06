import {BadRequestException, Controller, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {SttService} from "./stt.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {memoryStorage} from 'multer';

@Controller('stt')
export class SttController {
    constructor(private readonly sttService: SttService) {
    }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: memoryStorage(),
        }),
    )
    async transcribe(@UploadedFile() file: Express.Multer.File) {
        if (!file) throw new BadRequestException('파일 업로드 안됨');

        try {
            const transcript = await this.sttService.transcribeAudio(file.path);
            return transcript;
        } catch (error) {
            throw new BadRequestException(`오류 발생: ${error.message}`)
        }
    }

}