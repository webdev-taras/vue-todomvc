import Vue from 'vue'

Vue.directive('focus', 
  function (el, { value }, { context }) {
    if (value) {
      context.$nextTick(() => {
        el.focus();
      });
    }
  }
)
