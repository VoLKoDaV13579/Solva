import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPlanetDetails, getPlanets } from "../../utils/api";

export interface PlanetsState {
    data: { [page: number]: any[] };
    page: number;
    isLoading: boolean;
    details: any | null;
    error: string | null;
    hasMore: boolean;
}

const initialState: PlanetsState = {
    data: {},
    page: 1,
    isLoading: false,
    details: null,
    error: null,
    hasMore: true,
};

export const fetchPlanets = createAsyncThunk(
    'planets/fetchPlanets',
    async (page: number, { getState, rejectWithValue }) => {
        const state = getState() as any;
        if (state.planets.data[page]) {
            return { results: state.planets.data[page], hasMore: state.planets.hasMore };
        }
        try {
            const response = await getPlanets(page);
            return {
                results: response.data.results,
                hasMore: response.data.next !== null,
            };
        } catch {
            return rejectWithValue('Не удалось загрузить планеты');
        }
    }
);

export const fetchPlanetDetails = createAsyncThunk(
    'planets/fetchPlanetDetails',
    async (name: string, thunkAPI) => {
        try {
            const response = await getPlanetDetails(name);
            return response.data.results[0];
        } catch {
            return thunkAPI.rejectWithValue('Не удалось загрузить информацию о планете.');
        }
    }
);

const planetsSlice = createSlice({
    name: 'planets',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        updatePlanet: (state, action) => {
            const updatedPlanet = action.payload.data;
            const oldName = action.payload.oldName;
            const index = state.data[state.page].findIndex(planet => planet.name === oldName)
            if (index !== -1) {
                state.data[state.page][index] = updatedPlanet
            }
            if (state.details && state.details.name === oldName) {
                state.details = updatedPlanet
            }
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchPlanets.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPlanets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data[state.page] = action.payload.results;
                state.hasMore = action.payload.hasMore;
            })
            .addCase(fetchPlanets.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchPlanetDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPlanetDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.details = action.payload;
            })
            .addCase(fetchPlanetDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            }),
});

export const { setPage , updatePlanet} = planetsSlice.actions;
export default planetsSlice.reducer;
