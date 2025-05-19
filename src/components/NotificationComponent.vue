<template>
    <div class = "NotififyModel">
        <div class="notify-content" :style = "{'backgroundColor' : color}">
            {{ content }}
        </div>
    </div>
</template>

<script>
    export default {
        name:"NotificationComponent",
        props : {
            content : String,
            color : String
        }
    }
</script>

<style lang="scss" scoped>

</style>