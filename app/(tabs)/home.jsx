import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import Empty from "../../components/Empty";
import { useEffect, useState } from "react";
import { getVideos } from "../../lib/action";
import { useSession } from "../../components/context/UserContextProvider";
import VideoCard from "../../components/VideoCard";
import Loading from "../../components/loading";
const Home = () => {
  const { user } = useSession();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchVideos();
    setRefreshing(false);
  };
  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await getVideos();
      setData(res);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      Alert.alert("error", e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <SafeAreaView className={"bg-primary h-full"}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <VideoCard video={item} />}
          ListHeaderComponent={() => (
            <View className={"my-6 px-4 space-y-6"}>
              <View className={"justify-between items-start flex-row mb-6"}>
                <View>
                  <Text className={"font-pmedium text-sm text-gray-100"}>
                    Welcome Back,
                  </Text>
                  <Text className={"text-2xl text-white font-psemibold"}>
                    {user?.email}
                  </Text>
                </View>
                <View className={"mt-1.5"}>
                  <Image
                    source={images.logoSmall}
                    className={"w-9 h-10"}
                    resizeMode={"contain"}
                  />
                </View>
              </View>
              <SearchInput />
              <View className={"w-full flex-1 pt-3 pb-8"}>
                <Text className={"text-gray-100 text-lg  font-pregular mb-3"}>
                  Latest videos
                </Text>
                <Trending posts={data ?? null} />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <Empty
              title={"No videos Found "}
              subtitle={"Be the first to upload video"}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};
export default Home;
