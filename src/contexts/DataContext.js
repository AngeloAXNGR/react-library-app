
import { useState, createContext, useEffect } from "react"
import {db} from '../firebase-config';
import {collection, addDoc, updateDoc, doc, deleteDoc, onSnapshot} from 'firebase/firestore'

const DataContext = createContext();
export const DataProvider = ({children}) =>{
  const [formData, setFormData] = useState({title: '', author: '', pages: ''});
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [books, setBooks] = useState([]);
  const [currentlyEditing, setCurrentlyEditing] = useState(() => {return null});
  const bookCollectionRef = collection(db, "books");

  const toggleShowForm = () =>{
    setShowForm(prevShow => {return !prevShow});
    setFormData({title: '', author: '', pages: ''});
  }

  const handleFormChange = (event) => {
    const {name, type, checked, value} = event.target;
    setFormData(prevData => {
      return {...prevData,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }

  const setEdit = (id) =>{
    setCurrentlyEditing(id);
    toggleShowEditForm();
  }

  const toggleShowEditForm = () => {
    setShowEditForm(prevShow => {return !prevShow});
    setFormData({title: '', author: '', pages: ''});
  }
  
  const addBook = () => {
    addDoc(bookCollectionRef, {title: formData.title, author: formData.author, pages: Number(formData.pages), isRead:false})
    toggleShowForm();
  }

  const deleteBook = (id) => {
    const bookDoc = doc(db, "books", id);
    deleteDoc(bookDoc);
  }

  const updateBook = () => {
    const currentBook = books.find(book => book.id === currentlyEditing)
    const newBookFields = {title: formData.title, author: formData.author, pages: Number(formData.pages), isRead:currentBook.isRead}
    const bookDoc = doc(db, "books", currentBook.id);
    updateDoc(bookDoc,newBookFields);
    toggleShowEditForm();
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
    <DataContext.Provider 
      value={
        {
          formData, 
          showForm, 
          showEditForm,
          toggleShowForm,
          toggleShowEditForm, 
          handleFormChange, 
          books, 
          addBook,
          deleteBook, 
          updateBook,
          currentlyEditing,
          setEdit,
          toggleRead}}>{children}</DataContext.Provider>
  )
}

export default DataContext;