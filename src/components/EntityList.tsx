import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, IconButton, Dialog, DialogTitle, Typography
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import {Entity, EntityListProps} from "./types";

const EntityList = <T extends Entity>({
                                          title,
                                          columns,
                                          getData,
                                          saveData,
                                          navigatePath,
                                          FormComponent,
                                          onDelete
                                      }: EntityListProps<T>) => {
    const navigate = useNavigate();
    const [entities, setEntities] = useState<T[]>([]);
    const [open, setOpen] = useState(false);
    const [currentEntity, setCurrentEntity] = useState<T | null>(null);

    useEffect(() => {
        setEntities(getData());
    }, [getData]);

    const handleAdd = () => {
        setCurrentEntity(null);
        setOpen(true);
    };

    const handleEdit = (entity: T) => {
        setCurrentEntity(entity);
        setOpen(true);
    };

    const handleDelete = (id: string) => {
        if (onDelete) {
            onDelete(id);
            setEntities(entities.filter(e => e.id !== id));
        } else {
            const updated = entities.filter(e => e.id !== id);
            setEntities(updated);
            saveData(updated);
        }
    };

    const handleFormSubmit = (entity: T) => {
        let updated;
        if (currentEntity) {
            updated = entities.map(e => e.id === entity.id ? entity : e);
        } else {
            updated = [...entities, entity];
        }
        setEntities(updated);
        saveData(updated);
        setOpen(false);
    };

    return (
        <>
            <Typography variant="h5" gutterBottom>
                {title}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleAdd} style={{ marginBottom: '16px' }}>
                Добавить
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map(col => (
                                <TableCell key={col.field as string}>{col.headerName}</TableCell>
                            ))}
                            <TableCell>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entities.map(entity => (
                            <TableRow key={entity.id} hover>
                                {columns.map(col => (
                                    <TableCell key={col.field as string}>
                                        {col.render ? col.render(entity) : (entity as any)[col.field]}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    {navigatePath ? (
                                        <IconButton color="primary" onClick={() => navigate(navigatePath(entity))}>
                                            <Edit />
                                        </IconButton>
                                    ) : (
                                        <>
                                            <IconButton color="primary" onClick={() => handleEdit(entity)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton color="secondary" onClick={() => handleDelete(entity.id)}>
                                                <Delete />
                                            </IconButton>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                        {entities.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={columns.length + 1} align="center">
                                    Нет данных
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>{currentEntity ? 'Редактировать' : 'Добавить'}</DialogTitle>
                <FormComponent
                    initialData={currentEntity}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setOpen(false)}
                />
            </Dialog>
        </>
    );
};

export default EntityList;