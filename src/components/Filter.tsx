interface FilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const Filter = ({ categories, selectedCategory, onSelectCategory }: FilterProps) => {
  return (
    <div>
      <button onClick={() => onSelectCategory('')}>All categories</button>
      
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};