import bcrypt from 'bcrypt';
import { createSchema, ExtractDoc, Type, typedModel } from 'ts-mongoose';

const userSchema = createSchema(
  {
    name: Type.string(),
    email: Type.string({ required: true }),
    password: Type.string(),

    ...({} as {
      isValidPassword: (password: string) => Promise<boolean>;
      checkIfExists: (id: number) => Promise<boolean>;
    }),
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);
export type IUser = ExtractDoc<typeof userSchema>;

userSchema.pre('save', async function (next): Promise<void> {
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

export const User = typedModel('User', userSchema, undefined, undefined, {
  checkIfExists: async (email: string): Promise<boolean> => {
    const exists = await User.findOne({ email });

    if (exists) {
      return true;
    }

    return false;
  },
});
