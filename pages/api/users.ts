import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../utils/database';
import user from '../../models/user';

type Data =
  | {
      message: string;
      data: {
        name: string;
        email: string;
        password: string;
        rol: string;
      };
    }
  | { message: string };

connectDB();

export const userHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  switch (req.method) {
    case 'POST':
      const userData = req.body;
      const userCreated = await user.create(userData);
      return res
        .status(201)
        .json({ message: 'User created', data: userCreated });
    default:
      return res.status(400).json({ message: 'this method is not supported' });
  }
};
