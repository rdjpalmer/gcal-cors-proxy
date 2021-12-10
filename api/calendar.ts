import * as ical from "node-ical";
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
    const { url } = request.query;
    if (!url) {
      throw new Error("Please supply URL");
    }

    if (
      typeof url !== "string" ||
      !url.includes("https://calendar.google.com/calendar/ical")
    ) {
      throw new Error("Please supply valid Google Calendar iCal URL");
    }

    const data = await ical.fromURL(url);

    response.status(200).send(data);
  } catch (error) {
    response.status(500).send(error.message);
  }
};

export default allowCors(fn);
