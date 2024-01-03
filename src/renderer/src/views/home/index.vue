<template>
  <div class="home">
    <img class="instruction-btn" :src="instructionSVG" alt="说明" @click="openModal">

  </div>
  <a-modal v-model:open="modalVisible" :title="modalTitle" centered @ok="modalVisible = false">
    <template #footer>
    </template>
    <Carousel />
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import instructionSVG from '../../assets/imgs/instruction.svg'
import Carousel from '../../components/Carousel.vue'

const modalVisible = ref<boolean>(false)
const modalTitle = ref<String>('说明')

const openModal = () => {
  modalVisible.value = true;
}

</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;

  .instruction-btn {
    position: absolute;
    right: 30px;
    top: 30px;
    cursor: pointer;
  }
}
</style>
