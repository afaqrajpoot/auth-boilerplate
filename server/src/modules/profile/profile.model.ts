import { Schema, Document } from "mongoose";
import { AppRoles } from "modules/app/app.roles";

/**
 * Mongoose Profile Schema
 */
export const Profile = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  roles: [{ type: String }],
  date: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Mongoose Profile Document
 */
export interface IProfile extends Document {
  /**
   * UUID
   */
  readonly _id: Schema.Types.ObjectId;
  /**
   * Email
   */
  readonly email: string;
  /**
   * Name
   */
  readonly name: string;
  /**
   * Password
   */
  password: string;
  /**
   * Roles
   */
  readonly roles: AppRoles;
  /**
   * Date
   */
  readonly date: Date;
}
