import {Injectable} from "@nestjs/common";
import { createClient } from "@deepgram/sdk";
import * as process from "process";
import {Buffer} from "buffer";
import * as fs from 'fs';

@Injectable()
export class SttService {
    private readonly deepgramClient;

    constructor() {
        this.deepgramClient = createClient(process.env.DEEPGRAM_API_KEY);
    }

    async transcribeAudio(fileBuffer: Buffer): Promise<string> {
        try {
            const options = {
                model: 'general',
                tier: 'enhanced',
                version: 'beta',
                language: 'ko',
                smart_format: true,
                diarize: true,
            };
    
            const { result, error } = await this.deepgramClient.listen.prerecorded.transcribeFile(fileBuffer, options);
    
            if (error) {
                throw new Error(`에러: ${error.message}`);
            }
    
            return result?.results.channels[0].alternatives[0].transcript;
        } catch (error) {
            console.log(`에러: ${error}`);
            throw error;
        }
    }
    

}