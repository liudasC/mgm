import { DefaultData } from "../types";

const defaultData: DefaultData[] = Array.from({ length: 500 }, (_, index) => `Item ${index + 1}`);

export const fetchData = (startIndex: number, count: number): Promise<DefaultData[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(defaultData.slice(startIndex, startIndex + count)); 
      }, 1000);
    });
  };