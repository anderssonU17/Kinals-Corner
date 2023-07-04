import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Container, Typography, TextField, Button, Grid, Box } from '@material-ui/core';
import createHelp from '../../assets/image/921356.png';

export const CreateHelpSocial = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !description) {
      setError('Por favor, ingresa el título y la descripción');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if (event.target.image.files[0]) {
        formData.append('image', event.target.image.files[0]);
      }

      const response = await axios.post('http://localhost:3002/api/create-helpSocial', formData);

      if (response.data.message === 'Ayuda social creada exitosamente') {
        setSuccess(response.data.message);
        setError('');
        setTitle('');
        setDescription('');
      } else {
        setError('Error al crear la ayuda social');
        setSuccess('');
      }
    } catch (error) {
      setError('Error al crear la ayuda social');
      console.log(error);
      setSuccess('');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Container maxWidth="md" style={{ backgroundColor: ' #31344c ', paddingTop: '2rem', paddingBottom: '2rem' }}>
        <Card style={{ backgroundColor: ' #c7d3d1 '}}>
          <CardContent>
            <Typography variant="h2" style={{ color: '#060625', marginBottom: '2rem' }}>
              <img src={createHelp} width={120}  /> Crear nueva ayuda social
            </Typography>
            {error && (
              <Typography variant="body1" style={{ color: '#f21007', marginBottom: '1rem' }}>
                {error}
              </Typography>
            )}
            {success && (
              <Typography variant="body1" style={{ color: '#07a560', marginBottom: '1rem' }}>
                {success}
              </Typography>
            )}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="title"
                    label="Título"
                    variant="outlined"
                    value={title}
                    onChange={handleTitleChange}
                    required
                    fullWidth
                    InputProps={{
                      style: { backgroundColor: '#fbfbfa', color: '#060625' },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="description"
                    label="Descripción"
                    variant="outlined"
                    value={description}
                    onChange={handleDescriptionChange}
                    required
                    fullWidth
                    multiline
                    rows={4}
                    InputProps={{
                      style: { backgroundColor: '#fbfbfa', color: '#060625' },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box display="flex" alignItems="center" justifyContent="center" marginBottom="1rem">
                    <Button
                      variant="contained"
                      component="label"
                      style={{ backgroundColor: '#f9c109', color: '#060625', textTransform: 'none' }}
                    >
                      Seleccionar archivo
                      <input type="file" hidden />
                    </Button>
                  </Box>
                  <Typography variant="body1" style={{ color: '#92aea6', textAlign: 'center' }}>
                    No se ha seleccionado ningún archivo
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ backgroundColor: '#07a560', color: '#fbfbfa', textTransform: 'none' }}
                  >
                    Crear
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};























// import '../../assets/styles/CreateHelpSocial.css'



