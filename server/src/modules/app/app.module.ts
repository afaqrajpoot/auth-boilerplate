import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { MongooseModule, MongooseModuleAsyncOptions } from "@nestjs/mongoose";
import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { AuthModule } from "../auth/auth.module";
import { ProfileModule } from "../profile/profile.module";
import { AccessControlModule } from "nest-access-control";
import { roles } from "./app.roles";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get("DB_URL"),
      }),
    }),

    AccessControlModule.forRoles(roles),
    ConfigModule,
    AuthModule,
    ProfileModule,
  ],
  providers: [AppService],
})
export class AppModule {}
