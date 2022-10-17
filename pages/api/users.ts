import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../utils/database';
import User from '../../models/user';

type Data =
  | {
      message: string;
      data: object;
    }
  | {
      message: string;
      error: unknown;
    };

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, body } = req;
  await connectDB();
  switch (method) {
    case 'POST':
      try {
        const user = await User.create(body);
        return res.status(201).json({ message: 'User created', data: user });
      } catch (err) {
        return res
          .status(400)
          .json({ message: 'User not created', error: err });
      }
  }
}
