import { Pokemon } from "@/types";
import { getBackgroundColor } from "@/utils/pokemon";
import { Image, Modal, ModalBody, ModalContent, Tab, Tabs } from "@nextui-org/react";

interface PokemonModalProps {
  pokemon: Pokemon;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
}

export function PokemonModal({ pokemon, isOpen, onOpenChange }: PokemonModalProps) {
  const bgColor = getBackgroundColor(pokemon.apiTypes);

  return (
    <Modal className="pokeball-modal" isOpen={isOpen} onOpenChange={onOpenChange}>
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
                  <img
                    src={type.image}
                    loading="lazy"
                    width="20"
                    height="20"
                    alt={type.name}
                    className="mr-1"
                  />
                  <span>{type.name}</span>
                </div>
              ))}
            </div>

            <p className="text-7xl text-gray-500 italic absolute top-6 right-6 overflow-hidden">
              #{pokemon.pokedexId}
            </p>
            <Tabs className="w-full flex-1 override-flex">
              <Tab title="Infos" className="flex-1 text-center">
                <div>
                  <audio controls>
                    <source
                      src={`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`}
                      type="audio/ogg"
                    />
                  </audio>
                </div>
              </Tab>
              <Tab title="Statistiques" className="flex-1 text-center">
                <div>
                  <p>HP: {pokemon.stats.HP}</p>
                  <progress
                    value={pokemon.stats.HP}
                    max="150"
                    style={{ backgroundColor: bgColor }}
                  ></progress>
                </div>
                <div>
                  <p>Attack: {pokemon.stats.attack}</p>
                  <progress
                    value={pokemon.stats.attack}
                    max="150"
                    style={{ backgroundColor: bgColor }}
                  ></progress>
                </div>
                <div>
                  <p>Défense: {pokemon.stats.defense}</p>
                  <progress
                    value={pokemon.stats.defense}
                    max="150"
                    style={{ backgroundColor: bgColor }}
                  ></progress>
                </div>
                <div>
                  <p>Speed: {pokemon.stats.speed}</p>
                  <progress
                    value={pokemon.stats.speed}
                    max="150"
                    style={{ backgroundColor: bgColor }}
                  ></progress>
                </div>
              </Tab>

              <Tab title="Évolution" className="flex-1 text-center">
                {pokemon.apiEvolutions.map((evolution, index) => (
                  <div key={index}>
                    <p>{evolution.name}</p>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.pokedexId}.png`}
                      alt={evolution.name}
                    />
                    <p>#{evolution.pokedexId}</p>
                  </div>
                ))}
              </Tab>
            </Tabs>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}
