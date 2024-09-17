import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import {StatusBar} from"expo-status-bar"
import { Redirect,router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import Button from "@/components/Button";
import {useSession} from "@/components/context/UserContextProvider";
export default function App() {
  const {user}=useSession()
  if (user) return  <Redirect href={"/home"}/>
  return (
    <SafeAreaView className={"bg-primary h-full"}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className={"w-full px-4 justify-center items-center min-h-[85vh]"}>
          <Image
            source={images.logo}
            className={"w-[130px] h-[84px] "}
            resizeMode={"contain"}
          />
          <Image
            source={images.cards}
            className={"max-w-[380px] w-full h-[300px]"}
            resizeMode={"contain"}
          />
          <View className={"relative mt-5"}>
            <Text className={"text-2xl font-pbold text-center text-white "}>
              Discover Endless Possibilities With{" "}
              <Text className={"text-secondary-200"}>Aora</Text>
            </Text>
            <Image
              source={images.path}
              resizeMode={"contain"}
              className={"absolute w-[136px] h-[15px] -bottom-2 -right-8"}
            />
          </View>
          <Text className={"text-sm font-pregular text-center text-gray-100 mt-7"}>
            Where creativity meets innovation:embark on a journey of limitless
            exploration with Aura.{" "}
          </Text>
            <Button
             title={"Continue with Email"}
             handlePress={()=> router.push("/sign-in")}
             containerStyles={"w-full mt-7"}
             textSytles={""}
             isLoading={false}
            />
        </View>
      </ScrollView>
        <StatusBar style={"light"} backgroundColor={"#161622"}/>
    </SafeAreaView>
  );
}
