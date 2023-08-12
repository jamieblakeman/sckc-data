import { ref, onBeforeMount } from "vue"

export const useCurrentTime = () => {
    const currentTime = ref(new Date())
    const updateCurrentTime = () => {
        currentTime.value = new Date();
    }
    const updateTimeInterval = setInterval(updateCurrentTime, 1000);
    onBeforeMount(() => {
        clearInterval(updateTimeInterval)
    })

    return {
        currentTime
    }
}