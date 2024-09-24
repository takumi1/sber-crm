import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrganizationList from '../components/OrganizationList';
import EmployeeList from '../components/EmployeeList';

const AppRoutes: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/" element={<OrganizationList />} />
            <Route path="/organization/:id/employees" element={<EmployeeList />} />
        </Routes>
    </Router>
);

export default AppRoutes;