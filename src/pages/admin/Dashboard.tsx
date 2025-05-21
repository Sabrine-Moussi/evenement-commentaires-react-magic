
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { events, comments } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Créer les données pour le graphique
    const categories = ["Conférence", "Concert", "Exposition", "Atelier", "Sport", "Autre"];
    const data = categories.map(category => {
      const count = events.filter(event => event.category === category).length;
      return {
        name: category,
        count
      };
    });
    
    setChartData(data);
  }, []);

  // Statistiques générales
  const totalEvents = events.length;
  const totalComments = comments.length;
  const upcomingEvents = events.filter(e => new Date(e.date) > new Date()).length;
  
  // Événement le plus récent
  const sortedEvents = [...events].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const mostRecentEvent = sortedEvents[0];
  
  return (
    <>
      <Helmet>
        <title>Tableau de bord | Administration</title>
      </Helmet>

      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 text-white">Tableau de bord</h1>
          <p className="text-blue-200/80">Vue d'ensemble des statistiques et activités</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Total d'événements */}
          <Card className="dashboard-stat-card border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Total d'événements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{totalEvents}</div>
            </CardContent>
            <CardFooter>
              <Link 
                to="/admin/events"
                className="text-xs text-blue-300 hover:text-blue-200 hover:underline"
              >
                Voir les détails
              </Link>
            </CardFooter>
          </Card>

          {/* Événements à venir */}
          <Card className="dashboard-stat-card border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Événements à venir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{upcomingEvents}</div>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-gray-400">
                {upcomingEvents} sur {totalEvents} événements
              </div>
            </CardFooter>
          </Card>

          {/* Total de commentaires */}
          <Card className="dashboard-stat-card border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Total de commentaires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{totalComments}</div>
            </CardContent>
            <CardFooter>
              <Link 
                to="/admin/comments"
                className="text-xs text-blue-300 hover:text-blue-200 hover:underline"
              >
                Voir les détails
              </Link>
            </CardFooter>
          </Card>

          {/* Événement récent */}
          <Card className="dashboard-stat-card border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Dernier événement
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-0">
              <div className="font-bold truncate text-white">{mostRecentEvent?.title}</div>
              <div className="text-xs text-gray-400">
                {new Date(mostRecentEvent?.date).toLocaleDateString('fr-FR')}
              </div>
            </CardContent>
            <CardFooter>
              <Link 
                to={`/events/${mostRecentEvent?.id}`}
                className="text-xs text-blue-300 hover:text-blue-200 hover:underline"
              >
                Voir l'événement
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Graphique des événements par catégorie */}
          <Card className="col-span-1 dashboard-stat-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Distribution par catégorie</CardTitle>
              <CardDescription className="text-gray-400">Nombre d'événements par catégorie</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} />
                  <YAxis tick={{ fill: '#94a3b8' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '4px', color: 'white' }} />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Actions rapides */}
          <Card className="col-span-1 dashboard-stat-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Actions rapides</CardTitle>
              <CardDescription className="text-gray-400">Accès rapide aux fonctionnalités principales</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button asChild className="flex items-center bg-blue-600 hover:bg-blue-700">
                  <Link to="/admin/events/create">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 mr-2"
                    >
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                    </svg>
                    Créer un événement
                  </Link>
                </Button>
                <Button variant="outline" asChild className="border-blue-700 text-blue-300 hover:text-blue-100 hover:bg-blue-900/50">
                  <Link to="/admin/events">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 mr-2"
                    >
                      <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                      <path
                        fillRule="evenodd"
                        d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Gérer les événements
                  </Link>
                </Button>
                <Button variant="outline" asChild className="border-blue-700 text-blue-300 hover:text-blue-100 hover:bg-blue-900/50">
                  <Link to="/admin/comments">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 mr-2"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Modérer les commentaires
                  </Link>
                </Button>
                <Button variant="outline" asChild className="border-blue-700 text-blue-300 hover:text-blue-100 hover:bg-blue-900/50">
                  <Link to="/admin/settings">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 mr-2"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Paramètres
                  </Link>
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-gray-400">
                Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
