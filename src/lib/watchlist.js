import { useEffect, useState } from 'react'
import { db } from './firebase'
import { doc, onSnapshot, setDoc, collection, query, orderBy, deleteDoc, updateDoc } from "firebase/firestore"

export const  addToWatchlist= async (userId, anime, status = "Plan to Watch") => {
  const animeRef = doc(db, "users", userId, "watchlist", anime.id.toString());
  
  await setDoc(animeRef, {
    id: anime.id,
    title: anime.title.english || anime.title.romaji || anime.title.native,
    image: anime.bannerImage ,
    totalEpisodes: anime.episodes || 0,
    status: status,      
    progress: 0,        
    score: 0,          
    addedAt: new Date() 
  }, { merge: true });
}

export const updateAnimeProgress = async(userId, animeId, data) => {
  const animeRef = doc(db, "users", userId,"watchlist",animeId.toString())
  await updateDoc(animeRef, data)
}

export const deleteAnimeProgress = async(userId, animeId) => {
  const animeRef = doc(db, "users", userId,"watchlist",animeId.toString())
  await deleteDoc(animeRef)
}

export const useUserWatchlist = (userId) =>  {
  const [watchlistData, setwatchlistData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setwatchlistData([])
      setLoading(false)
      return;
    }
    setLoading(true);
    const watchlistRef = collection(db, "users", userId, "watchlist");
    const q = query(watchlistRef, orderBy("addedAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      setwatchlistData(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  return { watchlistData, loading };
}