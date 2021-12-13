# Google Calendar CORS Proxy

Proxy service for Google Calender iCal links and Roam Research. Pairs well with [rdjpalmer/roam-js-ical](https://github.com/rdjpalmer/roam-js-ical).

To use: `https://gcal-cors-proxy.vercel.app?url=...`. Works best with your private Google Calendar iCal link.
The service intentionally has zero logging because of this. It is deployed on Vercel, and thus only has Vercel's out of the box set up.

If you're concerned about data handling, please fork and deploy this service yourself:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frdjpalmer%2Fgcal-cors-proxy&project-name=gcal-cors-proxy&repo-name=gcal-cors-proxy)
