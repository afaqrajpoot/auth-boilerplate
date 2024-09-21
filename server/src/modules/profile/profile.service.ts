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
  getByUserEmailAndPass(email: string, password: string): Promise<IProfile> {
    return this.profileModel
      .findOne({
        email,
        password: crypto.createHmac("sha256", password).digest("hex"),
      })
      .exec();
  }
  /**
   * Fetches a profile from database by id
   * @param {string} id
   * @returns {Promise<IProfile>} queried profile data
   */
  getById(id: string): Promise<IProfile> {
    return this.profileModel.findById(id).exec();
  }

  /**
   * Fetches a profile from database by email
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
    // this will auto assign the default role to each created user
    const createdProfile = new this.profileModel({
      ...payload,
      password: crypto.createHmac("sha256", payload.password).digest("hex"),
      roles: AppRoles.DEFAULT,
    });

    return createdProfile.save();
  }

  /**
   * Edit profile data
   * @param {string} id
   * @param {PatchProfilePayload} payload
   * @returns {Promise<IProfile>} mutated profile data
   */
  async edit(id: string, payload: PatchProfilePayload): Promise<IProfile> {
    const updatedProfile = await this.profileModel.findByIdAndUpdate(
      id,
      payload,
    );
    updatedProfile
      .save()
      .then()
      .catch(() => {
        throw new BadRequestException(
          "The profile with that id does not exist in the system. Please try another id.",
        );
      });

    return this.getById(id);
  }

  /**
   * Delete profile given a id
   * @param {string} id
   * @returns {Promise<IGenericMessageBody>} whether or not the crud operation was completed
   */
  delete(id: string): Promise<IGenericMessageBody> {
    return this.profileModel.deleteOne({ id }).then((profile) => {
      if (profile.deletedCount === 1) {
        return { message: `Deleted ${id} from records` };
      } else {
        throw new BadRequestException(
          `Failed to delete a profile by the Id of ${id}.`,
        );
      }
    });
  }
}
