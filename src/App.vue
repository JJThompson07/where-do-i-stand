<template>
  <header :class="{ 'wdis-blur': addSection }">
    <div class="wrapper">
      <HelloWorld class="wdis-p-4 wdis-text-center wdis-w-full" msg="Where do I stand?" />
    </div>
  </header>

  <main
    class="wdis-main wdis-flex wdis-flex-column"
    :class="{ 'wdis-blur': addSection }"
    @click.self="
      selectedItem = null;
      selectedIndex = null;
    "
  >
    <div class="wdis-actions wdis-p-4 wdis-flex wdis-gap-4">
      <div
        v-if="showContent !== 'builder'"
        class="wdis-button wdis-bg-blue-400 wdis-w-max-content"
        @click="showContent = 'builder'"
      >
        Lets try it out
      </div>
      <div v-if="showContent !== 'example'" class="wdis-flex wdis-gap-4">
        <div
          class="wdis-button wdis-bg-blue-400 wdis-w-max-content"
          @click="(showContent = 'example'), clearSections()"
        >
          Example
        </div>
        <div class="wdis-button wdis-bg-blue-400 wdis-w-max-content" @click="addSection = true">
          Add Section
        </div>
        <div class="wdis-button wdis-bg-red-400 wdis-w-max-content" @click="removeSection">
          Remove Section
        </div>
        <div class="wdis-button wdis-bg-amber-400 wdis-w-max-content" @click="clearSections">
          Clear Sections
        </div>
        <div
          v-if="selectedItem"
          class="wdis-button wdis-bg-grey-400 wdis-w-max-content"
          @click="duplicate"
        >
          Duplicate item
        </div>
        <select
          v-if="selectedItem"
          v-model="colour"
          :class="`wdis-text-colour-${colour}`"
          class="wdis-br-5 wdis-select wdis-px-2"
          @change="updateColour"
        >
          <option v-for="(colour, index) of themeColourNames" :key="index">{{ colour }}</option>
        </select>
      </div>
    </div>
    <div v-if="showContent === 'builder'" class="wdis-content wdis-border-top-grey-100">
      <drag-and-drop
        v-for="(item, index) of sectionItems"
        :key="index"
        :min-x="item.minX"
        :max-x="item.maxX"
        :min-y="item.minY"
        :max-y="item.maxY"
        :is-circle="item.isCircle"
        :colour="item.colour"
        :text="item.text"
        @click="selectedIndex = index"
        @coords="updateSelectedCoords"
        @content="updateContent"
      />
    </div>
    <div
      v-if="showContent === 'example'"
      class="wdis-flex wdis-flex-1 wdis-border-top-grey-600 wdis-bg-grey-300"
    >
      <drag-and-drop
        v-for="(item, index) of exampleItems"
        :key="index"
        :min-x="item.minX"
        :max-x="item.maxX"
        :min-y="item.minY"
        :max-y="item.maxY"
        :is-circle="item.isCircle"
        :colour="item.colour"
        :text="item.text"
      />
    </div>
  </main>
  <section-modal
    :data="selectedItem"
    v-if="addSection"
    @close="addSection = false"
    @submit="updateSections"
  />
  <content-modal v-if="showContentModal" :index="modalIndex" />
</template>

<script setup>
  import HelloWorld from './components/HelloWorld.vue';
  import SectionModal from './components/SectionModal.vue';
import DragAndDrop from './components/DragAndDrop.vue';
  import { themeColourNames } from './helpers/enums';

  import { ref, watch } from 'vue';

  const addSection = ref(false);
  const sectionItems = ref([]);
  const selectedItem = ref(null);
  const selectedIndex = ref(null);
  const showContent = ref('example');
  const modalINdex = ref(null);
  const colour = ref('');

  const exampleItems = ref([
    {
      minX: 469,
      maxX: 737,
      minY: 200,
      maxY: 286,
      isCircle: false,
      text: '\nInterview',
      colour: 'yellow-700'
    },
    {
      minX: 483,
      maxX: 729,
      minY: 351,
      maxY: 473,
      isCircle: false,
      text: 'QAM1\n\nJunior test Analyst \n48%',
      colour: 'blue-500'
    },
    {
      minX: 535,
      maxX: 672,
      minY: 535,
      maxY: 641,
      isCircle: false,
      text: 'QAM2\n\nTest analyst \n 53%',
      colour: 'blue-500'
    },
    {
      minX: 533,
      maxX: 672,
      minY: 707,
      maxY: 846,
      isCircle: true,
      text: '\n\nPath alt',
      colour: 'green-300'
    },
    {
      minX: 195,
      maxX: 511,
      minY: 860,
      maxY: 928,
      isCircle: false,
      text: 'Junior Backend Developer',
      colour: 'grey-400'
    },
    {
      minX: 685,
      maxX: 1001,
      minY: 860,
      maxY: 928,
      isCircle: false,
      text: 'Junior Security Tester',
      colour: 'grey-400'
    }
  ]);

  const updateSections = newSection => {
    sectionItems.value.push(newSection);
  };

  const removeSection = () => {
    sectionItems.value.pop();
  };

  const clearSections = () => {
    sectionItems.value = [];
  };

  const duplicate = () => {
    sectionItems.value.push({ ...selectedItem.value });
  };

  const updateColour = () => {
    selectedItem.value = null;
    sectionItems.value[selectedIndex.value].colour = colour.value;
    selectedIndex.value = null;
    console.log(sectionItems.value);
  };

  const updateContent = text => {
    console.log(text);
    sectionItems.value[selectedIndex.value].text = text;
  };

  watch(selectedItem, () => {
    if (selectedItem.value) {
      colour.value = selectedItem.value.colour;
    }
  });

  watch(selectedIndex, () => {
    selectedItem.value = { ...sectionItems.value[selectedIndex.value] };
  });

  watch(
    sectionItems,
    val => {
      console.log(JSON.stringify(val));
    },
    { deep: true }
  );
</script>

<style lang="scss">
  #app {
    display: flex;
    flex-flow: column;
    height: 100vh;
    width: 100vw;
  }

  .wdis {
    &-main {
      flex-grow: 1;
    }
    &-blur {
      filter: blur(12px);
    }
  }
</style>
