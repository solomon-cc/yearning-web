<template>
    <Row type="flex" justify="center">
        <BackTop></BackTop>
        <Card style="min-height: 800px;width: 98%">
            <p slot="title">
                <Icon type="md-trophy"/>
                流程模板
            </p>
            <Row>
                <Col :span="15">
                    <Input placeholder="根据名称信息搜索" v-model="find.text"
                           clearable @on-clear="clear_data" @on-enter="search_data"/>

                </Col>
                <Col :span="1">
                    <Button @click="search_data" class="margin-left-10" type="primary">搜索</Button>
                </Col>
            </Row>
            <div>
                <List>
                    <ListItem v-for="i in tpl_list" :key="i.title">
                        <ListItemMeta :avatar="tpl_logo"
                                      :title="i.title" :description="i.desc"/>
                        <template slot="action">
                            <li>
                                <Button type="text" @click="open_order(i.title)">编辑</Button>
                            </li>
                        </template>
                    </ListItem>
                </List>
            </div>
        </Card>

        <Modal v-model="is_open" title="编辑流程模板" width="1000">
            <Steps :current="0" size="small">
                <Step v-for="(i,idx) in tmp_steps" :key="idx" :title="i.desc">
                    <div slot="content">
                        <p>{{ `相关人员:${i.auditor}` }}</p>
                        <template v-if="idx !==0">
                            <Poptip
                                confirm
                                title="确定要删除该步骤吗？"
                                @on-ok="del_step(idx)"
                                transfer>
                                <Button type="text" size="small">删除</Button>
                            </Poptip>
                            <Button type="text" size="small" class="margin-left-10" @click="edit_tpl(i,idx)">编辑</Button>
                        </template>
                    </div>
                </Step>
            </Steps>
            <Divider orientation="left" dashed>添加阶段</Divider>
            <div>
                <Row>
                    <Col span="12">
                        <Tabs value="preview">
                            <TabPane label="预览编辑" name="preview">
                                <Form>
                                    <FormItem label="步骤类型">
                                        <Select v-model="tpl.type" transfer>
                                            <Option label="审核" :value="0"></Option>
                                            <Option label="执行" :value="1"></Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem label="相关人员">
                                        <Select v-model="tpl.auditor" multiple transfer filterable>
                                            <Option v-for="i in multi_list" :key="i.username" :value="i.username"
                                                    :label="i.username"></Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem label="阶段名称">
                                        <Input v-model="tpl.desc" maxlength="10" show-word-limit></Input>
                                    </FormItem>
                                </Form>
                                <template v-if="is_tpl_edit">
                                    <Button type="text" size="small" class="margin-left-10"
                                            @click="position_adjustment(true)">向前移动
                                    </Button>
                                    <Button type="info" size="small" @click="edit_tpl_save" class="margin-left-10">保存
                                    </Button>
                                    <Button type="text" size="small" class="margin-left-10"
                                            @click="position_adjustment(false)">向后移动
                                    </Button>
                                </template>
                                <Button type="primary" size="small" @click="add_step" v-else>添加阶段</Button>
                            </TabPane>
                        </Tabs>

                    </Col>
                    <Col span="11" offset="1">
                        <Alert show-icon>
                            一点小建议
                            <Icon type="ios-bulb-outline" slot="icon"></Icon>
                            <template slot="desc">
                                1.中间审核人最多支持5层
                                <br>
                                2.仅允许一个执行阶段! 请将审核阶段的参数添加在执行阶段之前。
                                <br>
                                3.特别注意,如对现有流程进行更改。请确保当前流程下所有工单都已执行完毕，否则将会导致未执行工单流程错乱!
                            </template>
                        </Alert>
                    </Col>
                </Row>
            </div>
            <template slot="footer">
                <Button type="warning" @click="is_open=false">取消</Button>
                <Button type="primary" @click="post_tpl">确定</Button>
            </template>
        </Modal>
    </Row>
</template>

<script lang="ts">
import {Component, Mixins} from "vue-property-decorator";
import Basic from "@/mixins/basic";
import {Res, TplOrder} from '@/interface';
import {TplAllSourceFetchApi, TplCreateOrEditApi, TplFetchProfile} from "@/apis/tplApis";
import {AxiosResponse} from "axios";

