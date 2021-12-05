import { getSession, signOut } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import { IPlaylist } from "../../../../models/playlist";

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
    fetch("https://api.spotify.com/v1/me/playlists", {
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
        body.items.map((item: IPlaylist) => {
          const { id, name, description,images } = item;
          console.log(images)
const image=images[images.length-1].url
          return {
            id,
            name,
            description,
            image
          };
        })
      )
      .then((list) => res.send(list))
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
