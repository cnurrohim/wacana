export const Schema = {
  startingDate: {
    type: "string",
    empty: false,
  },
  endingDate: {
    type: "string",
    optional: true,
  },
  startingTime: {
    type: "string",
    empty: false,
  },
  endingTime: {
    type: "string",
    optional: true,
  },
  colorMood: {
    type: "string",
    empty: false,
  },
  title: {
    type: "string",
    empty: false,
  },
  description: {
    type: "string",
    optional: true,
  },
  image: {
    type: "string",
    optional: true,
  },
}
