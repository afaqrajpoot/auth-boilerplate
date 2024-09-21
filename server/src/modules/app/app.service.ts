import { Injectable } from "@nestjs/common";
import { ConfigService } from "../config/config.service";

/**
 * Application Service
 */
@Injectable()
export class AppService {
  /**
   * Constructor
   * @param {ConfigService} config configuration service
   */
  constructor(private config: ConfigService) {}

  /**
   * Fetches and logs the APP_URL environment variable from the configuration file.
   * @returns {string} the application url
   */
  root(): string {
    const appURL = this.config.get("APP_URL");
    return appURL;
  }
}
