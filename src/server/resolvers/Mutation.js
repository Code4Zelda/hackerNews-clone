const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils/index");

const signup = async (parent, args, context, info) => {
  const hashedPassword = await bcrypt.hash(args.password, 10);

  const { password, ...user } = await context.prisma.createUser({
    ...args,
    password: hashedPassword,
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

const login = async (parent, args, context, info) => {
  const { password, ...user } = await context.prisma.user({
    email: args.email,
  });
  if (!user) {
    return "No such user found";
  }

  const valid = await bcrypt.compare(args.password, password);
  if (!valid) {
    return "Invalid password";
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

const post = (args, context) => {
  console.log("arg", args);
  const userId = getUserId(context);
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } },
  });
};

const vote = async (args, context) => {
  const userId = getUserId(context);

  const voteExists = await context.prisma.$exists.vote({
    user: { id: userId },
    link: { id: args.linkId },
  });
  if (voteExists) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  return context.prisma.createVote({
    user: { connect: { id: userId } },
    link: { connect: { id: args.linkId } },
  });
};

module.exports = {
  signup,
  login,
  post,
  vote,
};
