import {
  TypedUseSelectorHook,
  useDispatch as useRRDispatch,
  useSelector as useRRSelector,
} from 'react-redux';

import type { AppDispatch, RootState } from '#store';

const useDispatch = () => useRRDispatch<AppDispatch>();
const useSelector: TypedUseSelectorHook<RootState> = useRRSelector;

export { useDispatch, useSelector };
