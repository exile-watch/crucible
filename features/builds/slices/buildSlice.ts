import { createSlice } from '@reduxjs/toolkit';
import omit from 'lodash/omit';

import { Labirynth } from '#enums/labirynth';
import { BuildSlice } from '#features/builds/types/Store';
import { RootState } from '#store';

const initialState: BuildSlice = {
  title: 'test',
  activeVariant: 0,
  variants: [
    {
      title: '',
      introductionText: [
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
      ],
      ascendancy: {
        [Labirynth.Normal]: [],
        [Labirynth.Cruel]: [],
        [Labirynth.Merciless]: [],
        [Labirynth.Eternal]: [],
      },
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
    /**
     * Title
     */
    editTitle: (state, { payload }) => {
      state.title = payload;
    },
    editVariantTitle: (state, { payload }) => {
      state.variants[payload.variantId].title = payload.value;
    },
    addVoidVariant: (state) => {
      state.variants = [...state.variants, initialState.variants[0]];
    },
    removeVoidVariant: (state, { payload }) => {
      state.variants = state.variants.filter((_, i) => i !== payload);
    },
    setActiveVariant: (state, { payload }) => {
      state.activeVariant = payload;
    },

    /**
     * Introduction
     */
    changeIntroductionText: (state, { payload }) => {
      state.introductionText = payload || initialState.introductionText;
    },

    /**
     * AscendancyProgress
     */
    toggleAscendancyNode: (state, { payload }) => {
      if (
        state.variants[state.activeVariant].ascendancy[payload.labirynth].find(
          (a, i) => a.skill === payload.skill
        )
      ) {
        state.variants[state.activeVariant].ascendancy[payload.labirynth] = state.variants[
          state.activeVariant
        ].ascendancy[payload.labirynth].filter((a) => a.skill !== payload.skill);
        return;
      }

      state.variants[state.activeVariant].ascendancy[payload.labirynth] = [
        ...state.variants[state.activeVariant].ascendancy[payload.labirynth],
        omit(payload, ['labirynth', 'activeVariant']),
      ];
    },
  },
});

export const {
  toggleAscendancyNode,
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
export const selectNormalAscendancyNodes = (state: RootState) =>
  state.build.variants[state.build.activeVariant].ascendancy[Labirynth.Normal];
export const selectCruelAscendancyNodes = (state: RootState) =>
  state.build.variants[state.build.activeVariant].ascendancy[Labirynth.Cruel];
export const selectMercilessAscendancyNodes = (state: RootState) =>
  state.build.variants[state.build.activeVariant].ascendancy[Labirynth.Merciless];
export const selectEternalAscendancyNodes = (state: RootState) =>
  state.build.variants[state.build.activeVariant].ascendancy[Labirynth.Eternal];

export default buildSlice.reducer;
