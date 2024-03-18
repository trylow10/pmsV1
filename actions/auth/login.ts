'use server';

import * as z from 'zod';

import { LoginSchema } from '@/schemas/user.schema';
import { getUserByEmail } from '@/data/user';

import { sendVerificationEmail } from '@/lib/mail';
import bcrypt from 'bcryptjs';
import { generateVerificationToken } from '@/lib/tokens';

const DEFAULT_LOGIN_REDIRECT = '/';

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email does not exist!' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: 'Confirmation email sent!' };
  }

  const passwordsMatch = await bcrypt.compare(password, existingUser.password);

  if (!passwordsMatch) {
    return { error: 'Invalid credentials!' };
  }
  try {
    return {
      success: true,
      signInData: {
        provider: 'credentials',
        data: {
          email,
          password,
          callbackUrl: DEFAULT_LOGIN_REDIRECT || callbackUrl,
        },
      },
    };
  } catch (error: any) {
    if (error) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };
        default:
          return { error: 'Something went wrong!' };
      }
    }

    throw error;
  }
};
