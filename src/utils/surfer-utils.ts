

export const printObject = (object: any, objectName?: string) => {
  console.log(`-----${objectName?.toUpperCase() || "Object"}-----`)
  Object.keys(object).forEach(key => {
    console.log(`${key}: ${object[key]}`)
  })
}