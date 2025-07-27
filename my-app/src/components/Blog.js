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
import EditIcon from '@mui/icons-material/Edit'; // Corrected name
import EditForm from './EditForm';
import { deleteBlog } from '../api';

export default function Blog({ data }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      const response = await deleteBlog(data._id);
      console.log("Blog deleted successfully", response.data);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log("Failed", error.message);
    }
  };

  return (
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
        sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" fontWeight="bold" noWrap>
          {data.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1, maxHeight: 60, overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {data.description}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'primary.main',
            fontSize: '14px',
            fontWeight: 500,
            mt: 1,
            wordBreak: 'break-word',
          }}
        >
          {data.tags.map((tag) => `#${tag} `)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
        <Button size="small" onClick={handleDelete} color="error">
          <DeleteIcon />
        </Button>
        <Button size="small" onClick={handleOpen} color="primary">
          <EditIcon />
        </Button>
      </CardActions>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditForm data={data} />
        </Box>
      </Modal>
    </Card>
  );
}
