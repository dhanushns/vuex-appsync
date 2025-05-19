<template>
    <FilterComponent @searchKey="searchEvent" />
    <div class="table">
        <LoadingComponent v-show="setLoading" />
        <table class="record-table">
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
                <tr v-for="(employee, index) of getEmployees(searchKeyValue)" :key="employee.id" :id="employee.id"
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
        <div class="empty-emp-list" style="text-align : center; color: red;"
            v-show="searchKeyValue !== '' && getEmployees(searchKeyValue).length === 0">
            <p>No employee found !</p>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LoadingComponent from './LoadingComponent.vue';
import FilterComponent from './FilterComponent.vue';

export default {
    name: "TableComponent",
    components: {
        LoadingComponent,
        FilterComponent
    },

    data() {
        return {
            selectedRow: '',
            selectedEmployee: {},
            searchKeyValue: '',
            setLoading: false
        }
    },
    computed: {
        ...mapGetters(['getEmployees', 'getRefreshEvent']),
        refreshComponent() {
            return this.getRefreshEvent;
        },
    },
    watch: {
        async refreshComponent(newValue) {
            if (newValue === true) {
                this.setLoading = true
                await this.fetchAllEmployeesAction();
                this.setLoading = false
                this.selectedRow = ''
            }
        }
    },
    methods: {
        ...mapActions(["fetchAllEmployeesAction", "setEmployeeAction"]),
        setEmployee(emp_id) {
            this.selectedRow = emp_id;
            const employee = this.getEmployees('').filter((emp) => emp.id === emp_id)[0]
            this.setEmployeeAction(employee);
        },
        searchEvent(event) {
            this.searchKeyValue = event.target.value
        },
    },
    async created() {
        this.setLoading = true
        await this.fetchAllEmployeesAction();
        this.setLoading = false
    }

}
</script>

<style scoped>
.table {
    position: relative;
    min-width: 300px;
    overflow-x: scroll;
    scrollbar-width: none;
    border: 2px solid #dfdfdf;
    border-radius: 20px;
    max-height: 700px;
    min-height: 400px;
    overflow-y: scroll;
}

.record-table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;

    thead {
        position: sticky;
        top: 0;
    }
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
    padding: 30px;
    text-align: center;
}

tbody tr:hover {
    border: 2px solid blue;
}

.activeRow {
    background-color: blue;
    color: white;
}
</style>