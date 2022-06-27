// BURASI BİZİM COMPONENT'IMIZ

import { ButtonHTMLAttributes, HtmlHTMLAttributes, useState } from "react";
import { add, remove, toggleCompleted } from "./features/todoSlice";
import { useAppDispatch, useAppSelector } from "./store";
import {
  InputGroup,
  Input,
  Button,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import './App.css';
import { v4 } from "uuid";

function App() {
  /*
  * useAppSelector içindeki state RootState e denk geliyor aslında ve
  * RootState'i index.ts de getstate methoduyla store'dan elde ettik.
  * store içinde de todos property'si var ve o property'e todoSlice tanımlı
  * todoSlice içinde de add remove gibi reducerlarımız ve actionlarımız var
  
*/

  const todos = useAppSelector((state) => state.todos);

  //save butonuna basıldığında onClick eventi çalışacak ve texte yazılan
  const [title, setTitle] = useState("");

  const dispatch = useAppDispatch();

  const onSave = () => {
    dispatch(add(title));
    setTitle("");
  };

  const onDelete = (id: string) => {
    dispatch(remove(id));
  };
  
  // function changeColor (){
  //   let btn = document.getElementsByTagName("toggle") as HTMLCollectionOf<Element>
  //   var id = btn[1].getAttribute("id");
       
  //   // todos.map((todo)=>(
  //   //  {if (todo.id ===id) {
  //   //   if (todo.completed) {
  //   //     btn.style.backgroundColor="blue"
  //   //   }
  //   //   else{
  //   //     btn.style.backgroundColor="green"
  //   //   }
  //   }} 
    
  //   ))
   
  // }


 
  const toggle = (id: string) => {
    dispatch(toggleCompleted(id));
  
    
  };

  return (
  
    <div className="App" >
  <h1>YAPILACAKLAR LİSTESİ</h1>
      <InputGroup>
        

        <Input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          placeholder="Ne yapmak istersin ? "
        />
        <Button onClick={onSave} color="success" >
          Save
        </Button>
        
      </InputGroup>
      <ListGroup>
        {todos.map((todo) => (
          
          <ListGroupItem key={todo.id} >
            {" "}
            <span className="mark">
            <Button onClick={() => {toggle(todo.id)}}  id={v4()} className="color" style={{backgroundColor:todo.color}}>
              {todo.completed ?   <span >Yapıldı <i className="bi bi-check-lg" ></i></span>  : "Yapılmadı"}
              
            </Button>{" "}
            </span>
            {todo.title}{" "}
            <span className="remove">
            <Button onClick={() => onDelete(todo.id)} color="white" id="remove" >
              X
            </Button>
            </span>
          </ListGroupItem>
        ))}
        
      </ListGroup>
    </div>
  );
}

export default App;
