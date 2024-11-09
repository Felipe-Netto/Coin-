import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

interface Categoria {
  id_categoria: number;
  nome: string;
  descricao: string;
  totalGastos: number;
}

interface ListarCategoriasProps {
  open: boolean;
  onClose: () => void;
}

export function ListarCategorias({ open, onClose }: ListarCategoriasProps) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (open) {
      const fetchCategorias = async () => {
        try {
          const response = await axios.get(`http://localhost:3333/listar-categorias/${user?.id_user}`);
          console.log('Categorias:', response.data);
          setCategorias(response.data);
        } catch (error) {
          console.error('Erro ao buscar categorias:', error);
        }
      };

      fetchCategorias();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="text-center">
                <DialogTitle as="h3" className="text-lg font-semibold text-gray-900">
                  Categorias
                </DialogTitle>
              </div>
              <div className="mt-4 max-h-96 overflow-y-auto">
                {categorias.map((categoria) => (
                  <div key={categoria.id_categoria} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                    <h4 className="text-xl font-bold text-blue-900">{categoria.nome}</h4>
                    <p className="text-gray-700">{categoria.descricao}</p>
                    <p className="text-gray-700">Total gasto: R${categoria.totalGastos}</p>
                  </div>
                ))}
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}