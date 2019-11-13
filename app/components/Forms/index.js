import { change, reset } from 'redux-form';
import { store } from '../../App';

const setFormField = (form, key, value) => {
    store.dispatch(change(form, key, value));
}

const resetFormField = (form,key) => {
    store.dispatch(change(form, key, null));
}

const resetForm = (form) => {
    store.dispatch(reset(form));
}

export {
    setFormField,
    resetFormField,
    resetForm
}
