import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Home from "./page";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./CartContext";

describe("Home Component Tests", () => {
    test("renders the homepage", () => {
        render(
        <SessionProvider session={null}>
            <CartProvider>
        <Home />
        </CartProvider>
        </SessionProvider>
        );

        // Test the presence of the homepage components
        expect(screen.getByText("Vivez l'esprit Olympique au cœur de la France !")).toBeInTheDocument();
        // Test the presence of the logo components
        expect(screen.getAllByAltText("Paris 2024")).toHaveLength(5);

        // Test the presence of the presentationJO components
        expect(screen.getByText("Les Jeux Olympiques Paris 2024")).toBeInTheDocument();

        // Test the presence of the epreuves components
        expect(screen.getByText("Les épreuves")).toBeInTheDocument();
        // Test the presence of the image components
        expect(screen.getByAltText("100 mètres masculin")).toBeInTheDocument();

        // Test the presence of the footer components
        expect(screen.getByAltText("Logo Olympique")).toBeInTheDocument();
        expect(screen.getByText("© Paris 2024")).toBeInTheDocument();

    });
    });