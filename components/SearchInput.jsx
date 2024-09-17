import {Alert, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import { icons } from "../constants";
import {router, usePathname} from "expo-router";
import {useState} from "react";
const SearchInput = ({
  handleChange,
 initialQuery,
  placeholder,
  ...props
}) => {
   const pathname=usePathname()
    const [query ,setQuery  ] = useState(initialQuery || "")
  return (
      <View
        className={`w-full  flex-1 justify-between items-center border-2 h-16 px-4 py-2 border-black-200 bg-black-100 rounded-2xl focus:border-secondary flex-row`}
      >
        <TextInput
          value={query}
          className={"w-56 text-white font-pregular text-sm "}
          placeholder={"Search a video topic"}
          placeholderTextColor={"#CDCDE0"}
          onChangeText={(event)=> setQuery(event)}
        />
         <TouchableOpacity onPress={()=>{
             if (!query){
                 return Alert.alert("error","Please input something");
             }
             if (pathname.startsWith("/search")){
                 router.setParams({query})
             }
             else{
                 router.push(`/search/${query}`)
             }
         }}>
           <Image
            source={icons.search}
            className={"w-5 h-5"}
            resizeMode={"contain"}
           />
         </TouchableOpacity>
      </View>

  );
};
export default SearchInput;
