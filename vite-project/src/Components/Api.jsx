// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function Api() {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchMeals = async () => {
//             try {
//                 setLoading(true);
//                 const url = 'https://api.freeapi.app/api/v1/public/meals';
//                 const response = await axios.get(url);
//                 setData(response.data.data.data);
//                 setError(null);
//             } catch (err) {
//                 setError(err.message);
//                 console.error(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMeals();
//     }, []);

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//                 <div className="text-center">
//                 <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
//                     <p className="mt-4 text-gray-600 text-lg">Loading delicious meals...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//                 <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
//                     <div className="text-red-500 text-6xl mb-4">⚠️</div>
//                     <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Meals</h2>
//                     <p className="text-gray-600">{error}</p>
//                     <button 
//                         onClick={() => window.location.reload()} 
//                         className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//                     >
//                         Try Again
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-100">
//             {/* Header */}
//             <header className="bg-gradient-to-r from-orange-500 to-red-500 shadow-lg sticky top-0 z-10">
//                 <div className="container mx-auto px-4 py-6">
//                     <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
//                         🍽️ Delicious Meals Collection
//                     </h1>
//                     <p className="text-white text-center mt-2 opacity-90">
//                         Discover amazing recipes from around the world
//                     </p>
//                 </div>
//             </header>

//             {/* Main Content */}
//             <main className="container mx-auto px-4 py-8">
//                 <div className="mb-6 flex justify-between items-center">
//                     <h2 className="text-2xl font-semibold text-gray-800">
//                         All Meals ({data.length})
//                     </h2>
//                     <div className="text-sm text-gray-500">
//                         Explore our curated collection
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {data.map((meal, index) => {
//                         // Collect non-null ingredients and measures
//                         const ingredients = [];
//                         for (let i = 1; i <= 20; i++) {
//                             const ingredient = meal[`strIngredient${i}`];
//                             const measure = meal[`strMeasure${i}`];
//                             if (ingredient && ingredient.trim()) {
//                                 ingredients.push({
//                                     ingredient: ingredient,
//                                     measure: measure || 'To taste'
//                                 });
//                             }
//                         }

//                         return (
//                             <div key={meal.id || index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
//                                 {/* Meal Image */}
//                                 {meal.strMealThumb && (
//                                     <div className="relative h-48 overflow-hidden">
//                                         <img 
//                                             src={meal.strMealThumb} 
//                                             alt={meal.strMeal}
//                                             className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
//                                         />
//                                         <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
//                                             {meal.strArea || 'International'}
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* Meal Info */}
//                                 <div className="p-5">
//                                     <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
//                                         {meal.strMeal}
//                                     </h3>
                                    
//                                     <div className="flex flex-wrap gap-2 mb-3">
//                                         {meal.strCategory && (
//                                             <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
//                                                 {meal.strCategory}
//                                             </span>
//                                         )}
//                                         {meal.strTags && (
//                                             <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
//                                                 {meal.strTags.split(',')[0]}
//                                             </span>
//                                         )}
//                                     </div>

//                                     {/* Ingredients Section */}
//                                     <div className="mb-4">
//                                         <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
//                                             <span className="mr-1">🥘</span> Ingredients
//                                         </h4>
//                                         <div className="space-y-1 max-h-32 overflow-y-auto">
//                                             {ingredients.slice(0, 5).map((item, idx) => (
//                                                 <div key={idx} className="text-sm text-gray-600 flex justify-between">
//                                                     <span>{item.ingredient}</span>
//                                                     <span className="text-gray-500">{item.measure}</span>
//                                                 </div>
//                                             ))}
//                                             {ingredients.length > 5 && (
//                                                 <p className="text-xs text-gray-400 italic">
//                                                     +{ingredients.length - 5} more ingredients
//                                                 </p>
//                                             )}
//                                         </div>
//                                     </div>

//                                     {/* Action Buttons */}
//                                     <div className="flex gap-3 mt-4">
//                                         {meal.strYoutube && (
//                                             <a 
//                                                 href={meal.strYoutube}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 className="flex-1 bg-red-500 text-white text-center px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
//                                             >
//                                                 🎥 Watch Tutorial
//                                             </a>
//                                         )}
//                                         {meal.strSource && (
//                                             <a 
//                                                 href={meal.strSource}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 className="flex-1 bg-blue-500 text-white text-center px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
//                                             >
//                                                 📖 Full Recipe
//                                             </a>
//                                         )}
//                                     </div>

//                                     {/* Expandable Details */}
//                                     <details className="mt-3">
//                                         <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
//                                             Show all ingredients ({ingredients.length})
//                                         </summary>
//                                         <div className="mt-2 space-y-1 max-h-48 overflow-y-auto">
//                                             {ingredients.map((item, idx) => (
//                                                 <div key={idx} className="text-xs text-gray-600 flex justify-between py-1 border-b border-gray-100">
//                                                     <span className="font-medium">{item.ingredient}</span>
//                                                     <span className="text-gray-500">{item.measure}</span>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </details>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </main>

//             {/* Footer */}
//             <footer className="bg-gray-800 text-white mt-12 py-6">
//                 <div className="container mx-auto px-4 text-center">
//                     <p className="text-sm opacity-75">
//                         © 2024 Meals Collection | Powered by FreeAPI
//                     </p>
//                     <p className="text-xs opacity-50 mt-1">
//                         Discover amazing recipes from around the world
//                     </p>
//                 </div>
//             </footer>
//         </div>
//     );
// }import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Api() {
    const [data, setData] useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // List of non-veg keywords to filter out
    const nonVegKeywords = [
        'chicken', 'beef', 'pork', 'lamb', 'mutton', 'fish', 'salmon', 'tuna',
        'prawn', 'shrimp', 'crab', 'lobster', 'bacon', 'sausage', 'meat',
        'duck', 'turkey', 'veal', 'goat', 'ham', 'steak', 'ribs', 'anchovy',
        'mackerel', 'sardine', 'octopus', 'squid', 'clam', 'mussel', 'oyster',
        'scallop', 'lobster', 'crayfish', 'eel', 'halibut', 'trout', 'cod'
    ];

    // Function to check if a meal is vegetarian
    const isVegetarian = (meal) => {
        // Check meal name
        const mealName = meal.strMeal?.toLowerCase() || '';
        if (nonVegKeywords.some(keyword => mealName.includes(keyword))) {
            return false;
        }

        // Check ingredients
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            if (ingredient && ingredient.trim()) {
                const ingredientLower = ingredient.toLowerCase();
                if (nonVegKeywords.some(keyword => ingredientLower.includes(keyword))) {
                    return false;
                }
            }
        }

        return true;
    };

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                setLoading(true);
                const url = 'https://api.freeapi.app/api/v1/public/meals';
                const response = await axios.get(url);
                const allMeals = response.data.data.data;
                // Filter only vegetarian meals
                const vegetarianMeals = allMeals.filter(isVegetarian);
                setData(vegetarianMeals);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600 text-lg">Loading delicious vegetarian meals...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Meals</h2>
                    <p className="text-gray-600">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
                    <div className="text-green-500 text-6xl mb-4">🌱</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No Vegetarian Meals Found</h2>
                    <p className="text-gray-600">Try again later for more vegetarian options!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg sticky top-0 z-10">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
                        🌱 Vegetarian Meals Collection
                    </h1>
                    <p className="text-white text-center mt-2 opacity-90">
                        Discover amazing plant-based recipes from around the world
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Vegetarian Meals ({data.length})
                    </h2>
                    <div className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
                        🌿 100% Plant-Based
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((meal, index) => {
                        // Collect non-null ingredients and measures
                        const ingredients = [];
                        for (let i = 1; i <= 20; i++) {
                            const ingredient = meal[`strIngredient${i}`];
                            const measure = meal[`strMeasure${i}`];
                            if (ingredient && ingredient.trim()) {
                                ingredients.push({
                                    ingredient: ingredient,
                                    measure: measure || 'To taste'
                                });
                            }
                        }

                        return (
                            <div key={meal.id || index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                                {/* Meal Image */}
                                {meal.strMealThumb && (
                                    <div className="relative h-48 overflow-hidden">
                                        <img 
                                            src={meal.strMealThumb} 
                                            alt={meal.strMeal}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute top-2 right-2 bg-green-600 bg-opacity-90 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                                            <span>🌿</span> Veg
                                        </div>
                                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                                            {meal.strArea || 'International'}
                                        </div>
                                    </div>
                                )}

                                {/* Meal Info */}
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                                        {meal.strMeal}
                                    </h3>
                                    
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {meal.strCategory && (
                                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                                                {meal.strCategory}
                                            </span>
                                        )}
                                        {meal.strTags && (
                                            <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full">
                                                {meal.strTags.split(',')[0]}
                                            </span>
                                        )}
                                    </div>

                                    {/* Ingredients Section */}
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                                            <span className="mr-1">🥬</span> Vegetarian Ingredients
                                        </h4>
                                        <div className="space-y-1 max-h-32 overflow-y-auto">
                                            {ingredients.slice(0, 5).map((item, idx) => (
                                                <div key={idx} className="text-sm text-gray-600 flex justify-between">
                                                    <span>{item.ingredient}</span>
                                                    <span className="text-gray-500">{item.measure}</span>
                                                </div>
                                            ))}
                                            {ingredients.length > 5 && (
                                                <p className="text-xs text-gray-400 italic">
                                                    +{ingredients.length - 5} more ingredients
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 mt-4">
                                        {meal.strYoutube && (
                                            <a 
                                                href={meal.strYoutube}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 bg-red-500 text-white text-center px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                                            >
                                                🎥 Watch Tutorial
                                            </a>
                                        )}
                                        {meal.strSource && (
                                            <a 
                                                href={meal.strSource}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 bg-blue-500 text-white text-center px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                                            >
                                                📖 Full Recipe
                                            </a>
                                        )}
                                    </div>

                                    {/* Expandable Details */}
                                    <details className="mt-3">
                                        <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                                            Show all ingredients ({ingredients.length})
                                        </summary>
                                        <div className="mt-2 space-y-1 max-h-48 overflow-y-auto">
                                            {ingredients.map((item, idx) => (
                                                <div key={idx} className="text-xs text-gray-600 flex justify-between py-1 border-b border-gray-100">
                                                    <span className="font-medium">{item.ingredient}</span>
                                                    <span className="text-gray-500">{item.measure}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </details>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white mt-12 py-6">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm opacity-75">
                        🌱 © 2024 Vegetarian Meals Collection | Powered by FreeAPI
                    </p>
                    <p className="text-xs opacity-50 mt-1">
                        Discover delicious plant-based recipes from around the world
                    </p>
                </div>
            </footer>
        </div>
    );
}