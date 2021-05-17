import { createSlice } from '@reduxjs/toolkit';

import { BuildSlice } from '#features/builds/types/Store';
import { RootState } from '#store';

const initialState: BuildSlice = {
  title: 'test',
  activeVariant: 0,
  introductionText: [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ],
  kudosText: [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ],
  variants: [
    {
      title: '',
      conceptText: [
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
      ],
      detrimentalMapMods: [],
      ascendancy: {
        tree: [],
      },
      passives: {
        tree: [],
      },
      bandit: null,
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
     * Concept
     */
    changeConceptText: (state, { payload }) => {
      state.variants[state.activeVariant].conceptText =
        payload || initialState.variants[state.activeVariant].conceptText;
    },

    /**
     * Detrimental Map Mods
     */
    addDetrimentalMapMod: (state, { payload }) => {
      state.variants[state.activeVariant].detrimentalMapMods = [
        ...state.variants[state.activeVariant].detrimentalMapMods,
        payload,
      ];
    },

    removeDetrimentalMapMod: (state, { payload }) => {
      state.variants[state.activeVariant].detrimentalMapMods = state.variants[
        state.activeVariant
      ].detrimentalMapMods.filter((mapMod) => mapMod.value !== payload);
    },

    /**
     * AscendancyProgress
     */
    toggleAscendancyTreeNode: (state, { payload }) => {
      if (
        state.variants[state.activeVariant].ascendancy.tree.find((a) => a.skill === payload.skill)
      ) {
        state.variants[state.activeVariant].ascendancy.tree = state.variants[
          state.activeVariant
        ].ascendancy.tree.filter((a) => a.skill !== payload.skill);
        return;
      }

      state.variants[state.activeVariant].ascendancy.tree = [
        ...state.variants[state.activeVariant].ascendancy.tree,
        payload,
      ];
    },

    /**
     * Leveling
     */
    togglePassivesTreeNode: (state, { payload }) => {
      if (
        state.variants[state.activeVariant].passives.tree.find((a) => a.skill === payload.skill)
      ) {
        state.variants[state.activeVariant].passives.tree = state.variants[
          state.activeVariant
        ].passives.tree.filter((a) => a.skill !== payload.skill);
        return;
      }

      state.variants[state.activeVariant].passives.tree = [
        ...state.variants[state.activeVariant].passives.tree,
        payload,
      ];
    },

    /**
     * Kudos
     */
    changeKudosText: (state, { payload }) => {
      state.kudosText = payload || initialState.kudosText;
    },

    /**
     * Bandits
     */
    changeBandit: (state, { payload }) => {
      state.variants[state.activeVariant].bandit =
        payload || initialState.variants[state.activeVariant].bandit;
    },
  },
});

export const {
  toggleAscendancyTreeNode,
  togglePassivesTreeNode,
  addVoidVariant,
  editTitle,
  editVariantTitle,
  removeVoidVariant,
  setActiveVariant,
  changeIntroductionText,
  changeConceptText,
  changeKudosText,
  changeBandit,
  addDetrimentalMapMod,
  removeDetrimentalMapMod,
} = buildSlice.actions;

export const selectBuildTitle = (state: RootState) => state.build.title;
export const selectBuildVariants = (state: RootState) => state.build.variants;
export const selectActiveVariant = (state: RootState) => state.build.activeVariant;
export const selectIntroductionText = (state: RootState) => state.build.introductionText;
export const selectKudosText = (state: RootState) => state.build.kudosText;
export const selectConceptText = (state: RootState) =>
  state.build.variants[state.build.activeVariant].conceptText;
export const selectDetrimentalMapMods = (state: RootState) =>
  state.build.variants[state.build.activeVariant].detrimentalMapMods;
export const selectAscendancyTreeNodes = (state: RootState) =>
  state.build.variants[state.build.activeVariant].ascendancy.tree;
export const selectPassivesTreeNodes = (state: RootState) =>
  state.build.variants[state.build.activeVariant].passives.tree;
export const selectBandit = (state: RootState) =>
  state.build.variants[state.build.activeVariant].bandit;

export default buildSlice.reducer;
