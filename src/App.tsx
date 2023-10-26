import { useEffect, useState } from "react";
import CharacterCard from "./components/CharacterCard";
import CharacterGrid from "./components/CharacterGrid";
import { GlobalStyles } from "./styles.global";
import { Character } from "./types/Character";
import useCharacters from "./hooks/useCharacter";
import styled from "styled-components";

const PagePadding = styled.div`
  padding: 0 2.4rem;
`;

function App() {
  useCharacters();

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  const handleSelectedCharacter = (character: Character) => {
    if (character === selectedCharacter) {
      return;
    }
    setAnimate(false); // Disable animation
    setTimeout(() => {
      setSelectedCharacter(character);
    }, 400);
  };

  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    if (selectedCharacter) {
      setTimeout(() => setAnimate(true), 100);
    }
  }, [selectedCharacter]);

  return (
    <>
      <GlobalStyles />
      <PagePadding>
        <CharacterCard
          animate={animate}
          key={selectedCharacter?.id}
          character={selectedCharacter}
        />
        <CharacterGrid onSelectedCharacter={handleSelectedCharacter} />
      </PagePadding>
    </>
  );
}

export default App;
