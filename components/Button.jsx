import { View, Text, TouchableOpacity } from "react-native";

const Button = ({
  title,
  handlePress,
  containerStyles,
  textSytles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading} ? 'opacity-50 cursor-not-allowed':''`}
        disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textSytles}`}>{title}</Text>
    </TouchableOpacity>
  );
};
export default Button;
