import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

interface abrirProps {
    open: boolean
    onClose: () => void
    onRemoveSaldo: (novoSaldo: number) => void
}

interface Option {
    id_categoria: number;
    nome: string;
}

interface formData {
    valor: string;
    id_categoria: number;
    descricao: string;
}

export function RemoverSaldo({ open, onClose, onRemoveSaldo }: abrirProps) {
    const [options, setOptions] = useState<Option[]>([]);
    const [selectedOption, setSelectedOption] = useState('');
    const { register, handleSubmit } = useForm<formData>();
    const { user } = useContext(AuthContext);

    const handleRemoveTransaction = async (data: formData) => {
        const valorNumerico = parseFloat(data.valor.replace(',', '.'));

        try {
            await axios.post('http://localhost:3333/adicionar-lancamento', {
                id_user: user?.id_user,
                id_categoria: Number(data.id_categoria),
                saida: true,
                valor: valorNumerico,
                descricao: data.descricao,
            });

            const response = await axios.post(`http://localhost:3333/find-user-by-id`, { 'id_user': user?.id_user });
            const novoSaldo = response.data.saldo;

            onRemoveSaldo(novoSaldo);

            onClose();
        } catch (error) {
            console.error("Erro ao remover saldo:", error);
        }
    };


    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await axios.get('http://localhost:3333/listar-categorias');
                setOptions(response.data);
            } catch (error) {
                console.error('Erro ao buscar opções:', error);
            }
        };

        fetchOptions();
    }, []);

    const handleSelectChange = (event: any) => {
        setSelectedOption(event.target.value);
    };


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
                        <form onSubmit={handleSubmit(handleRemoveTransaction)}>
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="text-center">
                                    <DialogTitle as="h3" className="text-lg font-semibold text-gray-900">
                                        Remover saldo
                                    </DialogTitle>
                                    <div className="mt-4">
                                        <input
                                            {...register('valor')}
                                            type="text"
                                            name='valor'
                                            placeholder="Valor"
                                            className="w-full rounded-md border px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 mb-3"
                                        />
                                        <select
                                            {...register('id_categoria')}
                                            id="dynamicSelect"
                                            name='id_categoria'
                                            value={selectedOption}
                                            onChange={handleSelectChange}
                                            className="w-full rounded-md border px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 mb-3"
                                        >
                                            <option className='text-gray-900' value="">Selecione uma categoria</option>
                                            {options.map((option) => (
                                                <option key={option.id_categoria} value={option.id_categoria}>
                                                    {option.nome}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            {...register('descricao')}
                                            type="text"
                                            name='descricao'
                                            placeholder="Descrição (opcional)"
                                            className="w-full rounded-md border px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 mb-3"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="submit"
                                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                >
                                    Confirmar
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
