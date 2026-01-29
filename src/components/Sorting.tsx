import React from 'react';

type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

interface SortingProps {
  selectedSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const Sorting = ({ selectedSort, onSortChange }: SortingProps) => {
  const sortOptions = [
    { value: 'price-asc', label: 'Price:  ascending' },
    { value: 'price-desc', label: 'Price: descending' },
    { value: 'name-asc', label: 'Name: A-Z' },
    { value: 'name-desc', label: 'Name: Z-A' },
  ];

  return (
    <select
      value={selectedSort}
      onChange={(e) => onSortChange(e.target.value as SortOption)}
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};