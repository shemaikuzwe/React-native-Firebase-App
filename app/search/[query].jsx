import { useSession } from "@/components/context/UserContextProvider";
import { useEffect, useState } from "react";
import { getSearchVideo } from "../../lib/action";
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoCard from "@/components/VideoCard";
import images from "@/constants/images";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import Empty from "@/components/Empty";
import { useLocalSearchParams } from "expo-router";
import Loading from "../../components/loading";

const Search = () => {
  const { query } = useLocalSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await getSearchVideo(query);
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
  }, [query]);

  return (
    <SafeAreaView className={"bg-primary h-full"}>
      {loading ? (
       <Loading/>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <VideoCard video={item} />}
          ListHeaderComponent={() => (
            <View className={"my-6 px-4 space-y-6"}>
                <View>
                  <Text className={"font-pmedium text-sm text-gray-100"}>
                      Search Results
                  </Text>
                  <Text className={"text-2xl text-white font-psemibold"}>
                      {query}
                  </Text>
                  <View className={"mt-6 mb-8"}>
                    <SearchInput initialQuery={query}/>
                  </View>
                </View>

            </View>
          )}
          ListEmptyComponent={() => (
            <Empty
              title={"No Videos Found "}
              subtitle={"No Videos found for this search"}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};
export default Search;
