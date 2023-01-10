import Form from "./Form";
import EditForm from "./EditForm";
import DataContext from "../contexts/DataContext";
import { useContext } from "react";

const Library = () => {

  const {showForm, showEditForm, toggleShowForm, books, deleteBook ,toggleRead, currentlyEditing, setEdit} = useContext(DataContext);

  const cards = books.map(entry => {
    const buttonStyles = {
      backgroundColor: !entry.isRead ? "#ffb0b0" : "#59f261"
    }
    return(
      <div className="card">
        <h1 id="book-title">"{entry.title}"</h1>
        <h1>By {entry.author}</h1>
        <h1>{entry.pages} Pages</h1>
        <div className="card-buttons">
          <button
            onClick={() => {toggleRead(entry.id, entry.isRead)}}
            style={buttonStyles}
            className="toggle-read">{!entry.isRead ? "Not Read" : "Read"}
          </button>
          <button onClick={() => {deleteBook(entry.id)}}>Delete</button>
          <button onClick={() => setEdit(entry.id)}>Edit</button>

        </div>
      </div>
    );
  })

  console.log(currentlyEditing)
  return(
    <div className="library">
      <button onClick={toggleShowForm} id="add-book">Add Book</button>
      {showForm && <Form/>}
      {showEditForm && <EditForm/>}
      <div className="cards">
        {cards}
      </div>
    </div>
  )
}

export default Library;