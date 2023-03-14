export default {
  type: "object",
  properties: {
    id:{type:'string'},
    user_id: { type: 'string' },
    title: { type: 'string' },
    done: { type: 'boolean' },
    deadline: { type: 'date' },
  },
  // required:['user_id']
} as const;
