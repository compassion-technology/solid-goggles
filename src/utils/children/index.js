import data from './children.json'

export default {
  getChildren: async () => data,
  getRandomChild: async () => data[Math.floor(Math.random() * data.length)]
}
