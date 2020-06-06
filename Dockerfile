FROM node:12.5-alpine
# ENV NODE_ENV production (do not set to production to allow install devDeps for react build)
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
# RUN npm install --production --silent
#install devDep too
RUN npm install 
COPY . .
RUN npm run build
# EXPOSE 3000
# CMD npm start

# Install `serve` to run the application.(server neede to run the app !)
RUN npm install -g serve

# Set the command to start the node server.
CMD serve -l 3000 -s build

EXPOSE 3000