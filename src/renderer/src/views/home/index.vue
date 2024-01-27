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
      <canvas class="action-canvas" ref="canvasRef" width="500" height="500"></canvas>
    </div>
  </div>
  <a-modal v-model:open="modalVisible" :title="modalTitle" centered @ok="modalVisible = false">
    <template #footer> </template>
    <Carousel class="carousel-box" />
  </a-modal>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import instructionSVG from '../../assets/imgs/instruction.svg'
import Carousel from '../../components/Carousel.vue'
import { InstagramFilled, LogoutOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

import { Camera } from '@mediapipe/camera_utils'
import { FilesetResolver, GestureRecognizer } from '@mediapipe/tasks-vision'

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

const checkGesture = (result: any) => {
  const attributes = ['gestures', 'handedness', 'handednesses', 'landmarks', 'worldLandmarks']
  let flag = true
  for (let attr of attributes) {
    if (!result[attr]?.length) {
      flag = false
      break
    }
  }
  return flag
}

const gestureRecognition = async () => {
  try {
    /* const ctx = canvasRef.value.getContext('2d')
    const { width, height } = canvasRef.value
    ctx.clearRect(0, 0, width, height)
    ctx.drawImage(videoRef.value, 0, 0, width, height) */

    //创建图像文件处理任务
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    )

    const gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: './models/gesture_recognizer.task'
      },
      numHands: 2
    })

    if (videoRef.value) {
      const camera = new Camera(videoRef.value, {
        onFrame: async () => {
          const result = await gestureRecognizer.recognize(videoRef.value)
          let flag = checkGesture(result)
          if (flag) {
            //console.log('追踪结果', result)
            getIndexFingerTip(result)
          }
        }
      })

      camera.start()
    }
  } catch (error) {
    messageApi.info(`追踪失败: ${error}`)
  }
  // requestAnimationFrame(detectLandmarks)
}

//获取食指顶部地标信息并绘制
const getIndexFingerTip = (fingerData: any) => {
  const ctx = canvasRef.value.getContext('2d')
  console.log('getIndexFingerTip', ctx.beginPath)

  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  const { landmarks } = fingerData
  const indexFingerTipInfo = landmarks[0][8]
  if (indexFingerTipInfo) {
    /**
     * 窗口映射地标逻辑（归一化）
     * 窗口左上角 = x: 1 y: 0
     * 窗口右上角 = x: 0 y: 0
     * 窗口左下角 = x: 1 y: 1
     * 窗口右下角 = x: 0 y: 1
     */
    const x = indexFingerTipInfo[0]
    const y = indexFingerTipInfo[1]
    ctx.beginPath()
    ctx.arc(100, 100, 10, 0, 2 * Math.PI)
    ctx.fillStyle = 'red'
    ctx.fill()
  }
  console.log('食指信息:', indexFingerTipInfo)
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
    gestureRecognition()
  } catch (error) {
    messageApi.info(`摄像头调用失败: ${error}`)
  }
}

const initCam = () => {
  startCam()
}

const startMedia = () => {
  showCanvas.value = true
  nextTick(resizeCanvasSize)
  initCam()
}

const resizeCanvasSize = () => {
  console.log('canvasRef.value', canvasRef.value)

  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth
    canvasRef.value.height = window.innerHeight
  }
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

    .action-canvas {
      position: absolute;
      left: 0;
      top: 0;
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
