import { useState } from "react";
import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { Pokemon } from "@/types";

interface PokemonSearchDropdownProps {
  pokemons: Pokemon[];
  onSearch: (value: string) => void;
}

export function PokemonSearchDropdown({ pokemons, onSearch }: PokemonSearchDropdownProps) {
  const POKEMON_NUMBER = 20;
  const [truncatedPokemons, setTruncatedPokemons] = useState(pokemons.slice(0, POKEMON_NUMBER));
  const [isOpen, setIsOpen] = useState(false);

  const hasMore = pokemons.length > truncatedPokemons.length;
  const onLoadMore = () => {
    setTruncatedPokemons(pokemons.slice(0, truncatedPokemons.length + POKEMON_NUMBER));
  };

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: isOpen,
    shouldUseLoader: false,
    onLoadMore,
  });

  const handleSelection = (id: number) => {
    const pokemon = pokemons.find((pokemon) => pokemon.id === id);
    pokemon && onSearch(pokemon.name);
  };

  return (
    <Autocomplete
      defaultItems={truncatedPokemons}
      scrollRef={scrollerRef}
      onOpenChange={setIsOpen}
      variant="bordered"
      placeholder="Rechercher un pokemon"
      labelPlacement="inside"
      className="max-w-xs"
      onSelectionChange={(id) => handleSelection(id as number)}
      onInputChange={(value) => onSearch(value)}
      allowsCustomValue={true}
      listboxProps={{
        emptyContent: "Aucun résultat.",
        
      }}
    >
      {(pokemon) => (
        <AutocompleteItem key={pokemon.id} textValue={pokemon.name}>
          <div className="flex gap-2 items-center">
            <Avatar alt={pokemon.name} className="flex-shrink-0" size="sm" src={pokemon.sprite} />
            <span className="text-small">{pokemon.name}</span>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}

