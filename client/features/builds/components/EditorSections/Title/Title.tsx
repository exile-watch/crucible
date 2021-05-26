import cx from 'classnames';

import { Button, Input, InputGroup, Message } from '#design-system/components';
import { TrashIcon } from '#design-system/icons';
import { Pob } from '#features/builds/components/EditorSections';
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
  };

  const handleVariantTitleClick = (variantId: number) => {
    dispatch(setActiveVariant(variantId));
  };

  const handleAddNewVariantClick = () => {
    dispatch(addVoidVariant());
    dispatch(setActiveVariant(variants.length));
  };

  const handleRemoveVariantClick = (variantId: number) => {
    activeVariant !== variantId && dispatch(setActiveVariant(variantId));
    variantId !== 0 && dispatch(removeVoidVariant(variantId));
    const newActiveVariant = variantId + 1 < variants.length ? variantId : variantId - 1;
    dispatch(setActiveVariant(newActiveVariant));
  };

  return (
    <div className="mt-3">
      <div className={styles.heading}>
        <Input
          label="Build title"
          className={cx('theme-transition-scope mb-3', styles.input)}
          value={title}
          onChange={handleTitleChange}
        />
        <div className={styles.actions}>
          <div>
            <Pob />
          </div>
          <Button className="ml-3" variant="secondary">
            Leveling
          </Button>
          <Button className="ml-3" variant="secondary">
            Preview
          </Button>
          <Button className="ml-3" variant="secondary" disabled>
            Comments
          </Button>
          <Button className="ml-3">Create</Button>
        </div>
      </div>
      <div className={styles.titleWrapper}>
        {variants.map((variant, variantId) =>
          variantId === 0 ? (
            <Input
              key={`variantTitle_${variantId}`}
              label={`Variant ${variantId + 1}`}
              className={cx(styles.input, activeVariant !== variantId && styles.activeInput)}
              value={variant.title}
              onClick={() => handleVariantTitleClick(variantId)}
              size="large"
              onChange={(e) => handleVariantTitleChange(e, variantId)}
            />
          ) : (
            <>
              <span className={cx('mx-3', styles.separator)}>•</span>
              <InputGroup>
                <Input
                  key={`variantTitle_${variantId}`}
                  label={`Variant ${variantId + 1}`}
                  className={cx(styles.input, activeVariant !== variantId && styles.activeInput)}
                  value={variant.title}
                  onClick={() => handleVariantTitleClick(variantId)}
                  size="large"
                  onChange={(e) => handleVariantTitleChange(e, variantId)}
                />
                <InputGroup.Append disabled={false}>
                  <TrashIcon onClick={() => handleRemoveVariantClick(variantId)} />
                </InputGroup.Append>
              </InputGroup>
            </>
          )
        )}
        <Button onClick={handleAddNewVariantClick} size="large" variant="tertiary" className="ml-3">
          + Add another variant
        </Button>
      </div>
      {variants.length > 1 && (
        <Message type="info" className="mt-3">
          Currently adding content for
          <b className="p-1">
            <u>
              {variants[activeVariant].title.length > 0
                ? variants[activeVariant].title
                : `Variant ${activeVariant + 1}`}
            </u>
          </b>
          variant.
        </Message>
      )}
    </div>
  );
};

export default Title;
