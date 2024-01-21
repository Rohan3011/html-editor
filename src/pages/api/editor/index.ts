// posts.js

import { connectToDB } from "@/lib/mongodb";
import { postModel } from "@/models/post";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDB();
  switch (req.method) {
    case "POST":
      console.log(req.body);
      let myPost = await postModel.create({ ...req.body });
      console.log(myPost);
      res.json(myPost);
      break;
    case "GET":
      const allPosts = await postModel.find();
      res.json(allPosts);
      break;
  }
}
