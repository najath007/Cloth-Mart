import { createSlice } from "@reduxjs/toolkit";

const likeSlice = createSlice({
    name: "like",
    initialState: {
        likeItems: [],
    },
    reducers: {
        addToLike: (state, action) => {
            const item = action.payload;
            const exist = state.likeItems.find((p) => p.id === item.id);

            if (!exist) {
                state.likeItems.push(item)
            }
        },

        removeFromLike: (state, action) => {
            const id = action.payload;
            state.likeItems = state.likeItems.filter((p) => p.id !== id);
        },

    }
})

export const {
    addToLike,
    removeFromLike
} = likeSlice.actions;

export default likeSlice.reducer;