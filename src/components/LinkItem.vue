<template>
  <div class="flex mt2 items-star">
    <div class="flex items-center">
      <span class="gray">{{index + 1}}.</span>
      <div v-if="userId" class="ml1 gray f11 upvote" @click="voteForLink()">▲</div>
    </div>
    <div class="ml1">
      <a :href="link.url" class="link" target="_blank">{{link.description}} ({{link.url}})</a>
      <div
        class="f6 lh-copy grat"
      >{{link.votes.length}} votes | by {{link.postedBy ? link.postedBy.name: 'Unknown'}} {{timeDifferenceForDate(link.createdAt)}}</div>
    </div>
  </div>
</template>

<script>
import { timeDifferenceForDate } from '../utils';
import { CREATE_VOTE, ALL_LINKS } from '../constants/graphql';
import { GC_USER_ID } from '../constants/settings';

export default {
  name: 'LinkItem',
  props: ['link', 'index'],

  computed: {
    userId() {
      return this.$root.$data.userId;
    },
  },
  methods: {
    timeDifferenceForDate,
    voteForLink() {
      const userId = localStorage.getItem(GC_USER_ID);
      const voterIds = this.link.votes.map(vote => vote.user.id);
      if (voterIds.includes(userId)) {
        alert(`User (${userId}) already voted for this link`);
      } else {
        const linkId = this.link.id;
        this.$apollo.mutate({
          mutation: CREATE_VOTE,
          variables: { userId, linkId },
          update: (store, { data: { createVote } }) => {
            this.updateStoreAfterVote(store, createVote, linkId);
          },
        });
      }
    },
    updateStoreAfterVote(store, createVote, linkId) {
      const data = store.readQuery({
        query: ALL_LINKS,
      });
      const votedLink = data.allLinks.find(link => link.id === linkId);
      votedLink.votes = createVote.link.votes;
      store.writeQuery({ query: ALL_LINKS, data });
    },
  },
};
</script>

<style scoped>
.upvote {
  cursor: pointer;
}

.link {
  text-decoration: none;
  color: black;
}
</style>
