import { createSlice } from '@reduxjs/toolkit';

import { BuildSlice } from '#features/builds/types/Store';
import { RootState } from '#store';

const defaultSkill = {
  gem: '',
  level: '',
  quality: '',
};

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
      draftSkills: {},
      skills: {},
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
     * payload.slot: mainhand | offhand | body | helmet | gloves | boots
     * payload.ordinalNumber: 0 (primary) | 1 (secondary) | 2 (tertiary) | 3 (quaternary)
     * payload.index: 0 - 5
     * payload: gem | level | quality
     */
    addVoidSlot: ({ variants, activeVariant }, { payload }) => {
      variants[activeVariant].draftSkills = {
        ...variants[activeVariant].draftSkills,
        [payload]: [[defaultSkill]],
      };
    },

    editDraftSkillRow: (
      { variants, activeVariant }: RootState,
      { payload: { slot, ordinalNumber, index, level, quality, gem } }
    ) => {
      const skill = variants[activeVariant].draftSkills[slot][ordinalNumber][index];

      variants[activeVariant].draftSkills[slot][ordinalNumber][index] = {
        gem: gem === '' ? '' : gem || skill?.gem,
        level: level === '' ? '' : level || skill?.level,
        quality: quality === '' ? '' : quality || skill?.quality,
      };
    },

    addDraftSkillRow: (
      { variants, activeVariant }: RootState,
      { payload: { slot, ordinalNumber } }
    ) => {
      variants[activeVariant].draftSkills[slot][ordinalNumber] = [
        ...variants[activeVariant].draftSkills[slot][ordinalNumber],
        defaultSkill,
      ];
    },

    removeDraftSkillSlot: ({ variants, activeVariant }: RootState, { payload }) => {
      const { [payload]: filteredSlot, ...filteredDraftSkills } =
        variants[activeVariant].draftSkills;
      variants[activeVariant].draftSkills = filteredDraftSkills;
    },

    removeDraftSkillRow: (
      { variants, activeVariant }: RootState,
      { payload: { index, slot, ordinalNumber } }
    ) => {
      /**
       * Edge case #1
       * Removing skill row with only one slot and one row should remove current slot
       */
      if (
        variants[activeVariant].draftSkills[slot].length === 1 &&
        variants[activeVariant].draftSkills[slot][ordinalNumber].length === 1
      ) {
        const { [slot]: filteredSlot, ...filteredDraftSkills } =
          variants[activeVariant].draftSkills;
        variants[activeVariant].draftSkills = filteredDraftSkills;
        return;
      }

      /**
       * Edge case #2
       * Removing skill row with one row should remove current ordinal number
       */
      if (variants[activeVariant].draftSkills[slot][ordinalNumber].length === 1) {
        variants[activeVariant].draftSkills[slot][ordinalNumber] = [defaultSkill];

        /**
         * Edge case #3
         * Removing skill row with only one ordinal number should remove current ordinal number
         */
        if (variants[activeVariant].draftSkills[slot].length > 1) {
          variants[activeVariant].draftSkills[slot] = variants[activeVariant].draftSkills[
            slot
          ].filter((_, i: number) => i !== ordinalNumber);
        }
        return;
      }

      variants[activeVariant].draftSkills[slot][ordinalNumber] = variants[
        activeVariant
      ].draftSkills[slot][ordinalNumber].filter((_, i: number) => i !== index);
    },

    addDraftSkillOrdinalNumber: ({ variants, activeVariant }: RootState, { payload: { slot } }) => {
      variants[activeVariant].draftSkills[slot] = [
        ...variants[activeVariant].draftSkills[slot],
        [defaultSkill],
      ];
    },

    removeDraftSkillOrdinalNumber: (
      { variants, activeVariant }: RootState,
      { payload: { slot, ordinalNumber } }
    ) => {
      /**
       * Edge case #1
       * Removing skill row with only one slot should remove current slot
       */
      if (variants[activeVariant].draftSkills[slot].length === 1) {
        const { [slot]: filteredSlot, ...filteredDraftSkills } =
          variants[activeVariant].draftSkills;
        variants[activeVariant].draftSkills = filteredDraftSkills;
        return;
      }
      variants[activeVariant].draftSkills[slot] = variants[activeVariant].draftSkills[slot].filter(
        (_, i: number) => i !== ordinalNumber
      );
    },

    saveDraftSkills: ({ variants, activeVariant }, { payload }) => {
      variants[activeVariant].skills = variants[activeVariant].draftSkills;
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
    changeBandit: ({ variants, activeVariant }, { payload }) => {
      variants[activeVariant].bandit = payload || initialState.variants[activeVariant].bandit;
    },

    /**
     * FAQ
     */
    addFAQ: ({ variants, activeVariant, ...state }, { payload }) => {
      if (payload.isVariantOnly) {
        variants[activeVariant].faq = [
          ...variants[activeVariant].faq,
          payload.qna || initialState.variants[activeVariant].faq,
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
  addVoidSlot,
  editDraftSkillRow,
  addDraftSkillRow,
  removeDraftSkillRow,
  addDraftSkillOrdinalNumber,
  removeDraftSkillOrdinalNumber,
  removeDraftSkillSlot,
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
export const selectDraftSkills = (state: RootState) =>
  state.build.variants[state.build.activeVariant].draftSkills;
export const selectSkills = (state: RootState) =>
  state.build.variants[state.build.activeVariant].skills;
export const selectBandit = (state: RootState) =>
  state.build.variants[state.build.activeVariant].bandit;
export const selectFAQ = (state: RootState) => state.build.faq;
export const selectVariantFAQ = (state: RootState) =>
  state.build.variants[state.build.activeVariant].faq;

export default buildSlice.reducer;
