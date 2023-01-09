
import { useState, createContext, useEffect } from "react"
import {db} from '../firebase-config';
import {collection, addDoc, updateDoc, doc, deleteDoc, onSnapshot} from 'firebase/firestore'

const DataContext = createContext();
export const DataProvider = ({children}) =>{
  const [formData, setFormData] = useState({title: '', author: '', pages: ''});
  const [showForm, setShowForm] = useState(false);
  const [books, setBooks] = useState([]);
  const bookCollectionRef = collection(db, "books");

  const toggleShowForm = () =>{
    setShowForm(prevShow => {return !prevShow});
  }

  const handleFormChange = (event) => {
    const {name, type, checked, value} = event.target;
    setFormData(prevData => {
      return {...prevData,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }
  
  const addBook = () => {
    addDoc(bookCollectionRef, {title: formData.title, author: formData.author, pages: Number(formData.pages), isRead:false})
    toggleShowForm();
  }

  const deleteBook = (id) => {
    const bookDoc = doc(db, "books", id);
    deleteDoc(bookDoc);
  }

  const toggleRead = (id, isRead) => {
    const bookDoc = doc(db, "books", id);
    const isReadField = {isRead: !isRead};
    updateDoc(bookDoc, isReadField);
  }

  useEffect(() => {
    const getBooks = async() =>{
      await onSnapshot(bookCollectionRef, (books) =>{
        setBooks(books.docs.map((book) => ({...book.data(), id:book.id})))
      })
    }

    getBooks();
  },[])

  return(
    <DataContext.Provider value={{formData, showForm, toggleShowForm, handleFormChange, books, addBook,deleteBook, toggleRead}}>{children}</DataContext.Provider>
  )
}

export default DataContext;