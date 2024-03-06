import Autocomplete from "./components/Autocomplete";
import "./App.css";
import data from "./data/titles.json";

const handler = async (query: string): Promise<any> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return new Promise((resolve) => {
    const results = data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    resolve(results);
  });
};

function App() {
  return (
    <>
      Look for a post comments by ID and select a comment to append details
      <div className="App">
        <Autocomplete fetchSuggestions={handler} />
      </div>
    </>
  );
}

export default App;
