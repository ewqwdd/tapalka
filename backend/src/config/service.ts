import { config, DotenvParseOutput } from 'dotenv';
import { IConfigService } from "./config.interface.dev";


// const some = DotenvParseOutput;

// console.log(some);


export class ConfigService implements IConfigService {
    private config: DotenvParseOutput;

    constructor() {
        const { error, parsed } = config();

        if (error) {
            throw new Error("Some errors raised while reading .env file");
        }

        if (!parsed) {
            throw new Error("Empty .env file");

        }

    }

    get(key: string): string {
        const result = this.config[key];
        if (!result) {
            throw new Error("The key: " + key + " not found in the .env file");
        }
        return result;
    }
}