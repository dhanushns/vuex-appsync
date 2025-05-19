<template>
  <div class="employee-manage-model">
    <div class="top-buttons">
      <div class="refresh-button button" @click="refreshComponent">
        <unicon name="sync" fill="blue" class="icon"></unicon>
      </div>
      <div class="add-button button" @click="clearForm">
        <unicon name="plus" fill="blue" class="icon"></unicon>
      </div>
      <div class="edit-button button" @click="editForm">
        <unicon name="pen" fill="blue" class="icon"></unicon>
      </div>
      <div class="delete-button button" @click="deleteEmployee">
        <unicon name="trash-alt" fill="blue" class="icon"></unicon>
      </div>
    </div>
    <div class="form-model">
      <form @submit.prevent="submitForm">
        <div class="grp1 grp">
          <div class="block b1">
            <label>Name</label>
            <input type="text" v-model="employee.emp_name" :disabled="state" />
          </div>
          <div class="block b2">
            <label>Employee ID</label>
            <input
              type="number"
              v-model="employee.id"
              :disabled="state || selectedAction === 'edit'"
            />
          </div>
        </div>
        <div class="grp2 grp">
          <div class="block b1">
            <label>Age</label>
            <input type="number" v-model="employee.age" :disabled="state" />
          </div>
          <div class="block b2">
            <label>Department</label>
            <select
              name="choose-department"
              v-model="employee.department"
              :disabled="state"
            >
              <option>select department</option>
              <option>United</option>
              <option>Delta</option>
              <option>Supprt Enginner</option>
              <option>Airlines</option>
              <option>Banking</option>
            </select>
          </div>
        </div>
        <div class="grp3 grp">
          <div class="block b1">
            <label>Location</label>
            <select
              name="choose-location"
              v-model="employee.emp_location"
              :disabled="state"
            >
              <option>select location</option>
              <option>Chennai</option>
              <option>Pune</option>
            </select>
          </div>
          <div class="block b2">
            <label>Salary</label>
            <input type="number" v-model="employee.salary" :disabled="state" />
          </div>
        </div>
        <div class="grp4 grp">
          <div class="block">
            <button :disabled="state">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "EmployeeManagement",
  data() {
    return {
      state: true,
      employee: {
        id: "",
        emp_name: "",
        age: "",
        emp_location: "",
        department: "",
        salary: "",
      },
      isEmployeeAdded: false,
      selectedAction: "",
    };
  },
  computed: {
    ...mapGetters(["getSelectedEmployee"]),
    getEmployee() {
      return this.getSelectedEmployee;
    },
  },
  watch: {
    getEmployee(newValue) {
      this.state = true;
      if (newValue) {
        this.employee = { ...newValue };
      }
    },
  },
  methods: {
    refreshComponent() {
      this.$store.dispatch("setRefereshEvent", true);
      setTimeout(() => {
        this.$store.dispatch("setRefereshEvent", false);
      }, 1000);
    },
    async submitForm() {
      if (this.selectedAction === "add") {
        this.isEmployeeAdded = await this.$store.dispatch(
          "createEmployeeAction",
          this.employee
        );
      } else if (this.selectedAction === "edit") {
        await this.$store.dispatch("updateEmployeeAction", this.employee);
      }
      this.clearForm();
    },
    clearForm() {
      this.selectedAction = "add";
      this.state = false;
      this.employee = {};
    },
    editForm() {
      this.selectedAction = "edit";
      this.state = false;
    },
    deleteEmployee() {
      this.$store.dispatch("deleteEmployeeAction", this.employee.id);
    },
  },
};
</script>

<style scoped>
.employee-manage-model {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  .top-buttons {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    min-width: 300px;

    .button {
      border: 2px solid #dfdfdf;
      padding: 10px;
      border-radius: 10px;
    }
  }

  .form-model {
    padding: 10px;

    form {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .grp {
        display: flex;
        gap: 20px;
        align-items: center;
        justify-content: space-between;

        .block {
          display: flex;
          flex-direction: column;
          gap: 5px;
          flex: 1;

          input,
          select {
            min-width: 200px;
            height: 30px;
            border-radius: 5px;
            border: 2px solid #dfdfdf;
            padding: 0 10px;
          }

          select {
            height: 35px;
          }

          button {
            padding: 10px 0;
            border-radius: 5px;
            background-color: blue;
            color: white;
            border: none;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
