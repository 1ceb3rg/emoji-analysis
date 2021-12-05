import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";


const secret = process.env.SECRET as string;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({
    req,
    secret,
  });

  const {
    query: { id },
  } = req;

  if (token)

 fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    })
      .then((req) => {
        if (req.status >= 400 && req.status < 600) {
          throw new Error("Bad response from server");
        }
        return req.json();
      })
      .then((body) =>
        res.json(body)
      )
      
      .catch((error) => {
        res.status(401).json(error);

        console.log("the error", error);
        console.log("here");
      });
  else
    res.status(401).json({
      error: "error",
    });

}