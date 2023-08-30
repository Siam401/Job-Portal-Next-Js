import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Modal {
  id: string | number;
  visible: boolean;
}

interface Modal {}

interface ModalState {
  modals: (string | number)[];
  modalsById: Record<string | number, Modal>;
}

const initialState: ModalState = {
  modals: [],
  modalsById: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string | number>) => {
      const modalId = action.payload;
      state.modals.push(modalId);
      state.modalsById[modalId] = {
        id: modalId,
        visible: true,
      };
    },
    closeModal: (state, action: PayloadAction<string | number>) => {
      const modalId = action.payload;
      state.modals = state.modals.filter((id) => id !== modalId);
      delete state.modalsById[modalId];
    },
    toggleModal: (state, action: PayloadAction<string | number>) => {
      const modalId = action.payload;
      const modal = state.modalsById[modalId];
      if (modal) {
        modal.visible = !modal.visible;
      }
    },
  },
});

export const { openModal, closeModal, toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
