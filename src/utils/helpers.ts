export function normalizeText(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function paginate<T>(array: T[], pageNumber: number, pageSize = 10): T[] {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

