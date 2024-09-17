import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, View, Text, Alert } from "react-native";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import { useState } from "react";
import Button from "../../components/Button";
import { Link, router } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebaseConfig";
import { useSession } from "../../components/context/UserContextProvider";

const signIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useSession();
  const auth = getAuth(app);

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      return Alert.alert("error", "Please fill in all fields.");
    }
    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password,
      );
      setUser(userCredential.user);
      setIsLoading(false);

      return router.push("/home");
    } catch (e) {
      setIsLoading(false);
      Alert.alert("error", e.message);
    }
  };
  return (
    <SafeAreaView className={"bg-primary h-full"}>
      <ScrollView>
        <View className={"w-full px-4 justify-center  min-h-[85vh] my-6"}>
          <Image
            source={images.logo}
            resizeMode={"contain"}
            className={"w-[115px] h-[35px] "}
          />
          <Text
            className={"text-2xl font-psemibold  text-center text-white mt-10"}
          >
            Login to Aora
          </Text>
          <FormField
            title={"email"}
            value={form.email}
            handleChange={(e) =>
              setForm({
                ...form,
                email: e,
              })
            }
            keyboardType="email-address"
            otherStyles={"mt-7"}
            placeholder={"Enter your email"}
          />
          <FormField
            title={"password"}
            value={form.password}
            handleChange={(e) =>
              setForm({
                ...form,
                password: e,
              })
            }
            placeholder={"Enter your password"}
            otherStyles={"mt-7"}
          />
          <Button
            title={"Sign in"}
            handlePress={handleSubmit}
            containerStyles={"mt-7"}
            isLoading={isLoading}
          />
          <View className={"justify-center pt-5 flex-row gap-2 "}>
            <Text className={"text-lg text-gray-100  font-pregular"}>
              Don't have account
            </Text>
            <Link
              href={"/sign-up"}
              className={"text-lg font-psemibold text-secondary"}
            >
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default signIn;
