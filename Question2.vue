<template>
  <div>
    <b-form @change="myfunction">
      <b-form-group id="input-0" label="String" label-for="input-1">
        <b-form-input id="input-1" v-model="form.string" type="text" placeholder="Enter a string here" required></b-form-input>
        <div>
          <b-form-textarea id="textarea" v-model="form.string1" placeholder="" rows="3" max-rows="6"></b-form-textarea>

          <pre class="mt-3 mb-0">{{ text }}</pre>
        </div>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
  export default {
    name: "WatcH",
  };
  import Vue from "vue";
  new Vue({
    el: "#computed_props",
    data: {
      upperCased: 0,
      lowercased: 0,
    },
    watch: {
      methods: {
        myfunction: {
          upperCased: function () {
            let upper = [];
            this.form.input.split(" ").forEach((word) => {
              upper.push(word.toUpperCase());
            });
          },
          lowercased: function () {
            let lower1 = [];
            return lower1.join(this.form.string1);
          },
        },
      },
    },
  });
</script>
