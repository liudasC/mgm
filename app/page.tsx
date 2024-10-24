"use client";
import { useState } from "react";
import Card from "./components/Card";
import Dialog from "./components/Dialog";

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

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
