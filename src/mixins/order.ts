import {Component, Mixins} from "vue-property-decorator";
import Basic from "@/mixins/basic";
@Component({components: {}})
export default class OrderMixins extends Mixins(Basic) {

    testColumns = [
        {
            title: '阶段',
            key: 'status',
            width: '150'
        },
        {
            title: '错误等级',
            key: 'level',
            width: '100'
        },
        {
            title: '错误信息',
            key: 'error',
            tooltip: true,
            width: 500
        },
        {
            title: '当前检查的sql',
            key: 'sql',
            tooltip: true
        },
        {
            title: '影响行数',
            key: 'affect_rows',
            width: '120'
        }
    ];
}
