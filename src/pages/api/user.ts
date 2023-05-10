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

  if (!email || requestType === undefined) {
    res.status(400).json({
      success: true,
      processed: false,
      data: "Error on request sent by frontend",
    });
    return;
  }

  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as MongoClientOptions);

    const users = client.db().collection("users");
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userAlreadyExists = await users.findOne({ email });
    if (requestType === "signUp") {
      // sign up
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
        bcrypt.compare(
          password,
          user.hashedPassword,
          function (err, isPasswordValid) {
            if (err) {
              console.error(err);
              return res.json({
                success: false,
                processed: false,
                data: "Log in unsuccessful",
              });
            }
            if (isPasswordValid) {
              // Passwords match, send JWT
              // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
              return res.json({
                success: true,
                processed: true,
                data: user.userData,
              });
            } else {
              // Passwords do not match
              return res.json({
                success: true,
                processed: false,
                message: "Invalid password",
              });
            }
          }
        );
      } else {
        // User not found
        return res.json({
          success: true,
          processed: false,
          data: "Log in unsuccessful",
        });
      }
    } else if (requestType === "SyncData") {
      // Sync Data
      if (!userData) {
        return res.json({
          success: true,
          processed: false,
          data: "No user data provided",
        });
      }
      const currentUser = await users.findOne({ email });
      let updatedUserData; 
      if (currentUser) {
        console.log("users ", currentUser.userData);
        updatedUserData = currentUser.userData.map((i) => {
          if ((i.name = userData.name)) {
            return userData;
          } else {
            return i;
          }
        });
      }
console.log("updated is; ", updatedUserData)
      const updatedUser = await users.findOneAndUpdate(
        { email },
        { $set: { updatedUserData } }
      );

      if (!updatedUser.value) {
        return res.json({
          success: false,
          processed: false,
          data: "User not found",
        });
      }

      return res.json({
        success: true,
        processed: true,
        data: {
          user: {
            id: updatedUser.value.id,
            name: updatedUser.value.name,
            email: updatedUser.value.email,
            userData: updatedUser.value.userData,
          },
        },
      });
    } else {
      return res.json({
        success: false,
        processed: false,
        data: "Invalid request type",
      });
    }
  } catch (err) {
    console.error(err);
    res.json({
      success: false,
      processed: false,
      data: "Error occurred",
    });
  }
}
