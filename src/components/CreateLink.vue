<template>
  <div>
    <div class="flex flex-column mt3">
      <input type="text" class="mb2" placeholder="Description" v-model="description">
      <input class="mb2" type="text" v-model="url" placeholder="URL">
    </div>
    <button @click="createLink()">Submit</button>
  </div>
</template>

<script>
import { CREATE_LINK } from '../constants/graphql';

export default {
  name: 'CreateLink',
  data() {
    return {
      description: '',
      url: '',
    };
  },
  methods: {
    createLink() {
      const { description, url } = this.$data;
      this.$apollo.mutate({
        mutation: CREATE_LINK,
        variables: {
          description,
          url,
        },
      });
    },
  },
};
</script>

<style>
</style>
