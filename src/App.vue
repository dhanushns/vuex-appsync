<template>
  <div class="root-model">
    <div class="title">
      <h2>Employee Management</h2>
    </div>
    <div class="sep">
      <div class="left-model child-model">
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
import TableComponent from './components/TableComponent.vue';


export default {
  name: 'App',
  data(){
    return {

    }
  },
  components: {
    TableComponent,
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

.title{
  text-align: center;
}

.sep {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 40px;

  .child-model {
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-width: 300px;
  }

  .left-model{
    flex-basis: 50%;
  }

  .right-model{
    position: sticky;
    top: 0;
    align-self:flex-start;
  }

}
</style>
