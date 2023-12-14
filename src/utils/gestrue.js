/**
 * 手势识别相关逻辑
 */

const getFingerValue = (type) => {
    let value;
    switch (type) {
        case 0:
            value = landmarks[3].x < landmarks[2].x && landmarks[4].x < landmarks[2].x;
            break;
        case 1:
            value = landmarks[7].y < landmarks[6].y && landmarks[8].y < landmarks[6].y
            break;
        case 2:
            value = landmarks[11].y < landmarks[10].y && landmarks[12].y < landmarks[10].y
            break;
        case 3:
            value = landmarks[15].y < landmarks[14].y && landmarks[16].y < landmarks[14].y;
            break;
        case 4:
            value = landmarks[19].y < landmarks[17].y && landmarks[18].y < landmarks[17].y;
            break;
    }
    return value
}

//右手
export const rightHandGestures = (landmarks) => {
    //分配给相应手指的值
    const [thumbIsOpen, indexIsOpen, middleIsOpen, ringIsOpen, littleIsOpen] = [
        getFingerValue(0), getFingerValue(1), getFingerValue(2), getFingerValue(3), getFingerValue(4)
    ]
    //如果指尖的x坐标小于手指底部的x坐标，则默认设置为true(否则为false)
    if (!thumbIsOpen && !indexIsOpen && !middleIsOpen && !ringIsOpen && !littleIsOpen) return 'GRAB';
    else if (Math.sqrt(Math.pow(landmarks[4].x - landmarks[8].x, 2) + Math.sqrt(Math.pow(landmarks[4].y - landmarks[8].y, 2))) < 0.25) return 'CLICK'; //食指指尖和拇指指尖之间的欧氏距离
    else if (thumbIsOpen && indexIsOpen && middleIsOpen && ringIsOpen && littleIsOpen && landmarks[0].y > landmarks[12].y) return 'BACKSPACE';
    else return 'HOVER';
}

//左手
export const leftHandGestures = (landmarks) => {
    //分配给相应手指的值
    const [thumbIsOpen, indexIsOpen, middleIsOpen, ringIsOpen, littleIsOpen] = [
        getFingerValue(0), getFingerValue(1), getFingerValue(2), getFingerValue(3), getFingerValue(4)
    ]
    //如果指尖的x坐标小于手指底部的x坐标，则默认设置为true(否则为false)
    if (!thumbIsOpen && !indexIsOpen && !middleIsOpen && !ringIsOpen && !littleIsOpen) return 'GRAB';
    else if (Math.sqrt(Math.pow(landmarks[4].x - landmarks[8].x, 2) + Math.sqrt(Math.pow(landmarks[4].y - landmarks[8].y, 2))) < 0.25) return 'CLICK'; //食指指尖和拇指指尖之间的欧氏距离
    else if (thumbIsOpen && indexIsOpen && middleIsOpen && ringIsOpen && littleIsOpen && landmarks[0].y > landmarks[12].y) return 'BACKSPACE';
    else return 'HOVER';
}
