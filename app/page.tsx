"use client";
import { FC, MouseEvent, useState, useEffect, useRef, UIEvent } from "react";
import { fetchData, fetchCatImage } from "./api";
import { ItemType } from "./types";
import Card from "./components/Card";
import Spinner from "./components/Spinner";
import Item from "./components/Item";

const count = 20;
const ItemsCount = 10;

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [data, setData] = useState<ItemType[]>([]);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [catImageUrl, setCatImageUrl] = useState<string>("");


  const handleDeleteItem = (idToDelete: number) => {
    setData((prevData) => prevData.filter((item) => item.id !== idToDelete));
    if (idToDelete === ItemsCount - 1) {
      fetchedCatImage();
    }
  };

  const fetchedCatImage = async () => {
    setIsLoading(true);
    const fetchedCatImage = await fetchCatImage();
    setCatImageUrl(fetchedCatImage);
    setIsLoading(false);
  };

  const Dialog: FC<{ closeDialog: () => void }> = ({ closeDialog }) => {
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          closeDialog();
        }
      };
      document.addEventListener("keydown", handleKeyDown);

      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [closeDialog]);

    const handleBackdropClick = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        closeDialog();
      }
    };

    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
        onClick={handleBackdropClick}
      >
        <div
          ref={dialogRef}
          className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
        >
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold">Dialog Title</h2>
            {isLoading && <Spinner />}
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={closeDialog}
            >
              Close
            </button>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <p className="mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia ea eaque sapiente reprehenderit sequi aliquid ipsam
                dolores laboriosam laudantium voluptatibus.
              </p>

              <ul className="mb-4 space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Link 1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Link 2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Link 3
                  </a>
                </li>
              </ul>
            </div>

            <ul
              className="max-h-96 overflow-y-auto border border-gray-300 p-2 flex-1"
              onScroll={handleScroll}
            >
              {data.map((item) => (
                <Item key={item.id} item={item} onDelete={handleDeleteItem} />
              ))}
            </ul>
          </div>
          {catImageUrl && (
            <div className="flex flex-col items-center">
              <img src={catImageUrl} alt="A cat" className="my-4 rounded" />
              <span>You've deleted the last item!</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchedData = async () => {
      setIsLoading(true);
      const fetchedData = await fetchData(startIndex, count);
      setData(fetchedData);
      setStartIndex(startIndex + count);
      setIsLoading(false);
    };
    fetchedData();
  }, []);

  const handleScroll = (event: UIEvent<HTMLElement>) => {
    const element = event.currentTarget;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      fetchNextItems();
    }
  };

  const fetchNextItems = async () => {
    setIsLoading(true);
    const fetched = await fetchData(startIndex, count);
    setData((prevData) => [...prevData, ...fetched]);
    setStartIndex(startIndex + count);
    setIsLoading(false);
  };

  return (
    <main className="flex flex-col min-h-screen p-8 pb-64">
      <div className="flex flex-col items-center">
        <h1 className="font-semibold tracking-tight sm:text-7xl text-center">
          Header
        </h1>
        <p className="mt-2 text-gray-600 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic inventore
          ipsam consequuntur voluptas aliquam, harum autem iusto facilis
          molestiae sunt.
        </p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setIsDialogOpen(true)}
        >
          Button
        </button>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <Card />
      </div>
      {isDialogOpen && <Dialog closeDialog={() => setIsDialogOpen(false)} />}
    </main>
  );
}
