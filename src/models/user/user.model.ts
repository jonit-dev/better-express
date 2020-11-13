import bcrypt from 'bcrypt';
import { createSchema, ExtractDoc, Type, typedModel } from 'ts-mongoose';

const mongooseHidden = require('mongoose-hidden')();
const userSchema = createSchema(
  {
    name: Type.string(),
    email: Type.string({ required: true }),
    password: Type.string(),
    salt: Type.string(),
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

//  Hidden fields (not exposed through API responses)
userSchema.plugin(mongooseHidden, {
  hidden: {
    password: true,
    salt: true,
    refreshTokens: true,
    createdAt: true,
    updatedAt: true,
  },
});

userSchema.pre('save', async function (next): Promise<void> {
  const user: any = this;
  const salt = await bcrypt.genSalt();

  if (user.isModified('password')) {
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    user.salt = salt;
    next();
  }
});

userSchema.methods.isValidPassword = async function (
  providedPassword: string
): Promise<boolean> {
  const comparisonHash = await bcrypt.hash(providedPassword, this.salt);

  console.log(comparisonHash);
  console.log(this.password);
  return comparisonHash === this.password;
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
