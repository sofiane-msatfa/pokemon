export function normalizeText(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function paginate<T>(array: T[], pageNumber: number, pageSize = 10): T[] {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

type ImageQuality = "high" | "low";
type ImageExtension = "png" | "jpg" | "webp";

export function resolvePokemonCardImage(
  url: string,
  opts?: { quality: ImageQuality; extension: ImageExtension },
) {
  const { quality = "high", extension = "webp" } = opts ?? {};
  return `${url}/${quality}.${extension}`;
}

/** Returns a tuple with two arrays: one with items that pass the predicate, and one with items that don't. */
export function partition<T>(array: T[], predicate: (item: T) => boolean): [T[], T[]] {
  return array.reduce(
    (acc, item) => {
      acc[predicate(item) ? 0 : 1].push(item);
      return acc;
    },
    [[], []] as [T[], T[]],
  );
}
