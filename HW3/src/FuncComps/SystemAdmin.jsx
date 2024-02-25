import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/joy';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


export default function SystemAdmin({users, deleteUser, changeUserToEdit, logoutUser}) {

   const MonthSwitch = (m) => {
      switch (m) {
      case '01':
          return 'ינואר';
      case '02':
          return 'פברואר';
      case '03':
          return 'מרץ';
      case '04':
          return 'אפריל';
      case '05':
          return 'מאי';
      case '06':
          return 'יוני';
      case '07':
          return 'יולי';
      case '08':
          return 'אוגוסט';
      case '09':
          return 'ספטמבר';
      case '10':
          return 'אוקטובר';
      case '11':
          return 'נובמבר';
      case '12':
          return 'דצמבר';
      default:
          return '';
      }
  };
  

  const createData = (userName, fullname, birthday, address, email, img) => {
    return { userName, fullname, birthday, address, email, img };
}

const handleDeleteClick = (email) =>{
    deleteUser(email);
}

const handleEditClick =(email) =>{
    changeUserToEdit(email);
}

const createTable = () => {
  const rows = [];
  users.map(user => {
      const [year, month, day] = user.dateOfBirth.split('-');
      const m= MonthSwitch(month)
      rows.push(
          createData(user.userName, user.firstName +" "+ user.lastName, day+" ב"+ m + " "+ year, user.street +" ," + user.homeNumber +" ,"+ user.city, user.email, user.img)
      )
  })
  return rows;
}

const [rowsVal, setRowsVal] = useState(()=>{
  return createTable();
})
useEffect(()=>{
  setRowsVal(createTable());
   },[users])

  return (
    <>
    <TableContainer component={Paper} dir='rtl'>
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>שם משתמש</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>שם מלא</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>תאריך לידה</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>כתובת</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>דואר אלקטרוני</TableCell>
            <TableCell > </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsVal.map((user) => (
            <TableRow
              key={user.email}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell scope="row">
              <Typography component='div' display='flex' fontWeight="lg" fontSize="sm">
              <img style={{width: '50px', height: '50px', borderRadius: '50%'}} src={user.img } alt='personal image'/> {user.userName}
              </Typography>
              </TableCell>
              <TableCell align="right">{user.fullname}</TableCell>
              <TableCell align="right">{user.birthday}</TableCell>
              <TableCell align="right">{user.address}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right"><IconButton sx={{ color: 'blue' }} onClick={()=>handleEditClick(user.email)} ><EditIcon /></IconButton></TableCell>
              <TableCell align="right"><IconButton sx={{ color: 'red' }} onClick={()=>handleDeleteClick(user.email)}><DeleteIcon /></IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     
    </TableContainer>
    <br />
     <Button
      variant="solid"
      size="sm"
      color="danger"
      sx={{ alignSelf: 'center', fontWeight: 500 }}
      onClick={() => logoutUser(false)}
      >
      התנתק
      </Button>
    </>
  );
}