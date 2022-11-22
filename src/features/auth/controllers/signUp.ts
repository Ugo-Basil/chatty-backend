import { UserCache } from './../../../shared/services/redis/user.cache';
import { IUserDocument } from '@user/interfaces/user.interface';
import  HTTP_STATUS  from 'http-status-codes';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { ISignUpData } from './../interfaces/auth.interface';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { ObjectId } from 'mongodb';
import { BadRequestError } from 'src/shared/globals/helpers/errorHandler';
import { Request, Response } from 'express';
import { joiValidation } from '@global/decorators/joi-validator-decorator';
import { signUpSchema } from '@auth/schemas/signUp';
import { authService } from '@service/db/auth.service';
import { Helpers } from '@global/helpers/helpers';
import { uploads } from '@global/helpers/cloudinary-upload';

const userCache: UserCache = new UserCache();

export class SignUp {
  @joiValidation(signUpSchema)
  public async create(req: Request, res: Response) {
    const { username, password, email, avatarColor, avatarImage } = req.body;
    const checkIfUserExists: IAuthDocument = await authService.getUserByUsernameOrEmail(username, email);
    if (checkIfUserExists) {
      throw new BadRequestError('User already exists');
    }
    const authObjectId: ObjectId = new ObjectId();
    const userObjectId: ObjectId = new ObjectId();
    const uId = `${Helpers.generateRandomIntegers(12)}`;

    const authData: IAuthDocument = SignUp.prototype.signUpData({
      _id: authObjectId,
      uId,
      username,
      email,
      password,
      avatarColor,


    });
    const result: UploadApiResponse = await uploads(avatarImage, `${userObjectId}`, true, true) as UploadApiResponse;

    if (!result?.public_id) {
      throw new BadRequestError('Error uploading image');
    }

    //Add to redis
    const userDataForCache: IUserDocument = SignUp.prototype.userData(authData, userObjectId);
    userDataForCache.profilePicture = `https://res/cloudinary.com/duyvexdho/image/upload/v${result.version}/${userObjectId}`;

    await userCache.saveUserToCache(`${userObjectId}`, uId, userDataForCache);

    res.status(HTTP_STATUS.CREATED).json({
      status: 'success',
      message: 'User created successfully',
      data: {
        authData,
        result,
      },
    });
  }
  private signUpData(data: ISignUpData): IAuthDocument{
    const {_id, uId, username, password, email, avatarColor} = data;
    return {
      _id,
      uId,
      username: Helpers.firstletterToUpperCase(username),
      password,
      email: Helpers.lowerCase(email),
      avatarColor,
      createdAt: new Date(),

    } as IAuthDocument;
  }
  private userData(data: IAuthDocument, userObjectId: ObjectId): IUserDocument{
    const { _id, username, email, uId, password, avatarColor } = data;
    return {
      _id: userObjectId,
      authId: _id,
      uId,
      username: Helpers.firstletterToUpperCase(username),
      email,
      password,
      avatarColor,
      profilePicture: '',
      blocked: [],
      blockedBy: [],
      work: '',
      location: '',
      school: '',
      quote: '',
      bgImageVersion: '',
      bgImageId: '',
      followersCount: 0,
      followingCount: 0,
      postsCount: 0,
      notifications: {
        messages: true,
        reactions: true,
        comments: true,
        follows: true
      },
      social: {
        facebook: '',
        instagram: '',
        twitter: '',
        youtube: ''
      }

    } as unknown as IUserDocument;
  }
}