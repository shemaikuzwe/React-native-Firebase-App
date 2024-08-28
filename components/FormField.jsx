import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { icons } from "../constants";
const FormField = ({
  title,
  value,
  handleChange,
  otherStyles,
  keyboardType,
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className={"text-base text-gray-100 font-pmedium capitalize"}>
        {title}
      </Text>
      <View
        className={`w-full border-2 h-16 px-4 py-2 border-black-200 bg-black-100 rounded-2xl focus:border-secondary flex-row`}
      >
        <TextInput
          value={value}
          className={"flex-1 text-white text-base font-psemibold"}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChange}
          secureTextEntry={title == "password" && !showPassword}
        />
        {title == "password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className={"w-6 h-6 "}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default FormField;
