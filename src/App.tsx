/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car, Shield, Wrench, Calendar, MapPin, Phone, Mail, 
  ChevronRight, Star, CheckCircle2, ArrowRight, Sliders, 
  Search, Sun, Moon, X, Clock, User, Award, ExternalLink, ImageIcon, Layers, Globe
} from 'lucide-react';
import { supabase } from './lib/supabase';

interface VehicleItem {
  id: string;
  name: string;
  category: 'suv' | 'sedan' | 'pickup';
  section: 'showroom' | 'custom' | 'rental' | 'archive';
  type: 'Showroom Sale' | 'Custom Built' | 'VIP Rental';
  price: string;
  rentalRate?: string;
  year: number;
  engine: string;
  transmission: string;
  mileage: string;
  location: string;
  image: string;
  gallery: string[];
  features: string[];
  description: string;
}

const ALL_VEHICLES_CATALOG: VehicleItem[] = [
  {
    id: 'car-1',
    name: 'Toyota Land Cruiser Prado TX White Pearl',
    category: 'suv',
    section: 'showroom',
    type: 'Showroom Sale',
    price: 'PKR 45,500,000',
    year: 2024,
    engine: '2.8L 4-Cylinder Turbo Diesel',
    transmission: '8-Speed Automatic 4WD',
    mileage: '1,200 km',
    location: 'Lahore Showroom',
    image: '/assets/aistudio/images__53__786b06a0.jpg',
    gallery: ['/assets/aistudio/images__53__786b06a0.jpg', '/assets/aistudio/images__52__f2667806.jpg'],
    features: ['Sunroof', 'Multi-Terrain Select', 'Leather Ventilated Seats', 'JBL Audio'],
    description: 'Immaculate white Toyota Land Cruiser Prado with executive interior trim, advanced off-road capability, and pristine showroom condition.'
  },
  {
    id: 'car-2',
    name: 'Toyota Land Cruiser Prado TX Edition',
    category: 'suv',
    section: 'showroom',
    type: 'Showroom Sale',
    price: 'PKR 44,200,000',
    year: 2024,
    engine: '2.8L Turbo Diesel',
    transmission: 'Automatic 4WD',
    mileage: '2,500 km',
    location: 'Islamabad Showroom',
    image: '/assets/aistudio/images__52__f2667806.jpg',
    gallery: ['/assets/aistudio/images__52__f2667806.jpg', '/assets/aistudio/images__51__12ed2fcc.jpg'],
    features: ['LED Headlamps', 'Dual Zone Climate Control', 'Push Start'],
    description: 'Pristine dealership maintained Prado TX with premium leather upholstery and complete service history.'
  },
  {
    id: 'car-3',
    name: 'Toyota Land Cruiser Prado Supreme',
    category: 'suv',
    section: 'showroom',
    type: 'Showroom Sale',
    price: 'PKR 47,800,000',
    year: 2024,
    engine: '2.8L GD Turbo',
    transmission: '8-Speed Auto 4WD',
    mileage: '800 km',
    location: 'Lahore Showroom',
    image: '/assets/aistudio/images__51__12ed2fcc.jpg',
    gallery: ['/assets/aistudio/images__51__12ed2fcc.jpg', '/assets/aistudio/images__50__ccdecf3e.jpg'],
    features: ['Panoramic Sunroof', 'Head-Up Display', 'Crawl Control'],
    description: 'Supreme luxury trim featuring state-of-the-art driver assistance and peerless ride comfort on all terrains.'
  },
  {
    id: 'car-4',
    name: 'Toyota Land Cruiser Prado Sunset Edition',
    category: 'suv',
    section: 'showroom',
    type: 'Showroom Sale',
    price: 'PKR 46,900,000',
    year: 2025,
    engine: '2.8L High Output Diesel',
    transmission: '8-Speed Automatic',
    mileage: 'New',
    location: 'Islamabad Hub',
    image: '/assets/aistudio/images__50__ccdecf3e.jpg',
    gallery: ['/assets/aistudio/images__50__ccdecf3e.jpg', '/assets/aistudio/images__49__a7075f89.jpg'],
    features: ['Cool Box', 'Ventilated Seats', 'Power Tailgate'],
    description: 'Brand new 2025 model ready for immediate registration and nationwide delivery.'
  },
  {
    id: 'car-5',
    name: 'Toyota Land Cruiser Prado Urban White',
    category: 'suv',
    section: 'showroom',
    type: 'Showroom Sale',
    price: 'PKR 43,500,000',
    year: 2023,
    engine: '2.8L Turbo Diesel',
    transmission: 'Automatic',
    mileage: '6,000 km',
    location: 'Multan Showroom',
    image: '/assets/aistudio/images__49__a7075f89.jpg',
    gallery: ['/assets/aistudio/images__49__a7075f89.jpg', '/assets/aistudio/images__48__83d55066.jpg'],
    features: ['Alloy Wheels', 'Smart Entry', 'Parking Sensors'],
    description: 'Well-kept urban white Prado offering exceptional value and immaculate mechanical health.'
  },
  {
    id: 'car-6',
    name: 'Toyota Fortuner Legender 4x4',
    category: 'suv',
    section: 'showroom',
    type: 'Showroom Sale',
    price: 'PKR 21,900,000',
    year: 2025,
    engine: '2.8L Diesel 4WD',
    transmission: '6-Speed Automatic',
    mileage: '500 km',
    location: 'Islamabad Showroom',
    image: '/assets/aistudio/images__3__8f6f1955.jpg',
    gallery: ['/assets/aistudio/images__3__8f6f1955.jpg', '/assets/aistudio/images__2__8f6497e4.jpg'],
    features: ['Bi-LED Headlamps', 'Two-Tone Interior', 'Kick Sensor Tailgate'],
    description: 'The majestic Fortuner Legender offers commanding presence, athletic performance, and luxurious cabin appointments.'
  },
  {
    id: 'car-7',
    name: 'Toyota Fortuner GR-S Edition',
    category: 'suv',
    section: 'showroom',
    type: 'Showroom Sale',
    price: 'PKR 23,500,000',
    year: 2025,
    engine: '2.8L High Output Diesel',
    transmission: '6-Speed Sports Sequential',
    mileage: 'New',
    location: 'Lahore Showroom',
    image: '/assets/aistudio/images__19__d7f6cf3e.jpg',
    gallery: ['/assets/aistudio/images__19__d7f6cf3e.jpg', '/assets/aistudio/images__18__065a9de8.jpg'],
    features: ['GR Sport Suspension', 'Red Brake Calipers', 'Alcantara Sport Seats'],
    description: 'Gazoo Racing inspired Fortuner tuned for superior handling and aggressive road presence.'
  },
  {
    id: 'car-8',
    name: 'Honda Civic RS Turbo e-HEV',
    category: 'sedan',
    section: 'showroom',
    type: 'Showroom Sale',
    price: 'PKR 11,200,000',
    year: 2025,
    engine: '1.5L VTEC Turbocharged',
    transmission: 'CVT with Paddle Shifters',
    mileage: '3,500 km',
    location: 'Islamabad Showroom',
    image: '/assets/aistudio/Honda_Civic_e-HEV_Sport__XI____f_30062024_ba052ff6.jpg',
    gallery: ['/assets/aistudio/Honda_Civic_e-HEV_Sport__XI____f_30062024_ba052ff6.jpg', '/assets/aistudio/images__1__feeb1bc2.jpg'],
    features: ['Honda SENSING', '18-inch Alloys', 'Sport Mode', 'Digital Cockpit'],
    description: 'Sleek sporty sedan with aggressive aerodynamic styling and responsive turbo performance.'
  },
  {
    id: 'car-9',
    name: 'Honda Civic Sport Hatchback',
    category: 'sedan',
    section: 'showroom',
    type: 'Showroom Sale',
    price: 'PKR 12,500,000',
    year: 2025,
    engine: '1.5L Turbo VTEC',
    transmission: 'CVT Automatic',
    mileage: '1,500 km',
    location: 'Lahore Showroom',
    image: '/assets/aistudio/images__39__3e46ddb2.jpg',
    gallery: ['/assets/aistudio/images__39__3e46ddb2.jpg', '/assets/aistudio/images__38__eba29146.jpg'],
    features: ['Hatchback Utility', 'Sport Exhaust', 'Wireless Apple CarPlay'],
    description: 'Dynamic Civic Sport offering versatile hatchback cargo capacity and exhilarating driving dynamics.'
  },
  {
    id: 'car-10',
    name: 'Toyota Corolla Altis 1.6 X CVT',
    category: 'sedan',
    section: 'showroom',
    type: 'Showroom Sale',
    price: 'PKR 7,950,000',
    year: 2024,
    engine: '1.6L Dual VVT-i',
    transmission: 'CVT Automatic',
    mileage: '4,000 km',
    location: 'Lahore Showroom',
    image: '/assets/aistudio/toyota-corolla-altis-1-6-x-cvt-i-special-edition-2023-156141458_e8edc949.webp',
    gallery: ['/assets/aistudio/toyota-corolla-altis-1-6-x-cvt-i-special-edition-2023-156141458_e8edc949.webp', '/assets/aistudio/images__23__a856ea59.jpg'],
    features: ['Sunroof', 'Push Start', 'Automatic Climate Control'],
    description: 'The benchmark of reliability and comfort. Factory inspected and certified.'
  },
  {
    id: 'car-11',
    name: 'Toyota Corolla Altis Grande 1.8',
    category: 'sedan',
    section: 'showroom',
    type: 'Showroom Sale',
    price: 'PKR 9,450,000',
    year: 2024,
    engine: '1.8L Dual VVT-i',
    transmission: 'CVT with Paddle Shifters',
    mileage: '2,500 km',
    location: 'Islamabad Showroom',
    image: '/assets/aistudio/Cover_59a2f9a4.jpg',
    gallery: ['/assets/aistudio/Cover_59a2f9a4.jpg', '/assets/aistudio/images__22__d6deedce.jpg'],
    features: ['VSC', 'Traction Control', 'Leather Interior'],
    description: 'Grande luxury sedan equipped with powerful 1.8L engine and plush leather interior.'
  },
  {
    id: 'car-12',
    name: 'Toyota Hilux Revo Executive Stock',
    category: 'pickup',
    section: 'showroom',
    type: 'Showroom Sale',
    price: 'PKR 19,800,000',
    year: 2024,
    engine: '2.8L GD Diesel',
    transmission: '6-Speed Automatic',
    mileage: '4,000 km',
    location: 'Multan Showroom',
    image: '/assets/aistudio/images__28__85dea723.jpg',
    gallery: ['/assets/aistudio/images__28__85dea723.jpg', '/assets/aistudio/images__27__f5b5281f.jpg'],
    features: ['Rear Differential Lock', 'Cruise Control', 'Touchscreen'],
    description: 'Factory fresh white Hilux Revo ready for commercial or private off-road utility.'
  },

  // --- CUSTOM BUILDS (15+ Items) ---
  {
    id: 'custom-1',
    name: 'Toyota Hilux Revo Rocco Custom 4x4',
    category: 'pickup',
    section: 'custom',
    type: 'Custom Built',
    price: 'PKR 24,800,000',
    year: 2025,
    engine: '2.8L High-Output GD Turbo',
    transmission: '6-Speed Sequential Auto',
    mileage: 'Custom Build',
    location: 'Multan Custom Studio',
    image: '/assets/aistudio/__-7_87095d56.jpg',
    gallery: ['/assets/aistudio/__-7_87095d56.jpg', '/assets/aistudio/images__32__6ae529d5.jpg'],
    features: ['Armored Front Bumper', 'Snorkel Air Intake', 'Custom Mud-Terrain Tires 20"'],
    description: 'Heavy-duty customized Toyota Hilux Revo built for extreme expeditions with professional armor plating.'
  },
  {
    id: 'custom-2',
    name: 'Honda Civic Custom Track Edition',
    category: 'sedan',
    section: 'custom',
    type: 'Custom Built',
    price: 'PKR 14,500,000',
    year: 2024,
    engine: '2.0L Turbo VTEC Modified',
    transmission: '6-Speed Manual / Paddle Shift',
    mileage: '800 km',
    location: 'Lahore Modification Studio',
    image: '/assets/aistudio/images__36__fb3319ac.jpg',
    gallery: ['/assets/aistudio/images__36__fb3319ac.jpg', '/assets/aistudio/images__35__ba9ad575.jpg'],
    features: ['Custom Acid Lime Wrap', 'Forged Alloy Monoblock Wheels', 'Performance Exhaust'],
    description: 'A masterpiece of custom automotive design crafted in our workshop with custom paintwork and track suspension.'
  },
  {
    id: 'custom-3',
    name: 'Toyota Hilux Revo Stealth Black',
    category: 'pickup',
    section: 'custom',
    type: 'Custom Built',
    price: 'PKR 22,500,000',
    year: 2024,
    engine: '2.8L GD Turbo',
    transmission: '6-Speed Auto',
    mileage: 'New Custom',
    location: 'Multan Custom Studio',
    image: '/assets/aistudio/images__29__1bdf997a.jpg',
    gallery: ['/assets/aistudio/images__29__1bdf997a.jpg', '/assets/aistudio/images__30__61a711e1.jpg'],
    features: ['Stealth Satin Black PPF', 'Off-Road Winch', 'Upgraded Bilstein Shocks'],
    description: 'Stealth black matte custom Revo built for uncompromising road presence and off-road dominance.'
  },
  {
    id: 'custom-4',
    name: 'Toyota Land Cruiser Prado Expedition Build',
    category: 'suv',
    section: 'custom',
    type: 'Custom Built',
    price: 'PKR 49,500,000',
    year: 2024,
    engine: '2.8L Twin Turbo Diesel',
    transmission: '8-Speed Auto 4WD',
    mileage: 'Custom Build',
    location: 'Islamabad Studio',
    image: '/assets/aistudio/images__9__759ee089.jpg',
    gallery: ['/assets/aistudio/images__9__759ee089.jpg', '/assets/aistudio/images__8__697c08d8.jpg'],
    features: ['Roof Rack & Tent', 'Auxiliary Fuel Tank', 'Heavy Duty Suspension'],
    description: 'Fully equipped expedition Prado built for northern mountain tours and long-range off-grid travel.'
  },
  {
    id: 'custom-5',
    name: 'Toyota Hilux Revo Snorkel Edition',
    category: 'pickup',
    section: 'custom',
    type: 'Custom Built',
    price: 'PKR 23,200,000',
    year: 2025,
    engine: '2.8L GD Turbo',
    transmission: 'Automatic 4WD',
    mileage: 'New Custom',
    location: 'Multan Custom Studio',
    image: '/assets/aistudio/images__31__b4c6bbaa.jpg',
    gallery: ['/assets/aistudio/images__31__b4c6bbaa.jpg', '/assets/aistudio/images__25__f14663eb.jpg'],
    features: ['Raised Snorkel Air Intake', 'Mud Terrain Tires', 'Custom Grille'],
    description: 'Water-wading ready Hilux Revo with professional snorkel and reinforced steel bash plates.'
  },
  {
    id: 'custom-6',
    name: 'Honda Civic Neon Speedster',
    category: 'sedan',
    section: 'custom',
    type: 'Custom Built',
    price: 'PKR 15,200,000',
    year: 2024,
    engine: '1.5L Turbo Tuned',
    transmission: 'CVT Sport',
    mileage: '500 km',
    location: 'Lahore Modification Studio',
    image: '/assets/aistudio/images__43__b0e70a01.jpg',
    gallery: ['/assets/aistudio/images__43__b0e70a01.jpg', '/assets/aistudio/images__41__dc7eb57b.jpg'],
    features: ['Neon Lime Accent Package', 'Carbon Hood', 'Lowering Springs'],
    description: 'Eye-catching street machine with custom body graphics and upgraded turbo boost mapping.'
  },
  {
    id: 'custom-7',
    name: 'Toyota Fortuner Off-Road Armor',
    category: 'suv',
    section: 'custom',
    type: 'Custom Built',
    price: 'PKR 25,000,000',
    year: 2024,
    engine: '2.8L Diesel 4WD',
    transmission: 'Automatic',
    mileage: 'Custom Build',
    location: 'Islamabad Studio',
    image: '/assets/aistudio/images__19__d7f6cf3e.jpg',
    gallery: ['/assets/aistudio/images__19__d7f6cf3e.jpg', '/assets/aistudio/images__18__065a9de8.jpg'],
    features: ['Steel Bullbar', 'LED Lightbar', 'All Terrain Rubber'],
    description: 'Fortuner customized with robust front bumper protection and auxiliary lighting.'
  },
  {
    id: 'custom-8',
    name: 'Toyota Hilux Revo Rugged Raider',
    category: 'pickup',
    section: 'custom',
    type: 'Custom Built',
    price: 'PKR 23,800,000',
    year: 2024,
    engine: '2.8L GD',
    transmission: 'Sequential Auto',
    mileage: 'New',
    location: 'Multan Custom Studio',
    image: '/assets/aistudio/fe6d1f813173736fcda33f9799be919b_ae38ae92.jpg',
    gallery: ['/assets/aistudio/fe6d1f813173736fcda33f9799be919b_ae38ae92.jpg', '/assets/aistudio/images__26__5d35a4b1.jpg'],
    features: ['Bed Rack', 'Side Steps', 'Custom Fender Flares'],
    description: 'Rugged raider edition featuring widened fender flares and heavy-duty cargo utility racks.'
  },
  {
    id: 'custom-9',
    name: 'Honda Civic Red RS Custom',
    category: 'sedan',
    section: 'custom',
    type: 'Custom Built',
    price: 'PKR 13,800,000',
    year: 2024,
    engine: '1.5L Turbo VTEC',
    transmission: 'CVT',
    mileage: '1,200 km',
    location: 'Lahore Modification Studio',
    image: '/assets/aistudio/images__40__1f0718ea.jpg',
    gallery: ['/assets/aistudio/images__40__1f0718ea.jpg', '/assets/aistudio/images__41__dc7eb57b.jpg'],
    features: ['Rally Red Finish', 'Blackout Trim', 'Sport Exhaust'],
    description: 'Custom finished in rally red with blackout chrome delete and sports tuned exhaust note.'
  },
  {
    id: 'custom-10',
    name: 'Toyota Hilux Revo Desert Stormer',
    category: 'pickup',
    section: 'custom',
    type: 'Custom Built',
    price: 'PKR 26,000,000',
    year: 2025,
    engine: '2.8L Twin Turbo',
    transmission: '6-Speed Auto',
    mileage: 'Custom Build',
    location: 'Multan Custom Studio',
    image: '/assets/aistudio/images__32__6ae529d5.jpg',
    gallery: ['/assets/aistudio/images__32__6ae529d5.jpg', '/assets/aistudio/images__29__1bdf997a.jpg'],
    features: ['Desert Sand Matte Wrap', 'Suspension Lift', 'Beadlock Wheels'],
    description: 'Engineered specifically for sand dune bashing and high-speed desert endurance racing.'
  },

  // --- VIP RENTALS (12+ Items) ---
  {
    id: 'rental-1',
    name: 'Honda Civic RS Turbo e-HEV (VIP Chauffeur)',
    category: 'sedan',
    section: 'rental',
    type: 'VIP Rental',
    price: 'PKR 11,200,000',
    rentalRate: 'PKR 25,000 / day',
    year: 2025,
    engine: '1.5L VTEC Turbocharged',
    transmission: 'CVT with Paddle Shifters',
    mileage: '3,500 km',
    location: 'Islamabad Fleet',
    image: '/assets/aistudio/Honda_Civic_e-HEV_Sport__XI____f_30062024_ba052ff6.jpg',
    gallery: ['/assets/aistudio/Honda_Civic_e-HEV_Sport__XI____f_30062024_ba052ff6.jpg', '/assets/aistudio/images__44__54501702.jpg'],
    features: ['Chauffeur Available', 'Wi-Fi On Board', 'Leather Seats'],
    description: 'Sleek sporty sedan with professional uniformed driver. Available for business meetings and airport transfers.'
  },
  {
    id: 'rental-2',
    name: 'Toyota Corolla Altis 1.6 X CVT (Rental)',
    category: 'sedan',
    section: 'rental',
    type: 'VIP Rental',
    price: 'PKR 7,950,000',
    rentalRate: 'PKR 18,000 / day',
    year: 2023,
    engine: '1.6L Dual VVT-i',
    transmission: 'CVT Automatic',
    mileage: '14,000 km',
    location: 'Lahore Fleet',
    image: '/assets/aistudio/toyota-corolla-altis-1-6-x-cvt-i-special-edition-2023-156141458_e8edc949.webp',
    gallery: ['/assets/aistudio/toyota-corolla-altis-1-6-x-cvt-i-special-edition-2023-156141458_e8edc949.webp', '/assets/aistudio/car_7267_822514_342720e3.jpg'],
    features: ['Sunroof', 'AC Climate Control', 'Chauffeur Driven'],
    description: 'The benchmark of reliability and comfort. Ideal for daily city commutes and family trips.'
  },
  {
    id: 'rental-3',
    name: 'Toyota Corolla Altis Grande 1.8 (VIP)',
    category: 'sedan',
    section: 'rental',
    type: 'VIP Rental',
    price: 'PKR 9,450,000',
    rentalRate: 'PKR 20,000 / day',
    year: 2024,
    engine: '1.8L Dual VVT-i',
    transmission: 'CVT Automatic',
    mileage: '5,000 km',
    location: 'Islamabad Fleet',
    image: '/assets/aistudio/images__23__a856ea59.jpg',
    gallery: ['/assets/aistudio/images__23__a856ea59.jpg', '/assets/aistudio/Cover_59a2f9a4.jpg'],
    features: ['Sunroof', 'Leather Interior', 'Rear AC Vents'],
    description: 'Grande luxury sedan equipped with powerful 1.8L engine and plush leather interior for VIP delegations.'
  },
  {
    id: 'rental-4',
    name: 'Toyota Land Cruiser Prado VIP Chauffeur',
    category: 'suv',
    section: 'rental',
    type: 'VIP Rental',
    price: 'PKR 45,500,000',
    rentalRate: 'PKR 55,000 / day',
    year: 2024,
    engine: '2.8L Turbo Diesel 4WD',
    transmission: '8-Speed Automatic',
    mileage: '1,200 km',
    location: 'Lahore & Islamabad Fleet',
    image: '/assets/aistudio/images__53__786b06a0.jpg',
    gallery: ['/assets/aistudio/images__53__786b06a0.jpg', '/assets/aistudio/images__48__83d55066.jpg'],
    features: ['Armored Option Available', 'Professional Security Driver', 'JBL Sound'],
    description: 'Ultimate VIP transport for high-profile guests, weddings, and official state delegations.'
  },
  {
    id: 'rental-5',
    name: 'Toyota Fortuner Legender Rental',
    category: 'suv',
    section: 'rental',
    type: 'VIP Rental',
    price: 'PKR 21,900,000',
    rentalRate: 'PKR 35,000 / day',
    year: 2025,
    engine: '2.8L Diesel 4WD',
    transmission: '6-Speed Auto',
    mileage: '500 km',
    location: 'Islamabad Fleet',
    image: '/assets/aistudio/images__3__8f6f1955.jpg',
    gallery: ['/assets/aistudio/images__3__8f6f1955.jpg', '/assets/aistudio/images__14__3e706ff1.jpg'],
    features: ['4WD Capability', 'Leather Seats', 'Chauffeur Included'],
    description: 'Commanding SUV rental ideal for northern tours and executive road travel.'
  },
  {
    id: 'rental-6',
    name: 'Toyota Hilux Revo Rental Fleet',
    category: 'pickup',
    section: 'rental',
    type: 'VIP Rental',
    price: 'PKR 19,800,000',
    rentalRate: 'PKR 28,000 / day',
    year: 2024,
    engine: '2.8L GD Turbo',
    transmission: 'Automatic 4WD',
    mileage: '4,000 km',
    location: 'Multan & Lahore Fleet',
    image: '/assets/aistudio/images__28__85dea723.jpg',
    gallery: ['/assets/aistudio/images__28__85dea723.jpg', '/assets/aistudio/images__27__f5b5281f.jpg'],
    features: ['Rugged 4WD', 'Spacious Bed', 'Experienced Driver'],
    description: 'Reliable 4x4 pickup rental for survey teams, film crews, and adventure expeditions.'
  },
  {
    id: 'rental-7',
    name: 'Honda Civic Executive Chauffeur',
    category: 'sedan',
    section: 'rental',
    type: 'VIP Rental',
    price: 'PKR 11,200,000',
    rentalRate: 'PKR 22,000 / day',
    year: 2024,
    engine: '1.5L Turbo',
    transmission: 'CVT',
    mileage: '8,000 km',
    location: 'Lahore Fleet',
    image: '/assets/aistudio/Honda_Civic_e-HEV_Sport__XI____f_30062024_ba052ff6.jpg',
    gallery: ['/assets/aistudio/Honda_Civic_e-HEV_Sport__XI____f_30062024_ba052ff6.jpg', '/assets/aistudio/images__13__3bbe0186.jpg'],
    features: ['Clean Interior', 'Uniformed Driver', 'Mineral Water Provided'],
    description: 'Executive Civic rental tailored for corporate clients and airport pick-ups.'
  },
  {
    id: 'rental-8',
    name: 'Toyota Corolla Altis Special Edition Rental',
    category: 'sedan',
    section: 'rental',
    type: 'VIP Rental',
    price: 'PKR 8,200,000',
    rentalRate: 'PKR 17,000 / day',
    year: 2023,
    engine: '1.6L VVT-i',
    transmission: 'Automatic',
    mileage: '12,000 km',
    location: 'Islamabad Fleet',
    image: '/assets/aistudio/images__21__956d2a96.jpg',
    gallery: ['/assets/aistudio/images__21__956d2a96.jpg', '/assets/aistudio/images__20__d7f6cf3e.jpg'],
    features: ['Sunroof', 'Alloy Rims', 'Comfort Suspension'],
    description: 'Affordable luxury rental option for everyday business travel and city tours.'
  },

  // --- EXCLUSIVE ARCHIVE (12+ Items) ---
  {
    id: 'archive-1',
    name: 'Toyota Land Cruiser Prado TX Limited Archive',
    category: 'suv',
    section: 'archive',
    type: 'Showroom Sale',
    price: 'PKR 44,000,000',
    year: 2024,
    engine: '2.8L Turbo Diesel',
    transmission: 'Automatic 4WD',
    mileage: '2,000 km',
    location: 'Lahore Showroom',
    image: '/assets/aistudio/images__47__f3105da3.jpg',
    gallery: ['/assets/aistudio/images__47__f3105da3.jpg', '/assets/aistudio/images__46__79298340.jpg'],
    features: ['Adaptive Suspension', 'Crawl Control', 'Multi-Terrain Monitor'],
    description: 'Pristine limited edition Prado with premium trim and comprehensive dealership inspection certificate.'
  },
  {
    id: 'archive-2',
    name: 'Honda Civic Sport Hatchback Archive',
    category: 'sedan',
    section: 'archive',
    type: 'Showroom Sale',
    price: 'PKR 12,500,000',
    year: 2025,
    engine: '1.5L Turbo VTEC',
    transmission: 'CVT Automatic',
    mileage: '1,500 km',
    location: 'Islamabad Showroom',
    image: '/assets/aistudio/images__39__3e46ddb2.jpg',
    gallery: ['/assets/aistudio/images__39__3e46ddb2.jpg', '/assets/aistudio/images__38__eba29146.jpg'],
    features: ['Hatchback Utility', 'Sport Exhaust', 'LED Headlights'],
    description: 'Dynamic Civic Sport offering versatile hatchback cargo capacity and exhilarating driving dynamics.'
  },
  {
    id: 'archive-3',
    name: 'Toyota Hilux Revo Executive Stock Archive',
    category: 'pickup',
    section: 'archive',
    type: 'Showroom Sale',
    price: 'PKR 19,800,000',
    year: 2024,
    engine: '2.8L GD Diesel',
    transmission: '6-Speed Automatic',
    mileage: '4,000 km',
    location: 'Multan Showroom',
    image: '/assets/aistudio/images__28__85dea723.jpg',
    gallery: ['/assets/aistudio/images__28__85dea723.jpg', '/assets/aistudio/images__27__f5b5281f.jpg'],
    features: ['Differential Lock', 'Cruise Control', 'Touchscreen'],
    description: 'Factory fresh white Hilux Revo ready for commercial or private off-road utility.'
  },
  {
    id: 'archive-4',
    name: 'Toyota Fortuner White Pearl Archive',
    category: 'suv',
    section: 'archive',
    type: 'Showroom Sale',
    price: 'PKR 20,500,000',
    year: 2024,
    engine: '2.8L Diesel',
    transmission: 'Automatic',
    mileage: '5,000 km',
    location: 'Lahore Showroom',
    image: '/assets/aistudio/0_1791643608805_medium_8b85e0f1.jpg',
    gallery: ['/assets/aistudio/0_1791643608805_medium_8b85e0f1.jpg', '/assets/aistudio/images__15__4f3b7b55.jpg'],
    features: ['7-Seater', 'Power Tailgate', 'Leather Seats'],
    description: 'Classic white Fortuner offering dependable family luxury and rugged four-wheel drive.'
  },
  {
    id: 'archive-5',
    name: 'Toyota Land Cruiser Prado Supreme Archive',
    category: 'suv',
    section: 'archive',
    type: 'Showroom Sale',
    price: 'PKR 48,000,000',
    year: 2025,
    engine: '2.8L Turbo Diesel',
    transmission: '8-Speed Auto',
    mileage: 'New',
    location: 'Islamabad Hub',
    image: '/assets/aistudio/images__10__88e39fe7.jpg',
    gallery: ['/assets/aistudio/images__10__88e39fe7.jpg', '/assets/aistudio/images__11__efa3d697.jpg'],
    features: ['Supreme Badge', 'JBL Audio', 'Sunroof'],
    description: 'Ultimate showroom grade Land Cruiser Prado with full dealer warranty and immaculate finish.'
  },
  {
    id: 'archive-6',
    name: 'Honda Civic Blue Metallic Archive',
    category: 'sedan',
    section: 'archive',
    type: 'Showroom Sale',
    price: 'PKR 11,800,000',
    year: 2024,
    engine: '1.5L VTEC Turbo',
    transmission: 'CVT',
    mileage: '3,000 km',
    location: 'Lahore Showroom',
    image: '/assets/aistudio/images__34__ba4623aa.jpg',
    gallery: ['/assets/aistudio/images__34__ba4623aa.jpg', '/assets/aistudio/images__33__e9367b02.jpg'],
    features: ['Blue Metallic Paint', 'Alloy Wheels', 'Honda Sensing'],
    description: 'Striking blue metallic Civic sedan with complete dealership documentation and pristine care.'
  }
];

