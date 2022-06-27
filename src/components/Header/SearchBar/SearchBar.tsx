import React, { useState, useEffect } from 'react';

import { useDebounce } from 'use-debounce';

import { Search, Close } from '@mui/icons-material';

import { useSelectedDistrict } from '@store/district/selectedContext';
import { District } from '@customTypes/feature';

import useSearch from './hook/useSearch';

import SearchBarPopper, { PopperActionsType } from './SearchBarPopper';

import { getFilteredDistricts, getSortedDistricts } from './utils';

import * as Styles from './styles';

const SearchBar: React.FC = () => {
  const { selected, all } = useSelectedDistrict();

  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);

  const [districtSearched, setDistrictSearched] = useState<District[]>(all);

  const {
    getComboboxProps,
    getToggleButtonProps,
    inputProps,
    inputValue,
    cleanSearchBar,
    highlightedIndex,
    getMenuProps,
    getItemProps,
    isOpen,
  } = useSearch(districtSearched);

  const [debouncedValue] = useDebounce(inputValue, 500);

  useEffect(() => {
    const hasDebouncedValue = !!debouncedValue;

    if (hasDebouncedValue) {
      const query = debouncedValue
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/(^\s+|\s+$)/g, '');

      const hasQuery = query !== '';

      if (hasQuery) {
        setDistrictSearched(getSortedDistricts(getFilteredDistricts(all, query)));
      } else {
        setDistrictSearched(getSortedDistricts(all));
      }
    }
  }, [debouncedValue, all]);

  const hasInputValue = inputValue === '';

  const popperActions: PopperActionsType = {
    highlightedIndex,
    isOpen,
    getItemProps,
    getMenuProps,
  };

  return (
    <Styles.SearchBarContainer ref={setReferenceElement}>
      <Styles.SearchBarField {...getComboboxProps()}>
        <input {...inputProps} />

        <Styles.IconWrapper>
          {hasInputValue ? <Search {...getToggleButtonProps()} /> : <Close onClick={() => cleanSearchBar()} />}
        </Styles.IconWrapper>
      </Styles.SearchBarField>

      <SearchBarPopper
        referenceElement={referenceElement}
        districtSearched={districtSearched}
        popperActions={popperActions}
      />
    </Styles.SearchBarContainer>
  );
};

export default SearchBar;
