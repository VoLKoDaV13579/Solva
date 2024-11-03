import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getStarships, getStarshipsDetails } from "../../utils/api";


interface StarshipsState {
    data: { [page: number]: any[] };
    page: number;
    isLoading: boolean;
    error: string | null;
    hasMore: boolean
    details: any;
}

const initialState: StarshipsState = {
    data: [],
    page: 1,
    isLoading: false,
    error: null,
    hasMore: true,
    details: null
}


export const fetchStarships = createAsyncThunk(
    'starships/fetchStarships',
    async (page: number, { getState, rejectWithValue }) => {
        const state = getState() as any;
        if (state.starships.data[page]) {
            return { results: state.starships.data[page], hasMore: state.starships.hasMore };
        }
        try {
            const response = await getStarships(page)
            return {
                results: response.data.results,
                hasMore: response.data.next !== null
            };
        } catch {
            return rejectWithValue('Не удалось загрузить корабли')
        }
    }
)


export const fetchStarshipDetails = createAsyncThunk(
    'starships/fetchStarshipDetails',
    async (name: string, thunkAPI) => {
        try {
            const response = await getStarshipsDetails(name)
            return response.data.results[0]
        } catch {
            return thunkAPI.rejectWithValue('Не удалось загрузить данные о корабле')
        }
    }
)
const starshipsSlice = createSlice({
    name: 'starships',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => { state.page = action.payload },
        updateStarship: (state, action) => {
            const updatedStarship = action.payload.data;
            const oldName = action.payload.oldName;
            const index = state.data[state.page].findIndex(character => character.name === oldName);
            if (index !== -1) {
                state.data[state.page][index] = updatedStarship;
            }
            if (state.details && state.details.name === oldName) {
                state.details = updatedStarship;
            }
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchStarships.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(fetchStarships.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data[state.page] = action.payload.results
                state.hasMore = action.payload.hasMore
            })
            .addCase(fetchStarships.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string;
            })
            .addCase(fetchStarshipDetails.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchStarshipDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.details = action.payload
            })
            .addCase(fetchStarshipDetails.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })

})

export const { setPage, updateStarship } = starshipsSlice.actions;
export default starshipsSlice.reducer