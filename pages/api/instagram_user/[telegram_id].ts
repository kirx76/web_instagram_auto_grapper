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
  const instagramUsers = await prisma.instagramuser.findMany({
    where: {
      added_by_id: telegram_user?.id,
    },
  });
  // const telegramUserInstagramAccounts = await prisma.telegramuser.findMany({
  //   where: {
  //     user_id: telegram_id as string,
  //   },
  //   select: {
  //     username: true,
  //     instagramuser: {
  //       select: {
  //         username: true,
  //         pk: true,
  //         full_name: true,
  //         profile_pic_url: true,
  //         profile_pic_url_hd: true,
  //         is_private: true,
  //         enabled: true,
  //         added_by_id: true,
  //       },
  //     },
  //   },
  // });
  res.json(instagramUsers);
};

export default handle;
