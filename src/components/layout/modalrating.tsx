"use client";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  error: boolean;
  handleRating: () => void;
}

export function ModalRating({
  isOpen,
  onClose,
  children,
  error,
  handleRating,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md rounded-xl bg-zinc-900 p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-white text-center">
          Avaliar jogo
        </h2>

        <p className="mb-4 text-zinc-300 text-center">
          Escolha uma nota para este jogo.
        </p>

        <div className="relative z-10  p-6 rounded-xl mb-4">{children}</div>
        {error && (
          <p className="text-red-500 text-base text-center mt-2 mb-2">
            Por favor, selecione uma nota antes de salvar.
          </p>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-md bg-zinc-700 px-4 py-2 text-white"
          >
            Cancelar
          </button>

          <button
            onClick={handleRating}
            className="rounded-md bg-green-600 px-4 py-2 text-white"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
