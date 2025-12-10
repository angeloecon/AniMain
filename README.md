This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First is to initialized

```bash
npm i
```

Then for the database{xampp Sql}
Create a new file and configure it with your database

```bash
touch .env.local
```

Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Project Structure

📦src
 ┣ 📂app
 ┃ ┣ 📂anime-detail
 ┃ ┃ ┗ 📜page.js
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂jikan
 ┃ ┃ ┃ ┣ 📂anime-details
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┃ ┣ 📂search
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┃ ┣ 📂seasonal-anime
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┃ ┣ 📂seasonal-upcoming
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┃ ┗ 📂top-anime
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┣ 📂register
 ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┗ 📂watchlist
 ┃ ┃ ┃ ┣ 📂add
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┃ ┣ 📂delete
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┃ ┣ 📂update
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┃ ┗ 📂view
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┣ 📂browse
 ┃ ┃ ┗ 📂[type]
 ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂3dMarquee
 ┃ ┃ ┃ ┣ 📜3dMarquee.js
 ┃ ┃ ┃ ┗ 📜3dMarquee.module.css
 ┃ ┃ ┣ 📂Card
 ┃ ┃ ┃ ┣ 📂NormalCard
 ┃ ┃ ┃ ┃ ┗ 📜Cards.js
 ┃ ┃ ┃ ┗ 📂ParallaxCard
 ┃ ┃ ┃ ┃ ┣ 📜ParallaxCard.js
 ┃ ┃ ┃ ┃ ┗ 📜ParallaxCard.module.css
 ┃ ┃ ┣ 📂Carousel
 ┃ ┃ ┃ ┣ 📂HeroCarousel
 ┃ ┃ ┃ ┃ ┣ 📜Carousel.js
 ┃ ┃ ┃ ┃ ┗ 📜Carousel.module.css
 ┃ ┃ ┃ ┗ 📂SwiperCarousel
 ┃ ┃ ┃ ┃ ┗ 📜SwiperCard.js
 ┃ ┃ ┣ 📂Footer
 ┃ ┃ ┃ ┗ 📜Footer.js
 ┃ ┃ ┣ 📂LoadingAnim
 ┃ ┃ ┃ ┗ 📜loadingIndicator.js
 ┃ ┃ ┗ 📂NavBar
 ┃ ┃ ┃ ┗ 📜navbar.js
 ┃ ┣ 📂dashboard
 ┃ ┃ ┗ 📜page.js
 ┃ ┣ 📂fonts
 ┃ ┃ ┣ 📜animeace2_bld.otf
 ┃ ┃ ┣ 📜animeace2_ital.otf
 ┃ ┃ ┣ 📜animeace2_reg.otf
 ┃ ┃ ┣ 📜animeace2_reg.ttf
 ┃ ┃ ┗ 📜font info.txt
 ┃ ┣ 📂login
 ┃ ┃ ┗ 📜page.js
 ┃ ┣ 📂register
 ┃ ┃ ┗ 📜page.js
 ┃ ┣ 📂search
 ┃ ┃ ┗ 📜page.js
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.js
 ┃ ┣ 📜not-found.js
 ┃ ┗ 📜page.js
 ┣ 📂context
 ┃ ┗ 📜authcontext.js
 ┣ 📂hooks
 ┃ ┗ 📜useAnime.js
 ┗ 📂lib
 ┃ ┗ 📜db.js

# Anime Watchlist Manager

A web application for searching and managing your favorite animes.

## Description
This project is a anime watchlist application that allows users to search for movies using the Jikan API and save them to a personal watchlist that will save on the users database [Sql or firebase].


## Technologies Used
*   HTML5
*   CSS3
*   Tailwind
*   Node.js
*   bcryptjs
*   mysql12
*   swiper 
-- will do add later