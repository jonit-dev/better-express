import bcrypt from 'bcrypt';
import { createSchema, ExtractDoc, Type, typedModel } from 'ts-mongoose';

const userSchema = createSchema(
  {
    name: Type.string(),
    email: Type.string({ required: true }),
    password: Type.string(),
    refreshTokens: Type.array().of({
      token: Type.string(),
    }),

    ...({} as {
      isValidPassword: (password: string) => Promise<boolean>;
      checkIfExists: (id: number) => Promise<boolean>;
    }),
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

userSchema.pre('save', async function (next): Promise<void> {
  const user: any = this;
  if (user && user.isModified('password')) {
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

export type IUser = ExtractDoc<typeof userSchema>;

export const User = typedModel('User', userSchema, undefined, undefined, {
  // Static methods ========================================
  checkIfExists: async (email: string): Promise<boolean> => {
    const exists = await User.findOne({ email });

    if (exists) {
      return true;
    }

    return false;
  },
  findByCredentials: async (email: string, password: string) => {
    const user = await User.findOne({ email });

    if (await user?.isValidPassword(password)) {
      return user;
    }

    return false;
  },
});
