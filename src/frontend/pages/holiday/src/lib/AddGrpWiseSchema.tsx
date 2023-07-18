import * as yup from 'yup';

export const AddGrpWiseSchema = yup.object().shape({
    hGrpId: yup.string().required('Select Group'),
    holidays: yup.string().required("Select Holiday")
})