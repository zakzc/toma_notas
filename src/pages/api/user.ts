import { MongoClient, MongoClientOptions } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

// const url = process.env.MONGODB_URI || "";
const url = `mongodb+srv://${process.env.mongodb_user}:${process.env.mongodb_password}@cluster0.mwat6y1.mongodb.net/${process.env.mondodb_collection}?retryWrites=true&w=majority`;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password, requestType, userData } = req.body;

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

    if (requestType === "signUp") {
      // sign up
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const userAlreadyExists = await users.findOne({ email });
      if (userAlreadyExists && userAlreadyExists.email === email) {
        res.json({
          success: true,
          processed: false,
          data: "User already exists",
        });
      } else {
        await users.insertOne({ email, hashedPassword, userData });
        res.json({ success: true, processed: true, data: email });
      }
    } else if (requestType === "logIn") {
      // log in

      const user = await users.findOne({ email });
      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return {
            success: true,
            processed: false,
            message: "Invalid password",
          };
        }
        res.json({ success: true, processed: true, data: userData });
      } else {
        res.json({
          success: true,
          processed: false,
          data: "Log in unsuccessful",
        });
      }
    } else if (requestType === "dataSync") {
      const userExists = await users.findOne({ email, password });
      if (userExists && userData) {
        if (JSON.stringify(userData) === JSON.stringify(userExists.userData)) {
          res.json({
            success: true,
            processed: false,
            data: "Nothing to sync",
          });
        } else {
        }
        const newData = {
          user: userExists.name,
          email: userExists.email,
          userData: userData,
        };

        // Save the new data to MongoDB
        await userData.replaceOne({ user: userExists.name }, newData, {
          upsert: true,
        });
        res.json({ success: true, processed: true, data: "Sync successful" });
      } else {
        res.json({
          success: true,
          processed: false,
          data: "Could not find this user for sync",
        });
      }
      console.log("sync ");
    }

    client.close();
  } catch (err) {
    res.json({
      success: false,
      processed: false,
      data: "Error on request sent by backend: " + err,
    });
  }
}
