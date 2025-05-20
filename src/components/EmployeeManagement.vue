<template>
  <NotificationComponent :content="notifyContent" :color="notifyColor" :set-active="setNotify" />
  <div class="employee-manage-model">
    <div class="top-buttons">
      <div class="refresh-button button" @click="refreshComponent">
        <unicon name="sync" fill="blue" class="icon"></unicon>
      </div>
      <div class="add-button button" @click="addForm">
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
      <LoadingComponent v-show="setLoading" />
      <form @submit.prevent="submitForm">
        <div class="grp1 grp">
          <div class="block b1">
            <label>Name</label>
            <input type="text" v-model="employee.emp_name" :disabled="state" required />
          </div>
          <div class="block b2">
            <label>Employee ID</label>
            <input type="number" v-model="employee.id" :disabled="state || selectedAction === 'edit'" required />
          </div>
        </div>
        <div class="grp2 grp">
          <div class="block b1">
            <label>Age</label>
            <input type="number" v-model="employee.age" :disabled="state" required />
          </div>
          <div class="block b2">
            <label>Department</label>
            <select name="choose-department" v-model="employee.department" :disabled="state" required>
              <option>select department</option>
              <option>United</option>
              <option>Delta</option>
              <option>Testing</option>
              <option>Airlines</option>
              <option>Banking</option>
            </select>
          </div>
        </div>
        <div class="grp3 grp">
          <div class="block b1">
            <label>Location</label>
            <select name="choose-location" v-model="employee.emp_location" :disabled="state" required>
              <option>select location</option>
              <option>Chennai</option>
              <option>Pune</option>
            </select>
          </div>
          <div class="block b2">
            <label>Salary</label>
            <input type="number" v-model="employee.salary" :disabled="state" required />
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
import NotificationComponent from "./NotificationComponent.vue";
import LoadingComponent from "./LoadingComponent.vue";

export default {
  name: "EmployeeManagement",
  data() {
    return {
      state: true,
      isEmployeeAdded: false,
      selectedAction: "",
      notifyContent: "",
      notifyColor: "",
      setNotify: false,
      setLoading: false
    };
  },
  components: {
    NotificationComponent,
    LoadingComponent
  },
  computed: {
    ...mapGetters(["getSelectedEmployee"]),
    employee() {
      return { ...this.getSelectedEmployee }
    },
  },
  methods: {
    refreshComponent() {
      this.$store.dispatch("setRefereshEvent", true);
      setTimeout(() => {
        this.$store.dispatch("setRefereshEvent", false);
      }, 1000);
      this.clearForm()
    },
    async submitForm() {
      this.setLoading = true;
      if (this.selectedAction === "add") {
        const isAdded = this.isEmployeeAdded = await this.$store.dispatch(
          "createEmployeeAction",
          this.employee
        );

        if (isAdded) {
          this.notifyContent = "Employee Added Successfully"
          this.notifyColor = "green"
          this.setNotify = true;
          this.closeNotification()
        }
        else {
          this.notifyContent = "Employee Id already exsist"
          this.notifyColor = "red"
          this.setNotify = true;
          this.closeNotification()
        }

      } else if (this.selectedAction === "edit") {
        const isUpdted = await this.$store.dispatch("updateEmployeeAction", this.employee);
        if (isUpdted) {
          this.notifyContent = "Employee Updated Successfully"
          this.notifyColor = "green"
          this.setNotify = true;
          this.closeNotification()
        }
        else {
          this.notifyContent = "Employee updation failure"
          this.notifyColor = "red"
          this.setNotify = true;
          this.closeNotification()
        }
      }
      this.clearForm();
      this.setLoading = false
    },
    clearForm() {
      this.state = true;
      this.$store.dispatch("setEmployeeAction", {})
    },
    addForm() {
      this.selectedAction = "add"
      this.clearForm()
      this.state = false;
    },
    editForm() {
      this.selectedAction = "edit";
      this.state = false;
    },
    async deleteEmployee() {
      this.setLoading = true
      const isDeleted = await this.$store.dispatch("deleteEmployeeAction", this.employee.id);
      if (isDeleted) {
        this.notifyContent = "Employee Deleted Successfully"
        this.notifyColor = "green"
        this.setNotify = true;
        this.closeNotification()
      }
      else {
        this.notifyContent = "Delete operation failed"
        this.notifyColor = "red"
        this.setNotify = true;
        this.closeNotification()
      }
      this.clearForm()
      this.setLoading = false
    },
    closeNotification() {
      setTimeout(() => {
        this.setNotify = false
      }, 5000)
    }
  },
};
</script>

<style scoped>
.employee-manage-model {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;

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

    .button:hover {
      background-color: rgb(230, 230, 230);
      box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.103);
    }

  }

  .form-model {
    position: relative;
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
        flex-wrap: wrap;

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
