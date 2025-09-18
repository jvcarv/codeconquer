<script setup>
const props = defineProps(['category', 'description', 'city'])
</script>

<template>
    <div class="complaints__item">
        <span class="complaints__category">{{ category }}</span>
        <span class="complaints__description">{{ description }}</span>
        <span class="complaints__city">{{ city }}</span>
    </div>
</template>

<style scoped>
.complaints__item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 12px 16px;
    border-radius: 12px;

    border: solid 1px #e5e7eb;
}

.complaints__category {
    color: #344256;
    font-size: 18px;
    font-weight: 700;
    line-height: 20px;
}

.complaints__description {
    color: #9aa4b1;
    font-size: 14px;
    text-align: left;
}

.complaints__city {
    color: #666d75;
    font-size: 14px;
    font-weight: 700;
    text-align: left;
}
</style>