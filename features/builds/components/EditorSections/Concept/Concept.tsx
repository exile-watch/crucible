import React from 'react';
import { Descendant } from 'slate';

import TextEditor from '#components/TextEditor/TextEditor';
import { changeConceptText, selectConceptText } from '#features/builds/slices/buildSlice';
import { useDispatch, useSelector } from '#hooks/useStore';

import EditorSectionWrapper from '../EditorSectionWrapper';

const Concept = () => {
  const value: any = useSelector(selectConceptText);
  const dispatch = useDispatch();

  const handleChange = (v: Descendant[]) => {
    dispatch(changeConceptText(v));
  };

  return (
    <EditorSectionWrapper section="concept">
      <TextEditor value={value} onChange={handleChange} />
    </EditorSectionWrapper>
  );
};

export default Concept;
