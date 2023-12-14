import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision'
import { HandLandmarkerConfig, HandLandmarkerConfig_fallback } from './configs'

const CDNURL = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.2/wasm'

class mediaPipeControler {
    #vision;
    #handLandmarker; //手部地标
    constructor() {}
    async init() {
        //从CDN创建任务，否则CORS会阻止所有的内部请求
        this.#vision = await FilesetResolver.forVisionTasks(CDNURL);
        try {
            this.#handLandmarker = await HandLandmarker.createFromOptions(this.#vision, HandLandmarkerConfig)
            console.log('Loaded hand_landmarker task successfully.');
            return this.#handLandmarker
        } catch (error) {
            console.error('Error loading hand_landmarker task:', error);
            try {
                //本地加载失败就尝试CDN
                this.#handLandmarker = await HandLandmarker.createFromOptions(this.#vision, HandLandmarkerConfig_fallback)
                console.log('Loaded hand_landmarker task successfully as fallback.');
                return this.#handLandmarker
            } catch (fallback_error) {
                console.error('Error loading hand_landmarker task as fallback:', fallback_error);
                return null;
            }
        }
    }
}

export default mediaPipeControler