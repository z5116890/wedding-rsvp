FROM node:18

# Set the working directory
WORKDIR /app

# RUN ls -la /build

COPY ["build/*.zip", "/app"]

RUN echo "Contents of /app after COPY:" && ls -la /app

RUN ls -la /app

RUN unzip -qo wedding-rsvp-beef-*.zip

EXPOSE 3000

CMD ["sh", "-c", "ls -la / && ls -la /app && node /app/dist/src/app/main.js"]
