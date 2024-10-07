import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/auth.schema';
import { authMiddleware } from 'src/middleware/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constant';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret || "jfksjdfsdfotowertlkfkjfgjkfgdfjgljermtoeirstueowijtmrlkgmdfkljjjtkjerty4509345uoigewalk",
      signOptions: { expiresIn: '10d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authMiddleware).forRoutes('me');
  }
}
