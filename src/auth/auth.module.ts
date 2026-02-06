import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { LocalStraegy } from "./local.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports :[UserModule,PassportModule],
    providers:[AuthService,LocalStraegy],
    controllers:[AuthController]
})
export class AuthModule{}