import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Characters } from "../types/Character";

const useCharacters = () => {
  const fetchCharacters = () =>
    axios
      .get<Characters>(
        "https://fathomless-sea-88016-304995582b8d.herokuapp.com/characters"
      )
      .then((res) => res.data);
  return useQuery({
    queryKey: ["characters"],
    queryFn: fetchCharacters,
  });
};

export default useCharacters;
