import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const user = req.body;
  const instagramUser = await prisma.instagramuser.update({
    where: {
      pk: user.pk,
    },
    data: {
      enabled: !user.enabled,
    },
  });
  res.json(instagramUser);
};

export default handle;
