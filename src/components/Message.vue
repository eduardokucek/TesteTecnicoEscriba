<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Message',
  props: {
    msg: String,
    color: String
  }
}
</script>

<template>
  <p>{{ msg }}</p>
</template>
