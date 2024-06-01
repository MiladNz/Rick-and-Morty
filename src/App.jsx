import { useEffect, useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from "./components/Navbar";
// import Loader from "./components/Loader";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // fetch("https://rickandmortyapi.com/api/character")
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));
  //!WARNING : DO NOT USE .then((data) => setCharacters(data.results));

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Something went wrong !!!");
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setCharacters(data.results.slice(0, 5));
  //       // setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       // setIsLoading(false);
  //       toast.error(err.message);
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch("https://rickandmortyapi.com/api/characterss");
  //       // console.log(res);
  //       if (!res.ok) throw new Error("Something went wrong !");
  //       const data = await res.json();
  //       setCharacters(data.results.slice(0, 5));
  //       // setIsLoading(false);
  //     } catch (err) {
  //       // setIsLoading(false);
  //       // console.log(err.message);
  //       toast.error(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, []);

  //!axios + async/await + try / catch
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "https://rickandmortyapi.com/api/characterss"
        );
        // console.log(res);
        setCharacters(data.results.slice(0, 5));
        // setIsLoading(false);
      } catch (err) {
        // console.log(err);
        // setIsLoading(false);
        console.log(err.message);
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  //! axios + then/catch

  // useEffect(() => {
  //   setIsLoading(true);
  //   axios("https://rickandmortyapi.com/api/characterz")
  //     .then(({ data }) => {
  //       setCharacters(data.results.slice(0, 5));
  //       // setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       // setIsLoading(false);
  //       toast.error(err.response.data.error);
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);

  // const loadCharacter = () => {
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => res.json())
  //     .then((data) => setCharacters(data.results.slice(0, 3)));
  // };
  return (
    <div className="app">
      {/* <button style={{ backgroundColor: "white" }} onClick={loadCharacter}>
        Load data
      </button> */}
      <Toaster />
      <Navbar>
        <SearchResult numOfResult={characters.length} />
      </Navbar>
      <Main characters={characters}>
        {/* <CharacterList characters={characters} /> */}
        {/* {isLoading ? <Loader /> : <CharacterList characters={characters} />} */}
        <CharacterList characters={characters} isLoading={isLoading} />
        <CharacterDetail />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}