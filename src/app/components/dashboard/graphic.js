"use client"
import React from "react";
import { useEffect, useRef, useState } from "react"
import Chart from "chart.js/auto"

export default function Gra({ data }) {
    const chartRef = useRef(null); // Pour accéder au canvas
  const [chartInstance, setChartInstance] = useState(null); // Pour stocker l'instance du graphique

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy(); // Détruit le graphique précédent si existant
    }

    const ctx = chartRef.current.getContext('2d');
    const newChartInstance = new Chart(ctx, {
      type: 'pie', // ou 'line', 'pie', etc.
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Nombre de ventes',
          data: data.values,
          // Configuration supplémentaire ici
        }]
      },
      options: {
        maintainAspectRatio: false, // Permet au graphique de s'adapter à la taille du conteneur
        responsive: true, // Rend le graphique responsive
      }
    });

    setChartInstance(newChartInstance); // Sauvegarde la nouvelle instance du graphique

    // Cleanup function pour détruire le graphique quand le composant est démonté ou avant que le nouveau graphique soit créé
    return () => {
      newChartInstance.destroy();
    };
  }, [data]);
    return <canvas id="chart"  ref={chartRef}></canvas>
}