import * as fs from "fs/promises";
import * as path from "path";
import { VercelRequest, VercelResponse } from "@vercel/node";

const makeIcs = () => {
  const today = new Date();
  const now = `${today.getFullYear()}${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${today.getDate().toString().padStart(2, "0")}`;

  return `
    BEGIN:VCALENDAR
    VERSION:2.0
    PRODID:-//ical.marudot.com//iCal Event Maker
    CALSCALE:GREGORIAN
    BEGIN:VTIMEZONE
    TZID:Europe/London
    LAST-MODIFIED:20201011T015911Z
    TZURL:http://tzurl.org/zoneinfo-outlook/Europe/London
    X-LIC-LOCATION:Europe/London
    BEGIN:DAYLIGHT
    TZNAME:BST
    TZOFFSETFROM:+0000
    TZOFFSETTO:+0100
    DTSTART:19700329T010000
    RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU
    END:DAYLIGHT
    BEGIN:STANDARD
    TZNAME:GMT
    TZOFFSETFROM:+0100
    TZOFFSETTO:+0000
    DTSTART:19701025T020000
    RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU
    END:STANDARD
    END:VTIMEZONE
    BEGIN:VEVENT
    DTSTAMP:${now}T130707Z
    UID:1639141610476-31221@ical.marudot.com
    DTSTART;TZID=Europe/London:${now}T120000
    DTEND;TZID=Europe/London:${now}T130000
    SUMMARY:Test
    DESCRIPTION:Test event for GIF
    END:VEVENT
    END:VCALENDAR
  `
    .trim()
    .replace(/[^\S\r\n]/g, "");
};

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
    const data = makeIcs();

    response.status(200).send(data);
  } catch (error) {
    response.status(500).send(error.message);
  }
};

export default allowCors(fn);
