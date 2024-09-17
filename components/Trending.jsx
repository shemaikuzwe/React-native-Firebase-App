import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { icons } from "../constants";
import * as Animatable from "react-native-animatable";
import { Video, ResizeMode } from "expo-av";

// Define zoomIn and zoomOut animations
const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

// Component to render individual trending items
const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl relative mt-3 justify-center items-center"
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            resizeMode="contain"
            className="w-12 h-12 absolute"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

// Component to render the trending list
const Trending = ({ posts }) => {
  const [active, setActive] = useState(posts[0]?.id);

  // Handle visible items change in FlatList
  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActive(viewableItems[0].item.id);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      renderItem={({ item }) => (
        <TrendingItem activeItem={active} item={item} />
      )}
      keyExtractor={(item) => item.id}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
      onViewableItemsChanged={viewableItemsChanged}
    />
  );
};

export default Trending;
