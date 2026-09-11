export const bountySchema = {
  title: 'bounty schema',
  version: 0,
  description: 'describes an icebreaker bounty',
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 100 },
    title: { type: 'string' },
    description: { type: 'string' },
    reward: { type: 'number' },
    latitude: { type: 'number' },
    longitude: { type: 'number' },
    isActive: { type: 'boolean' },
  },
  required: ['id', 'title', 'reward']
} as const;
