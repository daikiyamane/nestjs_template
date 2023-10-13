import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { ConfigService } from '@nestjs/config';
import { LoginRequestDto } from './dto/login-request.dto';
import { SignUpRequestDto } from './dto/sign-up-request.dto';
import { VerifyCodeRequestDto } from './dto/verify-code-request.dto';
import { ChangePasswordRequestDto } from './dto/change-password-request.dto';
@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;
  constructor(private configService: ConfigService) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.configService.get<string>('AWS_USER_POOL_ID') || '',
      ClientId: this.configService.get<string>('AWS_USER_POOL_CLIENT_ID') || '',
    });
  }

  async signUp(authRegisterRequest: SignUpRequestDto) {
    const { name, email, password } = authRegisterRequest;
    // メールアドレスの重複がないかチェックする
    // const existedUser = await fetchListUsers(email);
    // if (existedUser.length > 0) throw new Error('The email is duplicated.');

    return new Promise((resolve, reject) => {
      return this.userPool.signUp(
        name,
        password,
        [new CognitoUserAttribute({ Name: 'email', Value: email })],
        [],
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result.user);
          }
        },
      );
    });
  }

  async login(user: LoginRequestDto) {
    const { name, password } = user;
    const authenticationDetails = new AuthenticationDetails({
      Username: name,
      Password: password,
    });
    const userData = {
      Username: name,
      Pool: this.userPool,
    };
    const newUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
        newPasswordRequired: () => {
          newUser.completeNewPasswordChallenge(
            password,
            {},
            {
              onSuccess: (result) => {
                resolve(result);
              },
              onFailure: (err) => {
                reject(err);
              },
            },
          );
        },
      });
    });
  }

  async verifyEmail(user: VerifyCodeRequestDto) {
    const { name, code } = user;
    const userData = {
      Username: name,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      return cognitoUser.confirmRegistration(
        code.toString(),
        true,
        function (error, result) {
          if (error) reject(error);
          resolve(result);
        },
      );
    });
  }

  async changePassword(user: ChangePasswordRequestDto) {
    const { name, old_password, password } = user;
    const userData = {
      Username: name,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    const authenticationDetails = new AuthenticationDetails({
      Username: name,
      Password: old_password,
    });
    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: () => {
          cognitoUser.changePassword(
            old_password,
            password,
            function (error, result) {
              if (error) reject(error);
              resolve(result);
            },
          );
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
}
