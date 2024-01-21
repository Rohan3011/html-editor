import { connectToDB } from "@/lib/mongodb";
import { postModel } from "@/models/post";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDB();
  switch (req.method) {
    case "POST":
      console.log(req.body);

      break;
    case "GET":
      const post = await postModel.findById(req.query.id);
      res.json(post);
      break;
  }
}
