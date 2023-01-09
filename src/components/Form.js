import DataContext from "../contexts/DataContext";
import { useContext } from "react";

const Form = () => {
  const {formData, handleFormChange, addBook ,toggleShowForm} = useContext(DataContext);
  console.log(formData);
  return(
    <div className="form">
      <h1 id="form-title">Add Book</h1>
      <div className="form-inputs">
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={(e) => {handleFormChange(e)}}
        />
        <input
          type="text"
          placeholder="Author"
          name="author"
          value={formData.author}
          onChange={(e) => {handleFormChange(e)}}
        />
        <input
          type="number"
          placeholder="Number of Pages"
          name="pages"
          value={formData.pages}
          onChange={(e) => {handleFormChange(e)}}
        />
      </div>
      
      <div className="form-buttons">
        <button onClick={addBook}>Confirm</button>
        <button onClick={toggleShowForm}>Cancel</button>
      </div>
    </div>
  )
}

export default Form;