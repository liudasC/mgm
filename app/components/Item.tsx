import React, { FC } from "react";
import { ItemType } from "../types";

  const Item: FC<{ item: ItemType; onDelete: (id: number) => void }> = ({
    item,
    onDelete,
  }) => {
    return (
      <li className="flex justify-between py-1">
        <span>{item.name}</span>
        <button
          className="text-red-500 hover:text-red-600 border border-transparent hover:border-red-500 px-2 py-1 rounded focus:outline-none"
          onClick={() => onDelete(item.id)}
          aria-label={`Delete ${item.name}`}
        >
          X
        </button>
      </li>
    );
  };
  
export default Item;