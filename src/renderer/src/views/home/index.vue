<template>
  <div class="home">
    <img class="instruction-btn" :src="instructionSVG" alt="说明" @click="openModal" />
    <LogoutOutlined class="back-btn" @click="back" v-if="showCanvas" />
    <InstagramFilled
      twoToneColor="#eb2f96"
      style="font-size: 120px"
      class="instagram-icon"
      @click="startMedia"
      v-if="!showCanvas"
    />
    <div class="action-area" v-else>
      <video ref="videoRef" class="action-video"></video>
      <!-- <canvas class="action-canvas" ref="canvasRef"></canvas> -->
    </div>
  </div>
  <a-modal v-model:open="modalVisible" :title="modalTitle" centered @ok="modalVisible = false">
    <template #footer> </template>
    <Carousel class="carousel-box" />
  </a-modal>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import instructionSVG from '../../assets/imgs/instruction.svg'
import Carousel from '../../components/Carousel.vue'
import { InstagramFilled, LogoutOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const canvasRef = ref()
const videoRef = ref()
const [messageApi] = message.useMessage()

const showCanvas = ref<boolean>(false)
const modalVisible = ref<boolean>(false)
const modalTitle = ref<String>('说明')

const openModal = () => {
  modalVisible.value = true
}

const back = () => {
  showCanvas.value = false
}

const detectLandmarks = () => {
  try {
    const ctx = canvasRef.value.getContext('2d')
    const { width, height } = canvasRef.value
    ctx.clearRect(0, 0, width, height)
    ctx.drawImage(videoRef.value, 0, 0, width, height)
  } catch (error) {
    messageApi.info(`追踪失败: ${error}`)
  }
  requestAnimationFrame(detectLandmarks)
}

const startCam = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    })
    videoRef.value.srcObject = stream
    videoRef.value.setAttribute('autoplay', '')
    videoRef.value.setAttribute('playsinline', '')
    await videoRef.value.play()
    // detectLandmarks()
  } catch (error) {
    messageApi.info(`摄像头调用失败: ${error}`)
  }
}

const initCam = () => {
  startCam()
}

const startMedia = () => {
  showCanvas.value = true
  initCam()
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;

  .action-area {
    position: relative;
    width: 100%;
    height: 100%;

    .action-video {
      width: 100%;
      height: 99%;
      transform: scaleX(-1); //水平翻转
      object-fit: 'fill';
    }
  }

  .instruction-btn {
    position: absolute;
    right: 30px;
    top: 30px;
    cursor: pointer;
    z-index: 99;
  }

  .back-btn {
    position: absolute;
    left: 30px;
    top: 30px;
    cursor: pointer;
    font-size: 30px;
    color: #999999;
    z-index: 99;
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
