import { useEffect, useRef, useState } from "react";
import { AutocompleteProps, Item } from "./types";
const Autocomplete: React.FC<AutocompleteProps> = ({
  fetchSuggestions,
  debounceTime = 300,
}) => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  /**
   * dev-note(gian): [not-implemented] listRef is just a reference to this div parent element of the autocomplete results.
   * In an ideal world, the list will only display the visible items, and scrolling will reveal more items as necessary.
   * In other words, rendering can be improved with large datasets.
   * */

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (query.trim() !== "") {
        setLoading(true);
        setError(null);
        fetchSuggestions(query)
          .then((data) => {
            setSuggestions(data as Item[]);
            setLoading(false);
          })
          .catch((error: any) => {
            console.error("Error fetching suggestions:", error);
            setError(error);
            setLoading(false);
          });
      } else {
        setSuggestions([]);
      }
    }, debounceTime);

    return () => clearTimeout(debounceTimeout);
  }, [query, debounceTime, fetchSuggestions]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Type to search..."
        className="autocomplete-input"
      />
      {loading && <div>Loading...</div>}
      {suggestions.length > 0 && (
        <div className="autocomplete-list" ref={listRef}>
          {suggestions.map((item) => (
            <div className="autocomplete-suggestion" key={item.id}>
              {item.title}
            </div>
          ))}
        </div>
      )}
      {error && <div>Error fetching suggestions</div>}
    </div>
  );
};

export default Autocomplete;
