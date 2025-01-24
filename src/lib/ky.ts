import ky from "ky"

const kyInstance = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  parseJson: (text) =>
    JSON.parse(text, (key, value) => {
      if (key.endsWith("At")) return new Date(value)
      return value
    }),
})

export const kyInstancePublic = ky.create({
  parseJson: (text) =>
    JSON.parse(text, (key, value) => {
      if (key.endsWith("At")) return new Date(value)
      return value
    }),
})

export default kyInstance
