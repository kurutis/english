import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    formData: {
        surname: '',
        name: '',
        patronymic: '',
        documentSeries: '',
        documentNumber: '',
        late: false
    },
    errors: {},
    showName: false
};

const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        setFieldValue: (state, action) => {
            state.formData[action.payload.field] = action.payload.value;
        },
        setErrors: (state, action) => {
            state.errors = action.payload;
        },
        clearForm: (state) => {
            state.formData = { ...initialState.formData };
            state.errors = {};
            state.showName = false;
        },
        showUserName: (state) => {
            state.showName = true;
        }
    }
});

export const { setFieldValue, setErrors, clearForm, showUserName } = authorizationSlice.actions;
export default authorizationSlice.reducer;