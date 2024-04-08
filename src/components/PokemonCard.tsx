import { usePokedex } from "@/hooks/usePokedex";
import { Pokemon } from "@/types";
import { getPokemonBorderColorByType } from "@/utils/colors";
import {
  Card,
  CardHeader,
  CardBody,
  Tooltip,
  cn,
  CardFooter,
  Button,
  ButtonProps,
  useDisclosure,
} from "@nextui-org/react";
import { Eye, Heart, ListCollapse, LucideIcon } from "lucide-react";
import { PokemonModal } from "./PokemonModal";
import { PokemonCardPreview } from "./PokemonCardPreview";

interface PokemonCardProps {
  pokemon: Pokemon;
}

interface ToolbarButtonProps extends ButtonProps {
  tooltip: string;
  icon: LucideIcon;
}

function ToolbarButton({ tooltip, icon: Icon, ...props }: ToolbarButtonProps) {
  return (
    <Tooltip content={tooltip} delay={500}>
      <Button size="sm" variant="faded" isIconOnly {...props}>
        <Icon size={16} />
      </Button>
    </Tooltip>
  );
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const { pokedex, addPokemonToPokedex, removePokemonFromPokedex } = usePokedex();
  const modal = useDisclosure();
  const preview = useDisclosure();

  const isPokemonInPokedex = pokedex.includes(pokemon.id);

  const togglePokemonFromPokedex = () => {
    if (isPokemonInPokedex) {
      return removePokemonFromPokedex(pokemon.id);
    }

    addPokemonToPokedex(pokemon.id);
  };

  return (
    <>
      <Card
        className={cn(
          getPokemonBorderColorByType(pokemon),
          "group py-4 px-2 border-4",
          !isPokemonInPokedex && "border-stone-950",
        )}
      >
        <CardHeader className="pb-0 p-2 pt-0 flex-col items-start">
          <div className="flex w-full justify-between items-start">
            <div className="flex flex-col">
              <p className="text-sm">#{pokemon.id}</p>
              <h4 className="font-bold text-xl">{pokemon.name}</h4>
              <small className="text-default-500">Generation {pokemon.apiGeneration}</small>
            </div>
            <div className="flex gap-1">
              <ToolbarButton tooltip="Voir la carte" icon={Eye} onClick={preview.onOpen} />
              <ToolbarButton tooltip="Détails" icon={ListCollapse} onClick={modal.onOpen} />
              <ToolbarButton
                icon={Heart}
                tooltip={isPokemonInPokedex ? "Libérer" : "Capturer"}
                onClick={togglePokemonFromPokedex}
                className={cn(isPokemonInPokedex && "text-red-500 border-red-500 bg-red-50")}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-visible border-1 rounded-md p-0 blob-fill">
          <img
            loading="lazy"
            className={cn(
              "aspect-square rounded-md object-cover z-10",
              "drop-shadow-2xl",
              "transition-all duration-300 ease-in-out",
              !isPokemonInPokedex &&
                "grayscale group-hover:scale-105 group-hover:-translate-y-2 group-hover:grayscale-0",
            )}
            src={pokemon.image}
            alt={pokemon.name}
          />
        </CardBody>
        <CardFooter>
          <div className="flex items-center space-x-2">
            {pokemon.apiTypes.map((type) => (
              <div key={type.name} className="flex items-center space-x-1">
                <img
                  loading="lazy"
                  className={cn(
                    "w-6 h-6",
                    "transition-all duration-300 ease-in-out",
                    !isPokemonInPokedex && "grayscale group-hover:grayscale-0",
                  )}
                  src={type.image}
                  alt={type.name}
                />
                <span className="text-sm">{type.name}</span>
              </div>
            ))}
          </div>
        </CardFooter>
      </Card>

      <PokemonModal pokemon={pokemon} isOpen={modal.isOpen} onOpenChange={modal.onOpenChange} />
      <PokemonCardPreview
        pokemon={pokemon}
        isOpen={preview.isOpen}
        onOpenChange={preview.onOpenChange}
      />
    </>
  );
}
