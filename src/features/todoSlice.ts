//sliceları features klasörün içine atıyoruz
//isterseniz her bir slice'ı için ayrı klasör açabilirsiniz
// ÖNEMLİ !!!
//slice metoduyla eski reduxta actions ve reducers klasörleri içerisindeki herşeyi tek bir yerde toplamış olacam
import { v4 } from "uuid";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//typelarımızı oluşturuyoruz
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
 color:string;
}

const initialState: Todo[] = [];

//createSlice metodu obje girmemizi istiyor

const todoSlice = createSlice({
    //name : global state'ımız var bunun içerisindeki todoSlice olarak tanımladığımız slice'ın ismini
    //global state içerisinde todos olarak tanımlıyoruz
    //yani global state'mizin içerisinde adı todos olan ve oda todoSlice'a denk gelen bir slice'ımız var
  name: "todos",
  initialState,

  //oluşturmak istediğimiz actionları ve reducerları buraya yazıyoruz
  reducers: {
    add: (state, action: PayloadAction<string>) => {
        /*  
            * klasik reduxta ki gibi action type'larını payload'un typelarını yazmaya gerek kalmadı toolkit ile.

            * v4() uuid den gelen bir paket , amacı güvenli string random karakterler oluşturarak 
            * hem benzersiz olmasını garanti etmek için extra efor sarfetmemiz gerekmiyor 
            * hem de tahmin edilmesi zor olduğu için güvenlik endişelerinden bizi kurtarır
            * burdaki payload actiondan gelen veriyi title aktar demek 
            * örneğin kaydet butonuna tıkladığımızda action add'e tekabul edecek
            * ve içerisindeki veriyi title'a kaydetcek ve newTodo yu state'e ekleyecek.
        */
      const newTodo = { id: v4(), title: action.payload, completed: false ,color:"gray"};
      state.push(newTodo);
    },
    remove: (state, action: PayloadAction<string>) => {
        //gelen action içinde id ile array içindeki id eşleşmeyenleri filtrele ve yeni bir array oluştur demek.
      return state.filter((todo) => todo.id !== action.payload);
    },

    toggleCompleted: (state, action: PayloadAction<string>) => {
      return  state.map((todo) =>
        (todo.id !== action.payload)
        ? todo
          :  (todo.completed==false) 
          ? { ...todo, completed: !todo.completed, color:"green"} 
          : { ...todo, completed: !todo.completed, color:"gray"}
      );
    
    },

 
   
  },
});

// todoSlice içindeki reducer'ı export ediyoruz
export default todoSlice.reducer;

//reducer bir onje ve içerisindeki metotları todoSlice.actions diyerek çekiyoruz ve onu
// bir add,remove,toggleCompleted değişkenlerine Destructuring ediyoruz. 
//sonrada onları component'larda kullanmak için exportluyoruz.
export const { add, remove,toggleCompleted } = todoSlice.actions;
