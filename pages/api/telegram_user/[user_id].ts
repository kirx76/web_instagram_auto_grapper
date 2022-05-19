import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(405).send({ message: "Only GET requests allowed" });
    return;
  }
  const { user_id } = req.query;
  const telegramUser = await prisma.telegramuser.findUnique({
    where: {
      user_id: user_id as string,
    },
  });
  res.json(telegramUser);
};

export default handle;
