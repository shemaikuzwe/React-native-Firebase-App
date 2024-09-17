import {collection, getDocs, query,where, setDoc, doc, getDoc} from "firebase/firestore";
import { db } from "../firebaseConfig";
import {app} from "../firebaseConfig"
import {getAuth, signOut} from "firebase/auth"
import {uploadImage, uploadVideo} from "./upload";

export async function getUser(email){
try {
    const query= doc(db,"users",email);
    const querySnap=await getDoc(query);
    if (querySnap.exists()){
        return querySnap.data();
    }
}catch (err){
    throw  err
}
}
export async function createUser(email, password,username){
    await setDoc(doc(db,"users",`${Date.now()}`),{
        email,
        password,
        username
    })
}

const table = collection(db, "videos");
const auth=getAuth(app)


export const getVideos = async () => {
  try {
    const query = await getDocs(table);
    const videos = query.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return videos;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getSearchVideo=async (titleQuery)=>{
  try {
    const q= query(collection(db,"videos"), where("title","array-contains",titleQuery));
    const result=await getDocs(q);
    const videos=result.docs.map((doc)=>({
      id:doc.id,
      ...doc.data()
    }));
   return videos;
  }catch (e){
    throw new Error(e)
  }
}

export const Logout=async ()=>{

  try {
   await signOut(auth)
  }catch (e) {
    throw new Error(e)
  }
}
export const uploadPost=async (formData)=>{
  try {
   const {thumbnail,video,title,prompt}=formData;
    console.log(video.uri)
    const videoUrl=await uploadVideo(video.uri)
    const thumbnailUrl=await uploadImage(thumbnail.uri)
     await setDoc(doc(db,"videos",`${Date.now()}`),{
       title,
       prompt,
       video,
       thumbnail
     })
    return true;
  }catch (e) {
    throw new Error(e)
  }
}