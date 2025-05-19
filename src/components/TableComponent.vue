<template>
    <div class="table">
        <LoadingComponent v-show="isLoading" />
        <table class="record-table" v-show="!isLoading">
            <thead>
                <tr>
                    <th>S.NO</th>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Department</th>
                    <th>Location</th>
                    <th>Salary</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(employee, index) of getEmployees" :key="employee.id" :id="employee.id"
                    @click="setEmployee(employee.id)" :class="selectedRow === employee.id ? 'activeRow' : ''">
                    <td>{{ index + 1 }}</td>
                    <td>{{ employee.id }}</td>
                    <td>{{ employee.emp_name }}</td>
                    <td>{{ employee.age }}</td>
                    <td>{{ employee.department }}</td>
                    <td>{{ employee.emp_location }}</td>
                    <td>{{ employee.salary }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LoadingComponent from './LoadingComponent.vue';

export default {
    name: "TableComponent",
    components: {
        LoadingComponent
    },

    data() {
        return {
            selectedRow: '',
            selectedEmployee: {}
        }
    },
    computed: {
        ...mapGetters(['getEmployees', 'isLoading', 'getRefreshEvent']),
        refreshComponent() {
            return this.getRefreshEvent;
        }
    },
    watch: {
        refreshComponent(newValue) {
            if(newValue === true){
                this.fetchAllEmployeesAction();
            }
        }
    },
    methods: {
        ...mapActions(["fetchAllEmployeesAction", "setEmployeeAction"]),
        setEmployee(emp_id) {
            this.selectedRow = emp_id;
            const employee = this.getEmployees.filter((emp) => emp.id === emp_id)[0]
            this.setEmployeeAction(employee);
        }
    },
    created() {
        this.fetchAllEmployeesAction();
    }

}
</script>

<style scoped>
.table {
    position: relative;
    min-height: 400px;
}

.record-table {
    border-collapse: collapse;
    border-spacing: 0;
}

th {
    background-color: blue;
    color: white;
}

th:first-child {
    border-top-left-radius: 10px;
}

th:last-child {
    border-top-right-radius: 10px;
}

th,
td {
    padding: 20px;
    text-align: center;
}

tbody {
    border: 2px solid #dfdfdf;
}

tbody tr:hover {
    border: 2px solid blue;
}

.activeRow {
    background-color: blue;
    color: white;
}
</style>