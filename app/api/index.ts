import { ItemType } from "../types";

const defaultData: ItemType[] = Array.from({ length: 500 }, (_, index) => ({
  id: index,
  name: `Item ${index + 1}`,
}));

export const fetchData = (
  startIndex: number,
  count: number
): Promise<{ data: ItemType[]; total: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const slicedData = defaultData.slice(startIndex, startIndex + count);
      resolve({
        data: slicedData, 
        total: defaultData.length, 
      });
    }, 1000);
  });
};

export const fetchCatImage = async (): Promise<string> => {
  try {
    const response = await fetch("https://placecats.com/millie/300/150");
    if (!response.ok) {
      throw new Error("Network error");
    }

    return response.url;
  } catch (error) {
    throw error;
  }
};
