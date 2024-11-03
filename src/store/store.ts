import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice"
import charactersSlice from "./slices/charactersSlice"
import planetSlice from "./slices/planetsSlice"
import starshipsSlice from "./slices/starshipsSlice"
const store = configureStore({
  reducer: {
    auth: authSlice,
    characters: charactersSlice,
    planets: planetSlice,
    starships: starshipsSlice
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store