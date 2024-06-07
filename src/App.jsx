import { useEffect, useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favourites, Search, SearchResult } from "./components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Modal from "./components/Modal";
import useCharacters from "./hooks/useCharacter";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [query, setQuery] = useState("");
  // const [count, setCount] = useState(0);
  const { isLoading, characters } = useCharacters(
    "https://rickandmortyapi.com/api/character?name",
    query
  );
  const [selectedId, setSelectedId] = useState(null);

  const [favourites, setFavourites] = useLocalStorage("FAVOURITES", []);

  // const [favourites, setFavourites] = useState(
  //   () => JSON.parse(localStorage.getItem("FAVOURITES")) || []
  // );
  // useEffect(() => {
  //   localStorage.setItem("FAVOURITES", JSON.stringify(favourites));
  // }, [favourites]);

  //cleanup function example
  // useEffect(() => {
  //   const interval = setInterval(() => setCount((c) => c + 1), 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [count]);

  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddToFavourite = (char) => {
    setFavourites((prevFav) => [...prevFav, char]);
  };

  const handleDeleteFavourite = (id) => {
    setFavourites((prevFav) => prevFav.filter((fav) => fav.id !== id));
  };
  const isAddToFavourite = favourites.map((fav) => fav.id).includes(selectedId);
  //derived state

  return (
    <div className="app">
      {/* <div style={{ color: "white" }}>{count}</div> */}
      <Toaster />
      {/* <Modal title={"modal test title"} open={} onOpen={}></Modal> */}
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favourites
          favourites={favourites}
          onDeleteFavourite={handleDeleteFavourite}
        />
      </Navbar>
      <Main characters={characters}>
        <CharacterList
          selectedId={selectedId}
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={handleSelectCharacter}
        />
        <CharacterDetail
          selectedId={selectedId}
          onAddToFavourite={handleAddToFavourite}
          isAddToFavourite={isAddToFavourite}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
