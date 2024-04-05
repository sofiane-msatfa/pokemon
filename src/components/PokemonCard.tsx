import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Image,
} from "@nextui-org/react";
import { Pokemon } from "@/types";
import { getBackgroundColor } from "@/utils/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const bgColor = getBackgroundColor(pokemon.apiTypes);

  return (
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
          <span>HP : {pokemon.stats.HP}</span>
          <span>Attack : {pokemon.stats.attack}</span>
          <span>Défense : {pokemon.stats.defense}</span>
          <span>Speed : {pokemon.stats.speed}</span>
        </CardBody>
      </div>
      <CardFooter className="inline border-white/20 border-1 overflow-hidden absolute before:rounded-xl rounded-b-l bottom-1 h-[85px] w-[calc(100%_-_8px)] shadow-small z-5">
        <p className="text-lg text-white/80 mb-2">{pokemon.name}</p>
        <div className="flex justify-between">
          <div>
            {pokemon.apiTypes.map((type, index) => (
              <Chip
                key={index}
                className={`text-white font-bold text-tiny mr-1 ${getBackgroundColor(
                  [type]
                )}`}
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
          >
            Voir
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
