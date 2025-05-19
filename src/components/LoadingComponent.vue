<template>
    <div class="loading-model">
        <div class="loading-ui"></div>
    </div>
</template>

<script>
    export default {
        name : "LoadingComponent"
    }
</script>

<style scoped>

.loading-model{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    min-width: 50px;
    width: 50px;
    height: 50px;

    .loading-ui{
        width: 40px;
        height: 40px;
        border: 6px dashed black;
        border-radius: 50%;
        animation: loading-ui-model infinite 2s;
    }

}

@keyframes loading-ui-model {
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}

</style>