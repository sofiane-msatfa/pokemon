import { ApiType, Type } from "@/types";

type ColorMap = Partial<Record<Type, string>>;

export function getBackgroundColor(types: ApiType[]) {
  const mainColorMap: ColorMap = {
    Normal: "bg-gray-600",
    Feu: "bg-red-600",
    Eau: "bg-blue-600",
    Électrik: "bg-yellow-600",
    Plante: "bg-green-600",
    Glace: "bg-blue-600",
    Psy: "bg-pink-600",
    Insecte: "bg-green-600",
    Roche: "bg-gray-600",
    Spectre: "bg-purple-600",
    Dragon: "bg-indigo-600",
    Ténèbres: "bg-gray-600",
    Acier: "bg-gray-600",
  };

  const secondColorMap: ColorMap = {
    Combat: "bg-red-600",
    Fée: "bg-pink-600",
    Poison: "bg-purple-600",
    Sol: "bg-yellow-600",
    Vol: "bg-blue-600",
  };

  for (const type of types) {
    const typeName = type.name;
    if (mainColorMap[typeName]) {
      return mainColorMap[typeName];
    }
  }

  for (const type of types) {
    const typeName = type.name;
    if (secondColorMap[typeName]) {
      return secondColorMap[typeName];
    }
  }

  return "bg-gray-300";
}
