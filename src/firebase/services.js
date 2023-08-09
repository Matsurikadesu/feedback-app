import { addDoc, and, collection, doc, getCountFromServer, getDoc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "./firebase";
import { useEffect, useState } from "react";

/** 
 * Функция добавляет новый коментарий в базу данных
 * @param {*} feedbackId id фидбека к которому добавляется коментарий
 * @param {*} parentId id коментария к которому добавляется ответ
 * @param {*} comment обьект коментария
 */
export const addNewNestedComment = (feedbackId, parentId, comment) => {
    addDoc(collection(db, 'feedback', feedbackId, 'comments', parentId, 'nestedcomments'), comment);
}

export const updateFeedback = (feedbackId, changes) => {
    updateDoc(doc(db, 'feedback', feedbackId), changes);
}

/**
 * Хук получает feedbacks из базы данных, фильтруя их по category и сортируя их по выбраному фильтру
 * @returns массив feedbacks, отфильтрованый и отсортированый 
 */
export const useFeedbacks = (filter, sortingMethod, roadmap = false) => {
    const [feedbacks, setFeedbacks] = useState([]);

    //подготовка массива с конфигурацией orderBy
    let order = [];
    switch(sortingMethod){
        case 'Most Upvotes':
            order = ['upvotes', 'desc'];
            break;
        case 'Least Upvotes':
            order = ['upvotes'];
            break;
        case 'Most Comments':
            order = ['comments', 'desc'];
            break;
        case 'Least Comments':
            order = ['comments'];
            break;
        default:
            order = ['upvotes', 'desc'];
            break;
    }

    const suggestionsQ = filter !== 'All' 
        ? query(collection(db, 'feedback'), and(
            where('category', '==', filter),
            where('status', '==', 'suggestion')
        ), orderBy('category'), orderBy(...order), limit(6))
        : query(collection(db, 'feedback'), where('status', '==', 'suggestion'), orderBy(...order), limit(6))
    
    const roadmapQ = query(collection(db, 'feedback'), orderBy('upvotes', 'desc'));

    const fetchFeedbacks = async () => {
        await getDocs(roadmap ? roadmapQ : suggestionsQ).then((querySnapshot)=>{              
                const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
                setFeedbacks(newData);
            })
        }

    useEffect(() => {
        fetchFeedbacks();
        //eslint-disable-next-line
    }, [filter, sortingMethod]);

    return {
        feedbacks
    }
}
/**
 * Считает количество feedbacks в базе данных по status
 * @returns обьект roadmap, который содержит status name и количество feedbacks с этим status
 */
export const getRoadmap = () => {
    const roadmap = [{name: 'planned', description: 'Ideas prioritized for research', amount: 0}, {name: 'in-progress', description: 'Currently being developed', amount: 0}, {name: 'live', description: 'Released features', amount: 0}];

    const getFeedbacksAmountByStatus = async (status) => {
        const q = query(collection(db, 'feedback'), where('status', '==', status));
        const result = await getCountFromServer(q);
        return result.data().count; 
    }

    const countFeedbacks = async () => {
        const newRoadmap = await Promise.all(roadmap.map(async item => ({...item, amount: await getFeedbacksAmountByStatus(item.name)})))

        return newRoadmap;
    }

    return countFeedbacks();
}

export const fetchFeedback = async (feedbackId) => {
    const result = (await getDoc(doc(db, 'feedback', feedbackId))).data();
    return result ? result : false;
}

export const addNewComment = (feedbackId, comment) => {
    addDoc(collection(db, 'feedback', feedbackId, 'comment'), comment);
}