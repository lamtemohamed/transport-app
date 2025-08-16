import { useState } from "react";
import { FaHome, FaTruckPickup } from "react-icons/fa";
import {
  FiCreditCard,
  FiSettings,
  FiTruck,
  FiCoffee,
  FiPlus,
  FiMenu,
  FiSearch,
  FiBell,
  FiX,
} from "react-icons/fi";
import type { Payment } from "src/types/payment.type";
import type { Driver, vehicle } from "src/types/transport";
import DarkModeToggle from "./darkMode/darkModeToggle";
import { useTheme } from "./ThemeContext/useTheme";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<
    "payments" | "drivers" | "restaurants" | "vehicle"
  >("payments");
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<number | null>(null);

  // Données
  const vehicles: vehicle[] = [
    {
      id: 1,
      name: "Luxury Sedan",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
      price: "$120",
      status: ["standard", "premium", "vip"],
    },
    {
      id: 2,
      name: "Executive SUV",
      image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d",
      price: "$180",
      status: ["premium", "vip"],
    },
    {
      id: 3,
      name: "Limousine",
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60",
      price: "$250",
      status: ["vip"],
    },
    {
      id: 4,
      name: "Premium Van",
      image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7",
      price: "$200",
      status: ["premium", "vip"],
    },
  ];

  const payments: Payment[] = [
    {
      id: "1",
      clientName: "Jean Dupont",
      amount: 25.5,
      date: "2023-05-15",
      status: "completed",
    },
    {
      id: "2",
      clientName: "Marie Martin",
      amount: 18.75,
      date: "2023-05-16",
      status: "pending",
    },
    {
      id: "3",
      clientName: "Pierre Lambert",
      amount: 32.0,
      date: "2023-05-16",
      status: "completed",
    },
  ];

  const drivers: Driver[] = [
    {
      id: "1",
      name: "Thomas Leroy",
      vehicle: "Toyota Corolla",
      phone: "06 12 34 56 78",
      status: "available",
    },
    {
      id: "2",
      name: "Sophie Bernard",
      vehicle: "Renault Clio",
      phone: "06 87 65 43 21",
      status: "on-delivery",
    },
    {
      id: "3",
      name: "David Petit",
      vehicle: "Peugeot 208",
      phone: "07 98 76 54 32",
      status: "offline",
    },
  ];

  const filteredPayments = payments.filter((payment) =>
    payment.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDrivers = drivers.filter((driver) =>
    driver.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filterVehicle = vehicles.filter((v) =>
    v.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteVehicle = (id: number) => {
    setVehicleToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Ici vous ajouterez la logique pour supprimer le véhicule
    console.log("Suppression du véhicule", vehicleToDelete);
    setShowDeleteModal(false);
    setVehicleToDelete(null);
  };

  return (
    <div
      className={`flex h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}
    >
      {/* Sidebar Desktop */}
      <div className="hidden md:flex flex-col w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white">
        <div className="flex items-center justify-center h-16 px-4 relative">
          <h1 className="text-xl font-bold">Elite Back-Office</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <button
            onClick={() => setActiveTab("payments")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
              activeTab === "payments"
                ? "bg-blue-500 bg-opacity-30"
                : "hover:bg-blue-500 hover:bg-opacity-20"
            }`}
          >
            <FiCreditCard className="mr-3" />
            Paiements
          </button>
          <button
            onClick={() => setActiveTab("drivers")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
              activeTab === "drivers"
                ? "bg-blue-500 bg-opacity-30"
                : "hover:bg-blue-500 hover:bg-opacity-20"
            }`}
          >
            <FiTruck className="mr-3" />
            Chauffeurs
          </button>
          <button
            onClick={() => setActiveTab("restaurants")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
              activeTab === "restaurants"
                ? "bg-blue-500 bg-opacity-30"
                : "hover:bg-blue-500 hover:bg-opacity-20"
            }`}
          >
            <FiCoffee className="mr-3" />
            Restaurants
          </button>
          <button
            onClick={() => setActiveTab("vehicle")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
              activeTab === "vehicle"
                ? "bg-blue-500 bg-opacity-30"
                : "hover:bg-blue-500 hover:bg-opacity-20"
            }`}
          >
            <FaTruckPickup className="mr-3" />
            Véhicule
          </button>
        </nav>
        <div className="p-4">
          <button className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-blue-500 hover:bg-opacity-20 transition-all">
            <FiSettings className="mr-3" />
            Paramètres
          </button>
        </div>

        <div className="p-4">
          <button className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-blue-500 hover:bg-opacity-20 transition-all">
            <FaHome className="mr-3" />
            <Link to="/">Page d'accueil</Link>
          </button>
        </div>
      </div>

      {/* Mobile sidebar */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="flex flex-col w-full h-full bg-gradient-to-b from-blue-600 to-blue-800 text-white">
            <div className="flex items-center justify-between h-16 px-4">
              <h1 className="text-xl font-bold">Elite Back-Office</h1>
              <button className="p-2" onClick={() => setShowMobileMenu(false)}>
                <FiX size={20} />
              </button>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
              <button
                onClick={() => {
                  setActiveTab("payments");
                  setShowMobileMenu(false);
                }}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
                  activeTab === "payments"
                    ? "bg-blue-500 bg-opacity-30"
                    : "hover:bg-blue-500 hover:bg-opacity-20"
                }`}
              >
                <FiCreditCard className="mr-3" />
                Paiements
              </button>
              <button
                onClick={() => {
                  setActiveTab("drivers");
                  setShowMobileMenu(false);
                }}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
                  activeTab === "drivers"
                    ? "bg-blue-500 bg-opacity-30"
                    : "hover:bg-blue-500 hover:bg-opacity-20"
                }`}
              >
                <FiTruck className="mr-3" />
                Chauffeurs
              </button>
              <button
                onClick={() => {
                  setActiveTab("restaurants");
                  setShowMobileMenu(false);
                }}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
                  activeTab === "restaurants"
                    ? "bg-blue-500 bg-opacity-30"
                    : "hover:bg-blue-500 hover:bg-opacity-20"
                }`}
              >
                <FiCoffee className="mr-3" />
                Restaurants
              </button>
              <button
                onClick={() => {
                  setActiveTab("vehicle");
                  setShowMobileMenu(false);
                }}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
                  activeTab === "vehicle"
                    ? "bg-blue-500 bg-opacity-30"
                    : "hover:bg-blue-500 hover:bg-opacity-20"
                }`}
              >
                <FaTruckPickup className="mr-3" />
                Véhicule
              </button>
            </nav>

            <div className="p-4">
              <button className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-blue-500 hover:bg-opacity-20 transition-all">
                <FiSettings className="mr-3" />
                Paramètres
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          className="p-2 rounded-lg bg-blue-600 text-white"
          onClick={() => setShowMobileMenu(true)}
        >
          <FiMenu size={20} />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header
          className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm z-10`}
        >
          {/* Conteneur principal */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-4 py-2 sm:py-0">
            {/* Première ligne - Titre et icônes mobile */}
            <div className="flex items-center justify-between w-full sm:w-auto h-12 sm:h-16">
              {/* Conteneur titre + bouton menu */}
              <div className="flex items-center">
                {/* Bouton menu mobile */}
                <button
                  className="mr-2 p-1 sm:hidden"
                  onClick={() => setShowMobileMenu(true)}
                >
                  <FiMenu
                    className={darkMode ? "text-white" : "text-gray-800"}
                    size={20}
                  />
                </button>

                {/* Titre avec marge gauche sur mobile */}
                <h1
                  className={`text-lg font-semibold truncate ml-2 sm:ml-0 ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {activeTab === "payments" && "Gestion Paiements"}
                  {activeTab === "drivers" && "Gestion Chauffeurs"}
                  {activeTab === "restaurants" && "Gestion Restaurants"}
                  {activeTab === "vehicle" && "Gestion Véhicules"}
                </h1>
              </div>

              {/* Icônes secondaires (mobile seulement) */}
              <div className="flex items-center space-x-2 sm:hidden">
                <button
                  className={`p-2 rounded-full relative ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <FiBell size={18} />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                <div className="h-7 w-7 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                  MH
                </div>
                <DarkModeToggle />
              </div>
            </div>

            {/* Deuxième ligne - Barre de recherche et icônes desktop */}
            <div className="flex items-center w-full sm:w-auto mt-2 sm:mt-0">
              {/* Barre de recherche */}
              <div className="relative flex-grow sm:flex-grow-0 sm:w-72 mr-2 sm:mr-4">
                <FiSearch
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    darkMode ? "text-gray-400" : "text-gray-400"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Icônes (desktop seulement) */}
              <div className="hidden sm:flex items-center space-x-4">
                <button
                  className={`p-2 rounded-full relative ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <FiBell />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                    MH
                  </div>
                  <DarkModeToggle />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main
          className={`flex-1 overflow-y-auto p-6 ${
            darkMode ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2
              className={`text-2xl font-bold ${
                darkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {activeTab === "payments" && "Historique des Paiements"}
              {activeTab === "drivers" && "Liste des Chauffeurs"}
              {activeTab === "restaurants" && "Partenaires Restaurants"}
              {activeTab === "vehicle" && "Liste des véhicules"}
            </h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiPlus className="mr-2" />
              Ajouter
            </button>
          </div>

          {/* Payments Tab */}
          {activeTab === "payments" && (
            <div
              className={`rounded-xl shadow overflow-hidden ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className={darkMode ? "bg-gray-700" : "bg-gray-50"}>
                    <tr>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          darkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Client
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          darkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Montant
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          darkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Date
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          darkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Statut
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          darkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className={`divide-y ${
                      darkMode
                        ? "divide-gray-700 bg-gray-800"
                        : "divide-gray-200 bg-white"
                    }`}
                  >
                    {filteredPayments.map((payment) => (
                      <tr
                        key={payment.id}
                        className={
                          darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`text-sm font-medium ${
                              darkMode ? "text-gray-200" : "text-gray-900"
                            }`}
                          >
                            {payment.clientName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`text-sm ${
                              darkMode ? "text-gray-200" : "text-gray-900"
                            }`}
                          >
                            {payment.amount} €
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`text-sm ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {payment.date}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${
                              payment.status === "completed"
                                ? darkMode
                                  ? "bg-green-900 text-green-100"
                                  : "bg-green-100 text-green-800"
                                : ""
                            }
                            ${
                              payment.status === "pending"
                                ? darkMode
                                  ? "bg-yellow-900 text-yellow-100"
                                  : "bg-yellow-100 text-yellow-800"
                                : ""
                            }
                            ${
                              payment.status === "failed"
                                ? darkMode
                                  ? "bg-red-900 text-red-100"
                                  : "bg-red-100 text-red-800"
                                : ""
                            }`}
                          >
                            {payment.status === "completed" && "Complété"}
                            {payment.status === "pending" && "En attente"}
                            {payment.status === "failed" && "Échoué"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            className={`mr-3 ${
                              darkMode
                                ? "text-blue-400 hover:text-blue-300"
                                : "text-blue-600 hover:text-blue-900"
                            }`}
                          >
                            Modifier
                          </button>
                          <button
                            className={
                              darkMode
                                ? "text-red-400 hover:text-red-300"
                                : "text-red-600 hover:text-red-900"
                            }
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Drivers Tab */}
          {activeTab === "drivers" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDrivers.map((driver) => (
                <div
                  key={driver.id}
                  className={`rounded-xl shadow overflow-hidden hover:shadow-md transition-shadow ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-lg font-semibold ${
                          darkMode ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {driver.name}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full 
                        ${
                          driver.status === "available"
                            ? darkMode
                              ? "bg-green-900 text-green-100"
                              : "bg-green-100 text-green-800"
                            : ""
                        }
                        ${
                          driver.status === "on-delivery"
                            ? darkMode
                              ? "bg-blue-900 text-blue-100"
                              : "bg-blue-100 text-blue-800"
                            : ""
                        }
                        ${
                          driver.status === "offline"
                            ? darkMode
                              ? "bg-gray-700 text-gray-300"
                              : "bg-gray-100 text-gray-800"
                            : ""
                        }`}
                      >
                        {driver.status === "available" && "Disponible"}
                        {driver.status === "on-delivery" && "En livraison"}
                        {driver.status === "offline" && "Hors ligne"}
                      </span>
                    </div>
                    <div
                      className={`mt-4 space-y-2 text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <div className="flex items-center">
                        <FiTruck
                          className={`mr-2 ${
                            darkMode ? "text-gray-400" : "text-gray-400"
                          }`}
                        />
                        <span>{driver.vehicle}</span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className={`w-4 h-4 mr-2 ${
                            darkMode ? "text-gray-400" : "text-gray-400"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          ></path>
                        </svg>
                        <span>{driver.phone}</span>
                      </div>
                    </div>
                    <div className="mt-6 flex space-x-3">
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Modifier
                      </button>
                      <button
                        className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                          darkMode
                            ? "bg-red-900 text-red-100 hover:bg-red-800"
                            : "bg-red-100 text-red-600 hover:bg-red-200"
                        }`}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Restaurants Tab */}
          {activeTab === "restaurants" && (
            <div
              className={`rounded-xl shadow p-6 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                Contenu des restaurants
              </p>
            </div>
          )}

          {/* Vehicle Tab */}
          {activeTab === "vehicle" && (
            <div className="space-y-8">
              {vehicles.some((v) => v.status.includes("standard")) && (
                <div>
                  <h2
                    className={`text-2xl font-bold mb-4 border-b pb-2 ${
                      darkMode
                        ? "text-gray-200 border-gray-700"
                        : "text-gray-800 border-gray-200"
                    }`}
                  >
                    Véhicules Standard
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filterVehicle
                      .filter((vehicle) => vehicle.status.includes("standard"))
                      .map((vehicle) => (
                        <div
                          key={vehicle.id}
                          className={`rounded-xl shadow overflow-hidden ${
                            darkMode ? "bg-gray-800" : "bg-white"
                          }`}
                        >
                          <img
                            src={vehicle.image}
                            alt={vehicle.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <h3
                              className={`text-lg font-semibold ${
                                darkMode ? "text-gray-200" : "text-gray-800"
                              }`}
                            >
                              {vehicle.name}
                            </h3>
                            <p
                              className={`mt-1 ${
                                darkMode ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              Prix: {vehicle.price}
                            </p>
                            <div className="mt-4 flex space-x-2">
                              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Modifier
                              </button>
                              <button
                                onClick={() => handleDeleteVehicle(vehicle.id)}
                                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                                  darkMode
                                    ? "bg-red-900 text-red-100 hover:bg-red-800"
                                    : "bg-red-100 text-red-600 hover:bg-red-200"
                                }`}
                              >
                                Supprimer
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {vehicles.some((v) => v.status.includes("premium")) && (
                <div>
                  <h2
                    className={`text-2xl font-bold mb-4 border-b pb-2 ${
                      darkMode
                        ? "text-gray-200 border-gray-700"
                        : "text-gray-800 border-gray-200"
                    }`}
                  >
                    Véhicules Premium
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filterVehicle
                      .filter((vehicle) => vehicle.status.includes("premium"))
                      .map((vehicle) => (
                        <div
                          key={vehicle.id}
                          className={`rounded-xl shadow overflow-hidden ${
                            darkMode ? "bg-gray-800" : "bg-white"
                          }`}
                        >
                          <img
                            src={vehicle.image}
                            alt={vehicle.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <h3
                              className={`text-lg font-semibold ${
                                darkMode ? "text-gray-200" : "text-gray-800"
                              }`}
                            >
                              {vehicle.name}
                            </h3>
                            <p
                              className={`mt-1 ${
                                darkMode ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              Prix: {vehicle.price}
                            </p>
                            <div className="mt-4 flex space-x-2">
                              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Modifier
                              </button>
                              <button
                                onClick={() => handleDeleteVehicle(vehicle.id)}
                                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                                  darkMode
                                    ? "bg-red-900 text-red-100 hover:bg-red-800"
                                    : "bg-red-100 text-red-600 hover:bg-red-200"
                                }`}
                              >
                                Supprimer
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {vehicles.some((v) => v.status.includes("vip")) && (
                <div>
                  <h2
                    className={`text-2xl font-bold mb-4 border-b pb-2 ${
                      darkMode
                        ? "text-gray-200 border-gray-700"
                        : "text-gray-800 border-gray-200"
                    }`}
                  >
                    Véhicules Vip
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filterVehicle
                      .filter((vehicle) => vehicle.status.includes("vip"))
                      .map((vehicle) => (
                        <div
                          key={vehicle.id}
                          className={`rounded-xl shadow overflow-hidden ${
                            darkMode ? "bg-gray-800" : "bg-white"
                          }`}
                        >
                          <img
                            src={vehicle.image}
                            alt={vehicle.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <h3
                              className={`text-lg font-semibold ${
                                darkMode ? "text-gray-200" : "text-gray-800"
                              }`}
                            >
                              {vehicle.name}
                            </h3>
                            <p
                              className={`mt-1 ${
                                darkMode ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              Prix: {vehicle.price}
                            </p>
                            <div className="mt-4 flex space-x-2">
                              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Modifier
                              </button>
                              <button
                                onClick={() => handleDeleteVehicle(vehicle.id)}
                                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                                  darkMode
                                    ? "bg-red-900 text-red-100 hover:bg-red-800"
                                    : "bg-red-100 text-red-600 hover:bg-red-200"
                                }`}
                              >
                                Supprimer
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`rounded-xl shadow-xl w-full max-w-md ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3
                  className={`text-lg font-semibold ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {activeTab === "payments" && "Ajouter un paiement"}
                  {activeTab === "drivers" && "Ajouter un chauffeur"}
                  {activeTab === "restaurants" && "Ajouter un restaurant"}
                  {activeTab === "vehicle" && "Ajouter un véhicule"}
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className={
                    darkMode
                      ? "text-gray-400 hover:text-gray-300"
                      : "text-gray-400 hover:text-gray-500"
                  }
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {activeTab === "payments" && "Nom du client"}
                    {activeTab === "drivers" && "Nom complet"}
                    {activeTab === "vehicle" && "Nom du véhicule"}
                  </label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      darkMode
                        ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Annuler
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Enregistrer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`rounded-xl shadow-xl w-full max-w-md ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3
                  className={`text-lg font-semibold ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Confirmer la suppression
                </h3>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className={
                    darkMode
                      ? "text-gray-400 hover:text-gray-300"
                      : "text-gray-400 hover:text-gray-500"
                  }
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  Êtes-vous sûr de vouloir supprimer ce véhicule ? Cette action
                  est irréversible.
                </p>
                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      darkMode
                        ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Annuler
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Confirmer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
