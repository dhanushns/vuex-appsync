<template>
    <div class="notify-model" :class="setActive ? 'notify-active' : ''">
        <div class="notify-content" :style="{ 'backgroundColor': color }">
            <p>
                {{ content }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "NotificationComponent",
    props: {
        content: String,
        color: String,
        setActive: Boolean
    }
}
</script>

<style scoped>
.notify-model {
    position: fixed;
    top: 50px;
    right: 10px;
    width: 0;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
    z-index: 99;

    .notify-content {
        display: inline-block;
        box-sizing: border-box;
        width: 300px;
        border-radius: 5px;
        color: white;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-weight: bold;
        padding: 0 20px;

    }
}

.notify-active {
    width: 300px;
}
</style>