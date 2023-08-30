import { Button } from 'primereact/button';
import { checkEmpty } from '@/services/Utility';
import { useAppDispatch } from '@/redux/hook';
import { openModal } from '@/redux/features/modal.slice';

export default function FormActionComponent({
  editMode,
  infoData,
  setEditMode,
  setIsDisable,
  isSaveLoading,
  isDeleteLoading,
  dialogId,
}: any) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-end w-full">
      {editMode ? (
        <Button
          type="button"
          className="ms-2 rounded-lg w-auto min-w-[110px] px-9 py-2.5 text-center"
          label="Edit"
          severity='info'
          onClick={(event: any) => {
            setEditMode(false);
            setIsDisable(false);
            event.preventDefault();
          }}
        />
      ) : (
        <Button
          className="ms-2 rounded-lg w-auto min-w-[110px] px-9 py-2.5 text-center"
          severity="success"
          label="Save"
          loading={isSaveLoading}
        />
      )}
      {!checkEmpty(infoData) && (
        <Button
          type="button"
          className="ms-2 rounded-lg w-auto min-w-[110px] px-9 py-2.5 text-center"
          severity="danger"
          label="Delete"
          loading={isDeleteLoading}
          onClick={(e: any) => {
            dispatch(openModal(dialogId));
            e.preventDefault();
          }}
        />
      )}
    </div>
  );
}
