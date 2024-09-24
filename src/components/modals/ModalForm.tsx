import React, { ReactNode } from 'react';
import { Button, DialogContent, DialogActions } from '@mui/material';
import {Form} from "formik";

interface FormDialogProps {
    children: ReactNode;
    isSubmitting: boolean;
    onCancel: () => void;
}

const ModalForm: React.FC<FormDialogProps> = ({ children, isSubmitting, onCancel }) => (
    <Form>
        <DialogContent>
            {children}
        </DialogContent>
        <DialogActions>
            <Button onClick={onCancel} color="secondary">
                Отмена
            </Button>
            <Button type="submit" color="primary" disabled={isSubmitting}>
                Сохранить
            </Button>
        </DialogActions>
    </Form>
);

export default ModalForm;