const tpl_step: TplOrder[] = [
    {
        desc: '提交阶段',
        auditor: ['提交人'],
        type: 0,  // 0 audit 1 executor
    }
]

@Component({})
export default class FlowTemplate extends Mixins(Basic) {
    tpl_logo = require("../../../assets/tpl.svg")
    tpl_list: any = []
    tpl = {} as TplOrder
    is_tpl_edit = false
    c_idx = 0
    tmp_steps: TplOrder[] = []
    source = ''
    tpl_list_all = [] as any

    clear_data() {
        this.tpl_list = this.tpl_list_all
    }

    search_data() {
        let tb: any[] = []
        this.tpl_list.forEach((item: any) => {
            if (item.desc.indexOf(this.find.text) !== -1) {
                tb.push(item)
            }
        })
        this.tpl_list = tb
    }
    edit_tpl(tpl: TplOrder, idx: number) {
        this.tpl = Object.assign({} as TplOrder, tpl)
        this.is_tpl_edit = true
        this.c_idx = idx
    }

    position_adjustment(tp: boolean = false) {
        if (tp) {
            if (this.c_idx === 1) {
                this.$Message.warning({content: '不可一退再退！'})
                return
            }
            this.tmp_steps[this.c_idx] = this.tmp_steps.splice(this.c_idx - 1, 1, this.tmp_steps[this.c_idx])[0];
            this.c_idx -= 1
        } else {
            if (this.c_idx === this.tmp_steps.length - 1) {
                this.$Message.warning({content: '不可一进再进！'})
                return
            }
            this.tmp_steps[this.c_idx] = this.tmp_steps.splice(this.c_idx + 1, 1, this.tmp_steps[this.c_idx])[0];
            this.c_idx += 1
        }
    }

    del_step(idx: number) {
        this.tmp_steps.splice(idx, 1)
    }

    edit_tpl_save() {
        this.tmp_steps[this.c_idx] = this.tpl
        this.is_tpl_edit = false
        this.tpl = {} as TplOrder
    }

    post_tpl() {
        if (this.tmp_steps[this.tmp_steps.length - 1].type !== 1) {
            this.$Message.error({content: "最后步骤必须为执行类型！保存失败!", duration: 5})
            return
        }

        if (this.is_tpl_edit) {
            this.$Message.error({content: "请先保存被编辑的步骤信息!", duration: 5})
            return
        }
        TplCreateOrEditApi({steps: this.tmp_steps, source: this.source})
            .finally(() => {
                this.is_open = !this.is_open
            })
    }

    open_order(vl: string) {
        TplFetchProfile(vl)
            .then((res: AxiosResponse<Res>) => {
                res.data.payload.steps === null ? this.tmp_steps = JSON.parse(JSON.stringify(tpl_step)) : this.tmp_steps = res.data.payload.steps
            })
            .finally(() => {
                this.is_open = !this.is_open
                this.source = vl
                this.tpl = {} as TplOrder
            })

    }

    fetch_all_sources() {
        TplAllSourceFetchApi()
            .then((res: AxiosResponse<Res>) => {
                for (let i of res.data.payload) {
                    this.tpl_list_all.push({title: i, desc: `${i}数据源审核流程`})
                    this.tpl_list = this.tpl_list_all
                }
            })
    }

    add_step() {
        if (this.tpl.type === 1) {
            for (let i of this.tmp_steps) {
                if (i.type === 1) {
                    this.$Message.warning({content: '执行阶段仅允许添加一次!'})
                    return;
                }
            }
        }
        if (this.tmp_steps.length === 7) {
            this.$Message.warning({
                content: '中间审核环节最多支持5层'
            })
            return
        }
        this.tmp_steps.push({desc: this.tpl.desc, auditor: this.tpl.auditor, type: this.tpl.type})
        this.tpl = {} as TplOrder
    }

    mounted() {
        this.fetch_perform()
        this.fetch_all_sources()
    }
}
</script>

<style lang="less">
@import "../../../styles/common.less";
</style>