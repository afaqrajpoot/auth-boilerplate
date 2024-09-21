import { NestFactory } from "@nestjs/core";
import {
  ExpressAdapter,
  NestExpressApplication,
} from "@nestjs/platform-express";
import helmet from "helmet"; // Use helmet with Express
import rateLimit from "express-rate-limit"; // Use express-rate-limit
import { AppModule } from "./modules/app/app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as morgan from "morgan";
import { TransformInterceptor } from "interceptors/transform.interceptor";

/**
 * The URL endpoint for open API UI
 * @type {string}
 */
export const SWAGGER_API_ROOT = "api/docs";
/**
 * The name of the API
 * @type {string}
 */
export const SWAGGER_API_NAME = "API";
/**
 * A short description of the API
 * @type {string}
 */
export const SWAGGER_API_DESCRIPTION = "API Description";
/**
 * Current version of the API
 * @type {string}
 */
export const SWAGGER_API_CURRENT_VERSION = "1.0";

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );

  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);
  app.use(morgan("combined")); // You can use 'dev', 'common', or any format you prefer
  app.useGlobalInterceptors(new TransformInterceptor());

  app.enableCors();

  // Use Helmet for security
  app.use(helmet());

  // Set up rate limiting
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per windowMs
  });
  app.use(limiter);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(9000, "0.0.0.0");
})();
