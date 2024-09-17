import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";
import { Logout } from "../../lib/action";
import { useSession } from "../../components/context/UserContextProvider";

const Profile = () => {
  const { query } = useLocalSearchParams();
  const [data, setData] = useState([]);
  const { setUser } = useSession();

  const handleLogout = async () => {
    await Logout();
    setUser(null);
    return router.replace("/sign-in");
  };
  return (
    <SafeAreaView className={"bg-primary h-full"}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item}</Text>}
        ListHeaderComponent={() => (
          <View
            className={"w-full justify-center items-center mt-6 mb-12 px-4 "}
          >
            <TouchableOpacity
              className={"w-full items-end mb-10"}
              onPress={handleLogout}
            >
              <Image
                source={icons.logout}
                resizeMode={"contain"}
                className={"w-6 h-6"}
              />
            </TouchableOpacity>
            <View
              className={
                "w-16 h-16 border border-secondary rounded-lg justify-center items-center"
              }
            >
              <Image
                source={{
                  uri: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                }}
                className={"w-[90%] h-[90%] rounded-lg "}
                resizeMode={"cover"}
              />
            </View>
            <InfoBox
              title={"shema"}
              containerStyles={"mt-5"}
              textStyles={"text-lg"}
            />
            <View className={"mt-5 flex-row"}>
              <InfoBox
                title={"10"}
                subtitle={"Posts"}
                containerStyles={"mr-10"}
                textStyles={"text-xl"}
              />
              <InfoBox
                title={"1.2K"}
                subtitle={"Followers"}
                textStyles={"text-xl"}
              />
            </View>
          </View>
        )}

      />
    </SafeAreaView>
  );
};
export default Profile;
