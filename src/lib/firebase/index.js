import { addDoc, getDocs, updateDoc } from "@firebase/firestore";

export const addOne = async (collectionRef, data) => {
    try {
        const docRef = await addDoc(collectionRef, data);
        console.log("One doc added successfully !");
        return docRef.id;
    } catch (err) {
        console.log("Error occured while post : ", err);
    }
}
export const getAll = async (collectionRef) =>{
    try {
        const snapShot = await getDocs(collectionRef);
        let docsArray = [];
        snapShot?.docs?.forEach((doc) => {
            docsArray.push({ ...doc.data(), id: doc.id })
        });
        return docsArray;
    } catch (err) {
        console.log("Error occured while fetching docs : ", err);
    }
}
export const updateOne = async (docRef,data) =>{
    try {
        const response = await updateDoc(docRef, data);
        console.log({response});
    } catch (err) {
        console.log("Error occured while updating doc : ", err);
    }
}