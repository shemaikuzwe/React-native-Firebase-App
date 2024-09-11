import { View, Text, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";
import icons from "@/constants/icons";
const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View>
      <Image
        source={icon}
        resizeMode={"contain"}
        tintColor={color}
        className={"w-6 h-6"}
      />
      <Text className={`${focused} ? 'font-psemibold':'font-pregular' -ml-3 text-center`} style={{color:color}}>
        {" "}
        {name}
      </Text>
    </View>
  );
};
const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
          tabBarActiveTintColor:"#FFA001",
          tabBarInactiveTintColor:"#CDCDE0",
          tabBarStyle: {
            backgroundColor:"#161622",
              borderTopColor:"#232533",
              borderTopWidth:1,
              height:84
          }
    }}
    >
      <Tabs.Screen
        name={"home"}
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name={"home"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={"bookmark"}
        options={{
          title: "Bookmark",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.bookmark}
              color={color}
              name={"bookmark"}
              focused={focused}
            />

          ),
        }}
      />
      <Tabs.Screen
        name={"create"}
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.plus}
              color={color}
              name={"create"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={"profile"}
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              color={color}
              name={"profile"}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};
export default TabsLayout;
