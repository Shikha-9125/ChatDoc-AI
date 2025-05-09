import { db } from "@/firebase/config";
import { button } from "@nextui-org/react";
import axios from "axios";
import { doc, updateDoc } from "firebase/firestore";
import { AudioLinesIcon, Pause, Play } from "lucide-react";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

function AudioButton({ data, user, routeId }: any) {
  // const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [generatingAudio, setGenerationAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(data.audio));
  // console.log(data.audio);
  // const { audio }:any = data;
  const handleAudioEnded = () => {
    setIsPlaying(false);
    audioRef.current.currentTime = 0; // Reset audio to beginning
  };

  // Add event listener for the "ended" event
  audioRef.current.addEventListener("ended", handleAudioEnded);

  const playAudio = async () => {
    if (data?.audio) {
      console.log(data.audio);
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      // alert("audio not found");
      try {
        setGenerationAudio(true);
        let response: any = await axios.post("/api/generate-text-to-audio", {
          text: data?.text,
          email: user.email,
        });
        console.log(response.data.src);
        const docRef = doc(
          db,
          `${user.email}/files/image/${routeId}/chats/${data.id}`
        );
        await updateDoc(docRef, {
          audio: response.data.src,
        });
        setGenerationAudio(false);
        console.log();
      } catch (error) {
        toast.error("Please try again");
        setGenerationAudio(false);
      }
    }
  };
  return (
    <>
      <button onClick={playAudio}>
        <div className="">
          {/* <audio src={data.audio}></audio> */}
          {data.audio ? (
            <>
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4" />
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                </>
              )}
            </>
          ) : (
            <>
              {generatingAudio ? (
                <>
                  {" "}
                  <AudioLinesIcon className="h-4 w-4 animate-pulse" />
                </>
              ) : (
                <>
                  {" "}
                  <AudioLinesIcon className="h-4 w-4" />
                </>
              )}
            </>
          )}
        </div>
      </button>
    </>
  );
}

export default AudioButton;
