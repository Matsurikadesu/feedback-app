import { addDoc, collection, doc, getCountFromServer, getDoc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "./firebase";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
export const useFeedbacks = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const filter = useSelector(state => state.filter);
    const sortingMethod = useSelector(state => state.sortingMethod);
    
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
    //Подготовка массива с конфигурацией where
    const whereQuery = ['category', '==', filter];
    if(filter === 'All') whereQuery[1] = '!=';

    const ref = query(collection(db, 'feedback'), where(...whereQuery), orderBy('category'), orderBy(...order), limit(6));

    const fetchFeedbacks = async () => {
        await getDocs(ref).then((querySnapshot)=>{              
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
    const roadmap = [{name: 'planned', amount: 0}, {name: 'in-progress', amount: 0}, {name: 'live', amount: 0}];

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
    return (await getDoc(doc(db, 'feedback', feedbackId))).data();
}

export const addNewComment = (feedbackId, comment) => {
    addDoc(collection(db, 'feedback', feedbackId, 'comment'), comment);
}