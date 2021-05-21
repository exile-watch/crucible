import cx from 'classnames';
import Link from 'next/link';

import Heading from '#components/Heading/Heading';
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
                  onClick={() => handleVariantTitleClick(0)}
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
    </>
  );
};

export default Title;
