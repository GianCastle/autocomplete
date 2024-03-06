export interface AutocompleteProps {
  fetchSuggestions: <T>(query: string) => Promise<T>;
  debounceTime?: number;
}

export interface Item {
  id: number;
  title: string;
}
