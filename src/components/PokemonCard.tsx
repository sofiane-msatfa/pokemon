import { Button, Card, CardBody, CardFooter, Chip, Image, Checkbox, Tabs, Tab } from "@nextui-org/react";
import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter
} from "@nextui-org/react";
import { Pokemon } from "@/types";
import { getBackgroundColor } from "@/utils/pokemon";
import { usePokedex } from "@/hooks/usePokedex";
import { HeartIcon } from "./HeartIcon";
import { useState } from "react";
import '@/index.css';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const { pokemonIdList, addPokemonToPokedex, removePokemonFromPokedex } = usePokedex();

  const isPokemonInPokedex = pokemonIdList.includes(pokemon.id);
  const bgColor = getBackgroundColor(pokemon.apiTypes);

  const togglePokemonFromPokedex = () => {
    if (isPokemonInPokedex) {
      return removePokemonFromPokedex(pokemon.id);
    }

    addPokemonToPokedex(pokemon.id);
  };

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Card
        key={pokemon.id}
        isFooterBlurred
        radius="lg"
        className={`border-none text-white max-w-[450px] h-[230px] items-center justify-start ${bgColor}`}
      >
        <div className="flex items-center justify-between">
          <Image
            fallbackSrc=""
            alt="Woman listing to music"
            className="object-cover"
            height={300}
            src={`${pokemon.image}`}
            width={300}
          />
          <CardBody>
            <span>Pokdex ID : {pokemon.pokedexId}</span>
            <span>HP : {pokemon.stats.HP}</span>
            <span>Attack : {pokemon.stats.attack}</span>
            <span>Défense : {pokemon.stats.defense}</span>
            <span>Speed : {pokemon.stats.speed}</span>
          </CardBody>
        </div>
        <CardFooter className="inline border-white/20 border-1 overflow-hidden absolute before:rounded-xl rounded-b-l bottom-1 h-[85px] w-[calc(100%_-_8px)] shadow-small z-5">
          <p className="text-lg text-white/80 mb-">{pokemon.name}</p>
          <div className="flex justify-between">
            <div>
              {pokemon.apiTypes.map((type, index) => (
                <Chip
                  key={index}
                  className={`text-white font-bold text-tiny mr-1 ${getBackgroundColor([type])}`}
                >
                  {type.name}
                </Chip>
              ))}
            </div>
            <Button
              className="text-tiny text-white bg-black/80"
              variant="flat"
              color="default"
              radius="lg"
              size="sm"
              onClick={openModal}
            >
              Voir
            </Button>
            <Checkbox
              defaultSelected
              icon={<HeartIcon />}
              isSelected={isPokemonInPokedex}
              onValueChange={togglePokemonFromPokedex}
              color="danger"
            />
          </div>
        </CardFooter>
      </Card>

      {showModal && (
  
        <Modal className="pokeball-modal" isOpen={showModal} onOpenChange={setShowModal}>
          <ModalContent>
              <>
                <ModalBody className="flex flex-col items-center">
                  <Image
                    fallbackSrc=""
                    alt={pokemon.name}
                    className="object-cover mt-6"
                    height={300}
                    src={pokemon.image}
                    width={300}
                  />
                  <h2 className="text-5xl text-gray-500">{pokemon.name}</h2>
                  <div className="flex">
                    {pokemon.apiTypes.map((type, index) => (
                      <div
                        key={index}
                        className={` flex type text-white font-bold text-sm py-1 px-2 rounded-full mr-1 ${getBackgroundColor([type])}`}
                        style={{ backgroundColor: getBackgroundColor([type]) }}
                      >
                        <img src={type.image} width="20" height="20" alt={type.name} className="mr-1" />
                        <span>{type.name}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-7xl text-gray-500 italic absolute top-6 right-6 overflow-hidden">#{pokemon.pokedexId}</p>
                  <Tabs className="w-full flex-1 override-flex">
                  <Tab title="Infos" className="flex-1 text-center">
                <div>
                  <audio controls>
                  <source src={`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`} type="audio/ogg" />                 
                  </audio>
                </div>
              </Tab>
                  <Tab title="Statistiques" className="flex-1 text-center">
                  <div>
                    <p>HP: {pokemon.stats.HP}</p>
                    <progress value={pokemon.stats.HP} max="150" style={{backgroundColor: bgColor}}></progress>
                  </div>
                  <div>
                    <p>Attack: {pokemon.stats.attack}</p>
                    <progress value={pokemon.stats.attack} max="150" style={{backgroundColor: bgColor}}></progress>
                  </div>
                  <div>
                    <p>Défense: {pokemon.stats.defense}</p>
                    <progress value={pokemon.stats.defense} max="150" style={{backgroundColor: bgColor}}></progress>
                  </div>
                  <div>
                    <p>Speed: {pokemon.stats.speed}</p>
                    <progress value={pokemon.stats.speed} max="150" style={{backgroundColor: bgColor}}></progress>
                  </div>
                </Tab>

                <Tab title="Évolution" className="flex-1 text-center">
                  {pokemon.apiEvolutions.map((evolution, index) => (
                    <div key={index}>
                      <p>{evolution.name}</p>
                      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.pokedexId}.png`} alt={evolution.name} />
                      <p>#{evolution.pokedexId}</p>
                    </div>
                  ))}
                </Tab>
                  </Tabs>
                </ModalBody>
              </>
          </ModalContent>
        </Modal>
        
      )}
    </>
  );
}