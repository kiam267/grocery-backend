import { Injectable } from '@nestjs/common';
import {
  AuthResponse,
  ChangePasswordDto,
  ForgetPasswordDto,
  LoginDto,
  CoreResponse,
  RegisterDto,
  ResetPasswordDto,
  VerifyForgetPasswordDto,
  SocialLoginDto,
  OtpLoginDto,
  OtpResponse,
  VerifyOtpDto,
  OtpDto,
} from './dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { UserDocument, User as Users } from './schema/auth.schema';
import usersJson from '@db/users.json';
import { InjectModel, ModelDefinition } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { JwtService } from '@nestjs/jwt';

const users = plainToClass(User, usersJson);

@Injectable()
export class AuthService {
  private users: User[] = users;
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService, // Inject JwtService
  ) {}

  async register(createUserInput: RegisterDto): Promise<AuthResponse> {
    const user: User = {
      id: uuidv4(),

      ...users[0],
      ...createUserInput,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const findEmailIn = await this.userModel.findOne({
      email: createUserInput.email,
    });

    if (findEmailIn) {
      return {
        error: true,
        message: 'Email already exists now',
      };
    }

    if (createUserInput.password.length <= 6) {
      return {
        error: true,
        message: 'Password should be at least 6 characters long',
      };
    }

    const createdUser = await this.userModel.create({
      coustomer_id: uuidv4(),
      name: createUserInput.name,
      email: createUserInput.email,
      password: createUserInput.password,
    });

    const payload = {
      customer_id: createdUser.coustomer_id,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.roles,
    };

    const token = this.jwtService.sign(payload);

    return {
      token: token,
      permissions: [createdUser.roles],
    };
  }

  async login(loginInput: LoginDto): Promise<AuthResponse> {
    console.log(loginInput);
    if (loginInput.email === 'admin@demo.com') {
      return {
        token: 'jwt token',
        permissions: ['store_owner', 'super_admin'],
        role: 'super_admin',
      };
    } else if (
      ['store_owner@demo.com', 'vendor@demo.com'].includes(loginInput.email)
    ) {
      return {
        token: 'jwt token',
        permissions: ['store_owner', 'customer'],
        role: 'store_owner',
      };
    } else {
      return {
        token: 'jwt token',
        permissions: ['customer'],
        role: 'customer',
      };
    }
  }
  async changePassword(
    changePasswordInput: ChangePasswordDto,
  ): Promise<CoreResponse> {
    console.log(changePasswordInput);

    return {
      success: true,
      message: 'Password change successful',
    };
  }
  async forgetPassword(
    forgetPasswordInput: ForgetPasswordDto,
  ): Promise<CoreResponse> {
    console.log(forgetPasswordInput);

    return {
      success: true,
      message: 'Password change successful',
    };
  }
  async verifyForgetPasswordToken(
    verifyForgetPasswordTokenInput: VerifyForgetPasswordDto,
  ): Promise<CoreResponse> {
    console.log(verifyForgetPasswordTokenInput);

    return {
      success: true,
      message: 'Password change successful',
    };
  }
  async resetPassword(
    resetPasswordInput: ResetPasswordDto,
  ): Promise<CoreResponse> {
    console.log(resetPasswordInput);

    return {
      success: true,
      message: 'Password change successful',
    };
  }
  async socialLogin(socialLoginDto: SocialLoginDto): Promise<AuthResponse> {
    console.log(socialLoginDto);
    return {
      token: 'jwt token',
      permissions: ['super_admin', 'customer'],
      role: 'customer',
    };
  }
  async otpLogin(otpLoginDto: OtpLoginDto): Promise<AuthResponse> {
    console.log(otpLoginDto);
    return {
      token: 'jwt token',
      permissions: ['super_admin', 'customer'],
      role: 'customer',
    };
  }
  async verifyOtpCode(verifyOtpInput: VerifyOtpDto): Promise<CoreResponse> {
    console.log(verifyOtpInput);
    return {
      message: 'success',
      success: true,
    };
  }
  async sendOtpCode(otpInput: OtpDto): Promise<OtpResponse> {
    console.log(otpInput);
    return {
      message: 'success',
      success: true,
      id: '1',
      provider: 'google',
      phone_number: '+919494949494',
      is_contact_exist: true,
    };
  }

  // async getUsers({ text, first, page }: GetUsersArgs): Promise<UserPaginator> {
  //   const startIndex = (page - 1) * first;
  //   const endIndex = page * first;
  //   let data: User[] = this.users;
  //   if (text?.replace(/%/g, '')) {
  //     data = fuse.search(text)?.map(({ item }) => item);
  //   }
  //   const results = data.slice(startIndex, endIndex);
  //   return {
  //     data: results,
  //     paginatorInfo: paginate(data.length, page, first, results.length),
  //   };
  // }
  // public getUser(getUserArgs: GetUserArgs): User {
  //   return this.users.find((user) => user.id === getUserArgs.id);
  // }
  me(): User {
    console.log();
    
    return this.users[0];
  }

  // updateUser(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }
}
