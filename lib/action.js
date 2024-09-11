import {collection,getDocs} from "firebase/firestore"
import {db} from "../firebaseConfig";
const table=collection(db,"videos");
export const getVideos=async ()=>{
  try {
      const vidoes=await getDocs(table)
    return  vidoes;
  }catch (e){
      console.log(e)
      return  null
  }

}