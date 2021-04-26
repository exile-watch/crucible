import cx from 'classnames';
import Link from 'next/link';

import Heading from '#components/Heading/Heading';
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

const Title = () => {
  const title = useSelector(selectBuildTitle);
  const variants = useSelector(selectBuildVariants);
  const activeVariant = useSelector(selectActiveVariant);
  const dispatch = useDispatch();

  const handleTitleChange = ({ target: { value } }) => {
    dispatch(editTitle(value));
  };
  const handleVariantTitleChange = ({ target: { value } }, variantId) => {
    dispatch(editVariantTitle({ value, variantId }));
    dispatch(setActiveVariant(value));

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

  const handleVariantTitleClick = (variantTitle) => {
    if (variantTitle.length === 0) return;
    dispatch(setActiveVariant(variantTitle));
  };

  return (
    <>
      <Heading as="h4">
        <span className={cx('theme-transition-scope', styles.author)}>
          by{'  '}
          <Link href="/users/FooBarThron">
            <a className={cx('theme-transition-scope', styles.active)}>FooBarThron</a>
          </Link>{' '}
          {variants.length > 1 && (
            <>
              {' '}
              •{' '}
              <input
                placeholder="Enter build title here"
                className={cx('theme-transition-scope', styles.input)}
                value={title}
                onChange={handleTitleChange}
              />
            </>
          )}
        </span>
      </Heading>
      <div className={styles.titleWrapper}>
        {variants.length === 1 && (
          <>
            <Heading as="h2">
              <input
                placeholder="Enter build title here"
                className={cx('theme-transition-scope', styles.input)}
                value={title}
                onChange={handleTitleChange}
              />
            </Heading>
            {title.length > 0 && (
              <Heading as="h2">
                <input
                  placeholder="Enter build variant title here"
                  className={cx('theme-transition-scope', styles.input)}
                  onChange={(e) => handleVariantTitleChange(e, 0)}
                />
              </Heading>
            )}
          </>
        )}

        {variants.length >= 2 &&
          variants.map((variant, variantId) => (
            <Heading as="h2" key={`variantTitle_${variantId}`}>
              <input
                placeholder="Enter build variant title here"
                className={cx('theme-transition-scope', styles.input)}
                value={variant.title}
                onClick={() => handleVariantTitleClick(variant.title)}
                onChange={(e) => handleVariantTitleChange(e, variantId)}
              />
            </Heading>
          ))}
      </div>
      {variants.length > 1 && <div>Currently adding content for {activeVariant}. </div>}
    </>
  );
};

export default Title;
