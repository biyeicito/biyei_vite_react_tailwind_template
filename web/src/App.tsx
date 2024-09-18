import React, { useState, useEffect } from "react";
import { fetchNui } from "./utils/fetchNui";

interface Coords {
  x: number | null;
  y: number | null;
  z: number | null;
}

const CoordinatesModal: React.FC = () => {
  const [coords, setCoords] = useState<Coords>({ x: null, y: null, z: null });
  const [isOpen, setIsOpen] = useState<boolean>(false); // Controla la visibilidad del modal

  // Escuchar mensajes de FiveM para mostrar/ocultar el modal
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.action === 'show') {
        setIsOpen(event.data.status); // Cambia el estado del modal basado en el mensaje
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);



  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        Close();
        
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);


  const Close = () => {
    fetchNui('CloseNUI')
  }

  const getCurrentCoords = () => {
    fetchNui<Coords>("getCoordinates") // We request the coordinates using fetchNui
      .then((data) => {
        setCoords(data); // We update the coordinates with the response received.
      })
      .catch((err) => {
        console.error("Error al obtener las coordenadas:", err);
      });
  };

  // Helper to limit the decimal places to 3
  const formatCoord = (coord: number | null) =>
    coord !== null ? coord.toFixed(3) : "";

  // Si el modal no está abierto, no lo mostramos
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-950 text-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Get Coordinates</h2>
        <div className="flex flex-col space-y-3">
          <div className="flex space-x-2">
            <input
              type="text"
              className="border border-slate-600 p-2 rounded w-full bg-slate-900 outline-none"
              placeholder="X"
              value={formatCoord(coords.x)}
              readOnly
            />
            <input
              type="text"
              className="border border-slate-600 p-2 rounded w-full bg-slate-900 outline-none"
              placeholder="Y"
              value={formatCoord(coords.y)}
              readOnly
            />
            <input
              type="text"
              className="border border-slate-600 p-2 rounded w-full bg-slate-900 outline-none"
              placeholder="Z"
              value={formatCoord(coords.z)}
              readOnly
            />
          </div>
          <button
            onClick={getCurrentCoords}
            className="bg-blue-900 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-blue-700 transition duration-300"
          >
            Current Coordinates
          </button>

          <button
            onClick={Close} // Cerrar el modal
            className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-red-700 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoordinatesModal;
