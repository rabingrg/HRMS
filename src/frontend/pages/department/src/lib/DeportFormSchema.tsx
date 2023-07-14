import * as yup from 'yup'

export const FormSchema = yup.object().shape({
    department_en:yup.string().required("Enter your department"),
    brnhId: yup.string().required('Select any Branch'),
    divId: yup.string().required("Select any Division"),
    // departmentHead: yup.string().required("Select any Department")
})