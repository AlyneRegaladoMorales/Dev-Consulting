export interface CustomCharacter{
  id: number;
  name: string;
  race: string;
  ki: string;
  maxKi: string;
  image: string;
  description: string;
}

export interface Character {
  id: number;
  name: string;
  race: string;
  ki: string;
  gender?: string;
  maxKi: string;
  image: string;
  description: string;
  affiliation?: string;
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