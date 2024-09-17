import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { icons } from "../../constants";
import Button from "../../components/Button";
import * as DocumentPicker from "expo-document-picker";
import {uploadPost} from "../../lib/action";
import {router} from "expo-router";

const Create = () => {
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });
  const [loading, setLoading] = useState(false);
  const openPicker = async (Dtype) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        Dtype === "image" ? ["image/png,image/jpg"] : ["video/mp4", "video/gif"],
    });
    if (!result.canceled) {
      if (Dtype == "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (Dtype == "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document Picked", JSON.stringify(result, null, 2));
      }, [100]);
    }
  };

  const handleSubmit = async () => {
    if (!form.video || !form.title || !form.thumbnail || form.prompt) {
      return Alert.alert("Please fill in all fields.");
    }
    try {
      setLoading(true);
      const upload=await uploadPost(form);
      if (upload){
        setLoading(false)
        Alert.alert("success","image uploaded")
        setTimeout(()=>{
          return router.replace("/home")
        },200)
      }
    } catch (e) {
      setLoading(false);
      Alert.alert("Eror while uploading");
    } finally {
      setLoading(false);
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
    }
  };
  return (
    <SafeAreaView className={"bg-primary h-full"}>
      <ScrollView className={"px-4 my-6"}>
        <Text className={"text-2xl text-white font-psemibold"}>
          Upload Video
        </Text>
        <FormField
          title={"Video title"}
          value={form.title}
          placeholder={"Enter Video title"}
          handleChange={(e) => setForm({ ...form, title: e })}
          otherStyles={"mt-10"}
        />
        <View className={"mt-7 space-y-2"}>
          <Text className={"text-base text-gray-100 font-pmedium"}>
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className={"w-full h-64 rounded-2xl"}
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View
                className={
                  "w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center border border-black-200 "
                }
              >
                <View
                  className={
                    "w-14 h-14 border border-secondary-100 justify-center items-center border-dashed"
                  }
                >
                  <Image
                    source={icons.upload}
                    resizeMode={"contain"}
                    className={"w-1/2 h-1/2"}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
          <View className={"mt-7 space-y-2"}>
            <Text className={"text-base text-gray-100 font-pmedium"}>
              Thumbnail Image
            </Text>
            <TouchableOpacity onPress={() => openPicker("image")}>
              {form.thumbnail ? (
                <Image
                  source={{ uri: form.thumbnail.uri }}
                  resizeMode={"cover"}
                  className={"w-full h-64 rounded-2xl  "}
                />
              ) : (
                <View
                  className={
                    "w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200"
                  }
                >
                  <Image
                    source={icons.upload}
                    resizeMode={"contain"}
                    className={"w-5 h-5 "}
                  />
                  <Text className={"text-sm text-gray-100 font-pmedium "}>
                    Choose a file
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

        <FormField
          title={"Ai prompt"}
          value={form.prompt}
          placeholder={"Enter prompt used to create video"}
          handleChange={(e) => setForm({ ...form, prompt: e })}
          otherStyles={"mt-7"}
        />
        <Button
          title={"Submit & Publish "}
          handlePress={handleSubmit}
          containerStyles={"mt-7"}
          isLoading={loading}
        />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Create;
