import * as yup from "yup";

export const Formschema=yup.object().shape({

businessUnit_en:yup.string().required("Enter your Business Unit"),

buCode:yup.string().required("Enter your BU code"),


})