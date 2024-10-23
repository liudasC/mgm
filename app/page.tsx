"use client";
import { FC, MouseEvent, useState, useEffect, useRef } from "react";

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const Card: FC = () => {
    return (
      <div className="max-w-sm p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold">Card Header</h2>
        <p className="mt-2 text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta veniam
          facere nesciunt magnam minima, quaerat cum odio quidem expedita,
          perspiciatis provident, natus rerum nisi itaque voluptates esse
          doloremque recusandae laudantium corrupti ipsum quia adipisci culpa
          modi! Amet impedit minima expedita assumenda optio, omnis molestiae
          neque natus officiis voluptatum commodi atque!
        </p>
      </div>
    );
  };

  interface DialogProps {
    closeDialog: () => void;
  }

  const Dialog: FC<DialogProps> = ({ closeDialog }) => {
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
          <h2 className="text-xl font-bold mb-4">Dialog Title</h2>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ea
            eaque sapiente reprehenderit sequi aliquid ipsam dolores laboriosam
            laudantium voluptatibus.
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

          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={closeDialog}
          >
            Close
          </button>
        </div>
      </div>
    );
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
