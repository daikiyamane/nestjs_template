import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
	AuthenticationDetails,
	CognitoUser,
	CognitoUserAttribute,
	CognitoUserPool,
} from "amazon-cognito-identity-js";
import { PrismaService } from "../prisma/prisma.service";
import { ChangePasswordRequestDto } from "./dto/change-password-request.dto";
import { ForgotPasswordRequestDto } from "./dto/forgot-password-request.dto";
import { LoginRequestDto } from "./dto/login-request.dto";
import { SignUpRequestDto } from "./dto/sign-up-request.dto";
import { VerifyCodeRequestDto } from "./dto/verify-code-request.dto";
// import {
//   CognitoIdentityProviderClient,
//   ListUsersCommand,
// } from '@aws-sdk/client-cognito-identity-provider';
@Injectable()
export class AuthService {
	private userPool: CognitoUserPool;
	constructor(
		private configService: ConfigService,
		private prisma: PrismaService,
	) {
		this.userPool = new CognitoUserPool({
			UserPoolId: this.configService.get<string>("AWS_USER_POOL_ID") || "",
			ClientId: this.configService.get<string>("AWS_USER_POOL_CLIENT_ID") || "",
		});
	}

	async signUp(authRegisterRequest: SignUpRequestDto) {
		const { name, email, password } = authRegisterRequest;
		// メールアドレスの重複がないかチェックする
		// const cognitoClient = new CognitoIdentityProviderClient({});
		// const fetchListUsers = async (email: string) => {
		//   const command = new ListUsersCommand({
		//     UserPoolId: process.env.COGNITO_USER_POOL_ID,
		//     Filter: `email = "${email}"`,
		//   });
		//   const { Users: users } = await cognitoClient.send(command);
		//   return users;
		// };
		// const existedUser = await fetchListUsers(email);
		// if (existedUser.length > 0) throw new Error('The email is duplicated.');
		if (await this.prisma.user.findFirst({ where: { email } })) {
			throw new BadRequestException("すでに登録されているメールアドレスです");
		}
		const signup = new Promise((resolve, reject) => {
			this.userPool.signUp(
				name,
				password,
				[new CognitoUserAttribute({ Name: "email", Value: email })],
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
		await signup;
		await this.prisma.user.create({ data: { name, email } });
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
					resolve({
						accessToken: result.getAccessToken().getJwtToken(),
						refreshToken: result.getRefreshToken().getToken(),
					});
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
				(error, result) => {
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
						(error, result) => {
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

	async forgotPassword(user: ForgotPasswordRequestDto) {
		const { name } = user;
		const userData = {
			Username: name,
			Pool: this.userPool,
		};
		const cognitoUser = new CognitoUser(userData);
		return new Promise((resolve, reject) => {
			cognitoUser.forgotPassword({
				onSuccess: (result) => {
					resolve(result);
				},
				onFailure: (err) => {
					reject(err);
				},
			});
		});
	}

	async resetPassword(user: ForgotPasswordRequestDto) {
		const { name, code, password } = user;
		const userData = {
			Username: name,
			Pool: this.userPool,
		};
		const cognitoUser = new CognitoUser(userData);
		return new Promise((resolve, reject) => {
			cognitoUser.confirmPassword(code.toString(), password, {
				onSuccess: (result) => {
					resolve(result);
				},
				onFailure: (err) => {
					reject(err);
				},
			});
		});
	}
}
