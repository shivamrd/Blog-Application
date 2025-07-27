import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Chip } from '@mui/material';
import { createBlog } from '../api';
import { useNavigate } from 'react-router-dom';

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const CustomChipInput = ({ tags, setTags }) => {
  const [input, setInput] = useState('');

  const handleAdd = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
      }
      setInput('');
    }
  };

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Box sx={{ mt: 3, width: '80%' }}>
      <TextField
        label="Tags"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleAdd}
        helperText="Press Enter to add tag"
      />
      <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {tags.map((tag, idx) => (
          <Chip key={idx} label={tag} onDelete={() => handleDelete(tag)} />
        ))}
      </Box>
    </Box>
  );
};

const Form = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    selectedFile: '',
  });

  const [tags, setTags] = useState([]);
  const navigate = useNavigate()

  const handleSubmit = async() => {
    console.log('Form Data:', formData);
    console.log('Tags:', tags);
    try {
      const author = localStorage.getItem("author")
      const response = await createBlog({...formData, author, tags})
      console.log("Blog created Successfully", response.data)
      window.location.reload()
      navigate('/')
    } catch (error) {
      console.log("failed:",error);
      setFormData({title:'',description:'',selectedFile:''})
      
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box
      flex="1"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center" // fixed typo from alignItem
      p={2}
    >
      <Typography fontSize="50px" fontWeight="bold">
        Create Blog
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center" // fixed typo
        mt={1}
        width="30vw"
      >
        <TextField
          id="title"
          name="title"
          label="Title"
          variant="outlined"
          style={{ marginTop: '30px', width: '80%' }}
          value={formData.title}
          onChange={handleInputChange}
        />
        <TextField
          id="description"
          name="description"
          label="Description"
          variant="outlined"
          style={{ marginTop: '30px', width: '80%' }}
          value={formData.description}
          onChange={handleInputChange}
        />
        <CustomChipInput tags={tags} setTags={setTags} />

        <div style={{ marginTop: '30px', width: '80%' }}>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                const base64 = await convertToBase64(file);
                setFormData({ ...formData, selectedFile: base64 });
              }
            }}
          />
        </div>

        <Button
          style={{
            border: '1px solid black',
            marginTop: '10%',
            width: '80%',
            fontSize: '20px',
            fontWeight: '600',
            backgroundColor: 'black',
            color: 'white',
            borderRadius: '15px',
          }}
          onClick={handleSubmit}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
