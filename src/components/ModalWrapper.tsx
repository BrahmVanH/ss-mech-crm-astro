import { useCallback, useRef, type PropsWithChildren } from "react";

const ModalWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [dialogRef]);

  const closeDialog = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [dialogRef]);

  return (
    <>
      <button onClick={openDialog} className="text-xs underline  ml-1  ">
        edit
      </button>

      <dialog ref={dialogRef} className="max-w-[50%] max-h-[50%]">
        <div className="flex w-full justify-end sticky top-0">
          <button
            className="mx-2 mt-1 px-1 pb-1 top-0 bg-gray-400"
            onClick={closeDialog}
          >
            x
          </button>
        </div>
        {children}
      </dialog>
    </>
  );
};

export default ModalWrapper;
