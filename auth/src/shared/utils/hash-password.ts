import * as bcrypt from 'bcrypt';

export const encryptPassword = async (password: string): Promise<string> =>
  bcrypt.hash(password, 10);

export const comparePasswords = async (
  hash: string,
  password: string,
): Promise<boolean> => bcrypt.compare(password, hash);
