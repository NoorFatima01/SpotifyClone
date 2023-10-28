import { Song } from "@/type";
import useAuthModal from "./useAuthModal";
import usePlayer from "./usePlayer";
import { useUser } from "./useUser";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }
    player.setId(id);
    console.log("onPlay", id);
    player.setIds(songs.map((song) => song.id.toString()));
  };

  return onPlay;
};
export default useOnPlay;
