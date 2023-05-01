import { v4 as uuid } from "uuid";
import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

interface RegisterUser {
  id: string;
  email: string;
  password: string;
}

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const email = req.body.email;
    const user = req.body.user;
    res
      .status(200)
      .json({ result: "success", data: "API is operational and working" });
  }
  const email = req.body.email;
  const password = req.body.password;
  console.log("USER - Log in for: ", email, password);
  if (req.method === "POST") {
    // Sign up request
    if (req.body.requestType === true) {
      const registerUser: RegisterUser = {
        id: new Date().toISOString() + "-" + uuid(),
        email,
        password,
      };
      // store data locally
      const filePath = path.join(process.cwd(), "src/data", "users.json");
      const fileData = fs.readFileSync(filePath);
      const data = JSON.parse(fileData);
      data.push(registerUser);
      fs.writeFileSync(filePath, JSON.stringify(data));
      // response
      res
        .status(201)
        .json({
          result: "success",
          process: "user registered",
          data: registerUser,
        });
    } else {
      // Log in request
      // store data locally
      const filePath = path.join(process.cwd(), "src/data", "users.json");
      const fileData = fs.readFileSync(filePath);
      const data = JSON.parse(fileData);
      const user = data.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        res.status(200).json({
          result: "success",
          process: "user is logged in",
          data: true,
        });
      } else {
        res
          .status(401)
          .json({ success: true, process: "User is not logged in", data: false });
      }
    }
  }
}

export default handler;
