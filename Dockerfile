FROM node:lts AS base
WORKDIR /app
# Install pnpm
RUN npm install -g pnpm
# By copying only the package.json and package-lock.json here, we ensure that the following `-deps` steps are independent of the source code.
# Therefore, the `-deps` steps will be skipped if only the source code changes.
COPY package.json pnpm-lock.yaml ./
FROM base AS prod-deps
RUN pnpm install --production
FROM base AS build-deps
RUN pnpm install --production=false
FROM build-deps AS build
COPY . .
ENV MONGODB_URI=mongodb://host.docker.internal:27017
RUN pnpm run build
FROM base AS runtime
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

CMD node ./dist/server/entry.mjs