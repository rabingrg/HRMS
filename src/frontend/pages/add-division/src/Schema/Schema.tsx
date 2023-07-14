import * as yup from 'yup'

export const FormSchema = yup.object().shape({
    division_en:yup.string().required("Enter your division"),
    divCode:yup.string().required("Enter division code")
})