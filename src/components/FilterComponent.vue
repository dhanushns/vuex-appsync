<template>
    <div class="filter-model">
        <div class="search-bar">
            <input type="text" placeholder="search by name" @input="$emit('searchKey', $event)" />
        </div>
        <div class="department-filter">
            <select name="deartment-filter" @input="$emit('searchKey', $event)">
                <option>All departments</option>
                <option>United</option>
                <option>Delta</option>
                <option>Testing</option>
                <option>Airlines</option>
                <option>Banking</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    name: "FilterComponent",
}
</script>

<style scoped>
.filter-model {
    display: flex;
    padding: 10px 0;
    gap: 20px;
    align-items: center;
    flex-wrap: wrap;

    .search-bar {
        input {
            border-radius: 10px;
            height: 35px;
            padding: 0 5px;
            min-width: 200px;
            border: 2px solid #dfdfdf;
            box-sizing: border-box;
        }

        input:focus {
            outline: none;
        }
    }

    .department-filter {
        select {
            min-width: 200px;
            height: 35px;
            border: 2px solid #dfdfdf;
            border-radius: 10px;
            padding: 5px;
        }
    }
}

@media screen and (max-width:900px) {

    .filter-model .search-bar,
    .department-filter {
        flex-basis: 100%;

        input,
        select {
            width: 100%;
        }
    }

}
</style>