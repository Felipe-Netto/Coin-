import React from "react";

interface CategoriaProps {
    id_categoria: number;
    categoria: string;
    valor: number;
  }

export default function Categoria(props: CategoriaProps) {
    return (
        <div key={props.id_categoria} className="bg-gray-200 rounded-lg p-4 shadow-md">
            <h3 className="font-semibold text-lg">{props.categoria.charAt(0).toUpperCase() + props.categoria.slice(1)}</h3>
            <p className="text-gray-700 mt-2">R$ {props.valor}</p>
        </div>
    );
};
