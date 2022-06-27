import { configureStore, Store } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import todoSlice from "../features/todoSlice";

const store = configureStore({
    reducer : {
        //buraya oluşturduğumuz bütün slicelardan gelen reducerları gircez
        //slicelar 2 türlü export yapılır 1 . reducer export 2. action export

        todos:todoSlice
    },
})

export default store;

//projemizi typescript ile kurduğumuz için 4 tane export yapmamız gerekiyor

//Rootstate bizim global statemizin type'ını tanımlayacak. ReturnType typescript'inden gelen özellik
//yukarda reducer içine slice'lardan gelen statelerin type'ları alınıyor ve otomatik RootState olarak döndürülüyor
export type RootState = ReturnType<typeof store.getState>;

//
export type AppDispatch = typeof store.dispatch;

//2 metot giriyoruz şimdi , useAppDispatch bizim oluşturduğumuz fonksiyon
//hookların typelı hali
//useDispatch metodu reduxtan geliyor , useAppDispatch her kullandığımızda artık type girmemize gerek kalmıcak
export const useAppDispatch = () => useDispatch<AppDispatch>();

//const todos = useSelector((state:RootState)=>)
//TypedUseSelectorHook ve useSelector reduxtan geliyor 
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;