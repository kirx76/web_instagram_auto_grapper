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
  const instagramAccounts = await prisma.instagramaccount.findMany({
    where: {
      added_by_id: telegram_user?.id,
    },
  });
  // const telegramUserInstagramAccounts = await prisma.telegramuser.findMany({
  //   where: {
  //     user_id: telegram_id as string,
  //   },
  //   select: {
  //     instagramaccount: {
  //       select: {
  //         username: true,
  //         is_active: true,
  //         id: true,
  //         created_at: true,
  //         last_iteration_at: true,
  //         added_by_id: true,
  //         is_valid: true,
  //         last_validation_at: true,
  //         downloading_now: true,
  //         is_deleted: true,
  //       },
  //       where: {
  //         is_active: true,
  //       },
  //     },
  //   },
  // });

  res.json(instagramAccounts);
};

export default handle;
