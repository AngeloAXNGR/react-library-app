import Form from "./Form";
import DataContext from "../contexts/DataContext";
import { useContext } from "react";

const Library = () => {

  const {showForm, toggleShowForm, books, deleteBook ,toggleRead} = useContext(DataContext);

  const cards = books.map(entry => {
    const buttonStyles = {
      backgroundColor: !entry.isRead ? "#ffb0b0" : "#59f261"
    }
    return(
      <div className="card">
        <h1 id="book-title">{entry.title}</h1>
        <h1>{entry.author}</h1>
        <h1>{entry.pages}</h1>
        <button 
          onClick={() => {toggleRead(entry.id, entry.isRead)}}
          style={buttonStyles} 
          className="toggle-read">{!entry.isRead ? "Not Read" : "Read"}
        </button>
        <button onClick={() => {deleteBook(entry.id)}}>Delete</button>
      </div>
    );
  })

  return(
    <div className="library">
      <button onClick={toggleShowForm} id="add-book">Add Book</button>
      {showForm && <Form/>}
      <div className="cards">
        {cards}
      </div>
    </div>
  )
}

export default Library;