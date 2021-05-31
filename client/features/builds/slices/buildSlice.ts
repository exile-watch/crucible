import { createSlice } from '@reduxjs/toolkit';

import { SocketsType } from '#features/builds/types/Gems';
import { BuildSlice } from '#features/builds/types/Store';
import { RootState } from '#store';

const emptySockets = [...Array(6)].fill({ id: null, level: 0, quality: 0 });
const defaultSockets = [
  emptySockets,
  emptySockets,
  emptySockets,
  emptySockets,
  emptySockets,
  emptySockets,
] as unknown as SocketsType;

const initialState: BuildSlice = {
  title: 'test',
  pob: '',
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
  faq: [],
  variants: [
    {
      title: '',
      conceptText: [
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
      ],
      prosAndCons: {
        pros: [],
        cons: [],
      },
      detrimentalMapMods: [],
      ascendancy: {
        tree: [],
      },
      passives: {
        tree: [],
      },
      skills: {
        activeSkillsRow: null,
        mainhand: {
          primary: defaultSockets,
          secondary: defaultSockets,
          tertiary: defaultSockets,
          quaternary: defaultSockets,
        },
        offhand: {
          primary: defaultSockets,
          secondary: defaultSockets,
        },
        body: {
          primary: defaultSockets,
          secondary: defaultSockets,
        },
        helmet: defaultSockets,
        gloves: defaultSockets,
        boots: defaultSockets,
      },
      bandit: null,
      faq: [],
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
     * Pob
     */
    changePob: (state, { payload }) => {
      state.pob = payload;
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
     * Pros and Cons
     */
    addProOrCon: (state, { payload }) => {
      const { type, ...rest } = payload;
      if (type === 'pro') {
        state.variants[state.activeVariant].prosAndCons.pros = [
          ...state.variants[state.activeVariant].prosAndCons.pros,
          rest,
        ];
      } else {
        state.variants[state.activeVariant].prosAndCons.cons = [
          ...state.variants[state.activeVariant].prosAndCons.cons,
          rest,
        ];
      }
    },

    removeProOrCon: (state, { payload }) => {
      if (payload.type === 'pro') {
        state.variants[state.activeVariant].prosAndCons.pros = state.variants[
          state.activeVariant
        ].prosAndCons.pros.filter((pro) => pro.id !== payload.id);
      } else {
        state.variants[state.activeVariant].prosAndCons.cons = state.variants[
          state.activeVariant
        ].prosAndCons.cons.filter((con) => con.id !== payload.id);
      }
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
     * Ascendancy Passive Tree
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
     * Passive Tree
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
     * Skills
     */
    // payload.type: mainhand | offhand | body | helmet | gloves | boots
    // payload.row: primary | secondary | tertiary | q
    // addSkill: (state, { payload }) => {
    //   // state.variants[state.activeVariant].skills[payload.type][payload.row] = payload.skills;
    // },
    setActiveSkillsRow: (state, { payload }) => {
      state.variants[state.activeVariant].skills.activeSkillsRow = payload;
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

    /**
     * FAQ
     */
    addFAQ: (state, { payload }) => {
      if (payload.isVariantOnly) {
        state.variants[state.activeVariant].faq = [
          ...state.variants[state.activeVariant].faq,
          payload.qna || initialState.variants[state.activeVariant].faq,
        ];
        return;
      }

      state.faq = [...state.faq, payload.qna || initialState.faq];
    },

    removeFAQ: (state, { payload }) => {
      if (payload.isVariantOnly) {
        state.variants[state.activeVariant].faq = state.variants[state.activeVariant].faq.filter(
          (f) => f.id !== payload.id
        );
        return;
      }

      state.faq = state.faq.filter((f) => f.id !== payload.id);
    },
  },
});

export const {
  changePob,
  toggleAscendancyTreeNode,
  togglePassivesTreeNode,
  addVoidVariant,
  editTitle,
  editVariantTitle,
  removeVoidVariant,
  setActiveVariant,
  changeIntroductionText,
  changeConceptText,
  addProOrCon,
  removeProOrCon,
  changeKudosText,
  changeBandit,
  addDetrimentalMapMod,
  removeDetrimentalMapMod,
  addFAQ,
  removeFAQ,
  setActiveSkillsRow,
} = buildSlice.actions;

export const selectBuildTitle = (state: RootState) => state.build.title;
export const selectBuildPob = (state: RootState) => state.build.pob;
export const selectBuildVariants = (state: RootState) => state.build.variants;
export const selectActiveVariant = (state: RootState) => state.build.activeVariant;
export const selectActiveVariantTitle = (state: RootState) =>
  state.build.variants[state.build.activeVariant].title;
export const selectIntroductionText = (state: RootState) => state.build.introductionText;
export const selectKudosText = (state: RootState) => state.build.kudosText;
export const selectConceptText = (state: RootState) =>
  state.build.variants[state.build.activeVariant].conceptText;
export const selectProsAndCons = (state: RootState) =>
  state.build.variants[state.build.activeVariant].prosAndCons;
export const selectDetrimentalMapMods = (state: RootState) =>
  state.build.variants[state.build.activeVariant].detrimentalMapMods;
export const selectAscendancyTreeNodes = (state: RootState) =>
  state.build.variants[state.build.activeVariant].ascendancy.tree;
export const selectPassivesTreeNodes = (state: RootState) =>
  state.build.variants[state.build.activeVariant].passives.tree;
export const selectSkillsActiveRow = (state: RootState) =>
  state.build.variants[state.build.activeVariant].skills.activeSkillsRow;
export const selectSkills = (state: RootState) =>
  state.build.variants[state.build.activeVariant].skills;
export const selectBandit = (state: RootState) =>
  state.build.variants[state.build.activeVariant].bandit;
export const selectFAQ = (state: RootState) => state.build.faq;
export const selectVariantFAQ = (state: RootState) =>
  state.build.variants[state.build.activeVariant].faq;

export default buildSlice.reducer;
