import "../App.css";
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Todo = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);

    // const addTodo = async (e) => {
    //     e.preventDefault();  

    //     try {
    //         const docRef = await addDoc(collection(db, "todos"), {
    //             todo: todo,    
    //         });
    //         console.log("Document written with ID: ", docRef.id);
    //     } catch (e) {
    //         console.error("Error adding document: ", e);
    //     }
    // }

    const fetchPost = async () => {
        await getDocs(collection(db, "users"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setTodos(newData);            
            })
    }

    useEffect(()=>{
        fetchPost();

        // eslint-disable-next-line
    }, [])

    return (
        <section className="todo-container">

        </section>
    )
}

export default Todo