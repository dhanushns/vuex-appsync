import * as service from '../services/employee.service'

const state = {
  employees: [],
  employee: {},
  setLoading: false,
  refreshEvent: false
}

const getters = {
  getEmployees: state => (key = '') => {
    if (key === '' || key === 'All departments') return state.employees
    return state.employees.filter((emp) => {
      if (emp.emp_name.toLowerCase().includes(key.toLocaleLowerCase())) {
        return emp
      }
      else if (emp.department.includes(key)) {
        return emp
      }
    })
  },
  isLoading: state => state.setLoading,
  getSelectedEmployee: state => state.employee,
  getRefreshEvent: state => state.refreshEvent
}

const actions = {
  setRefereshEvent({ commit }, value) {
    commit('SET_REFRESH_EVENT', value)
  },

  setEmployeeAction({ commit }, selectedEmployee) {
    commit('SET_EMPLOYEE', selectedEmployee)
  },

  async fetchAllEmployeesAction({ commit }) {
    const listEmp = await service.fetchEmployees()
    commit('SET_EMPLOYEES', listEmp)
  },

  async fetchEmployeeAction({ commit }, emp_id) {
    const employee = await service.fetchEmployee(emp_id)
    commit('SET_EMPLOYEE', employee)
  },

  async createEmployeeAction({ commit }, employee) {
    const newEmployee = await service.createEmployee(employee)
    if (newEmployee) {
      commit('ADD_EMPLOYEE', newEmployee)
      return true
    }
    return false
  },

  async updateEmployeeAction({ commit }, employee) {
    const updatedEmployee = await service.updateEmployee(employee)
    if (updatedEmployee) {
      commit('UPDATE_EMPLOYEE', updatedEmployee)
      return true
    }
    return false
  },

  async deleteEmployeeAction({ commit }, emp_id) {
    const isDeleted = await service.deleteEmployee(emp_id)
    if (isDeleted) {
      commit('DELETE_EMPLOYEE', emp_id)
      return true
    }
    return false
  }
}

const mutations = {
  SET_EMPLOYEES: (state, employeesList) => (state.employees = employeesList),
  SET_EMPLOYEE: (state, selectedEmployee) =>
    (state.employee = selectedEmployee),
  ADD_EMPLOYEE: (state, newEmployee) =>
    (state.employees = [...state.employees, newEmployee]),
  SET_REFRESH_EVENT: (state, value) => (state.refreshEvent = value),
  UPDATE_EMPLOYEE: (state, updatedEmployee) =>
  (state.employees = state.employees.map(emp =>
    emp.id === updatedEmployee.id ? updatedEmployee : emp
  )),
  DELETE_EMPLOYEE: (state, emp_id) =>
    (state.employees = state.employees.filter(emp => emp.id !== emp_id))
}

export default {
  state,
  getters,
  actions,
  mutations
}
