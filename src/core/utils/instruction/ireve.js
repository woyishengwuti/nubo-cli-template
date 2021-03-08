/**
 * @ Author: feixiang.wu
 * @ Create Time: 2020-10-09 13:32:57
 * @ Modified by: feixiang.wu
 * @ Modified time: 2020-11-26 09:25:44
 * @ Description: 图像识别车指令
 */

import Nuobo from './index'

class Ireve extends Nuobo {
  constructor(props, attr) {
    super(props)
  }

  NBAGVaa() {
    console.error('Ireve')
  }

  // 开始识别
  NBTriggerPhotoService({ dev, cameraNo = 0 }) {
    const cmd = {
      type: 'data',
      data: [{
        cmd: 'triggerPhotoService',
        sqs: 1,
        ackSqs: 0,
        operate: '',
        target: [{
          dev: dev,
          params: {
            cameraNo: cameraNo
          }
        }]
      }]
    }

    const head = this.NBCreateHead(cmd)
    this.post(head + '' + JSON.stringify(cmd))
  }
}

export default new Ireve()
