import React from 'react';
import EntityList from './EntityList';
import { getEmployees, saveEmployees } from '../services/localStorageService';
import { Employee } from './types';
import EmployeeForm from './modals/EmployeeForm';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

const EmployeeList: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const columns = [
        { field: 'firstName' as keyof Employee, headerName: 'Имя' },
        { field: 'lastName' as keyof Employee, headerName: 'Фамилия' },
        { field: 'position' as keyof Employee, headerName: 'Должность' },
    ];

    const handleDelete = (empId: string) => {
        const allEmployees = getEmployees();
        const updatedEmployees = allEmployees.filter(e => e.id !== empId);
        saveEmployees(updatedEmployees);
    };

    const getData = () => getEmployees().filter(e => e.organizationId === id);

    const saveData = (updatedSubset: Employee[]) => {
        const allEmployees = getEmployees();
        const otherEmployees = allEmployees.filter(e => e.organizationId !== id);
        const newAll = [...otherEmployees, ...updatedSubset];
        saveEmployees(newAll);
    };

    return (
        <>
            <Button variant="contained" onClick={() => navigate(-1)} style={{ marginBottom: '16px' }}>
                Назад к организациям
            </Button>
            <EntityList<Employee>
                title="Сотрудники"
                columns={columns}
                getData={getData}
                saveData={saveData}
                FormComponent={(props) => <EmployeeForm {...props} organizationId={id ?? ''} />}
                onDelete={handleDelete}
            />
        </>
    );
};

export default EmployeeList;