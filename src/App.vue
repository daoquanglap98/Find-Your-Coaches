<template>
    <the-header></the-header>
    <router-view v-slot="{ Component }">
        <transition name="animate">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script>
import TheHeader from "./components/layouts/TheHeader"
export default {
    name: "App",
    components: {
        TheHeader
    }
}
</script>

<style>
@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap);
body {
    margin: 0;
}

* {
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
}

.animate-enter-from {
    transform: translateY(-50px);
    transition: 0.3s;
    opacity: 0;
}

.animate-enter-to {
    transform: translateY(0);
    transition: 0.3s;
    opacity: 1;
}

.animate-enter-active {
    transition-delay: 0.3s;
    animation-delay: 0.3s;
}

.animate-leave-from {
    transform: translateY(0px);
    transition: 0.3s;
    opacity: 1;
}

.animate-leave-to {
    transform: translateY(50px);
    transition: 0.3s;
    opacity: 0;
}
</style>