// Complete archive of all 61 uploaded images
const ALL_UPLOADED_IMAGES = [
  { url: '/assets/aistudio/images__53__786b06a0.jpg', title: 'Land Cruiser Prado White' },
  { url: '/assets/aistudio/images__52__f2667806.jpg', title: 'Prado Front View Grill' },
  { url: '/assets/aistudio/images__51__12ed2fcc.jpg', title: 'Prado Rear Profile' },
  { url: '/assets/aistudio/images__50__ccdecf3e.jpg', title: 'Prado Palm Sunset' },
  { url: '/assets/aistudio/images__49__a7075f89.jpg', title: 'Prado Urban White' },
  { url: '/assets/aistudio/images__48__83d55066.jpg', title: 'Prado Showroom Floor' },
  { url: '/assets/aistudio/images__47__f3105da3.jpg', title: 'Prado Red Garage' },
  { url: '/assets/aistudio/images__46__79298340.jpg', title: 'Prado Daylight Drive' },
  { url: '/assets/aistudio/images__45__9de3530f.jpg', title: 'Honda Civic Black Front' },
  { url: '/assets/aistudio/images__44__54501702.jpg', title: 'Civic Mountain Road' },
  { url: '/assets/aistudio/images__43__b0e70a01.jpg', title: 'Civic Neon Lime Track' },
  { url: '/assets/aistudio/images__42__6fad1d96.jpg', title: 'Civic Warehouse Studio' },
  { url: '/assets/aistudio/images__41__dc7eb57b.jpg', title: 'Civic Red Sport Edition' },
  { url: '/assets/aistudio/images__40__1f0718ea.jpg', title: 'Civic Red RS Angle' },
  { url: '/assets/aistudio/images__39__3e46ddb2.jpg', title: 'Civic Blue Drive' },
  { url: '/assets/aistudio/images__38__eba29146.jpg', title: 'Civic Grey Countryside' },
  { url: '/assets/aistudio/images__37__9edababa.jpg', title: 'Civic Grey Dynamic' },
  { url: '/assets/aistudio/images__36__fb3319ac.jpg', title: 'Civic Blue Metallic' },
  { url: '/assets/aistudio/images__35__ba9ad575.jpg', title: 'Civic Arnold Clark Edition' },
  { url: '/assets/aistudio/images__34__ba4623aa.jpg', title: 'Civic Urban White' },
  { url: '/assets/aistudio/images__33__e9367b02.jpg', title: 'Hilux Revo Black 4x4' },
  { url: '/assets/aistudio/images__32__6ae529d5.jpg', title: 'Revo Off-Road Armor' },
  { url: '/assets/aistudio/images__31__b4c6bbaa.jpg', title: 'Revo Snorkel Edition' },
  { url: '/assets/aistudio/images__30__61a711e1.jpg', title: 'Revo Multan Boulevard' },
  { url: '/assets/aistudio/images__29__1bdf997a.jpg', title: 'Revo Matte Black Custom' },
  { url: '/assets/aistudio/fe6d1f813173736fcda33f9799be919b_ae38ae92.jpg', title: 'Revo Rugged Build' },
  { url: '/assets/aistudio/images__28__85dea723.jpg', title: 'Hilux White Stock' },
  { url: '/assets/aistudio/images__27__f5b5281f.jpg', title: 'Hilux Urban Park' },
  { url: '/assets/aistudio/images__26__5d35a4b1.jpg', title: 'Hilux Studio White' },
  { url: '/assets/aistudio/images__25__f14663eb.jpg', title: 'Hilux Open Doors' },
  { url: '/assets/aistudio/images__24__fd375a0d.jpg', title: 'Hilux White Glass House' },
  { url: '/assets/aistudio/images__23__a856ea59.jpg', title: 'Corolla Altis White Islamabad' },
  { url: '/assets/aistudio/images__22__d6deedce.jpg', title: 'Corolla Altis SE Lahore' },
  { url: '/assets/aistudio/car_7267_822514_342720e3.jpg', title: 'Corolla Shani Travels' },
  { url: '/assets/aistudio/Cover_59a2f9a4.jpg', title: 'Corolla Sunroof White' },
  { url: '/assets/aistudio/images__21__956d2a96.jpg', title: 'Corolla Hi-Tech Motors' },
  { url: '/assets/aistudio/images__20__d7f6cf3e.jpg', title: 'Corolla Al Ghani Motors' },
  { url: '/assets/aistudio/0_1791643608805_medium_8b85e0f1.jpg', title: 'Fortuner White Front' },
  { url: '/assets/aistudio/images__19__d7f6cf3e.jpg', title: 'Fortuner Off-Road Trail' },
  { url: '/assets/aistudio/images__18__065a9de8.jpg', title: 'Fortuner 2025 Edition' },
  { url: '/assets/aistudio/images__17__f4d929ab.jpg', title: 'Fortuner Mountain Sunset' },
  { url: '/assets/aistudio/images__16__2e3abe12.jpg', title: 'Fortuner Cityscape Qatar' },
  { url: '/assets/aistudio/images__15__4f3b7b55.jpg', title: 'Fortuner Dubai Skyline' },
  { url: '/assets/aistudio/images__14__3e706ff1.jpg', title: 'Fortuner Legender Black Roof' },
  { url: '/assets/aistudio/__-7_87095d56.jpg', title: 'Fortuner Studio Launch' },
  { url: '/assets/aistudio/images__13__3bbe0186.jpg', title: 'Civic White Sport' },
  { url: '/assets/aistudio/toyota-corolla-altis-1-6-x-cvt-i-special-edition-2023-156141458_e8edc949.webp', title: 'Corolla Altis Special Edition' },
  { url: '/assets/aistudio/images__12__d4800a4e.jpg', title: 'Showroom Interior Fleet' },
  { url: '/assets/aistudio/images__11__efa3d697.jpg', title: 'Prado Rear Spoiler' },
  { url: '/assets/aistudio/images__10__88e39fe7.jpg', title: 'Prado Supreme Badge' },
  { url: '/assets/aistudio/images__9__759ee089.jpg', title: 'Prado Offroad Dust' },
  { url: '/assets/aistudio/images__8__697c08d8.jpg', title: 'Prado Front LED' },
  { url: '/assets/aistudio/images__7__c8f3c41f.jpg', title: 'Prado Rear Hitch' },
  { url: '/assets/aistudio/images__6__54b585d5.jpg', title: 'Prado Palm Trees' },
  { url: '/assets/aistudio/images__5__a48d9989.jpg', title: 'Prado Urban White' },
  { url: '/assets/aistudio/images__4__93c11ace.jpg', title: 'Carzone Islamabad' },
  { url: '/assets/aistudio/images__3__8f6f1955.jpg', title: 'Prado Showroom Staff' },
  { url: '/assets/aistudio/images__2__8f6497e4.jpg', title: 'TikTok Showroom View' },
  { url: '/assets/aistudio/images__1__feeb1bc2.jpg', title: 'Red Gears Auto Shop' },
  { url: '/assets/aistudio/images_71b7aa03.jpg', title: 'Corolla Sunset View' },
  { url: '/assets/aistudio/Honda_Civic_e-HEV_Sport__XI____f_30062024_ba052ff6.jpg', title: 'Honda Civic e-HEV Sport' }
];

