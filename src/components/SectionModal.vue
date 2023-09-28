<template>
  <div
    class="wdis-modal wdis-pos-absolute wdis-top-0 wdis-left-0 wdis-w-vw wdis-h-vh wdis-p-8 wdis-flex"
  >
    <div class="wdis-pos-relative wdis-flex wdis-flex-1">
      <div
        class="wdis-button wdis-br5 wdis-bg-grey-200 wdis-pos-absolute wdis-right-0 wdis-m-1 wdis-br-circular"
        @click="close"
      >
        x
      </div>
      <canvas-draw @submit="submit" />
    </div>
  </div>
</template>

<script setup>
  import CanvasDraw from './CanvasDraw.vue';

  const emit = defineEmits(['submit', 'close']);

  const submit = e => {
    emit('submit', e);
    close();
  };

  const close = () => {
    emit('close');
  };
</script>

<style lang="scss" scoped></style>
