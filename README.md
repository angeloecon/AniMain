# Anime Watchlist Manager with API (Anilist GQL)

Your ultimate hub for anime tracking. This application seamlessly integrates with the Anilist API to provide up-to-date information on thousands of anime series and movies. Features include a dynamic discovery dashboard, secure user authentication, and a persistent watchlist that allows users to track their viewing progress across devices.

## 🚀 Highlights

* Authentication & Security using Firebase
* Real-time synchronization of user watchlists (Watching, Plan to Watch, Completed, Dropped) via Firestore.
* SEO & Optimization
* Responsive Web Design 
* Dynamic Page Routing
* Live Chart for Watchlist


## 🛠 Tech Stack   

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router), React
* **Database & Auth:** [Firebase](https://firebase.google.com/). (Firestore, Auth)
* **Data Fetching:** [Anilist](https://github.com/AniList/docs). (Anilist API),[Apollo Client](https://www.apollographql.com/blog/next-js-getting-started), Native Fetch
* **Styling:** [Tailwind](https://tailwindcss.com/) CSS
* **Deployment:** [Vercel](https://vercel.com/)
* **Video Player:** [React-Player](https://www.npmjs.com/package/react-player)
* **UI Components:** [Swiper.js](http://swiperjs.com/) (for carousels)
* **Graph:** [Recharts](https://www.npmjs.com/package/recharts)
* **Animation:** [Lottie Animation](https://lottiefiles.com/)

## 📸 Screenshots

### Home
![Dashboard View](./assets/Home.png)

### Dashboard
![Dashboard View](./assets/DashboardScreenshot.png)



## ⚙️ Getting Started
1. Clone the Repo

```
git clone https://github.com/angeloecon/anime-watchlist-manager.git
```

2. Install Node Modules

```bash
npm i
```


3. Then for the Database and Auth:

   FirebaseAuth and Firebase firestore

4. Create a new file, and put the necessary values 

```bash
touch .env.local
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open your localhost [http://localhost:3000](http://localhost:3000) with your browser to see the result.
