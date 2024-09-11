import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";
const SearchInput = ({
  title,
  value,
  handleChange,
  otherStyles,
  keyboardType,
  placeholder,
  ...props
}) => {

  return (
      <View
        className={`w-full  flex-1 justify-between items-center border-2 h-16 px-4 py-2 border-black-200 bg-black-100 rounded-2xl focus:border-secondary flex-row`}
      >
        <TextInput
          value={value}
          className={"w-56 text-white font-pregular text-sm "}
          placeholder={"Search a video topic"}
          placeholderTextColor={"#7b7b8b"}
        />
         <TouchableOpacity>
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
