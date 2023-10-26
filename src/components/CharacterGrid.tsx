import styled from "styled-components";
import { Character, Characters } from "../types/Character";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const GridWrapper = styled.section<{ expanded: boolean }>`
  padding: ${(props) => (props.expanded ? " 0 2.4rem 2.4rem  " : "0 1.3rem")};
  background: #1a1a1a;
  border-bottom: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  transition: padding 0.5s;
`;

const GridHeader = styled.header`
  display: flex;
  max-width: 30rem;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 0 auto;
  transform: translatey(0.4rem);
`;

const Grid = styled.div<{ expanded: boolean }>`
  display: inline-grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  gap: 1.3rem;
  margin-top: ${(props) => (props.expanded ? "1rem" : "0")};
  max-height: ${(props) => (props.expanded ? "100vh" : "0px")};
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const GridHeading = styled.h2`
  font-size: 1.7rem;
  color: #fff;
  font-family: "Gabarito", sans-serif;
  text-align: center;
  margin: 0;
  letter-spacing: 0.2rem;

  @media screen and (min-width: 768px) {
    font-size: 2rem;
  }
`;

const CharacterIcon = styled.img`
  width: 4rem;
  border-radius: 8px;
  border: 1px solid white;
  transition: 0.3s;

  &:hover {
    box-shadow: 0 0 5px 1.5px #6200f5;
    transform: scale(1.07);
  }

  @media screen and (min-width: 768px) {
    width: 6rem;
  }
`;

const Toggle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 3.5rem;
  color: #fff;
  font-size: 1.6rem;
  text-align: center;
  transform: rotate(90deg);
  background: #555555;
  border-radius: 8px;
  margin-left: auto;
  transition: all 0.3s;

  &:hover {
    background: #777777;
  }
`;

interface Props {
  onSelectedCharacter: (char: Character) => void;
}

const CharacterGrid = ({ onSelectedCharacter }: Props) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Characters>(["characters"]);

  const [selectionExpanded, setSelectionExpanded] = useState(false);

  const handleSelectionExpansion = () => {
    setSelectionExpanded(!selectionExpanded);
  };

  return (
    <GridWrapper expanded={selectionExpanded}>
      <GridHeader>
        <GridHeading>Character Selection</GridHeading>
        <Toggle onClick={() => handleSelectionExpansion()}>
          <span style={{ transform: "translatey(-.1rem)" }}>
            {selectionExpanded
              ? String.fromCharCode(0x2716)
              : String.fromCharCode(0x276f)}
          </span>
        </Toggle>
      </GridHeader>

      <Grid expanded={selectionExpanded}>
        {data?.data.map((char, index) => (
          <CharacterIcon
            onClick={() => {
              onSelectedCharacter(char);
              handleSelectionExpansion();
            }}
            key={index}
            src={char?.imageIcon}
          ></CharacterIcon>
        ))}
      </Grid>
    </GridWrapper>
  );
};

export default CharacterGrid;
