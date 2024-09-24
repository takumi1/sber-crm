import React from 'react';
import EntityList from './EntityList';
import { getOrganizations, saveOrganizations } from '../services/localStorageService';
import { Organization } from './types';
import OrganizationForm from './modals/OrganizationForm';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const OrganizationList: React.FC = () => {
    const navigate = useNavigate();

    const columns = [
        {
            field: 'name' as keyof Organization,
            headerName: 'Название',
            render: (org: Organization) => (
                <Typography
                    style={{ cursor: 'pointer', color: 'blue' }}
                    onClick={() => navigate(`/organization/${org.id}/employees`)}
                >
                    {org.name}
                </Typography>
            )
        },
        { field: 'address' as keyof Organization, headerName: 'Адрес' },
    ];

    return (
        <EntityList<Organization>
            title="Организации"
            columns={columns}
            getData={getOrganizations}
            saveData={saveOrganizations}
            FormComponent={OrganizationForm}
        />
    );
};

export default OrganizationList;