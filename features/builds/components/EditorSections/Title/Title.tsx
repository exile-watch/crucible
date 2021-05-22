import cx from 'classnames';

import Heading from '#components/Heading/Heading';
import Input from '#components/Input/Input';
import Message from '#components/Message/Message';
import {
  addVoidVariant,
  editTitle,
  editVariantTitle,
  removeVoidVariant,
  selectActiveVariant,
  selectBuildTitle,
  selectBuildVariants,
  setActiveVariant,
} from '#features/builds/slices/buildSlice';
import { useDispatch, useSelector } from '#hooks/useStore';

import styles from './Title.module.scss';

type Event = { target: { value: string } };

const Title = () => {
  const title = useSelector(selectBuildTitle);
  const variants = useSelector(selectBuildVariants);
  const activeVariant = useSelector(selectActiveVariant);
  const dispatch = useDispatch();

  const handleTitleChange = ({ target: { value } }: Event) => {
    dispatch(editTitle(value));
  };
  const handleVariantTitleChange = ({ target: { value } }: Event, variantId: number) => {
    dispatch(editVariantTitle({ value, variantId }));

    if (variants.length === 1) dispatch(addVoidVariant());

    if (
      variantId > 0 &&
      variants?.[variantId + 1]?.title?.length !== 0 &&
      variants?.[variants.length - 1]?.title?.length !== 0
    ) {
      dispatch(addVoidVariant());
    }
    if (value === '') {
      if (variants.length === 1) return;

      if (variants?.[variantId + 1]?.title?.length !== 0) dispatch(removeVoidVariant(variantId));

      if (variants?.[variantId + 1]?.title?.length === 0)
        dispatch(removeVoidVariant(variantId + 1));
    }
  };

  const handleVariantTitleClick = (variantId: number) => {
    dispatch(setActiveVariant(variantId));
  };

  return (
    <div>
      <input
        placeholder="Enter build title here"
        className={cx('theme-transition-scope', styles.input)}
        value={title}
        onChange={handleTitleChange}
      />
      <div className={styles.titleWrapper}>
        {variants.map((variant, variantId) => (
          <Heading as="h2" key={`variantTitle_${variantId}`}>
            <Input
              placeholder="Enter build variant title here"
              className={cx(
                'theme-transition-scope',
                styles.input,
                activeVariant !== variantId && styles.activeInput
              )}
              value={variant.title}
              onClick={() => handleVariantTitleClick(variantId)}
              onChange={(e) => handleVariantTitleChange(e, variantId)}
            />
          </Heading>
        ))}
      </div>
      {variants.length > 1 && variants[activeVariant].title.length > 0 && (
        <Message type="info" className="mt-3">
          Currently adding content for
          <b className="p-1">
            <u>{variants[activeVariant].title}</u>
          </b>
          variation.
        </Message>
      )}
    </div>
  );
};

export default Title;
