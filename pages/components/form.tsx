import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  Checkbox,
  FormControlLabel,
  Switch,
  FormLabel,
  IconButton,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  age: yup.number().positive('Age must be a positive number').required('Age is required'),
  gender: yup.string().required('Gender is required'),
  radioOption : yup.string(),
  checkboxOptions : yup.boolean(),
  acceptTerms: yup.boolean().oneOf([true], 'Please accept the terms and conditions'),
});

const FormExample = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data:any) => {
    console.log(data);
  };
  const [selectedFile , setFile] = useState({});

  return (
    <form className='mb-4' onSubmit={handleSubmit(onSubmit)}>
      {/* <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <TextField {...field} label="Name" error={!!errors.name} helperText={errors.name?.message || ''} />}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <TextField {...field} label="Email" error={!!errors.email} helperText={errors.email?.message || ''} />}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="age">Age</InputLabel>
            <Controller
              name="age"
              control={control}
              render={({ field }) => <TextField {...field} label="Age" type="number" error={!!errors.age} helperText={errors.age?.message || ''} />}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="gender">Gender</InputLabel>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Gender" error={!!errors.gender} displayEmpty>
                  <MenuItem value="" disabled>
                    Select Gender
                  </MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Radio Buttons</FormLabel>
            <Controller
              name="radioOption"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
                  <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
                </RadioGroup>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Checkboxes</FormLabel>
            <Controller
              name="checkboxOptions"
              control={control}
              render={({ field }) => (
                <>
                  <FormControlLabel control={<Checkbox {...field} value="option1" />} label="Option 1" />
                  <FormControlLabel control={<Checkbox {...field} value="option2" />} label="Option 2" />
                </>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormControlLabel control={<Switch {...control} name="switchOption" />} label="Switch" />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
  <FormControl fullWidth>
    <InputLabel className='ml-5' htmlFor="file">{selectedFile?.name ? selectedFile?.name : 'File Upload'}</InputLabel>
    <input
      type="file"
      id="file"
      accept='image/*'
      style={{ display: 'none' }}
      onChange={(e : any) => {
        setFile(e.target.files[0]);
      }}
    />
    <label htmlFor="file">
      <IconButton component="span">
        <CloudUploadIcon />
      </IconButton>
    </label>
  </FormControl>
</Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox {...control} name="acceptTerms" color="primary" />
            }
            label="I accept the terms and conditions"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button type="submit" className='bg-blue-500' variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid> */}
    </form>
  );
};

export default FormExample;
