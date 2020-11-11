import { createSchema, ExtractDoc, Type, typedModel } from "ts-mongoose";

const userSchema = createSchema(
  {
    name: Type.string({ required: true }),
    email: Type.string({ required: true }),
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export const User = typedModel("User", userSchema);

export type IUser = ExtractDoc<typeof userSchema>;
