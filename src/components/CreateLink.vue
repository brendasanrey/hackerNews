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
import { GC_USER_ID } from '../constants/settings';
import { CREATE_LINK, ALL_LINKS } from '../constants/graphql';

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
      const postedById = localStorage.getItem(GC_USER_ID);
      if (!postedById) {
        console.error('No user logged in');
        return;
      }

      const newDescription = this.description;
      const newUrl = this.url;
      this.description = '';
      this.url = '';
      this.$apollo
        .mutate({
          mutation: CREATE_LINK,
          variables: {
            description: newDescription,
            url: newUrl,
            postedById,
          },
          update: (store, { data: { createLink } }) => {
            const data = store.readQuery({
              query: ALL_LINKS,
            });
            data.allLinks.push(createLink);
            store.writeQuery({ query: ALL_LINKS, data });
          },
        })
        .then(() => {
          this.$router.push({ path: '/' });
        })
        .catch((error) => {
          console.error(error);
          this.newDescription = newDescription;
          this.newUrl = newUrl;
        });
    },
  },
};
</script>

<style>
</style>
