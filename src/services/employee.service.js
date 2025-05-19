import axios from 'axios'

const URL = process.env.VUE_APP_GRAPHQL_ENDPOINT
const API_KEY = process.env.VUE_APP_API_KEY

const http = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY
  }
})

export const fetchEmployees = async () => {
  const query = `
        query {
            listEmployees {
                id
                emp_name
                age
                department
                emp_location
                salary
            }
        }`
  const response = await http.post('', { query })
  return response.data.data.listEmployees
}

export const fetchEmployee = async emp_id => {
  const query = `
        query {
            getEmployee(input : {
                id : $id
            }){
                id
                emp_name
                emp_location
                department
                age
                salary
            }
        }
    `

  const variables = { id: emp_id }

  const response = await http.post('', { query, variables })
  return response.data.data.getEmployee
}

export const createEmployee = async employee => {
  const query = `
        mutation CreateEmployee($id : ID!, $emp_name : String!, $age : Int!, $emp_location : String!, $department : String!, $salary : Int!) {
            createEmployee(input : {
                id : $id,
                emp_name : $emp_name,
                age : $age,
                emp_location : $emp_location,
                department : $department,
                salary : $salary,
            }){
                id
                emp_name
                emp_location
                department
                age
                salary
            }
        }
    `

  const variables = {
    id: employee.id,
    emp_name: employee.emp_name,
    age: employee.age,
    emp_location: employee.emp_location,
    department: employee.department,
    salary: employee.salary
  }
  const response = await http.post('', {
    query,
    variables
  })
  return response.data.data.createEmployee
}

export const updateEmployee = async employee => {
  const query = `
        mutation UpdateEmployee($id : ID!, $emp_name : String!, $age : Int!, $emp_location : String!, $department : String!, $salary : Int!){
            updateEmployee(input : {
                id : $id,
                emp_name : $emp_name,
                age : $age,
                emp_location : $emp_location,
                department : $department,
                salary : $salary
            }){
                id
                emp_name
                age
                emp_location
                department
                salary
            }
        }
    `

  const variables = {
    id: employee.id,
    emp_name: employee.emp_name,
    age: employee.age,
    emp_location: employee.emp_location,
    department: employee.department,
    salary: employee.salary
  }

  const response = await http.post('', {
    query,
    variables
  })

  return response.data.data.updateEmployee
}

export const deleteEmployee = async emp_id => {
  const query = `
        mutation DeleteEmployee($id : ID!){
            deleteEmployee(input : {
                id : $id
            })
        }
    `

  const variables = {
    id: emp_id
  }

  const response = await http.post('', {
    query,
    variables
  })

  return response.data.data.deleteEmployee
}
