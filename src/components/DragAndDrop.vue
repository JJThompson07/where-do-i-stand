<template>
  <textarea
    id="draggable"
    ref="draggable"
    class="wdis-pos-absolute wdis-z-100 wdis-flex wdis-flex-center wdis-draggable wdis-text-center wdis-p-1 wdis-text-colour-grey-100 wdis-flex wdis-align-center"
    :class="[
      isCircle ? 'wdis-br-circular' : 'wdis-br-10',
      `wdis-bg-w-${colour}-o-70 wdis-border-full-thick-${colour}-o-80`
    ]"
    :style="styles"
    type="text"
    :disabled="isDisabled"
    v-model="textarea"
  />
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue';

  const props = defineProps({
    minX: { type: Number },
    maxX: { type: Number },
    minY: { type: Number },
    maxY: { type: Number },
    isCircle: { type: Boolean },
    colour: { type: String },
    text: { type: String },
    isDisabled: { type: Boolean }
  });

  const textarea = ref(props.text);

  const emit = defineEmits(['coords', 'content']);

  const draggable = ref();
  const isDragging = ref(false);

  const topVal = ref(Number(props.minY));
  const leftVal = ref(Number(props.minX));
  const startX = ref(null);
  const startY = ref(null);

  // computed
  const width = computed(() => {
    return Number(props.maxX) - Number(props.minX);
  });
  const height = computed(() => {
    return Number(props.maxY) - Number(props.minY);
  });

  const top = computed(() => {
    return topVal.value;
  });
  const left = computed(() => {
    return leftVal.value;
  });

  const styles = computed(() => {
    return {
      width: `${width.value}px`,
      height: `${height.value}px`,
      top: `${top.value}px`,
      left: `${left.value}px`
    };
  });

  // Methods
  const mouseDown = e => {
    isDragging.value = true;
    startX.value = e.x;
    startY.value = e.y;
  };

  const mouseMove = e => {
    if (isDragging.value) {
      const changeInX = e.x - Number(startX.value);
      const changeInY = e.y - Number(startY.value);
      startX.value = e.x;
      startY.value = e.y;

      leftVal.value = leftVal.value + changeInX;
      topVal.value = topVal.value + changeInY;

      emit('coords', {
        yMin: topVal.value,
        yMax: topVal.value + height.value,
        xMin: left.value,
        xMax: leftVal.value + width.value
      });
    }
  };

  const mouseUp = () => {
    isDragging.value = false;
  };

  watch(
    () => props.minX,
    () => {
      leftVal.value = Number(props.minX);
    }
  );

  watch(
    () => props.minY,
    () => {
      topVal.value = Number(props.minY);
    }
  );

  watch(textarea, () => {
    console.log(text.value);
    // emit('content', text.value);
  });

  // OnMounted
  onMounted(() => {
    if (draggable.value) {
      draggable.value.addEventListener('mousedown', mouseDown);
      draggable.value.addEventListener('mousemove', mouseMove);
      draggable.value.addEventListener('mouseup', mouseUp);
      draggable.value.addEventListener('mouseleave', mouseUp);
    }
  });
</script>

<style scoped lang="scss">
  .wdis {
    &-draggable {
      text-transform: capitalize;
      font-size: 20px;
      cursor: pointer;

      &:active,
      &:focus,
      &:focus-within {
        outline: none;
        filter: drop-shadow(0 0 0.75rem rgba(255, 255, 255, 0.25));
      }
    }
  }
</style>
