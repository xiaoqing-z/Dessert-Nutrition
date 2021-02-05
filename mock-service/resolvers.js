const { v4: uuid } = require('uuid');
const initialList = require('./data/nutrition-list.json');
let nutritions = initialList.slice();

const resolvers = {
  Query: {
    getNutritions() {
      return nutritions;
    },
  },

  Mutation: {
    resetNutritions(parent, args, { pubsub }) {
      nutritions = initialList.slice();;

      return 'RESETED!';
    },

    deleteNutrition(parent, args, { pubsub }) {
      console.log(args)
      const ids = args.ids;
      ids.forEach((id) => {
        let pos = nutritions.findIndex((item) => item.id === +id);
        nutritions.splice(pos, 1);
      })

      pubsub.publish('nutrition', {
        nutrition: {
          mutation: 'DELETED',
          data: nutritions[0]
        }
      })

      return 'FINISHED';
    },

    addNutrition(parent, args, { pubsub }) {
      const id = uuid();
      nutritions.push({ ...args, id });

      pubsub.publish('nutrition', {
        nutrition: {
          mutation: 'ADDED',
          data: { ...args, id }
        }
      })

      return { ...args, id }
    }
  },

  Subscription: {
    nutrition: {
      subscribe(parent, args, { pubsub }) {
        return pubsub.asyncIterator('nutrition');
      }
    },
  },
}

module.exports = resolvers;