import * as yup from 'yup';

export const AddGrpWiseSchema = yup.object().shape({
    holidays: yup.string().required("Select Holiday")
})