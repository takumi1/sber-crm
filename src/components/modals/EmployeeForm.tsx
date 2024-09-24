import React from 'react';
import { Formik, Field } from 'formik';
import { TextField as FormikTextField } from 'formik-mui';
import * as Yup from 'yup';
import { Employee } from '../types';
import { v4 as uuidv4 } from 'uuid';
import ModalForm from './ModalForm';

interface EmployeeFormProps {
    initialData: Employee | null;
    organizationId: string;
    onSubmit: (emp: Employee) => void;
    onCancel: () => void;
}

const EmployeeSchema = Yup.object().shape({
    firstName: Yup.string().required('Имя обязательно'),
    lastName: Yup.string().required('Фамилия обязательна'),
    position: Yup.string().required('Должность обязательна'),
});

const EmployeeForm: React.FC<EmployeeFormProps> = ({ initialData, organizationId, onSubmit, onCancel }) => (
    <Formik
        initialValues={{
            id: initialData?.id ?? uuidv4(),
            organizationId,
            firstName: initialData?.firstName ?? '',
            lastName: initialData?.lastName ?? '',
            position: initialData?.position ?? '',
        }}
        validationSchema={EmployeeSchema}
        onSubmit={(values) => {
            onSubmit(values);
        }}
    >
        {({ isSubmitting }) => (
            <ModalForm isSubmitting={isSubmitting} onCancel={onCancel}>
                <Field
                    component={FormikTextField}
                    name="firstName"
                    label="Имя"
                    fullWidth
                    margin="normal"
                />
                <Field
                    component={FormikTextField}
                    name="lastName"
                    label="Фамилия"
                    fullWidth
                    margin="normal"
                />
                <Field
                    component={FormikTextField}
                    name="position"
                    label="Должность"
                    fullWidth
                    margin="normal"
                />
            </ModalForm>
        )}
    </Formik>
);

export default EmployeeForm;