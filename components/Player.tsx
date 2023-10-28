"use client";
import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();
  console.log("actibeId", player.activeId);
  const { song } = useGetSongById(player.activeId);
  console.log("The console stmnt for song in player.tsx");
  console.log("song", song);

  const songUrl = useLoadSongUrl(song!);
  console.log("The songUrl is: ", songUrl);

  if (!song || !songUrl || !player.activeId) {
    if (!songUrl) return <div>No songUrl</div>;
    if (!song) return <div>No song</div>;
    if (!player.activeId) return <div>No activeId</div>;
    return <div>No none</div>;
  }

  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      <PlayerContent song={song} songUrl={songUrl} key={songUrl} />
    </div>
  );
};

export default Player;
