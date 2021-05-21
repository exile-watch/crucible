import { Descendant } from 'slate';

import TextEditor from '#components/TextEditor/TextEditor';
import { changeIntroductionText, selectIntroductionText } from '#features/builds/slices/buildSlice';
import { useDispatch, useSelector } from '#hooks/useStore';

import EditorSectionWrapper from '../EditorSectionWrapper';

const Introduction = () => {
  const value: any = useSelector(selectIntroductionText);
  const dispatch = useDispatch();

  const handleChange = (v: Descendant[]) => {
    dispatch(changeIntroductionText(v));
  };

  return (
    <EditorSectionWrapper section="introduction" locked>
      <TextEditor value={value} onChange={handleChange} />
    </EditorSectionWrapper>
  );
};

export default Introduction;
