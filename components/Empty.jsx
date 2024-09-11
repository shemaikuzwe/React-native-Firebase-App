import {Image, Text, View} from "react-native";
import {images} from "../constants"
import Button from "./Button";
const Empty=({title,subtitle})=>{
      return(
        <View className={"justify-center items-center px-4"}>
          <Image
            source={images.empty}
            resizeMode={"contain"}
            className={"w-[270px] h-[215px]"}
          />
            <Text className={"font-pmedium text-sm text-gray-100"}>
                {subtitle}
            </Text>
            <Text className={"text-lg text-center mt-2  text-white font-psemibold"}>
                {title}
            </Text>
            <Button title={"Upload video"} containerStyles={"w-full my-5"}/>
        </View>
      );
    }
    export default Empty