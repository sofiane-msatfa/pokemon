import { useQuery } from "@tanstack/react-query";
import { Modal, ModalContent, ModalBody, Skeleton } from "@nextui-org/react";

import { getPokemonCard } from "@/utils/api";
import { Pokemon } from "@/types";
import { resolvePokemonCardImage } from "@/utils/helpers";

interface PokemonCardPreviewProps {
  pokemon: Pokemon;
  isOpen: boolean;
  onOpenChange: VoidFunction;
}

export function PokemonCardPreview({ pokemon, isOpen, onOpenChange }: PokemonCardPreviewProps) {
  const card = useQuery({
    queryKey: ["pokemon-card", pokemon.name],
    queryFn: () => getPokemonCard(pokemon.name),
    staleTime: Infinity,
    enabled: isOpen,
  });

  const renderImage = () => {
    if (card.isPending) {
      return (
        <Skeleton className="rounded-lg">
          <div className="h-[300px] w-[200px] rounded-lg bg-default-300" />
        </Skeleton>
      );
    }

    if (card.isError) {
      return <div className="text-red-500">Error: {card.error.message}</div>;
    }

    if (card.data.image) {
      const image = resolvePokemonCardImage(card.data.image, {
        quality: "high",
        extension: "webp",
      });
      return <img alt={card.data.name} src={image} />;
    }

    return <img src="compensation.png" alt="compensation" />;
  };

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="rounded-xl"
      classNames={{
        wrapper: "justify-center",
        body: "p-0",
        closeButton: "text-black",
      }}
    >
      <ModalContent>
        <ModalBody>{renderImage()}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
