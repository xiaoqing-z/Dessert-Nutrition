const typeDefs = `
    type Query {
      getNutritions:[Nutrition!]!
    }
    type Nutrition {
      id: ID!
      dessert: String!
      calories: Int!
      fat: Int!
      carbs: Int!
      protein: Int!
    }
    type Mutation{
      deleteNutrition(ids: [ID!]!): String!
      resetNutritions: String!
      addNutrition(
        dessert: String!
        calories: Int!
        fat: Int!
        carbs: Int!
        protein: Int!
      ): Nutrition!
    }
    type Subscription {
      nutrition: SubscriptionPayload!
    }
    
    type SubscriptionPayload {
      mutation: String!
      data: Nutrition!
    }
`;

module.exports = typeDefs;