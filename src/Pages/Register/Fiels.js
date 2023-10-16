import React from 'react';
import { TextField } from '@mui/material';
import styled from '@emotion/styled';
const CssTextField = styled(TextField)({
    "& .MuiInputLabel-root.Mui-focused": {
        color: "purple",

    },
    "& .MuiOutlinedInput-root": {
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "purple"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "purple"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "4px solid purple"
        },
        '& .MuiInputBase-input': {
            color: '#834AFD',
        }
    }
});

const FieldComponent = ({ rfields, formValues, setFormValues }) => {

    const handleFieldChange = (e, label) => {
        setFormValues({ ...formValues, [label]: e.target.value });
    };

    const fieldComponents = rfields.map((field) => {
        if (field.type === 'select') {
            return (
                <CssTextField
                    key={field.label}
                    select
                    label={field.label}
                    value={formValues[field.label] || ''}
                    onChange={(e) => handleFieldChange(e, field.label)}
                >
                    {field.options}
                </CssTextField>
            );
        } else {
            return (
                <CssTextField
                    key={field.label}
                    label={field.label}
                    defaultValue={field.defaultValue}
                    type={field.type}
                    onChange={(e) => handleFieldChange(e, field.label)}
                />
            );
        }
    });

    return <div>{fieldComponents}</div>;
};

export default FieldComponent;