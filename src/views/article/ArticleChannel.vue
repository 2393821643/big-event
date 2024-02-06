<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { onMounted, ref } from 'vue'
import { artGetChannelsService } from '@/api/article.js'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelEdit from '@/views/article/components/ChannelEdit.vue'
import { artDeleteChannelsService } from '@/api/article.js'
import { ElMessage, ElMessageBox } from 'element-plus'

const channelList = ref([])
const loading = ref(false)
const dialog = ref()
onMounted(() => {
  getChannelList()
})

const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  loading.value = false
}
const onEditChannel = (row, $index) => {
  console.log(row, $index)
  dialog.value.open(row)
}
const onDeleteChannel = async (row) => {
  await ElMessageBox.confirm('确定删除？', '提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
  await artDeleteChannelsService(row.id)
  ElMessage.success('删除成功')
  await getChannelList()
}

const onAddChannel = () => {
  dialog.value.open()
}

const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <PageContainer title="文章分类">
    <template #extra>
      <el-button @click="onAddChannel">添加分类</el-button>
    </template>
    <el-table :data="channelList" width="100%" v-loading="loading">
      <el-table-column label="序号" width="100" type="index"></el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="100">
        <!--        row一行的信息，相当于item， index序号-->
        <template #default="{ row, $index }">
          <el-button
            type="primary"
            circle
            plain
            @click="onEditChannel(row, $index)"
            :icon="Edit"
          ></el-button>
          <el-button
            type="danger"
            circle
            plain
            @click="onDeleteChannel(row, $index)"
            :icon="Delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <ChannelEdit ref="dialog" @success="onSuccess"></ChannelEdit>
  </PageContainer>
</template>

<style lang="scss" scoped></style>
