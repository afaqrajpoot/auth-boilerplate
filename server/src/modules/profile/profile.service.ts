import * as crypto from "crypto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from "@nestjs/common";
import { IProfile } from "./profile.model";
import { RegisterPayload } from "modules/auth/payload/register.payload";
import { AppRoles } from "../app/app.roles";
import { PatchProfilePayload } from "./payload/patch.profile.payload";

/**
 * Models a typical response for a crud operation
 */
export interface IGenericMessageBody {
  /**
   * Status message to return
   */
  message: string;
}

/**
 * Profile Service
 */
@Injectable()
export class ProfileService {
  /**
   * Constructor
   * @param {Model<IProfile>} profileModel
   */
  constructor(
    @InjectModel("Profile") private readonly profileModel: Model<IProfile>,
  ) {}

  /**
   * Fetches a profile from database by UUID
   * @param {string} id
   * @returns {Promise<IProfile>} queried profile data
   */
  get(id: string): Promise<IProfile> {
    return this.profileModel.findById(id).exec();
  }

  /**
   * Fetches a profile by their email and hashed password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<IProfile>} queried profile data
   */
  getByUseremailAndPass(email: string, password: string): Promise<IProfile> {
    return this.profileModel
      .findOne({
        email,
        password: crypto.createHmac("sha256", password).digest("hex"),
      })
      .exec();
  }
  /**
   * Fetches a profile from database by name
   * @param {string} name
   * @returns {Promise<IProfile>} queried profile data
   */
  getByName(name: string): Promise<IProfile> {
    return this.profileModel.findOne({ name }).exec();
  }

  /**
   * Fetches a profile from database by name
   * @param {string} email
   * @returns {Promise<IProfile>} queried profile data
   */
  getByEmail(email: string): Promise<IProfile> {
    return this.profileModel.findOne({ email }).exec();
  }

  /**
   * Create a profile with RegisterPayload fields
   * @param {RegisterPayload} payload profile payload
   * @returns {Promise<IProfile>} created profile data
   */
  async create(payload: RegisterPayload): Promise<IProfile> {
    const user = await this.getByEmail(payload.email);
    if (user) {
      throw new NotAcceptableException(
        "The account with the provided email currently exists. Please choose another one.",
      );
    }
    // this will auto assign the admin role to each created user
    const createdProfile = new this.profileModel({
      ...payload,
      password: crypto.createHmac("sha256", payload.password).digest("hex"),
      roles: AppRoles.DEFAULT,
    });

    return createdProfile.save();
  }

  /**
   * Edit profile data
   * @param {PatchProfilePayload} payload
   * @returns {Promise<IProfile>} mutated profile data
   */
  async edit(payload: PatchProfilePayload): Promise<IProfile> {
    const { email } = payload;
    const updatedProfile = await this.profileModel.updateOne({ name }, payload);
    if (updatedProfile.modifiedCount !== 1) {
      throw new BadRequestException(
        "The profile with that name does not exist in the system. Please try another name.",
      );
    }
    return this.getByEmail(email);
  }

  /**
   * Delete profile given a name
   * @param {string} name
   * @returns {Promise<IGenericMessageBody>} whether or not the crud operation was completed
   */
  delete(name: string): Promise<IGenericMessageBody> {
    return this.profileModel.deleteOne({ name }).then((profile) => {
      if (profile.deletedCount === 1) {
        return { message: `Deleted ${name} from records` };
      } else {
        throw new BadRequestException(
          `Failed to delete a profile by the name of ${name}.`,
        );
      }
    });
  }
}
