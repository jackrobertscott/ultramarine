export default {
  type(variableName: string, value: any, type: string, optional?: boolean) {
    if (value !== undefined) {
      if (typeof value !== type) {
        throw new Error(
          `Expected "${variableName}" to be of type "${type}" but was given "${typeof value}".`,
        );
      }
    } else {
      if (!optional) {
        throw new Error(
          `Expected "${variableName}" to be provided but no value was given.`,
        );
      }
    }
  },
};
