import bcrypt from "bcrypt";
import { createSchema, ExtractDoc, Type, typedModel } from "ts-mongoose";

const userSchema = createSchema(
  {
    name: Type.string({ required: true }),
    email: Type.string({ required: true }),
    password: Type.string(),

    ...({} as {
      isValidPassword: (password: string) => Promise<boolean>;
    }),
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

userSchema.methods.isValidPassword = async function (
  password
): Promise<boolean> {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

export const User = typedModel("User", userSchema);
