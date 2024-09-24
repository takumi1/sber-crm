import React, {ReactNode} from "react";

export interface Entity {
    id: string;
}

interface Column<T> {
    field: keyof T;
    headerName: string;
    render?: (entity: T) => ReactNode;
}

export interface EntityListProps<T extends Entity> {
    title: string;
    columns: Column<T>[];
    getData: () => T[];
    saveData: (data: T[]) => void;
    navigatePath?: (item: T) => string;
    FormComponent: React.FC<FormComponentProps<T>>;
    onDelete?: (id: string) => void;
}

interface FormComponentProps<T> {
    initialData: T | null;
    onSubmit: (data: T) => void;
    onCancel: () => void;
}

export interface Organization {
    id: string;
    name: string;
    address: string;
}

export interface Employee {
    id: string;
    organizationId: string;
    firstName: string;
    lastName: string;
    position: string;
}