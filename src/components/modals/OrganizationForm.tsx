import React from 'react';
import { Formik, Field } from 'formik';
import { TextField as FormikTextField } from 'formik-mui';
import * as Yup from 'yup';
import { Organization } from '../types';
import { v4 as uuidv4 } from 'uuid';
import ModalForm from './ModalForm';

interface OrganizationFormProps {
    initialData: Organization | null;
    onSubmit: (org: Organization) => void;
    onCancel: () => void;
}

const OrganizationSchema = Yup.object().shape({
    name: Yup.string().required('Название обязательно'),
    address: Yup.string().required('Адрес обязателен'),
});

const OrganizationForm: React.FC<OrganizationFormProps> = ({ initialData, onSubmit, onCancel }) => (
    <Formik
        initialValues={{
            id: initialData?.id ?? uuidv4(),
            name: initialData?.name ?? '',
            address: initialData?.address ?? '',
        }}
        validationSchema={OrganizationSchema}
        onSubmit={(values) => {
            onSubmit(values);
        }}
    >
        {({ isSubmitting }) => (
            <ModalForm isSubmitting={isSubmitting} onCancel={onCancel}>
                <Field
                    component={FormikTextField}
                    name="name"
                    label="Название"
                    fullWidth
                    margin="normal"
                />
                <Field
                    component={FormikTextField}
                    name="address"
                    label="Адрес"
                    fullWidth
                    margin="normal"
                />
            </ModalForm>
        )}
    </Formik>
);

export default OrganizationForm;