FROM node:18

# Set the working directory
WORKDIR /app

# RUN ls -la /build

COPY ["build/stage/", "/app"]

# RUN unzip -qo wedding-rsvp-beef-*.zip

EXPOSE 3000

CMD ["sh", "-c", "ls -la /app && node /app/src/app/main.js"]
