<template>
    <div class="filter-model">
        <div class="search-bar">
            <input type="text" placeholder="search by name" />
        </div>
         <div class="department-filter">
            <select name="deartment-filter">
                <option>select department</option>
                <option>United</option>
                <option>Delta</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    name: "FilterComponent"
}
</script>

<style scoped>

.filter-model{
    display: flex;
    padding: 10px 0;
    gap: 20px;
    align-items: center;
    .search-bar{
        input{
            border-radius: 10px;
            height: 35px;
            padding: 0 10px;
            min-width: 200px;
            border: 2px solid #dfdfdf;
        }
        input:focus{
            outline: none;
        }
    }
    .department-filter{
        select{
            min-width: 200px;
            height: 35px;
            border: 2px solid #dfdfdf;
            border-radius: 10px;
            padding: 5px; 
        }
    }
}

</style>