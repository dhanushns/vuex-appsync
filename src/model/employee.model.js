import * as service from '../services/employee.service'

const state = {
  employees: [],
  employee: {},
  setLoading: false,
  refreshEvent: false
}

const getters = {
  getEmployees: state => state.employees,
  isLoading: state => state.setLoading,
  getSelectedEmployee: state => state.employee,
  getRefreshEvent: state => state.refreshEvent
}

const actions = {
  setRefereshEvent ({ commit }, value) {
    commit('SET_REFRESH_EVENT', value)
  },

  setEmployeeAction ({ commit }, selectedEmployee) {
    commit('SET_EMPLOYEE', selectedEmployee)
  },

  async fetchAllEmployeesAction ({ commit }) {
    commit('SET_LOADING')
    const listEmp = await service.fetchEmployees()
    commit('SET_EMPLOYEES', listEmp)
    commit('UNSET_LOADING')
  },

  async fetchEmployeeAction ({ commit }, emp_id) {
    const employee = await service.fetchEmployee(emp_id)
    commit('SET_EMPLOYEE', employee)
  },

  async createEmployeeAction ({ commit }, employee) {
    const newEmployee = await service.createEmployee(employee)
    commit('ADD_EMPLOYEE', newEmployee)
    return true
  },

  async updateEmployeeAction ({ commit }, employee) {
    const updatedEmployee = await service.updateEmployee(employee)
    commit('UPDATE_EMPLOYEE', updatedEmployee)
    console.log(state.employees)
  },

  async deleteEmployeeAction ({ commit }, emp_id) {
    const isDeleted = await service.deleteEmployee(emp_id)
    if (isDeleted) {
      commit('DELETE_EMPLOYEE', emp_id)
      return true
    }
    return false
  }
}

const mutations = {
  SET_LOADING: state => (state.setLoading = true),
  UNSET_LOADING: state => (state.setLoading = false),
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
