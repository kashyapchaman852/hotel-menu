import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

// --- Custom SVGs (No dependencies) ---
const Icons = {
  Leaf: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.2-1.2 6.8-9 8.8-9 8.8Z"/><path d="M11 20c-1.5-5-2-7-6-10-3-2.5-3-2.5 0-1 .3.1.5.2.7.3"/><path d="M19 2c-3 3-5 5-9 9-4 4-5 6-7 8"/></svg>,
  Search: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Youtube: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17Z"/><path d="m10 15 5-3-5-3z"/></svg>,
  Book: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  Loader: () => <svg className="animate-spin" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4m4.2 1.8 2.9-2.9M18 12h4m-5.8 4.2 2.9 2.9M12 18v4m-7.1-2.9 2.9-2.9M2 12h4m2.9-7.1 2.9 2.9"/></svg>
};

const NON_VEG_KEYWORDS = ["chicken", "beef", "pork", "lamb", "mutton", "fish", "salmon", "tuna", "prawn", "shrimp", "crab", "lobster", "bacon", "sausage", "meat", "duck"];

export default function VegApp() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const isVegetarian = (meal) => {
    const name = meal.strMeal?.toLowerCase() || "";
    if (NON_VEG_KEYWORDS.some(k => name.includes(k))) return false;
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      if (ing && NON_VEG_KEYWORDS.some(k => ing.toLowerCase().includes(k))) return false;
    }
    return true;
  };

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await axios.get("https://api.freeapi.app/api/v1/public/meals");
        const allVegData = res.data.data.data.filter(isVegetarian);
        setMeals(allVegData);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  const displayedMeals = useMemo(() => {
    return meals.filter(m => m.strMeal.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [meals, searchQuery]);

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#fdfdfb] text-emerald-600">
      <Icons.Loader /><p className="mt-4 font-bold text-stone-400 uppercase tracking-[0.3em] text-[10px]">Loading Fresh Meals</p>
    </div>
  );

  return (
    <div className="bg-[#fdfdfb] min-h-screen pb-20 font-sans text-stone-800">
      <header className="bg-emerald-950 pt-24 pb-32 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#10b98110,_transparent)]" />
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center gap-2 mb-6 items-center text-emerald-500 font-black uppercase tracking-[.4em] text-[10px]">
          <Icons.Leaf /> Healthy & Vegetarian
        </motion.div>
        
        <h1 className="text-6xl md:text-8xl font-black text-white mb-12 tracking-tighter">
          Green<span className="text-emerald-500 italic font-serif">Plate</span>
        </h1>

        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-0 bg-emerald-500/10 blur-2xl rounded-3xl" />
          <div className="relative flex items-center bg-white rounded-2xl shadow-2xl p-1">
            <div className="pl-5 text-stone-300"><Icons.Search /></div>
            <input 
              type="text" placeholder="Search across all recipes..." 
              className="w-full py-4 px-4 outline-none text-lg bg-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-16">
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          <AnimatePresence mode='popLayout'>
            {displayedMeals.map((meal) => (
              <motion.div
                key={meal.idMeal}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-white rounded-[2.5rem] border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3 block">
                    {meal.strCategory}
                  </span>
                  <h3 className="text-xl font-bold mb-8 leading-tight min-h-[3.5rem] group-hover:text-emerald-700">
                    {meal.strMeal}
                  </h3>
                  
                  <div className="mt-auto flex gap-3">
                    {meal.strYoutube && (
                      <a href={meal.strYoutube} target="_blank" rel="noreferrer" className="flex-1 py-3 bg-stone-900 text-white rounded-xl flex justify-center items-center gap-2 hover:bg-emerald-600 transition-all text-[10px] font-bold uppercase tracking-widest">
                        <Icons.Youtube /> Video
                      </a>
                    )}
                    {meal.strSource && (
                      <a href={meal.strSource} target="_blank" rel="noreferrer" className="flex-1 py-3 border border-stone-200 text-stone-600 rounded-xl flex justify-center items-center gap-2 hover:bg-stone-50 transition-all text-[10px] font-bold uppercase tracking-widest">
                        <Icons.Book /> Recipe
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {displayedMeals.length === 0 && (
          <div className="text-center py-40 text-stone-300 font-bold uppercase tracking-[.4em] text-sm">
            No recipes found
          </div>
        )}
      </main>
    </div>
  );
}