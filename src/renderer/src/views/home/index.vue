<template>
  <div class="home">
    <img class="instruction-btn" :src="instructionSVG" alt="说明" @click="openModal" />
    <InstagramFilled
      twoToneColor="#eb2f96"
      style="font-size: 120px"
      class="instagram-icon"
      @click="startMedia"
    />
  </div>
  <a-modal v-model:open="modalVisible" :title="modalTitle" centered @ok="modalVisible = false">
    <template #footer> </template>
    <Carousel class="carousel-box" />
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import instructionSVG from '../../assets/imgs/instruction.svg'
import Carousel from '../../components/Carousel.vue'
import { InstagramFilled } from '@ant-design/icons-vue'

const modalVisible = ref<boolean>(false)
const modalTitle = ref<String>('说明')

const openModal = () => {
  modalVisible.value = true
}

const startMedia = () => {}
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

  .instagram-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
}

.carousel-box {
  height: 300px;
  background: #364d79;
}
</style>
