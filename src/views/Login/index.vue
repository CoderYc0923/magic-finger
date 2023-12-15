<template>
    <div class="login fill flex-row-center-center">
        <h1>Welcome to Magic Finger</h1>
        <div class="action-area fill">
            <canvas class="action-canvas" ref="canvasRef"></canvas>
        </div>
    </div>
</template>

<script setup>
import mediaPipeControler from '@/utils/mediaPipe'
import { Connections } from '@/utils/configs'
import { rightHandGestures, leftHandGestures } from '@/utils/gestrue'
import { gestureStore } from '@/stores/gesture'

const store = gestureStore();
const canvasRef = ref()
const handLandmarker = new mediaPipeControler().init();

const drawLandmarksAndConnectors = (landmarks, ctx) => {
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 4
    const { width, height } = canvasRef.value
    //绘制连接器
    for (const connection of Connections) {
        const [index1, index2] = connection;
        //使用归一化的x和y计算手部地标的像素位置
        ctx.beginPath();
        ctx.moveTo(landmarks[index1].x * width, landmarks[index1].y * height)
        ctx.lineTo(landmarks[index2].x * width, landmarks[index2].y * height)
        ctx.stroke();
    }

    //绘制地标
    ctx.fillStyle = 'teal';
    for (const landmark of landmarks) {
        ctx.beginPath();
        ctx.arc(landmark.x * width, landmark.y * height, 7, 0, 2 * Math.PI)
        ctx.fill();
    }
}

const detectLandmarks = (video, ctx) => {
    try {
        //从视频流中检测手部地标信息
        const results = handLandmarker.detect(video)
        const landmarks = results?.landmarks;
        //因为镜像原理，所以左右手互换
        const handType = (results?.handednesses[0]?.[0]?.categoryName) === 'Left' ? "Right" : "Left";
        //将手部信息映射到canvas上
        const ctx = canvasRef.getContext('2d');
        const { width, height } = canvasRef.value
        ctx.clearRect(0, 0, width, height)
        if (landmarks?.length) {
            ctx.drawImage(video, 0, 0, width, height)
            drawLandmarksAndConnectors(landmarks[0], ctx);
            // handType === 'Left' ? putGesture(leftHandGestures(landmarks[0])) : putGesture(rightHandGestures(landmarks[0]));
            store.gesture = handType === 'Left' ? leftHandGestures(landmarks[0]) : rightHandGestures(landmarks[0])
            // putFingLock(landmarks[0]);
            store.finger_locx = landmarks[0]
        } else {
            ctx.drawImage(video, 0, 0, width, height)
        }
    } catch (error) {
        console.error('Error detecting landmarks: ', error);
    }
    requestAnimationFrame(detectLandmarks)
}

const startCamera = async (video) => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        video.srcObject = stream;
        video.setAttribute('autoplay', '');
        video.setAttribute('playsinline', '');
        await video.play();
        detectLandmarks();
    } catch (error) {

    }
}

const setCanvasSize = () => {
    canvasRef.value.height = window.innerHeight;
    canvasRef.value.width = window.innerWidth;
}

const init = () => {
    if (handLandmarker) {
        const video = document.createElement('video');
        startCamera(video);
        window.addEventListener('resize', setCanvasSize)
    }
}

onMounted(init)

onBeforeUnMount(() => {
    window.removeEventListener('resize', setCanvasSize)
})
</script>

<style lang="scss" scoped>
.action-area {
    position: fixed;

    .action-canvas {
        transform: scaleX(-1); //水平翻转
    }
}
</style>
