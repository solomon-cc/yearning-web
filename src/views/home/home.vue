<style lang="less">
@import "../../styles/common.less";
</style>
<template>
    <div>
        <div class="padding-left-5">
            <Row :gutter="16">
                <Col span="6">
                    <div class="card bg-gradient-danger card-img-holder text-white">
                        <div class="card-body">
                            <img src="../../assets/circle.svg" class="card-img-absolute "
                                 alt="circle-image"/>
                            <Row>
                                <Col span="10">
                                    <Icon type="md-person-add" size="40"/>
                                    <h1>{{ $t('dash.user') }}</h1>
                                </Col>
                                <Col span="14">
                                    <info_card id-name="transfer_count0" :end-val="count.createUser"
                                               style="margin: 0 20px 0"></info_card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col span="6">
                    <div class="card bg-gradient-primary card-img-holder text-white">
                        <div class="card-body">
                            <img src="../../assets/circle.svg" class="card-img-absolute "
                                 alt="circle-image"/>
                            <Row>
                                <Col flex="10">
                                    <Icon type="md-person-add" size="40"/>
                                    <h1>{{ $t('dash.source') }}</h1>
                                </Col>
                                <Col flex="14">
                                    <info_card id-name="transfer_count1" :end-val="count.source"
                                               style="margin: 0 20px 0"></info_card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col span="6">
                    <div class="card bg-gradient-info card-img-holder text-white">
                        <div class="card-body">
                            <img src="../../assets/circle.svg" class="card-img-absolute "
                                 alt="circle-image"/>
                            <Row>
                                <Col span="10">
                                    <Icon type="md-person-add" size="40"/>
                                    <h1>{{ $t('dash.order') }}</h1>
                                </Col>
                                <Col span="14">
                                    <info_card id-name="transfer_count2" :end-val="count.order"
                                               style="margin: 0 20px 0"></info_card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col span="6">
                    <div class="card bg-gradient-success card-img-holder text-white">
                        <div class="card-body">
                            <img src="../../assets/circle.svg" class="card-img-absolute "
                                 alt="circle-image"/>
                            <Row>
                                <Col span="10">
                                    <Icon type="md-person-add" size="40"/>
                                    <h1>{{ $t('dash.query') }}</h1>
                                </Col>
                                <Col span="14">
                                    <info_card id-name="transfer_count3" :end-val="count.query"
                                               style="margin: 0 20px 0"></info_card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
        <br>
        <Row style="margin-left: 0.5%">
            <Col span="7">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="md-person" size="24"/>
                        {{ $t('dash.profile') }}
                    </p>
                    <Personal></Personal>
                </Card>
            </Col>
            <Col span="17">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="md-pie"/>
                        {{ $t('dash.db_top') }}
                    </p>
                    <SourcePie></SourcePie>
                </Card>
            </Col>
        </Row>
        <br>
        <Card style="margin-left: 0.5%">
            <p slot="title" class="card-title">
                <Icon type="md-map"></Icon>
                DML/DDL??????6????????????
            </p>
            <OrderChart></OrderChart>
        </Card>
    </div>
</template>

<script lang="ts">
import info_card from '@/components/inforCard.vue'
import Personal from '@/views/personal/personal.vue'
import {Component, Mixins} from 'vue-property-decorator'
import Basic from "@/mixins/basic";
import {AxiosResponse} from "axios";
import {Res} from "@/interface";
import {DashGetApi} from "@/apis/dashApis";
import OrderChart from "@/views/home/orderChart.vue"
import SourcePie from "@/views/home/sourcePie.vue";

@Component({components: {SourcePie, info_card, Personal, OrderChart}})
export default class home extends Mixins(Basic) {
    count = {
        createUser: 0,
        order: 0,
        source: 0,
        query: 0,
        ddl: 0,
        dml: 0
    };

    mounted() {
        DashGetApi('count')
            .then((res: AxiosResponse<Res>) => {
                this.count = res.data.payload;
            })
    }
}
</script>
