import { apiUrl } from '../config';

export const getBreweries = async () => {
  try {
    const response = await fetch(`${apiUrl}/breweries`);
    const data = await response.json();

    return data;
  } catch (error) {
    return { error };
  }
};

export const getBrewery = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/breweries/${id}`);
    const data = await response.json();

    return data;
  } catch (error) {
    return { error };
  }
};
