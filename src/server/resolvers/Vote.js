const link = (parent, context) => {
  return context.prisma.vote({ id: parent.id }).link();
};

const user = (parent, context) => {
  return context.prisma.vote({ id: parent.id }).user();
};

module.exports = {
  link,
  user,
};
