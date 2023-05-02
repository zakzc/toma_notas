import { MongoClient, MongoClientOptions } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

// const url = process.env.MONGODB_URI || "";
const url =
  `mongodb+srv://${process.env.mongodb_user}:${process.env.mongodb_password}@cluster0.mwat6y1.mongodb.net/${process.env.mondodb_collection}?retryWrites=true&w=majority`;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password, requestType } = req.body;

  if (!email || !password || requestType === undefined) {
    res
      .status(400)
      .json({ success: false, data: "Error on request sent by frontend" });
    return;
  }

  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as MongoClientOptions);

    const users = client.db().collection("users");

    if (requestType) {
      // sign up
      await users.insertOne({ email, password });
      res.json({ success: true, data: email});
    } else {
      // log in
      const user = await users.findOne({ email, password });
      if (user) {
        res.json({ success: true, data: email});
      } else {
        res.json({ success: false, data: "Log in unsuccessful" });
      }
    }

    client.close();
  } catch (err) {
    res.json({
      success: false,
      data: "Error on request sent by backend: " + err,
    });
  }
}