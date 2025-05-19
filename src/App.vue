<template>
  <div class="root-model">
    <div class="title">
      <h2>Employee Management</h2>
    </div>
    <div class="sep">
      <div class="left-model child-model">
        <FilterComponent />
        <TableComponent />
      </div>
      <div class="right-model child-model">
        <EmployeeManagement />
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeManagement from './components/EmployeeManagement.vue';
import FilterComponent from './components/FilterComponent.vue';
import TableComponent from './components/TableComponent.vue';


export default {
  name: 'App',
  data(){
    return {

    }
  },
  components: {
    TableComponent,
    FilterComponent,
    EmployeeManagement
  },
}
</script>

<style>
#app {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 40px 10px;
}

.sep {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .child-model {
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-width: 300px;
     flex-basis:content;
  }

}
</style>
