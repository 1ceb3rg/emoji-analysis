import { getSession, signOut } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import { IPlaylist } from "../../../../models/playlist";

const fetchPlaylists = async (token: string) => {
  const res = await fetch("https://api.spotify.com/v1/me/playlists", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status >= 400 && res.status < 600) {
    throw new Error("Bad response from server");
  }
  const json = await res.json();
  const playlist = await json.items.map((item: IPlaylist) => {
    const { id, name, description, images } = item;

    const image = images[images.length - 1].url;
    return {
      id,
      name,
      description,
      image,
    };
  });

  return playlist;
};

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
    try {
      const response = await fetchPlaylists(token.accessToken!);
      res.send(response);
    } catch (error) {
      res.status(401).json(error);
    }
  else
    res.status(401).json({
      error: "error",
    });
}
