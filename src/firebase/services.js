import { addDoc, and, collection, deleteDoc, doc, getCountFromServer, getDoc, getDocs, limit, orderBy, query, startAfter, updateDoc, where } from "firebase/firestore";
import { db } from "./firebase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { feedbacksFetched, feedbacksFetching, feedbacksLoaded } from "../store/feedbacksSlice";

export const updateFeedback = async (feedbackId, changes) => {
    return await updateDoc(doc(db, 'feedback', feedbackId), changes);
}

export const addNewFeedback = async (feedback) => {
    return await addDoc(collection(db, "feedback"), feedback);
}

export const deleteFeedback = async (feedbackId) => {
    return await deleteDoc(doc(db, `feedback/${feedbackId}`));
}

export const fetchFeedback = async (feedbackId) => {
    const getCommentsAmount = async (feedbackId) => {
        const ref = collection(db, 'feedback', feedbackId, 'comments');
        const result = await getCountFromServer(ref);

        return result.data().count; 
    }

    const result = await getDoc(doc(db, 'feedback', feedbackId))
        .then(async doc => ({
            ...doc.data(), 
            id: doc.id, 
            comments: await getCommentsAmount(feedbackId)
        }));

    return result ? result : false;
}

export const addNewComment = async (feedbackId, comment) => {
    return await addDoc(collection(db, 'feedback', feedbackId, 'comments'), comment).then((data) => data.id);
}

export const fetchRoadmapFeedbacks = async () => {
    const getCommentsAmount = async (feedbackId) => {
        const ref = collection(db, 'feedback', feedbackId, 'comments');
        const result = await getCountFromServer(ref);

        return result.data().count; 
    }

    const q = query(collection(db, 'feedback'), where('status', '!=', 'suggestion'), orderBy('status'), orderBy('upvotes', 'desc'));
    const roadmapFeedbacks = await getDocs(q)
        .then(async (querySnapshot) => {              
            return await Promise.all(querySnapshot.docs.map(async (doc) => ({
                    ...doc.data(), 
                    id: doc.id, 
                    comments: await getCommentsAmount(doc.id) 
                }))
            );
        })

    return roadmapFeedbacks;
}

/**
 * Хук получает feedbacks из базы данных, фильтруя их по category и сортируя их по выбраному фильтру. Полученый массив помещается в store
 * 
 */
export const useFeedbacks = (filter, sortingMethod, roadmap = false) => {
    const dispatch = useDispatch();
    const [lastVisible, setLastVisible] = useState(null);

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

    const q = filter !== 'All' 
        ? query(collection(db, 'feedback'), and(
            where('category', '==', filter),
            where('status', '==', 'suggestion')
        ), orderBy('category'), orderBy(...order), limit(6))
        : query(collection(db, 'feedback'), where('status', '==', 'suggestion'), orderBy(...order), limit(6));

    const getCommentsAmount = async (feedbackId) => {
        const ref = collection(db, 'feedback', feedbackId, 'comments');
        const result = await getCountFromServer(ref);

        return result.data().count; 
    }

    const fetchFeedbacks = async () => {
        await getDocs(q).then(async (querySnapshot)=>{              
            const newData = await Promise.all(querySnapshot.docs.map(async (doc) => ({
                    ...doc.data(), 
                    id: doc.id, 
                    comments: await getCommentsAmount(doc.id) 
                }))
            );

            dispatch(feedbacksFetched(newData));
            setLastVisible(querySnapshot.docs[newData.length - 1]);
        })}

    useEffect(() => {
        dispatch(feedbacksFetching());
        fetchFeedbacks();
        //eslint-disable-next-line
    }, [filter, sortingMethod]);

    const fetchAdditionalFeedbacks = async () => {
        const q = query(collection(db, 'feedback'), 
            where('status', '==', 'suggestion'), 
            orderBy(...order), 
            startAfter(lastVisible), 
            limit(6));

        await getDocs(q).then((querySnapshot) => {
            const newFeedbacks = querySnapshot.docs.map(item => ({...item.data(), id: item.id}));

            dispatch(feedbacksLoaded(newFeedbacks));
            setLastVisible(querySnapshot.docs[newFeedbacks.length - 1]);
        })
    }

    return {
        fetchAdditionalFeedbacks
    }
}

export const getFeedbacksAmountByStatus = async (status, filter = 'All') => {
    let q = null;
    const ref = collection(db, 'feedback');

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
    const roadmap = [
        {name: 'planned', description: 'Ideas prioritized for research', amount: 0}, 
        {name: 'in-progress', description: 'Currently being developed', amount: 0}, 
        {name: 'live', description: 'Released features', amount: 0}
    ];

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
        let newUpvotedBy = upvotedBy.filter(item => item);
        let newUpvotes = upvotes;

        if(upvotedBy.includes(userId)){
            newUpvotes = upvotes - 1;
            newUpvotedBy = upvotedBy.filter(item => item !== userId);
        }else{
            newUpvotes = upvotes + 1;
            newUpvotedBy.push(userId);
        }

        setUpvotedBy(newUpvotedBy);
        setUpvotes(newUpvotes);
        updateDoc(doc(db, 'feedback', id), {
            upvotes: newUpvotes,
            upvotedby: newUpvotedBy
        })
    }

    return {
        upvotes,
        handleUpvote,
        isUpvoted: upvotedBy.includes(userId)
    }
}

export const fetchComments = async (feedbackId) => {
    const fetchUserData = async (userId) => {
        return await getDoc(doc(db, 'users', userId)).then(doc => ({...doc.data(), id: doc.id}));
    }

    const q = query(collection(db, 'feedback', feedbackId, 'comments'), orderBy('timestamp'));
    const fetchedComments = await getDocs(q).then(async (querySnapshot) => {
        return await Promise.all(querySnapshot.docs.map(async (doc) => {
            return {
                ...doc.data(),
                id: doc.id,
                user: await fetchUserData(doc.data().user) 
            };
        }))
    })
    
    return fetchedComments;
}