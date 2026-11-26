/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

-- =========================================================================
-- APEX MOTORS & CUSTOMS - SUPABASE / POSTGRESQL DATABASE SCHEMA
-- =========================================================================

-- 1. VEHICLES TABLE
CREATE TABLE IF NOT EXISTS public.vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('suv', 'sedan', 'pickup')),
    section TEXT NOT NULL CHECK (section IN ('showroom', 'custom', 'rental', 'archive')),
    type TEXT NOT NULL CHECK (type IN ('Showroom Sale', 'Custom Built', 'VIP Rental')),
    price TEXT NOT NULL,
    rental_rate TEXT,
    year INTEGER NOT NULL,
    engine TEXT NOT NULL,
    transmission TEXT NOT NULL,
    mileage TEXT NOT NULL,
    location TEXT NOT NULL,
    image TEXT NOT NULL,
    gallery TEXT[] DEFAULT '{}',
    features TEXT[] DEFAULT '{}',
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. BOOKINGS & INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_name TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    booking_date DATE NOT NULL,
    location TEXT NOT NULL,
    notes TEXT,
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Completed', 'Cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. IMAGE ARCHIVE TABLE (For all 61 uploaded car images)
CREATE TABLE IF NOT EXISTS public.image_archive (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.image_archive ENABLE ROW LEVEL SECURITY;

-- Allow public read access to vehicles and image archive
CREATE POLICY "Allow public read access to vehicles" ON public.vehicles
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to image archive" ON public.image_archive
    FOR SELECT USING (true);

-- Allow public insert/read for bookings (test drive / consultation inquiries)
CREATE POLICY "Allow public insert bookings" ON public.bookings
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read own bookings" ON public.bookings
    FOR SELECT USING (true);

-- =========================================================================
-- INDEXES FOR PERFORMANCE
-- =========================================================================

CREATE INDEX IF NOT EXISTS idx_vehicles_section ON public.vehicles(section);
CREATE INDEX IF NOT EXISTS idx_vehicles_category ON public.vehicles(category);
CREATE INDEX IF NOT EXISTS idx_bookings_created ON public.bookings(created_at DESC);
