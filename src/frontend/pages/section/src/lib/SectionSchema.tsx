import * as yup from 'yup'

export const FormSchema = yup.object().shape({
    section_en:yup.string().required("Enter your Section"),
    brnhId: yup.string().required('Select any Branch'),
    divId: yup.string().required("Select any Division"),
    // departmentHead: yup.string().required("Select any Department")
})