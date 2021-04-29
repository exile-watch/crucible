import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '#store';

const initialState = {
  title: '',
  activeVariant: null,
  variants: [
    {
      title: '',
    },
  ],
  introductionText: [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ],
};

export const buildSlice = createSlice({
  name: 'build',
  initialState,
  reducers: {
    editTitle: (state, { payload }) => {
      state.title = payload;
    },
    editVariantTitle: (state, { payload }) => {
      state.variants[payload.variantId].title = payload.value;
    },
    addVoidVariant: (state) => {
      state.variants = [...state.variants, { title: '' }];
    },
    removeVoidVariant: (state, { payload }) => {
      state.variants = state.variants.filter((_, i) => i !== payload);
    },
    setActiveVariant: (state, { payload }) => {
      state.activeVariant = payload || null;
    },
    changeIntroductionText: (state, { payload }) => {
      state.introductionText = payload || initialState.introductionText;
    },
  },
});

export const {
  addVoidVariant,
  editTitle,
  editVariantTitle,
  removeVoidVariant,
  setActiveVariant,
  changeIntroductionText,
} = buildSlice.actions;

export const selectBuildTitle = (state: RootState) => state.build.title;
export const selectBuildVariants = (state: RootState) => state.build.variants;
export const selectActiveVariant = (state: RootState) => state.build.activeVariant;
export const selectIntroductionText = (state: RootState) => state.build.introductionText;

export default buildSlice.reducer;
