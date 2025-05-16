
import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Category } from "@/types";
import { events } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import EventFilter from "@/components/EventFilter";

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("Tous");

  // Liste des catégories disponibles
  const categories: Category[] = ["Tous", "Conférence", "Concert", "Exposition", "Atelier", "Sport", "Autre"];

  // Filtrer les événements en fonction de la recherche et de la catégorie
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "Tous" || event.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <>
      <Helmet>
        <title>Événements | EventsManager</title>
      </Helmet>

      <Navbar />
      
      <main className="container py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Nos Événements</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez les événements à venir et trouvez celui qui vous correspond.
            Utilisez les filtres pour affiner votre recherche.
          </p>
        </div>

        <EventFilter
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          categories={categories}
          selectedCategory={selectedCategory}
        />

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-2">Aucun événement trouvé</h2>
            <p className="text-muted-foreground">
              Essayez de modifier vos critères de recherche.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default EventsPage;
