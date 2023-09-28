<template>
  <div class="wdis-flex wdis-flex-1 wdis-flex-column wdis-p-4 wdis-bg-grey-800">
    <h2>Add a new section</h2>
    <div class="wdis-flex wdis-gap-2 wdis-pb-2">
      <div
        class="wdis-button wdis-button-bg-amber-600"
        :class="{ 'wdis-button-bg-amber-600-active': isCircle }"
        @click="isCircle = true"
      >
        Circle
      </div>
      <div
        class="wdis-button wdis-button-bg-green-600"
        :class="{ 'wdis-button-bg-green-600-active': !isCircle }"
        @click="isCircle = false"
      >
        Square
      </div>
      <select v-model="colour" :class="`wdis-text-colour-${colour}`" class="wdis-br-5 wdis-select">
        <option v-for="(colour, index) of themeColourNames" :key="index">{{ colour }}</option>
      </select>
    </div>
    <div
      @mousedown="mouseDown"
      @mousemove="mouseMove"
      @mouseup="mouseUp"
      class="wdis-border-2 wdis-bg-grey-100-o-65 wdis-p-2 wdis-flex-1 wdis-canvas-draw wdis-pos-relative"
    >
      <drag-and-drop
        :min-x="item.minX"
        :max-x="item.maxX"
        :min-y="item.minY"
        :max-y="item.maxY"
        :is-circle="item.isCircle"
        :colour="colour"
        :text="item.text"
        :disabled="true"
      />
    </div>
    <div class="wdis-flex wdis-gap-2 wdis-pt-2">
      <div
        class="wdis-button wdis-button-bg-blue-600"
        :class="{ 'wdis-button-bg-blue-600-active': isCircle }"
        @click="submit"
      >
        Submit
      </div>
    </div>
  </div>
</template>

<script setup>
  import DragAndDrop from './DragAndDrop.vue';
  import { themeColourNames } from '../helpers/enums';
  import { useDebounceFn } from '@vueuse/core';

  import { ref, watch } from 'vue';

  const emit = defineEmits(['submit']);

  const item = ref({});
  const colour = ref('blue-500');
  const isCircle = ref(false);
  const text = ref('');
  const isDrawn = ref(false);
  const isDown = ref(false);
  const minX = ref(0);
  const maxX = ref(0);
  const minY = ref(0);
  const maxY = ref(0);
  const startX = ref(0);
  const startY = ref(0);
  const endX = ref(0);
  const endY = ref(0);

  const mouseDown = e => {
    if (!isDrawn.value) {
      isDown.value = true;

      startX.value = Math.floor(e.offsetX);
      startY.value = Math.floor(e.offsetY);
      endX.value = Math.floor(e.offsetX);
      endY.value = Math.floor(e.offsetY);
    }
  };

  const mouseMove = e => {
    if (isDown.value && e.offsetX) {
      endX.value = Math.floor(e.offsetX);
      endY.value = Math.floor(e.offsetY);
    }

    updateDraggable();
  };

  const mouseUp = () => {
    isDown.value = false;
  };

  const updateDraggable = () => {
    minX.value = Math.min(startX.value, endX.value);
    maxX.value = Math.max(startX.value, endX.value);
    minY.value = Math.min(startY.value, endY.value);
    maxY.value = Math.max(startY.value, endY.value);

    item.value = {
      minX: minX.value,
      maxX: maxX.value,
      minY: minY.value,
      maxY: isCircle.value ? minY.value + maxX.value - minX.value : maxY.value,
      isCircle: isCircle.value,
      text: text.value,
      colour: colour.value
    };
  };

  const submit = () => {
    emit('submit', item.value);
    minX.value = 0;
    maxX.value = 0;
    minY.value = 0;
    maxY.value = 0;
    colour.value = '';
    text.value = '';
  };

  watch(text, () => {
    item.value.text = text.value;
  });
</script>

<style lang="scss" scoped>
  .wdis {
    &-button {
      cursor: pointer;
      user-select: none;
    }

    &-select {
      font-weight: bold;
      text-transform: capitalize;
    }
  }
</style>
