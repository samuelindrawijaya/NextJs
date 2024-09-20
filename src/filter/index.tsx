import styles from './FilterButton.module.css'; // Import the CSS module

interface FilterButtonProps {
  content: string;
  onClick: () => void;
  selectedCategory: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ content, onClick, selectedCategory }) => {
  return (
    <button
      className={
        selectedCategory === content
          ? styles.filter__button__select
          : styles.filter__button
      }
      onClick={onClick}
    >
      <span
        className={
          selectedCategory === content
            ? styles.filter__button__span__selected
            : styles.filter__button__span
        }
      >
        {content}
      </span>
    </button>
  );
};

export default FilterButton;
