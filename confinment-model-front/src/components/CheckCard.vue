<template>
    <div class="item" :style="getBackColor">
        <label>Проверка №{{ number+1 }}</label>
        <div class="dropdown">
            <div>
            <button v-if="isValid == false" class="btn">Изменить</button>
                <div class="dropdown-content">
                    <RouterLink :to="'/node' + fmean[0]">{{ fmean }}</RouterLink>
                    <RouterLink :to="'/node' + smean[0]">{{ smean }}</RouterLink>
                </div>
            </div>
        </div>
        <div>
        <label><span>{{ fmean }} </span>
            {{ (number+1) % 2 ? 'влияет на' : 'зависит от' }}
            <span>{{ smean }}</span>?</label>
        </div>
        <div>
            <button @click="Accept"
            :disabled="!isActiveField" >Да</button>
            <button @click="Decline"
            :disabled="!isActiveField">Нет</button>
        </div>
    </div>
</template>

<script>
import { useGraph } from '../stores/graph';

    export default {
        props: ['number', 'fmean', 'smean'],
        setup() {
            const graph = useGraph();
            return{graph: graph}
        },
        data() {
            return {
                isValid: null,
            }
        },
        mounted() {
            console.log('mounted');
            this.isValid = this.Reverse ? this.getLink.revStat : this.getLink.status
            console.log(!this.isActiveField || (this.isValid ==null ? false : this.isValid));
            this.$emit('checked', {
                key: this.number,
                valid: !this.isActiveField || (this.isValid ==null ? false : this.isValid)
            })
        },
        computed: {
            getBackColor() {
                let color;
                if (this.isValid === null) 
                    if (this.isActiveField) {
                        color = "#4f4f4f"
                    } else color = '#737373'
                else if (this.isValid) {
                    color = '#0f662b'
                } else color = '#bd0000'
                
                return "background-color:"+color;
            },
            isActiveField() {
                return this.smean.slice(-3) != '...';
            },
            getLink() {
                let link = this.graph.links.find(l => 
                (l.source == 'node'+this.fmean[0] &&
                l.target == 'node'+this.smean[0])&&(!this.Reverse) ||
                (l.target == 'node'+this.fmean[0] &&
                l.source == 'node'+this.smean[0])&&(this.Reverse))

                return link;
            },
            Reverse() {
                return this.number % 2;
            }
        },
        methods: {
            Accept() {
                this.isValid = true;
                if (this.Reverse)
                    this.getLink.revStat = true;
                else this.getLink.status = true;
                this.$emit('checked', {
                key: this.number,
                valid: this.isValid
            })
            },
            Decline() {
                this.isValid = false;
                if (this.Reverse)
                    this.getLink.revStat = false;
                else this.getLink.status = false;
                this.$emit('checked', {
                key: this.number,
                valid: this.isValid
            })
            }
        }
    }
</script>

<style scoped>
    div.item {
        max-height: 100px;
        min-height: 100px;
        margin-left: 10%;
        margin-right: 10%;
        margin-bottom: 20px;
        border: 2px solid;
        border-color: rgb(94, 94, 252);
    }
    label {
        color: #ccc
    }
    span {
        color: rgb(96, 172, 239)
    }
    .btn {
        background-color: #e91b0c;
        color: white;
        padding: 4px;
        font-size: 16px;
        border: none;
        outline: none;
    }
    .dropdown {
        position: absolute;
        display: inline-block;
    }
.dropdown-content {
    opacity: 0;
  display: none;
  position: absolute;
  background-color: #873535;
  min-width: 300px;
  z-index: 1;
  transition: 0.5s;
}

.dropdown-content a {
  color: #fff;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #e10707}

.dropdown:hover .dropdown-content {
    opacity: 1;
  display: block;
}

</style>