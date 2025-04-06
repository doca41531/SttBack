import { Module } from '@nestjs/common';
import {SttController} from "./stt.controller";

@Module({
    imports: [],
    controllers: [SttController],
    providers: [],
})
export class AppModule {}
