<template>
    <div>
        <div>
            <label>Inners of this node:</label>
            <div v-for="(edge, key) in Inners" :key="key" class="item">
                <label>
                    {{ ` ${edge.label}.` }}
                    <span :style="getMeanColor(edge)">{{ getMeaning(edge) }}</span>
                    является причиной
                </label>
            </div>
        </div>
        <div>
            {{ thisNode.label }}.
            <input type="text" placeholder="Введите данные" v-model="field">
        </div>
        <div>
            <label>Outers of this node:</label>
            <div v-for="(edge, key) in Outers" :key="key" class="item">
                <label>
                    следствием является
                    {{ ` ${edge.label}.` }}
                    <span :style="getMeanColor(edge)">{{ getMeaning(edge) }}</span>
                </label>
            </div>
        </div>
        <div>
            <button @click="onSave">Сохранить</button>
        </div>
    </div>
</template>
<script>
import { useGraph } from '../stores/graph'

    export default {
        setup() {
            const graph = useGraph();
            return {gr: graph};
        },
        data() {
            return {
                field: null
            }
        },
        beforeRouteUpdate(to, from, next){
            let nodeId = to.params.id;
            let node = this.gr.nodes.find(n => n.id == nodeId);
            this.field = node.meaning;
            console.log(nodeId);
            if (node.status === 'locked')
                next(false);
            else next();
        },
        computed: {
            thisNode() {
                return this.gr.nodes.find(n => n.id === this.$route.params.id);
            },
            Inners() {
                return this.gr.getInners(this.thisNode.id);
            },
            Outers() {
                return this.gr.getOuters(this.thisNode.id);
            },
        },
        methods: {
            getMeaning(elem) {
                let m = elem.meaning
                return m == null ?
                    '...' : m
            },
            getMeanColor(elem) {
                return elem.meaning == null ? '' : 'color: green';
            },
            onSave() {
                this.thisNode.meaning = this.field;
                this.$router.push('/' + this.thisNode.id + '/check');
                this.field = null;
            }
        }
    }
</script>
<style>
</style>