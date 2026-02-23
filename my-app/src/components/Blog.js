import * as React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  Modal,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditForm from './EditForm';
import { deleteBlog } from '../api';

export default function Blog({ data }) {

  // Edit modal
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  // Read More modal
  const [openRead, setOpenRead] = React.useState(false);
  const handleReadOpen = () => setOpenRead(true);
  const handleReadClose = () => setOpenRead(false);

  const handleDelete = async () => {
    try {
      const response = await deleteBlog(data._id);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log("Delete failed", error.message);
    }
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 3,
  };

  return (
    <>
      {/* BLOG CARD */}
      <Card
        sx={{
          maxWidth: 345,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={data.selectedFile}
          alt="Blog Image"
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" fontWeight="bold" noWrap>
            {data.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1,
              maxHeight: 60,
              overflow: 'hidden',
            }}
          >
            {data.description}
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: 'primary.main', fontWeight: 500 }}
          >
            {data.tags.map(tag => `${tag} `)}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
          <Button size="small" onClick={handleReadOpen}>
            Read More
          </Button>

          <Box>
            <Button size="small" onClick={handleDelete} color="error">
              <DeleteIcon />
            </Button>
            <Button size="small" onClick={handleEditOpen} color="primary">
              <EditIcon />
            </Button>
          </Box>
        </CardActions>
      </Card>

      {/* READ MORE MODAL */}
      <Modal open={openRead} onClose={handleReadClose}>
        <Box
          sx={{
            ...modalStyle,
            width: { xs: '90%', sm: 600 },
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={2}>
            {data.title}
          </Typography>

          <CardMedia
            component="img"
            height="250"
            image={data.selectedFile}
            alt="Blog Image"
            sx={{ borderRadius: 2, mb: 2 }}
          />

          <Typography variant="body1" mb={2}>
            {data.description}
          </Typography>

          <Typography variant="body2" color="primary">
            {data.tags.map(tag => `${tag} `)}
          </Typography>

          <Box textAlign="right" mt={2}>
            <Button onClick={handleReadClose}>Close</Button>
          </Box>
        </Box>
      </Modal>

      {/* EDIT MODAL */}
      <Modal open={openEdit} onClose={handleEditClose}>
        <Box sx={{ ...modalStyle, width: 400 }}>
          <EditForm data={data} />
        </Box>
      </Modal>
    </>
  );
}
