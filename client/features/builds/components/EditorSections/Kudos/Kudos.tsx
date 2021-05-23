import React from 'react';
import { Descendant } from 'slate';

import { TextEditor } from '#design-system/components';
import { changeKudosText, selectKudosText } from '#features/builds/slices/buildSlice';
import { useDispatch, useSelector } from '#hooks/useStore';

import EditorSectionWrapper from '../EditorSectionWrapper';

const Kudos = () => {
  const value: any = useSelector(selectKudosText);
  const dispatch = useDispatch();

  const handleChange = (v: Descendant[]) => {
    dispatch(changeKudosText(v));
  };

  return (
    <EditorSectionWrapper section="kudos" locked>
      <TextEditor value={value} onChange={handleChange} />
    </EditorSectionWrapper>
  );
};

export default Kudos;
