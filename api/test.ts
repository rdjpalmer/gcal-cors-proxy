import * as fs from "fs/promises";
import * as path from "path";
import { VercelRequest, VercelResponse } from "@vercel/node";

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "https://roamresearch.com");
  // res.setHeader("Access-Control-Allow-Origin", req.header.origin);
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  return await fn(req, res);
};

const fn = async (request: VercelRequest, response: VercelResponse) => {
  try {
    const data = await fs.readFile(path.resolve("./testevent.ics"), {
      encoding: "utf-8",
    });

    response.status(200).send(data);
  } catch (error) {
    response.status(500).send(error.message);
  }
};

export default allowCors(fn);
