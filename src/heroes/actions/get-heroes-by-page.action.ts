import { heroApi } from "../api/hero.api";
import type { HeroesResponse } from "../types/get-heroes.response";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroesByPageAction = async (
  page: number,
  limit: number = 6
): Promise<HeroesResponse> => {
  if (isNaN(page)) {
    page = 1;
  }

  if (isNaN(limit)) {
    limit = 6;
  }

  const { data } = await heroApi.get<HeroesResponse>(`/`, {
    params: {
      limit: limit,
      offset: (page - 1) * limit,
    },
  });

  //voy a barrear los heroes de la data
  const heroes = data.heroes.map((hero) => ({
    ...hero, //exparsir los datos de hero
    image: `${BASE_URL}/images/${hero.image}`, //sobreescribo el atributo image
  }));

  return {
    ...data,
    heroes,
  };
};
