export interface Character {
  id: number;
  name: string;
  race: string;
  ki: string;
  maxKi: string;
  image: string;
  description: string;
}

export interface CharacterResponse {
  items: Character[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    first: string;
    previous: string | null;
    next: string | null;
    last: string;
  };
}