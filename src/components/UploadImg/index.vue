<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :file-list="fileList"
      action="#"
      list-type="picture-card"
      :http-request="onRequest"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :before-upload="beforeUpload"
      :class="fileList.length ? 'hide' : ''"
      class="custom-upload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>

    <el-dialog
      title="图片预览"
      class="upload-dialog"
      :visible.sync="previewImgDialog"
    >
      <img :src="previewImg" alt="" width="100%" />
    </el-dialog>
  </div>
</template>

<script>
// id: AKIDRrIhtqWx71f3A2d1B9sRqBOL2UheMq68
// key: sWv4yd4IH1VkjSzIMAj3sUs2yd3D7mBJ
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDRrIhtqWx71f3A2d1B9sRqBOL2UheMq68',
  SecretKey: 'sWv4yd4IH1VkjSzIMAj3sUs2yd3D7mBJ',
})
// 在企业中如何获取id和key,肯定不是明文
// var cos = new COS({
//   // getAuthorization函数必写
//   async getAuthorization(options, callback) {
//     // 向后端发起请求
//     const res = await axios.get('请求地址')
//     callback({
//       TmpSecretId: res.tmpSecretId,
//       TmpSecretKey: res.tmpSecretKey,
//       SecurityToken: res.sessionToken,
//       // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
//       StartTime: res.startTime, // 时间戳，单位秒，如：1580000000
//       ExpiredTime: res.expiredTime, // 时间戳，单位秒，如：1580000000
//       ScopeLimit: true, // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
//     })
//   },
// })
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [],
      previewImgDialog: false,
      previewImg: '',
      loading: false,
    }
  },

  created() {},

  methods: {
    // 向腾讯云发起请求储存文件
    onRequest({ file }) {
      this.loading = true
      cos.putObject(
        {
          Bucket: 'my-store-1313341532' /* 必须 储存桶的名称 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 上传文件名称 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            // console.log(JSON.stringify(progressData))
          },
        },
        (err, data) => {
          // 成功或失败都会进入该函数
          this.loading = false
          if (err || data.statusCode !== 200) {
            return this.$message.error('图片上传失败')
          }
          this.$emit('onSuccess', { url: `https://${data.Location}` })
        },
      )
    },
    // 添加文件时触发的函数
    onChange(file, fileList) {
      this.fileList = fileList
    },
    // 删除结构中的图片时触发的函数
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    // 文件上传时触发的函数
    onPreview(file) {
      this.previewImgDialog = true
      this.previewImg = file.url
    },
    // 上传文件前的钩子函数
    beforeUpload(file) {
      // 可以上传的图片类型
      const types = ['image/jpeg', 'image/gif', 'image/png', 'image/webp']
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join('、') + '格式的图片')
        return false
      }

      // 限制图片的大小
      const maxsize = 2 * 1024 * 1024
      if (file.size > maxsize) {
        this.$message.error('选择图片大小不能超过2MB')
        return false
      }
    },
  },
}
</script>

<style lang="scss">
.hide {
  .el-upload--picture-card {
    display: none;
  }
}
.upload-dialog {
  .el-dialog__header {
    // background: #fff;
    height: 70px;
  }
}
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
