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
    console.log("Log in for: ", email, user);

    res.status(200).json({ result: "success", data: "user is logged in" });
  }
  if (req.method === "POST") {
    const email = req.body.email;
    const password = req.body.password;
    console.log("USER - Log in for: ", email, password);
    const registerUser: RegisterUser = {
      id: new Date().toISOString() + "-" + uuid(),
      email,
      password,
    };
    // store data locally
    const filePath = path.join(process.cwd(), "data", "users.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    data.push(registerUser);
    fs.writeFileSync(filePath, JSON.stringify(data));
    // response
    res.status(201).json({ result: "success", data: registerUser });
  }
}

export default handler;