// Exactly 4 distinct uploaded car images for the 5-second rotating hero card
const HERO_ROTATING_CARS = [
  {
    name: 'Toyota Land Cruiser Prado TX/VX',
    location: 'Lahore Showroom',
    mileage: '1,200 km',
    price: 'PKR 45,500,000',
    image: '/assets/aistudio/images__53__786b06a0.jpg' // Prado
  },
  {
    name: 'Toyota Hilux Revo Rocco Custom 4x4',
    location: 'Multan Custom Studio',
    mileage: 'New Custom Build',
    price: 'PKR 24,800,000',
    image: '/assets/aistudio/__-7_87095d56.jpg' // Revo 4x4
  },
  {
    name: 'Honda Civic RS Turbo e-HEV',
    location: 'Islamabad Showroom',
    mileage: '3,500 km',
    price: 'PKR 11,200,000',
    image: '/assets/aistudio/Honda_Civic_e-HEV_Sport__XI____f_30062024_ba052ff6.jpg' // Civic
  },
  {
    name: 'Toyota Fortuner Legender 4x4',
    location: 'Islamabad Showroom',
    mileage: '500 km',
    price: 'PKR 21,900,000',
    image: '/assets/aistudio/images__3__8f6f1955.jpg' // Fortuner
  }
];

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'showroom' | 'custom' | 'rental' | 'archive' | 'contact'>('showroom');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleItem | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [heroIndex, setHeroIndex] = useState<number>(0);

  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [bookingCar, setBookingCar] = useState<string>('');
  const [bookingSubmitted, setBookingSubmitted] = useState<boolean>(false);
  
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'General Showroom Inquiry',
    message: ''
  });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    location: 'Lahore Showroom',
    notes: ''
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_ROTATING_CARS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  const currentVehicles = ALL_VEHICLES_CATALOG.filter(v => v.section === activeTab);
  const currentHeroCar = HERO_ROTATING_CARS[heroIndex];

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('contacts').insert([
        {
          name: contactForm.name,
          email: contactForm.email,
          project_type: contactForm.subject,
          message: contactForm.message
        }
      ]);
      if (error) {
        console.error('Supabase contact insert error:', error);
      }
    } catch (err) {
      console.error('Supabase connection error:', err);
    }
    setContactSubmitted(true);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('contacts').insert([
        {
          name: formData.name,
          email: formData.email || 'no-email@apexmotors.pk',
          project_type: `Booking: ${bookingCar} (${formData.location})`,
          message: `Phone: ${formData.phone}, Date: ${formData.date}, Notes: ${formData.notes}`
        }
      ]);
      if (error) {
        console.error('Supabase booking insert error:', error);
      }
    } catch (err) {
      console.error('Supabase connection error:', err);
    }

    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
      setBookingModalOpen(false);
      setFormData({ name: '', phone: '', email: '', date: '', location: 'Lahore Showroom', notes: '' });
    }, 3000);
  };

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-white text-slate-900'}`}>
      
      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-8 px-6 lg:px-12 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md">
        
        <a href="#" className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 flex items-center gap-3">
          <img 
            src="/assets/aistudio/e99b0a5d-c567-490a-b228-d5901c1cd1f3_8749d931.jpg" 
            alt="ASAD Logo" 
            className="w-10 h-10 object-cover rounded-xl border border-amber-500/40 shadow-sm"
            referrerPolicy="no-referrer"
          />
          <span>Apex Motors & Customs</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button 
            onClick={() => setActiveTab('showroom')} 
            className={`transition-colors whitespace-nowrap shrink-0 ${activeTab === 'showroom' ? 'text-amber-600 font-semibold' : 'hover:text-slate-900 dark:hover:text-white'}`}
          >
            Showroom Sale ({ALL_VEHICLES_CATALOG.filter(v => v.section === 'showroom').length})
          </button>
          <button 
            onClick={() => setActiveTab('custom')} 
            className={`transition-colors whitespace-nowrap shrink-0 ${activeTab === 'custom' ? 'text-amber-600 font-semibold' : 'hover:text-slate-900 dark:hover:text-white'}`}
          >
            Custom Builds ({ALL_VEHICLES_CATALOG.filter(v => v.section === 'custom').length})
          </button>
          <button 
            onClick={() => setActiveTab('rental')} 
            className={`transition-colors whitespace-nowrap shrink-0 ${activeTab === 'rental' ? 'text-amber-600 font-semibold' : 'hover:text-slate-900 dark:hover:text-white'}`}
          >
            VIP Fleet Rental ({ALL_VEHICLES_CATALOG.filter(v => v.section === 'rental').length})
          </button>
          <button 
            onClick={() => setActiveTab('archive')} 
            className={`transition-colors whitespace-nowrap shrink-0 ${activeTab === 'archive' ? 'text-amber-600 font-semibold' : 'hover:text-slate-900 dark:hover:text-white'}`}
          >
            Archive & Thumbnails ({ALL_UPLOADED_IMAGES.length})
          </button>
          <button 
            onClick={() => setActiveTab('contact')} 
            className={`transition-colors whitespace-nowrap shrink-0 ${activeTab === 'contact' ? 'text-amber-600 font-semibold' : 'hover:text-slate-900 dark:hover:text-white'}`}
          >
            Contact Us
          </button>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <button 
            onClick={() => { setBookingCar('General Test Drive / Inquiry'); setBookingModalOpen(true); }}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-amber-600 rounded-lg hover:bg-slate-800 dark:hover:bg-amber-700 transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            Book Visit
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-20 lg:py-24 px-6 lg:px-12 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-900/50">
              <Award className="w-3.5 h-3.5" />
              <span>4 Distinct Cars Auto-Rotating Every 5 Seconds</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white text-wrap balance leading-[1.1]">
              Elite Showroom, Custom 4x4 Builds & VIP Fleet.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              The card on the right automatically rotates between 4 distinct flagship cars from your uploaded images every 5 seconds with smooth fade-in animations.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button 
                onClick={() => setActiveTab('showroom')}
                className={`px-5 py-2.5 text-xs font-semibold rounded-xl transition-all ${activeTab === 'showroom' ? 'bg-amber-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'}`}
              >
                Showroom Sale
              </button>
              <button 
                onClick={() => setActiveTab('custom')}
                className={`px-5 py-2.5 text-xs font-semibold rounded-xl transition-all ${activeTab === 'custom' ? 'bg-amber-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'}`}
              >
                Custom Builds
              </button>
              <button 
                onClick={() => setActiveTab('rental')}
                className={`px-5 py-2.5 text-xs font-semibold rounded-xl transition-all ${activeTab === 'rental' ? 'bg-amber-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'}`}
              >
                VIP Fleet Rental
              </button>
            </div>
          </div>

          {/* 5-Second Rotating Card with 4 distinct uploaded car images */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-slate-900 rounded-3xl blur-lg opacity-25"></div>
            
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500">
              <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={heroIndex}
                    src={currentHeroCar.image} 
                    alt={currentHeroCar.name} 
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="w-full h-full object-cover object-center absolute inset-0"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>

                <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1 rounded-md">
                  Rotating Flagship {heroIndex + 1} of 4 (Changes every 5s)
                </div>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
                  {HERO_ROTATING_CARS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setHeroIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all ${heroIndex === idx ? 'w-6 bg-amber-500' : 'w-2 bg-white/60'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>{currentHeroCar.location}</span>
                  <span>{currentHeroCar.mileage}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {currentHeroCar.name}
                </h3>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500">Price / Rate</p>
                    <p className="text-lg font-extrabold font-mono text-slate-900 dark:text-white">
                      {currentHeroCar.price}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => { setBookingCar(currentHeroCar.name); setBookingModalOpen(true); }}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 dark:bg-amber-600 rounded-xl hover:bg-slate-800 dark:hover:bg-amber-700 transition-colors shadow-sm"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FULL CAR CARDS SECTION WITH STAGGERED FADE-IN ANIMATION */}
      <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 pb-6 border-b border-slate-200 dark:border-slate-800 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400">
              {activeTab === 'contact' ? 'Get In Touch' : 'Detailed Inventory View'}
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white capitalize mt-1">
              {activeTab === 'showroom' ? `Showroom Sales (${currentVehicles.length} Vehicles)` :
               activeTab === 'custom' ? `Custom 4x4 Builds (${currentVehicles.length} Vehicles)` :
               activeTab === 'rental' ? `VIP Fleet Rentals (${currentVehicles.length} Vehicles)` : 
               activeTab === 'archive' ? `Exclusive Archive (${currentVehicles.length} Vehicles)` :
               'Customer Support & Inquiries'}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <button 
              onClick={() => setActiveTab('showroom')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${activeTab === 'showroom' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
            >
              Showroom Sale ({ALL_VEHICLES_CATALOG.filter(v => v.section === 'showroom').length})
            </button>
            <button 
              onClick={() => setActiveTab('custom')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${activeTab === 'custom' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
            >
              Custom Built ({ALL_VEHICLES_CATALOG.filter(v => v.section === 'custom').length})
            </button>
            <button 
              onClick={() => setActiveTab('rental')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${activeTab === 'rental' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
            >
              VIP Rental ({ALL_VEHICLES_CATALOG.filter(v => v.section === 'rental').length})
            </button>
            <button 
              onClick={() => setActiveTab('archive')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${activeTab === 'archive' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
            >
              Archive
            </button>
            <button 
              onClick={() => setActiveTab('contact')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${activeTab === 'contact' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
            >
              Contact Us
            </button>
          </div>
        </div>

        {activeTab === 'contact' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information & Showroom Hubs */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Get in Touch With Our Specialists</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Whether you are looking to purchase a showroom flagship, commission a custom 4x4 modification, or book a VIP fleet rental, our team is ready to assist you.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <Mail className="w-6 h-6 text-amber-600 mb-3" />
                  <h4 className="font-bold text-slate-900 dark:text-white">Email Inquiries</h4>
                  <p className="text-xs text-slate-500 mt-1">24/7 Response</p>
                  <p className="text-sm font-mono font-semibold text-slate-900 dark:text-white mt-2">contact@apexmotors.pk</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Showroom Locations</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-sm text-slate-900 dark:text-white">Lahore Flagship Showroom</p>
                      <p className="text-xs text-slate-500 mt-0.5">Main Boulevard Gulberg III, Lahore</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-sm text-slate-900 dark:text-white">Islamabad Hub</p>
                      <p className="text-xs text-slate-500 mt-0.5">Blue Area, Jinnah Avenue, Islamabad</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-sm text-slate-900 dark:text-white">Multan Modification Studio</p>
                      <p className="text-xs text-slate-500 mt-0.5">Maulana Shaukat Ali Rd, Faisal Town, Multan</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Send Us a Message</h3>
              <p className="text-xs text-slate-500 mb-6">Fill out the form below and our customer executive will get back to you promptly.</p>

              {contactSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">Message Sent Successfully!</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Thank you for reaching out. We have received your message and will contact you within 30 minutes.
                  </p>
                  <button 
                    onClick={() => setContactSubmitted(false)}
                    className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 dark:bg-amber-600 rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Your Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      placeholder="e.g. Asad Shahnawaz"
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      placeholder="asad@example.com"
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Inquiry Subject</label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="General Showroom Inquiry">General Showroom Inquiry</option>
                      <option value="Custom 4x4 Build Quote">Custom 4x4 Build Quote</option>
                      <option value="VIP Fleet Rental Booking">VIP Fleet Rental Booking</option>
                      <option value="Dealership Partnership">Dealership Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Your Message</label>
                    <textarea 
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      placeholder="Type your requirements or questions here..."
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3 text-xs font-bold text-white bg-slate-900 dark:bg-amber-600 rounded-xl hover:bg-slate-800 dark:hover:bg-amber-700 transition-colors shadow-sm"
                  >
                    Send a Message
                  </button>
                </form>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentVehicles.map((car, index) => (
              <motion.div 
                key={car.id} 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md text-white shadow-sm ${
                      car.type === 'Showroom Sale' ? 'bg-blue-600' : car.type === 'Custom Built' ? 'bg-amber-600' : 'bg-emerald-600'
                    }`}>
                      {car.type}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-mono font-bold">
                    {car.year}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                      <span>{car.location}</span>
                      <span>{car.mileage}</span>
                    </div>

                    <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                      {car.name}
                    </h4>

                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">
                      {car.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500">Price / Rate</p>
                      <p className="text-lg font-extrabold font-mono text-slate-900 dark:text-white">
                        {car.price}
                      </p>
                      {car.rentalRate && (
                        <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Or {car.rentalRate}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 w-full pt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedVehicle(car)}
                          className="flex-1 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => { setBookingCar(car.name); setBookingModalOpen(true); }}
                          className="flex-1 py-2 text-xs font-semibold bg-slate-900 dark:bg-amber-600 text-white rounded-xl hover:bg-slate-800 dark:hover:bg-amber-700 transition-colors"
                        >
                          Book
                        </button>
                      </div>
                      <button
                        onClick={() => { setBookingCar(car.name); setBookingModalOpen(true); }}
                        className="w-full py-2 text-xs font-semibold bg-amber-500 text-slate-950 rounded-xl hover:bg-amber-400 transition-colors shadow-sm"
                      >
                        Send a Message
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'archive' && (
          <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Complete Photo Archive ({ALL_UPLOADED_IMAGES.length} Images)</h3>
              <p className="text-xs text-slate-500 mt-1">Every single image you provided is displayed below in high-resolution card view.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {ALL_UPLOADED_IMAGES.map((img, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: (idx % 12) * 0.04 }}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col"
                >
                  <div 
                    onClick={() => setLightboxImage(img.url)}
                    className="relative aspect-square cursor-pointer overflow-hidden bg-slate-100 dark:bg-slate-800"
                  >
                    <img 
                      src={img.url} 
                      alt={img.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                    <p className="text-xs font-medium text-slate-800 dark:text-slate-200 line-clamp-1">{img.title}</p>
                    <button
                      onClick={() => { setBookingCar(img.title); setBookingModalOpen(true); }}
                      className="w-full py-1.5 text-[11px] font-semibold bg-amber-500 text-slate-950 rounded-lg hover:bg-amber-400 transition-colors shadow-sm"
                    >
                      Send a Message
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* LOCATIONS SECTION */}
      <section className="py-16 px-6 lg:px-12 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400">Showroom Hubs</h2>
            <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">Visit Our Dealerships</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm">
              <MapPin className="w-6 h-6 text-amber-600 mb-3" />
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">Lahore Flagship</h4>
              <p className="text-xs font-mono text-amber-600 mt-1">Main Boulevard Gulberg III</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-3">Primary showroom housing flagship Prado, Fortuner, and luxury sedan inventories.</p>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm">
              <MapPin className="w-6 h-6 text-amber-600 mb-3" />
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">Islamabad Hub</h4>
              <p className="text-xs font-mono text-amber-600 mt-1">Blue Area, Jinnah Avenue</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-3">Serving diplomatic delegations, northern expedition rentals, and premium car sales.</p>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm">
              <MapPin className="w-6 h-6 text-amber-600 mb-3" />
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">Multan Workshop</h4>
              <p className="text-xs font-mono text-amber-600 mt-1">Maulana Shaukat Ali Rd, Faisal Town</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-3">Elite custom modification studio and regional distribution center.</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE PROFESSIONAL FOOTER FOR ALL PAGES */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 pt-16 pb-12 px-6 lg:px-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 text-white font-bold text-xl">
              <img 
                src="/assets/aistudio/e99b0a5d-c567-490a-b228-d5901c1cd1f3_8749d931.jpg" 
                alt="ASAD Logo" 
                className="w-10 h-10 object-cover rounded-xl border border-amber-500/40 shadow-sm"
                referrerPolicy="no-referrer"
              />
              <span>Apex Motors & Customs</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Pakistan's premier automotive showroom, custom 4x4 modification studio, and VIP fleet rental provider. Showcasing elite inventory with precision craftsmanship.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-900/50">
                {ALL_VEHICLES_CATALOG.length} Vehicles & {ALL_UPLOADED_IMAGES.length} Image Archive
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Showroom Catalog</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => { setActiveTab('showroom'); window.scrollTo({ top: 900, behavior: 'smooth' }); }} className="hover:text-amber-400 transition-colors">
                  Showroom Sale
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('custom'); window.scrollTo({ top: 900, behavior: 'smooth' }); }} className="hover:text-amber-400 transition-colors">
                  Custom 4x4 Builds
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('rental'); window.scrollTo({ top: 900, behavior: 'smooth' }); }} className="hover:text-amber-400 transition-colors">
                  VIP Fleet Rental
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('archive'); window.scrollTo({ top: 900, behavior: 'smooth' }); }} className="hover:text-amber-400 transition-colors">
                  Complete Image Archive
                </button>
              </li>
            </ul>
          </div>

          {/* Showroom Hubs */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Showroom Hubs</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Lahore: Main Gulberg III</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Islamabad: Blue Area</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Multan: Faisal Town</span>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Stay Updated</h4>
            <p className="text-xs text-slate-400">Subscribe for exclusive custom build drops and VIP fleet availability.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully to Apex Motors updates!'); }} className="space-y-2">
              <input 
                type="email" 
                required
                placeholder="Enter your email" 
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <button 
                type="submit"
                className="w-full py-2 text-xs font-semibold text-slate-900 bg-amber-500 rounded-xl hover:bg-amber-400 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Apex Motors & Customs. All rights reserved. Built with precision and elegance.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Dealer Portal</a>
          </div>
        </div>
      </footer>

      {/* LIGHTBOX MODAL */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={lightboxImage} 
              alt="High-resolution vehicle view" 
              className="max-h-[85vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

      {/* VEHICLE DETAILS MODAL */}
      {selectedVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="relative h-72 sm:h-96 bg-slate-100 dark:bg-slate-800">
              <img 
                src={selectedVehicle.image} 
                alt={selectedVehicle.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => setSelectedVehicle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="text-xs font-semibold px-3 py-1 rounded-md bg-amber-600 text-white">
                  {selectedVehicle.type}
                </span>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedVehicle.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{selectedVehicle.location} • Year {selectedVehicle.year}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">{selectedVehicle.price}</p>
                  {selectedVehicle.rentalRate && (
                    <p className="text-xs text-amber-600 font-medium">Rental: {selectedVehicle.rentalRate}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-200 dark:border-slate-800">
                <div>
                  <p className="text-xs text-slate-500">Engine</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">{selectedVehicle.engine}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Transmission</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">{selectedVehicle.transmission}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Mileage</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">{selectedVehicle.mileage}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Vehicle Overview</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{selectedVehicle.description}</p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Key Features & Equipment</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedVehicle.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setSelectedVehicle(null)}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const name = selectedVehicle.name;
                    setSelectedVehicle(null);
                    setBookingCar(name);
                    setBookingModalOpen(true);
                  }}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 dark:bg-amber-600 rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Book Test Drive / Inspect
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-8 shadow-2xl relative">
            <button 
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">Appointment & Inquiry</span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">Book Test Drive / Custom Quote</h3>
              <p className="text-xs text-slate-500 mt-1">Vehicle/Service: <span className="font-semibold text-slate-900 dark:text-white">{bookingCar}</span></p>
            </div>

            {bookingSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Booking Confirmed Successfully!</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Our showroom consultant will contact you via phone/WhatsApp within 30 minutes to finalize your visit.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Asad Shahnawaz"
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Phone / WhatsApp</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+92 300 1234567"
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Preferred Date</label>
                    <input 
                      type="date" 
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Showroom Location</label>
                  <select 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Lahore Showroom">Lahore Showroom (Gulberg III)</option>
                    <option value="Islamabad Hub">Islamabad Hub (Blue Area)</option>
                    <option value="Multan Workshop">Multan Workshop (Faisal Town)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Additional Notes / Custom Requirements</label>
                  <textarea 
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Specify any trade-in vehicle or custom accessories..."
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(false)}
                    className="px-5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 dark:bg-amber-600 rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
