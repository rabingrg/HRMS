import * as Tabs from '@radix-ui/react-tabs';
import { useMutation, useQuery } from 'react-query';
import { request } from '@hrms-workspace/frontend/utils';
import { useEffect, useState } from 'react';
import PersonalInformation from './IndividualPage/PersonalInformation';
import { ToastContainer, toast } from 'react-toastify';
import ContactInformation from './IndividualPage/ContactInformation';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import {
  GetEmpFamilyDetailType,
  GetEmployeeAddressType,
  GetEmployeeDetailsType,
  IFormData,
  InsertEmployeeAddressType,
  InsertEmployeeFamilyType,
  StoreType,
} from '@hrms-workspace/frontend/types';
import Address from './IndividualPage/Address';
import RelationshipInformation from './IndividualPage/RelationshipInformation';
import { Store } from '@hrms-workspace/frontend/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { Formschema } from './Schema/FormSchema';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Register() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [steps, setSteps] = useState('1');
  const [topic, setTopic] = useState('Enter Your Personal Information');
  const isEn = Store((state: StoreType) => state.isEn);
  const SetisEn = Store((state: StoreType) => state.setIsEn);
  const token = Store(
    (state: StoreType) => state.logInUserData.accessToken
  ) as string;
  const logInUserData = Store((state: StoreType) => state.logInUserData);
  const empId = Store((state: StoreType) => state.logInUserData.empId);

  const setEmployeeData = Store((state: StoreType) => state.setEmployeeData);
  const setAddressData = Store((state: StoreType) => state.setAddressData);
  const addressdata = Store((state: StoreType) => state.addressdata);
  const [relationdata, setRelationData] = useState<GetEmpFamilyDetailType[]>(
    []
  );
  // console.log('Employeee', employeeData);
  useEffect(() => {
    if (logInUserData.prefLang === 'np') {
      SetisEn(false);
      i18n.changeLanguage('np');
    } else {
      SetisEn(true);

      i18n.changeLanguage('en');
    }
  }, [logInUserData.prefLang]);

  const methods = useForm<IFormData>({
    defaultValues: {
      empId: null,
      userId: null,
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      altEmail: '',
      mobileNo: '',
      dateOfBirth: '',
      nationalId: '',
      nationalityId: 0,
      genderId: 0,
      mStatusId: 0,
      bloodGrpId: 0,
      religionId: 0,
      eContPerson: '',
      eContNo: '',
      relationId: 0,
      photo: '',
      postedBy: 0,

      address: {
        primary: {
          id: null,
          sCode: 0,
          dCode: 0,
          pCode: 0,
          city: '',
          street: '',
          contactNo: '',
          addressTypeId: 1,
        },
        temporary: {
          id: null,

          sCode: 0,
          dCode: 0,
          pCode: 0,
          city: '',
          street: '',
          contactNo: '',
          addressTypeId: 2,
        },
      },
      familyDetail: [
        {
          id: null,
          name: '',
          relationId: 0,
          occupation: '',
          doB: '',
          contactNo: '',
          nomineeOrder: 0,
        },
      ],
    },
    resolver: yupResolver(Formschema),
    mode: 'onChange',
  });
  const { control, handleSubmit, setValue } = methods;
  const { replace, append, fields } = useFieldArray({
    control,
    name: 'familyDetail',
  });

  const handleOnValueChange = (v: string) => {
    setSteps(v);
    switch (v) {
      case '1':
        setTopic('Enter your Personal Information');

        break;
      case '2':
        setTopic('Enter your Contact Information');

        break;
      case '3':
        setTopic('Enter your Address');

        break;
      case '4':
        setTopic('Enter your Relation Information');

        break;
    }
  };
  useQuery(
    ['employee', logInUserData.empId, token, isEn],
    () =>
      request.employee.getEmployeeById(
        logInUserData.empId as number,
        token,
        isEn
      ),
    {
      enabled: !!logInUserData.empId,
      onSuccess(data) {
        setEmployeeData(data.data);
        const employeeData: GetEmployeeDetailsType = data.data;
        const date = new Date(
          employeeData?.dateOfBirth as string
        ).toLocaleDateString('en-CA');
        if (logInUserData.empId !== null) {
          setValue('firstName', employeeData?.firstName);
          setValue('middleName', employeeData?.middleName);
          setValue('lastName', employeeData?.lastName);
          setValue('dateOfBirth', date);
          setValue('mobileNo', employeeData?.mobileNo);
          setValue('email', employeeData?.email);
          setValue('altEmail', employeeData?.altEmail);
          setValue('eContPerson', employeeData?.eContPerson);
          setValue('eContNo', employeeData?.eContNo);
          setValue('genderId', employeeData?.genderId);
          setValue('mStatusId', employeeData?.mStatusId);
          setValue('bloodGrpId', employeeData?.bloodGrpId);
          setValue('religionId', employeeData?.religionId);
          setValue('nationalityId', employeeData?.nationalityId);
          setValue('relationId', employeeData?.relationId);
          setValue('nationalId', employeeData?.nationalId);
        }
      },
    }
  );

  useQuery(
    ['addressdata', empId, token, isEn],
    () => request.employee.getAddressById(empId as number, token, isEn),
    {
      enabled: !!logInUserData.empId,
      onSuccess(data) {
        setAddressData(data.data);
        const addressdata: GetEmployeeAddressType[] = data.data;

        if (logInUserData.empId !== null) {
          setValue('address.primary.sCode', addressdata[0]?.sCode);
          setValue('address.primary.dCode', addressdata[0]?.dCode);
          setValue('address.primary.pCode', addressdata[0]?.pCode);
          setValue('address.primary.city', addressdata[0]?.city);
          setValue('address.primary.contactNo', addressdata[0]?.contactNo);
          setValue('address.primary.street', addressdata[0]?.street);

          setValue('address.temporary.sCode', addressdata[1]?.sCode);
          setValue('address.temporary.dCode', addressdata[1]?.dCode);
          setValue('address.temporary.pCode', addressdata[1]?.pCode);
          setValue('address.temporary.city', addressdata[1]?.city);
          setValue('address.temporary.street', addressdata[1]?.street);
          setValue('address.temporary.contactNo', addressdata[1]?.contactNo);
        }
      },
    }
  );

  useQuery(
    ['relation', isEn, token, empId],
    () => request.employee.getRelationById(empId as number, token, isEn),
    {
      enabled: !!empId,
      onSuccess(data) {
        setRelationData(data.data);
        const relationdata: GetEmpFamilyDetailType[] = data.data;
        console.log('relationdata', data.data);
        if (empId !== null) {
          replace(
            relationdata.map((value: GetEmpFamilyDetailType) => {
              value.doB = new Date(value.doB as string).toLocaleDateString(
                'en-CA'
              );
              value.ids = value.id;
              console.log('value', value);
              return value;
            })
          );
        }
      },
    }
  );

  const { mutateAsync } = useMutation<unknown, unknown, IFormData>(
    ['insertallemployee'],
    (formdata: IFormData) =>
      request.employee.insertEmployee(formdata as never, token),
    {
      onSuccess(data) {
        toast.success('New Employee Successfully created', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
      onError() {
        toast.error('Error creating employee', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
    }
  );

  const formsubmit = (data: any) => {
    data.address = Object.values(data.address);
    data.userId = logInUserData.userId;
    data.postedBy = logInUserData.userId;
    if (empId == null) {
      data.empId = null;

      mutateAsync(data);
    } else {
      data.empId = empId;

      const { address } = data;
      address[0].id = addressdata[0]?.id;
      address[1].id = addressdata[1]?.id;

      const { familyDetail } = data;

      console.log('data', data);
      mutateAsync(data);
      navigate('/login');
    }
  };

  console.log('Relation Data', relationdata);

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(formsubmit)}>
          <Tabs.Root
            onValueChange={handleOnValueChange}
            orientation="vertical"
            defaultValue="1"
            value={steps}
            className="bg-white-12 lg:relative lg:flex"
          >
            <div className="bg-accent h-[14rem] w-screen pl-[1.25rem] pt-[1.25rem] pr-[1.25rem] lg:w-[30.70rem] lg:pl-[4.5rem]  lg:pt-[2rem] lg:h-[100vh] lg:fixed lg:top-0 lg:left-0">
              <div className="lg:mb-[3.25rem] mb-[1.25rem]">
                <img
                  className="lg:w-[6.5rem] lg:h-[3rem] w-[3.25rem] h-[1.5rem] object-contain"
                  src="http://hrms.channakyasoft.com/assets/HRMS.png"
                  alt="Hrms Logo"
                />
              </div>
              <div>
                <h1 className="text-white-12 font-semibold text-[1.25rem]">
                  Welcome to HRMS
                </h1>
                <p className="text-[#CBD5E1] text-[0.75rem] font-normal pt-[0.5rem] ">
                  We kindly invite you complete the following steps by filling
                  out the form to ensure that your information is accurately
                  recorded
                </p>
              </div>

              <div className="lg:mt-[2.375rem] hidden lg:block ">
                <h1 className="text-white-12 text-[1.25rem] leading-[2rem] font-semibold pb-[0.75rem]">
                  Step {steps}
                </h1>
                <p className="font-normal text-[0.875rem] leading-[1.25rem] text-[#E2E8F0]">
                  {topic}
                </p>
              </div>

              <div className="pt-[1.5rem]">
                <Tabs.List
                  className="flex  items-center justify-center lg:items-start lg:justify-start lg:flex-col  lg:pl-0 space-x-[1.5rem] lg:space-x-0"
                  aria-label="Manage your account"
                >
                  <Tabs.Trigger
                    className="lg:mb-[1.5rem] data-[state=active]:text-white-12 data-[state=inactive]:text-[#64748B]"
                    value="1"
                  >
                    <div className="flex items-center lg:space-x-[1.125rem]">
                      <span
                        className="mr-[18px] lg:mr-0
                       border-2
                       rounded-full w-[1.5rem] h-[1.5rem] flex  justify-center"
                      >
                        1
                      </span>

                      <h1 className="hidden lg:block text-[0.75rem] leading-[1rem] font-normal">
                        Personal Information{' '}
                      </h1>
                    </div>
                    {/* <div className="border border-dashed border-[#64748B]"></div> */}
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    className="lg:mb-[1.5rem] data-[state=active]:text-white-12 data-[state=inactive]:text-[#64748B]"
                    value="2"
                  >
                    <div className="flex items-center">
                      <span className="lg:mr-[1.125rem] border-2 rounded-full w-[1.5rem] h-[1.5rem] flex flex-col items-center">
                        2
                      </span>
                      <h1 className=" hidden lg:block text-[0.75rem] leading-[1rem] font-normal">
                        Contact Information{' '}
                      </h1>
                    </div>
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    className="lg:mb-[1.5rem] data-[state=active]:text-white-12 data-[state=inactive]:text-[#64748B]"
                    value="3"
                  >
                    <div className="flex items-center">
                      <span className=" lg:mr-[1.125rem] border-2 rounded-full w-[1.5rem] h-[1.5rem] flex flex-col items-center">
                        3
                      </span>
                      <h1 className="hidden lg:block text-[0.75rem] leading-[1rem] font-normal">
                        Address{' '}
                      </h1>
                    </div>
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    className="mb-[24px] data-[state=active]:text-white-12 data-[state=inactive]:text-[#64748B]"
                    value="4"
                  >
                    <div className="flex items-center">
                      <span className="lg:mr-[1.125rem] border-2 rounded-full w-[1.5rem] h-[1.5rem] flex flex-col items-center">
                        4
                      </span>
                      <h1 className=" hidden lg:block  text-[0.75rem] leading-[1rem] font-normal">
                        Relationship Information{' '}
                      </h1>
                    </div>
                  </Tabs.Trigger>
                </Tabs.List>
              </div>

              <div className="mt-[6.25rem] hidden  lg:block  ">
                <p className="text-[#94A3B8] text-[0.75rem] leading-[1rem] font-light w-[23.188rem]">
                  If you prefer not to fill out the form, you can click "Fill
                  Later" to return. Please note that incomplete information may
                  result in incomplete records. Contact our HR department for
                  assistance. Thank you.{' '}
                </p>
                <p
                  className="text-[0.75rem] text-[#94A3B8] pt-[0.75rem] underline hover:cursor-pointer"
                  onClick={() => navigate('/login')}
                >
                  Fill Later
                </p>
              </div>
            </div>
            <div className="  ml-[1.25rem] mt-[1.5rem] lg:mt-0 mr-[1.25rem] lg:w-full lg:ml-[30.688rem]">
              <Tabs.Content value="1">
                <PersonalInformation
                  onNextClick={() => handleOnValueChange('2')}
                />
              </Tabs.Content>
              <Tabs.Content value="2">
                <ContactInformation
                  onNextClick={() => handleOnValueChange('3')}
                  onBackClick={() => handleOnValueChange('1')}
                />
              </Tabs.Content>
              <Tabs.Content value="3">
                <Address
                  onNextClick={() => handleOnValueChange('4')}
                  onBackClick={() => handleOnValueChange('2')}
                />
              </Tabs.Content>
              <Tabs.Content value="4">
                <RelationshipInformation
                  onBackClick={() => handleOnValueChange('3')}
                />
              </Tabs.Content>
            </div>
          </Tabs.Root>
        </form>
      </FormProvider>
      <ToastContainer />
    </>
  );
}

export default Register;
