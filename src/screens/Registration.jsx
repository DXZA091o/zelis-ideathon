import React, { useState, useEffect } from 'react';
import { Container, Button, TextField, Grid, Select, MenuItem, InputLabel, FormControl, Box } from '@material-ui/core';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';

const Signup = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [id, setId] = useState('');
    const [phoneNo, setPhoneNo]= useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [alert,setAlert] = useState(null);
    const [registered,setRegistered] = useState(false);

    const [strength, setStrength] = useState(0);

    const calculateStrength = (password) => {
        let strength = 0;
        const criteria = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/];
        criteria.forEach((criterion) => {
          if (criterion.test(password)) strength += 25;
        });
        setStrength(strength);
    }
    const handleSubmit = (event) => 
    {
        calculateStrength(password);

        event.preventDefault();
        setRegistered(true);
        //firstname
        if (firstName === '') {
            setAlert({ severity: 'error', message: 'Firstname is required!' });
          }

        //lastname
        else if (lastName === '') {
            setAlert({ severity: 'error', message: 'Lastname is required!' });
          }
        else if (id === '') {
          setAlert({ severity: 'error', message: 'Employee ID is required!' });
        } else if (!/^\d{6}$/.test(id)) {
          setAlert({ severity: 'error', message: 'Employee ID should be 6 digits!' });
        } 
        else if(phoneNo ===''){
            setAlert({ severity: 'error', message: 'Phone number is required!' });
          } 
        else if(email === ''){
            setAlert({ severity: 'error', message: 'Email is required!' });
        }
        else if(!/^[\w-.]+@zelis\.com$/.test(email)){
            setAlert({ severity: 'error', message: 'Enter only zelis email address' });
        }
        else if(department===''){
            setAlert({ severity: 'error', message: 'Please select your department!' });
        }
        else if(role===''){
            setAlert({ severity: 'error', message: 'Please select your role!' });
        }
        
        else if(password===''){
            setAlert({ severity: 'error', message: 'Password is mandatory' });
        }
        else if(password.length<8){
            setAlert({ severity: 'error', message: 'Password should be at least 8 characters!' });
        }
        else if(!/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password)){
            setAlert({ severity: 'error', message: 'Password should contain atleast one capital and one small letters' });
        }
        else if(!/^(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/.test(password)){
            setAlert({ severity: 'error', message: 'Password should contain atleast one numerical and one special character' });
        }
        else if (password.includes(firstName) || password.includes(lastName) || password.includes(id)){
            setAlert({ severity: 'error', message: 'Password should not contain Firstname, Lastname or Employee ID' });
        }

        else if(confirmPassword!==password){
            setAlert({ severity: 'error', message: 'Passwords should match' });
        }

        else
        setAlert({ severity: 'success', message: 'Registered Successfully' });
    };

    useEffect(() => {
        document.title = "Registration";
      }, []);

    return (
        <Container maxWidth="xs">
            <Box paddingTop="20%">
                <form onSubmit={handleSubmit}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item container direction="row" spacing={2}>
                            <Grid item xs sx={6}>
                                <TextField
                                    label="First Name"
                                    variant="outlined"

                                    name="firstName"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs sx={6}>
                                <TextField
                                    label="Last Name"
                                    variant="outlined"

                                    name="lastName"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Grid item container direction="row" spacing={2} justify="center" alignItems="center">
                            <Grid item xs sx={6}>
                                <TextField
                                    label="ID"
                                    variant="outlined"
                                    inputProps={{ maxLength: 6 }}

                                    name="id"
                                    onChange={(e) => setId(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs sx={6}>
                                <PhoneInput
                                    label="Phone Number"
                                    variant="outlined"

                                    country={"in"}
                                    enableSearch={true}

                                    name="phoneNo"
                                    onChange={setPhoneNo}
                                />
                            </Grid>
                        </Grid>

                        <Grid item>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth

                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>

                        <Grid item container direction="row" spacing={2} justify="center" alignItems="center">
                            <Grid item xs sx={6}>
                                <FormControl variant="outlined" fullWidth   >
                                    <InputLabel>Department</InputLabel>
                                    <Select
                                        label="Department"

                                        name="department"
                                        onChange={(e) => setDepartment(e.target.value)}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem value="ZNA">ZNA</MenuItem>
                                        <MenuItem value="CCS">CCS</MenuItem>
                                        <MenuItem value="PAYMENTS">PAYMENTS</MenuItem>
                                        <MenuItem value="SUPPORT">SUPPORT</MenuItem>
                                        <MenuItem value="ZADA/ZDI">ZADA/ZDI</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs sx={6}>
                                <FormControl variant="outlined" fullWidth >
                                    <InputLabel>Role</InputLabel>
                                    <Select
                                        label="Role"

                                        name="role"
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem value="manager">Manager</MenuItem>
                                        <MenuItem value="employee">Employee</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid item container direction="row" spacing={2} justify="center" alignItems="center">
                            <Grid item xs sx={6}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    variant="outlined"

                                    name="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs sx={6}>
                                <TextField
                                    label="Confirm Password"
                                    type="password"
                                    variant="outlined"

                                    name="confirmPassword"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <LinearProgress variant="determinate" value={strength} />
                        <Grid item container justify="center" alignItems="center" xs sx={6}>
                            <Button variant="contained" color="primary" type="submit">
                                Register
                            </Button>
                            
                        </Grid>
                        {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
                    </Grid>
                </form>
            </Box>
        </Container>
    );
}
export default Signup;

