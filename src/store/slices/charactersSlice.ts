import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCharacterDetails, getCharacters } from "../../utils/api";

interface CharactersState {
    data: { [page: number]: any[] };
    page: number;
    isLoading: boolean;
    error: string | null;
    details: any | null;
    hasMore: boolean;
}

const initialState: CharactersState = {
    data: {},
    page: 1,
    isLoading: false,
    error: null,
    details: null,
    hasMore: true,
};


export const fetchCharacters = createAsyncThunk(
    'characters/fetchCharacters',
    async (page: number, { getState, rejectWithValue }) => {
        const state = getState() as any;
        if (state.characters.data[page]) {
            return { results: state.characters.data[page], hasMore: state.characters.hasMore };
        }
        try {
            const response = await getCharacters(page);
            return {
                results: response.data.results,
                hasMore: response.data.next !== null
            };
        } catch {
            return rejectWithValue('Не удалось загрузить персонажей');
        }
    }
);


export const fetchCharacterDetails = createAsyncThunk(
    'characters/fetchCharacterDetails',
    async (name: string, thunkAPI) => {
        try {
            const response = await getCharacterDetails(name)
            return response.data.results[0]
        } catch {
            return thunkAPI.rejectWithValue('Не удалось загрузить данные перпсонажа')
        }
    }
)

const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        updateCharacter: (state, action) => {
            const updatedCharacter = action.payload.data;
            const oldName = action.payload.oldName;
            const index = state.data[state.page].findIndex(character => character.name === oldName);
            if (index !== -1) {
                state.data[state.page][index] = updatedCharacter;
            }
            if (state.details && state.details.name === oldName) {
                state.details = updatedCharacter;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharacters.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCharacters.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data[state.page] = action.payload.results; 
                state.hasMore = action.payload.hasMore;
            })
            .addCase(fetchCharacters.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchCharacterDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCharacterDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.details = action.payload
            })
            .addCase(fetchCharacterDetails.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            });
    }
});

export const { setPage, updateCharacter } = charactersSlice.actions;
export default charactersSlice.reducer;
