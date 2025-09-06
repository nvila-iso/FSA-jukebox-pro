import db from "#db/client";
import { randMusicGenre, randSong, randCatchPhrase } from "@ngneat/falso";

import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { createTrack, getTracks } from "#db/queries/tracks";
import { createUser, getUsers } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // create users
  const user1 = await createUser("user1", "password1");
  const user2 = await createUser("user2", "password2");

  // create tracks
  for (let i = 0; i < 10; i++) {
    await createTrack("Track " + i, i * 300);
  }

  // create a playlist per user
  const playlist1 = await createPlaylist("playlist1", "sdfjlsdksl", user1.id);
  // console.log(playlist1);
  const playlist2 = await createPlaylist(
    "playlist2",
    "sdfjlssdfsdfdksl",
    user2.id
  );

  // create playlist tracks for each playlist
  const allTracks = await getTracks();

  const p1Tracks = allTracks.slice(0, 5);
  // console.log(p1Tracks);
  const p2Tracks = allTracks.slice(5, 10);

  // user playlist tracks creation
  for (const track of p1Tracks) {
    await createPlaylistTrack(playlist1.id, track.id);
  }

  for (const track of p2Tracks) {
    await createPlaylistTrack(playlist2.id, track.id);
  }
}
