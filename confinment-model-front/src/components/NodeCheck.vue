<template>
    <div>
    <CheckCard v-for="(connection, key) in Connections" :key="key"
        :number="key"
        :fmean="thisNode.label + '. '+ getMeaning(thisNode)"
        :smean="connection.label + '. ' + getMeaning(connection)"
        @checked="getValid"/>
    <button :disabled="Disabled"
    @click="toNextNode">Продолжить</button>
    </div>
</template>

<script>
import { useGraph } from '../stores/graph';
import CheckCard from './CheckCard.vue';
    export default {
        setup() {
            const graph = useGraph();
            return {graph: graph}
        },
        components: {
            CheckCard
        },
        data() {
            return {
                validation: []
            }
        },
        created() {
            if (this.validation.length != 0)
            this.Connections.forEach(() => {
                this.validation.push(false);
            })
        },
        computed: {
            thisNode() {
                return this.graph.nodes.find(n => n.id === this.$route.params.id);
            },
            Inners() {
                return this.graph.getInners(this.thisNode.id);
            },
            Outers() {
                return this.graph.getOuters(this.thisNode.id);
            },
            Connections() {
                let connections = []
                for (let i = 0; i < 3; i++) {
                    connections.push(this.Outers[i]);
                    connections.push(this.Inners[i]);
                }
                return connections;
            },
            Disabled() {
                let valid = true;
                this.validation.forEach((elem) => {
                    console.log(valid && elem);
                    valid = valid && elem;
                })
                return !valid;
            }
        },
        methods: {
            getMeaning(elem) {
                let m = elem.meaning
                return m == null ?
                    '...' : m
            },
            getValid(e) {
                this.validation[e.key] = e.valid;
            },
            toNextNode() {
                if (this.thisNode.status == 'active') {
                let node = this.graph.nodes.find(n => n.id === `node${(Number(this.thisNode.label)+1)}`);
                this.Inners.forEach(node => {
                    if (node.meaning != null) node.status = 'check';
                })
                this.Outers.forEach(node => {
                    if (node.meaning != null) node.status = 'check';
                })
                node.status = 'active';
                this.thisNode.status = "passed";
                this.$router.push(`/node${(Number(this.thisNode.label)+1)}`)
            }
            else if (this.thisNode.status == 'check') {
                let node = this.graph.nodes.find(n => n.status == 'active');
                this.thisNode.status = "passed";  
                this.$router.push('/' + node.id);
            }         
            }
        }
    }
</script>
<style>
</style>