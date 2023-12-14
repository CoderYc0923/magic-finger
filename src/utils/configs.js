//通过 createFromOptions 创建Hand Landmarker所需的配置项
export const HandLandmarkerConfig = {
    baseOptions: {
        modelAssetPath: '/hand_landmarker.task', //训练模型地址
        delegate: 'GPU' //推理方式 GPU or CPU
    },
    runningMode: 'IMAGE' || 'VIDEO', //运行模式 遵循先图片后视频的规则
    numHands: 1, //手部地标检测器检测到的手的最大数量
    minHandDetectionConfidence: 0.6, //手掌检测模型中手掌检测成功的最低置信度。
    minHandPresenceConfidence: 0.6 //手部地标检测模型中手部存在的最小置信度。
}

//备选 fallback
export const HandLandmarkerConfig_fallback = {
    baseOptions: {
        modelAssetPath: 'hand_landmarker.task', //任务本身就有模型
        delegate: 'GPU' //推理方式 GPU or CPU
    },
    runningMode: 'IMAGE' || 'VIDEO', //运行模式 遵循先图片后视频的规则
    numHands: 1, //手部地标检测器检测到的手的最大数量
    minHandDetectionConfidence: 0.6, //手掌检测模型中手掌检测成功的最低置信度。
    minHandPresenceConfidence: 0.6 //手部地标检测模型中手部存在的最小置信度。
}

// 定义手指关键信息
export const Connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], // 大拇指
    [0, 5], [5, 6], [6, 7], [7, 8], // 食指
    [5, 9], [9, 10], [10, 11], [11, 12], // 中指
    [9, 13], [13, 14], [14, 15], [15, 16], // 无名指
    [13, 17], [17, 0], [17, 18], [18, 19], [19, 20], // 小拇指
  ];