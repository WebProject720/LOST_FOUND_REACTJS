import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  posts: null,
};

const PostSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    addPost: (state, action) => {
      if (state.posts == null) {
        state.posts = action.payload.post;
      } else {
        state.posts.push(action.payload.post);
      }
    },
    clearPost: (state) => {
      state.posts = null;
    },
    updatePost: (state, action) => {
      const { id, post } = action.payload;
      state.posts.map((e, i) => {
        if (e._id == id) {
          state.posts[i] = post;
        }
      });
    },
    deletePost: (state, action) => {
      const { id } = action.payload;
      state.posts.filter((e) => {
        return e._id != id;
      });
    },
  },
});
export const { addPost, clearPost, updatePost,deletePost } = PostSlice.actions;

export const PostReducer = PostSlice.reducer;
