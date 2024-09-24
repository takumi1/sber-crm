import { Organization } from '../components/types';
import { Employee } from '../components/types';

const ORG_KEY = 'organizations';
const EMP_KEY = 'employees';

export const getOrganizations = (): Organization[] => {
    const orgs = localStorage.getItem(ORG_KEY);
    return orgs ? JSON.parse(orgs) : [];
};

export const saveOrganizations = (orgs: Organization[]) => {
    localStorage.setItem(ORG_KEY, JSON.stringify(orgs));
};

export const getEmployees = (): Employee[] => {
    const emps = localStorage.getItem(EMP_KEY);
    return emps ? JSON.parse(emps) : [];
};

export const saveEmployees = (emps: Employee[]) => {
    localStorage.setItem(EMP_KEY, JSON.stringify(emps));
};