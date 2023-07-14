import * as yup from "yup";

export const Formschema=yup.object().shape({
firstName:yup.string().required("Enter your First Name"),
lastName:yup.string().required("Enter your Last Name"),
// nationalId:yup.string().required("Enter your National Id"),
// mobileNo:yup.string().required("Enter your Mobile Number").matches( /^[0-9]{10}$/,
// 'Mobile number must be a 10-digit number'),
email:yup.string().required("Enter your Email").email("Enter Valid Email"),
// altEmail:yup.string().required("Enter your Email").email("Enter Valid Email"),
// eContPerson:yup.string().required("Enter your Emergency Contact Person"),
// eContNo:yup.string().required("Enter your Emergency Contact Number"),
// dateOfBirth: yup.string().required('Date of birth is required'),
// nationalityId: yup.number().required('Nationality ID is required'),
// genderId: yup.string().required('Gener is required'),
// mStatusId: yup.number().required('Marital status ID is required'),
// bloodGrpId: yup.number().required('Blood group ID is required'),
// religionId: yup.number().required('Religion ID is required'), 
// relationId: yup.number().required('Relation ID is required'),
address:yup.object().shape({
  primary:yup.object().shape({
    sCode: yup.string().required('State is required'),
    dCode: yup.string().required('District is required'),
    pCode: yup.string().required('Palika is required'),
    city: yup.string().required('City is required'),
    street: yup.string().required('Street is required'),
    contactNo: yup.string().required('Contact No. is required')}),
  temporary:yup.object().shape({
    sCode: yup.string().required('State is required'),
    dCode: yup.string().required('District is required'),
    pCode: yup.string().required('Palika is required'),
    city: yup.string().required('City is required'),
    street: yup.string().required('Street is required'),
    contactNo: yup.string().required('Contact No. is required')}) 
    }), 
  familyDetail:yup.array().of(yup.object().shape({
  name: yup.string().required('Name is required'),
  relationId: yup.string().required('Relation is required'),
  occupation: yup.string().required('Occupation is required'),
  doB: yup.string().required('Date of birth is required'),
  contactNo: yup.string().required('Contact No. is required'),
  nomineeOrder: yup.string().required('Nominee Order is required'),
}))
})

  
