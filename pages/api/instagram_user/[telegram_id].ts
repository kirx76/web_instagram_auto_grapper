import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(405).send({ message: "Only GET requests allowed" });
    return;
  }

  const { telegram_id } = req.query;
  const telegram_user = await prisma.telegramuser.findUnique({
    where: {
      user_id: telegram_id as string,
    },
  });
  const preInstagramUsers = await prisma.instagramuser.findMany({
    where: {
      added_by_id: telegram_user?.id,
    },
    include: {
      _count: {
        select: {
          instagrampost: true,
          instagramstory: true,
          instagramhighlight: true,
        },
      },
    },
  });

  console.log(preInstagramUsers);

  res.json(preInstagramUsers);
};

export default handle;
