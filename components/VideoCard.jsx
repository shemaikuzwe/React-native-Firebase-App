import {Image, View} from "react-native";

export default function VideoCard({video:{title,thumbnail,video},creator:{username,avatar}}){

    return(
        <View className={"flex-col px-4 items-center mb-14"}>
            <View className={"flex-row gap-3 items-start"}>
               <View className={"flex-row flex-1 justify-center items-center"}>
                   <View className={"w-[46px] h-[46px] rounded-lg border-secondary justify-center items-center p-0.5"}>
                       <Image
                        className={"w-full h-full rounded-lg"}
                        resizeMode={"cover"}
                       />
                   </View>
               </View>
            </View>
            <Text className={"text-2xl text-white"}>{title}</Text>
        </View>
    )
}