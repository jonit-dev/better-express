import bcrypt from "bcrypt";
import { createSchema, ExtractDoc, Type, typedModel } from "ts-mongoose";

const userSchema = createSchema(
  {
    name: Type.string({ required: true }),
    email: Type.string({ required: true }),
    password: Type.string(),
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);
export type IUser = ExtractDoc<typeof userSchema>;

userSchema.pre("save", async function (next): Promise<void> {
  const user: any = this;
  if (user) {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
  }
});

export const User = typedModel("User", userSchema);
