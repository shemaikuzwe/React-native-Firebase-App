import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";
import { useState } from "react";
import {ResizeMode, Video} from "expo-av";

export default function VideoCard({
  video: { title, thumbnail, video },
  // creator: { username, avatar },
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View className={"flex-col px-4 items-center mb-14"}>
      <View className={"flex-row gap-3 items-start"}>
        <View className={"flex-row flex-1 justify-center items-center"}>
          <View className={"w-[46px] h-[46px] rounded-lg border-secondary justify-center items-center p-0.5"}>
              <Image
                  source={{uri:"https://i.pravatar.cc/150?u=a042581f4e29026024d"}}
               className={"w-full h-full rounded-lg"}
               resizeMode={"cover"}
              />
          </View>
          <View className={"justify-center flex-1 ml-3 gap-y-1"}>
            <Text
              className={"text-2xl font-psemibold text-white"}
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className={"font-pregular text-xs text-gray-100"}
              numberOfLines={1}
            >
              {"shema"}
            </Text>
          </View>
        </View>
        <View className={"pt2"}>
          <Image
            source={icons.menu}
            className={"w5 h-5"}
            resizeMode={"contain"}
          />
        </View>
      </View>
      {isPlaying ? (

      <Video
        source={{uri:video}}
        className={"w-full h-60 rounded-xl mt-3"}
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
        shouldPlay
        onPlaybackStatusUpdate={(status)=>{
          if (status.didJustFinish){
            setIsPlaying(false)
          }
        }}
      />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={()=>setIsPlaying(true)}
          className={
            "w-full h-60 rounded-xl relative mt-3 justify-center items-center"
          }
        >
          <Image
            source={{ uri: thumbnail }}
            className={"w-full h-full rounded-xl mt3"}
            resizeMode={"cover"}
          />
          <Image
            source={icons.play}
            resizeMode={"contain"}
            className={"w-12 h-12 absolute"}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
