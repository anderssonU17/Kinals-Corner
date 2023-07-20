import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Container, Typography, TextField, Button, Grid, Box } from '@material-ui/core';

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

      const imageFile = event.target.image.files[0];
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await axios.post('http://localhost:3002/api/create-helpSocial', formData);

      if (response.data.message === 'Ayuda social creada exitosamente') {
        setSuccess(response.data.message);
        setError('');
        setTitle('');
        setDescription('');

        // Almacenar el _id en el localStorage
        const newHelpSocialId = response.data.id;
        const existingHelpSocialIds = JSON.parse(localStorage.getItem('helpSocialIds')) || [newHelpSocialId];
        existingHelpSocialIds.push(newHelpSocialId);
        localStorage.setItem('helpSocialIds', JSON.stringify(existingHelpSocialIds));
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
      <Container maxWidth="md" style={{ backgroundColor: '#fbfbfa', paddingTop: '2rem', paddingBottom: '2rem' }}>
        <Card>
          <CardContent>
            <Typography variant="h2" style={{ color: '#060625', marginBottom: '2rem' }}>
              Crear nueva ayuda social
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
                    minRows={4}
                    InputProps={{
                      style: { backgroundColor: '#fbfbfa', color: '#060625' },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box display="flex" alignItems="center">
                    <Button
                      variant="contained"
                      component="label"
                      style={{ backgroundColor: '#f9c109', color: '#060625', textTransform: 'none' }}
                    >
                      Seleccionar archivo
                      <input type="file" name="image" hidden />
                    </Button>
                  </Box>
                  <Typography variant="body1" style={{ color: '#92aea6', textAlign: 'center' }}>
                    No se ha seleccionado ningún archivo
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
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



