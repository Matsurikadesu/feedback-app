import { addDoc, and, collection, doc, getCountFromServer, getDoc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "./firebase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { feedbacksFetched, feedbacksFetching } from "../store/feedbacksSlice";

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

export const fetchFeedback = async (feedbackId) => {
    const result = (await getDoc(doc(db, 'feedback', feedbackId))).data();
    return result ? result : false;
}

export const addNewComment = (feedbackId, comment) => {
    addDoc(collection(db, 'feedback', feedbackId, 'comment'), comment);
}

/**
 * Хук получает feedbacks из базы данных, фильтруя их по category и сортируя их по выбраному фильтру
 * @returns массив feedbacks, отфильтрованый и отсортированый 
 */
export const useFeedbacks = (filter, sortingMethod, roadmap = false) => {
    const dispatch = useDispatch();
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
        : query(collection(db, 'feedback'), where('status', '==', 'suggestion'), orderBy(...order), limit(6));
    
    const roadmapQ = query(collection(db, 'feedback'), orderBy('upvotes', 'desc'));

    const fetchFeedbacks = async () => {
        await getDocs(roadmap ? roadmapQ : suggestionsQ).then((querySnapshot)=>{              
                const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
                setFeedbacks(newData);
                dispatch(feedbacksFetched());
            })
        }

    useEffect(() => {
        dispatch(feedbacksFetching());
        fetchFeedbacks();
        //eslint-disable-next-line
    }, [filter, sortingMethod]);

    return {
        feedbacks
    }
}

export const getFeedbacksAmountByStatus = async (status, filter = 'All') => {
    let q = null;
    const ref = collection(db, 'feedback');
    console.log(filter, '    ', status)

    filter === 'All'
        ? q = query(ref, where('status', '==', status))
        : q = query(ref, and(where('status', '==', status), where('category', '==', filter)));

    const result = await getCountFromServer(q);
    return result.data().count; 
}

/**
 * Считает количество feedbacks в базе данных по status
 * @returns обьект roadmap, который содержит status name и количество feedbacks с этим status
 */
export const getRoadmap = () => {
    const roadmap = [{name: 'planned', description: 'Ideas prioritized for research', amount: 0}, {name: 'in-progress', description: 'Currently being developed', amount: 0}, {name: 'live', description: 'Released features', amount: 0}];

    const countFeedbacks = async () => {
        const newRoadmap = await Promise.all(roadmap.map(async item => ({...item, amount: await getFeedbacksAmountByStatus(item.name)})))

        return newRoadmap;
    }

    return countFeedbacks();
}
/**
 * Обновляет количество upvotes в бд
 * @param {*} initialUpvotes текущее значение upvotes 
 * @param {*} upvotedby пользователи, нажавшие upvote
 * @param {*} id feedback id
 * @returns 
 */
export const useUpvote = (initialUpvotes, upvotedby, id) => {
    const userId = useSelector(state => state.user.id);
    const [upvotes, setUpvotes] = useState(initialUpvotes);
    const [upvotedBy, setUpvotedBy] = useState(upvotedby);

    const handleUpvote = () => {
        if(upvotedBy.includes(userId)){
            initialUpvotes = upvotes - 1;
            upvotedby = upvotedby.filter(item => item !== userId);
        }else{
            initialUpvotes = upvotes + 1;
            upvotedby.push(userId);
        }

        setUpvotedBy(upvotedby);
        setUpvotes(initialUpvotes);
        updateDoc(doc(db, 'feedback', id), {
            upvotes: initialUpvotes,
            upvotedby
        })
    }

    return {
        upvotes,
        handleUpvote,
        isUpvoted: upvotedBy.includes(userId)
    }
}