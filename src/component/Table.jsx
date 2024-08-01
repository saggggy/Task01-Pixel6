import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CustomButtons from './CustomButtons';
import './Table.css'


const getmuitheme = () => createTheme({
    components: {
        MuiTableCell: {
            styleOverrides: {
                head: {
                    padding: "5px 4px",
                    fontWeight: 'bold',
                },
                body: {
                    padding: "9px 15px"
                },
            },
        },
    },
});

const Table = () => {
    
    const [users, setUsers] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const columns = [
        {
            name: "id",
            label: "ID",
        },
        {
            name:"image",
            label:"Profile",
            options:{
                customBodyRender:(value) => (
                    <div className='image'>
                        <img src={value} alt='pic' className='rounded-circle'/>  
                    </div>
                ),
            },
        },
        {
            name: "name",
            label:"Full Name",
        },
        {
            name:"age",
            label: "Age",
        },
        {
            name:"username"
        },
        {
            name:"birthDate",
            label:"Birth Date",
            options:{
                customBodyRender:(value) =><p className=''>{value}</p>,
            },
        },
        {
            name: 'location',
            label: 'Location',
            options: {
              customBodyRender: (value) => <p>{value}</p>, // Optional: Format the display
            },
          },
    ];

    useEffect(() => {
        fetch("https://dummyjson.com/users")
            .then((res) => res.json())
            .then(data => {
                let local = data?.users?.map((users)=>(
                    {
                        ...users,
                        name: users?.fristName + " " + users?.lastName,
                        location: users?.address?.city+"," + users?.address?.country,
                        country: users?.address?.country,
                        gender: users?.gender,
                    }
                ))
                setFilteredData(local)
                setUsers(local);
                console.log(local)
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
              });
    }, []);

    const handleCountry = () => {
        const filtered = users.filter((user) => user.country === 'United States');
        setFilteredData(filtered);
      };
    
      const handleGender = () => {
        const filtered = users.filter((user) => user.gender === 'male');
        setFilteredData(filtered);
      };
      
    const options = {
        filter: true,
        selectableRows: "none", 
        download: false,
        print: false,           
        viewColumns: false,
        search: true,
        rowsPerPage: 10,
        rowsPerPageOptions: [5, 10, 20],
        CustomButtons: () => (
            <CustomButtons
              handleCountry={handleCountry}
              handleGender={handleGender}
            />
          ),
    };
    return (
        <div className='container'>
            <ThemeProvider theme={getmuitheme}>
                <MUIDataTable
                    title={<h1 className='py-3'>Employees</h1>}
                    data={filteredData}
                    columns={columns}
                    options={options}
                />
            </ThemeProvider>
        </div>
    )
}

export default Table
