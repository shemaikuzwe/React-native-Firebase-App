import { storage, db } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";

export const uploadImage = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const storageRef = ref(storage, `images/${Date.now()}.jpg`);
  //upload image
  uploadBytes(storageRef, blob)
    .then(async (snapshot) => {
      console.log("uploaded image");
      const downloadUrl = await getDownloadURL(snapshot.ref);
      // await setDoc(doc(db, "images", `${Date.now()}`), {
      //   url: downloadUrl,
      //   createdAt: Date.now(),
      // });
        return downloadUrl;
    })
    .catch((err) => {
      throw err
    });
};
export const uploadVideo = async (uri) => {
    const response = await fetch(uri);
    const blob=response.blob()
    uploadBytes(storage,blob).then(async (snapshot)=>{
        const downloadUrl=await getDownloadURL(snapshot.ref);
        // await  setDoc((doc(db,"videos",`${Date.now()}`)),{
        //     url: downloadUrl,
        //     createdAt: Date.now(),
        // })
        return downloadUrl;
    }).catch(err=>{
        throw err
    })
};
