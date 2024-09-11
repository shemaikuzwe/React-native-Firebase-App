import {View,Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useLocalSearchParams} from "expo-router";

const Query=()=>{
        const{query} =useLocalSearchParams()
    return(
        <SafeAreaView className={"h-full bg-primary"}>
            <Text>Query</Text>
        </SafeAreaView>
    )
}
export default Query;