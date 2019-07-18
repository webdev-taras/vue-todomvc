import Vue from 'vue'

Vue.filter('pluralize', (n, w) => (n === 1 ? w : w + "s"))
