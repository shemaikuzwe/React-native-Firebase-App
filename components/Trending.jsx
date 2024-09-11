import {FlatList, Text, View} from "react-native";

const Trending=({posts})=>{
    return(
        <FlatList
            data={posts}
            renderItem={(item)=>(
                <Text className={"text-2xl text-white"}>{item.id}</Text>
            )}
           keyExtractor={(item)=>item.id}
           horizontal
        />
    )
}
export default Trending