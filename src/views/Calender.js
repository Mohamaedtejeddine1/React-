// src/components/InterviewCalendar.js

import React, { useEffect, useState } from 'react';
import Nav from 'components/CandidatNav/RecuiterNav';  // keep your exact import paths
import Sidebar2 from 'components/Sidebar/sidebar2';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fr';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import toast, { Toaster } from 'react-hot-toast';

moment.locale('fr');
const localizer = momentLocalizer(moment);

export default function InterviewCalendar() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Utilisateur non authentifié");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/interview/getInterviewsByRecruiter', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Échec du chargement des entretiens');

      const data = await response.json();
      setInterviews(data || []);
    } catch (error) {
      toast.error("Erreur lors du chargement des entretiens");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const calendarEvents = interviews.map(interview => ({
    // event title like "Entretien RH - OfferTitle"
    title: `Entretien RH - ${interview.offer?.titre || 'Sans Titre'}`,
    start: new Date(interview.date),
    end: new Date(interview.date),
    meetLink: interview.meetLink,
    id: interview._id,
  }));

  if (loading) return <div>Chargement des entretiens...</div>;

  return (
    <div className="flex h-screen">
      <Toaster />
      <Sidebar2 />
      <div className="flex-1 overflow-auto">
        <Nav />
        <div className="container mx-auto pl-8 ml-0 md:ml-64 p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">📅 Calendrier des Entretiens</h2>
          {interviews.length === 0 ? (
            <p>Aucun entretien programmé.</p>
          ) : (
            <div style={{ height: 600 }}>
              <Calendar
                localizer={localizer}
                events={calendarEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                onSelectEvent={(event) => {
                  if (event.meetLink) {
                    window.open(event.meetLink, '_blank');
                  } else {
                    toast('Aucun lien Meet disponible');
                  }
                }}
                messages={{
                  next: 'Suiv.',
                  previous: 'Prec.',
                  today: "Aujourd'hui",
                  month: 'Mois',
                  week: 'Semaine',
                  day: 'Jour',
                  agenda: 'Agenda',
                  noEventsInRange: 'Aucun événement dans cette période.',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
