<script setup>
import { ref } from 'vue'
import { artAddChannelsService, artEditChannelsService } from '@/api/article.js'
import { ElMessage } from 'element-plus'

const dialogVisible = ref(false)
const formRef = ref()
const open = (row) => {
  console.log(row)
  formModel.value = { ...row }
  dialogVisible.value = true
}
defineExpose({
  open
})

const formModel = ref({
  cate_name: '',
  cate_alias: ''
})

const emit = defineEmits(['success'])
const onSubmit = async () => {
  await formRef.value.validate()
  const isEdit = formModel.value.id
  if (isEdit) {
    await artEditChannelsService(formModel.value)
    ElMessage.success('修改成功')
  } else {
    await artAddChannelsService(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success')
}

const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { pattern: /^\S{1,10}$/, message: '分类名1~10非空字符', trigger: 'blur' }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类名1~15字母或数字', trigger: 'blur' }
  ]
}
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="formModel.id ? '分类编辑' : '分类添加'" width="500">
    <el-form :model="formModel" :rules="rules" ref="formRef">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input placeholder="请输入分类名称" v-model="formModel.cate_name"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input placeholder="请输入分类别名" v-model="formModel.cate_alias"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
