import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CenteredButton = ({ buttonLabel = "Volver a inicio", targetPath = "/", sx, ...props }) => {
    const navigate = useNavigate();

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="20vh" sx={{ gap: 2, ...sx }}>
            <Button variant="text" onClick={() => navigate(targetPath)} {...props}>
                {buttonLabel}
            </Button>
        </Box>
    );
};

export default CenteredButton;