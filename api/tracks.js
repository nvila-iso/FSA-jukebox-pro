import express from "express";
const router = express.Router();
export default router;

import {
  getTracks,
  getTrackById,
  getPlaylistsByTrackId,
} from "#db/queries/tracks";

router.route("/").get(async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.route("/:id").get(async (req, res) => {
  const track = await getTrackById(req.params.id);
  if (!track) return res.status(404).send("Track not found.");
  res.send(track);
});

router.route("/:id/playlists").get(async (req, res) => {
  const trackPlaylist = await getPlaylistsByTrackId(req.params.id);
  res.send(trackPlaylist);
});
