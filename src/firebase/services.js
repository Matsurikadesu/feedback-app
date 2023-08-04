import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

/** 
 * Функция добавляет новый коментарий в базу данных
 * @param {*} feedbackId id фидбека к которому добавляется коментарий
 * @param {*} parentId id коментария к которому добавляется ответ
 * @param {*} comment обьект коментария
 */
export const addNewComment = (feedbackId, parentId, comment) => {
    addDoc(collection(db, 'feedback', feedbackId, 'comments', parentId, 'nestedcomments'), comment);
}

export const updateFeedback = (feedbackId, changes) => {
    updateDoc(doc(db, 'feedback', feedbackId), changes);
}