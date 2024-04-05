import { Button, Card, CardBody, CardFooter, Chip, Image, Input } from "@nextui-org/react";
import { Pokemon } from '@/types'

interface PokemonCardProps {
    pokemon: Pokemon
}

export function PokemonCard({ pokemon }: PokemonCardProps) {

    const getBackgroundColor = (types: any) => {
        const typeColors: any = {
            "Normal": "bg-gray-300",
            "Feu": "bg-red-500",
            "Eau": "bg-blue-500",
            "Electrique": "bg-yellow-400",
            "Plante": "bg-green-500",
            "Glace": "bg-blue-200",
            "Combat": "bg-red-700",
            // "Poison": "bg-purple-600/85",
            "Sol": "bg-yellow-700",
            "Vol": "bg-blue-300",
            "Psy": "bg-pink-400",
            "Insecte": "bg-green-700",
            "Roche": "bg-gray-700",
            "Spectre": "bg-purple-800",
            "Dragon": "bg-indigo-600",
            "Ténèbres": "bg-gray-800",
            "Acier": "bg-gray-500",
            "Fée": "bg-pink-200"
        };

        for (let i = 0; i < types.length; i++) {
            const typeName = types[i].name;
            if (typeColors[typeName]) {
                return typeColors[typeName];
            }
        }

        return "bg-gray-300";
    };

    return (
        <Card
            key={pokemon.id}
            isFooterBlurred
            radius="lg"
            className={`border-none text-white max-w-[450px] h-[230px] items-center justify-start ${getBackgroundColor(pokemon.apiTypes) + '/75'}`}
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
            <CardFooter className="inline before:bg-white/10 border-white/20 border-1 overflow-hidden absolute before:rounded-xl rounded-large bottom-1 h-[85px] w-[calc(100%_-_8px)] shadow-small z-5">
                <p className="text-lg text-white/80 mb-2">{pokemon.name}</p>
                <div className="flex justify-between">
                    <div>
                        {pokemon.apiTypes.map((type, index) =>
                            <Chip key={index} className={`text-white font-bold text-tiny mr-1 ${getBackgroundColor(pokemon.apiTypes)}`}>{type.name}</Chip>
                        )}
                    </div>
                    <Button className="text-tiny text-white bg-black/80" variant="flat" color="default" radius="lg" size="sm">
                        Voir
                    </Button>
                </div>
            </CardFooter>
        </Card>)
}