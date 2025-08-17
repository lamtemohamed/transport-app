import { useState } from "react";
import "../styles/HomeStyle/home.css";
import Subscribe from "../connexion_form/subscribes_form/subscribe";
import {
  FaBars,
  FaCheckCircle,
  FaClock,
  FaCrown,
  FaPeopleCarry,
  FaRoad,
  FaSearch,
  FaStarHalfAlt,
  FaTimes,
  FaUser,
  FaUserCircle,
  FaUserTie,
} from "react-icons/fa";

import { FaDeleteLeft } from "react-icons/fa6";
import { IoMdStarHalf } from "react-icons/io";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "react-router-dom";
import TarifsSection from "../tarif_component/tarif";
import ServicesSection from "../my_service_components/ServiceSection";
interface vehicleType {
  id: number;
  name: string;
  image: string;
  price: string;
  status: string[];
}

interface restaurantType {
  id: number;
  name: string;
  cuisine: string;
  image: string;
  rating: number;
  status: string[];
}
export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string>("transport");
  const [userStatus, setUserStatus] = useState<string>("standard");
  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedVehicle, setSelectedVehicle] = useState<vehicleType | null>(
    null
  );
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<restaurantType | null>(null);

  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [partySize, setPartySize] = useState<number>(2);

  // Fonction  pour le formatage des dates
  const formatReservationDate = (dateStr: string, timeStr: string) => {
    if (!dateStr) return "Aucune date sélectionnée";

    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) return "Date invalide";

    return `Cette réservation est faite le ${format(
      dateObj,
      "EEEE d MMMM yyyy",
      { locale: fr }
    )} à ${timeStr || "aucune heure sélectionnée"}`;
  };

  //  data
  const vehicles = [
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

  const restaurants = [
    {
      id: 1,
      name: "Le Gourmet",
      cuisine: "French",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      rating: 4.8,
      status: ["standard", "premium", "vip"],
    },
    {
      id: 2,
      name: "Sakura Sushi",
      cuisine: "Japanese",
      image: "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6",
      rating: 4.6,
      status: ["standard", "premium", "vip"],
    },
    {
      id: 3,
      name: "The Royal Steakhouse",
      cuisine: "American",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
      rating: 4.9,
      status: ["premium", "vip"],
    },
    {
      id: 4,
      name: "La Dolce Vita",
      cuisine: "Italian",
      image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae",
      rating: 4.7,
      status: ["vip"],
    },
  ];

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.status.includes(userStatus)
  );
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.status.includes(userStatus)
  );

  const handleBookNow = () => {
    if (
      (activeTab === "transport" && !selectedVehicle) ||
      (activeTab === "restaurant" && !selectedRestaurant) ||
      !date ||
      !time
    ) {
      alert("S'il vous  plait remplissez tous les champs");
      return;
    }

    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen relative ">
      {/* Image personal-car */}
      <div
        className="absolute z-10
    w-[200px]  top-[35px] 
    md:w-[220px]  md:top-[20px]
    lg:w-[280px]  lg:top-[40px]
    xl:w-[400px]  xl:top-[50px]
    "
      >
        <img
          src="logo/personal_rmbg.png"
          alt="Personal Car"
          className="w-full h-auto mt-4 "
        />
      </div>

      {/* Header */}
      <header className="bg-blue-50 border-b border-blue-100 w-full fixed top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            {/* Logo et barre de recherche */}
            <div className="flex items-center w-full md:w-auto justify-between md:justify-start space-x-4">
              {/* Logo - Ajusté indépendamment */}
              <div className="flex-shrink-0 flex items-center justify-center">
                <img
                  src="logo/logo-rmbg.png"
                  alt="Logo Elite Travel"
                  className="h-16 w-auto object-contain"
                />
              </div>

              {/* Barre de recherche desktop */}
              <div className="hidden md:flex relative w-64">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
                <FaSearch className="absolute right-3 top-2.5 text-blue-400" />
              </div>
            </div>

            {/* Menu de droite */}
            <div className="flex items-center space-x-2 md:space-x-3">
              {/* Barre de recherche mobile */}
              <div className="md:hidden flex relative w-48">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
                <FaSearch className="absolute right-3 top-2.5 text-blue-400" />
              </div>

              {/* Bouton menu mobile */}
              <button
                className="md:hidden text-blue-600 text-xl focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* Menu desktop */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={() => setShowStatusModal(true)}
                className="flex items-center space-x-1 bg-white text-blue-600 px-4 py-2 rounded-full font-medium hover:bg-blue-100 transition-all border border-blue-200"
              >
                <i
                  className={`fas ${
                    userStatus === "vip"
                      ? "fa-crown"
                      : userStatus === "premium"
                      ? "fa-star"
                      : "fa-user"
                  }`}
                ></i>
                <span>
                  {userStatus.charAt(0).toUpperCase() + userStatus.slice(1)}
                </span>
              </button>

              <button
                onClick={() => setShowFormModal(true)}
                className="bg-white text-blue-600 px-4 py-2 rounded-full font-medium hover:bg-blue-100 transition-all border border-blue-200"
              >
                Créer un compte
              </button>

              <a
                href="#service-section"
                className="bg-white text-blue-600 px-4 py-2 rounded-full font-medium hover:bg-blue-100 transition-all border border-blue-200"
              >
                Nos services
              </a>

              <a
                href="#tarif-section"
                className="bg-white text-blue-600 px-4 py-2 rounded-full font-medium hover:bg-blue-100 transition-all border border-blue-200"
              >
                Nos Tarifs
              </a>

              <Link
                to="/admin"
                className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition-all"
              >
                Admin
              </Link>
            </div>
          </div>

          {/* Menu mobile */}
          <div
            className={`md:hidden ${isMenuOpen ? "block" : "hidden"} mt-3 pb-2`}
          >
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  setShowStatusModal(true);
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center justify-center bg-white text-blue-600 px-4 py-2.5 rounded-full font-medium hover:bg-blue-100 transition-all border border-blue-200"
              >
                <i
                  className={`fas ${
                    userStatus === "vip"
                      ? "fa-crown"
                      : userStatus === "premium"
                      ? "fa-star"
                      : "fa-user"
                  } mr-2`}
                ></i>
                {userStatus.charAt(0).toUpperCase() + userStatus.slice(1)}
              </button>

              <button
                onClick={() => {
                  setShowFormModal(true);
                  setIsMenuOpen(false);
                }}
                className="w-full bg-white text-blue-600 px-4 py-2.5 rounded-full font-medium hover:bg-blue-100 transition-all border border-blue-200"
              >
                Créer un compte
              </button>

              <a
                href="#service-section"
                className="w-full text-center bg-white text-blue-600 px-4 py-2.5 rounded-full font-medium hover:bg-blue-100 transition-all border border-blue-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Nos services
              </a>

              <a
                href="#tarif-section"
                className="w-full text-center bg-white text-blue-600 px-4 py-2.5 rounded-full font-medium hover:bg-blue-100 transition-all border border-blue-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Nos Tarifs
              </a>

              <Link
                to="/admin"
                className="w-full text-center bg-blue-600 text-white px-4 py-2.5 rounded-full font-medium hover:bg-blue-700 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-bg text-white py-16 mt-28 relative">
        <div className="container mx-auto px-4">
          {/* Titre principal - Descendu de 40px sur mobile */}
          <div className="text-center relative z-20 mt-43 sm:mt-0">
            <h2 className="text-2xl sm:text-xl md:text-3xl lg:text-4xl font-bold mb-4 py-5 md:py-10 mx-auto px-4 max-w-3xl">
              Transport & Restaurant
              <br className="sm:block" />
              universitaire
              <br className="sm:block" />
              facile & rapide
            </h2>
          </div>

          {/* Liste - Descendue de 32px sur mobile */}
          <div className="text-base sm:text-base md:text-xl mb-8 max-w-2xl mx-auto sm:text-center mt-[-28px] sm:mt-0">
            <div className="md:relative md:left-40">
              <ul className="space-y-3 pl-5 sm:pl-0">
                <li className="flex items-start gap-2 text-left">
                  <FaPeopleCarry className="mt-1 flex-shrink-0" />
                  <span>Réservation facile en ligne</span>
                </li>

                <li className="flex items-start gap-2 text-left">
                  <FaUserTie className="mt-1 flex-shrink-0" />
                  <span>Chauffeurs professionnels et ponctuels</span>
                </li>

                <li className="flex items-start gap-2 text-left">
                  <FaRoad className="mt-1 flex-shrink-0" />
                  <span>Suivi en temps réel de votre trajet</span>
                </li>

                <li className="flex items-start gap-2 text-left">
                  <FaClock className="mt-1 flex-shrink-0" />
                  <span>Service disponible 7j/7 – 24h/24</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Tabs - Descendues de 48px sur mobile */}
          <div className="flex justify-center mb-8 relative z-20 mt-12 sm:mt-0">
            <div className="inline-flex bg-white bg-opacity-20 rounded-full p-1">
              <button
                onClick={() => setActiveTab("transport")}
                className={`px-4 sm:px-6 py-2 rounded-full font-medium text-sm sm:text-base ${
                  activeTab === "transport"
                    ? "bg-black text-white"
                    : "text-red-400"
                }`}
              >
                <i className="fas fa-car mr-2"></i> Transport
              </button>
              <button
                onClick={() => setActiveTab("restaurant")}
                className={`px-4 sm:px-6 py-2 rounded-full font-medium text-sm sm:text-base ${
                  activeTab === "restaurant"
                    ? "bg-black text-white"
                    : "text-green-500"
                }`}
              >
                <i className="fas fa-utensils mr-2"></i> Restaurants
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 -mt-16">
        {/* Booking Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Heure
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {activeTab === "restaurant" && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  taille du groupe
                </label>
                <select
                  value={partySize}
                  onChange={(e) => setPartySize(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "person" : "people"}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Options Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            {activeTab === "transport"
              ? "Véhicule disponible"
              : "👉Restaurants mis en avant"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeTab === "transport" ? (
              filteredVehicles.length > 0 ? (
                filteredVehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    onClick={() => setSelectedVehicle(vehicle)}
                    className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all card-hover ${
                      selectedVehicle?.id === vehicle.id
                        ? "ring-2 ring-indigo-500"
                        : ""
                    }`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <h4 className="text-white font-bold text-xl">
                          {vehicle.name}
                        </h4>
                        <p className="text-white">{vehicle.price}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-1 text-yellow-400">
                          {vehicle.status.includes("vip") && (
                            <FaCrown className="text-2xl" />
                          )}
                          {vehicle.status.includes("premium") && (
                            <IoMdStarHalf className="text-2xl" />
                          )}
                          {vehicle.status.includes("standard") && (
                            <FaUserCircle className="text-2xl" />
                          )}
                        </div>
                        <button
                          className="text-indigo-600 font-medium hover:text-indigo-800"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVehicle(vehicle);
                          }}
                        >
                          Choisir un service
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <i className="fas fa-car text-4xl text-gray-400 mb-4"></i>
                  <h4 className="text-xl font-medium text-gray-600">
                    Aucun véhicule disponible pour ceux services
                  </h4>
                  <p className="text-gray-500 mt-2">
                    Mets à jour son status pour plus d'options
                  </p>
                  <button
                    onClick={() => setShowStatusModal(true)}
                    className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all"
                  >
                    Mise à jour de status
                  </button>
                </div>
              )
            ) : filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  onClick={() => setSelectedRestaurant(restaurant)}
                  className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all card-hover ${
                    selectedRestaurant?.id === restaurant.id
                      ? "ring-2 ring-indigo-500"
                      : ""
                  }`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <h4 className="text-white font-bold text-xl">
                        {restaurant.name}
                      </h4>
                      <p className="text-white">{restaurant.cuisine}</p>
                    </div>
                    <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-full flex items-center">
                      <i className="fas fa-star text-yellow-400 mr-1"></i>
                      <span className="font-medium">{restaurant.rating}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-1 text-yellow-400">
                        {restaurant.status.includes("vip") && (
                          <FaCrown className="text-2xl" />
                        )}
                        {restaurant.status.includes("premium") && (
                          <IoMdStarHalf className="text-2xl" />
                        )}
                        {restaurant.status.includes("standard") && (
                          <FaUserCircle className="text-2xl" />
                        )}
                      </div>
                      <button
                        className="text-indigo-600 font-medium hover:text-indigo-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRestaurant(restaurant);
                        }}
                      >
                        Choisir un service
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <i className="fas fa-utensils text-4xl text-gray-400 mb-4"></i>
                <h4 className="text-xl font-medium text-gray-600">
                  aucun Restaurant disponible pour ce service
                </h4>
                <p className="text-gray-500 mt-2">
                  Mets ton status à jour pour accéder aux services pro
                </p>
                <button
                  onClick={() => setShowStatusModal(true)}
                  className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all"
                >
                  Mise à de status
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Reservation part here */}
        {(selectedVehicle || selectedRestaurant) && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Votre choix
            </h3>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                {activeTab === "transport" ? (
                  <>
                    <h4 className="font-medium text-lg">
                      {selectedVehicle?.name}
                    </h4>
                    <p className="text-gray-600">
                      {formatReservationDate(date, time)}
                    </p>
                  </>
                ) : (
                  <>
                    <h4 className="font-medium text-lg">
                      {selectedRestaurant?.name}
                    </h4>
                    <p className="text-gray-600">
                      {formatReservationDate(date, time)} pour{""} {partySize}
                      {""} {partySize === 1 ? "person" : "personne"}
                    </p>
                  </>
                )}
              </div>
              <button
                onClick={handleBookNow}
                className="mt-4 md:mt-0 bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-all"
              >
                Confirmer la réservation
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Status Modal */}
      {showStatusModal && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Choisir un Status
              </h3>
              <button
                onClick={() => setShowStatusModal(false)}
                className="text-gray-500 hover:text-gray-700"
              ></button>
            </div>

            <div className="space-y-4">
              <div
                onClick={() => setUserStatus("standard")}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  userStatus === "standard"
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <FaUser />
                  </div>
                  <div>
                    <h4 className="font-medium">Standard</h4>
                    <p className="text-sm text-gray-600">Service basic</p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setUserStatus("premium")}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  userStatus === "premium"
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                    <FaStarHalfAlt />
                  </div>
                  <div>
                    <h4 className="font-medium">Premium</h4>
                    <p className="text-sm text-gray-600">
                      Accès aux services premium des véhicles et restaurant
                    </p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setUserStatus("vip")}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  userStatus === "vip"
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <FaCrown />
                  </div>
                  <div>
                    <h4 className="font-medium">VIP</h4>
                    <p className="text-sm text-gray-600">
                      Accès exclusif à tous les services luxieus
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowStatusModal(false)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all"
              >
                Confirmer Status
              </button>
            </div>
          </div>
        </div>
      )}

      {showFormModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl relative">
            <button
              onClick={() => setShowFormModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
            >
              <FaDeleteLeft className="mt-5" />
            </button>

            <div className="w-full">
              <Subscribe />
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {bookingSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center z-50 animate-fade-in-up">
          <FaCheckCircle className="text-2xl" />
          <span>Votre réservation a été prise en compte</span>
        </div>
      )}

      {/**insection du component pour les sercices */}
      <div id="service-section">
        <ServicesSection />
      </div>
      <div id="tarif-section" className="mt-2">
        {/**insection du component pour les tarifs*/}
        <TarifsSection />
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">Elite Travel</h4>
              <p className="text-gray-400">
                Premium transport and dining experiences tailored to your
                status.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-all"
                  >
                    Luxury Transport
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-all"
                  >
                    Fine Dining
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-all"
                  >
                    VIP Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-all"
                  >
                    Event Planning
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-all"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-all"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-all"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-all"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-all text-xl"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-all text-xl"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-all text-xl"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-all text-xl"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
              <div className="mt-4">
                <p className="text-gray-400">Subscribe to our newsletter</p>
                <div className="flex mt-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="px-4 py-2 rounded-l-lg focus:outline-none text-gray-800 w-full"
                  />
                  <button className="bg-indigo-600 px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition-all">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Elite Travel. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
