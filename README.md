# Anime Watchlist Manager with API (Jikan)

Your ultimate hub for anime tracking. This application seamlessly integrates with the Jikan API to provide up-to-date information on thousands of anime series and movies. Features include a dynamic discovery dashboard, secure user authentication, and a persistent watchlist that allows users to track their viewing progress across devices.

## ⚙️ Getting Started
1. Clone the Repo

```
git clone https://github.com/angeloecon/anime-watchlist-manager.git
```

2. Install Node Modules

```bash
npm i
```

3. Then for the database{xampp Sql}
   
   Create Database Named: anime-watchlist-sql
   Create Table: anime(anime_id, anime_title), user_info(account_id [PK, AI], account_email, password_hash[char]), user_watchlist(tracking_id [PK, AI], user_id[FK], anime_id[FK], status[enum])

4. Create a new file, configure and connect it with your database

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚀 Features
* **Protected Routes:** The Dashboard page logic (src/app/dashboard/page.js) checks if a user is logged in via AuthContext and redirects to the login page if not.

* **Logout Functionality:** The AuthContext provides a logout function that clears the state and removes the data from localStorage, effectively logging the user out.

* **Local Storage Persistence:** The conversation detailed implementing logic in AuthContext.js to save the user session to localStorage so the user stays logged in even after refreshing the page.

* **User Registration:** src/app/api/register/route.js handles creating new user accounts. It accepts a name, email, and password.

* **Password Hashing:** The conversation mentions using bcryptjs for secure password hashing before storing them in the database.

* **User Login:** src/app/api/login/route.js (the selected file) handles verifying credentials. It receives an email and password, checks against the database, and likely returns a success response if valid.

* **Global Auth State:** src/context/AuthContext.js manages the user's login state across the entire application using React Context. This allows components like the Navbar to update dynamically (showing "Login" vs "Logout").

## 📂 Project Structure
```
📦src
 ┣ 📂app                         # Next Js App
 ┃ ┣ 📂anime-detail              # Details Page
 ┃ ┃ ┗ 📜page.js 
 ┃ ┣ 📂api                       #api endpoints 
 ┃ ┃ ┣ 📂jikan                   # Jikan API endpoint
 ┃ ┃ ┃ ┣ 📂anime-details         # Anime Details route
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┃ ┣ 📂search                # Search Route
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┃ ┣ 📂seasonal-anime        # Top Seasonal Animes
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┃ ┣ 📂seasonal-upcoming     # Upcoming Seasonal Animes
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┃ ┗ 📂top-anime             # Top Animes
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┣ 📂login                   # Log in Database endpoint
 ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┣ 📂register                # Register Database endpoint
 ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┗ 📂watchlist               # User WatchList endpoint
 ┃ ┃ ┃ ┣ 📂add
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┃ ┣ 📂delete
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┃ ┣ 📂update
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┃ ┃ ┗ 📂view
 ┃ ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┣ 📂browse                    # Browse Dyanmic Page
 ┃ ┃ ┗ 📂[type]
 ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┣ 📂components                # Reusable Components
 ┃ ┃ ┣ 📂3dMarquee
 ┃ ┃ ┃ ┣ 📜3dMarquee.js
 ┃ ┃ ┃ ┗ 📜3dMarquee.module.css
 ┃ ┃ ┣ 📂Card                    # Cards Components
 ┃ ┃ ┃ ┣ 📂NormalCard
 ┃ ┃ ┃ ┃ ┗ 📜Cards.js
 ┃ ┃ ┃ ┗ 📂ParallaxCard
 ┃ ┃ ┃ ┃ ┣ 📜ParallaxCard.js
 ┃ ┃ ┃ ┃ ┗ 📜ParallaxCard.module.css
 ┃ ┃ ┣ 📂Carousel               # Carousel Components
 ┃ ┃ ┃ ┣ 📂HeroCarousel         # Hero Carousel Component
 ┃ ┃ ┃ ┃ ┣ 📜Carousel.js
 ┃ ┃ ┃ ┃ ┗ 📜Carousel.module.css
 ┃ ┃ ┃ ┗ 📂SwiperCarousel       # Small Swiper Component
 ┃ ┃ ┃ ┃ ┗ 📜SwiperCard.js
 ┃ ┃ ┣ 📂Footer                 # Footer Component
 ┃ ┃ ┃ ┗ 📜Footer.js
 ┃ ┃ ┣ 📂LoadingAnim            # Loading Animation
 ┃ ┃ ┃ ┗ 📜loadingIndicator.js
 ┃ ┃ ┗ 📂NavBar                 # Navigation Bar
 ┃ ┃ ┃ ┗ 📜navbar.js
 ┃ ┣ 📂dashboard                # User Watchlist Page
 ┃ ┃ ┗ 📜page.js
 ┃ ┣ 📂fonts                    # Custom font files
 ┃ ┃ ┣ 📜animeace2_bld.otf
 ┃ ┃ ┣ 📜animeace2_ital.otf
 ┃ ┃ ┣ 📜animeace2_reg.otf
 ┃ ┃ ┣ 📜animeace2_reg.ttf
 ┃ ┃ ┗ 📜font info.txt
 ┃ ┣ 📂login                    # Log In Page
 ┃ ┃ ┗ 📜page.js
 ┃ ┣ 📂register                 # Regiostration Page
 ┃ ┃ ┗ 📜page.js
 ┃ ┣ 📂search                   # Search Handler
 ┃ ┃ ┗ 📜page.js
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜globals.css              # Root CSS file
 ┃ ┣ 📜layout.js                # Root Layout
 ┃ ┣ 📜not-found.js             # 404 Page 
 ┃ ┗ 📜page.js                  # Main Page
 ┣ 📂context                    # AuthContext Provider
 ┃ ┗ 📜authcontext.js           # Manages user authentication state.
 ┣ 📂hooks                      # Custom Hooks
 ┃ ┗ 📜useAnime.js
 ┗ 📂lib                        # Database connection
 ┃ ┗ 📜db.js                    # Database connection configuration (MySQL).
```

## 🛠️ Technologies
*   **Frontend Framework:** Next.js (App Router)
*   **Language:** JavaScript (ES6+) / React
*   **Styling:** Tailwind CSS / CSS 3
*   **Database:** MySQL (via XAMPP)
*   **Backend Logic:** Next.js API Routes (Serverless Functions)
*   **Authentication:** Custom implementation with bcryptjs (hashing) & Context API
*   **Data Fetching:** Native fetch API with custom hooks
*   **External API:** Jikan API (Unofficial MyAnimeList API)
*   **UI Components:** Swiper.js (for carousels)
*   **Video Player:** React-Player