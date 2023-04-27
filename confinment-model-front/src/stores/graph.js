import { defineStore } from 'pinia'

export const useGraph = defineStore('graph', {
    state: () => {
        return {
        nodes: [
            { id: 'node1', label: '1', x: 200, y: 250, status: 'active', meaning: null},
            { id: 'node2', label: '2', x: 240, y: 180, status: 'locked', meaning: null },
            { id: 'node3', label: '3', x: 290, y: 280, status: 'locked', meaning: null},
            { id: 'node4', label: '4', x: 200, y: 360, status: 'locked', meaning: null },
            { id: 'node5', label: '5', x: 330, y: 140, status: 'locked', meaning: null },
            { id: 'node6', label: '6', x: 200, y: 60, status: 'locked', meaning: null },
            { id: 'node7', label: '7', x: 160, y: 180, status: 'locked', meaning: null },
            { id: 'node8', label: '8', x: 50, y: 140, status: 'locked', meaning: null },
            { id: 'node9', label: '9', x: 120, y: 290, status: 'locked', meaning: null}
          ],
          links: [
            { source: "node1", target: 'node4', bend: false, status: null, revStat: null },
            { source: 'node1', target: 'node7', bend: false, status: null, revStat: null },
            { source: 'node1', target: 'node9', bend: false, status: null, revStat: null },
            { source: 'node2', target: 'node1', bend: false, status: null, revStat: null },
            { source: 'node2', target: 'node3', bend: false, status: null, revStat: null },
            { source: 'node2', target: 'node5', bend: false,status: null, revStat: null },
            { source: 'node3', target: 'node1', bend: false, status: null, revStat: null },
            { source: 'node3', target: 'node4', bend: false, status: null, revStat: null },
            { source: 'node3', target: 'node9', bend: false, status: null, revStat: null },
            { source: 'node4', target: 'node1', bend: false, status: null, revStat: null },
            { source: 'node4', target: 'node8', bend: true, status: null, revStat: null },
            { source: 'node4', target: 'node9', bend: false, status: null, revStat: null },
            { source: 'node5', target: 'node4', bend: true, status: null, revStat: null },
            { source: 'node5', target: 'node2', bend: false, status: null, revStat: null },
            { source: 'node5', target: 'node3', bend: false, status: null, revStat: null },
            { source: 'node6', target: 'node2', bend: false, status: null, revStat: null },
            { source: 'node6', target: 'node3', bend: true, status: null, revStat: null },
            { source: 'node6', target: 'node5', bend: false, status: null, revStat: null },
            { source: 'node7', target: 'node2', bend: false, status: null, revStat: null },
            { source: 'node7', target: 'node6', bend: false, status: null, revStat: null },
            { source: 'node7', target: 'node8', bend: false, status: null, revStat: null },
            { source: 'node8', target: 'node7', bend: false, status: null, revStat: null },
            { source: 'node8', target: 'node6', bend: false, status: null, revStat: null },
            { source: 'node8', target: 'node5', bend: true, status: null, revStat: null },
            { source: 'node9', target: 'node7', bend: false, status: null, revStat: null },
            { source: 'node9', target: 'node6', bend: true, status: null, revStat: null },
            { source: 'node9', target: 'node8', bend: false, status: null, revStat: null }
          ]
        }

    },
    getters: {
        getNodeColor: (state) => {
            return (id) => {
                let color = '';
                let node = state.nodes.find(n => n.id === id);
                switch(node.status) {
                    case 'locked': color = '#d1c0c0'; break;
                    case 'active': color = '#f4f734'; break;
                    case 'passed': color = '#39bf5f'; break;
                    case 'check' : color = '#39bf5f'; break;
                }
                return color;
            }
        },
        getInners: (state) => {
            return (id) => {
                let inners = [];
                state.links.forEach( (elem) =>{
                    if (elem.target === id)
                        inners.push(state.nodes.find(node => node.id === elem.source));
                })
                return inners;
            }
        },
        getOuters: (state) => {
            return (id) => {
                let inners = [];
                state.links.forEach( (elem) =>{
                    if (elem.source === id)
                        inners.push(state.nodes.find(node => node.id === elem.target));
                })
                return inners;
            }
        }
    }
})