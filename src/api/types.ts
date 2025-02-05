export type Character = {
    id: number;
    name: string;
    species: string;
    gender: string;
    status: string;
    created: string;
    image: string
}

export type ApiResponse = {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: Character[];
}